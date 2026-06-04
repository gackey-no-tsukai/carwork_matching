/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const now = new Date();

  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      user_name: "稲垣雄真",
      email: "yuma@gmail.com",
      create_at: "2025-06-01 10:24:49.914+09",
    },
    {
      user_name: "真子隆臣",
      email: "makochi@gmail.com",
      create_at: "2026-03-02 09:24:49.914+09",
    },
    {
      user_name: "平松孝介",
      email: "kosuke@gmail.com",
      create_at: "2026-04-01 08:24:50.914+09",
    },
    {
      user_name: "kazuki masayoshi",
      email: "codechrysalis@gmail.com",
      create_at: "2026-06-01 10:24:49.914+09",
    },
  ]);
};
