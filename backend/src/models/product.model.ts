import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  sku: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inventory: number;
  image: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    inventory: { type: Number, required: true, min: 0, default: 0 },
    image: { type: [String], required: true, default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
