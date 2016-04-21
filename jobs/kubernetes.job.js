/**
 * Created by ray on 21.04.16.
 */
var Client = require('node-kubernetes-client');
var K8s = require('k8s');

var client = new Client({
    host:  'https://10.16.0.1:443',
    protocol: 'http',
    version: 'v1',
    token: 'XYZ'
});

setInterval(function() {

    client.pods.get(function (err, pods) {
        var m = pods
        console.log('podsss:', m);
        console.log('err client: ', err);
        send_event('welcome', { text: m });
    });


    //send_event('welcome', { text: 'test' });

}, 2 * 1000);