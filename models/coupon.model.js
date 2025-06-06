import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "Coupon code is required"],
      minlength: [6, "Coupon code must be at least 6 characters"],
      maxlength: [12, "Coupon code cannot exceed 12 characters"],
      unique: true,
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Please enter today's or a future date",
      },
    },
    couponType: {
      type: String,
      enum: ["shipping", "percentage", "fixed"],
      required: [true, "Coupon type is required"],
    },
    amountOrPercent: {
      type: Number,
      min: [0, "Discount must be greater than 0"],
    },
    couponLimit: {
      type: Number,
      required: [true, "Coupon limit is required"],
      min: [1, "Limit must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
