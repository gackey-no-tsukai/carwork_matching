function createUsersService(repository) {
  const read = async () => {
    return await repository.read();
  };

  const find = async (payload) => {
    const created = await repository.upsert(payload);
    return { ok: true, data: created };
  };
  const create = async (payload) => {
    const created = await repository.create(payload);
    return { ok: true, data: created };
  };
  const update = async (id, payload) => {
    const result = await repository.find(id);
    if (!result) return { ok: false, status: 404, message: "id not found" };

    const updated = await repository.update(id, payload);
    return { ok: true, data: updated };
  };

  const remove = async (id) => {
    const result = await repository.find(id);
    if (!result) return { ok: false, status: 404, message: "id not found" };

    await repository.remove(id);
    return { ok: true, data: null };
  };

  return { read, find, create, update, remove };
}

module.exports = { createUsersService };
