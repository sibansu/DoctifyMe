// import mongoose, { model } from "mongoose";
const mongoose = require('mongoose')

const doctorSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        required: true,
        type: String
    },
    website:{
        type: String
    },
    address:{
        type: String,
        required: true,
    },
    specialization:{
        type: String,
        required: true,
    },
    experience:{
        type: String,
        required: true,
    },
    fees:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        default: 'Pending'
    },
    timings:{
        type: Object,
        required: true,
    },

},{timestamps: true})

const doctorModel = mongoose.model('doctors', doctorSchema)

module.exports = doctorModel