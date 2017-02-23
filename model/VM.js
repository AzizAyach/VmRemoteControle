

  var mongoose = require("mongoose");

  var Schema = mongoose.Schema ;
  var ObjectId = Schema.ObjectId;

  var vmSchema = new Schema({
      name: { type: String, required: true, unique: true },
      ipadresse: { type: String, required: true, unique: true },
      username: { type: String, required: true },
      os: { type: String, required: true },
      harddisk: Number,
      Ram: Number,
      cpu:Number,
      created_at: Date,
      updated_at: Date
  });

  var VMmodel = mongoose.model('VmInfo', vmSchema);

  module.exports = VMmodel ;