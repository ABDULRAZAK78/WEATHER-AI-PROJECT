package com.weather.weatherapp.dto;

import lombok.Data;

@Data
public class WeatherDto {
    private String city;
    private double temperature;
    private double feelsLike;
    private double humidity;
    private double windSpeed;
    private double visibility;
    private double pressure;
    private double uvIndex;
    private double precipitation;
    private String condition;
    private String sunrise;
    private String sunset;
    private String aiAdvice;
    private String alert;
    private double pm10;
    private double pm25;
    private double o3;
    private double so2;
    private double co;
    private double no2;
    private String forecastJson;
}