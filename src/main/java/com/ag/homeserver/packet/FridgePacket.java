package com.ag.homeserver.packet;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FridgePacket {
    private String name;
    private String target;
    private Map<String, String> args;
}
