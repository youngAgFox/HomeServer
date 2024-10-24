package com.ag.homeserver.gym.calc;

public class LombardiOneRepMaxStrategy implements OneRepMaxStrategy {

    @Override
    public double calculateOneRepMax(double mass, int reps) {
        return mass * reps * 0.1;
    }

    @Override
    public String getAlgorithmDescription() {
        return "1RM = M * R * 0.1";
    }
}
