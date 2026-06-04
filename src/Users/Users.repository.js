function createUsersRepository(knex, table = "users") {
  const read = async () => {
    const result = await knex.select("*").from(table);
    return result;
  };

  const find = async () => {};

  const create = async (payload) => {
    const result = await knex.transaction(async (trx) => {
      const [post] = await trx(table)
        .insert({
          user_name: payload.user_name,
          email: payload.email,
          create_at: payload.create_at,
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

module.exports = { createUsersRepository };
