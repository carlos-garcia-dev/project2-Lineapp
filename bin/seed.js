const mongoose = require('mongoose');
const Client = require('../models/client.model');
const Event = require('../models/event.model');

const dbtitle = 'LineApp';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

const events = [{
        name: 'Regal (Live)',
        description: 'Techno Live Set',
        duration: '315',
        pictureUrl: 'https://i-d-images.vice.com/images/2017/03/21/regal-desmonta-los-clichs-de-la-escena-techno-en-espaa-body-image-1490114313.jpg',
        date: new Date(2020, 12, 31, 03, 00),
        genre: 'techno',
        location: {
            type: 'Point',
            coordinates: [40.4178777, -3.6988467]
        },

        partner: {
            'role': 'Partner',
            'name': 'Mondo Disko',
            'cif': 'A28654036',
            'fiscalName': 'Europea De Explotaciones S.A.',
            'direction': 'Calle Arenal, 11, Madrid, 28013',
        },
        active: 'true'
    },
    {
        name: 'Devendra Banhart (Live)',
        description: 'Música en directo',
        duration: '90',
        pictureUrl: 'https://highlark.com/wp-content/uploads/2017/02/Devendra-Banhart-Mayan-Highlark-02-1024x683.jpg',
        date: new Date(2020, 02, 18, 21, 00),
        genre: 'indie',
        location: {
            type: 'Point',
            coordinates: [40.4129999, -3.7243401]
        },

        partner: {
            'role': 'Partner',
            'name': 'Sala La Riviera',
            'cif': 'B86762010',
            'fiscalName': 'LA RIVIERA S.L.',
            'direction': 'Paseo Bajo de la Virgen del Puerto, 328005',
        },
        active: 'true'
    },
    {
        name: 'Vril (Live)',
        description: 'Set Live de Vril',
        duration: '300',
        pictureUrl: 'https://pbs.twimg.com/media/D_RgrI8VUAEf7Yt.jpg:large',
        date: new Date(2020, 06, 23, 02, 30),
        genre: 'techno',
        location: {
            type: 'Point',
            coordinates: [40.4653883, -3.6750375]
        },
        partner: {
            'role': 'Partner',
            'name': 'Sala Crow',
            'cif': 'B87687083',
            'fiscalName': 'Live Music Lab S.L.',
            'direction': 'Lugar Estacion de Ferrocarril Chamartin, S/N - LOCAL 8, Madrid, 28036',
        },
        active: 'true'
    }, 




    {
        name: 'Vetusta Morla (En Directo)',
        description: 'Directo desde museo Reina Sofía',
        duration: '65',
        pictureUrl: 'https://www.vipstylemagazine.com/wp-content/uploads/2019/01/vetusta-vms16.1.png',
        date: new Date(2020, 12, 31, 03, 00), //TO-DO
        genre: 'pop',
        location: {
            type: 'Point',
            coordinates: [40.4178777, -3.6988467]   //TO-DO
        },

        partner: { //TO-DO
            'role': 'Partner',
            'name': 'Mondo Disko',
            'cif': 'A28654036',
            'fiscalName': 'Europea De Explotaciones S.A.',
            'direction': 'Calle Arenal, 11, Madrid, 28013',
        },
        active: 'true'
    },
    {
        name: 'Zahara', //TO-DO
        description: 'Música en directo',
        duration: '90',
        pictureUrl: 'https://highlark.com/wp-content/uploads/2017/02/Devendra-Banhart-Mayan-Highlark-02-1024x683.jpg',
        date: new Date(2020, 02, 18, 21, 00), //TO-DO
        genre: 'indie',
        location: {
            type: 'Point',
            coordinates: [40.4129999, -3.7243401] //TO-DO
        },

        partner: { //TO-DO
            'role': 'Partner',
            'name': 'Sala La Riviera',
            'cif': 'B86762010',
            'fiscalName': 'LA RIVIERA S.L.',
            'direction': 'Paseo Bajo de la Virgen del Puerto, 328005',
        },
        active: 'true'
    },
    {
        name: 'Novedades Carminha', //TO-DO
        description: 'Set Live de Vril',
        duration: '300',
        pictureUrl: 'https://pbs.twimg.com/media/D_RgrI8VUAEf7Yt.jpg:large',
        date: new Date(2020, 06, 23, 02, 30), //TO-DO
        genre: 'techno',
        location: {
            type: 'Point',
            coordinates: [40.4653883, -3.6750375] //TO-DO
        },
        partner: { //TO-DO
            'role': 'Partner',
            'name': 'Sala Crow',
            'cif': 'B87687083',
            'fiscalName': 'Live Music Lab S.L.',
            'direction': 'Lugar Estacion de Ferrocarril Chamartin, S/N - LOCAL 8, Madrid, 28036',
        },
        active: 'true'
    }, 






    {
        name: 'Psyk',
        description: 'Techno Live Set',
        duration: '315',
        pictureUrl: 'https://i-d-images.vice.com/images/2017/03/21/regal-desmonta-los-clichs-de-la-escena-techno-en-espaa-body-image-1490114313.jpg',
        date: new Date(2020, 12, 31, 03, 00), //TO-DO
        genre: 'techno',
        location: {
            type: 'Point',
            coordinates: [40.4178777, -3.6988467] //TO-DO
        },

        partner: { //TO-DO
            'role': 'Partner',
            'name': 'Stardust',
            'cif': 'A28654036',
            'fiscalName': 'Europea De Explotaciones S.A.',
            'direction': 'Calle Arenal, 11, Madrid, 28013', 
        },
        active: 'true'
    },
    {
        name: 'Kwartz',
        description: 'Música en directo',
        duration: '90',
        pictureUrl: 'https://highlark.com/wp-content/uploads/2017/02/Devendra-Banhart-Mayan-Highlark-02-1024x683.jpg',
        date: new Date(2020, 02, 18, 21, 00), //TO-DO
        genre: 'indie',
        location: {
            type: 'Point',
            coordinates: [40.4129999, -3.7243401] //TO-DO
        },

        partner: { //TO-DO
            'role': 'Partner',
            'name': 'Sala La Riviera',
            'cif': 'B86762010',
            'fiscalName': 'LA RIVIERA S.L.',
            'direction': 'Paseo Bajo de la Virgen del Puerto, 328005',
        },
        active: 'true'
    },
    {
        name: 'Vril (Live)',
        description: 'Set Live de Vril',
        duration: '300',
        pictureUrl: 'https://pbs.twimg.com/media/D_RgrI8VUAEf7Yt.jpg:large',
        date: new Date(2020, 06, 23, 02, 30), //TO-DO
        genre: 'techno',
        location: {
            type: 'Point',
            coordinates: [40.4653883, -3.6750375] //TO-DO
        },
        partner: { //TO-DO
            'role': 'Partner',
            'name': 'Sala Crow',
            'cif': 'B87687083',
            'fiscalName': 'Live Music Lab S.L.', 
            'direction': 'Lugar Estacion de Ferrocarril Chamartin, S/N - LOCAL 8, Madrid, 28036', //TO-DO
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
        .catch(err => console.log('Error while saving the event: ', err))

})
