var PROTO_PATH = __dirname + '/protos/topup_end.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
let { initService } = require('./controllers/endController');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })

var topup_proto = grpc.loadPackageDefinition(packageDefinition).topupend;

const url = 'localhost';
const port = '50052';

function init(call, callback) {
    console.log(`Request given: ${JSON.stringify(call.request)}`)
    let initResponse = initService(call.request.c_card);

    callback(null, initResponse);
}

function main() {
    var server = new grpc.Server();
    server.addService(topup_proto.InitSam.service, {init: init});
    server.bindAsync(`${url}:${port}`, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log(`Server has been running on ${url}:${port}`);
    })
}

main()