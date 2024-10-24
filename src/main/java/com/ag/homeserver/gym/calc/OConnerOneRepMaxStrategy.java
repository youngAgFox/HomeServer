package com.ag.homeserver.gym.calc;

public class OConnerOneRepMaxStrategy implements OneRepMaxStrategy {
    @Override
    public double calculateOneRepMax(double mass, int reps) {
        return mass * (1 + 0.025 * reps);
    }

    @Override
    public String getAlgorithmDescription() {
        return "1RM = M * (1 + 0.025 * R)";
    }
}
