const { checkCCard } = require('../index-client.js')
const md5 = require('md5');

const initService = ({ token, c_card }) => {
    console.log("In on initService @ initController");
    console.log(`cCard from initController: ${c_card}`)

    if (token != md5('You\'ve made it!'))
        return new Promise(function(resolve, reject) {
            resolve({
                message: 'Your token is wrong!',
                statusCode: 400
            })
        }) 

    return checkCCard(c_card);
}

const authToken = async(authObject) => {
    try {
        let { terminalCode, hash } = authObject;
        let terminal_hash = md5(terminalCode);
        let token = '';

        if (terminal_hash == hash) {
            token = md5('You\'ve made it!');

            return { 
                token,
                message: 'Here is your token',
                statusCode: 200
            }
        }

        return {
            token,
            message: 'No token for you',
            statusCode: 500
        }
    } catch (err) {
        return {
            token: '',
            message: err.message,
            statusCode: 500
        }
    }
}

module.exports = {
    initService,
    authToken
}