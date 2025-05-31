import { getCurrentWeather } from '../lib/weather-api';

export const resolvers = {
  Query: {
    getWeatherData: async (_, { city }) => {
      try {
        const weatherData = await getCurrentWeather(city);
        return weatherData;
      } catch (error) {
        console.error('Error in getWeatherData resolver:', error);
        throw new Error(`Failed to fetch weather data for ${city}: ${error.message}`);
      }
    },
  },
};