const { instance: store } = require('../store/inMemoryStore');
exports.getAllProducts = async (req, res) => {
    try{
        const products = store.getProducts();
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({ message: 'Error getting all the products ', error: error.message });
      }
}