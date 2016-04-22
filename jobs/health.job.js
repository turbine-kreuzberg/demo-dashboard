var Client = require('node-kubernetes-client');
var Promise = require('promise');
//var http = require('http');
var ping = require('ping');
var points = [];

var intervalTiming = 5000;

/* Get a new client */
var client = new Client({
    host: process.env.KUBERNETES_URL || '172.17.8.101:8080',
    protocol: 'http',
    version: 'v1',
    token: 'XYZ'
});

function getCheckIpPromise(ip, name) {
    return new Promise(function (resolve, reject) {
        var options = {
            host: ip,
            port: 81,
            path: '/dashboard/',
            method: 'GET'
        };

        ping.promise.probe(ip)
            .then(function (res) {
                resolve({
                    online: res.alive,
                    name: name
                });
            });

        /** @todo Why does this not work? */
//        http.get(options, function (res) {
//console.log(res.statusCode);
//            resolve({
//                //status: res.statusCode,
//                status: 1,
//                name: name
//            });
//        }).on('error', function (e) {
//            resolve({
//                //status: e.code,
//                status: 0,
//                name: name
//            });
//        });
    });
}

setInterval(function () {

    client.nodes.get(function (err, nodes) {
        var nodeItemsArray;

        if (err != null) {
            console.log('err client: ', err);
            send_event('health-core-01', {criticals: 0, warnings: 1});
            send_event('health-core-02', {criticals: 0, warnings: 1});
            send_event('health-core-03', {criticals: 0, warnings: 1});
            send_event('health-core-04', {criticals: 0, warnings: 1});
            return;
        }

        nodeItemsArray = nodes[0].items;

        for (var i = 0, ilen = nodeItemsArray.length; i < ilen; i++) {
            var ipCheckers = [];

            for (var j = 0, jlen = nodeItemsArray[i].status.addresses.length; j < jlen; j++) {
                ipCheckers.push(getCheckIpPromise(
                    nodeItemsArray[i].status.addresses[j].address,
                    nodeItemsArray[i].metadata.name
                ));
            }

            Promise.all(ipCheckers)
                .then(function (results) {
                    var atLeastOneOnline = false;


                    for (var k = 0, klen = results.length; k < klen; k++) {
                        if (results[k].online == true) {
                            atLeastOneOnline = true;
                        }
                    }

                    send_event('health-' + results[0].name, {criticals: (atLeastOneOnline ? 0 : 1), warnings: 0});
                });
        }
    });

}, intervalTiming);
