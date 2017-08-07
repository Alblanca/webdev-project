var mongoose = require("mongoose");
var websiteSchema = require("website.schema.server");
var websiteModel = mongoose.model("websiteModel", websiteSchema);

module.exports = websiteModel;
// create website, update, remove ...