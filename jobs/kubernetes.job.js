/**
 * Created by ray on 21.04.16.
 */
var Client = require('node-kubernetes-client');
var K8s = require('k8s');
var j = 1;
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
            // console.log(nodeItemsArray[i].metadata.name + ':', nodeItemsArray[i].status.conditions[1]);

            var nodeName = nodeItemsArray[i].metadata.name;
            var nodeStatus = nodeItemsArray[i].status.conditions[1].status;
            var criticalNum, warningNum;

            if (nodeStatus == 'True') {
                criticalNum = 0;
                nodesOnline++;
            } else {
                criticalNum = 1;
            }

            warningNum = 0;

            send_event('health-' + nodeName, { criticals: criticalNum, warnings: warningNum });
        }
        // console.log('==============', j);
    });

    j++;

}, 2 * 1000);



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
