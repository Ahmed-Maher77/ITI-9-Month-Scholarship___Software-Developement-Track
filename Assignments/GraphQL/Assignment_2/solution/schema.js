const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

// User Type 
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    // get all posts where userId matches this user's id
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent) {
        return Post.find({ userId: parent.id }).exec();
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
    // get the user who wrote this post
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId).exec();
      },
    },
    // get all comments on this post
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent) {
        return Comment.find({ postId: parent.id }).exec();
      },
    },
  }),
});

// Comment Type 
const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    // get the user who wrote this comment
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId).exec();
      },
    },
    // get the post this comment belongs to
    post: {
      type: PostType,
      resolve(parent) {
        return Post.findById(parent.postId).exec();
      },
    },
  }),
});

// Auth Payload Type 
const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType },
  }),
});

// Root Query 
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Users
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({}).exec();
      },
    },
    getUserById: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return User.findById(args.id).exec();
      },
    },
    // Posts
    getAllPosts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({}).exec();
      },
    },
    getPostById: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Post.findById(args.id).exec();
      },
    },
    // Comments
    getAllComments: {
      type: new GraphQLList(CommentType),
      resolve() {
        return Comment.find({}).exec();
      },
    },
    getCommentById: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Comment.findById(args.id).exec();
      },
    },
  },
});

// Mutations 
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Auth Mutations
    signup: {
      type: AuthPayloadType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        // Check if user already exists
        const existingUser = await User.findOne({ email: args.email }).exec();
        if (existingUser) {
          throw new Error("A user with this email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(args.password, 12);

        // Save user
        const user = new User({
          name: args.name,
          email: args.email,
          password: hashedPassword,
        });
        await user.save();

        // Sign JWT
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET || "supersecretkey123",
          { expiresIn: "1d" }
        );

        return { token, user };
      },
    },

    login: {
      type: AuthPayloadType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const user = await User.findOne({ email: args.email }).exec();
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET || "supersecretkey123",
          { expiresIn: "1d" }
        );

        return { token, user };
      },
    },

    // User Mutations
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
      },
      async resolve(_, args) {
        const existingUser = await User.findOne({ email: args.email }).exec();
        if (existingUser) {
          throw new Error("A user with this email already exists");
        }

        const password = args.password || "password123";
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
          name: args.name,
          email: args.email,
          password: hashedPassword,
        });
        return await user.save();
      },
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        if (context.user.id !== args.id) {
          throw new Error("Unauthorized to update this user profile");
        }

        const user = await User.findById(args.id).exec();
        if (!user) throw new Error("User not found");

        if (args.name !== undefined) user.name = args.name;
        if (args.email !== undefined) {
          const emailExists = await User.findOne({ email: args.email }).exec();
          if (emailExists && emailExists.id !== args.id) {
            throw new Error("Email is already taken");
          }
          user.email = args.email;
        }

        return await user.save();
      },
    },

    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        if (context.user.id !== args.id) {
          throw new Error("Unauthorized to delete this user profile");
        }

        const user = await User.findById(args.id).exec();
        if (!user) throw new Error("User not found");

        // Clean up associated posts and comments
        await Post.deleteMany({ userId: args.id });
        await Comment.deleteMany({ userId: args.id });

        await User.findByIdAndDelete(args.id);
        return user;
      },
    },

    // Post Mutations
    addPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLID }, // optional => default to context.user.id
      },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        const targetUserId = context.user.id;

        const newPost = new Post({
          title: args.title,
          content: args.content,
          userId: targetUserId,
        });

        return await newPost.save();
      },
    },

    updatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        const post = await Post.findById(args.id).exec();
        if (!post) throw new Error("Post not found");

        if (post.userId.toString() !== context.user.id) {
          throw new Error("Unauthorized to update this post");
        }

        if (args.title !== undefined) post.title = args.title;
        if (args.content !== undefined) post.content = args.content;

        return await post.save();
      },
    },

    deletePost: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        const post = await Post.findById(args.id).exec();
        if (!post) throw new Error("Post not found");

        if (post.userId.toString() !== context.user.id) {
          throw new Error("Unauthorized to delete this post");
        }

        // Clean up comments for this post
        await Comment.deleteMany({ postId: args.id });

        await Post.findByIdAndDelete(args.id);
        return post;
      },
    },

    // Comment Mutations
    addComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        const post = await Post.findById(args.postId).exec();
        if (!post) throw new Error("Post not found");

        const targetUserId = context.user.id;

        const newComment = new Comment({
          text: args.text,
          userId: targetUserId,
          postId: args.postId,
        });

        return await newComment.save();
      },
    },

    updateComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: GraphQLString },
      },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        const comment = await Comment.findById(args.id).exec();
        if (!comment) throw new Error("Comment not found");

        if (comment.userId.toString() !== context.user.id) {
          throw new Error("Unauthorized to update this comment");
        }

        if (args.text !== undefined) comment.text = args.text;

        return await comment.save();
      },
    },

    deleteComment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, args, context) {
        if (!context.isAuth) {
          throw new Error("Unauthenticated");
        }

        const comment = await Comment.findById(args.id).exec();
        if (!comment) throw new Error("Comment not found");

        if (comment.userId.toString() !== context.user.id) {
          throw new Error("Unauthorized to delete this comment");
        }

        await Comment.findByIdAndDelete(args.id);
        return comment;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
