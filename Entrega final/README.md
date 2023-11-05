# TOKYTECH - eCommerce
<img src="./frontend/src/assets/logo.png" style="width: 550px; height: auto;">

## Description
This project is designed as part of the Coderhouse backend course. It provides a backend implementation for a web application, offering various functionalities such as authentication, API endpoints, and communication with a database.

## Tech stack
<div style="display: flex; gap: 5px; flex-wrap: wrap;">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
    <img src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs logoColor=black">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
    <img src="https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white">
</div>

## Installation
You will need to clone this repository, then you have to enter to the project directory and execute the install of all dependencies

```bash
cd /backend

npm install
```

```bash
cd /frontend

npm install
```



Now you have to set your eneviroment variables, this is a .env template.
```bash
PORT="8080"
MONGO_URL="mongodb+srv://user:pass@database.hash.mongodb.net/?retryWrites=true&w=majority"
JWT_KEY="jwtSuperSecretKey"
JWT_RESET_PASSWORD_KEY="jwtResetSuperSecretKey"
JWT_COOKIE_KEY="jwtCookieSuperSecretKey"
GITHUB_CLIENT_ID="Iv1.234j6khpasd2"
GITHUB_CLIENT_SECRET="w9845gh0faSDKL3426426jdsa23"
PERSISTENCE="MONGO" or "FILE"
NODEMAILER_GMAIL="agustingomezdev@gmail.com"
NODEMAILER_PASS="234g02he2ddwf"
```

## Usage
Enter to the project backend directory.
```bash
cd backend
```
To run the server in development mode with auto-reloading with **nodemon**, use:
```bash
npm run dev
```

To start the server in production mode, use:
```bash
npm start
```

**Note**: Before running the server, ensure that you have properly set the necessary environment variables and configurations.

## API docs
To see the API docs you need to run the server and go to the endpoint: http://localhost/{PORT}/api/docs

## Dependencies
### Backend
- **@faker-js/faker** - A library to generate fake data for testing and development.
- **bcrypt** - A library for password hashing.
- **commander** - A library to create command-line interfaces.
- **cookie-parser** - A middleware to parse HTTP cookies.
- **cors** - A package for enabling CORS in Express applications.
- **dotenv** - A library to load environment variables from a .env file.
- **express** - A popular web framework for Node.js.
- **express-handlebars** - A view engine for Express to render dynamic templates.
- **jsonwebtoken** - A library for JSON Web Token (JWT) implementation.
- **mongoose** - A MongoDB object modeling tool.
- **mongoose-paginate-v2** - A plugin for Mongoose to enable pagination.
- **multer** - A middleware for handling multipart/form-data (file uploads).
- **nodemailer** - A library for sending emails from Node.js applications.
- **passport** - An authentication middleware for Node.js.
- **passport-github2** - GitHub authentication strategy for Passport.
- **passport-jwt** - Passport authentication strategy for JSON Web Tokens (JWT).
- **socket.io** - A library for real-time web applications using WebSockets.
- **swagger-jsdoc** - A package to extract JSDoc comments and generate Swagger/OpenAPI specification.
- **swagger-ui-express** - A middleware to serve Swagger UI for Express APIs.
- **winston** - A logging library for Node.js.
### Frontend
- **axios** - A promise-based HTTP client for the browser and Node.js.
- **js-cookie** - A simple library for handling cookies in JavaScript.
- **react** - A JavaScript library for building user interfaces.
- **react-dom** - Entry point to the React DOM rendering package.
- **react-icons** - A collection of icons for React applications.
- **react-multi-carousel** - A carousel component for React.
- **react-router-dom** - DOM bindings for React Router, a declarative routing library.
- **sonner** - A lightweight notification library for React.

## Dev Dependencies
### Backend
- **chai** - A BDD/TDD assertion library for Node.js and browsers.
- **mocha** - A flexible JavaScript test framework.
- **supertest** - A library for testing HTTP assertions.
### Frontend
- **@types/react** - Type definitions for React.
- **@types/react-dom** - Type definitions for React DOM.
- **@vitejs/plugin-react-swc** - A Vite plugin for React with SWC loader.
- **autoprefixer** - A PostCSS plugin to parse CSS and add vendor prefixes.
- **daisyui** - A CSS framework for Tailwind CSS.
- **eslint** - A pluggable JavaScript linter.
- **eslint-plugin-react** - ESLint plugin for React.
- **eslint-plugin-react-hooks** - ESLint plugin for React Hooks.
- **eslint-plugin-react-refresh** - ESLint plugin for React Refresh.
- **postcss** - A tool for transforming styles with JS plugins.
- **tailwindcss** - A utility-first CSS framework.
- **vite** - A fast development build tool.
