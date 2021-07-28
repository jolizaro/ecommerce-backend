const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
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
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    include:[
      {model:Product, attributes:['id', 'product_name', 'price', 'stock', 'category_id']},
    ]
  })
  .then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(404).json({message: 'No Product found with this id'})
  })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.category_name
  })
  .then(data=>{
    res.status(201).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message: 'Tag not created'})
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {id: req.params.id},
    
  })
  .then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(404).json({message: 'No Tag found with this id'})
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy( {
    where: {id: req.params.id},
  })
  .then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    console.log(err)
    res.status(404).json({message: 'No Tag found with this id'})
  })
});

module.exports = router;
