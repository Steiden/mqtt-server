var mqtt = require('mqtt');
const { PrismaClient } = require('@prisma/client');
const { CheckDevice } = require('./checkDevice');
const prisma = new PrismaClient()

// Variables for calculations
let countPower = 0;
let sumPower = 0;

let countVoltage = 0;
let sumVoltage = 0;

async function StartWriteConsumptions() {
    try {
        // Connect to MQTT broker
        var client = mqtt.connect("mqtt://192.168.30.1");

        setInterval(() => {
            createData();
        }, 10000);

        // Connect to DB
        client.on('connect', function () {
            console.log("Connected!");

            client.subscribe('/devices/wb-map3e_69/controls/P L1', function (err, device) {
            })

            client.subscribe('/devices/wb-map3e_69/controls/Irms L1', function (err, device) {
            })
        });

        client.on('message', function (topic, message) {
            // Calculate average power
            if (topic.toString() == '/devices/wb-map3e_69/controls/P L1') {
                countPower++;
                sumPower += parseFloat(message.toString());
            }

            // Calculate average voltage
            if (topic.toString() == '/devices/wb-map3e_69/controls/Irms L1') {
                countVoltage++;
                sumVoltage += parseFloat(message.toString());
            }
        });

    }
    catch (e) {
        console.log("error" + e);
    }
}

async function createData() {
    // Write to DB every 10 seconds

    let averagePower = 0;
    let averageVoltage = 0;
    let deviceId = 0;

    if (countPower != 0 && countVoltage != 0) {
        averagePower = (sumPower / countPower).toFixed(5);
        averageVoltage = (sumVoltage / countVoltage).toFixed(8);
    }

    const consumption = {
        power: Math.abs(parseFloat(averagePower)),
        voltage: Math.abs(parseFloat(averageVoltage))
    }

    console.log(consumption);

    // Check, what the device is?
    deviceId = CheckDevice(consumption.power);

    if (deviceId > 0) {
        const consumptionData = await prisma.consumption.create({
            data: {
                deviceId: deviceId,
                power: consumption.power,
                voltage: consumption.voltage,
                sumPower: Math.abs(sumPower),
                sumVoltage: Math.abs(sumVoltage)
            }
        })

        console.log("Consumption saved!", consumptionData);
    }

    countPower = 0;
    sumPower = 0;

    countVoltage = 0;
    sumVoltage = 0;
}

module.exports = {
    StartWriteConsumptions
}