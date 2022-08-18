
var map;
var markers = [];


function find_index(entries,target)
{
	for (let i=0; i < entries.length; i++)
		if (entries[i] == target)
			return i;
		
	return -1;
}


 
function add_to_map(file_contents)
{
 
	//use this to delete all current markers
	while (markers.length > 0)
	{
		const m = markers.pop()
		m.setMap(null)
		
	}
	
    var all_lines = file_contents.split(/\r\n|\n/)
    var header = all_lines[0].split(',')
	
	const lat_index = find_index(header,"Latitude")
	const lon_index = find_index(header,"Longitude")
	const type_index = find_index(header,"Crime type")
	//go through the csv file
     for (let i=1; i < all_lines.length; i++)
	 {
		    const line = all_lines[i].split(',')
			const lat = line[lat_index]
			const lon = line[lon_index]
			const type = line[type_index]

			const pos = new google.maps.LatLng(lat,lon);
		 
			var marker = new google.maps.Marker({
			position: pos,
			icon: "http://labs.google.com/ridefinder/images/mm_20_yellow.png",
			map: map,
			title:type
			})
 	
			markers.push(marker)
	 }
	 
 }

// load the data and add it to the map
function load(datatype) {
	
	if (map == undefined)
		return;
	
	const filename = './data/'+datatype+"/"+datatype+"-merseyside-street.csv"
	fetch(filename)
  .then((response) => response.text())
  .then((data) => add_to_map(data));
	
	
}

function reload() {
	var dataset = document.getElementById('Dataset')
	console.log(dataset.value)
	
	load(dataset.value)
}



//called on page startup from index.html
function initialize() {

    var stylesArray = [
        {
          featureType: '',
          elementType: '',
          stylers: [
            {color: ''},
            {visibility: ''},
            // Add any stylers you need.
          ]
        },
        {
          featureType: '',
          // Add the stylers you need.
        }
      ]


// initial map view, will change when all markers are loaded
    var mapOptions = {
        center: {
            lat: 53.406,
            lng: -2.984
        },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        MapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [ 
            { 
              "featureType": "poi", 
              "stylers": [ 
                { "visibility": "off" } 
              ] ,
     
            },
            { 
                "featureType": "transit", 
                "stylers": [ 
                  { "visibility": "off" } 
                ] ,
       
              },
        ]
           
    };
	
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    load("2019-09");

}

