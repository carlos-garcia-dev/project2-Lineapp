module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./client.routes.js'))
    app.use('/', require('./guest.routes.js'))
    app.use('/partner', require('./partner.routes.js'))
    app.use('/api', require('./api.routes.js'))
}