#include <Wire.h>
#include <Wire.h> // Include the alternative Wire library
#include "MAX30100_PulseOximeter.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_MLX90614.h>

#define REPORTING_PERIOD_MS     1000

// Create a PulseOximeter object
PulseOximeter pox;
// Adafruit_MLX90614 mlx = Adafruit_MLX90614();
// Time at which the last beat occurred
uint32_t tsLastReport = 0;

// WiFi credentials
const char* ssid = "Gryffy";
const char* password = "Anitta12";

void onBeatDetected() {
    Serial.println("Beat!");
    
}

void setup() {
    Serial.begin(115200);

    Serial.print("Initializing pulse oximeter..");
    
    // Initialize sensor
    Wire.begin(D2,D1, 400000); 
    if (!pox.begin()) {
        Serial.println("FAILED");
        while (1);
    } else {
        Serial.println("SUCCESS");
    }

    // Configure sensor to use 7.6mA for LED drive
    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);

    // Register a callback routine
    pox.setOnBeatDetectedCallback(onBeatDetected);

    // Connect to WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
}

void loop() {
    // Read from the sensor
    pox.update();

    // Grab the updated heart rate and SpO2 levels
    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
        Serial.print("Heart rate:");
        Serial.print(pox.getHeartRate());
        Serial.print("bpm / SpO2:");
        Serial.print(pox.getSpO2());
        Serial.println("%");

        // /*temp*/
        //  Serial.print("*C\tObject = "); 
        // Serial.print(mlx.readObjectTempC());
        //  Serial.println("*C");
        // /*temp end*/

        // Create the JSON payload
        // String json = "{\"heartRate\":" + String(pox.getHeartRate()) + ",\"spo2\":" + String(pox.getSpO2()) + "}";
        String json = "{\"heartRate\": \"" + String(pox.getHeartRate()) + "\", \"spo2\": \"" + String(pox.getSpO2()) +"\"}";

        // Perform HTTP POST request
        WiFiClient client;
        HTTPClient http;
       Serial.print("Sending HTTP POST request...");
    if (http.begin(client, "http://192.168.43.44:3001/main/AWS01")) {
      http.addHeader("Content-Type", "application/json");
      int httpCode = http.POST(json);
      if (httpCode == 200) {
        Serial.println("OK");
       } else {
        Serial.print("failed with error code ");
        Serial.println(httpCode);
        Serial.println("checking");
      }
      http.end();
    } else {
      Serial.println("failed to connect to server");
    }
        // delay(100); // Delay to allow the server to process the request

        tsLastReport = millis();
    }
}





