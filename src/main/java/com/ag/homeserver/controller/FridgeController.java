package com.ag.homeserver.controller;

import com.ag.homeserver.packet.FridgePacket;
import lombok.extern.java.Log;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Log
public class FridgeController {

    @MessageMapping("/fridge/server")
    @SendTo("/fridge/client")
    public FridgePacket fridgePacket(FridgePacket packet) {
        log.info("Server received packet: " + packet.toString());
        FridgePacket response = new FridgePacket();
        response.setName("TEST - received: " + packet.getName());
        return response;
    }
}
