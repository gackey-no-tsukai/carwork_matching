function createPostsRepository(knex, table = "posts") {
  const read = async () => {
    const result = await knex.select("*").from(table);
    return result;
  };

  const find = async () => {};

  const create = async (payload) => {
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
    return result;
  };

  const update = async (payload) => {
    const result = await knex.transaction(async (trx) => {
      const [memo] = await trx(table)
        .where({ id: id })
        .update({
          title: payload.title,
          last_edited_at: payload.last_edited_at,
        })
        .returning("*");
      const [memoContent] = await trx("memo_contents")
        .where({ memo_id: memo.id })
        .update({ content: payload.content })
        .returning("*");
      return {
        ...memo,
        content: memoContent.content,
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
