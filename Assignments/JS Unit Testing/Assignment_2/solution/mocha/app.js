async function getPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!response.ok) {
    throw new Error(
      "Network response was not ok " + response.statusText
    );
  }

  return await response.json();
}

module.exports = getPosts;