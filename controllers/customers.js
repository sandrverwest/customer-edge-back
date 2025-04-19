const Customer = require("../models/customer");

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addCustomer = (req, res) => {
    Customer
    .findOne( { ssn_ein: req.body.ssn_ein} )
    .then((result) => {
            if(result) {
            res.status(200).json({isExists:true, ...result._doc});
            console.log({isExists:true, ...result._doc});
        } else {
            const customer = new Customer(req.body);
            customer
            .save()
            .then((result) => {
                res
                .status(201)
                .json(result);
            })
            .catch((err) => handleError(res, err))
        }
    })
}

const getCustomers = (req, res) => {
    Customer
    .find({})
    .sort({ name: 1 })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getSingleCustomer = (req, res) => {
    Customer
    .findById(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleCustomer = (req, res) => {
    Customer
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleCustomer = (req, res) => {
    Customer
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}



module.exports = {
    addCustomer,
    getCustomers,
    getSingleCustomer,
    updateSingleCustomer,
    deleteSingleCustomer
}