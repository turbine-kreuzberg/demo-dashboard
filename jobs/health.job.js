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
