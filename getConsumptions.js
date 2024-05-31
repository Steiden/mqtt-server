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
                consumptions = [];
                for (let i = 0; i < 60; i++) {
                    let tempConsumptions = await prisma.consumption.findMany({
                        where: {
                            created_at: {
                                gte: new Date(Date.now() - (3000000 - 60000 * i)),
                                lte: new Date(Date.now())
                            }
                        },
                        include: {
                            device: true
                        }
                    })


                    sum = 0;

                    for (let i = 0; i < tempConsumptions.length; i++) {
                        sum = sum + tempConsumptions[i].sumPower;
                    }


                    consumptions.push({
                        sumPower: sum,
                        created_at: new Date(Date.now() - (3000000 - 60000 * i))
                    });
                }


            }
            if (req.query.period === '1d') {

                consumptions = [];
                for (let i = 0; i < 48; i++) {
                    let tempConsumptions = await prisma.consumption.findMany({
                        where: {
                            created_at: {
                                gte: new Date(Date.now() - (86400000 - 1800000 * i)),
                                lte: new Date(Date.now())
                            }
                        },
                        include: {
                            device: true
                        }
                    })


                    sum = 0;

                    for (let i = 0; i < tempConsumptions.length; i++) {
                        sum = sum + tempConsumptions[i].sumPower;
                    }


                    consumptions.push({
                        sumPower: sum,
                        created_at: new Date(Date.now() - (86400000 - 1800000 * i))
                    });
                }
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