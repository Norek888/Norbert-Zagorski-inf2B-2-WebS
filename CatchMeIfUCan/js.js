let uluru, map, marker
let ws
let players = {}

let nick=window.prompt("podaj nick")    //prosba o podanie nicku


function initMap() {
    uluru = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({
        pos: uluru,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'https://loremflickr.com/40/40'   //pobiera losowy obrazek dla markera użytkownika
    });
    getLocalization()
    startWebSocket()
    addKeyboardEvents()
}


function poruszMarkerem(ev) {           //funkcja na poruszanie markerem za pomocą klawiatury
    let lat = marker.getPosition().lat()
    let lng = marker.getPosition().lng()
    let icon = marker.icon;

    switch (ev.code) {
        case 'ArrowUp':
            lat += 0.1
        break;

        case 'ArrowDown':
            lat -= 0.1
        break;

        case 'ArrowLeft':
            lng -= 0.1
        break;

        case 'ArrowRight':
            lng += 0.1
        break;
    }
    
    let pos = {lat,lng}
    let wsData = {lat: lat,lng: lng,id: nick,icon: icon}

    marker.setPosition(pos)
    ws.send(JSON.stringify(wsData))  // Wysłanie danych do WebSocketa
}
function addKeyboardEvents() {
    window.addEventListener('keydown', poruszMarkerem)
}
// połączenie z serwerem 
function startWebSocket() {
    let url = 'ws://91.121.6.192:8010';
    ws = new WebSocket(url)
    ws.addEventListener('open', onWSOpen)
    ws.addEventListener('message', onWSMessage)
}


function onWSOpen(data) {       // otawrcie WS
    console.log(data);
}
function onWSMessage(e) {        // Zmiany po sygnale od WS
    if (e.data.substring(0, 20) == 'msg_chat_number') {
        console.log(e.data);
        output.innerHTML += '<div class=\"msgtext\">' + e.data.substring(20) + '</div>';
    } else {
        let data = JSON.parse(e.data)

        if (!players['user' + data.id]) {
            players['user' + data.id] = new google.maps.Marker({
                pos: { lat: data.lat, lng: data.lng },
                map: map,
                icon: data.icon
            })
        } else {
            players['user' + data.id].setPosition({ ////ustalenie pozycji gracza
                lat: data.lat,
                lng: data.lng
            })
        }
    }
}

function getLocalization() {         // Prośba o geolokalizacje.
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

function geoOk(data) {               // Powodzenie prośby.
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    map.setCenter(coords)
    marker.setPosition(coords)
    console.log("geoOK")
}

function geoFail(err) {                // Niepowodzenie prośby.
    console.log(err)
}

//chat między użytkownikami

let input = document.querySelector("#chat-input");
let output = document.querySelector("#chat-output");
let wyslijWiadomosc = document.querySelector("#wyslij-wiadomosc");

// wysyłanie wiadomości z identyfikatorem
wyslijWiadomosc.addEventListener('click', function () {
    if (!input.value == "") {
        ws.send('msg_chat_number' + input.value);
        input.value = '';
    }
})