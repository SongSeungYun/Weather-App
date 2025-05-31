import { useRouter } from 'next/router';
import styles from './CityButton.module.css';

export default function CityButton({ city, isSelected = false }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${city}`);
  };

  return (
    <button 
      className={`${styles.button} ${isSelected ? styles.selected : ''}`} 
      onClick={handleClick}
    >
      {city}
    </button>
  );
}
