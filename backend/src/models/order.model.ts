import mongoose, { Schema, Document } from "mongoose";

interface IShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
}
interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  couponIds?: mongoose.Types.ObjectId[];
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: IShippingAddress;
}

const shippingAddressesSchema = new Schema<IShippingAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const orderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  price:     { type: Number, required: true },
  name:      { type: String, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    couponIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Coupon",
      required: false,
      default: [],
    },
    items: { type: [orderItemSchema], required: true, default: [] },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
        required: true,
      },
    shippingAddress:{type: shippingAddressesSchema,required:true},
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
