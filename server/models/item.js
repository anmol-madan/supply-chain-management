const { Schema, mongoose } = require("mongoose");

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    marketId: {
        type: Schema.Types.ObjectId,
        ref: "market"
    }
}, { timestamps: true });

const Item = mongoose.model("item", itemSchema);

module.exports = Item;