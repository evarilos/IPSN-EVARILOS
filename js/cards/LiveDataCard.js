TKN.LiveDataCard = function (id) {
    var _this = this;
    this.id = id;
    this.summary = 'Evaluation Summary';
    this.content = '<p>loading...</p>';
    this.updateSummary();
    this.updateContent();
    
//    this.updateTimer = window.setInterval(function() {
//        _this.update();
//    }, 5000);
    this.update();
};

TKN.LiveDataCard.inherits(TKN.Card);

TKN.LiveDataCard.method('update', function() {
    var _this = this;
    
    $.getJSON( TKN.IPSN.map.getDatabaseURL() + '/' + this.id, function( data ) {
        var content = '';
        if (data.locations)
            content += '<p><em>Locations visited:</em> ' + data.locations.length + '<p>';
        else
            content += '<p><em>Locations visited:</em> 0<p>';
        content += '<p><em>Average Error:</em> ' + data.primary_metrics.error_average.toPrecision(4) + '</p>';
        content += '<p><em>Minimum Error:</em> ' + data.primary_metrics.error_min.toPrecision(4) + '</p>';
        content += '<p><em>Median Error:</em> ' + data.primary_metrics.error_median.toPrecision(4) + '</p>';
        content += '<p><em>Maximum Error:</em> ' + data.primary_metrics.error_max.toPrecision(4) + '</p>';
        content += '<p><em>RMS Error:</em> ' + data.primary_metrics.error_rms.toPrecision(4) + '</p>';
        content += '<p><em>Error Variance:</em> ' + data.primary_metrics.error_variance.toPrecision(4) + '</p>';
        _this.updateContent(content);
    });
});
