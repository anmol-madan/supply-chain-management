const { Schema, mongoose} = require("mongoose");

const marketSchema = new Schema({
    marketName: {
        type: String,
        required: true
    },
    districtId: {
        type: Schema.Types.ObjectId,
        ref: "district"
    }
});

const Market = mongoose.model("market", marketSchema);

module.exports = Market;
