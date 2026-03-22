import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}
interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], required: true, default: [] },
  },
  { timestamps: true },
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
