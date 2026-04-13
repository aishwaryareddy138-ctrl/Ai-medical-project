const Medicine = require('../models/Medicine');

// Search medicines by name (regex match)
exports.searchMedicines = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      // If no name is provided, return all or empty. Let's return all for the admin panel's sake, or limit it.
      const medicines = await Medicine.find().limit(50);
      return res.json(medicines);
    }

    const medicines = await Medicine.find({ name: { $regex: name, $options: 'i' } });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add new medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const existing = await Medicine.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (existing) {
      return res.status(400).json({ error: 'Medicine already exists' });
    }

    const medicine = new Medicine({ name });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
