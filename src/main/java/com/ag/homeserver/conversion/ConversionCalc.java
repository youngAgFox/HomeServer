package com.ag.homeserver.conversion;

import lombok.Getter;
import lombok.NonNull;

@Getter
public abstract class ConversionCalc {

    private final String sourceType;
    private final String destType;

    public ConversionCalc(@NonNull String sourceType, @NonNull String destType) {
        this.sourceType = sourceType;
        this.destType = destType;
    }

    abstract public double convert(double amount);
}
