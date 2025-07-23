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
- **Local Storage (public/uploads/)**
  - *Why?* Simple and effective for small projects. Easy to switch to cloud storage later if needed.

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
   - Add your MongoDB URI and any secret keys:
     ```
     MONGODB_URI=mongodb://localhost:27017/blogging
     SESSION_SECRET=your_secret_key
     JWT_SECRET=your_jwt_secret
     ```

4. **Start MongoDB:**  
   Make sure your MongoDB server is running locally or use a MongoDB Atlas connection string.

5. **Run the app:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

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