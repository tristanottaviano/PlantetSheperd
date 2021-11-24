function closeModal() {

    $(".modal").hide();

}


//Hide all unessecary stuff
function hidePanels() {

    $("#currentPinPanel").hide();

}

function openMap(mapName) {

    //Clean the currentMap
    displayMap.data.forEach(function(feature) {
        displayMap.data.remove(feature);
    });

    if (mapName === "gridJson") {

        displayMap.data.addGeoJson(gridJson);

    } else {

        for (var i = 0; i < mapCollection.length; i++) {

            if (mapCollectionName[i] === mapName) {
                displayMap.data.addGeoJson(mapCollection[i]);
            }

        }

    }

}

//Ran when the page is loaded
$(document).ready(function($) {


    //Hide panels
    hidePanels();


    $("#cursorButton").click(function() {
        stopDrawing();
        cancelAction();
        refreshGraphPanel(0);

        for (let i = 0; i < gridJson.features.length; i++)
            gridJson.features[i].properties.select = 'F';

        displayMap.data.forEach(function(feature) {
            displayMap.data.remove(feature);
        });

        displayMap.data.addGeoJson(gridJson);

    });

    //Allowing the user to draw polygons
    $("#zoneButton").click(function() {

        //Enabling the drawingControl
        displayMap.drawingTool.setMap(displayMap);

        //Setting its mode to Polygon
        displayMap.drawingTool.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);

    });

    $("#mapListButton").click(function() {

        $("#mapListModal").show();

    });
    $("#mapListModalCancelButton").click(closeModal);
    $("#closeMapListModal").click(closeModal);

    //PinPanel
    $("#deleteCurrentPinButton").click(function() {
        deletePin(currentPin)
    });

    $("#gridJson").click(function() {

        openMap("gridJson");

    });

    $("#solarPotentialdMap").click(function() {

        openMap("solarPotential");
        //openMap("Energies");

    });

    $("#windPotentialdMap").click(function() {

        openMap("windPotential");

    });

    $("#hydrolicPotentialdMap").click(function() {

        openMap("hydrolicPotential");

    });

    $("#populationdMap").click(function() {

        openMap("population");

    });

    $("#disableButton").click(removeZone);


    $("#calculateButton").click(function() {
        initFakePins();

        //Display fake pins
        for (let k = 0; k < fakePins.length; k++) {
            //fakePins[k].map = displayMap;
            fakePins[k].addListener('click', function (e){ selectPin(fakePins[k]);
            }); 
            fakePins[k].setMap(displayMap)
        }

    })


    //Export the grid
    $("#exportButton").click(function(){
        download(JSON.stringify(gridJson), "grid.geojson",  'text/plain');
    })


    var inputElement = document.getElementById("file-input");
    inputElement.addEventListener("change", handleFiles, false);

    function handleFiles() {
        var fileList = this.files;
        mapCollectionName.push(fileList[0].name.replace(/\.[^/.]+$/, ""));
        readFile(fileList[0], loadProperties)
    }

});