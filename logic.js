

var geoJSONdata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Works
d3.json(geoJSONdata, function(data) {   createFeatures(data.features);
});
       
function createFeatures(earthquakeData) {

function onEachFeature(feature, layer) {
  layer.bindPopup("<h3>" + "Location: " + feature.properties.mag+
    "</h3><hr><h3>" + "Games: " + feature.properties.place + "</h3>");
} 

function markerColor(mag) {
  
    var color = "";
    if (mag <= 1) {color = "#9ACD32";}
    else if (mag <= 2) {color = "#32CD32";}
    else if (mag <= 3) {color = "#F1C40F";}
    else if(mag <= 4) {color = "orange"}
    else if(mag <= 5) {color = "#FF8C00";}
    else{return "red";}

    return color;
    }

 // Create a GeoJSON layer containing the features array on the earthquakeData object
   // Run the onEachFeature function once for each piece of data in the array
   var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, layer) {
        return L.circleMarker(layer, 
            {radius: feature.properties.mag*4,
            fillColor: markerColor(feature.properties.mag),
            stroke: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        });
    }
   });
 
   // Sending our earthquakes layer to the createMap function
   createMap(earthquakes);
}
 
 function createMap(earthquakes) {
 
    
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: "pk.eyJ1Ijoia2xlZWxlZSIsImEiOiJjanB1ZWsyMjYwZzRmM3hydmIwdmZvNG1iIn0.Yegu7kXzLjGRxw9564jlmA"
    });
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [15.5994, -28.6731],
      zoom: 2.25,
      layers: [streetmap, earthquakes],
      zoomControl:false,
      scrollWheelZoom: false
    });
  

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }
  
