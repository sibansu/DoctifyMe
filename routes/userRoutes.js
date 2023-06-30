const express = require('express')
const {deleteAllNotificationController, loginController, registerController, authController, applyDoctorController, getAllNotificationController, getAllDoctorsController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

//router object
const router = express.Router()

router.post('/login', loginController)

router.post('/signup', registerController)

router.post('/getUserData', authMiddleware, authController)

router.post('/apply-doctor', authMiddleware, applyDoctorController)

router.post('/get-all-notification', authMiddleware, getAllNotificationController)

router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)

router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)


module.exports = router