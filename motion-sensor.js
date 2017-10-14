let SerialPort = require('serialport');

// Connect to the motion sensor via SerialPort
let getDevices = () => {
    return SerialPort.list()
        .then((ports) => {
            return new Promise((resolve, reject) => {
                let serialPorts = ports.filter((port) => {
                    return port.vendorId === '2341';
                });
                let devices = serialPorts.map((port) => {
                    return new SerialPort(port.comName, {
                        baudRate: 115200
                    });
                });
                resolve(devices);
            });
        });
}

var onData = (devices, cb) => {
    devices.forEach((device) => {
        device.on('open', () => {
            console.log('motion-sensor connected');
        });
        device.on('data', (d) => {
            let data = {};
            try {
                data = JSON.parse(d.toString());
                cb(data);
            } catch (e) {
                // console.log(e);
            }
        });
        device.open((err) => {
            // if (err) { console.log(err); }
        });
    })
}

module.exports = {
    getDevices: getDevices,
    onData: onData
}
