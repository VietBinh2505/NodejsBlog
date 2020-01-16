import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
   username: String,
   status: String,
   ordering: Number
});
ItemSchema.statics = {
   findItem(){
      return this.find({}).exec();
   },
   countFilter(value){
      return this.countDocuments(value).exec();
   },
};
module.exports = mongoose.model("item", ItemSchema);