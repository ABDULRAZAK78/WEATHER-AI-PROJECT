package com.weather.weatherapp.repository;

import com.weather.weatherapp.model.WeatherData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WeatherRepository extends JpaRepository<WeatherData, Long> {
    List<WeatherData> findByCityOrderByFetchedAtDesc(String city);
    List<WeatherData> findAllByOrderByFetchedAtDesc();
}