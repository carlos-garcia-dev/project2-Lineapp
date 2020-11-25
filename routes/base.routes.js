const express = require('express')
const router = express.Router()

// const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('client/login', {
//     errorMsg: 'Por favor, inicia sesión'
// })
// const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.client.role) ? next() : res.render('index', {
//     errorMsg: 'No tienes los suficientes permisos'
// })


// Authenticated
router.get('/', (req, res) => res.render('index'))


// router.get('/perfil', ensureAuthenticated, checkRole(['Admin', 'Partner', 'Client']), (req, res) => res.render('profile', {
//     user: req.user,
//     isAdmin: req.user.role.includes('Admin')
// }))
// router.get('/partner', ensureAuthenticated, checkRole(['Admin', 'Partner']), (req, res) => res.render('partner/index', {
//     user: req.user
// }))
// router.get('/management', ensureAuthenticated, checkRole(['Admin']), (req, res) => res.render('admin/index', {
//     user: req.user
// }))

module.exports = router