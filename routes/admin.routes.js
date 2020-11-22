const express = require('express')
const router = express.Router()
const Admin = require('./../models/admin.model.js')
const bcrypt = require("bcryptjs")
const bcryptSalt = 10
const passport = require('passport')











module.exports = router