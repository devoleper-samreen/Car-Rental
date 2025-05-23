import { Car } from '../models/car.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addCar = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const localFilePath = req.file?.path;
        console.log(localFilePath);

        console.log(req.body);

        const { name, category, brand, model, year, pricePerDay, features, transmission, fuelType, seats, status } = req.body;

        if (!name || !category || !brand || !model || !year || !pricePerDay || !transmission || !fuelType || !seats) {
            return res.status(400).json({
                message: 'Please add all fields'
            });
        }

        const carImage = await uploadOnCloudinary(localFilePath);


        if (!carImage) {
            return res.status(400).json({
                message: 'Car image not uploaded'
            });
        }

        const car = await Car.create({
            admin: adminId,
            name,
            category,
            brand,
            model,
            year,
            pricePerDay,
            image: carImage?.secure_url || '',
            features: features || [],
            transmission,
            fuelType,
            seats,
            status,
            isAvaible: status === 'available' ? true : false
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

export const getAllCarsByAdmin = async (req, res) => {
    try {
        const adminId = req.admin._id;
        console.log(adminId);


        const cars = await Car.find({ admin: adminId });

        if (!cars) {
            return res.status(404).json({
                success: false,
                message: 'Cars not found'
            });
        }

        return res.status(200).json({
            success: true,
            cars
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();

        if (!cars) {
            return res.status(404).json({
                success: false,
                message: 'Cars not found'
            });
        }

        return res.status(200).json({
            success: true,
            cars
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

export const searchCars = async (req, res) => {
    try {
        console.log('req.query', req.query);

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
            query.pricePerDay = { $lte: priceRange };
        }

        if (priceRange === 'under50') {
            query.pricePerDay = { $lte: 50 };
        } else if (priceRange === '50to100') {
            query.pricePerDay = { $gte: 50, $lte: 100 };
        } else if (priceRange === 'over100') {
            query.pricePerDay = { $gte: 100 };
        }

        let sortOptions = {}

        switch (sortBy) {
            case 'price-low':
                sortOptions = { pricePerDay: 1 };
                break;
            case 'price-high':
                sortOptions = { pricePerDay: -1 };
                break;
            default:
                sortOptions = { name: 1 };
        }

        const skip = (page - 1) * limit;

        const cars = await Car.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

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
                price: car.pricePerDay,
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