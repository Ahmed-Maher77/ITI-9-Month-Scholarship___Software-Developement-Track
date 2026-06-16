import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const reviewSchema = new Schema(
  {
    rating: { type: Number, default: 0 },
    comment: { type: String, default: '' },
    date: { type: String, default: '' },
    reviewerName: { type: String, default: '' },
    reviewerEmail: { type: String, default: '' },
  },
  { _id: false }
);

const dimensionsSchema = new Schema(
  {
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    depth: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    stock: { type: Number, default: 0, min: 0 },
    tags: { type: [String], default: [] },
    brand: { type: String, default: '' },
    sku: { type: String, default: '' },
    weight: { type: Number, default: 0 },
    dimensions: { type: dimensionsSchema, default: () => ({}) },
    warrantyInformation: { type: String, default: '1 year warranty' },
    shippingInformation: { type: String, default: 'Ships in 3-5 business days' },
    availabilityStatus: { type: String, default: 'In Stock' },
    reviews: { type: [reviewSchema], default: [] },
    returnPolicy: { type: String, default: '30 days return policy' },
    minimumOrderQuantity: { type: Number, default: 1 },
    images: { type: [String], default: [] },
    thumbnail: { type: String, default: '' },
  },
  { timestamps: true }
);

export type ProductDocument = InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Product: Model<ProductDocument> =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
