import mongoose from 'mongoose';

const categorySearchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

const Category = mongoose.model('Category', categorySearchSchema);
export default Category;