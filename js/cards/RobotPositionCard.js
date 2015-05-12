TKN.RobotPositionCard = function () {
    var _this = this;
    this.summary = 'Current robot position';
    this.updateSummary();
    
    this.updateContent($('<p>x: </p><p>y:</p>'));
    
    this.topic = new ROSLIB.Topic({
        ros : TKN.ROS.instance,
        name : '/absolute_position',
        messageType : 'twistbot_tools/PositionAngle'
    });
    
    this.topic.subscribe(function(message){_this.update(message)});
};

TKN.RobotPositionCard.inherits(TKN.Card);

TKN.RobotPositionCard.method('update', function (message) {
    this.content = '<p>x: ' + parseFloat(message.position.x).toFixed(2) + ' m</p><p>y: ' + parseFloat(message.position.y).toFixed(2) + ' m</p>';
    var position = new google.maps.LatLng(TKN.IPSN.map.yToLat(message.position.y),TKN.IPSN.map.xToLon(message.position.x));
    if (this.marker) {
        this.marker.setPosition(position);
    } else {
        this.marker = new google.maps.Marker({
            position: position,
            map: TKN.IPSN.map.instance,
            title: 'robot',
            icon: 'img/tbot_pin.png'
        });
    }

    this.updateContent();
});
