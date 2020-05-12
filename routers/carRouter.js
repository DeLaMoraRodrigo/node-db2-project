const express = require("express");
const db = require("../data/dbConnections");

const router = express.Router();

router.get('/', (req, res) => {
    db('Cars')
      .then(cars => {
          res.status(200).json({ data: cars })
      })
      .catch(error => {
          console.log({ error })
          res.status(500).json({ message: "Error retrieving list of cars" })
      })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('Cars')
      .where({ id: id })
      .first()
      .then(car => {
          if(car) {
              res.status(200).json({ data: car })
          }else {
              res.status(404).json({ message: "Car with specified ID not found" })
          }
      })
      .catch(error => {
          console.log({ error })
          res.status(500).json({ message: "Error in retrieving car with specified ID" })
      })
})

router.post('/', validateCar, (req, res) => {
    const { vin, make, model, mileage, transmission_type, status_of_title } = req.body;
    
    db('Cars')
      .insert({ vin, make, model, mileage, transmission_type, status_of_title }, 'id')
      .then(([id]) => {
          db('Cars')
            .where({ id: id })
            .first()
            .then(newCar => {
                if(newCar) {
                    res.status(200).json({ data: newCar })
                }else {
                    res.status(404).json({ message: "Newly created car can not be found" })
                }
            })
            .catch(error => {
                console.log({ error })
                res.status(500).json({ message: "Error finding newly created car" })
            })
      })
      .catch(error => {
          console.log({ error })
          res.status(500).json({ message: "Error creating new car" })
      })
})

router.put('/:id', validateCar, (req, res) => {
    const { vin, make, model, mileage, transmission_type, status_of_title } = req.body;
    const { id } = req.params;

    db('Cars')
      .where({ id: id })
      .update({ vin, make, model, mileage, transmission_type, status_of_title })
      .then(count => {
          if(count) {
              db('Cars')
                .where({ id: id })
                .first()
                .then(updatedCar => {
                    if(updatedCar) {
                        res.status(200).json({ data: updatedCar })
                    }else {
                        res.status(404).json({ message: "Updated car can not be found" })
                    }
                })
                .catch(error => {
                    console.log({ error })
                    res.status(500).json({ message: "Error finding updated car" })
                })
          }
      })
      .catch(error => {
          console.log({ error })
          res.status(500).json({ message: "Error updating car" })
      })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('Cars')
      .where({ id: id })
      .del()
      .then(count => {
          if(count) {
              res.status(200).end()
          }else {
              res.status(404).json({ message: "Car with specified ID can not be found" })
          }
      })
      .catch(error => {
          console.log({ error })
          res.status(500).json({ message: "Error deleting car with specified ID" })
      })
})

//Custom Middleware

function validateCar(req, res, next) {
    const { vin, make, model, mileage } = req.body;

    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "No Car Data" })
    }else if(!vin || !make || !model || !mileage) {
        res.status(400).json({ message: "VIN, Make, Model, and Mileage are required fields" })
    }else if(vin.length > 17 || vin.length < 11) {
        res.status(400).json({ message: "VIN must be between 11 and 17 characters" })
    }else {
        next();
    }
}

module.exports = router;