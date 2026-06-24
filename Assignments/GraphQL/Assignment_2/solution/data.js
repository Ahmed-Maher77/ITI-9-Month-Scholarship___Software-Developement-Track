let users = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "2", name: "Bob Smith", email: "bob@example.com" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com" },
];

let posts = [
  { id: "1", title: "First Post", content: "This is the first post content.", userId: "1" },
  { id: "2", title: "Second Post", content: "This is the second post content.", userId: "1" },
  { id: "3", title: "Third Post", content: "This is the third post content.", userId: "2" },
];

let comments = [
  { id: "1", text: "Great post!", userId: "2", postId: "1" },
  { id: "2", text: "Thanks for sharing!", userId: "3", postId: "1" },
  { id: "3", text: "Interesting read.", userId: "1", postId: "3" },
  { id: "4", text: "I disagree with some points.", userId: "3", postId: "2" },
];

// Helper to find an item by id in an array
const findById = (arr, id) => arr.find((item) => item.id === id);

// Get the next available id (incrementing the max)
const nextId = (arr) => String(Math.max(...arr.map((i) => Number(i.id)), 0) + 1);

module.exports = { users, posts, comments, findById, nextId };
