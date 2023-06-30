const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModel')

const getAllUsersController = async(req, res)=>{
    try {
        const users= await userModel.find({})
        res.status(200).send({
            message: "Users data list",
            success: true,
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Could not get all users"
        })
    }    
}


const getAllDoctorsController = async(req, res)=>{
    try {
        const doctors= await doctorModel.find({})
        res.status(200).send({
            message: "Doctors data list",
            success: true,
            data: doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Could not get all doctors"
        })
    } 
}

const changeAccountStatusController=async(req, res)=>{
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
        const user  = await userModel.findOne({_id: doctor.userId}) 
        const notification = user.notification  
        notification.push({
            type:'doctor-account-request-updated',
            message: `Your doctor request is ${status}`,
            onClicPath: '/notification'
        })

        user.isDoctor=status==='Approved' ? true: false
        await user.save()

        res.status(201).send({
            success: true,
            message: "Account status updated",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in getting status",
            error,
            success:false
        })
    }
}

module.exports = {changeAccountStatusController,getAllDoctorsController, getAllUsersController}