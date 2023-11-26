const { Schema,mongoose } = require("mongoose");


const districtSchema = new Schema({
    districtName: {
        type: String,
    }
}, { timestamps: true });


const District = mongoose.model("district", districtSchema);

module.exports = District;
