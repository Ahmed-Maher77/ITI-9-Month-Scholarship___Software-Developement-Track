const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

const { users, posts, comments, findById, nextId } = require("./data");

// ─── User Type ────────────────────────────────────────────────────────────────────
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    // Relationship: get all posts where userId matches this user's id
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent) {
        return posts.filter((p) => p.userId === parent.id);
      },
    },
  }),
});

// ─── Post Type ────────────────────────────────────────────────────────────────────
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    // Relationship: get the user who wrote this post
    user: {
      type: UserType,
      resolve(parent) {
        return findById(users, parent.userId);
      },
    },
    // Relationship: get all comments on this post
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent) {
        return comments.filter((c) => c.postId === parent.id);
      },
    },
  }),
});

// ─── Comment Type ─────────────────────────────────────────────────────────────────
const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    // Relationship: get the user who wrote this comment
    user: {
      type: UserType,
      resolve(parent) {
        return findById(users, parent.userId);
      },
    },
    // Relationship: get the post this comment belongs to
    post: {
      type: PostType,
      resolve(parent) {
        return findById(posts, parent.postId);
      },
    },
  }),
});

// ─── Root Query ───────────────────────────────────────────────────────────────────
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // ── Users ──
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve() {
        return users;
      },
    },
    getUserById: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return findById(users, args.id);
      },
    },
    // ── Posts ──
    getAllPosts: {
      type: new GraphQLList(PostType),
      resolve() {
        return posts;
      },
    },
    getPostById: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return findById(posts, args.id);
      },
    },
    // ── Comments ──
    getAllComments: {
      type: new GraphQLList(CommentType),
      resolve() {
        return comments;
      },
    },
    getCommentById: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return findById(comments, args.id);
      },
    },
  },
});

// ─── Mutations ────────────────────────────────────────────────────────────────────
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // ── User Mutations ──
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const newUser = { id: nextId(users), name: args.name, email: args.email };
        users.push(newUser);
        return newUser;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(_, args) {
        const user = findById(users, args.id);
        if (!user) throw new Error("User not found");
        if (args.name !== undefined) user.name = args.name;
        if (args.email !== undefined) user.email = args.email;
        return user;
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        const index = users.findIndex((u) => u.id === args.id);
        if (index === -1) throw new Error("User not found");
        return users.splice(index, 1)[0];
      },
    },
    // ── Post Mutations ──
    addPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        if (!findById(users, args.userId)) throw new Error("User not found");
        const newPost = {
          id: nextId(posts),
          title: args.title,
          content: args.content,
          userId: args.userId,
        };
        posts.push(newPost);
        return newPost;
      },
    },
    updatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      resolve(_, args) {
        const post = findById(posts, args.id);
        if (!post) throw new Error("Post not found");
        if (args.title !== undefined) post.title = args.title;
        if (args.content !== undefined) post.content = args.content;
        return post;
      },
    },
    deletePost: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        const index = posts.findIndex((p) => p.id === args.id);
        if (index === -1) throw new Error("Post not found");
        return posts.splice(index, 1)[0];
      },
    },
    // ── Comment Mutations ──
    addComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        if (!findById(users, args.userId)) throw new Error("User not found");
        if (!findById(posts, args.postId)) throw new Error("Post not found");
        const newComment = {
          id: nextId(comments),
          text: args.text,
          userId: args.userId,
          postId: args.postId,
        };
        comments.push(newComment);
        return newComment;
      },
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: GraphQLString },
      },
      resolve(_, args) {
        const comment = findById(comments, args.id);
        if (!comment) throw new Error("Comment not found");
        if (args.text !== undefined) comment.text = args.text;
        return comment;
      },
    },
    deleteComment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        const index = comments.findIndex((c) => c.id === args.id);
        if (index === -1) throw new Error("Comment not found");
        return comments.splice(index, 1)[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
