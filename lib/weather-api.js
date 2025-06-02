const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct'

const cityInfo = {
  Seoul: {
    country: 'KR'     
  },
  London: {
    country: 'GB'        
  },
  Tokyo: {
    country: 'JP'
  },
  Paris: {
    country: 'FR'
  }
};

const API_KEY = getApiKey();

function getApiKey() {
  const key = process.env.WEATHER_API_KEY;
  if (!key) throw new Error('API_KEY is not defined in environment variables');
  return key;
}

export async function getCurrentWeather(city) {
  try {
    const {lat,lon}=await getLatLon(city);
    const response = await fetch(
      `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return parseWeatherData(data);
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    throw new Error(`Failed to fetch weather data for ${city}`);
  }
}

export async function getLatLon(city){
    try{
    const info=cityInfo[city]
    const limit=1
    const response = await fetch(
      `${GEO_BASE_URL}?q=${city},${info.country}&limit=${limit}&appid=${API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  } catch (error) {
    console.error(`Error fetching lat lon for ${city}:`, error);
    throw new Error(`Failed to fetch lat lon data for ${city}`);
  }
}

export function parseWeatherData(apiResponse) {
  const { list, city } = apiResponse;
  
  //console.log('API Response city:', city); // 디버깅용
  //console.log('Population:', city.population); // 인구수 확인

  // 현재 날씨 (첫 번째 항목)
  const current = list[0];
  const currentWeather = {
    //city: city.name,
    country: city.country,
    temperature: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    description: current.weather[0].description,
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    icon: current.weather[0].icon,
    dateTime: current.dt_txt,
    population: city.population
  };
  
  // 날짜별 그룹화
  const forecastByDate = {};
  
  list.forEach(item => {
    const dateStr = item.dt_txt.split(' ')[0]; // YYYY-MM-DD 형식
    
    if (!forecastByDate[dateStr]) {
      forecastByDate[dateStr] = [];
    }
    
    forecastByDate[dateStr].push({
      time: item.dt_txt.split(' ')[1].slice(0, 5), // HH:MM 형식
      temperature: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      pop: Math.round((item.pop || 0) * 100), // 강수 확률 %
      timestamp: item.dt
    });
  });
  
  // 최대 5일치 데이터만
  const forecast = [];
  const sortedDates = Object.keys(forecastByDate).sort().slice(0, 5);
  
  sortedDates.forEach(dateKey => {
    const dayData = forecastByDate[dateKey];
    const tempMax = Math.max(...dayData.map(d => d.tempMax));
    const tempMin = Math.min(...dayData.map(d => d.tempMin));
    
    const dateObj = new Date(dateKey);
    
    forecast.push({
      date: dateKey,
      dateFormatted: dateObj.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric' 
      }),
      dayOfWeek: dateObj.toLocaleDateString('en-US', { 
        weekday: 'short' 
      }),
      tempMax: tempMax,
      tempMin: tempMin,
      hours: dayData
    });
  });
  
  return {
    current: currentWeather,
    forecast: forecast
  };
}