const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  id: String,
  name: String,
});
const SiteModel = mongoose.model("SiteModel", siteSchema);

const settingsSchema = new Schema({
  userRoles: [String],
  workShifts: [
    {
      name: String,
      start: Number,
    },
  ],
  shiftDuration: Number,
  site: [siteSchema],
  responseMessages: [
    {
      id: String,
      text: Object,
    },
  ],
});
const SettingsModel = mongoose.model("SettingsModel", settingsSchema);

module.exports = { SettingsModel, SiteModel };
