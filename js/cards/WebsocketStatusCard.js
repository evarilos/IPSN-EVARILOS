TKN.WebsocketStatusCard = function () {
    var _this = this;
    this.summary = 'Websocket Summary';
    this.updateSummary();
    this.content = '<p style="color:red;">Not connected</p>';
    
    TKN.ROS.instance.on('connection', function() {
        _this.update();
        _this.timerUpdate = setInterval(function(){_this.update();}, 1000);
    });
    
    this.update();
};

TKN.WebsocketStatusCard.inherits(TKN.Card);

TKN.WebsocketStatusCard.method('update', function () {
    if (TKN.ROS.status === 'connected') {
        var now = new Date().getTime();
        var since = TKN.ROS.connectedSince;
        this.content = '<p>Connected to ' + TKN.ROS.config.wsServer + '</p>';
        this.content += '<p>for ' + Math.round((now - since) / 1000) + ' seconds</p>';
    }
    
    this.updateContent();
});
