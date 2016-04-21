/**
 * Created by ray on 21.04.16.
 */
var Client = require('node-kubernetes-client');
var K8s = require('k8s');

var client = new Client({
    host:  '172.17.8.101',
    protocol: 'http',
    version: 'v1',
    token: 'XYZ'
});

var kubeapi = K8s.api({
    endpoint: 'http://10.16.0.1:8080'
    , version: 'v1'
});

setInterval(function() {

    client.pods.get(function (err, pods) {
        console.log('podsss:', pods);
        console.log('err client: ', err);
        //send_event('welcome', { text: 'pods' });
    });
    kubeapi.get('/namespaces/default/services/kubernetes', function(err, data){
        console.log('data:', data);
        console.log('err api: ', err);
        send_event('welcome', { text: data });
    });

    //send_event('welcome', { text: 'test' });

}, 2 * 1000);