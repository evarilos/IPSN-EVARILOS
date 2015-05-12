TKN.RobotControlCard = function () {
    var _this = this;
    this.summary = 'Robot Control';
    this.updateSummary();
    
    this.button = $('<input type="button" value="Go to ..." />');
    this.updateContent($('<p></p>').append(this.button));
    this.button.on('click', function () {
        TKN.IPSN.map.state = 'ROBOT_GOTO';
    });
    
    TKN.ROS.robotControlTopic = new ROSLIB.Topic({
        ros : TKN.ROS.instance,
        name : '/move_base/goal',
        messageType : 'move_base_msgs/MoveBaseActionGoal'
    });
    
};

TKN.RobotControlCard.inherits(TKN.Card);