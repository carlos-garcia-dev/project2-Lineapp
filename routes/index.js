module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/client', require('./client.routes.js'))
    app.use('/guest', require('./guest.routes.js'))
    app.use('/partner', require('./partner.routes.js'))
    app.use('/admin', require('./admin.routes.js'))

}