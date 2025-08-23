# Blogging Platform

A full-stack blogging platform that allows users to create, read, comment on, and manage blog posts. Built with modern web technologies for learning, extensibility, and real-world use.

---

## 🚀 Features

- **User Authentication:** Secure sign up, sign in, and session management using JWT tokens.
- **Password Security:** Passwords are hashed with salt for enhanced security.
- **Blog Management:** Create, edit, and delete your own blog posts.
- **Commenting System:** Add comments to any blog post.
- **Image Uploads:** Attach images to blogs and user profiles.
- **Authorization:** Only authors can edit or delete their own blogs.
- **Responsive UI:** Clean, responsive design using EJS, CSS, and Bootstrap.

---

## 🛠️ Tech Stack & Why These Choices?

### Backend
- **Node.js & Express.js**
  - *Why?* Fast, non-blocking, and ideal for building scalable web applications. Express provides a minimal and flexible framework for routing and middleware.

### Frontend
- **EJS (Embedded JavaScript Templates)**
  - *Why?* Enables server-side rendering with dynamic content, making it easy to pass data from backend to frontend and keep templates organized.
- **CSS & Bootstrap**
  - *Why?* CSS for custom styling. **Bootstrap** is used for rapid, responsive, and mobile-friendly UI development, providing a consistent look and feel with minimal effort.

### Database
- **MongoDB (with Mongoose ODM)**
  - *Why?* NoSQL, document-based, and flexible schema—perfect for blogs and comments. Mongoose simplifies data modeling and validation.

### Authentication & Security
- **JWT (JSON Web Tokens)**
  - *Why?* JWTs are used for stateless, secure authentication. When a user logs in, a JWT is generated and sent to the client. The client includes this token in the header of subsequent requests, allowing the server to verify the user's identity without storing session data. This makes the app scalable and secure.
  - *How it works in this project:* Upon successful login, the server generates a JWT containing user information (like user ID). This token is signed with a secret key and sent to the client. For protected routes, the server checks the token's validity before granting access.
- **Password Hashing with Salt**
  - *Why?* Storing plain-text passwords is insecure. Passwords are hashed using a cryptographic hash function (like bcrypt) with a unique salt for each password. This ensures that even if two users have the same password, their hashes will differ, and it protects against rainbow table attacks.
  - *How it works in this project:* When a user registers, their password is hashed with a salt and stored in the database. During login, the entered password is hashed with the same salt and compared to the stored hash.
- **Custom Middleware (Session or JWT-based)**
  - *Why?* To protect routes and ensure only authorized users can perform certain actions.

### File Uploads
- **Cloudinary Cloud Storage**
  - *Why?* Cloudinary provides powerful image and video management with automatic optimization, transformations, and CDN delivery. Perfect for blog images with built-in resizing and optimization.
  - *How it works:* Images are uploaded directly to Cloudinary using multer-storage-cloudinary, and the optimized URLs are stored in the database for retrieval.

---

## 📁 Project Structure

```
Blogging_copy/
├── app.js                # Main application entry point
├── controllers/          # Route handler logic
├── middlewares/          # Custom middleware (e.g., authentication)
├── models/               # Mongoose models (User, Blog, Comment)
├── public/               # Static assets (images, CSS, uploads)
│   ├── images/
│   ├── styles.css
│   └── uploads/
├── routes/               # Express route definitions
├── services/             # Business logic (e.g., authentication)
├── views/                # EJS templates for UI
│   ├── partials/         # Reusable EJS partials
│   └── *.ejs             # Main pages
├── package.json
└── package-lock.json
```

---

## 🏁 Getting Started (Run Locally)

### Prerequisites
- **Node.js** (v14+ recommended)
- **MongoDB** (local or Atlas)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Blogging_copy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI, JWT secret, and Cloudinary credentials:
     ```
     MONGO_URL=mongodb://localhost:27017/blogging
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. **Set up Cloudinary:**
   - Create a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
   - Get your Cloud Name, API Key, and API Secret from the dashboard
   - Configure upload presets if needed for additional security

5. **Start MongoDB:**  
   Make sure your MongoDB server is running locally or use a MongoDB Atlas connection string.

6. **Test Cloudinary Connection (Optional):**
   ```bash
   npm run test-cloudinary
   ```
   This will verify your Cloudinary configuration is working correctly.

7. **Run the app:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:8000`.

---

## 📝 Usage

- **Sign Up / Sign In:**  
  Access `/signup` or `/signin` to create an account or log in.
- **Create Blog:**  
  After logging in, use the "Add Blog" button to create a new post.
- **Comment:**  
  View a blog post and add comments.
- **Edit/Delete:**  
  Only the author can edit or delete their own blogs.

## ☁️ Cloudinary Setup

### Prerequisites
- Cloudinary account (free tier available)
- Node.js and npm installed

### Cloudinary Account Setup

1. **Create Cloudinary Account:**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for a free account
   - Verify your email address

2. **Get Your Credentials:**
   - Log in to your Cloudinary dashboard
   - Go to "Dashboard" → "Account Details"
   - Copy your Cloud Name, API Key, and API Secret

3. **Configure Upload Settings (Optional):**
   - Go to "Settings" → "Upload"
   - Configure upload presets for additional security
   - Set up allowed file formats and size limits

### Environment Variables

Add these to your `.env` file:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Features Included

- **🔄 Automatic Image Optimization**: Images are automatically resized and optimized
- **📱 Responsive Images**: Different sizes for different devices
- **🖼️ Thumbnail Generation**: Automatic thumbnail creation
- **🗑️ Automatic Cleanup**: Images are deleted when blogs are deleted
- **🛡️ File Validation**: Only image files are accepted
- **⚡ CDN Delivery**: Fast global content delivery

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)
- [Mongoose](https://mongoosejs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 