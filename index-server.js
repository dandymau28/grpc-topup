var PROTO_PATH = __dirname + '/protos/topup.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
let { initService, authToken } = require('./controllers/initController');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })

var topup_proto = grpc.loadPackageDefinition(packageDefinition).topup;

const url = 'localhost';
const port = '50051';

function auth(call, callback) {
    let authObj = {
        terminalCode: call.request.c_terminal,
        hash: call.request.hash
    };

    authToken(authObj)
    .then(result => {
        console.log("result on index server", result);
        callback(null, result);
    })
    .catch(err => {
        console.log("err on index server", err);
        callback(err, null);
    })
}

function init(call, callback) {
    console.log(`Request given: ${JSON.stringify(call.request)}`)
    // let initResponse = await initService(call.request.c_card);
    let initObj = {
        token: call.request.token,
        c_card: call.request.c_card
    }

    initService(initObj)
    .then(result => {
        console.log(`initResponse on index server: ${result}`)
        callback(null, result);
    })
    .catch(err => {
        console.log(`err on index server: ${err}`)
        callback(null, err);
    })

}

function main() {
    var server = new grpc.Server();
    server.addService(topup_proto.InitSam.service, {init: init, auth: auth});
    // server.addService(topup_proto.InitSam.service, {auth: auth});
    server.bindAsync(`${url}:${port}`, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log(`Server has been running on ${url}:${port}`);
    })
}

main()