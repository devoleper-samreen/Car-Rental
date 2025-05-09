import { Car } from '../models/car.model.js';

export const addCar = async (req, res) => {
    try {
        //const { image } = req.file;

        const { name, category, brand, model, year, price, features, transmission, fuelType, seats } = req.body;

        if (!name || !category || !brand || !model || !year || !price || !transmission || !fuelType || !seats) {
            return res.status(400).json({
                message: 'Please add all fields'
            });
        }

        const car = await Car.create({
            name,
            category,
            brand,
            model,
            year,
            price,
            image: req.file.path || '',
            features,
            transmission,
            fuelType,
            seats
        });

        if (!car) {
            return res.status(400).json({
                message: 'Car not created'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Car created successfully',
            data: car
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}