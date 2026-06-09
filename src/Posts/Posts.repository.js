function createPostsRepository(knex, table = "posts") {
  const read = async () => {
    const result = await knex.select("*").from(table).orderBy("id", "asc");
    return result;
  };

  const find = async (id) => {
    const result = await knex.select("*").from(table).where("id", id).first();
    return result;
  };

  const create = async (payload) => {
    console.log("ペイロード", payload);
    const result = await knex.transaction(async (trx) => {
      const [post] = await trx(table)
        .insert({
          user_id: payload.user_id,
          job_name: payload.job_name,
          job_content: payload.job_content,
          requirements: payload.requirements,
          car_brand: payload.car_brand,
          car_name: payload.car_name,
          car_year: payload.car_year,
          car_model: payload.car_model,
          picture: payload.picture,
          location: payload.location,
          start_time: payload.start_time,
          end_time: payload.end_time,
          reward: payload.reward,
          status: payload.status,
          join_user_id: payload.join_user_id,
        })
        .returning("*");
      return post;
    });
    console.log("result", result);
    return result;
  };

  const update = async (id, payload) => {
    const result = await knex.transaction(async (trx) => {
      const [post] = await trx(table)
        .where({ id: id })
        .update({
          status: payload.status,
          join_user_id: payload.join_user_id,
        })
        .returning("*");

      return {
        post,
      };
    });
    return result;
  };

  const remove = async (id) => {
    const result = await knex.transaction(async (trx) => {
      const [memoContent] = await trx("memo_contents")
        .where({ memo_id: id })
        .del()
        .returning("*");
      const [memo] = await trx(table).where({ id: id }).del().returning("*");
      return {
        ...memo,
        content: memoContent.content,
      };
      return result;
    });
  };

  return { read, find, create, update, remove };
}

module.exports = { createPostsRepository };
