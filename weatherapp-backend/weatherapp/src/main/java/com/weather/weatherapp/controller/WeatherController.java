package com.weather.weatherapp.controller;

import com.weather.weatherapp.dto.WeatherDto;
import com.weather.weatherapp.model.WeatherData;
import com.weather.weatherapp.repository.WeatherRepository;
import com.weather.weatherapp.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;
    private final WeatherRepository weatherRepository;

    // GET /api/weather/{city}
    @GetMapping("/{city}")
    public ResponseEntity<WeatherDto> getWeather(@PathVariable String city) {
        WeatherDto dto = weatherService.getWeather(city);
        return ResponseEntity.ok(dto);
    }

    // GET /api/weather/history
    @GetMapping("/history")
    public ResponseEntity<List<WeatherData>> getHistory() {
        List<WeatherData> history = weatherRepository.findAllByOrderByFetchedAtDesc();
        return ResponseEntity.ok(history);
    }

    // POST /api/weather/ai-insight
    @PostMapping("/ai-insight")
    public ResponseEntity<Map<String, String>> getAiInsight(
            @RequestBody Map<String, Object> body) {
        String city      = (String) body.get("city");
        double temp      = ((Number) body.get("temperature")).doubleValue();
        double humidity  = ((Number) body.get("humidity")).doubleValue();
        String condition = (String) body.get("condition");
        String insight   = weatherService.getGroqAdvice(city, temp, humidity, condition);
        return ResponseEntity.ok(Map.of("insight", insight));
    }

    // POST /api/weather/chat
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody Map<String, Object> body) {
        String message   = (String) body.get("message");
        String city      = (String) body.get("city");
        double temp      = ((Number) body.get("temperature")).doubleValue();
        double humidity  = ((Number) body.get("humidity")).doubleValue();
        String condition = (String) body.get("condition");
        double windSpeed = ((Number) body.get("windSpeed")).doubleValue();
        String reply = weatherService.getChatReply(message, city, temp, humidity, condition, windSpeed);
        return ResponseEntity.ok(Map.of("reply", reply));
    }
}