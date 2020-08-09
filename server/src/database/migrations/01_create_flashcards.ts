import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("flashcards", (table) => {
    table.increments("id").primary();

    table.string("question").notNullable();
    table.string("answer").notNullable();
    table.boolean("is_bookmarked").notNullable();
    table.boolean("is_known").notNullable();
    table.integer("views").notNullable();

    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("flashcards");
}
