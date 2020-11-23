const session = require("express-session")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const flash = require("connect-flash")         

const Client = require('./../models/client.model')

module.exports = app => {

    app.use(session({
        secret: "clientauth",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((client, cb) => cb(null, client._id))

    passport.deserializeUser((id, cb) => {
        Client.findById(id, (err, client) => {
            if (err) { return cb(err); }
            cb(null, client);
        })
    })

    app.use(flash())            

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        Client.findOne({ username }, (err, client) => {
            if (err) {
                return next(err);
            }
            if (!client) {
                return next(null, false, { errorMsg: "Usuario no registrado" })
            }
            if (!bcrypt.compareSync(password, client.password)) {
                return next(null, false, { errorMsg: "Contraseña incorrecta" })
            }
            return next(null, client);
        })
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}