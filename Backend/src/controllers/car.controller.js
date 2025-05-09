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

// export const getAllCars = async (req, res) => {
//     try {


//     } catch (error) {

//     }
// }


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

export const searchCars = async (req, res) => {
    try {
        const { search, priceRange, category, sortBy = 'name', page = 1, limit = 15 } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ]
        }

        if (category) {
            query.category = category;
        }

        if (priceRange) {
            switch (priceRange) {
                case 'under50':
                    query.price = { $lt: 50 };
                    break;
                case '50to100':
                    query.price = { $gte: 50, $lt: 100 };
                    break;
                case 'over100':
                    query.price = { $gte: 100 };
                    break;
            }
        }

        let sortOptions = {}

        switch (sortBy) {
            case 'price-low':
                sortOptions = { price: 1 };
                break;
            case 'price-high':
                sortOptions = { price: -1 };
                break;
            default:
                sortOptions: { name: 1 };
        }

        const skip = (page - 1) * limit;

        const cars = await Car.find(query)
            .sort(sortOptions).
            skip(skip).
            limit(limit);

        const totalItems = await Car.countDocuments(query);
        const categories = await Car.distinct('category', query);
        const brands = await Car.distinct('brand', query);

        const carsData = cars.map(car => {
            return {
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
        });

        return res.status(200).json({
            success: true,
            data: carsData,
            categories: categories,
            brands: brands,
            pagination: {
                page: parseInt(page),
                totalPages: Math.ceil(totalItems / limit),
                totalItems: totalItems,
                limit: parseInt(limit)
            }
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}