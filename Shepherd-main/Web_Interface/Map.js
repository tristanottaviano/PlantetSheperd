//Generate the map
let displayMap;
//Array of google object cell
var grid = [];

//GeoJson array grid and forbidden zones
var gridJson = [];
var zoneJson = [];

//Array of forbidden zones coordinates
var coordinates = [];

//tmp listZone
var tmpListZone = [];

//Array of index of selected zone
var tmpIndex = [];

//Temporary coordinates to push in the array
var coord;

//Google object of the forbidden zone
var zoneG;

//Selection count
var selectCount = 0;

var g = [];
var zoneData;

var f = "test.geojson";

//Features
var featuresArray = [];

//GeoJSON of the removed zone
var geoZone = [];

//Feature Collection
var collection;
//GeoJson FeatureCollection of the current forbidden zone
var collectionZone;

//GeoJson FeatureCollection all forbidden ZOne
var listZone;
var currentZone;

//Parsed GeoJSON current forbidden zone compatible with remove function
var parsedZone;
//Parsed GeoJSON grid compatible with remove function
var parsedGrid;

//Array of energy value for a selected zone
var hydroArray = [];
var solaireArray = [];
var eolienArray = [];
var consoArray = [];

//Array of pin production and cost
var pinProdSolaireArray = [];
var pinProdHydroArray = [];
var pinProdEolienArray = [];
var pinCostArray = [];


//Average potential of the selected zone
var averageSolaire = 0;
var averageHydro = 0;
var averageEolien = 0;
var averageConso = 0;

var averagePinProd = 0;
var averagePinProdSolaire = 0;
var averagePinProdHydro = 0;
var averagePinProdEolien = 0;

var averagePinCost = 0;


//Collection of imported map (in FeatureCollection)
var mapCollection = [];
//Maps name
var mapCollectionName = [];

//Collection of geoJSON marker
var pinCollection = [];

//Id of cell (auto increment)
var id = 0;

var GeoJsonPoint = {
    type: 'Feature',
    geometry: {
        type: 'Point'
    },
    properties: {}
};


const MAP_BOUNDS = {
    north: 17.5,
    south: 11.5,
    west: -21,
    east: -9,
};

const upperLeftPoint = {
    lng: -9,
    lat: 17.5
};
const upperRightPoint = {
    lng: -21,
    lat: 17.5
};
const lowerRightPoint = {
    lng: -21,
    lat: 11.5
};
const lowerLeftPoint = {
    lng: -9,
    lat: 11.5
};
const gridPrecision = 20;



function initMap() {

    //Creating the drawing manager
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: false
    });


    //Creating the map
    displayMap = new google.maps.Map(document.getElementById("displayMap"), {
        center: {
            lat: 14,
            lng: -15
        },
        zoom: -10,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_RIGHT
        },
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_RIGHT
        },
        restriction: {
            latLngBounds: MAP_BOUNDS,
            strictBounds: true,
        },
        drawingTool: drawingManager
    });

    //Adding the grid to the map
    generateGrid(displayMap);

    //Adding the listenner
    google.maps.event.addListener(drawingManager, 'polygoncomplete', onPolygonComplete = poly => manager(poly)

    );

    //Adding a listener (cancel action)
    google.maps.event.addListener(displayMap, 'rightclick', function(e) {cancelAction();
    });
    
    //Adding a listener (place a pin)
    google.maps.event.addListener(displayMap, 'click', function(e) {clickOnMap(e.latLng);
    });

    
}

function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);
    
    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */
    
}

function getPaths(polygon) {
    var coordinates = (polygon.getPath().getArray());
    console.log(coordinates);
}

//Generating the grid and adding it to the map 
function generateGrid(displayMap) {
    
    //Setting the syle of the grid
    displayMap.data.setStyle({
        fillColor: 'green',
        strokeWeight: 1,
        clickable: false
    });
    
    
    //Calculating the cell size
    var coordDiff = gridPrecision / 111;
    
    //Going trough the coordiates
    for (longitude = upperLeftPoint.lng; longitude > upperRightPoint.lng; longitude -= coordDiff) {
        
        for (latitude = upperLeftPoint.lat; latitude > lowerLeftPoint.lat; latitude -= coordDiff) {
            
            //console.log("Lat: " +  latitude + " Long: "+ longitude);
            var upperLeftCorner = {
                lat: latitude,
                lng: longitude
            };
            var upperRightCorner = {
                lat: latitude,
                lng: longitude + coordDiff
            };
            var lowerLeftCorner = {
                lat: latitude - coordDiff,
                lng: longitude
            };
            var lowerRightCorner = {
                lat: latitude - coordDiff,
                lng: longitude + coordDiff
            };
            
            var cellGeometry = new google.maps.Data.Polygon([
                [
                    upperLeftCorner,
                    upperRightCorner,
                    lowerRightCorner,
                    lowerLeftCorner,
                ],
            ]);
            
            var cell = {
                
                geometry: cellGeometry
                
            }
            
            //ar test = convert(cellGeometry);
            //gridJson.push(convert(cellGeometry));
            
            convert(cellGeometry, function(test) {
                //console.log(test);
                gridJson.push(test);
            });
            
            
            displayMap.data.add(cell);
            
            
            //Adding the cell to the list
            grid.push(cell);
            //console.log(turf.area(displayMap.data.toGeoJson));
            
        }
        
    }
  
    setTimeout(function(){
        initGridJson();
    }, 2000); 

}

//Stops drawing
function stopDrawing() {

    displayMap.drawingTool.setMap(null)

}

//Ends and valdates the Drawing
function endDrawing() {

    //displayMap.drawingTool.setMap(displayMap);

    stopDrawing();

}

function fileMap() {

    console.log("testClick");
    collection = JSON.stringify({
        type: 'FeatureCollection',
        features: gridJson.displayMap(JSON.parse)

    });
    //console.log(collection);
    var test = JSON.parse(collection);
    console.log(test.features.length)
    console.log(featuresArray.length)
    console.log(turf.booleanIntersects(test.features[0], test.features[1]));
    // download(collection, "grid.geojson",  'text/plain');

}