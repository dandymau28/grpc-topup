const initService = (c_card) => {
    console.log(`c_card in endController ${c_card}`);
    if (c_card) {
        return {
            message: c_card + ' is permitted to initiate',
            statusCode: 200
        }
    } else {
        return {
            message: 'You are not permitted to initiate',
            statusCode: 500
        }
    }
}

module.exports = {
    initService
}