package com.ag.homeserver.gym.calc;

public class BrzyckiOneRepMaxStrategy implements OneRepMaxStrategy {

    private final static double BRZYCKI_CONSTANT = 1.0278;
    private final static double BRZYCKI_MULTIPLICAND = 0.0278;

    @Override
    public double calculateOneRepMax(double mass, int reps) {
        return mass / (BRZYCKI_CONSTANT - (BRZYCKI_MULTIPLICAND * reps));
    }

    @Override
    public String getAlgorithmDescription() {
        return String.format("1RM = M / (%f - (%f * R))", BRZYCKI_CONSTANT, BRZYCKI_MULTIPLICAND);
    }
}
