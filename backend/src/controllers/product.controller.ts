import type { Request, Response, NextFunction } from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, description, price, category, inventory, image } = req.body;

    // temp
    const sku = `SKU-${Date.now()}`;

    const createdBy = new mongoose.Types.ObjectId(req.user!.id);
    const product = await Product.create({
      name,
      description,
      price,
      category,
      inventory,
      sku,
      image,
      createdBy,
    });
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    const mongoError = err as { code?: number };
    if (mongoError.code === 11000) {
      res.status(409).json({ success: false, message: "SKU already exists" });
      return;
    }
    next(err);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (err) {
    next(err);
  }
};

export const getListProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.category ? { category: req.query.category } : {};

    const sort: Record<string, 1 | -1> =
      req.query.sort === "price_asc"
        ? { price: 1 }
        : req.query.sort === "price_desc"
          ? { price: -1 }
          : { createdAt: -1 };
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      products: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    // only creator can edit
    if (product.createdBy.toString() !== req.user!.id) {
      res.status(403).json({ success: false, message: "Not authorized" });
      return;
    }
    const { name, description, price, category, inventory, image, sku } =
      req.body;
    const updates = Object.fromEntries(
      Object.entries({
        name,
        description,
        price,
        category,
        inventory,
        image,
        sku,
      }).filter(([_, value]) => value !== undefined),
    );
    const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, product: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    // only creator can delete
    if (product.createdBy.toString() !== req.user!.id) {
      res.status(403).json({ success: false, message: "Not authorized" });
      return;
    }
    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
