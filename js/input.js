$(function() {
    
    TKN.IPSN.map.database = GetURLParameter('db') || 'Testing';    
    $('.title h1').html('Input Page (' + TKN.IPSN.map.database + ')');
        
    TKN.IPSN.map.expId = GetURLParameter('id') || 1;
    
    $.getJSON( TKN.IPSN.map.getDatabaseURL() + '/' + TKN.IPSN.map.expId, function( data ) {
        TKN.IPSN.map.experimentInfo = data;
        
        var map = new TKN.IPSN.map.Map();
        TKN.cardStack = new TKN.CardStack({renderTo: '#cards'});
        
        var expInfo = new TKN.ExperimentInfoCard(data);
        TKN.cardStack.addCard(expInfo);
        var livedata = new TKN.LiveDataCard(TKN.IPSN.map.expId);
        TKN.cardStack.addCard(livedata);
        var wsc = new TKN.WebsocketStatusCard();
        TKN.cardStack.addCard(wsc);
        var robotctrl = new TKN.RobotControlCard();
        TKN.cardStack.addCard(robotctrl);
        var robotpos = new TKN.RobotPositionCard();
        TKN.cardStack.addCard(robotpos);
    });
    
    TKN.ROS.instance.on('error', function(error) {
        TKN.ROS.status = 'error';
    });
    TKN.ROS.instance.on('connection', function() {
        TKN.ROS.status = 'connected';
        TKN.ROS.connectedSince = new Date().getTime();
    });
    TKN.ROS.instance.connect(TKN.ROS.config.wsServer);
    
});

TKN.IPSN.map.markerCallback = function(event) {
    TKN.IPSN.map.marker = this;
    if (TKN.IPSN.map.state == 'ROBOT_GOTO') {
        var label = this.getTitle();
        var marker = TKN.IPSN.map.config.measurementPoints[label];
        var msg = new ROSLIB.Message({'goal': {'target_pose': {'header':{'frame_id':'/map'},'pose': {'position':{'x': marker.x, 'y': marker.y}, 'orientation': {'w': 1.0}}}}});
        TKN.ROS.robotControlTopic.publish(msg);
        TKN.IPSN.map.state = 'ROBOT_MOVING';
        console.log('Robot sent to position (' + marker.x + ', ' + marker.y + ')');
    };
    TKN.cardStack.addCard(new TKN.EstimateInputCard(this.getTitle()));
    TKN.cardStack.close(0);
    TKN.cardStack.close(1);
    TKN.cardStack.close(2);
};
