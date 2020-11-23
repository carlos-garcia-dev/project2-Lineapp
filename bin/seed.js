const mongoose = require('mongoose');
const Client = require('../models/client.model');
const Event = require('../models/event.model');

const dbtitle = 'LineApp';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

const events = [{
        name: 'Regal (Live)',
        description: 'Techno Live Set',
        duration: '300',
        pictureUrl: 'https://media.timeout.com/images/102783670/630/472/image.jpg',
        date: new Date(2020, 12, 31),
        genre: 'techno',
        location: {
            type: 'Point',
            coordinates: [40.4178777, -3.6988467]
        },

        partner: {
            "role": "Partner",
            "name": 'Mondo Disco',
            "cif": 'A28654036',
            "fiscalName": 'Europea De Explotaciones Sa',
            "direction": 'Calle Arenal, 11, Madrid, 28013',
        },
        active: 'true'
    },
    {
        name: 'Devendra Banhart (Live)',
        description: 'Música en directo',
        duration: '300',
        pictureUrl: 'https://media.timeout.com/images/102783670/630/472/image.jpg',
        date: new Date(2020, 02, 18),
        genre: 'indie',
        location: {
            type: 'Point',
            coordinates: [40.4129999, -3.7243401]
        },

        partner: {
            "role": "Partner",
            "name": 'Sala La Riviera',
            "cif": 'B86762010',
            "fiscalName": 'LA RIVIERA SL',
            "direction": 'Paseo Bajo de la Virgen del Puerto, 328005',
        },
        active: 'true'
    },
    {
        name: 'Vril (Live)',
        description: 'Set Live de Vril',
        duration: '300',
        pictureUrl: 'https://media.timeout.com/images/102783670/630/472/image.jpg',
        date: new Date(2020, 06, 23),
        genre: 'techno',
        location: {
            type: 'Point',
            coordinates: [40.4653883, -3.6750375]
        },
        partner: {
            "role": "Partner",
            "name": 'Sala Crow',
            "cif": 'B87687083',
            "fiscalName": 'Live Music Lab Sl',
            "direction": 'Lugar Estacion de Ferrocarril Chamartin, S/N - LOCAL 8, Madrid, 28036',
        },
        active: 'true'
    },
]


const createPartners = events.map(event => {
    const newPartner = new Client(event.partner)
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
            return Client.findOne({
                    name: event.partner.name,
                    lastName: event.partner.lastName
                })
                .then(partner => {
                    if (!partner) {
                        throw new Error(`unknown partner ${event.partner.name} ${event.partner.lastName}`);
                    }
                    return Object.assign({}, event, {
                        partner: partner._id
                    });
                })
        });
    })
    .catch(error => {
        throw new Error(error)
    })

const savePartners = findPartners.then(findPartners => {
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