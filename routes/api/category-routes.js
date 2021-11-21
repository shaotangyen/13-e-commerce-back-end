const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  /* Quicker way provided by BCS - 
    Category
      .findAll({
        include: [Product],
      })
      .then((categories) => res.json(categories))
      .catch((err) => res.status(500).json(err));
  */

  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product
      }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create one category
/* req.body should look like this (json format in insomnia):
    {
      "category_name":"Monitor"
    }
*/
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);

    if (!categoryData) {
      res.status(404).json({ message: 'Create category unsuccessfully' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update one category by a category_name
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      });

    if (!categoryData) {
      res.status(404).json({ message: 'Cannot update category with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category to be deleted with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
