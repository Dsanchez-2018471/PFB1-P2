'use strict'

import mongoose, {mongo} from "mongoose";

export const dbConnection = async () => {
    try{
        mongoose.connection.on('error', () => {
            console.log('MongoDB / could not connect to mongodb')
            mongoose.disconnect();
        })
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB / Try connecting');
        })
        mongoose.connection.on('connected', () => {
            console.log('MongoDB / connected to mongoDB');
        })
        mongoose.connection.on('open', () => {
            console.log('MongoDB / connected to database');
        })
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB / reconnected to mongoDB');
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB / disconnected to database');
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    } catch (e) {
        console.log("Error on connection with MongoDB", e)
    }
}
