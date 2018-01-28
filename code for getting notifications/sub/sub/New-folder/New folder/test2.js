
var getEventsToSubscribe = require('./eventsToSubscribe').getEventsToSubscribe;

var WorkStation = require('./sample1')(1,2).sr;

console.log(WorkStation(3,4))