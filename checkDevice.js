function CheckDevice(power) {
    console.log("Power", power);
    if (power > 4 && power < 15) {
        return 1;
    }
    else if (power > 30 && power < 80) {
        return 2;
    }
    else if (power > 300 && power < 1000) {
        return 3;
    }

    return 0;
}

function CheckDevices(power) {
    console.log("Power", power);

    if (power > 780 && power < 820)    // Toaster + Lampa + Ventilyator
        return [1, 2, 3];
    else if (power > 760 && power < 780)    // Toaster + Ventilyator
        return [2, 3];
    else if (power > 755 && power < 760)    // Toaster + Lampa
        return [1, 3];
    else if (power > 730 && power < 755)    // Toaster
        return [3];
    else if (power > 42.5 && power < 47)  // Ventilyator + Lampa
        return [1, 2];
    else if (power > 32 && power < 45)  // Ventilyator
        return [2];
    else if (power > 4 && power < 15)   // Lampa
        return [1];
    else
        return [];
}

module.exports = {
    CheckDevice,
    CheckDevices
}