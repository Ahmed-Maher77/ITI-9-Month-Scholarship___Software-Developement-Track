# Lab2 - Express Server

Build an Express server for products CRUD operations (using files as storage) with the following endpoints and responses.

## API Endpoints

| Method | URL | Body | Success Response | Failure Response |
|---|---|---|---|---|
| GET | `/products` | - | `200`<br>`{ success: true, data: [...] }` | `200`<br>`{ success: true, data: [] }` |
| GET | `/products/:id` | - | `200`<br>`{ success: true, data: {...} }` | `404`<br>`{ success: false, message: 'Product not found' }` |
| POST | `/products` | `{ "name": "Phone", "price": 500 }` | `201`<br>`{ success: true, data: {...} }` | `400`<br>`{ success: false, message: 'Name and price are required' }` |
| PUT | `/products/:id` | `{ "name": "Laptop" }` | `200`<br>`{ success: true, data: {...} }` | `404`<br>`{ success: false, message: 'Product not found' }`<br>`400`<br>`{ success: false, message: 'Name or price required to update' }` |
| DELETE | `/products/:id` | - | `200`<br>`{ success: true, data: {...} }` | `404`<br>`{ success: false, message: 'Product not found' }` |
