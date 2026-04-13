const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const shopController = require('../controllers/shopController');
const inventoryController = require('../controllers/inventoryController');

// Medicine Routes
router.get('/medicines', medicineController.searchMedicines);
router.post('/medicines', medicineController.addMedicine);

// Shop Routes
router.post('/shops', shopController.addShop);
router.get('/shops/:medicineId', shopController.getShopsByMedicine);
router.get('/admin/shops', shopController.getAllShops); // Added for admin UI

// Inventory Routes
router.post('/inventory', inventoryController.addOrUpdateInventory);
router.get('/inventory/:shopId', inventoryController.getShopInventory);

module.exports = router;
