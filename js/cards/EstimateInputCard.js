TKN.EstimateInputCard = function (markerId) {
    var _this = this;
    this.markerId = markerId;
    this.data = TKN.IPSN.map.markers[this.markerId].data;
    this.summary = 'Estimate Input';
    this.content = '<p>loading...</p>';
    this.updateSummary();
    this.updateContent();
    
    this.update();
};

TKN.EstimateInputCard.inherits(TKN.Card);

TKN.EstimateInputCard.method('update', function() {
    var _this = this;
    this.data = TKN.IPSN.map.markers[this.markerId].data;
    
    if (TKN.IPSN.map.errorradius)
        TKN.IPSN.map.errorradius.setMap();
    if (TKN.IPSN.map.errormarker)
        TKN.IPSN.map.errormarker.setMap();

    var content = '<p><em>Label:</em> ' + this.markerId + '<p>';
    var mp = TKN.IPSN.map.config.measurementPoints[this.markerId];
    content += '<p><em>Coordinates:</em> ' + mp.x + ' / ' + mp.y + '</p>';
    if (this.data) {
        content += '<p><em>Estimated Coordinates:</em> ' + this.data.est_coordinate_x + ' / ' + this.data.est_coordinate_y + '</p>';
        var dist = TKN.IPSN.map.pointsToDistance(mp.x, mp.y, this.data.est_coordinate_x, this.data.est_coordinate_y);
        TKN.IPSN.map.errorradius = TKN.IPSN.map.drawErroRadius(mp.x, mp.y, dist);
        TKN.IPSN.map.errormarker = TKN.IPSN.map.drawErrorMarker(this.data.est_coordinate_x, this.data.est_coordinate_y);
    } else {
        content += '<p><em>Estimated Coordinates:</em> </p>';
        var p = $('<p></p>');
        _this.formX = $('<input type="text" name="x" />');
        _this.formY = $('<input type="text" name="y" />');
        _this.button = $('<input type="button" value="Save" />');
        p.append(_this.formX);
        p.append(_this.formY);
        p.append(_this.button);
        var ct = $(content);
        ct.filter(':last').append(p);
        
        var updateView = function() {
            if (TKN.IPSN.map.errorradius)
                TKN.IPSN.map.errorradius.setMap();
            if (TKN.IPSN.map.errormarker)
                TKN.IPSN.map.errormarker.setMap();
            if (_this.formX.val() && _this.formY.val()) {
                var dist = TKN.IPSN.map.pointsToDistance(mp.x, mp.y, _this.formX.val(), _this.formY.val());
                TKN.IPSN.map.errorradius = TKN.IPSN.map.drawErroRadius(mp.x, mp.y, dist);
                TKN.IPSN.map.errormarker = TKN.IPSN.map.drawErrorMarker(_this.formX.val(), _this.formY.val());
            }
        };
        this.formX.on('blur', function(event) {
            updateView();
        });
        this.formY.on('blur', function(event) {
            updateView();
        });
        
        this.button.on('click', function(event) {

            var msg = {
                metrics_storage_URI: 'http://ec2-54-217-136-137.eu-west-1.compute.amazonaws.com:5004/',
                metrics_storage_database: 'IPSN_results_testing',
                metrics_storage_collection: TKN.IPSN.map.expId,
                ground_truth: {
                    point_id: _this.markerId,
                    true_coordinate_x: mp.x,
                    true_coordinate_y: mp.y
                },
                estimate: {
                    est_coordinate_x: _this.formX.val(),
                    est_coordinate_y: _this.formY.val()
                }
            };
            var jxhr = [];
            $.each(TKN.IPSN.map.config.storageDatabases, function(key, val) {
                jxhr.push($.ajax({
                    type: "POST",
                    url: val + 'evarilos/ece/v1.0/add_one_location',
                    data: JSON.stringify(msg),
                    dataType: 'json',
                    contentType: 'application/json'
//                    ,
//                    success: function( data ) {
//                        $.getJSON( TKN.IPSN.map.getDatabaseURL() + '/' + TKN.IPSN.map.expId, function( data ) {
//                            TKN.IPSN.map.experimentInfo = data;
//                            TKN.IPSN.map.drawMarkers();
//                            _this.update();
//                        });
//                    }
                }));
            });
            $.when.apply($, jxhr).done(function() {
                $.getJSON( TKN.IPSN.map.getDatabaseURL() + '/' + TKN.IPSN.map.expId, function( data ) {
                    TKN.IPSN.map.experimentInfo = data;
                    TKN.IPSN.map.drawMarkers();
                    _this.update();
                });
            });
        });
        
        content = ct;
    }
    
    this.updateContent(content);
    this.open();
    
});
