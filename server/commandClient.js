const UDP = require('dgram')

const client = UDP.createSocket('udp4')

const deviceIp = '192.168.86.39';
const controlCommandPort = 4003;

client.on('message', (message, info) => {
    // get the information about server address, port, and size of packet received.

    console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size)

    //read message from server

    console.log('Message from server', message.toString())
})

// Turn On, no reply
const onMessage = {
    msg: {
        cmd: 'turn',
        data: {
            value: 1
        }
    }
};

// Turn Off, no reply
const offMessage = {
    msg: {
        cmd: 'turn',
        data: {
            value: 0
        }
    }
};

// Set Brightness, no reply
const brightnessPercent = 100; // [0, 100]

const brightnessMessage = {
    msg: {
        cmd: 'brightness',
        data: {
            value: brightnessPercent
        }
    }
};


// Set Color, no reply
const colorMessage = {
    msg: {
        cmd: 'colorwc',
        data: {
            color: {
                r: 180, // [0, 255]
                g: 255, // [0, 255]
                b: 190 // [0, 255]
            },
            colorTemInKelvin: 0 // [2000, 9000]
            // When the value of the color temperature is not 0, the device will convert the color temperature value into the color value of red, green, and blue.  When the value of the color temperature is 0, the device will only resolve the value of "r,", "g", and "b" in the color field.
        }
    }
};

// Query Status, replies to server on port 4002
const queryMessage = {
    msg: {
        cmd: 'devStatus',
        data: {
        }
    }
};

// response
// msg: {
//     cmd: 'devStatus',
//     data: {
//         onOff: 1, // [0, 1]
//         brightness: 100, // [0, 100]
//         color: {
//             r: 255, // [0, 255]
//             g: 0, // [0, 255]
//             b: 0 // [0, 255]
//         },
//         colorTemInKelvin: 7200 // [2000, 9000]
//     }
// }



const message = colorMessage;

client.send(JSON.stringify(message), controlCommandPort, deviceIp, (err) => {
    if (err) {
        console.error('Failed to send packet !!')
    } else {
        console.log('Packet send !!')
    }
})
