const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { StartWriteConsumptions } = require('./data');
const { Test } = require('./test');
const { checkActiveDevices } = require('./checkActiveDevices');
const { getConsumptions } = require('./getConsumptions');
const cors = require('./cors');
const { HighVolt } = require('./highVolts');

const prisma = new PrismaClient()

const PORT = 3000;
const app = express();

app.use(cors, express.json());

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    StartWriteConsumptions();
    // Test();
});

app.get('/consumptions', async (req, res) => {
    getConsumptions(req, res);
});

app.get('/devices', async (req, res) => {
    try {
        const devices = await prisma.device.findMany();
        res.json({ success: true, data: devices });
    } catch (err) {
        res.json({ success: false, error: err });
    }
});

app.get('/devices/active', (req, res) => {
    // checkActiveDevice(req, res);
    checkActiveDevices(req, res);
});

app.get('/high-volts', async (req, res) => {
    HighVolt(req, res);
});