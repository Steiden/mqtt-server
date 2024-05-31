var mqtt = require('mqtt');

function Test() {
    try {
        // Connect to MQTT broker
        var client = mqtt.connect("mqtt://192.168.30.1");

        let countPower = 0;
        let sumPower = 0;

        setTimeout(() => {
            const averagePower = Math.abs(parseFloat(sumPower / countPower)).toFixed(5);

            console.log(averagePower);
        }, 60000);

        // Connect to DB
        client.on('connect', function () {
            console.log("Connected!");

            client.subscribe('/devices/wb-map3e_69/controls/P L1', function (err, device) {
            })
        });

        client.on('message', function (topic, message) {
            // Calculate average power
            if (topic.toString() == '/devices/wb-map3e_69/controls/P L1') {
                countPower++;
                sumPower += parseFloat(message.toString());
            }
        });

    }
    catch (e) {
        console.log("error" + e);
    }
}

module.exports = {
    Test
}