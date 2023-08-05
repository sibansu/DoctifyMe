const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { blockUserController,getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl')

const router = express.Router()

router.get('/getAllUsers', authMiddleware, getAllUsersController)

router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)

router.post('/block-user', authMiddleware, blockUserController)
module.exports = router