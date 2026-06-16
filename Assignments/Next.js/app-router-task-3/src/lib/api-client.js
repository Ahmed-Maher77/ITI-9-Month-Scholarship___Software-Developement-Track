import { headers } from "next/headers";


// Returns the base URL of the application.
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""; // Client-side relative path
  }
  
  try {
    const headersList = headers();
    const host = headersList.get("host");
    if (!host) {
      return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    }
    // Simple protocol mapping
    const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
    return `${protocol}://${host}`;
  } catch (error) {
    // Fallback if headers are not available
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }
}


// fetch all items.
export async function fetchItems() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/items`, {
    cache: "no-store", // Do not cache, fetch fresh data for SSR demonstration
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch items catalog. Status: ${res.status}`);
  }

  return res.json();
}


//  to fetch a single item by id.
export async function fetchItemById(id) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/items/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch item details. Status: ${res.status}`);
  }

  return res.json();
}
