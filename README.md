# SAEIF Website

A website for SAEIF (Skill Advancement and Entrepreneurship Innovation Foundation) built with React and Node.js.

## About

This is a full-stack web application that helps address skill gaps and empower youth through communication, connection, and community building. The platform includes features for contact forms, donations, blog management, and member access to educational content.

## What's Inside

### Frontend
- React app with Tailwind CSS for styling
- Responsive design that works on mobile and desktop
- Interactive sections like the 3C Model, contact form, and donation page
- Smooth animations and hover effects
- Admin panel for content management
- Member login system with access to YouTube videos

### Backend
- Node.js server with Express
- MongoDB database with Mongoose
- API endpoints for contact forms, donations, blog posts, and user management
- Authentication system with JWT tokens
- File upload handling for media content

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- MongoDB (you can use MongoDB Atlas for free)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Astitva-Rajput/SAEIF.git
   cd SAEIF
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables
   Create a `.env` file in the backend folder:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5050
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the application

1. Start the backend server
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5050

2. Start the frontend
   ```bash
   cd frontend
   npm start
   ```
   The website will open on http://localhost:3000

## Features

### 3C Model Section
- Interactive cards that expand on hover
- Shows Communication, 1:1 Connect, and Community Connect
- Responsive layout that works on all devices

### Contact Page
- Contact form with name, email, and message fields
- Google Maps integration showing our location
- Contact info cards with phone, email, and address

### Donation Page
- Multiple payment options (QR code, bank transfer, online)
- Tax receipt form for donors
- Impact statistics and trust information

### Admin Panel
- Blog post management (create, edit, delete)
- YouTube video management for member content
- User management and authentication

### Member System
- Login system for members
- Access to exclusive YouTube video content
- Membership plans and payment integration

### Navigation
- Navbar that changes transparency when scrolling
- Mobile-friendly menu
- Smooth transitions and animations

## Tech Stack

- Frontend: React, Tailwind CSS, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT tokens
- Icons: React Icons (FontAwesome)
- Maps: Google Maps Embed

## Project Structure

```
SAEIF/
├── frontend/          # React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app
│   └── package.json
├── backend/           # Node.js server
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── index.js       # Server file
└── README.md
```

## API Endpoints

- POST /api/contact - Submit contact form
- GET /api/blog - Get blog posts
- POST /api/blog - Create blog post (admin only)
- POST /api/donation - Process donations
- GET /api/media - Get media content
- POST /api/auth/login - User login
- GET /api/membership - Get membership plans
- POST /api/youtube - Manage YouTube videos (admin only)

## Customization

The project uses a custom color scheme defined in frontend/tailwind.config.js:
- Primary blue: #1e40af
- Accent orange: #f97316
- Dark blue: #1e3a8a

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you'd like to change.

## License

This project is open source and available under the MIT License.

---

Built for SAEIF - Empowering youth through skill development and innovation
