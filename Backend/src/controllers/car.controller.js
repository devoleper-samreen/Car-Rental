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

export const getCarById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Please add car id'
            });
        }

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        const carData = {
            id: car._id,
            name: car.name,
            category: car.category,
            brand: car.brand,
            model: car.model,
            year: car.year,
            price: car.price,
            image: car.image,
            features: car.features,
            transmission: car.transmission,
            fuelType: car.fuelType,
            seats: car.seats,
            Avaible: car.isAvaible
        }

        return res.status(200).json({
            success: true,
            data: carData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

export const getCarImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Please add car id'
            });
        }

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: car.image
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}