import { useRouter } from 'next/router';
import { ApolloProvider, useQuery } from '@apollo/client';
import createApolloClient from '../lib/apollo-client';
import Layout from '../components/Layout/Layout';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import ForecastList from '../components/ForecastList/ForecastList';
import { GET_WEATHER_DATA } from '../graphql/queries';
import styles from './city.module.css';
import Image from 'next/image';

function CityWeather() {
  const router = useRouter();
  const { city } = router.query;

  const { loading, error, data } = useQuery(GET_WEATHER_DATA, {
    variables: { city },
    skip: !city
  });

  if (loading) {
    return (
      <Layout title={`${city} 날씨`}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>날씨 정보를 불러오는 중...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title={`${city} 날씨`}>
        <div className={styles.error}>
          <h2>❌ 오류가 발생했습니다</h2>
          <p>날씨 정보를 불러올 수 없습니다.</p>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            홈으로 돌아가기
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${city} 날씨`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.illustration}>
            <Image 
              src="/earth.png"
              alt="Earth illustration"
              width={68}
              height={51}
              className={styles.earth}
            />
          </div>
          <h1 className={styles.title}>Weather Information for {city}</h1>
        </div>
        
        {data && (
          <>
            <WeatherCard 
              weather={data.getWeatherData.current} 
              cityName={city}
            />
            <ForecastList forecast={data.getWeatherData.forecast} />
          </>
        )}
      </div>
    </Layout>
  );
}

export default function CityPage() {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <CityWeather />
    </ApolloProvider>
  );
}
