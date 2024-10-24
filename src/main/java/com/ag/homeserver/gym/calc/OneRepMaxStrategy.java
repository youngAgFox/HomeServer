package com.ag.homeserver.gym.calc;

/**
 * Interface for calculating one rep max. These algorithms approximate what the subjects one rep max would be. A one rep
 * max is the largest amount of mass a subject can successfully move with good form without being able to do another rep.
 */
public interface OneRepMaxStrategy {
    double calculateOneRepMax(double mass, int reps);
    String getAlgorithmDescription();
}
