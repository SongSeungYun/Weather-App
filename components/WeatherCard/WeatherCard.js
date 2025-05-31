import styles from './WeatherCard.module.css';
import Image from 'next/image';

export default function WeatherCard({ weather }) {
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

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.locationInfo}>
          <div className={styles.weatherIcon}>
            <Image 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={60}
            height={60}
            />
          </div>
          <div className={styles.locationDetails}>
            <div className={styles.date}>{formatDate(weather.dateTime)}</div>
            <div className={styles.location}>
              {weather.city}, {weather.country}
            </div>
          </div>
        </div>
        <div className={styles.temperature}>
          {weather.temperature}°C
        </div>
      </div>
      
      <div className={styles.details}>
        <span>Feels like {weather.feelsLike}°C {weather.description}</span>
        <span>풍속 {weather.windSpeed}m/s 습도 {weather.humidity}%</span>
      </div>
    </div>
  );
}
