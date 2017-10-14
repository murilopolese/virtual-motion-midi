/**
Creates generic midi I/O devices
## Linux
1) Enable virtual midi devices: `sudo modprobe snd-virmidi snd_index=1`
1) Start and roll Jack (QjackCtl)
1) Start this script: `node index.js`
1) Open the connections on Jack
1) Connect the virtual output midi device created by this script to the "Virtual Raw Midi 1-0"
1) Connect the "Virtual Raw Midi 1-0" output to the virtual input midi device created by this script

## Macos
No setup required (only on your DAW)

## Playing around

Depending on your setup you will want to sync with the clock or with a midi track from your DAW.
To sync with a midi track you need to send the midi data to the midi input device created
by this script, process the message and send it back to the DAW through the virtual output
midi device also created by this script.
 */
let midi = require('midi');
    motionSensor = require('./motion-sensor.js'),
    // Create where user can input midi data
    input = new midi.input(),
    // Create where user will get midi data from
    output = new midi.output(),
    // List of devices connected
    devices = [];

let openMidiPorts = (inputName, outputName) => {
    inputName = inputName || "Virtual Input";
    outputName = outputName || "Virtual Output";
    // Opens virtual ports to the world of MIDI.
    input.openVirtualPort(inputName);
    output.openVirtualPort(outputName);
};

let onMotionData = (cb) => {
    // Get all the motion sensors connected to the computer
    motionSensor.getDevices()
        .then((devices) => {
            // Bind a function to every data event that comes from the SerialPort
            motionSensor.onData(devices, cb);
        });
};

let onMidiData = (cb) => {
    input.on('message', cb);
};

module.exports = {
    input,
    output,
    openMidiPorts,
    onMotionData,
    onMidiData
};
