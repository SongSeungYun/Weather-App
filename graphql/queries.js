import { gql } from '@apollo/client';

export const GET_WEATHER_DATA = gql`
  query GetWeatherData($city: String!) {
    getWeatherData(city: $city) {
      current {
        city
        country
        temperature
        feelsLike
        description
        humidity
        windSpeed
        icon
        dateTime
      }
      forecast {
        date
        dateFormatted
        dayOfWeek
        tempMax
        tempMin
        hours {
          time
          temperature
          tempMin
          tempMax
          description
          icon
          humidity
          windSpeed
          pop
          timestamp
        }
      }
    }
  }
`;
