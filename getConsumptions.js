const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getConsumptions(req, res) {
    try {
        let consumptions = null;

        if (req.query.period) {
            if (req.query.period === '1min') {
                consumptions = await prisma.consumption.findMany({
                    where: {
                        created_at: {
                            gte: new Date(Date.now() - 60000),
                            lte: new Date(Date.now())
                        }
                    },
                    include: {
                        device: true
                    }
                })
            }
            if (req.query.period === '1h') {
                consumptions = await prisma.consumption.findMany({
                    where: {
                        created_at: {
                            gte: new Date(Date.now() - 3600000),
                            lte: new Date(Date.now())
                        }
                    },
                    include: {
                        device: true
                    }
                })
            }
            if (req.query.period === '1d') {
                consumptions = await prisma.consumption.findMany({
                    where: {
                        created_at: {
                            gte: new Date(Date.now() - 86400000),
                            lte: new Date(Date.now())
                        }
                    },
                    include: {
                        device: true
                    }
                })
            }
            if (req.query.period === '1w') {
                consumptions = await prisma.consumption.findMany({
                    where: {
                        created_at: {
                            gte: new Date(Date.now() - 604800000),
                            lte: new Date(Date.now())
                        }
                    },
                    include: {
                        device: true
                    }
                })
            }
            if (req.query.period === '1m') {
                consumptions = await prisma.consumption.findMany({
                    where: {
                        created_at: {
                            gte: new Date(Date.now() - 2592000000),
                            lte: new Date(Date.now())
                        }
                    },
                    include: {
                        device: true
                    }
                })
            }
        }
        else {
            consumptions = await prisma.consumption.findMany({
                include: {
                    device: true
                }
            });
        }

        res.json({ success: true, data: consumptions });
    } catch (err) {
        res.json({ success: false, error: err });
    }
}

module.exports = {
    getConsumptions
}