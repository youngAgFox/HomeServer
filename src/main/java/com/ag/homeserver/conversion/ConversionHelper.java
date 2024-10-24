package com.ag.homeserver.conversion;

public class ConversionHelper {

    public static double convertPoundsToKilograms(double lbs) {
        return lbs / 2.2;
    }

    public static double convertKilogramsToPounds(double kg) {
        return kg * 2.2;
    }

    public static double convertFahrenheitToCelsius(double fahrenheit) {
        return (5.0/9.0) * (fahrenheit - 32);
    }

    public static double convertCelsiusToFahrenheit(double celsius) {
        return (9.0/5.0) * celsius + 32;
    }

}
