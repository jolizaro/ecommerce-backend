const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include:[
      {model:Product, attributes:['id', 'product_name', 'price', 'stock', 'category_id']}
    ]
  })
  .then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message: 'Its not working'})
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {id: req.params.id},
    include:[
      {model:Product, attributes:['id', 'product_name', 'price', 'stock', 'category_id']}
    ]
  })
  .then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(404).json({message: 'No Category found with this id'})
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(data=>{
    res.status(201).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message: 'Category not created'})
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {id: req.params.id},
    
  })
  .then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(404).json({message: 'No Category found with this id'})
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy( {
    where: {id: req.params.id},
    
  })
  .then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(404).json({message: 'No Category found with this id'})
  })
});

module.exports = router;
