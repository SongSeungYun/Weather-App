Weather App
Next.js, GraphQL, Apollo Client를 활용한 실시간 날씨 정보 애플리케이션

## 🌟 프로젝트 개요
OpenWeather API를 통해 실시간 날씨 정보를 제공하는 웹 애플리케이션입니다.

## 🚀 주요 기능
실시간 날씨 정보: 현재 날씨, 체감온도, 습도, 풍속 제공

5일 예보: 시간별 상세 예보 정보

다중 도시 지원: Seoul, Tokyo, Paris, London

아코디언 UI: 날짜별 예보 펼치기/접기 기능

## 🛠️ 기술 스택
### Frontend
Next.js 12: React 프레임워크, 파일 기반 라우팅

Apollo Client: GraphQL 클라이언트, 상태 관리

CSS Modules: 컴포넌트별 스타일 격리

Pretendard Font: 한글 최적화 폰트

### Backend
Apollo Server: GraphQL 서버

Next.js API Routes: 서버리스 함수

OpenWeather API: 외부 날씨 데이터

## 🚀 시작하기

1. 저장소 클론
   
```
git clone https://github.com/SongSeungYun/Weather-App.git
cd Weather-App
```

2. 의존성 설치
   
```
npm install
```

3. 환경 변수 설정
.env.local 파일 생성:

```
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

4. 개발 서버 실행
```
npm run dev
```

5. 브라우저에서 http://localhost:3000 접속
