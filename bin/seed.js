const mongoose = require('mongoose');
const Client = require('../models/client.model');
const Event = require('../models/event.model');
const Partner = require('../models/partner.model');

const dbtitle = 'LineApp';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

Client.collection.drop()
Event.collection.drop()
Partner.collection.drop()



const clients = [
    {
    name: "Paco",
    surname: "Pil",
    username: "Papil",
    id: "08646780A",
    email: "papil@hotmail.com",
    creditcard: "1032448825012729"
    },
    {
    name: "Carlos",
    surname: "Nose",
    username: "nose",
    id: "08642784B",
    email: "nose@hotmail.com",
    creditcard: "2032448825012729"
    },
    {
    name: "Raquel",
    surname: "Piña",
    username: "rapiña",
    id: "08642784C",
    email: "rapiña@hotmail.com",
    creditcard: "3032448825012729"
},
]



const events = [
    {
        name: 'Regal (Live)',
        description: 'Techno Live Set',
        duration: '300',
        date: new Date(2020, 12, 31),
        genre: 'techno',
        location: 'Mondo Disko',
        coords: { lat: 40.4178777, long: - 3.6988467 },
        partner: 'TO DO',
        active:'true'
    },
    {
        name: 'Devendra Banhart (Live)',
        description: 'Música en directo',
        duration: '300',
        date: new Date(2020, 02, 18),
        genre: 'indie',
        location: 'La Riviera',
        coords: { lat: 40.4129999, long: -3.7243401 },
        partner: 'TO DO',
        active:'true'
    },
    {
        name: 'Vril (Live)',
        description: 'Set Live de Vril',
        duration: '300',
        date: new Date(2020, 06, 23),
        genre: 'techno',
        location: 'LAB Madrid',
        coords: { lat: 40.4653883, long: -3.6750375},
        partner: 'TO DO',
        active:'true'
    },
]

const partners = [
    {
        name: 'Mondo Disco',
        cif: A28654036,
        fiscalName: 'Europea De Explotaciones Sa',
        direction:'Calle Arenal, 11, Madrid, 28013',
    },
    {
        name: 'Sala Crow',
        cif: B87687083,
        fiscalName: 'Live Music Lab Sl',
        direction:'Lugar Estacion de Ferrocarril Chamartin, S/N - LOCAL 8, Madrid, 28036',
    },
    {
        name: 'Sala La Riviera',
        cif: B86762010,
        fiscalName: 'LA RIVIERA SL',
        direction:'Paseo Bajo de la Virgen del Puerto, 328005',
    }
]




//copiao

const createAuthors = books.map(book => {
    const newAuthor = new Author(book.author)
    return newAuthor.save()
        .then(author => {
            return author.name;
        })
        .catch(error => {
            throw new Error(`Impossible to add the author. ${error}`)
        })
})


let findAuthors = Promise.all(createAuthors)
    .then(authors => {
        return books.map(book => {
            return Author.findOne({ name: book.author.name, lastName: book.author.lastName })
                .then(author => {
                    if (!author) {
                        throw new Error(`unknown author ${book.author.name} ${book.author.lastName}`);
                    }
                    return Object.assign({}, book, { author: author._id });
                })
        });
    })
    .catch(error => {
        throw new Error(error)
    })

const saveBooks = findAuthors.then(findAuthors => {
    return Promise.all(findAuthors)
        .then(books => {
            return books.map(book => {
                const newBook = new Book(book);
                return newBook.save();
            })
        })
}).then(savedBooks => {
    Promise.all(savedBooks)
        .then(books => books.forEach(book => console.log(`created ${book.title}`)))
        .then(() => mongoose.connection.close())
        .catch(err => console.log("Error while saving the book: ", err))
})
