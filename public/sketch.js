
// CONNEXION
var isHost = false;
var isClient = false;

var username;
var connected = false;
var socket = io();


// GUI HOST

var guiScenes;
var guiScene1;
var guiScene2;
var guiScene3;
var guiScene5;
var guiScene6;
var guiScene8;
var guiScene9;

// SCENES 
var boolScene1 = false;
var boolScene2 = false;
var boolScene3 = false;
var boolScene5 = false;
var boolScene6 = false;
var boolScene8 = false;
var boolScene9 = false;

// GUI SCENE 1
var alphaVehicule = 0;
var alphaVehiculeMax = 255;
var alphaVehiculeMin = 0;
var alphaVehiculeStep = 1;

var alphaBackgroundVehicule = 0;
var alphaBackgroundVehiculeMax = 255;
var alphaBackgroundVehiculeMin = 0;
var alphaBackgroundVehiculeStep = 1;

var alphaPath = 0;
var alphaPathMax = 255;
var alphaPathMin = 0;
var alphaPathStep = 1;

var maxSp = 2;
var maxSpMax = 6;
var maxSpMin = 0;
var maxSpStep = 0.3;

var maxFr = 1;
var maxFrMax = 6;
var maxFrMin = 0;
var maxFrStep = 0.3;

var opacityFlowFieldLines

var playWhiteNoiseSound = false;
var playSound1 = false;
var playSound2 = false;


var alphaFlock = 0;
var alphaFlockMax = 255;
var alphaFlockMin = 0;
var alphaFlockStep = 1;

var alphaFFlines = 0;
var alphaFFlinesMax = 255;
var alphaFFlinesMin = 0;
var alphaFFlinesStep = 1;

var alphaFlockBackground = 0;
var alphaFlockBackgroundMax = 255;
var alphaFlockBackgroundMin = 0;
var alphaFlockBackgroundStep = 1;

var alphaFFBackground = 0;
var alphaFFBackgroundMax = 255;
var alphaFFBackgroundMin = 0;
var alphaFFBackgroundStep = 1;

var alphaShader = 0;
var alphaShaderMax = 1;
var alphaShaderMin = 0;
var alphaShaderStep = 0.01;

var windDirectionXShader = 0.1;
var windDirectionXShaderMax = 10;
var windDirectionXShaderMin = 0;
var windDirectionXShaderStep = 0.01;

var windDirectionYShader = 0.5;
var windDirectionYShaderMax = 10;
var windDirectionYShaderMin = 0.2;
var windDirectionYShaderStep = 0.01;

var alphaVideo = 0;
var alphaVideoMax = 255;
var alphaVideoMin = 0;
var alphaVideoStep = 1;

var alignement = 1;
var alignementMax = 100;
var alignementMin = 1;
var alignementStep = 1;

var separation = 1;
var separationMax = 100;
var separationMin = 1;
var separationStep = 1;

var cohesion = 1;
var cohesionMax = 100;
var cohesionMin = 1;
var cohesionStep = 1;

let vehicules = [];
let createVeh = true;

//////////////////////////////////////////////////////

let ffGraphics;
let vGraphics;
let evoGraphics;
let vehGraphics;
let theShader;
let shaderGraphics;
let clientsGraphics;

//////////////////////////////////////////////////////

// FLOW FIELD
var capture;
var scapture;
var evoCapture;
var vScale = 16;
var vScaleEVO = 32;
var kkk = 0;

var previousPixels;
var flow;
let arredaX = 250;
let arredaY = 50;

var w = 640,
    h = 480;
var step = 16;
var x, y;
var vx = 0, vy = 0;
var smoothing = 0.9;
var cutoff = 0.2;

// VEHICULE SOUND
let vehicleSound1;
let cnv;

let song1;
let song2;
let whiteNoise;
let whiteNoise2;
let go = true;

let loopStart = 0.5;
let loopDuration = 0.2;

let motionForce;

let path;
let debug = false;

// EVO
var food = [];
var poison = [];

var drawFood = false;

function preload() {
    // Load a sound file
    song1 = loadSound('assets/rach_1.mp3');
    song2 = loadSound('assets/taille_1.mp3');
    whiteNoise = loadSound('assets/wn_1.mp3');
    whiteNoise2 = loadSound('assets/wn2_1.mp3');
    theShader = loadShader('shaders/shader.vert', 'shaders/test_frac_motion.frag');

}

function setup() {

    login();

    cnv = createCanvas(w, h);
    cnv.class("canevas");
    cnv.position(arredaX, arredaY);
    cnv.style('z-index', '-1');

    createCaptures();
    createGraphicss();

    // SCENE 1
    // FF
    startFF();

    // VEHICULE SOUND
    startVehicleSound();

    // SCENE 2
    // PATH
    newPath();

    // SCENE 3


    // SCENE 5


    // SCENE 6

}

function draw() {

    socketOnMessages();


    if (boolScene1) {
        scene1();
    } else if (boolScene2) {
        scene2();
    } else if (boolScene3) {
        scene3();
    } else if (boolScene5) {
        scene5();
    } else if (boolScene6) {
        scene6();
    } else if (boolScene8) {
        scene8();
    } else if (boolScene9) {
        scene9();
    }

}


setInterval(heartbeat, 33);

function heartbeat() {
    if (connected) {
        emitMessage();
    }
}

function socketOnMessages() {

    if (isClient) {
        socket.on('GUIupdate1', (data) => {
            // When we receive data
            // data: id, xpos, ypos, mycolor
            boolScene1 = data.boolScene1;
            boolScene2 = data.boolScene2;
            boolScene3 = data.boolScene3;
            boolScene5 = data.boolScene5;
            boolScene6 = data.boolScene6;
            boolScene8 = data.boolScene8;
            boolScene9 = data.boolScene9;
            alphaVehicule = data.alphaVehicule;
            alphaBackgroundVehicule = data.alphaBackgroundVehicule;
            maxSp = data.maxSp;
            maxFr = data.maxFr;
            playWhiteNoiseSound = data.playWhiteNoiseSound;
        });

        socket.on('GUIupdate2', (data) => {
            // When we receive data
            // data: id, xpos, ypos, mycolor
            boolScene1 = data.boolScene1;
            boolScene2 = data.boolScene2;
            boolScene3 = data.boolScene3;
            boolScene5 = data.boolScene5;
            boolScene6 = data.boolScene6;
            boolScene8 = data.boolScene8;
            boolScene9 = data.boolScene9;
            alphaVehicule = data.alphaVehicule;
            alphaBackgroundVehicule = data.alphaBackgroundVehicule;
            alphaPath = data.alphaPath;
            maxSp = data.maxSp;
            maxFr = data.maxFr;
            playWhiteNoiseSound = data.playWhiteNoiseSound;
        });

        socket.on('GUIupdate3', (data) => {
            // When we receive data
            // data: id, xpos, ypos, mycolor
            boolScene1 = data.boolScene1;
            boolScene2 = data.boolScene2;
            boolScene3 = data.boolScene3;
            boolScene5 = data.boolScene5;
            boolScene6 = data.boolScene6;
            boolScene8 = data.boolScene8;
            boolScene9 = data.boolScene9;
            alphaVehicule = data.alphaVehicule;
            alphaBackgroundVehicule = data.alphaBackgroundVehicule;
            maxSp = data.maxSp;
            maxFr = data.maxFr;
            alphaFlockBackground = data.alphaFlockBackground;
            alphaFlock = data.alphaFlock;
            cohesion = data.cohesion;
            separation = data.separation;
            alignement = data.alignement;
            playWhiteNoiseSound = data.playWhiteNoiseSound;
        });

        socket.on('GUIupdate5', (data) => {
            // When we receive data
            // data: id, xpos, ypos, mycolor
            boolScene1 = data.boolScene1;
            boolScene2 = data.boolScene2;
            boolScene3 = data.boolScene3;
            boolScene5 = data.boolScene5;
            boolScene6 = data.boolScene6;
            boolScene8 = data.boolScene8;
            boolScene9 = data.boolScene9;
            alphaFFlines = data.alphaFFlines;
            alphaFFBackground = data.alphaFFBackground;
            maxSp = data.maxSp;
            maxFr = data.maxFr;
            playWhiteNoiseSound = data.playWhiteNoiseSound;
            playSound1 = data.playSound1;
        });

        socket.on('GUIupdate6', (data) => {
            // When we receive data
            // data: id, xpos, ypos, mycolor
            boolScene1 = data.boolScene1;
            boolScene2 = data.boolScene2;
            boolScene3 = data.boolScene3;
            boolScene5 = data.boolScene5;
            boolScene6 = data.boolScene6;
            boolScene8 = data.boolScene8;
            boolScene9 = data.boolScene9;
            alphaVehicule = data.alphaVehicule;
            alphaBackgroundVehicule = data.alphaBackgroundVehicule;
            alphaFFlines = data.alphaFFlines;
            alphaFFBackground = data.alphaFFBackground;
            maxSp = data.maxSp;
            maxFr = data.maxFr;
            alphaShader = data.alphaShader;
            windDirectionXShader = data.windDirectionXShader;
            windDirectionYShader = data.windDirectionYShader;
            playSound1 = data.playSound1;
            playSound2 = data.playSound2;
        });

        socket.on('GUIupdate8', (data) => {
            // When we receive data
            // data: id, xpos, ypos, mycolor
            boolScene1 = data.boolScene1;
            boolScene2 = data.boolScene2;
            boolScene3 = data.boolScene3;
            boolScene5 = data.boolScene5;
            boolScene6 = data.boolScene6;
            boolScene8 = data.boolScene8;
            boolScene9 = data.boolScene9;
            alphaVehicule = data.alphaVehicule;
            alphaBackgroundVehicule = data.alphaBackgroundVehicule;
            alphaFFlines = data.alphaFFlines;
            alphaFFBackground = data.alphaFFBackground;
            maxSp = data.maxSp;
            maxFr = data.maxFr;
            alphaShader = data.alphaShader;
            windDirectionXShader = data.windDirectionXShader;
            windDirectionYShader = data.windDirectionYShader;
            alphaVideo = data.alphaVideo;
            playSound1 = data.playSound1;
            playSound2 = data.playSound2;
        });

        socket.on('GUIupdate9', (data) => {
            // When we receive data
            // data: id, xpos, ypos, mycolor
            boolScene1 = data.boolScene1;
            boolScene2 = data.boolScene2;
            boolScene3 = data.boolScene3;
            boolScene5 = data.boolScene5;
            boolScene6 = data.boolScene6;
            boolScene8 = data.boolScene8;
            boolScene9 = data.boolScene9;
            alphaVehicule = data.alphaVehicule;
            alphaBackgroundVehicule = data.alphaBackgroundVehicule;
            maxSp = data.maxSp;
            maxFr = data.maxFr;
            alphaFlockBackground = data.alphaFlockBackground;
            alphaFlock = data.alphaFlock;
            cohesion = data.cohesion;
            separation = data.separation;
            alignement = data.alignement;
            alphaVideo = data.alphaVideo;
            playWhiteNoiseSound = data.playWhiteNoiseSound;
            playSound2 = data.playSound2;
        });

    }


    socket.on('vehiculeUpdate', (data) => {
        // data: id, xpos, ypos, mycolor
        clientsGraphics.fill(color(data.c));
        clientsGraphics.noStroke();
        clientsGraphics.ellipse(data.x, data.y, 5, 5);
        //print("client update");
    });


    // Whenever the server emits 'login', log the login message
    socket.on('login', (data) => {
        connected = true;

    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', (data) => {
        print("user joined " + data.username);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
        print("user left " + data.username);

    });

    socket.on('disconnect', () => {
        print("user disconnected");
    });

    socket.on('reconnect', () => {
        if (username) { // same username as before
            socket.emit('add user', username);
        }
    });

    socket.on('reconnect_error', () => {
        print("error in reconnection,try another username .... " + data.username);
    });
}

function emitMessage() {

    if (isHost && boolScene1) {
        var data = {
            boolScene1: boolScene1,
            boolScene2: boolScene2,
            boolScene3: boolScene3,
            boolScene5: boolScene5,
            boolScene6: boolScene6,
            boolScene8: boolScene8,
            boolScene9: boolScene9,
            alphaVehicule: alphaVehicule,
            alphaBackgroundVehicule: alphaBackgroundVehicule,
            maxSp: maxSp,
            maxFr: maxFr,
            playWhiteNoiseSound: playWhiteNoiseSound
        };

        // Send that object to the socket
        socket.emit('GUIupdate1', data);
    }

    else if (isHost && boolScene2) {
        var data = {
            boolScene1: boolScene1,
            boolScene2: boolScene2,
            boolScene3: boolScene3,
            boolScene5: boolScene5,
            boolScene6: boolScene6,
            boolScene8: boolScene8,
            boolScene9: boolScene9,
            alphaVehicule: alphaVehicule,
            alphaPath: alphaPath,
            alphaBackgroundVehicule: alphaBackgroundVehicule,
            maxSp: maxSp,
            maxFr: maxFr,
            playWhiteNoiseSound: playWhiteNoiseSound
        };

        // Send that object to the socket
        socket.emit('GUIupdate2', data);
    }

    else if (isHost && boolScene3) {
        var data = {
            boolScene1: boolScene1,
            boolScene2: boolScene2,
            boolScene3: boolScene3,
            boolScene5: boolScene5,
            boolScene6: boolScene6,
            boolScene8: boolScene8,
            boolScene9: boolScene9,
            alphaVehicule: alphaVehicule,
            alphaBackgroundVehicule: alphaBackgroundVehicule,
            maxSp: maxSp,
            maxFr: maxFr,
            alphaFlockBackground: alphaFlockBackground,
            alphaFlock: alphaFlock,
            cohesion: cohesion,
            separation: separation,
            alignement: alignement,
            playWhiteNoiseSound: playWhiteNoiseSound
        };

        // Send that object to the socket
        socket.emit('GUIupdate3', data);
    }

    else if (isHost && boolScene5) {
        var data = {
            boolScene1: boolScene1,
            boolScene2: boolScene2,
            boolScene3: boolScene3,
            boolScene5: boolScene5,
            boolScene6: boolScene6,
            boolScene8: boolScene8,
            boolScene9: boolScene9,
            alphaFFlines: alphaFFlines,
            alphaFFBackground: alphaFFBackground,
            maxSp: maxSp,
            maxFr: maxFr,
            playWhiteNoiseSound: playWhiteNoiseSound,
            playSound1: playSound1
        };

        // Send that object to the socket
        socket.emit('GUIupdate5', data);
    }

    else if (isHost && boolScene6) {
        var data = {
            boolScene1: boolScene1,
            boolScene2: boolScene2,
            boolScene3: boolScene3,
            boolScene5: boolScene5,
            boolScene6: boolScene6,
            boolScene8: boolScene8,
            boolScene9: boolScene9,
            alphaVehicule: alphaVehicule,
            alphaBackgroundVehicule: alphaBackgroundVehicule,
            alphaFFlines: alphaFFlines,
            alphaFFBackground: alphaFFBackground,
            maxSp: maxSp,
            maxFr: maxFr,
            alphaShader: alphaShader,
            windDirectionXShader: windDirectionXShader,
            windDirectionYShader: windDirectionYShader,
            playSound1: playSound1,
            playSound2: playSound2
        };

        // Send that object to the socket
        socket.emit('GUIupdate6', data);
    }

    else if (isHost && boolScene8) {
        var data = {
            boolScene1: boolScene1,
            boolScene2: boolScene2,
            boolScene3: boolScene3,
            boolScene5: boolScene5,
            boolScene6: boolScene6,
            boolScene8: boolScene8,
            boolScene9: boolScene9,
            alphaVehicule: alphaVehicule,
            alphaBackgroundVehicule: alphaBackgroundVehicule,
            alphaFFlines: alphaFFlines,
            alphaFFBackground: alphaFFBackground,
            maxSp: maxSp,
            maxFr: maxFr,
            alphaShader: alphaShader,
            windDirectionXShader: windDirectionXShader,
            windDirectionYShader: windDirectionYShader,
            alphaVideo: alphaVideo,
            playSound1: playSound1,
            playSound2: playSound2
        };

        // Send that object to the socket
        socket.emit('GUIupdate8', data);
    }

    else if (isHost && boolScene9) {
        var data = {
            boolScene1: boolScene1,
            boolScene2: boolScene2,
            boolScene3: boolScene3,
            boolScene5: boolScene5,
            boolScene6: boolScene6,
            boolScene8: boolScene8,
            boolScene9: boolScene9,
            alphaVehicule: alphaVehicule,
            alphaBackgroundVehicule: alphaBackgroundVehicule,
            maxSp: maxSp,
            maxFr: maxFr,
            alphaFlockBackground: alphaFlockBackground,
            alphaFlock: alphaFlock,
            cohesion: cohesion,
            separation: separation,
            alignement: alignement,
            alphaVideo: alphaVideo,
            playWhiteNoiseSound: playWhiteNoiseSound,
            playSound2: playSound2
        };

        // Send that object to the socket
        socket.emit('GUIupdate9', data);
    }

    //if (isClient) {
    var data = {
        name: username,
        x: vehicleSound1.position.x,
        y: vehicleSound1.position.y,
        c: vehicleSound1.c
    };

    // Send that object to the socket
    socket.emit('vehiculeUpdate', data);
    //}
}

function startGUIscenes() {

    guiScenes = createGui('Scenes');
    guiScenes.addGlobals('boolScene1', 'boolScene2',
        'boolScene3', 'boolScene4',
        'boolScene5', 'boolScene6',
        'boolScene7', 'boolScene8',
        'boolScene9', 'boolScene10'
    );
}

function StartGuiScene1() {

    guiScene1 = createGui('Scene 1');
    //guiScene1.moveTo(50, 250);
    guiScene1.addGlobals('alphaVehicule',
        'alphaBackgroundVehicule',
        'playWhiteNoiseSound',
        'maxSp', 'maxFr'
    );
}

function StartGuiScene2() {

    guiScene2 = createGui('Scene 2');
    // guiScene2.moveTo(50, 250);
    guiScene2.addGlobals('alphaVehicule',
        'alphaBackgroundVehicule',
        'alphaPath',
        'playWhiteNoiseSound',
        'maxSp', 'maxFr'
    );
}

function StartGuiScene3() {

    guiScene3 = createGui('Scene 3');
    // guiScene2.moveTo(50, 250);
    guiScene3.addGlobals('alphaVehicule',
        'alphaBackgroundVehicule',
        'alphaFlockBackground',
        'alphaFlock',
        'cohesion',
        'separation',
        'alignement',
        'maxSp', 'maxFr',
        'playWhiteNoiseSound'
    );
}

function StartGuiScene5() {

    guiScene5 = createGui('Scene 5');
    // guiScene2.moveTo(50, 250);
    guiScene5.addGlobals('alphaFFlines', 'alphaFFBackground',
        'maxSp', 'maxFr',
        'playWhiteNoiseSound',
        'playSound1'
    );
}

function StartGuiScene6() {

    guiScene6 = createGui('Scene 6');
    // guiScene2.moveTo(50, 250);
    guiScene6.addGlobals('alphaFFlines', 'alphaFFBackground',
        'alphaBackgroundVehicule', 'alphaVehicule',
        'maxSp', 'maxFr',
        'alphaShader', 'windDirectionXShader', 'windDirectionYShader',
        'playSound1', 'playSound2'
    );
}

function StartGuiScene8() {

    guiScene8 = createGui('Scene 8');
    // guiScene2.moveTo(50, 250);
    guiScene8.addGlobals('alphaFFlines', 'alphaFFBackground',
        'alphaBackgroundVehicule', 'alphaVehicule',
        'maxSp', 'maxFr',
        'alphaShader', 'windDirectionXShader', 'windDirectionYShader',
        'alphaVideo',
        'playSound1', 'playSound2'
    );
}

function StartGuiScene9() {

    guiScene9 = createGui('Scene 9');
    // guiScene2.moveTo(50, 250);
    guiScene9.addGlobals(
        'alphaBackgroundVehicule', 'alphaVehicule',
        'maxSp', 'maxFr',
        'alphaFlockBackground',
        'alphaFlock',
        'cohesion',
        'separation',
        'alignement',
        'alphaVideo',
        'playSound2', 'playWhiteNoiseSound'
    );
}


function scene1() {

    calculateFFforce(alphaVehicule);
    goVehicleFF();
    blendMode(BLEND);
    background(0, alphaBackgroundVehicule);
    clientsGraphics.background(0, alphaBackgroundVehicule);
    image(clientsGraphics, 0, 0, w, h);
    vehicleSound1.display();

    if (playWhiteNoiseSound) {
        if (go) {
            userStartAudio();
            go = true;
            whiteNoise.loop();
            whiteNoise2.loop();
            go = false;
        }
        let vol = map(vehicleSound1.position.x, 0.01, w, 0, 1);
        whiteNoise.setVolume(vol);

        let vol2 = map(vehicleSound1.position.x, 0.01, w, 1, 0);
        whiteNoise2.setVolume(vol2);

        let speed = map(vehicleSound1.position.y, 0.01, h, 2, 0);
        speed = constrain(speed, 0.001, 1);

        whiteNoise.rate(speed);
        whiteNoise2.rate(speed);

        // let panning = map(vehicleSound1.position.x, 0, w, -1.0, 1.0);
        // whiteNoise.pan(panning);
    }
    else if (!playWhiteNoiseSound) {
        go = true;
        whiteNoise.pause();
        whiteNoise2.pause();
    }

}

function scene2() {

    path.display(alphaPath);

    vehicleSound1.followPath(path);
    vehicleSound1.bordersPath(path);
    vehicleSound1.boundaries(w, h, 20);
    vehicleSound1.update(maxSp, maxFr);
    noFill();
    vehicleSound1.c[3] = alphaVehicule;

    // clientsGraphics.background(0, alphaBackgroundVehicule);
    // image(clientsGraphics, 0, 0, w, h);

    background(0, alphaBackgroundVehicule);
    vehicleSound1.display();

    if (playWhiteNoiseSound) {
        if (go) {
            userStartAudio();
            go = true;
            whiteNoise.loop();
            whiteNoise2.loop();
            go = false;
        }
        let vol = map(vehicleSound1.position.x, 0.01, w, 0, 1);
        whiteNoise.setVolume(vol);

        let vol2 = map(vehicleSound1.position.x, 0.01, w, 1, 0);
        whiteNoise2.setVolume(vol2);

        let speed = map(vehicleSound1.position.y, 0.01, h, 2, 0);
        speed = constrain(speed, 0.001, 1);

        whiteNoise.rate(speed);
        whiteNoise2.rate(speed);

        // let panning = map(vehicleSound1.position.x, 0, w, -1.0, 1.0);
        // whiteNoise.pan(panning);
    }
    else if (!playWhiteNoiseSound) {
        go = true;
        whiteNoise.pause();
        whiteNoise2.pause();
    }

}

function scene3() {

    calculateFFforce(alphaVehicule);

    goFlock();

    blendMode(BLEND);

    goVehicleFF();

    vehGraphics.background(0, alphaFlockBackground);
    image(vehGraphics, 0, 0, w, h);

    // clientsGraphics.background(0, alphaBackgroundVehicule);
    // image(clientsGraphics, 0, 0, w, h);

    background(0, alphaBackgroundVehicule);
    vehicleSound1.display();

    if (playWhiteNoiseSound) {
        if (go) {
            userStartAudio();
            go = true;
            whiteNoise.loop();
            whiteNoise2.loop();
            go = false;
        }
        let vol = map(vehicleSound1.position.x, 0.01, w, 0, 1);
        whiteNoise.setVolume(vol);

        let vol2 = map(vehicleSound1.position.x, 0.01, w, 1, 0);
        whiteNoise2.setVolume(vol2);

        let speed = map(vehicleSound1.position.y, 0.01, h, 2, 0);
        speed = constrain(speed, 0.001, 1);

        whiteNoise.rate(speed);
        whiteNoise2.rate(speed);

        // let panning = map(vehicleSound1.position.x, 0, w, -1.0, 1.0);
        // whiteNoise.pan(panning);
    }
    else if (!playWhiteNoiseSound) {
        go = true;
        whiteNoise.pause();
        whiteNoise2.pause();
    }

}

function scene5() {

    calculateFFforce(alphaFFlines);
    goVehicleFF();

    blendMode(BLEND);

    ffGraphics.background(0, alphaFFBackground);
    image(ffGraphics, 0, 0, w, h);

    if (playSound1) {
        if (go) {
            userStartAudio();
            go = true;
            song1.loop();
            go = false;
        }

        let speed = map(vehicleSound1.position.y, 0.01, h, 2, 0);
        speed = constrain(speed, 0.001, 1);

        song1.rate(speed);

        let panning = map(vehicleSound1.position.x, 0, w, -1.0, 1.0);
        song1.pan(panning);
    }
    else if (!playSound1) {
        go = true;
        song1.pause();
    }

}

function scene6() {

    blendMode(BLEND);

    // shader
    goShader();
    image(shaderGraphics, 0, 0, w, h);

    blendMode(EXCLUSION);

    // ff
    calculateFFforce(alphaFFlines);
    ffGraphics.background(0, alphaFFBackground);
    image(ffGraphics, 0, 0, w, h);

    blendMode(BLEND);

    // clientsGraphics.background(0, alphaBackgroundVehicule);
    // image(clientsGraphics, 0, 0, w, h);

    // vehicule
    goVehicleFF();
    background(0, alphaBackgroundVehicule);
    vehicleSound1.display();

    // sound 2
    if (playSound2) {
        if (go) {
            userStartAudio();
            go = true;
            song2.loop();
            go = false;
        }

        let speed = map(vehicleSound1.position.y, 0.01, h, 2, 0);
        speed = constrain(speed, 0.001, 1);

        song2.rate(speed);

        let panning = map(vehicleSound1.position.x, 0, w, -1.0, 1.0);
        song2.pan(panning);
    }
    else if (!playSound2) {
        go = true;
        song2.pause();
    }

}

function scene8() {

    blendMode(BLEND);

    // video
    transformVideo();
    image(vGraphics, 0, 0, w, h);

    // shader
    goShader();
    image(shaderGraphics, 0, 0, w, h);

    // sound 2
    if (playSound2) {
        if (go) {
            userStartAudio();
            go = true;
            song2.loop();
            go = false;
        }

        let speed = map(vehicleSound1.position.y, 0.01, h, 2, 0);
        speed = constrain(speed, 0.001, 1);

        song2.rate(speed);

        let panning = map(vehicleSound1.position.x, 0, w, -1.0, 1.0);
        song2.pan(panning);
    }
    else if (!playSound2) {
        go = true;
        song2.pause();
    }

}

function scene9() {

    // video
    transformVideoEvol();
    image(evoGraphics, kkk, kkk, w, h);

    // vehicule
    calculateFFforce(0);
    goVehicleFF();

    blendMode(EXCLUSION);

    // flock evolutif
    goFlockEVO();
    vehGraphics.background(0, alphaFlockBackground);
    image(vehGraphics, 0, 0, w, h);

    blendMode(BLEND);

    // clientsGraphics.background(0, alphaBackgroundVehicule);
    // image(clientsGraphics, 0, 0, w, h);

    // vehicule
    background(0, alphaBackgroundVehicule);
    vehicleSound1.display();

    // whitenoise
    if (playWhiteNoiseSound) {
        if (go) {
            userStartAudio();
            go = true;
            whiteNoise.loop();
            whiteNoise2.loop();
            go = false;
        }
        let vol = map(vehicleSound1.position.x, 0.01, w, 0, 1);
        whiteNoise.setVolume(vol);

        let vol2 = map(vehicleSound1.position.x, 0.01, w, 1, 0);
        whiteNoise2.setVolume(vol2);

        let speed = map(vehicleSound1.position.y, 0.01, h, 2, 0);
        speed = constrain(speed, 0.001, 1);

        whiteNoise.rate(speed);
        whiteNoise2.rate(speed);
        song2.pause();

        // let panning = map(vehicleSound1.position.x, 0, w, -1.0, 1.0);
        // whiteNoise.pan(panning);
    }
    else if (!playWhiteNoiseSound) {
        go = true;
        whiteNoise.pause();
        whiteNoise2.pause();
    }

}

function startFF() {
    flow = new FlowCalculator(step);
    x = w / 2;
    y = h / 2;
}

function calculateFFforce(newAlpha) {

    var myAlpha = newAlpha;
    capture.loadPixels();

    if (capture.pixels.length > 0) {
        if (previousPixels) {

            // cheap way to ignore duplicate frames
            if (same(previousPixels, capture.pixels, 4, w)) {
                return;
            }

            flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
        }
        previousPixels = copyImage(capture.pixels, previousPixels);

        if (flow.flow && (abs(flow.flow.u) > cutoff || abs(flow.flow.v) > cutoff)) {

            ax = -5 * flow.flow.u;
            ay = 5 * flow.flow.v;

            strokeWeight(2);

            flow.flow.zones.forEach(function (zone) {

                let begDir = createVector(zone.x, zone.y);
                let endDir = createVector(zone.u, zone.v);

                let m = dist(begDir.x, begDir.y, endDir.x, endDir.y);

                if (endDir.mag() > 10) {

                    ffGraphics.stroke(255, 255, 255, myAlpha);
                    ffGraphics.line(w - zone.x, zone.y, w - (zone.x + zone.u), zone.y + zone.v);
                }

            })
        }
        else {
            ax = 0;
            ay = 0;
        }

        vx += (1 - smoothing) * (ax - vx);
        vy += (1 - smoothing) * (ay - vy);

        motionForce = createVector(vx, vy);
    }

}

function startVehicleSound() {
    vehicleSound1 = new Vehicle(random(40, w - 40), random(40, h - 40), random(1, 6), random(1, 5));
}

function goVehicleFF() {

    vehicleSound1.follow(motionForce);
    vehicleSound1.boundaries(w, h, 30);
    vehicleSound1.update(maxSp, maxFr);
    noFill();
    vehicleSound1.c[3] = alphaVehicule;
}

// function goVehiclePath(p) {



// }

function login() {
    $(function () {
        var FADE_TIME = 150; // ms
        var TYPING_TIMER_LENGTH = 400; // ms
        var COLORS = [
            '#e21400', '#91580f', '#f8a700', '#f78b00',
            '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
            '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
        ];

        // Initialize variables
        var $window = $(window);
        var $usernameInput = $('.usernameInput'); // Input for username
        var $loginPage = $('.login.page'); // The login page
        var $chatPage = $('.chat.page'); // The chatroom page

        // Prompt for setting a username
        var $currentInput = $usernameInput.focus();

        // Sets the client's username
        const setUsername = () => {
            username = cleanInput($usernameInput.val().trim());

            // If the username is valid
            if (username) {

                if (username == 'host') {
                    print("is Host");
                    isHost = true;
                    startGUIscenes();
                    StartGuiScene1();
                    StartGuiScene2();
                    StartGuiScene3();
                    StartGuiScene5();
                    StartGuiScene6();
                    StartGuiScene8();
                    StartGuiScene9();
                    $loginPage.fadeOut();
                    $chatPage.show();
                    $loginPage.off('click');

                    // Tell the server your username
                    socket.emit('add user', username);
                } else {
                    print("is Client");
                    isClient = true;
                    $loginPage.fadeOut();
                    $chatPage.show();
                    $loginPage.off('click');

                    // Tell the server your username
                    socket.emit('add user', username);
                }

            }
        }

        // Prevents input from having injected markup
        const cleanInput = (input) => {
            return $('<div/>').text(input).html();
        }

        // Keyboard events

        $window.keydown(event => {
            // When the client hits ENTER on their keyboard
            if (event.which === 13) {
                setUsername();
            }
        });

        // Click events

        // Focus input when clicking anywhere on login page
        $loginPage.click(() => {
            $currentInput.focus();
        });

    });

}

// copy an array, creating a new array if necessary
// usage: dst = copyImage(src, dst)
// based on http://jsperf.com/new-array-vs-splice-vs-slice/113
function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) {
        dst = new src.constructor(n);
    }
    while (n--) {
        dst[n] = src[n];
    }
    return dst;
}

function same(a1, a2, stride, n) {
    for (var i = 0; i < n; i += stride) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}

function createGraphicss() {

    ffGraphics = createGraphics(w, h);
    ffGraphics.clear();
    vGraphics = createGraphics(w, h);
    vGraphics.clear();
    evoGraphics = createGraphics(w, h);
    evoGraphics.clear();
    vehGraphics = createGraphics(w, h);
    vehGraphics.clear();
    // shaders require WEBGL mode to work
    shaderGraphics = createGraphics(w, h, WEBGL);
    shaderGraphics.noStroke();
    shaderGraphics.clear();
    // clientsGraphics = createGraphics(w, h);
    // clientsGraphics.clear();

}

function createCaptures() {

    capture = createCapture(VIDEO);
    scapture = createCapture(VIDEO);
    evoCapture = createCapture(VIDEO);
    scapture.size(w / vScale, h / vScale);
    evoCapture.size(w / vScaleEVO, h / vScaleEVO);
    capture.hide();
    scapture.hide();
    evoCapture.hide();
}

function newPath() {
    // A path is a series of connected points
    // A more sophisticated path might be a curve

    path = new Path();
    //1

    path.addPoint(88, 328);
    path.addPoint(71, 283);
    path.addPoint(79, 254);
    path.addPoint(102, 281);
    path.addPoint(119, 304);
    path.addPoint(138, 304);
    path.addPoint(147, 307);
    path.addPoint(166, 318);
    path.addPoint(173, 327);
    path.addPoint(154, 258);
    path.addPoint(131, 207);
    path.addPoint(105, 143);
    path.addPoint(70, 116);
    path.addPoint(100, 82);
    path.addPoint(141, 126);
    path.addPoint(149, 160);
    path.addPoint(181, 208);
    path.addPoint(206, 242);
    path.addPoint(210, 242);
    path.addPoint(223, 219);
    path.addPoint(204, 151);

    path.addPoint(184, 62);
    path.addPoint(182, 34);
    path.addPoint(217, 31);
    path.addPoint(232, 68);
    path.addPoint(247, 120);
    path.addPoint(263, 174);
    path.addPoint(274, 216);
    path.addPoint(295, 228);
    path.addPoint(307, 185);
    path.addPoint(296, 121);
    path.addPoint(290, 97);
    path.addPoint(285, 52);
    path.addPoint(314, 46);
    path.addPoint(323, 73);
    path.addPoint(332, 131);
    path.addPoint(342, 193);
    path.addPoint(349, 226);
    path.addPoint(349, 237);
    path.addPoint(350, 250);
    path.addPoint(372, 250);
    path.addPoint(374, 168);
    path.addPoint(372, 132);
    path.addPoint(372, 95);
    path.addPoint(400, 91);
    path.addPoint(412, 156);
    path.addPoint(410, 208);
    path.addPoint(410, 258);
    path.addPoint(408, 295);
    path.addPoint(402, 337);
    path.addPoint(385, 386);
    path.addPoint(367, 408);
    path.addPoint(332, 429);

    path.addPoint(350, 429);

}

function mousePressed() {

    // if (boolScene2) {

    //     //path.addPoint(mouseX, mouseY);
    //     //print(mouseX, mouseY);
    // }

}

function goFlock() {

    let boundary = new Rectangle(w * 0.5, h * 0.5, w, h);
    let qtree = new QuadTree(boundary, 4);

    for (var i = 0; i < 100; i++) {
        if (createVeh) {
            vehicules[i] = new Vehicle(random(w), random(h), random(1, 5), random(1, 6));
        }
        vehGraphics.fill(255);
        vehGraphics.noStroke();
        vehGraphics.rect(vehicules[i].position.x, vehicules[i].position.y, 1, 5);
        if (i >= 99) { createVeh = false };
    }

    for (var i = 0; i < vehicules.length; i++) {
        let point = new Point(vehicules[i].position.x, vehicules[i].position.y, vehicules[i].velocity);
        qtree.insert(point);

        let range = new Circle(vehicules[i].position.x, vehicules[i].position.y, 30);
        let points = qtree.query(range);
        //print(points.length);

        var dd = dist(vehicules[i].position.x, vehicules[i].position.y, vehicleSound1.position.x, vehicleSound1.position.y);
        if (dd < 30) {
            //var ffForce = calculateFFforce(0);
            vehicules[i].follow(motionForce);

        }
        vehicules[i].update(maxSp, maxFr);
        noFill();
        vehicules[i].c[3] = alphaFlock;
        vehicules[i].flock(points, separation, cohesion, alignement);
        // vehicules[i].eat(food);
        // vehicules[i].eat(poison);
        vehicules[i].boundariesFlock(w, h, 30);

    }

}

function goFlockEVO() {

    let boundary = new Rectangle(w * 0.5, h * 0.5, w, h);
    let qtree = new QuadTree(boundary, 4);


    let boundary2 = new Rectangle(w * 0.5, h * 0.5, w, h);
    let qtree2 = new QuadTree(boundary2, 4);

    for (var i = 0; i < 20; i++) {
        if (createVeh) {
            vehicules[i] = new Vehicle(random(w), random(h), random(1, 5), random(1, 6));
        }
        vehGraphics.fill(255);
        vehGraphics.noStroke();
        vehGraphics.rect(vehicules[i].position.x, vehicules[i].position.y, 1, 5);
        if (i >= 19) { createVeh = false };
    }

    for (var i = 0; i < vehicules.length; i++) {
        let point = new Point(vehicules[i].position.x, vehicules[i].position.y, vehicules[i].velocity);
        qtree.insert(point);

        let range = new Circle(vehicules[i].position.x, vehicules[i].position.y, 30);
        let points = qtree.query(range);
        //print(points.length);

        var dd = dist(vehicules[i].position.x, vehicules[i].position.y, vehicleSound1.position.x, vehicleSound1.position.y);
        if (dd < 30) {
            //var ffForce = calculateFFforce(0);
            vehicules[i].follow(motionForce);

        }
        vehicules[i].update(maxSp, maxFr);
        noFill();
        vehicules[i].c[3] = alphaFlock;
        vehicules[i].flock(points, separation, cohesion, alignement);


        vehicules[i].boundariesFlock(w, h, 30);

        if (food.length > 1) {
            vehicules[i].eat(food);
        }
        if (poison.length > 1) {
            vehicules[i].eat(poison);
        }

    }

}

function goShader() {

    var time = 0.1 * float(frameCount);
    // var vposx = map(vehicleSound1.position.x, 0, w, 0, w * 2.2);
    // var vposy = (h - vehicleSound1.position.y) * 1.6;

    var vposx = vehicleSound1.position.x;
    var vposy = h - vehicleSound1.position.y;

    // var vposx = mouseX;
    // var vposy = mouseY;

    theShader.setUniform("iResolution", [w, h]);
    theShader.setUniform("iPosition", [vposx, vposy]);
    theShader.setUniform("iTime", time);

    theShader.setUniform("iWindDirectionX", windDirectionXShader);
    theShader.setUniform("iWindDirectionY", windDirectionYShader);
    theShader.setUniform("iShaderOppacity", alphaShader);

    shaderGraphics.shader(theShader);
    shaderGraphics.rect(0, 0, w, h);
}

// function drawClients() {
//     clientsGraphics.background(0, alphaVehicule);
//     image(clientsGraphics, 0, 0, w, h);

// }

function transformVideo() {
    scapture.loadPixels();
    loadPixels();
    for (var y = 0; y < scapture.height; y++) {
        for (var x = 0; x < scapture.width; x++) {
            var index = (scapture.width - x - 1 + (y * scapture.width)) * 4;
            var r = scapture.pixels[index + 0];
            var g = scapture.pixels[index + 1];
            var b = scapture.pixels[index + 2];

            //var bright = (r + g + b) / 3;
            vGraphics.noStroke();
            vGraphics.fill(r, g, b, alphaVideo);
            vGraphics.strokeWeight(5);
            vGraphics.rect(x * vScale, y * vScale, vScale, vScale);
        }
    }
}

function transformVideoEvol() {

    evoCapture.loadPixels();
    loadPixels();

    for (var y = 0; y < evoCapture.height; y++) {
        for (var x = 0; x < evoCapture.width; x++) {
            var index = (evoCapture.width - x - 1 + (y * evoCapture.width)) * 4;
            var r = evoCapture.pixels[index + 0];
            var g = evoCapture.pixels[index + 1];
            var b = evoCapture.pixels[index + 2];

            //var bright = (r + g + b) / 3;
            evoGraphics.noStroke();
            evoGraphics.fill(r, g, b, alphaVideo);
            evoGraphics.strokeWeight(5);

            rectMode(CENTER);

            evoGraphics.rect(x * vScaleEVO, y * vScaleEVO, vScaleEVO, vScaleEVO);

            if (drawFood) {
                if (r < 40 && g < 40 && b < 40) {
                    food.push(createVector(x * vScaleEVO + (vScaleEVO * 0.5), y * vScaleEVO + (vScaleEVO * 0.5)));
                } else if (r > 200 && g > 200 && b > 200) {
                    poison.push(createVector(x * vScaleEVO + (vScaleEVO * 0.5), y * vScaleEVO + (vScaleEVO * 0.5)));
                }
            }

            for (var i = 0; i < food.length; i++) {
                evoGraphics.fill(0, 255, 0);
                evoGraphics.ellipse(food[i].x - kkk, food[i].y - kkk, 10, 10);
            }

            for (var i = 0; i < poison.length; i++) {
                evoGraphics.fill(255, 0, 0);
                evoGraphics.ellipse(poison[i].x - kkk, poison[i].y - kkk, 10, 10);
            }
        }
    }

    drawFood = false;
}

function keyPressed() {

    if (keyCode === LEFT_ARROW && isHost) {
        food.splice(0, food.length);
        poison.splice(0, poison.length);
        drawFood = true;
    }
}

