import Image from 'next/image';
import styles from './WeatherCard.module.css';

export default function WeatherCard({ weather, cityName = "Unknown City" }) {
  if (!weather) return null;

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPopulation = (population) => {
    return population.toLocaleString('ko-KR');
  };

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        {/* 왼쪽: 날씨 아이콘 */}
        <div className={styles.weatherIcon}>
          <Image 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={80}
            height={80}
          />
        </div>

        {/* 중간: 날짜시간 및 위치 정보 */}
        <div className={styles.locationInfo}>
          <div className={styles.dateTime}>
            {formatDate(weather.dateTime)}
          </div>
          <div className={styles.locationRow}>
            <span className={styles.cityName}>{cityName}, {weather.country}</span>
            <span className={styles.population}>
              (인구: {formatPopulation(weather.population)})
            </span>
          </div>
        </div>

        {/* 오른쪽: 온도 및 상세 정보 */}
        <div className={styles.temperatureSection}>
          <div className={styles.mainTemperature}>
            {weather.temperature}°C
          </div>
          <div className={styles.additionalInfo}>
            Feels like {weather.feelsLike}°C {weather.description} 풍속 {weather.windSpeed}m/s 습도 {weather.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
}
