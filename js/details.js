$(function() {
    
    TKN.IPSN.map.database = GetURLParameter('db') || 'Testing';
    $('.title h1').html('Details Page (' + TKN.IPSN.map.database + ')');
    
    TKN.IPSN.map.expId = GetURLParameter('id') || 1;
    
    $.getJSON( TKN.IPSN.map.getDatabaseURL() + '/' + TKN.IPSN.map.expId, function( data ) {
        TKN.IPSN.map.experimentInfo = data;
        
        var map = new TKN.IPSN.map.Map();
        TKN.cardStack = new TKN.CardStack({renderTo: '#cards'});
        
        var expInfo = new TKN.ExperimentInfoCard(data);
        TKN.cardStack.addCard(expInfo);
        var livedata = new TKN.LiveDataCard(TKN.IPSN.map.expId);
        TKN.cardStack.addCard(livedata);
    
    });
    
});

TKN.IPSN.map.markerCallback = function(event) {
    TKN.IPSN.map.marker = this;
    TKN.cardStack.addCard(new TKN.PointInfoCard(TKN.IPSN.map.expId, this));
};
