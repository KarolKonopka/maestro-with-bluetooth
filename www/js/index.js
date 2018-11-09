var App = {
    macAdr: "12:34:56:78:9A:BC", //mac address
    servos: { //servos positions (these are my examples)
        upM: {port: 0, min: 1994, max: 902},
        rightM: {port: 1, min: 2091, max: 883},
        downM: {port: 2, min: 2111, max: 941},
        leftM: {port: 3, min: 2052, max: 922},
        upT: {port: 7, min: 941, max: 1995},
        rightT: {port: 8, min: 980, max: 2100},
        downT: {port: 9, min: 1039, max: 2098},
        leftT: {port: 10, min: 941, max: 1910}
    },
    init: function() {
        document.addEventListener('deviceready', App.onDeviceReady, false);
    },
    onDeviceReady: function() {
        App.conB = document.getElementById("conB");
        App.btns = document.getElementById("btns");
        App.conEl = document.getElementById("conEl");
        App.msgP = document.getElementById("msgP");
        App.opnB = document.getElementById("opnB");
        App.clsB = document.getElementById("clsB");
        App.offB = document.getElementById("offB");
        App.rB = document.getElementById("rB");
        App.rpB = document.getElementById("rpB");
        App.uB = document.getElementById("uB");
        App.upB = document.getElementById("upB");
        App.lB = document.getElementById("lB");
        App.lpB = document.getElementById("lpB");
        App.dB = document.getElementById("dB");
        App.dpB = document.getElementById("dpB");
        App.fB = document.getElementById("fB");
        App.fpB = document.getElementById("fpB");
        App.bB = document.getElementById("bB");
        App.bpB = document.getElementById("bpB");
        App.opnLB = document.getElementById("opnLB");
        App.clsLB = document.getElementById("clsLB");
        App.opnUB = document.getElementById("opnUB");
        App.clsUB = document.getElementById("clsUB");
        App.opnDB = document.getElementById("opnDB");
        App.clsDB = document.getElementById("clsDB");
        App.opnRB = document.getElementById("opnRB");
        App.clsRB = document.getElementById("clsRB");
        App.conB.addEventListener("click", App.manageCon);
        App.opnB.addEventListener("click", App.openH);
        App.clsB.addEventListener("click", App.closeH);
        App.offB.addEventListener("click", App.offA);
        App.rB.addEventListener("click", App.turnR);
        App.rpB.addEventListener("click", App.turnRp);
        App.uB.addEventListener("click", App.turnU);
        App.upB.addEventListener("click", App.turnUp);
        App.lB.addEventListener("click", App.turnL);
        App.lpB.addEventListener("click", App.turnLp);
        App.dB.addEventListener("click", App.turnD);
        App.dpB.addEventListener("click", App.turnDp);
        App.fB.addEventListener("click", App.turnF);
        App.fpB.addEventListener("click", App.turnFp);
        App.bB.addEventListener("click", App.turnB);
        App.bpB.addEventListener("click", App.turnBp);
        App.opnLB.addEventListener("click", App.openL);
        App.clsLB.addEventListener("click", App.closeL);
        App.opnUB.addEventListener("click", App.openU);
        App.clsUB.addEventListener("click", App.closeU);
        App.opnDB.addEventListener("click", App.openD);
        App.clsDB.addEventListener("click", App.closeD);
        App.opnRB.addEventListener("click", App.openR);
        App.clsRB.addEventListener("click", App.closeR);
        var en = function() {
            App.btns.style.display = "block"; 
            App.msgP.textContent = "OK";
        };
        var notEn = function() {
            App.msgP.textContent = "Enable bluetooth";
        };
        bluetoothSerial.isEnabled(en, notEn);
    },
    manageCon: function() {
        var con = function() {
            App.msgP.textContent = "Connecting...";
            bluetoothSerial.connect(
                App.macAdr,
                App.openPort,
                function(err) {
                    App.msgP.textContent = err;
                }
            );
        }
        var dis = function() {
            App.msgP.textContent = "Disconnecting...";
             bluetoothSerial.disconnect(
                App.closePort,
                function(err) {
                    App.msgP.textContent = err;
                }
            );
        }
        bluetoothSerial.isConnected(dis, con);
    },
    openPort: function() {
        App.msgP.textContent = "Connected :D";
        App.conB.innerHTML = "Disconnect";
        App.conEl.style.display = "block"; 
        App.openH();
    },
    closePort: function() {
        App.msgP.textContent = "Disconencted D:";
        App.conB.innerHTML = "Connect";
        App.conEl.style.display = "none"; 
        bluetoothSerial.unsubscribe();
    },
    openH: function() {
        var data = new Uint8Array(16);
        data[0] = 0x84;
        data[1] = App.servos.upM.port;
        data[2] = App.setTarget(App.servos.upM.max, "l");
        data[3] = App.setTarget(App.servos.upM.max, "h");
        data[4] = 0x84;
        data[5] = App.servos.rightM.port;
        data[6] = App.setTarget(App.servos.rightM.max, "l");
        data[7] = App.setTarget(App.servos.rightM.max, "h");
        data[8] = 0x84;
        data[9] = App.servos.downM.port;
        data[10] = App.setTarget(App.servos.downM.max, "l");
        data[11] = App.setTarget(App.servos.downM.max, "h");
        data[12] = 0x84;
        data[13] = App.servos.leftM.port;
        data[14] = App.setTarget(App.servos.leftM.max, "l");
        data[15] = App.setTarget(App.servos.leftM.max, "h");
        App.sendData(data);
    },
    closeH: function() {
        var data = new Uint8Array(16);
        data[0] = 0x84;
        data[1] = App.servos.upM.port;
        data[2] = App.setTarget(App.servos.upM.min, "l");
        data[3] = App.setTarget(App.servos.upM.min, "h");
        data[4] = 0x84;
        data[5] = App.servos.rightM.port;
        data[6] = App.setTarget(App.servos.rightM.min, "l");
        data[7] = App.setTarget(App.servos.rightM.min, "h");
        data[8] = 0x84;
        data[9] = App.servos.downM.port;
        data[10] = App.setTarget(App.servos.downM.min, "l");
        data[11] = App.setTarget(App.servos.downM.min, "h");
        data[12] = 0x84;
        data[13] = App.servos.leftM.port;
        data[14] = App.setTarget(App.servos.leftM.min, "l");
        data[15] = App.setTarget(App.servos.leftM.min, "h");
        App.sendData(data);
    },
    offA: function() {
        var data = new Uint8Array(32);
        data[0] = 0x84;
        data[1] = App.servos.upM.port;
        data[2] = App.setTarget(0, "l");
        data[3] = App.setTarget(0, "h");
        data[4] = 0x84;
        data[5] = App.servos.rightM.port;
        data[6] = App.setTarget(0, "l");
        data[7] = App.setTarget(0, "h");
        data[8] = 0x84;
        data[9] = App.servos.downM.port;
        data[10] = App.setTarget(0, "l");
        data[11] = App.setTarget(0, "h");
        data[12] = 0x84;
        data[13] = App.servos.leftM.port;
        data[14] = App.setTarget(0, "l");
        data[15] = App.setTarget(0, "h");
        data[16] = 0x84;
        data[17] = App.servos.upT.port;
        data[18] = App.setTarget(0, "l");
        data[19] = App.setTarget(0, "h");
        data[20] = 0x84;
        data[21] = App.servos.rightT.port;
        data[22] = App.setTarget(0, "l");
        data[23] = App.setTarget(0, "h");
        data[24] = 0x84;
        data[25] = App.servos.downT.port;
        data[26] = App.setTarget(0, "l");
        data[27] = App.setTarget(0, "h");
        data[28] = 0x84;
        data[29] = App.servos.leftT.port;
        data[30] = App.setTarget(0, "l");
        data[31] = App.setTarget(0, "h");
        App.sendData(data);
    },
    turnU: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.upT.port;
        data[2] = App.setTarget(App.servos.upT.max, "l");
        data[3] = App.setTarget(App.servos.upT.max, "h");
        App.sendData(data);
    },
    turnUp: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.upT.port;
        data[2] = App.setTarget(App.servos.upT.min, "l");
        data[3] = App.setTarget(App.servos.upT.min, "h");
        App.sendData(data);
    },
    turnR: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.rightT.port;
        data[2] = App.setTarget(App.servos.rightT.max, "l");
        data[3] = App.setTarget(App.servos.rightT.max, "h");
        App.sendData(data);
    },
    turnRp: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.rightT.port;
        data[2] = App.setTarget(App.servos.rightT.min, "l");
        data[3] = App.setTarget(App.servos.rightT.min, "h");
        App.sendData(data);
    },
    turnD: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.downT.port;
        data[2] = App.setTarget(App.servos.downT.max, "l");
        data[3] = App.setTarget(App.servos.downT.max, "h");
        App.sendData(data);
    },
    turnDp: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.downT.port;
        data[2] = App.setTarget(App.servos.downT.min, "l");
        data[3] = App.setTarget(App.servos.downT.min, "h");
        App.sendData(data);
    },
    turnL: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.leftT.port;
        data[2] = App.setTarget(App.servos.leftT.max, "l");
        data[3] = App.setTarget(App.servos.leftT.max, "h");
        App.sendData(data);
    },
    turnLp: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.leftT.port;
        data[2] = App.setTarget(App.servos.leftT.min, "l");
        data[3] = App.setTarget(App.servos.leftT.min, "h");
        App.sendData(data);
    },
    openU: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.upM.port;
        data[2] = App.setTarget(App.servos.upM.max, "l");
        data[3] = App.setTarget(App.servos.upM.max, "h");
        App.sendData(data);
    },
    closeU: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.upM.port;
        data[2] = App.setTarget(App.servos.upM.min, "l");
        data[3] = App.setTarget(App.servos.upM.min, "h");
        App.sendData(data);
    },
    openR: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.rightM.port;
        data[2] = App.setTarget(App.servos.rightM.max, "l");
        data[3] = App.setTarget(App.servos.rightM.max, "h");
        App.sendData(data);
    },
    closeR: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.rightM.port;
        data[2] = App.setTarget(App.servos.rightM.min, "l");
        data[3] = App.setTarget(App.servos.rightM.min, "h");
        App.sendData(data);
    },
    openD: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.downM.port;
        data[2] = App.setTarget(App.servos.downM.max, "l");
        data[3] = App.setTarget(App.servos.downM.max, "h");
        App.sendData(data);
    },
    closeD: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.downM.port;
        data[2] = App.setTarget(App.servos.downM.min, "l");
        data[3] = App.setTarget(App.servos.downM.min, "h");
        App.sendData(data);
    },
    openL: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.leftM.port;
        data[2] = App.setTarget(App.servos.leftM.max, "l");
        data[3] = App.setTarget(App.servos.leftM.max, "h");
        App.sendData(data);
    },
    closeL: function() {
        var data = new Uint8Array(4);
        data[0] = 0x84;
        data[1] = App.servos.leftM.port;
        data[2] = App.setTarget(App.servos.leftM.min, "l");
        data[3] = App.setTarget(App.servos.leftM.min, "h");
        App.sendData(data);
    },
    sendData: function(data) {
        var success = function() {
            App.msgP.textContent = "Sended";
            App.inpt.value = "";
        }
        var failure = function() {
            App.msgP.textContent = "Failed to send data";
        };
        bluetoothSerial.write(data, success, failure);
    },
    setTarget: function(t, b)  {
        if(b=="l") {
            var r = t*4&0x7F;
            return r;
        } else if (b=="h") {
            var r = ((t*4)>>7)&0x7F;
            return r;
        }
    }
};
App.init();