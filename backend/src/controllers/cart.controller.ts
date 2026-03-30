import type { Request, Response, NextFunction } from "express";
import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.id;
    let cart = await Cart.findOne({ userId: req.user!.id }).populate(
      "items.productId",
    );
    // return empty cart
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    res.status(200).json({ success: true, cart: cart });
  } catch (err) {
    next(err);
  }
};

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { items } = req.body;
    const userId = req.user!.id;
    const filteredItems = items.filter(
      (item: { productId: string; quantity: number }) => item.quantity > 0,
    );
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items: filteredItems },
      { upsert: true, new: true },
    ).populate("items.productId");
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (err) {
    next(err);
  }
};
