const mockPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Post number ${i + 1}`,
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  userId: 1,
}))

let nextId = 13

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export default {
  async getPosts() {
    await delay(400)
    return { data: [...mockPosts] }
  },
  async getPost(id) {
    await delay(300)
    const post = mockPosts.find((p) => p.id === Number(id))
    if (!post) throw new Error('Not found')
    return { data: { ...post } }
  },
  async createPost(data) {
    await delay(300)
    const post = { id: nextId++, ...data, userId: 1 }
    mockPosts.unshift(post)
    return { data: { ...post } }
  },
  async updatePost(id, data) {
    await delay(300)
    const idx = mockPosts.findIndex((p) => p.id === Number(id))
    if (idx === -1) throw new Error('Not found')
    mockPosts[idx] = { ...mockPosts[idx], ...data }
    return { data: { ...mockPosts[idx] } }
  },
  async deletePost(id) {
    await delay(300)
    const idx = mockPosts.findIndex((p) => p.id === Number(id))
    if (idx === -1) throw new Error('Not found')
    mockPosts.splice(idx, 1)
    return { data: {} }
  },
}
