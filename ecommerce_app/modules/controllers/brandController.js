const Brand = require('../models/brandModel');




 const createBrand = async (req, res) => {
  try {
    const {brandName} = req.body;
    const brand = new Brand({brandName});
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};



const updateBrand = async (req, res) => {
  try {
    const {brandName} = req.body;
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      {brandName},
      {new: true}
    );
    if (!brand) return res.status(404).json({message: 'Brand not found'});
    res.json(brand);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};



const getBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};



const deleteBrand = async (req, res) => {
  try {
    const result = await Brand.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({message: 'Brand not found'});
    res.json({message: 'Brand deleted'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};



module.exports = {
    createBrand,
    updateBrand,
    getBrand,
    deleteBrand
}
