// var checkStatus = function(requestPath) {
//     if (requestPath == null) {
//         requestPath = "/";
//     }
//     var options = {
//         host: 'www.votum.de',
//         port: 80,
//         path: requestPath,
//         method: 'GET'
//     };
//
//     http.get(options, function(res) {
//         console.log("Got response: " + res.statusCode);
//     }).on('error', function(e) {
//         console.log("Got error: " + e.message);
//     });
//
// }
//
// setInterval(function() {
//     var last_valuation = current_valuation;
//     var last_karma = current_karma;
//     current_valuation = Math.floor(Math.random() * 100);
//     current_karma = Math.floor(Math.random() * 200000);
//
//     send_event('valuation', {current: current_valuation, last: last_valuation});
//     send_event('karma', {current: current_karma, last: last_karma});
//     // send_event('synergy', {value: Math.floor(Math.random() * 100)});
//     send_event('health-coreos001', { criticals: 0, warnings: 3 });
//     send_event('health-coreos002', { criticals: 0, warnings: 0 });
//     send_event('health-coreos003', { criticals: 1, warnings: 7 });
//     send_event('health-coreos004', { criticals: 0, warnings: 0 });
// }, 2 * 1000);
var Client = require('node-kubernetes-client');
var K8s = require('k8s');
var k = 1;
var points = [];
var nodesOnline;

var client = new Client({
    host:  '172.17.8.101:8080',
    protocol: 'http',
    version: 'v1',
    token: 'XYZ'
});

setInterval(function() {

    client.nodes.get(function (err, nodes) {
        if (err != null) {
            console.log('err client: ', err);
            send_event('health-core-01', { criticals: 1, warnings: 0 });
            send_event('health-core-02', { criticals: 1, warnings: 0 });
            send_event('health-core-03', { criticals: 1, warnings: 0 });
            send_event('health-core-04', { criticals: 1, warnings: 0 });
            return;
        }

        // var json = JSON.parse(nodes);
        var nodeItemsArray = nodes[0].items;
        nodesOnline = 0;

        for (var i=0; i < nodeItemsArray.length; i++) {
            // console.log(nodeItemsArray[i].metadata.name + ':', nodeItemsArray[i].status.addresses[1].address);
            var nodeStatus = false;

            for (var j=0; j<nodeItemsArray[i].status.addresses.length; j++) {

                var LegacyHostIP = nodeItemsArray[i].status.addresses[j].address;

                var options = {
                    host: LegacyHostIP,
                    port: 81,
                    path: '/dashboard/',
                    method: 'GET'
                };

                http.get(options, function(res) {
                    console.log("Got response: " + res.statusCode);
                    nodeStatus = true;
                    j = nodeItemsArray[i].status.addresses.length;
                }).on('error', function(e) {
                    console.log("Got error: " + e.message);
                });




            }

            var nodeName = nodeItemsArray[i].metadata.name;
            var nodeStatus = nodeItemsArray[i].status.conditions[1].status;
            var criticalNum, warningNum;

            if (nodeStatus == true) {
                criticalNum = 0;
                nodesOnline++;
            } else {
                criticalNum = 1;
            }

            warningNum = 0;

            send_event('health-' + nodeName, { criticals: criticalNum, warnings: warningNum });
        }
        console.log('==============', k);
    });

    k++;

}, 5000);



// // Populate the graph with some random points
// var points = [];
// for (var i = 1; i <= 10; i++) {
//     points.push({x: i, y: Math.floor(Math.random() * 50)});
// }
// var last_x = points[points.length - 1].x;
//
// setInterval(function() {
//     points.shift();
//     points.push({x: ++last_x, y: Math.floor(Math.random() * 50)});
//
//     send_event('convergence', {points: points});
// }, 2 * 1000);
