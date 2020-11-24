// // Basic map

function initMap() {

    // Crear mapa
    const mapInstance = new google.maps.Map(
        document.querySelector('#map'),
        {
            center: directions.ironhackBCN.coords,
            zoom: 15,
            styles: mapStyles.retro
        }
    )


    new google.maps.Marker({
        map: mapInstance,
        position: directions.ironhackBCN.coords,
        title: directions.ironhackBCN.title
    })
}




// // Geolocalization map
// function initMap() {

//     const mapInstance = new google.maps.Map(
//         document.querySelector('#map'),
//         { center: directions.ironhackBCN.coords, zoom: 15, styles: mapStyles.retro }
//     )

//     if (navigator.geolocation) {

//         // getCurrentPosition(successCallback, errorCallback)
//         navigator.geolocation.getCurrentPosition(
//             pos => {
//                 console.log('La posiciòn actual es:', pos)
//                 let currentPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude }
//                 mapInstance.setCenter(currentPosition)
//                 new google.maps.Marker({
//                     map: mapInstance,
//                     position: currentPosition
//                 })
//             },
//             err => console.log('PARECE QUE NO NOS DEJA... El motivo es este:', err)
//         )

//     } else {
//         console.log('Módulo de geolocalización no disponible')
//     }
// }



// let mapInstance, serviceInstance, rendererInstance

// function initMap() {

//     mapInstance = new google.maps.Map(document.querySelector('#map'), { zoom: 12, center: directions.ironhackBCN.coords, styles: mapStyles.yellowParks })

//     serviceInstance = new google.maps.DirectionsService
//     rendererInstance = new google.maps.DirectionsRenderer

//     const directionRequest = {
//         origin: 'Bar Oportiño Legazpi',
//         destination: 'Fabrik Madrid',
//         travelMode: 'DRIVING'
//     }

//     serviceInstance.route(
//         directionRequest,
//         route => drawResult(route)
//     )
// }


// function drawResult(route) {

//     console.log('La información de tu ruta es:', route)

//     // Renderizado de ruta
//     rendererInstance.setDirections(route)
//     rendererInstance.setMap(mapInstance)

//     const steps = route.routes[0].legs[0].steps
//     steps.forEach(elm => document.querySelector('#stepsText').innerHTML += `<li>${elm.instructions} (tiempo: ${elm.duration.text})<hr></li>`)
// }


