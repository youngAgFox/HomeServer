console.log("TEST Success!");
const stompClient = new StompJs.Client({
    brokerURL: "wss://localhost:8443/home/fridge-websocket"
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log("Connected: " + frame);
    stompClient.subscribe("/fridge/client", (packet) => {
        handlePacket(packet);
    });
    sendName();
};

function handlePacket(packet) {
    console.log("Client received packet: ", packet.body);
}

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    console.log(connected ? "Connected" : "Disconnected");
//    $("#connect").prop("disabled", connected);
//    $("#disconnect").prop("disabled", !connected);
//    if (connected) {
//        $("#conversation").show();
//    }
//    else {
//        $("#conversation").hide();
//    }
//    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
}

function sendName() {
    console.log("Sending name: " + $("#name").text());
    stompClient.publish({
        destination: "/fridge/server",
        body: JSON.stringify({'name': $("#name").text()})
    });
}

connect();