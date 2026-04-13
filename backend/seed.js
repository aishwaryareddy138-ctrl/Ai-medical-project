require('dotenv').config();
const mongoose = require('mongoose');
const Shop = require('./models/Shop');
const Medicine = require('./models/Medicine');
const Inventory = require('./models/Inventory');

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to Database for seeding...');

    // Optionally clear existing data (we won't to avoid data loss)
    // await Shop.deleteMany({});
    // await Medicine.deleteMany({});
    // await Inventory.deleteMany({});

    // Add Demo Shops
    const shops = await Shop.insertMany([
      { name: "City Care Pharmacy", address: "123 Main Street, Downtown", phone: "555-0101" },
      { name: "Wellness Plus", address: "456 Oak Avenue, Westside", phone: "555-0202" },
      { name: "QuickHeal Meds", address: "789 Pine Road, Northville", phone: "555-0303" }
    ]);

    console.log('Shops added.');

    // Add Demo Medicines
    const medicines = await Medicine.insertMany([
      { name: "Paracetamol 500mg" },
      { name: "Amoxicillin 250mg" },
      { name: "Ibuprofen 400mg" },
      { name: "Vitamin C Supplements" }
    ]);

    console.log('Medicines added.');

    // Add Inventory (Link them)
    // "Paracetamol 500mg" in all shops
    await Inventory.insertMany([
      { shop: shops[0]._id, medicine: medicines[0]._id, available: true, quantity: 150 },
      { shop: shops[1]._id, medicine: medicines[0]._id, available: true, quantity: 45 },
      { shop: shops[2]._id, medicine: medicines[0]._id, available: false, quantity: 0 },
      
      // Amoxicillin in Shop 1 and 2
      { shop: shops[0]._id, medicine: medicines[1]._id, available: true, quantity: 30 },
      { shop: shops[1]._id, medicine: medicines[1]._id, available: true, quantity: 12 },

      // Ibuprofen in Shop 3
      { shop: shops[2]._id, medicine: medicines[2]._id, available: true, quantity: 80 },
    ]);

    console.log('Inventory linked.');
    console.log('Seeding completed successfully!');
    process.exit(0);

  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
