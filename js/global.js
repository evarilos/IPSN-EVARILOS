var TKN = TKN || {};
TKN.IPSN = TKN.IPSN || {};

TKN.ROS = {
    config: {
        wsServer: 'ws://tbot-unit04.:9090'
    },
    instance: new ROSLIB.Ros()
};

TKN.IPSN.map = {
    config: {
        databases: [
            {label: 'Manual', url: 'http://ebp.evarilos.eu:5005/evarilos/metrics/v1.0/database/IPSN_results_manual/experiment'},
            {label: 'Robot', url: 'http://ebp.evarilos.eu:5005/evarilos/metrics/v1.0/database/IPSN_results_robot/experiment'}
        ],
        mapURL: 'http://ebp.evarilos.eu:5004/',
        containerId: 'map',
        mapCenter: {
            Lat:0,
            Lon:20
        },
        storageDatabases: [
            'http://ebp.evarilos.eu:5005/',
            'http://localhost:5005/'
        ],
        mapDimensions: {
            zeropoint: {
                Lat: -3.1624555302378474,
                Lon: -3.9990234375
            },
            xMax: {
                Lat: -3.1624555302378474,
                Lon: 19.9072265625
            },
            yMax: {
                Lat: 21.820707853875028,
                Lon: -3.9990234375
            },
            xDistance: 9.67,
            yDistance: 10.44
        },
        mapDimensionsTKN: {
            zeropoint: {
                Lat: -61.897577621605016,
                Lon: -177.626953125
            },
            xMax: {
                Lat:-61.897577621605016,
                Lon:178.3740234375
            },
            yMax: {
                Lat:68.52823492039876,
                Lon:-177.71484375
            },
            xDistance: 31.61,
            yDistance: 15.53
        },
        measurementPoints: {
            1: {x: 16.698, y: 7.013},
            2: {x: 19.050, y: 2.918},
            3: {x: 17.155, y: 1.200},
            4: {x: 13.460, y: 2.268},
            5: {x: 11.779, y: 5.528},
            6: {x: 14.510, y: 6.663},
            7: {x: 12.060, y: 9.647},
            8: {x: 17.908, y: 9.380},
            9: {x: 3.608, y: 7.819},
            10: {x: 4.945, y: 4.609},
            11: {x: 3.058, y: 3.589},
            12: {x: 0.476, y: 2.206},
            13: {x: 6.644, y: 0.720},
            14: {x: 8.262, y: 2.186},
            15: {x: 9.404, y: 3.959},
            16: {x: 7.414, y: 7.183},
            17: {x: 8.494, y: 14.618},
            18: {x: 13.462, y: 12.698},
            19: {x: 10.601, y: 15.185},
            20: {x: 14.561, y: 15.869}
        }
    },
    instance: undefined,
    markers: {}
};

TKN.IPSN.map.getDatabaseURL = function() {
    var url = '#';
    $.each(TKN.IPSN.map.config.databases, function(key, val) {
        if (val.label == TKN.IPSN.map.database)
            url = val.url;
    })
    return url;
};

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
};
