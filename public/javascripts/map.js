let mapInstance

function initApp() {
    drawMap()
    getEventsFromAPI()
}


function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('#map'), {
            center: {
                lat: 40.4129999,
                lng: -3.7243401
            },
            zoom: 15,
            styles: mapStyles.retro
        }
    )
}


function getEventsFromAPI() {

    axios
        .get('http://localhost:3000/api/events')
        .then(response => drawMarkers(response.data))
        .catch(err => console.log(err))
}


function drawMarkers(events) {

    events.forEach(elm => {



                let position = {
                    lat: elm.location.coordinates[0],
                    lng: elm.location.coordinates[1]
                }

                new google.maps.Marker({
                    map: mapInstance,
                    position,
                    title: elm.name
                })
            })

            mapInstance.setCenter({
                lat: partners[1].location.coordinates[0],
                lng: partners[1].location.coordinates[1]
            })
        
    }


    const directions = {
        SalaLaRiviera: {
            coords: {
                lat: 40.4129999,
                lng: -3.7243401
            },
            title: 'Sala la riviera'
        },
        MondoDisko: {
            coords: {
                lat: 40.4178777,
                lng: -3.6988467
            },
            title: "Mondo Disko"
        },
        SalaCrow: {
            coords: {
                lat: 40.4653883,
                lng: -3.6750375
            },
            title: "Sala Crow"
        },
    }