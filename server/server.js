const UDP = require('dgram')

const server = UDP.createSocket('udp4')

const port = 2222
const multicastIp = '239.255.255.250';
const scanCommandPort = 4001;
const receiverPort = 4002;
const devicePort = 4003;

server.on('listening', () => {
    // Server address it’s using to listen

    const address = server.address()

    console.log('Listining to ', 'Address: ', address.address, 'Port: ', address.port)
});

server.on('message', (message, info) => {
    console.log('Message', message.toString())

    const response = Buffer.from('Message Received')

    //sending back response to client

    server.send(response, info.port, info.address, (err) => {
        if (err) {
            console.error('Failed to send response !!')
        } else {
            console.log('Response send Successfully')
        }
    })
});

server.bind(receiverPort);


let response = {
    msg: {
        cmd: "scan",
        data: {
            ip: "192.168.86.39",
            device: "4E:9F:D3:35:34:31:41:83",
            sku: "H6046",
            bleVersionHard: "3.02.01",
            bleVersionSoft: "1.00.09",
            wifiVersionHard: "1.02.00",
            wifiVersionSoft: "2.05.08"
        }
    }
}
