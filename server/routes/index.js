const { Router } = require('express');
const District = require("../models/district");
const Market = require("../models/market");
const Item = require('../models/item');

const router = Router();

router.get("/", (req, res) => {
    return res.redirect("/districts");
})

router
    .route("/districts")
    .get(async (req, res) => {
        const districts = await District.find({});
        return res.render("district", {
            user: req.user,
            districts
        });
    })
    .post(async (req, res) => {
        await District.create({
            districtName: req.body.district
        });

        return res.redirect("/districts");
    });

router
    .route("/districts/:districtId")
    .get(async (req, res) => {
        const districtData = await District.findById(req.params.districtId);
        const markets = await Market.find({ districtId: req.params.districtId });

        return res.render("market", {
            user: req.user,
            districtData,
            markets
        });
    })
    .post(async (req, res) => {
        await Market.create({
            marketName: req.body.market,
            districtId: req.params.districtId
        });
        return res.redirect(`/districts/${req.params.districtId}`);
    });

router
    .route("/market/:marketId",)
    .get(async (req, res) => {
        const marketData = await Market.findById(req.params.marketId);
        const items = await Item.find({ marketId: req.params.marketId });
        
        return res.render("items",{
            user: req.user,
            marketData,
            items
        });
    })
    .post(async (req, res) => {
        try {
            await Item.create({
                itemName: req.body.itemName,
                itemQuantity: req.body.itemQuantity,
                itemPrice: req.body.itemPrice,
                marketId: req.params.marketId
            })
            return res.redirect(`/market/${req.params.marketId}`);
        } catch (error) {

            return res.redirect(`/market/${req.params.marketId}`);
        }
    })

router
    .route("/market/:marketId/:itemId")
    .get(async (req, res) => {
        const marketData = await Market.findById(req.params.marketId);
        const itemData = await Item.findById(req.params.itemId);
        return res.render("editItem", {
            user: req.user,
            marketData,
            itemData
        });
    })
    .post(async (req, res) => {
        try {
            const id = req.params.itemId;
            console.log(req.body);
            await Item.findByIdAndUpdate(id, {
                $set: {
                    itemQuantity: req.body.itemQuantity,
                    itemPrice: req.body.itemPrice
                }
            })
            return res.redirect(`/market/${req.params.marketId}`);
        } catch (error) {
            return res.redirect(`/market/${req.params.marketId}/${req.params.itemId}`);
        }
    })


router
    .route("/delete/:marketId/:itemId")
    .get(async (req,res)=>{
        await Item.findByIdAndDelete(req.params.itemId);
        return res.redirect(`/market/${req.params.marketId}`)
    })

module.exports = router;