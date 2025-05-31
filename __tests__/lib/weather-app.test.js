global.fetch = jest.fn();

describe('Weather API Tests', () => {
  beforeEach(() => {
    jest.resetModules(); // 모듈 캐시 초기화
    fetch.mockClear();   // fetch 모킹 초기화
    process.env.WEATHER_API_KEY = 'test-api-key';
    process.env.OPENWEATHER_API_KEY = 'test-api-key'; // 만약 이 변수를 사용하는 경우
  });

  describe('getLatLon', () => {
    it('should return coordinates for Seoul', async () => {
      const mockGeoResponse = [
        { lat: 37.5665, lon: 126.9780, name: 'Seoul', country: 'KR' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      });

      const { getLatLon } = await import('../../lib/weather-api');

      const result = await getLatLon('Seoul');

      expect(result).toEqual({
        lat: 37.5665,
        lon: 126.9780
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('geo/1.0/direct'),
        expect.objectContaining({
          headers: { Accept: 'application/json' },
        })
      );
    });

    it('should throw error on API failure', async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 404 });

      const { getLatLon } = await import('../../lib/weather-api');

      await expect(getLatLon('Seoul')).rejects.toThrow(
        'Failed to fetch lat lon data for Seoul'
      );
    });

    it('should throw error on empty response', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const { getLatLon } = await import('../../lib/weather-api');

      await expect(getLatLon('Seoul')).rejects.toThrow(
        'Failed to fetch lat lon data for Seoul'
      );
    });

    it('should throw error on unknown city', async () => {
      const { getLatLon } = await import('../../lib/weather-api');

      await expect(getLatLon('UnknownCity')).rejects.toThrow(
        'Failed to fetch lat lon data for UnknownCity'
      );
    });
  });

  describe('getCurrentWeather', () => {
    it('should return weather data for Seoul', async () => {
      const mockGeoResponse = [
        { lat: 37.5665, lon: 126.9780, name: 'Seoul', country: 'KR' }
      ];
      const mockWeatherResponse = {
        list: [
          {
            dt: 1640995200,
            main: { temp: 15.5, humidity: 65, pressure: 1013 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            wind: { speed: 3.2 },
          },
        ],
        city: { name: 'Seoul', country: 'KR' },
      };

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockGeoResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWeatherResponse,
        });

      const { getCurrentWeather } = await import('../../lib/weather-api');

      const result = await getCurrentWeather('Seoul');

      expect(result).toEqual(mockWeatherResponse);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error on weather API failure', async () => {
      const mockGeoResponse = [
        { lat: 37.5665, lon: 126.9780, name: 'Seoul', country: 'KR' }
      ];

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockGeoResponse,
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
        });

      const { getCurrentWeather } = await import('../../lib/weather-api');

      await expect(getCurrentWeather('Seoul')).rejects.toThrow(
        'Failed to fetch weather data for Seoul'
      );
    });

    it('should throw error on network error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const { getCurrentWeather } = await import('../../lib/weather-api');

      await expect(getCurrentWeather('Seoul')).rejects.toThrow(
        'Failed to fetch weather data for Seoul'
      );
    });
  });

  describe('API URL construction', () => {
    it('should construct correct geocoding URL', async () => {
      const mockGeoResponse = [{ lat: 37.5665, lon: 126.9780 }];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      });

      const { getLatLon } = await import('../../lib/weather-api');

      await getLatLon('Seoul');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /geo\/1\.0\/direct\?q=Seoul,KR&limit=1&appid=test-api-key/
        ),
        expect.any(Object)
      );
    });

    it('should construct correct weather URL with coordinates', async () => {
      const mockGeoResponse = [{ lat: 37.5665, lon: 126.9780 }];
      const mockWeatherResponse = { list: [] };

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockGeoResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWeatherResponse,
        });

      const { getCurrentWeather } = await import('../../lib/weather-api');

      await getCurrentWeather('Seoul');

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(
          /data\/2\.5\/forecast\?lat=37\.5665&lon=126\.978&appid=test-api-key/
        ),
        expect.any(Object)
      );
    });
  });

  describe('All cities support', () => {
    const cities = ['Seoul', 'Tokyo', 'Paris', 'London'];

    cities.forEach((city) => {
      it(`should handle ${city} correctly`, async () => {
        const mockGeoResponse = [{ lat: 35.0, lon: 135.0 }];

        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockGeoResponse,
        });

        const { getLatLon } = await import('../../lib/weather-api');

        const result = await getLatLon(city);

        expect(result).toEqual({
          lat: 35.0,
          lon: 135.0,
        });

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining(`q=${city}`),
          expect.any(Object)
        );
      });
    });
  });
});
