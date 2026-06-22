# AI-Powered Weather Forecasting App

## Setup Steps

### 1. Create MySQL Database
Open MySQL and run:
```sql
CREATE DATABASE weatherdb;
```

### 2. Update application.properties
Open: src/main/resources/application.properties

Replace these values:
- `spring.datasource.password=yourpassword` → your MySQL password
- `weather.api.key=YOUR_OPENWEATHER_API_KEY` → get free key from https://openweathermap.org/api
- `grok.api.key=YOUR_GROK_API_KEY` → your Grok API key

### 3. Import in Eclipse
- File → Import → Maven → Existing Maven Projects
- Browse to this folder → Finish
- Right-click project → Maven → Update Project → OK

### 4. Run
- Right-click WeatherappApplication.java → Run As → Java Application

### 5. Test
Open browser: http://localhost:8080/api/weather/London

## API Endpoints
- GET /api/weather/{city} → Get weather + AI advice
- GET /api/weather/history/{city} → Get saved history from DB
