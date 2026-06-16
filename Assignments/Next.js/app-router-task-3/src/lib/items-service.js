import { mockItems } from "@/data/items";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export async function getItems() {
  // Simulate database query time
  await delay(800);
  return mockItems;
}


export async function getItemById(id) {
  // Simulate database query time
  await delay(800);
  const item = mockItems.find((i) => i.id === id);
  return item || null;
}
