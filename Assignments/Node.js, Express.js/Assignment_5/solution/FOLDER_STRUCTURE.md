# Project Folder Structure

```
Lab 4 - Solution/
│
├── 📁 config/                          # Configuration files
│   ├── corsOptions.js                  # CORS middleware configuration
│   └── serverManager.js                # Server lifecycle management
│
├── 📁 database/                        # Database layer
│   ├── dbConnect.js                    # MongoDB connection setup
│   └── 📁 models/                      # Mongoose schemas
│       ├── users.model.js              # User schema (username, email, password, role)
│       └── products.model.js           # Product schema (name, price, publishedBy)
│
├── 📁 middlewares/                     # Custom Express middlewares
│   ├── isAuthenticated.js              # JWT verification middleware
│   ├── isAuthorized.js                 # Role-based access control
│   └── validateRequestBody.js          # Joi schema validation middleware
│
├── 📁 modules/                         # Feature modules (business logic)
│   ├── 📁 userAuth/                    # Authentication module
│   │   ├── userAuth.controllers.js     # Auth logic (register, login, password reset)
│   │   ├── userAuth.routes.js          # Auth endpoints routing
│   │   ├── userAuth.validation.js      # Joi schemas for user input validation
│   │   └── resetPassword_emailTemplate.html # Email template for password reset
│   │
│   └── 📁 product/                     # Product module
│       ├── products.controllers.js     # Product CRUD logic
│       ├── products.routes.js          # Product endpoints routing
│       └── products.validation.js      # Joi schemas for product validation
│
├── 📁 public/                          # Static assets
│   ├── 📁 files/                       # Static HTML files
│   │   ├── homePage.html               # Home page
│   │   └── notFound.html               # 404 page
│   ├── 📁 static_assets/               # Images, CSS, JavaScript
│   └── 📁 views/                       # View templates
│       ├── 404.html                    # 404 error page
│       └── home.html                   # Main HTML view
│
├── 📁 utils/                           # Utility functions
│   ├── AppError.js                     # Custom error class
│   ├── generateToken.js                # JWT token generation
│   ├── generateCookie.js               # Cookie creation logic
│   └── emailSender.js                  # Email service (nodemailer)
│
├── .env                                # Environment variables (Git ignored)
├── .gitignore                          # Git ignore rules
├── package.json                        # Project dependencies & scripts
├── package-lock.json                   # Locked dependency versions
├── server.js                           # Express app entry point
│
├── API_DOCS.md                         # API documentation
└── FOLDER_STRUCTURE.md                 # This file

```
