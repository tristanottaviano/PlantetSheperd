var isPlacingPin =false;
var currentInfra = null;
var currentPin = null;
var pinList = [];
var currentPinID = 0;

function choosePin(infraName){

    isPlacingPin = true;
    currentInfra = infraName;
    
    //Set the cursor to pin
    displayMap.setOptions({draggableCursor:'crosshair'});
    
}

function clickOnMap(location){
   
    if(currentPin!= null) unselectPin(currentPin);

    if (isPlacingPin === true){

        addPin(location);
        
    }

}

function addPin(location){

    //Set the Icon url
    var currentIconURL = setCurrentInfraIcon(currentInfra, 0);

    //Set marker icon
    var icon = {
        url: currentIconURL,
        scaledSize: new google.maps.Size(45, 45)
    };

    //Place the marker
    var marker = new google.maps.Marker({
        id: currentPinID,
        position: location, 
        map: displayMap,
        icon: icon,
        draggable:true,
        infraName: currentInfra,
        production: 500,
        cost: 30000
    });

    var tmp = {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [location.lng(),location.lat()]
        },
        properties: {
            "Production": marker.production,
            "Cout":marker.cost,
            "Name":marker.infraName
        }
    };
       
    //Add the geojson of the marker to the pin array 
    pinCollection.push(tmp); 

    //Increment the currentPinID
    currentPinID+=1;
    
    //Adding a Listener
    marker.addListener('click', function (e){ selectPin(marker);
    });
    
    //Reset the cursor to drag
    displayMap.setOptions({draggableCursor:'default'});
    
    //Reset placingPin & currentInfra
    isPlacingPin = false;
    currentInfra = null;

    //Add the marker to the list
    pinList.push(marker);

}

function setCurrentInfraIcon(infra, selected){

    //If selected or not
    var state="";
    if (selected === 1) state="Selected";


    if (infra === "wind") return "./Resource/windPin"+state+".png";
    else if (infra === "offshoreWind") return "./Resource/windPin"+state+".png";
    else if (infra === "hydrolic") return "./Resource/hydrolicPin"+state+".png";
    else if (infra === "solar") return "./Resource/solarPin"+state+".png";
    else return "./Resource/Marker.png";

}


function cancelAction(){

    //Reset the cursor to drag
    displayMap.setOptions({draggableCursor:'default'});

    //Reseting every action
    isPlacingPin = false;
    currentInfra = null;
    if(currentPin!= null) unselectPin(currentPin);
    
}

function updatePinPanel(marker){

    $("#pinTitle").text(marker.infraName.toUpperCase());
    $("#pinProduction").text("Production: "+marker.production+"kWh");
    $("#pinCost").text("Cost: "+marker.cost+"$");

}

function selectPin(marker){

    if (currentPin===null){
        
        currentPin = marker;
        
        //Setting the icon
        var iconURL = setCurrentInfraIcon(currentPin.infraName, 1);
        var icon = {
            url: iconURL,
            scaledSize: new google.maps.Size(55, 55)
        };
        marker.setIcon(icon);

        //Update the pinPanel
        updatePinPanel(currentPin);

        //Show the panel
        $("#currentPinPanel").show();

    }

    else unselectPin(currentPin);
}

function unselectPin(marker){

    //Setting the icon
    var iconURL = setCurrentInfraIcon(currentPin.infraName, 0);
    var icon = {
        url: iconURL,
        scaledSize: new google.maps.Size(45, 45)
    };
    marker.setIcon(icon);
    
    //Reset
    currentPin = null;

    //hide the pinPanel
    $("#currentPinPanel").hide();
    
}

function deletePin(marker){

    //Remeove the marker from the tlist
    for (var i=0; i<pinList.length; i++){

        if(pinList[i].id===marker.id){

            pinList.splice(i,1);

        }

    }
    
    unselectPin(marker);
    marker.setMap(null);

}
