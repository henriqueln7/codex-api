const Category = require('../models/Category');

module.exports = {
  async create(req, res) {
    try {
      const category = await Category.create({ name: req.body.name });

      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async show(req, res) {
    try {
      const category = await Category.findById(req.params.id).populate('products');

      return res.status(200).json(category);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },

  async index(req, res) {
    try {
      const categories = await Category.find({}).populate('products');

      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      await Category.findByIdAndRemove(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
