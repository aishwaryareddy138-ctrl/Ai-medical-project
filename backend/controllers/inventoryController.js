const Inventory = require('../models/Inventory');

// Add or update medicine availability in shop
exports.addOrUpdateInventory = async (req, res) => {
  try {
    const { shop, medicine, available, quantity } = req.body;

    if (!shop || !medicine) {
      return res.status(400).json({ error: 'Shop ID and Medicine ID are required' });
    }

    let inventory = await Inventory.findOne({ shop, medicine });

    if (inventory) {
      // Update existing
      inventory.available = available !== undefined ? available : inventory.available;
      inventory.quantity = quantity !== undefined ? quantity : inventory.quantity;
      await inventory.save();
      return res.json(inventory);
    } else {
      // Create new
      inventory = new Inventory({ shop, medicine, available, quantity });
      await inventory.save();
      return res.status(201).json(inventory);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get inventory for a specific shop
exports.getShopInventory = async (req, res) => {
  try {
    const { shopId } = req.params;
    const inventory = await Inventory.find({ shop: shopId }).populate('medicine', 'name');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
