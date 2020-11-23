const mongoose = require('mongoose');
const Client = require('../models/client.model');
const Event = require('../models/event.model');
const Partner = require('../models/partner.model');

const dbtitle = 'LineApp';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

// Client.collection.drop()
// Event.collection.drop()
// Partner.collection.drop()



// const clients = [
//     {
//     name: "Paco",
//     surname: "Pil",
//     username: "Papil",
//     id: "08646780A",
//     email: "papil@hotmail.com",
//     creditcard: "1032448825012729"
//     },
//     {
//     name: "Carlos",
//     surname: "Nose",
//     username: "nose",
//     id: "08642784B",
//     email: "nose@hotmail.com",
//     creditcard: "2032448825012729"
//     },
//     {
//     name: "Raquel",
//     surname: "Piña",
//     username: "rapiña",
//     id: "08642784C",
//     email: "rapiña@hotmail.com",
//     creditcard: "3032448825012729"
// },
// ]



const events = [
    {
        name: 'Regal (Live)',
        description: 'Techno Live Set',
        duration: '300',
        pictureUrl: 'https://media.timeout.com/images/102783670/630/472/image.jpg',
        date: new Date(2020, 12, 31),
        genre: 'techno',
        location:{coords: [40.4178777, -3.6988467]},

        partner:  {
        "name": 'Mondo Disco',
        "cif": 'A28654036',
        "fiscalName": 'Europea De Explotaciones Sa',
        "direction":'Calle Arenal, 11, Madrid, 28013',
    },
        active:'true'
    },
    {
        name: 'Devendra Banhart (Live)',
        description: 'Música en directo',
        duration: '300',
        pictureUrl: 'https://media.timeout.com/images/102783670/630/472/image.jpg',
        date: new Date(2020, 02, 18),
        genre: 'indie',
        location: {coords: [40.4129999, -3.7243401]},
        partner:  {
        "name": 'Sala La Riviera',
        "cif": 'B86762010',
        "fiscalName": 'LA RIVIERA SL',
        "direction":'Paseo Bajo de la Virgen del Puerto, 328005',
    },
        active:'true'
    },
    {
        name: 'Vril (Live)',
        description: 'Set Live de Vril',
        duration: '300',
        pictureUrl: 'https://media.timeout.com/images/102783670/630/472/image.jpg',
        date: new Date(2020, 06, 23),
        genre: 'techno',
        location: {coords: [40.4653883, -3.6750375]},
        partner:  {
        "name": 'Sala Crow',
        "cif": 'B87687083',
        "fiscalName": 'Live Music Lab Sl',
        "direction":'Lugar Estacion de Ferrocarril Chamartin, S/N - LOCAL 8, Madrid, 28036',
    },
        active:'true'
    },
]

// const partners = [
//     {
//         name: 'Mondo Disco',
//         cif: A28654036,
//         fiscalName: 'Europea De Explotaciones Sa',
//         direction:'Calle Arenal, 11, Madrid, 28013',
//     },
//     {
//         name: 'Sala Crow',
//         cif: B87687083,
//         fiscalName: 'Live Music Lab Sl',
//         direction:'Lugar Estacion de Ferrocarril Chamartin, S/N - LOCAL 8, Madrid, 28036',
//     },
//     {
//         name: 'Sala La Riviera',
//         cif: B86762010,
//         fiscalName: 'LA RIVIERA SL',
//         direction:'Paseo Bajo de la Virgen del Puerto, 328005',
//     }
// ]


// Client
//     .create(clients)
//     .then(allClientsCreated => {
//         console.log(`Created ${allClientsCreated.length} clients`)
//     mongoose.connection.close()})
//     .catch(err => console.log('Hubo un error', err))


const createPartners = events.map(event => {
    const newPartner = new Partner(event.partner)
    return newPartner.save()
        .then(partner => {
            return partner.name;
        })
        .catch(error => {
            throw new Error(`Impossible to add the partner. ${error}`)
        })
})


let findPartners = Promise.all(createPartners)
    .then(partners => {
        return events.map(event => {
            return Partner.findOne({ name: event.partner.name, fiscalName: event.partner.fiscalName })
                .then(partner=> {
                    if (!partner) {
                        throw new Error(`unknown partner ${event.partner.name} ${event.partner.fiscalName}`);
                    }
                    return Object.assign({}, event, { partner: partner._id });
                })
        });
    })
    .catch(error => {
        throw new Error(error)
    })

const saveEvents = findPartners.then(findPartners => {
    return Promise.all(findPartners)
        .then(events => {
            return events.map(event => {
                const newEvent = new Event(event);
                return newEvent.save();
            })
        })
}).then(savedEvents => {
    Promise.all(savedEvents)
        .then(events => events.forEach(event => console.log(`created ${event.name}`)))
        .then(() => mongoose.connection.close())
        .catch(err => console.log("Error while saving the event: ", err))
})

