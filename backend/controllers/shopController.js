const Shop = require('../models/Shop');
const Inventory = require('../models/Inventory');

// Add new shop
exports.addShop = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const shop = new Shop({ name, address, phone });
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get shops where a specific medicine is available
exports.getShopsByMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    
    // Find inventory entries for this medicine
    const inventory = await Inventory.find({ medicine: medicineId })
      .populate('shop', 'name address phone')
      .exec();

    // Map the results to just return the shop details and availability
    const shops = inventory.map(item => ({
      _id: item.shop._id,
      name: item.shop.name,
      address: item.shop.address,
      phone: item.shop.phone,
      inventoryId: item._id,
      available: item.available,
      quantity: item.quantity
    }));

    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get all shops (for admin purposes)
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
