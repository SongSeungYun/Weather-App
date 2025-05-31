import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type CurrentWeather {
    city: String!
    country: String!
    temperature: Int!
    feelsLike: Int!
    description: String!
    humidity: Int!
    windSpeed: Float!
    icon: String!
    dateTime: String!
  }
  
  type HourlyForecast {
    time: String!
    temperature: Int!
    tempMin: Int!
    tempMax: Int!
    description: String!
    icon: String!
    humidity: Int!
    windSpeed: Float!
    pop: Int!
    timestamp: Int!
  }
  
  type DailyForecast {
    date: String!
    dateFormatted: String!
    dayOfWeek: String!
    tempMax: Int!
    tempMin: Int!
    hours: [HourlyForecast!]!
  }
  
  type WeatherData {
    current: CurrentWeather!
    forecast: [DailyForecast!]!
  }
  
  type Query {
    getWeatherData(city: String!): WeatherData
  }
`;
