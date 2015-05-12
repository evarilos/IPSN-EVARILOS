var TKN = TKN || {};
TKN.IPSN = TKN.IPSN || {};

TKN.IPSN.ranking = {
    config: {
        updateInterval: 200000,
        databases: [
            {label: 'Manual', url: 'http://ebp.evarilos.eu:5005/evarilos/metrics/v1.0/database/IPSN_results_manual/experiment'},
            {label: 'Robot', url: 'http://ebp.evarilos.eu:5005/evarilos/metrics/v1.0/database/IPSN_results_robot/experiment'}
        ],
        defaultDB: 'Manual',
        detailsURL: 'http://ebp.evarilos.eu:5004/details.html'
    }
};

TKN.IPSN.ranking.getDatabaseURL = function() {
    var url = '#';
    $.each(TKN.IPSN.ranking.config.databases, function(key, val) {
        if (val.label == (TKN.IPSN.ranking.database || TKN.IPSN.ranking.config.defaultDB))
            url = val.url;
    })
    return url;
};

TKN.IPSN.ranking.getDetailsURL = function(id) {
    return TKN.IPSN.ranking.config.detailsURL + '?db=' + (TKN.IPSN.ranking.database || TKN.IPSN.ranking.config.defaultDB) + '&id=' + id;
};

// Update table
TKN.IPSN.ranking.updateTable = function() {
    var newTable = $('<table/>');
    newTable.addClass('ranking');
    newTable.append('<thead><tr><th class="anim:position position">#</th><th class="anim:id id">Localization Solution</th><th class="anim:constant competitor">Competitior</th><th class="anim:update error">Avg. Error</th><th class="anim:constant details">Details</th></tr></thead>');

    var databaseURL = TKN.IPSN.ranking.getDatabaseURL();
    $.getJSON( databaseURL, function( data ) {
        var jxhr = [];
        var rows = $('<div/>');
        $.each( data, function( key, val ) {
            // request multiple JSON files (one per experiment)
            jxhr.push($.getJSON( val, function( data ) {
                            if (data.primary_metrics.error_average.toPrecision(3) != 0.0)
                            {
                            
                          
                            var tds = [];
                            tds.push('<td class="position"></td>');
                            tds.push('<td class="id"><a href="' + data.sut.link + '">' + data.sut.sut_name + '</a></td>');
                            tds.push('<td class="competitor">' + data.sut.competitor_name + '</td>');
                            tds.push('<td class="error">' + data.primary_metrics.error_average.toPrecision(3) + '</td>');
                            tds.push('<td class="details"><a href="' + TKN.IPSN.ranking.getDetailsURL(key) + '">Details</a></td>');
                            // create one row per experiment
                               $('<tr/>', { html: tds.join('')}).appendTo(rows);
                                                                                    }
            }));
        });
        $.when.apply($, jxhr).done(function() {
            // when done with all experiment, sort, fill in position column and update view
            var count = 1;
            var sortedTrs = rows.find('tr').tsort('td:nth-child(4)', {order:'asc'});
            $.each(sortedTrs, function( key, val ) {
                $(sortedTrs[key]).children('.position').html(count++);
                newTable.append(sortedTrs[key]); 
            });
            $('.ranking').rankingTableUpdate(newTable);
            $('#lastupdated span').html(new Date());
            window.setTimeout(TKN.IPSN.ranking.updateLoop, TKN.IPSN.ranking.config.updateInterval);
        });
    });
};

TKN.IPSN.ranking.resetTable = function() {
    $('.ranking').empty();
    $('.ranking').append('<thead><tr><th class="anim:position position">#</th><th class="anim:id id">Localization Solution</th><th class="anim:constant competitor">Competitior</th><th class="anim:update error">Avg. Error</th><th class="anim:constant details">Details</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody>');
};

TKN.IPSN.ranking.changeDB = function(event) {
    $('.databaseLink').removeClass('active');
    $(this).addClass('active');
    TKN.IPSN.ranking.database = this.innerHTML;
    $('#logo').removeClass('inactive');
    TKN.IPSN.ranking.resetTable();
};

TKN.IPSN.ranking.updateLoop = function() {
    if ($('#logo').hasClass('inactive'))
        return;
    else
        TKN.IPSN.ranking.updateTable();
};

jQuery(function() {
 
    $.each(TKN.IPSN.ranking.config.databases, function(key, val) {
        var a = $('<a />').addClass('databaseLink').html(val.label);
        if (val.label == TKN.IPSN.ranking.config.defaultDB)
            a.addClass('active');
        a.appendTo($('#database'));
        a.on('click', TKN.IPSN.ranking.changeDB);
    });
    
    // Click Handler
    $('#logo').on('click', function () {
        $(this).toggleClass('inactive');
    });
       
    // Run
    TKN.IPSN.ranking.updateLoop();
    TKN.IPSN.ranking.timer = window.setInterval(TKN.IPSN.ranking.config.updateInterval, TKN.IPSN.ranking.updateLoop);
});
