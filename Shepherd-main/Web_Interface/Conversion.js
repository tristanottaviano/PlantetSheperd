//Convert a google object to geoJSON
function convert(cell, fn) {
    let test;
    cellData = new google.maps.Data.Feature({
        geometry: cell
    });

    var geoJson;

    cellData.toGeoJson(function(json) {
        cellData = (JSON.stringify(json));
        //console.log(geoJson)
        //console.log(JSON.stringify(cellData));
        fn((cellData));
    });

    //

    //download(geoJson, cell, 'text/plain');
}


// zone to select, total grid
function selectZone(zone, grid) {

    //Reset the index array of selected cells
    tmpIndex = [];

    averagePinProdSolaire = 0;
    averagePinProdHydro = 0;
    averagePinProdEolien = 0;
    pinProdSolaireArray = [];
    pinProdHydroArray = [];
    pinProdEolienArray = [];

    for (let i = 0; i < grid.features.length; i++) {

        if (turf.booleanIntersects((grid.features[i]), (zone.features[0])) == true) {
            geoZone.push(gridJson.features[i])
            tmpIndex.push(i);

            //Get the potentials
            consoArray.push(grid.features[i].properties.Conso)
            solaireArray.push(grid.features[i].properties.Solaire)
            hydroArray.push(grid.features[i].properties.Hydro)
            eolienArray.push(grid.features[i].properties["Eolien"])
        }
    }

    //Get all the pins inside the zone
    for (let j = 0; j < pinCollection.length; j++) {
        if (turf.booleanContains(zone.features[0], pinCollection[j])) {

            if (pinCollection[j].properties.Name == "wind" || pinCollection[j].properties.Name == "offshoreWind")
                pinProdEolienArray.push(pinCollection[j].properties.Production);
            if (pinCollection[j].properties.Name == "hydrolic")
                pinProdHydroArray.push(pinCollection[j].properties.Production)
            if (pinCollection[j].properties.Name == "solar")
                pinProdSolaireArray.push(pinCollection[j].properties.Production)

            //Cost
            pinCostArray.push(pinCollection[j].properties.Cout)

        }

    }

    averageSolaire = sumArray(solaireArray);
    averageHydro = sumArray(hydroArray);
    averageEolien = sumArray(eolienArray);

    averagePinProdSolaire = sumArray(pinProdSolaireArray);
    averagePinProdHydro = sumArray(pinProdHydroArray);
    averagePinProdEolien = sumArray(pinProdEolienArray);

    pinProdSolaireArray = [];
    pinProdEolienArray = [];
    pinProdHydroArray = [];

    averagePinCost = sumArray(pinCostArray);

}


//Remove selected zone from the grid
function removeZone() {

    if (tmpIndex.length == 0) {
        alert("Select a zone first");
        return;
    }

    for (let i = 0; i < tmpIndex.length; i++) {
        gridJson.features.splice(tmpIndex[i] - i, 1);
    }

    //Clear the map from previous grid
    displayMap.data.forEach(function(feature) {
        displayMap.data.remove(feature);
    });
    displayMap.data.addGeoJson(gridJson);
}


//Download data as a file, (data, fileName, 'text/plain' )
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

function manager(poly) {

   // if (selectCount == 0) initGridJson();

    for (let i = 0; i < gridJson.features.length; i++)
        gridJson.features[i].properties.select = 'F';


    //Hide the draw polygon
    poly.setMap(null)
    const path = poly.getPath();

    //Reset the current zone array
    coordinates = [];
    zoneJson = [];

    //Put the coordinates in an array
    for (var i = 0; i < path.length; i++) {
        //var pathArray = [path.getAt(i).lat(), path.getAt(i).lng()];
        coord = {
            lat: path.getAt(i).lat(),
            lng: path.getAt(i).lng()
        };
        coordinates.push(coord);
    }


    //Making the google polygon to geojson object
    zoneG = new google.maps.Data.Polygon([
        coordinates,
    ]);

    zoneData = new google.maps.Data.Feature({
        geometry: zoneG
    });


    zoneData.toGeoJson(function(json) {
        zoneData = (JSON.stringify(json));


        //Push the GeoJSON zone to the two arrays (current zone array and all zones array)
        zoneJson.push(zoneData)
        tmpListZone.push(zoneData)



        collectionZone = JSON.stringify({
            type: 'FeatureCollection',
            features: zoneJson.map(JSON.parse)

        });



        parsedZone = JSON.parse(collectionZone)

        //parsedGrid = JSON.parse(collectionGrid)

        selectZone(parsedZone, gridJson);

        //Reset the array
        solaireArray = [];
        hydroArray = [];
        eolienArray = [];
        consoArray = [];
        pinProdArray = [];
        pinCostArray = [];
        


        for (let i = 0; i < tmpIndex.length; i++) {
            gridJson.features[tmpIndex[i]]["properties"].select = 'T';
        }

        refreshGraphPanel(1);
        /* 
        averagePinProdEolien=0;
        averagePinProdSolaire=0;
        averagePinProdHydro=0;
        */
        //Clear the map from previous grid
        displayMap.data.forEach(function(feature) {
            displayMap.data.remove(feature);
        });

        displayMap.data.addGeoJson(gridJson);

        // examine each feature
        displayMap.data.forEach(function(feature) {

            // is feature is selected, display it in red
            if (feature.getProperty('select') === 'T') {
                // override existing style for this feature
                displayMap.data.overrideStyle(feature, {
                    fillColor: "red",
                    fillOpacity: 0.5,
                    strokeColor: "blue",
                    strokeOpacity: 0.8,
                    strokeWeight: 2.5,
                    zIndex: 11
                });

            }



        });
    })


}


//Sum of an integer array
function sumArray(array) {

    //var sum = (array.reduce((a, b) => a + b, 0));
    var sum = 0;
    for(let i=0; i<array.length; i++) sum += array[i];
    return sum.toFixed(2);
}

//Init the geojson grid if not initialize
function initGridJson() {

    gridJson = JSON.stringify({
        type: 'FeatureCollection',
        features: gridJson.map(JSON.parse)

    });
    gridJson = JSON.parse(gridJson)
    for (let i = 0; i < gridJson.features.length; i++) {
        gridJson.features[i].properties.select = 'F';
        gridJson.features[i].properties.Id = i;
        gridJson.features[i].properties.Solaire = 0;
        gridJson.features[i].properties.Hydro = 0;
        gridJson.features[i].properties.Eolien = 0;
        gridJson.features[i].properties.Conso = 0;
    }
    selectCount++;
    refreshGraphPanel(0);
}


//Total potential of pins (all pins of the map)
function pinAllMap(name) {
    var arr = [];
    for (let i = 0; i < pinCollection.length; i++) {
        if (pinCollection[i].Name == name)
            arr.push(pinCollection[i].Production)
    }
    return sumArray(arr);
}

function pinCostAll() {
    var arr = [];
    for (let i = 0; i < pinCollection.length; i++) {
        arr.push(pinCollection[i].Cout)
    }
    return sumArray(arr);

}

//Total potential of map
function potentialAllMap(name) {
    var arr = [];
    for (let i = 0; i < gridJson.features.length; i++){
        arr.push(gridJson.features[i].properties[name])
    }

    return sumArray(arr);
}

//Return the average of potentials
function solaireAverage(state) {    
    if (state == 0) return potentialAllMap("Solaire");
    else return averageSolaire;
}

function hydroAverage(state) {
    if (state == 0) return potentialAllMap("Hydro");
    else return averageHydro;
}

function eolienAverage(state) {
    if (state == 0) return potentialAllMap("Eolien");
    else return averageEolien;
}

function consoAverage() {
    return averageConso;
}

//Pin potential value
function pinProdAverage(state) {
    if (state == 0) return pinSolaireAll();
    else return averagePinProd;
}

function pinSolaireProdAverage(state) {
    if (state == 0) return pinAllMap("solar");
    else return averagePinProdSolaire;
}

function pinHydroProdAverage(state) {
    if (state == 0) return pinAllMap("hydro");
    else return averagePinProdHydro;
}

function pinEolienProdAverage(state) {
    if (state == 0) return pinAllMap("wind");
    else return averagePinProdEolien;
}

function pinCostAverage(state) {
    if (state == 0) return pinCostAll();
    else return averagePinCost;
} 


//Read a file, then process callback
function readFile(file, _callback) {

    var test;
    var reader = new FileReader();
    var content;


    reader.onload = function(evt) {
        content = evt.target.result;
        mapCollection.push(JSON.parse(content))
        _callback(content);
    };
    reader.readAsText(file, "UTF-8");

}

function loadProperties(content) {

    //Temporary properties zone from the file
    var tmp;

    var parsedGeoData = JSON.parse(content);

    //Array of each intersection between one cell and polygon from file
    var interPoly = [];
    //Array of area of each intersection
    var areaArray = [];
    //index of the area of the array
    var maxAreaIndex;

    var cellArea;

    for (let i = 0; i < gridJson.features.length; i++) {

        cellArea = turf.area(gridJson.features[i])
        for (let j = 0; j < parsedGeoData.features.length; j++) {
            tmp = parsedGeoData.features[j];
            interPoly.push(turf.intersect(gridJson.features[i], tmp));
        }

        //Calcul area of each intersection (if not null)
        for (let k = 0; k < interPoly.length; k++) {
            if (interPoly[k] != undefined)
                areaArray[k] = turf.area(interPoly[k])
            else
                areaArray[k] = 0;
        }
   

        //If no intersection, dont put properties
         if (Math.max(...areaArray) == 0) maxAreaIndex = 0;

        else {
            maxAreaIndex = areaArray.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
            //console.log(Math.max(...areaArray))

            //Polygon that posses the largest intersection with the cell of the grid
            tmp = parsedGeoData.features[maxAreaIndex];


            if (tmp.properties["Solaire"] != undefined)
                gridJson.features[i].properties["Solaire"] = tmp.properties["Solaire"];
            if (tmp.properties["Hydro"] != undefined)
                gridJson.features[i].properties["Hydro"] = tmp.properties["Hydro"];
            if (tmp.properties["Eolien"] != undefined)
                gridJson.features[i].properties["Eolien"] = tmp.properties["Eolien"];
            if (tmp.properties["Conso"] != undefined)
                gridJson.features[i].properties["Conso"] = tmp.properties["Conso"];
            if (tmp.properties["pop"] != undefined)
                gridJson.features[i].properties["pop"] = tmp.properties["pop"];
        } 

        //Reset the area array for the next cell
        interPoly = [];
        areaArray = [];
    }

    refreshGraphPanel(0);

}