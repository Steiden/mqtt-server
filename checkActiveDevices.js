var mqtt = require('mqtt');
const { PrismaClient } = require('@prisma/client');
const { CheckDevices } = require('./checkDevice');
const prisma = new PrismaClient()

// Variables for calculations
let countPower = 0;
let sumPower = 0;

async function checkActiveDevices(req, res) {
    try {
        // Connect to MQTT broker
        var client = mqtt.connect("mqtt://192.168.30.1");

        setTimeout(async () => {
            let averagePower = 0;

            if (countPower != 0) {
                averagePower = Math.abs((sumPower / countPower).toFixed(5));
            }
            else {
                res.json({ success: false, message: "No devices" });
                return;
            }

            countPower = 0;
            sumPower = 0;

            client.end();

            const devicesIds = CheckDevices(averagePower);
            console.log("Devices Ids: ", devicesIds);

            const devices = await prisma.device.findMany({
                where: {
                    id: {
                        in: devicesIds
                    }
                }
            })

            return res.json({
                success: true, data: devices
            });

        }, 5000);

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
    checkActiveDevices
}