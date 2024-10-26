package com.ag.homeserver.gym.calc;

import com.ag.homeserver.gym.calc.*;

public enum OneRepMaxStrategyType {
    BRZYCKI(new BrzyckiOneRepMaxStrategy()),
    EPLEY(new EpleyOneRepMaxStrategy()),
    LOMBARDI(new LombardiOneRepMaxStrategy()),
    OCONNER(new OConnerOneRepMaxStrategy());

    private final OneRepMaxStrategy strategy;

    OneRepMaxStrategyType(OneRepMaxStrategy strategy) {
        this.strategy = strategy;
    }

    public OneRepMaxStrategy getStrategy() {
        return strategy;
    }

    @Override
    public String toString() {
        char[] chars = name().toLowerCase().toCharArray();
        chars[0] = Character.toUpperCase(chars[0]);
        return String.valueOf(chars);
    }
}
