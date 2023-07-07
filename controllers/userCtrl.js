const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentMode')
// import doctorModel from '../models/doctorModel'
const moment = require("moment")
const registerController = async (req, res) => {
    try {
        const existing = await userModel.findOne({ email: req.body.email })
        if (existing) {
            return res.status(200).send({ success: false, message: "User already exists"})
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({ message: 'Registered successfuly', success: true })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Signup controller error: ${error.message}` })
    }
}

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ success: false, message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid email or password", success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: "Login ok", success: true, token })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Login controller error: ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password=undefined
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "User not found error",
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Auth error",
        })
        res.status(500).send * {
            message: "Auth error",
            error,
            success: false
        }
    }
}

const applyDoctorController = async(req, res) =>{
    try {
        const newDoctor = await doctorModel({...req.body, status:'Pending'})
        await newDoctor.save()
        const adminUser = await userModel.findOne({isAdmin: true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor's account`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName+" "+newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {notification})
        res.status(201).send({
            success: true,
            message: "Doctor applied successfuly"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, error, message:"Error while applying doctor form"})
    }
}

const getAllNotificationController = async(req, res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updateUser = await user.save()
        res.status(200).send({
            success: true,
            message:"All notifications read",
            data: updateUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in notification",
            error
        })
    }
}

const deleteAllNotificationController = async(req, res)=>{
    try {
        const user = await userModel.findOne({_id: req.body.userId})
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()

        updatedUser.password = undefined
        res.status(200).send({
            success: true, 
            message: "Notifications are deleted successfuly",
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Unable to delete notification",
            error
        })
    }
}

const getAllDoctorsController = async(req, res)=>{
    try {
        const doctors = await doctorModel.find({status:"Approved"})
        res.status(200).send({
            success: true,
            data: doctors,
            message: "Doctors details fetched successfuly"
        })
    } catch (error) {
        console.log(eroor);
        res.status(500).send({
            success: false,
            error,
            message: "Error fetching doctors"
        })
    }
}

const bookAppointmentController = async(req,res)=>{
    try {
        req.body.date = moment(req.body.date,"DD-MM-YYYY").toISOString()
        req.body.status = "Pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()

        const user = await userModel.findOne({_id: req.body.doctorInfo.userId})
        user?.notification.push({
            type:"New-appointment-request",
            message: `A new appointment request from ${req.body.userInfo.name}`,
            onClickPath:'/user/appointments'
        })
        await user?.save()
        res.status(200).send({
            success:true,
            message:"Appointment booked successfuly"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while booking appointment"
        })
    }
}

const bookingAvailability = async(req,res)=>{
    try {
        const date = moment(req.body.date,"DD-MM-YYYY").toISOString()
        const doctorId =req.body.doctorId

        const appointment = await appointmentModel.find({doctorId,date})
        if(appointment.length=0){
            return res.status(200).send({
                success:true,
                message:"Sorry Appointent not available on selected day"
            })
        }else{
            return res.status(200).send({
                success:true,
                message:"Booking possible on the selected date"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"Error in availability"
        })
    }
}

const userAppointmentController = async(req, res)=>{
    try {
        const appointment = await appointmentModel.find({userId: req.body.userId})
        res.status(200).send({
            success: true,
            data: appointment,
            message:"User Appointments fetched successfuly"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error,
            message:"Error in user appointment",
            success: false
        })
    }
}
module.exports = {userAppointmentController, bookingAvailability,bookAppointmentController, deleteAllNotificationController, loginController, registerController, authController, applyDoctorController, getAllNotificationController, getAllDoctorsController}