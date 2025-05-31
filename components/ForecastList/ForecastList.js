import { useState } from 'react';
import styles from './ForecastList.module.css';
import Image from 'next/image';

export default function ForecastList({ forecast }) {
  const [expandedDays, setExpandedDays] = useState(new Set([0]));

  const toggleDay = (index) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedDays(newExpanded);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>5-day Forecast</h2>
      
      {forecast.map((day, dayIndex) => (
        <div key={day.date} className={styles.dayContainer}>
          <div 
            className={styles.dayHeader}
            onClick={() => toggleDay(dayIndex)}
          >
            <span className={styles.dayName}>{day.dateFormatted}</span>
            <span className={styles.expandIcon}>
              {expandedDays.has(dayIndex) ? '▲' : '▼'}
            </span>
          </div>
          
          {expandedDays.has(dayIndex) && (
            <div className={styles.hourlyContainer}>
              {day.hours.map((hour, hourIndex) => (
                <div key={hourIndex} className={styles.hourlyItem}>
                  <div className={styles.hourlyTime}>
                    <div className={styles.hourlyIcon}>
                        <Image 
                        src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                        alt={hour.description}
                        width={60}
                        height={60}
                        />
                    </div>
                    <span>{hour.time}</span>
                  </div>
                  
                  <div className={styles.hourlyTemp}>
                    <span className={styles.temp}>
                      {hour.temperature}°C / {hour.tempMax}°C
                    </span>
                    <span className={styles.description}>{hour.description}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
