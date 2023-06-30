const doctorModel = require('../models/doctorModel');
const doctoModel = require('../models/doctorModel')

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
module.exports = {getDoctorInfoController, updateProfileController, getADoctorCrontroller}