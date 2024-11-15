import Airplane from "../model/airplane.js";
import Flight from "../model/flight.js";
import { errorHandler } from "../utils/errorHandler.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const validateColumns = (columns) => {
    const regex = /^(\d+x)+\d+$/;
    return regex.test(columns);
};

export const create_airplane = async (req,res) => {
    try{
        if (!validateColumns(req.body.columns)) {
            throw new Error('Invalid column format. Please use the format "3x3" or "3x3x3".');
        }

        const newAirplane = new Airplane(req.body);
        await newAirplane.save();
        res.status(200).json(newAirplane);
    }catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}

export const get_airplane = async (req, res) => {
    try{
        const id = req.params.id;
        const airplane = await Airplane.findById(id);
        res.status(200).json(airplane);
    }catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}

export const get_airplanes = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;
    const searchTerm = req.query.searchTerm;
    try{
        const searchCriteria = searchTerm
        ? {
            $or: [
                { _id: ObjectId.isValid(searchTerm) ? new ObjectId(searchTerm) : null },
                {model: { $regex: new RegExp(searchTerm, 'i') }},
                {columns: { $regex: new RegExp(searchTerm, 'i') }},
                {status: { $regex: new RegExp(searchTerm, 'i') }}
            ]
        }
        : {};

        const airplanes = await Airplane.find(searchCriteria)
        .skip(skip)
        .limit(limit);

        const totalAirplanes = await Airplane.countDocuments(searchCriteria);
        const totalPages = Math.ceil(totalAirplanes / limit);
        res.status(200).json({
            currentPage: page,
            totalPages: totalPages,
            airplanes: airplanes,
        });
    }catch(err){
        console.log(err)
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}


export const delete_airplane = async (req, res) => {
    try{
        const airplane = await Airplane.findByIdAndDelete(req.params.id);
        if(!airplane){
            throw new Error('Airplane not found')
        }
        res.status(200).json({message: 'Airplane successfully deleted', airplane});

    }catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}

export const update_airplane_data = async (req, res) => {
    try{
        if (!validateColumns(req.body.columns)) {
            throw new Error('Invalid column format. Please use the format "3x3" or "3x3x3".');
        }
        
        const updatedAirplane = await Airplane.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if(!updatedAirplane){
            throw new Error('Airplane not found');
        }

        res.status(200).json({message: 'Airplane successfully updated', updatedValues: updatedAirplane})

    }catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}

export const get_available_airplanes = async (req, res) => {
    const departureTime = new Date(req.query.departureTime);
    const departureAirport = req.query.departureAirport;
    try{
        const airplanes = await Airplane.find();
        const availableAirplanes = await Promise.all(airplanes.map(async (airplane) => {
            airplane
            const flight = await Flight.findOne({'airplane.id' : airplane._id}).sort({'arrival.time' : -1});
            if(flight){
                const isAvailable = flight.arrival.airport === departureAirport && 
                new Date(new Date(flight.arrival.time).getTime() + 24 * 60 * 60 * 1000) < new Date(departureTime);
                return isAvailable ? airplane : null;
            }else if(departureAirport !== airplane.currentLocation){
                return null;
            }
            return airplane;
        }))
        const filteredPlanes = availableAirplanes.filter(airplane => airplane !== null)
        res.status(200).json(filteredPlanes)

    }catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}