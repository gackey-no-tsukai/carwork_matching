/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      user_id: "1",
      job_name: "タイヤ交換してほしい",
      job_content:
        "タイヤを４つ交換してもらいます。道具や設備はこちらにあるので、現場に来て欲しいです",
      requirements: "タイヤ交換の経験がある人",
      car_brand: "トヨタ",
      car_name: "プリウス",
      car_year: 2025,
      car_model: "6AA-MXWH60",
      picture: null,
      location: "〒470-0208 愛知県みよし市ひばりヶ丘２丁目",
      start_time: "2026-06-01 10:00:00.000+09",
      end_time: "2026-06-01 17:00:00.000+09",
      reward: 2000,
      status: true,
      join_user_id: 4,
    },
    {
      user_id: "2",
      job_name: "マフラー交換して欲しい",
      job_content:
        "マフラーを直感マフラーに変えて欲しいです。道具や設備はこちらにあるので、現場に来て欲しいです",
      requirements: "自動車整備士の資格のある方＆マフラー交換の経験がある方",
      car_brand: "レクサス",
      car_name: "IS300h",
      car_year: 2020,
      car_model: "6AA-AVE30",
      picture: null,
      location: "愛知県みよし市ひばりヶ丘",
      start_time: "2026-06-02 16:00:00.000+09",
      end_time: "2026-06-02 18:00:00.000+09",
      reward: 10000,
      status: true,
      join_user_id: 3,
    },
    {
      user_id: "3",
      job_name: "エンジンオーバーホールをしてほしい",
      job_content:
        "エンジンのオーバーホールをして欲しいです。道具や設備はないので、作業場用意して欲しいです",
      requirements: "自動車整備士の資格のある方＆エンジンOHの経験がある方",
      car_brand: "三菱",
      car_name: "ミニキャブトラック",
      car_year: 1996,
      car_model: "V-U41T",
      picture: null,
      location: "愛知県日進市米野木町",
      start_time: "2026-06-03 17:00:00.000+09",
      end_time: "2026-06-05 19:00:00.000+09",
      reward: 200000,
      status: false,
      join_user_id: 1,
    },
  ]);
};
