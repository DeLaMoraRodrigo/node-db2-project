
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Cars').insert([
        { vin: "asdfghjkl;'123456",
          make: "Car Make",
          model: "Car Model",
          mileage: "12000miles",
          transmission_type: "Car Transmission",
          status_of_title: "Car Status"
        },
        { vin: "asdfghjkl;'654321",
          make: "Car Make 2",
          model: "Car Model 2",
          mileage: "22000miles",
          transmission_type: "Car Transmission 2",
          status_of_title: "Car Status 2"
        },
        { vin: "asdfghjkl;'678905",
          make: "Car Make 3",
          model: "Car Model 3",
          mileage: "32000miles",
          transmission_type: "Car Transmission 3",
          status_of_title: "Car Status 3"
        }
      ]);
    });
};
