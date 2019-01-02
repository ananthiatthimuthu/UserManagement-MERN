import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FullName: { type: 'String', required: true },
  Email: { type: 'String', required: true },
  City: { type: 'String', required: true },
  State: { type: 'String', required: true },
  Country: { type: 'String', required: true },
  Designation: { type: 'String', required: true },
  CreatedAt: { type: 'Date', default: Date.now, required: true },
  UpdatedAt: { type: 'Date', default: Date.now, required: true },

});

export default mongoose.model('User', userSchema);
