package com.weather.weatherapp.service;

import com.weather.weatherapp.dto.WeatherDto;
import com.weather.weatherapp.model.WeatherData;
import com.weather.weatherapp.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final WeatherRepository weatherRepository;
    private final RestTemplate restTemplate;

    @Value("${weather.api.key}")
    private String weatherApiKey;

    @Value("${weather.api.url}")
    private String weatherApiUrl;

    @Value("${grok.api.key}")
    private String grokApiKey;

    @Value("${grok.api.url}")
    private String grokApiUrl;

    public WeatherDto getWeather(String city) {
        String currentUrl = weatherApiUrl + "/current.json?key=" + weatherApiKey + "&q=" + city + "&aqi=yes";
        String currentResponse = restTemplate.getForObject(currentUrl, String.class);
        JSONObject currentJson = new JSONObject(currentResponse);

        JSONObject location = currentJson.getJSONObject("location");
        JSONObject current  = currentJson.getJSONObject("current");

        String cityName      = location.getString("name");
        double temperature   = current.getDouble("temp_c");
        double feelsLike     = current.getDouble("feelslike_c");
        double humidity      = current.getDouble("humidity");
        double windSpeed     = current.getDouble("wind_kph");
        double visibility    = current.getDouble("vis_km");
        double pressure      = current.getDouble("pressure_mb");
        double uvIndex       = current.getDouble("uv");
        double precipitation = current.getDouble("precip_mm");
        String condition     = current.getJSONObject("condition").getString("text");

        double pm10 = 0, pm25 = 0, o3 = 0, so2 = 0, co = 0, no2 = 0;
        if (current.has("air_quality")) {
            JSONObject aqi = current.getJSONObject("air_quality");
            pm10 = aqi.optDouble("pm10", 0);
            pm25 = aqi.optDouble("pm2_5", 0);
            o3   = aqi.optDouble("o3", 0);
            so2  = aqi.optDouble("so2", 0);
            co   = aqi.optDouble("co", 0);
            no2  = aqi.optDouble("no2", 0);
        }

        String forecastUrl = weatherApiUrl + "/forecast.json?key=" + weatherApiKey + "&q=" + city + "&days=7&aqi=no&alerts=no";
        String forecastResponse = restTemplate.getForObject(forecastUrl, String.class);
        JSONObject forecastJson = new JSONObject(forecastResponse);

        String sunrise = forecastJson.getJSONObject("forecast")
                .getJSONArray("forecastday").getJSONObject(0)
                .getJSONObject("astro").getString("sunrise");
        String sunset = forecastJson.getJSONObject("forecast")
                .getJSONArray("forecastday").getJSONObject(0)
                .getJSONObject("astro").getString("sunset");

        String alert    = generateAlert(temperature, condition);
        String aiAdvice = getGroqAdvice(cityName, temperature, humidity, condition);

        WeatherData data = new WeatherData();
        data.setCity(cityName);
        data.setTemperature(temperature);
        data.setHumidity(humidity);
        data.setCondition(condition);
        data.setAiAdvice(aiAdvice);
        data.setFetchedAt(LocalDateTime.now());
        weatherRepository.save(data);

        WeatherDto dto = new WeatherDto();
        dto.setCity(cityName);
        dto.setTemperature(temperature);
        dto.setFeelsLike(feelsLike);
        dto.setHumidity(humidity);
        dto.setWindSpeed(windSpeed);
        dto.setVisibility(visibility);
        dto.setPressure(pressure);
        dto.setUvIndex(uvIndex);
        dto.setPrecipitation(precipitation);
        dto.setCondition(condition);
        dto.setSunrise(sunrise);
        dto.setSunset(sunset);
        dto.setAiAdvice(aiAdvice);
        dto.setAlert(alert);
        dto.setPm10(pm10);
        dto.setPm25(pm25);
        dto.setO3(o3);
        dto.setSo2(so2);
        dto.setCo(co);
        dto.setNo2(no2);
        dto.setForecastJson(forecastResponse);
        return dto;
    }

    private String generateAlert(double temp, String condition) {
        String c = condition.toLowerCase();
        if (temp > 40) return "Extreme Heat Warning!";
        if (temp > 35) return "Heatwave Alert! Stay Hydrated.";
        if (c.contains("rain"))  return "Rain Alert! Carry an umbrella.";
        if (c.contains("storm")) return "Storm Warning! Stay indoors.";
        if (c.contains("snow"))  return "Snow Alert! Drive carefully.";
        if (c.contains("fog"))   return "Fog Alert! Drive slowly.";
        return "Weather is normal.";
    }

    public String getGroqAdvice(String city, double temp, double humidity, String condition) {
        try {
            String prompt = "Weather in " + city + ": " + temp + " degrees C, humidity "
                    + humidity + "%, condition: " + condition
                    + ". Write exactly 2 sentences: first describe what it feels like outside, "
                    + "second give one practical tip. Be conversational. No bullet points.";

            JSONObject message = new JSONObject();
            message.put("role", "user");
            message.put("content", prompt);

            JSONObject requestJson = new JSONObject();
            requestJson.put("model", "llama-3.3-70b-versatile");
            requestJson.put("messages", new JSONArray().put(message));
            requestJson.put("max_tokens", 150);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + grokApiKey);
            headers.set("Content-Type", "application/json");

            HttpEntity<String> entity = new HttpEntity<>(requestJson.toString(), headers);
            String groqResponse = restTemplate.postForObject(grokApiUrl, entity, String.class);

            JSONObject groqJson = new JSONObject(groqResponse);
            return groqJson.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content");

        } catch (Exception e) {
            return "Stay safe and check local weather updates.";
        }
    }

    public String getChatReply(String message, String city, double temp,
                                double humidity, String condition, double windSpeed) {
        try {
            String context = "Current weather in " + city + ": " + temp + " degrees C, "
                    + "humidity " + humidity + "%, condition: " + condition
                    + ", wind: " + windSpeed + " kph.";

            String prompt = context + " User asks: " + message
                    + ". Answer helpfully in 2-3 sentences.";

            JSONObject msg = new JSONObject();
            msg.put("role", "user");
            msg.put("content", prompt);

            JSONObject requestJson = new JSONObject();
            requestJson.put("model", "llama-3.3-70b-versatile");
            requestJson.put("messages", new JSONArray().put(msg));
            requestJson.put("max_tokens", 200);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + grokApiKey);
            headers.set("Content-Type", "application/json");

            HttpEntity<String> entity = new HttpEntity<>(requestJson.toString(), headers);
            String groqResponse = restTemplate.postForObject(grokApiUrl, entity, String.class);

            JSONObject groqJson = new JSONObject(groqResponse);
            return groqJson.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content");

        } catch (Exception e) {
            return "Sorry, I couldn't process that. Please try again!";
        }
    }
}