const Product = require('../models/productModel');


const addProduct =  async (req, res) => {
  try {
    const {productName, cost, productImages, description, stockStatus,} = req.body;

    const product = new Product({
      productName,
      ownerId: req.user.userId,
      cost,
      productImages,
      description,
      stockStatus
    });

    await product.save();
    res.status(201).json({message: 'Product added', product});
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message});
  }
};


/*const getProduct = async (req, res) => {
  try {
    const products = await Product.find().populate('ownerId', 'fullName email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message });
  }
};
*/

const getProduct = async (req, res) => {
  const {brand, page, limit} = req.params;

  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: 'brand'    //  This will include brand info in results
    };

    const query = {brand}; // filter products by brand

    const products = await Product.paginate(query, options);

    res.json(products);
  } catch (err) {
    res.status(500).json({error: 'Server error', details: err.message});
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({message: 'Product not found'});

    res.status(200).json({message: 'Product deleted'});
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message});
  }
};

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}