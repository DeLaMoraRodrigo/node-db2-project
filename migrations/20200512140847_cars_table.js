
exports.up = function(knex) {
    return knex.schema.createTable("Cars", tbl => {
        tbl.increments();
        tbl.text("vin", 17).notNullable().unique();
        tbl.text("make", 128).notNullable();
        tbl.text("model", 128).notNullable();
        tbl.text("mileage", 128).notNullable();
        tbl.text("transmission_type", 128);
        tbl.text("status_of_title", 128);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Cars");
  };
