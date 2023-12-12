const UDP = require('dgram')

const client = UDP.createSocket('udp4')

const multicastIp = '239.255.255.250';
const scanCommandPort = 4001;

client.on('message', (message, info) => {
    // get the information about server address, port, and size of packet received.

    console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size)

    //read message from server

    console.log('Message from server', message.toString())
})

const requestScanMessage = {
    msg: {
        cmd: 'scan',
        data: {
            account_topic: 'reserve'
        }
    }
};

client.send(JSON.stringify(requestScanMessage), scanCommandPort, multicastIp, (err) => {
    if (err) {
        console.error('Failed to send packet !!')
    } else {
        console.log('Packet send !!')
    }
})
