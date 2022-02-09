/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/protos/topup_end.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var samPackageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var proto = grpc.loadPackageDefinition(samPackageDefinition).topupend;

const url_sam = 'localhost';
const port_sam = '50052';

function getResponse(err, response) {
    console.log(`response from getResponse: ${JSON.stringify(response)}`);

    // resp = response;
    return JSON.stringify(response);
}

function checkCCard(cCard) {
    var client = new proto.InitSam(`${url_sam}:${port_sam}`, grpc.credentials.createInsecure());
 
    console.log(`cCard from index client: ${cCard}`)

    // client.init({c_card: cCard}, getResponse);
    return new Promise((resolve, reject) => {
        client.init({c_card: cCard}, function(err, response) {
            console.log(`response from client: ${JSON.stringify(response)}`);
            console.log(`err from client: ${JSON.stringify(err)}`)
    
            // resp = response;
            if (err) {
                console.log('masuk reject')
                reject(err)
            }
            resolve(response);
        });
        
    })

    // console.log(resp);
    // return resp;
}

module.exports = {
    checkCCard
}
