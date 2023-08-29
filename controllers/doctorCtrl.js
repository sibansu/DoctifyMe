const doctorModel = require('../models/doctorModel');
const doctoModel = require('../models/doctorModel')
const appointmentMode= require('../models/appointmentMode');
const userModel = require('../models/userModel');

const getDoctorInfoController =async (req, res)=>{
    try {
        const doctor = await doctoModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: "Doctor details fetched",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching doctors details"
        })
    }
}

const updateProfileController=async(req, res)=>{
    try {
        const doctor = await doctoModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(200).send({
            success: true,
            message: "Doctor details updated successfuly",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating the doctor profile"
        })
    }
}

const getADoctorCrontroller= async(req, res)=>{
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId})
        res.status(200).send({
            success: true,
            message: "Data of the doctor fetched successfuly",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error getting the doctor"
        })
    }
}

const doctorAppointmentsController = async(req, res)=>{
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        const appointments = await doctoModel.find({doctorId: req.body.doctorId})
        res.status(200).send({
            success: true,
            message:"Doctor appointment fetched successfuly",
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Error in doctor appointments",
            error,
            success: false
        })
    }
}

const updateStatusController = async(req, res)=>{
    try {
        const {appointmentId, status} = req.body;
        const appointments = await appointmentMode.findByIdAndUpdate(appointmentId,{status})
        const user = await userModel.findOne({_id: appointmentId.userId})
        const notif = user?.notification
        notif?.push({
            type:"status-updated",
            message: `Your appointment status has been updated`,
            onClickPath:'/doctor-appointments'
        })
        await user?.save()
        res.status(200).send({
            success: true,
            message: "Appointment status has been updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Status could not be updated",
            success: false,
            error
        })
    }
}

module.exports = {updateStatusController, doctorAppointmentsController, getDoctorInfoController, updateProfileController, getADoctorCrontroller}