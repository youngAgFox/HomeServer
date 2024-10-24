package com.ag.homeserver.gym.calc;

public class EpleyOneRepMaxStrategy implements OneRepMaxStrategy {
    @Override
    public double calculateOneRepMax(double mass, int reps) {
        return mass * (1 + (reps / 30.0));
    }

    @Override
    public String getAlgorithmDescription() {
        return "1RM = M * (1 + R / 30)";
    }
}
