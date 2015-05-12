TKN.PublishEmptyMessageCard = function (topic) {
    var _this = this;
    this.summary = 'Publish to ' + topic;
    this.updateSummary();
    
    this.button = $('<input type="button" value="Publish" />');
    this.updateContent($('<p></p>').append(this.button));
    this.button.on('click', function () {
        var msg = new ROSLIB.Message();
        _this.topic.publish(msg);
    });
    
    this.topic = new ROSLIB.Topic({
        ros : TKN.ROS.instance,
        name : topic,
        messageType : 'std_msgs/Empty'
    });
};

TKN.PublishEmptyMessageCard.inherits(TKN.Card);
