import {Schema, model} from 'mongoose'
import * as mongoose from "mongoose";

const userSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model("User", userSchema)

