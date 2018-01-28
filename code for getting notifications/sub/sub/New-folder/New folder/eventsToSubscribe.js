//////////////////////////////////////////////////////////////////////
//GET URL ARRAY FOR EACH WORK STATION...........................
//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

module.exports = {
  getEventsToSubscribe: getEventsToSubscribe
};

var EVENT_LIST_WS = require('./zoneChangeNotifications').list();
var paperList = require('./zoneChangeNotifications').paperList();
var palletList = require('./zoneChangeNotifications').palletList();
var drawEndExecution = require('./zoneChangeNotifications').drawEndExecution();

function getEventsToSubscribe(conveyorName, robotName, workStationNumber, conveyorIP, robotIP){
		var url = [];
		switch (workStationNumber) {
			case 1:
				url.push((robotIP + paperList.replacePaperEnded));
				break;
			case 7:
				break;
			default:
				url.push((robotIP + drawEndExecution));
				break;
		}		
		for(i=0;i<EVENT_LIST_WS.length;i++) //subscribing to all zone changes of the workstation to its server
		{
			if(conveyorIP)
				url.push((conveyorIP+EVENT_LIST_WS[i]));
		}		
		return url;
}