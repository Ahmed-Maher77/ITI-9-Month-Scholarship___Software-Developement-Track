# Netlify Deployment Guide

This guide explains how to deploy the Kashf application to Netlify, with separate deployments for the frontend and backend.

## Prerequisites

- Netlify account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)
- MongoDB Atlas account (for production database)
- Cloudinary account (for image storage)

## Backend Deployment (Server)

### 1. Prepare MongoDB Atlas

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for development
5. Get your connection string (MongoDB URI)

### 2. Prepare Cloudinary

1. Create a Cloudinary account
2. Get your Cloud Name, API Key, and API Secret from the dashboard

### 3. Deploy Backend to Netlify

#### Option A: Using Netlify Functions (Recommended for serverless)

1. Create a new site in Netlify from your Git repository
2. Set the base directory to `server`
3. Add the following environment variables in Netlify dashboard:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/kashf
   JWT_SECRET=your-long-random-secret-key
   JWT_REFRESH_SECRET=your-different-long-random-secret-key
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   PORT=3000
   ```

4. Deploy - Netlify will automatically build and deploy

#### Option B: Using Netlify's Node.js Runtime

1. Create a new site in Netlify from your Git repository
2. Set the base directory to `server`
3. Add the same environment variables as above
4. Deploy

### 4. Get Backend URL

After deployment, Netlify will provide a URL like:
```
https://your-site-name.netlify.app
```

Copy this URL - you'll need it for the frontend configuration.

## Frontend Deployment (Client)

### 1. Deploy Frontend to Netlify

1. Create a new site in Netlify from your Git repository
2. Set the base directory to `client`
3. Add the following environment variable in Netlify dashboard:
   ```
   VITE_API_BASE_URL=https://your-backend-url.netlify.app
   ```

4. Deploy - Netlify will automatically build and deploy

### 2. Get Frontend URL

After deployment, Netlify will provide a URL like:
```
https://your-frontend-site-name.netlify.app
```

## Important Notes

### CORS Configuration

Make sure your backend CORS configuration allows requests from your frontend URL. Update `server/config/corsOptions.js` to include your frontend URL in the allowed origins.

### Environment Variables

- Never commit `.env` files to Git
- Use Netlify's environment variables dashboard for production secrets
- The `.env.example` files show what variables are needed

### Database

- Use MongoDB Atlas for production (not local MongoDB)
- The connection string format is: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

### Testing

1. Test the backend API endpoints first using the backend URL
2. Then test the frontend to ensure it can communicate with the backend
3. Check browser console for any CORS errors

## Troubleshooting

### Backend Issues

- Check Netlify function logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend Issues

- Verify `VITE_API_BASE_URL` is set correctly
- Check browser console for API errors
- Ensure CORS is configured on the backend

### Build Failures

- Check build logs in Netlify dashboard
- Ensure Node version is set to 20 in netlify.toml
- Verify all dependencies are in package.json

## Continuous Deployment

Both frontend and backend are set up for continuous deployment:
- Push changes to your Git repository
- Netlify will automatically rebuild and deploy
- Changes to environment variables require manual redeployment
