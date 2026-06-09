/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table.integer("user_id").references("users.id");
    table.text("job_name");
    table.text("job_content");
    table.text("requirements");
    table.string("car_brand", 32);
    table.string("car_name", 32);
    table.integer("car_year");
    table.string("car_model", 32);
    table.text("picture");
    table.string("location", 64);
    table.string("start_time");
    table.string("end_time");
    table.decimal("reward", 10, 2);
    table.boolean("status").defaultTo(true);
    table.integer("join_user_id").references("users.id");
    //非nullは後で実装する
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
