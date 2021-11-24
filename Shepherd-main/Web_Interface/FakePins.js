var fakePins = [];	

function initFakePins(){

	var iconWind = {
        url:  "./Resource/windPin.png",
       scaledSize: new google.maps.Size(45, 45)
   };

   var iconSolar = {
        url:  "./Resource/solarPin.png",
       scaledSize: new google.maps.Size(45, 45)
   };



   var iconHydro = {
        url:  "./Resource/hydrolicPin.png",
       scaledSize: new google.maps.Size(45, 45)
   };


//Wind fake pins coord
var locationFakePins = [];
locationFakePins.push({"lat":15.577298330000119,"lng":-16.42073932131097});
locationFakePins.push({"lat":15.624915361557788,"lng":-16.39052691896722})
locationFakePins.push({"lat":15.656653903890374,"lng":-16.45644488771722})
locationFakePins.push({"lat":15.548193598788302,"lng":-16.34658160646722})
locationFakePins.push({"lat":15.577298330000119,"lng":-16.42073932131097})
locationFakePins.push({"lat":15.607721597204591,"lng":-16.493523745139093})
locationFakePins.push({"lat":15.492618602682771,"lng":-16.38503375490472})
locationFakePins.push({"lat":15.534962815073245,"lng":-16.46468463381097})
locationFakePins.push({"lat":15.564069417172194,"lng":-16.529229311545343})
locationFakePins.push({"lat":15.450265714174533,"lng":-16.42073932131097})
locationFakePins.push({"lat":15.484678096319643,"lng":-16.50588336427972})
locationFakePins.push({"lat":15.512468533820904,"lng":-16.56356158693597})



//Solar fake pins coord
var solarLocationFakePins = [];
solarLocationFakePins.push({"lat":14.036241031072379,"lng":-15.950317382812505});
solarLocationFakePins.push({"lat":14.057556647165281,"lng":-15.692138671875005});
solarLocationFakePins.push({"lat":13.865644958297136,"lng":-15.911865234375005});
solarLocationFakePins.push({"lat":13.900307486517331,"lng":-15.675659179687505});
solarLocationFakePins.push({"lat":14.012258593178858,"lng":-15.521850585937505});
solarLocationFakePins.push({"lat":13.900307486517331,"lng":-15.499877929687505});
solarLocationFakePins.push({"lat":13.74295144742117,"lng":-15.818481445312505});
solarLocationFakePins.push({"lat":13.785634770116198,"lng":-15.661926269531255});
solarLocationFakePins.push({"lat":13.809640712669568,"lng":-15.483398437500005});
solarLocationFakePins.push({"lat":14.006928822158331,"lng":-15.821228027343755});
solarLocationFakePins.push({"lat":13.854978522923894,"lng":-15.326843261718755});
solarLocationFakePins.push({"lat":14.020253017715131,"lng":-15.365295410156255});


//Hydro fake pins coord
var hydroLocationFakePins = [];
hydroLocationFakePins.push({"lat":14.850125209528457,"lng":-17.515869140625007});
hydroLocationFakePins.push({"lat":14.84481545443503,"lng":-17.719116210937507})
hydroLocationFakePins.push({"lat":14.568529458325367,"lng":-17.757568359375007})
hydroLocationFakePins.push({"lat":14.47281091966135,"lng":-17.449951171875007})


//Wind pin
for(let i=0;  i<locationFakePins.length;i++){

fakePins.push(new google.maps.Marker({
        id: 0,
        position: locationFakePins[i], 
        map: null,
        icon: iconWind,
        draggable:true,
        infraName: "wind",
        production: 500,
        cost: 30000
    }));
}


//Solar pins
for(let i=0;  i<solarLocationFakePins.length;i++){

fakePins.push(new google.maps.Marker({
        id: 0,
        position: solarLocationFakePins[i], 
        map: null,
        icon: iconSolar,
        draggable:true,
        infraName: "solar",
        production: 500,
        cost: 12000
    }));
}


//Solar pins
for(let i=0;  i<hydroLocationFakePins.length;i++){

fakePins.push(new google.maps.Marker({
        id: 0,
        position: hydroLocationFakePins[i], 
        map: null,
        icon: iconHydro,
        draggable:true,
        infraName: "hydraulic",
        production: 500,
        cost: 54500
    }));
}


}
//wind
//solar
//hydraulic