# Node.js CLI Assignment

## Task
Create a command-line app to manage products using the built-in `fs` module and `process.argv`.

The app should support CRUD operations.

## Requirements

1. Add new product (`id`: incremental or timestamp, `name`, `price`)
	- Command: `node filename add product-name price`
2. List all products
	- Command: `node filename list`
3. Update product name
	- Command: `node filename update id "new name"`
4. Delete product
	- Command: `node filename delete id`

## Bonus
Update both name and price using flags.

- Command: `node filename update id --name "new value" --price new-value`
