
exports.up = async function(knex) {
  await knex.schema.createTable('transmission', (table) => {
    table.increments('id')
    table.string('type')
        .unique()
        .notNullable();    
  });
  await knex.schema.createTable('title', (table) => {
    table.increments('id')
    table.string('status')        
        .notNullable()
            
  });
  await knex.schema.createTable('cars', (table) => {
    table.increments('id')
    table.string('make')
          .unique()
          .notNullable();
    table.string('model')
          .notNullable();
    table.string('vin')
          .unique()
          .notNullable();
    table.integer('mileage');
    table.integer('tansmission_id');
    table.integer('title_id');
});
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("cars")
    await knex.schema.dropTableIfExists("title")
    await knex.schema.dropTableIfExists("transmission")
 
};
