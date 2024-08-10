const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');
const Item = require('../models/item');

// Create a new bill
router.post('/', async (req, res) => {
    const { customerName, items } = req.body;

    try {
        let totalAmount = 0;
        const billItems = [];

        for (let billItem of items) {
            // Fetch the item from the inventory using itemId
            const item = await Item.findById(billItem.item);
            
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${billItem.item} not found.` });
            }

            if (item.quantity < billItem.quantity) {
                return res.status(400).json({ message: `Not enough quantity for ${item.name}. Available: ${item.quantity}, Requested: ${billItem.quantity}` });
            }

            // Subtract the sold quantity from the inventory
            item.quantity -= billItem.quantity;
            await item.save();

            totalAmount += billItem.quantity * billItem.price;
            billItems.push({
                item: item._id,
                quantity: billItem.quantity,
                price: billItem.price
            });
        }

        // Create the bill
        const bill = new Bill({
            customerName,
            items: billItems,
            totalAmount,
            date: req.body.date || Date.now()
        });

        const savedBill = await bill.save();
        res.status(201).json(savedBill);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
