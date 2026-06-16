import mongoose from 'mongoose';

const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/iti_ecommerce';

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [mongoose.Schema.Types.Mixed],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    images: [String],
    thumbnail: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

async function seed() {
  await mongoose.connect(MONGODB_URL);

  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} products. Skipping seed.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  console.log('Fetching products from DummyJSON...');
  const res = await fetch('https://dummyjson.com/products?limit=0');
  if (!res.ok) {
    throw new Error('Failed to fetch from DummyJSON');
  }

  const data = await res.json();
  const products = data.products.map((p) => ({
    title: p.title,
    description: p.description,
    category: p.category,
    price: p.price,
    discountPercentage: p.discountPercentage,
    rating: p.rating,
    stock: p.stock,
    tags: p.tags,
    brand: p.brand ?? '',
    sku: p.sku,
    weight: p.weight,
    dimensions: p.dimensions,
    warrantyInformation: p.warrantyInformation,
    shippingInformation: p.shippingInformation,
    availabilityStatus: p.availabilityStatus,
    reviews: p.reviews,
    returnPolicy: p.returnPolicy,
    minimumOrderQuantity: p.minimumOrderQuantity,
    images: p.images,
    thumbnail: p.thumbnail,
  }));

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products successfully.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error('Seed failed:', err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
