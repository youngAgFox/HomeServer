package com.ag.homeserver.database;

public interface Cacheable {
    void clearCache();
    boolean isCached();
    void setCached(boolean cached);
}
