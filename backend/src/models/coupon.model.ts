import mongoose, { Schema ,Document} from "mongoose";

interface ICoupon extends Document{
    code:string,
    type: 'fixed'|'percentage',
    value:number,
    threshold:number,
    expiresAt:Date,
    createdAt:Date,
    updatedAt:Date,
}

const couponSchema = new Schema<ICoupon>({
    code:{type:String,required:true,unique:true},
    type: { type: String, enum: ["fixed", "percentage"], required: true },
    value:{type:Number,required:true},
    threshold:{type:Number,required:true,min:0, default: 0 },
    expiresAt:{type:Date,required:true},  
},{timestamps:true})

const Coupon = mongoose.model<ICoupon>("Coupon",couponSchema);
export default Coupon;