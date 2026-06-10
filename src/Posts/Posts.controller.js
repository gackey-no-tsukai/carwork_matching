function createPostsController(service) {
  const read = async (req, res) => {
    const result = await service.read();
    res.status(200).json({ data: result });
  };

  const find = async (req, res) => {
    const result = await service.find(Number(req.params.id));

    if (result.ok) {
      res.status(200).json({ data: result });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };
  const create = async (req, res) => {
    const result = await service.create(req.body);
    res.status(201).json({ data: result });
  };
  const update = async (req, res) => {
    const result = await service.update(Number(req.params.id), req.body);

    if (result.ok) {
      res.status(200).json({ data: result });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  const remove = async (req, res) => {
    const result = await service.remove(Number(req.params.id));

    if (result.ok) {
      res.status(204).send();
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  return { read, find, create, update, remove };
}

module.exports = { createPostsController };
