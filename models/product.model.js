import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    permalLink: { type: String, required: true, unique: true },
    description: { type: String },
    content: { type: String },
    images: { type: [String], default: [] },
    stock: { type: mongoose.Schema.Types.Mixed, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    status: { type: String, enum: ["published", "draft"], required: true },
    minQuantity: { type: Number, required: true },
    maxQuantity: { type: Number, default: 2000 },
    categories: {
      type: [
        {
          name: String,
          permalLink: String,
        },
      ],
      default: [],
    },
    tags: { type: [String], default: [] },
    seoTitle: { type: String },
    seoDes: { type: String },
    seoImage: { type: String },
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;
