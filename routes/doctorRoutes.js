const { getDoctorInfoController, updateProfileController, getADoctorCrontroller } =require('../controllers/doctorCtrl');
const authMiddleware = require('../middlewares/authMiddleware')

const express = require('express')

const router = express.Router();

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

router.post('/updateProfile', authMiddleware, updateProfileController)

router.post('/getADoctor', authMiddleware, getADoctorCrontroller)
module.exports = router