import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo-client';
import Layout from '../components/Layout/Layout';
import CityButton from '../components/CityButton/CityButton';
import styles from './index.module.css';
import Image from 'next/image';

const cities = ['Seoul', 'Tokyo', 'Paris', 'London'];

export default function Home() {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Layout title="Weather App - 날씨 정보">
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              Welcome to<br />
              <span className={styles.titleAccent}>Weather App!</span>
            </h1>
            <p className={styles.subtitle}>
              Choose a city from the list below to check the weather.
            </p>
          </div>
          
          <div className={styles.cityGrid}>
            {cities.map(city => (
              <CityButton key={city} city={city} />
            ))}
          </div>
          
          <div className={styles.illustration}>
            <Image 
              src="/earth.png"
              alt="Earth illustration"
              width={430}
              height={321}
              className={styles.earth}
            />
          </div>
        </div>
      </Layout>
    </ApolloProvider>
  );
}
