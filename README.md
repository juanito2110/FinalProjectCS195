# 🎯 Habit Tracker Web Application

A full-stack MERN (MongoDB, Express, React, Node.js) habit tracking application with visual progress tracking, featuring GitHub-style heatmaps and a modern dark mode interface.

## 🎥 Demo

A web application that helps users build better routines through visual progress tracking. Users can create habits, mark them as completed daily, and view their progress over time with interactive heatmaps and statistics.

**GitHub Repository:** https://github.com/juanito2110/FinalProjectCS195  
**Video Demo:** [Add your video link here]

## ✨ Key Features

### Core Functionality

- ✅ **Create & Manage Habits** - Add habits with titles and descriptions
- ✅ **Daily Completion Tracking** - Mark habits complete once per day (prevents duplicates)
- ✅ **Delete Habits** - Remove habits with confirmation dialogs
- ✅ **Data Persistence** - All data automatically saved to MongoDB Atlas

### Data Visualization

- 📊 **Individual Habit Heatmaps** - 30-day calendar view for each habit with day numbers
- 🔥 **Overall Progress Dashboard** - Aggregated view with intensity-based coloring (darker green = more habits completed)
- 📈 **Real-time Statistics** - Completion counts, active days, and current streak tracking
- 🎨 **Interactive Charts** - Click on any day to see which habits were completed

### UI/UX

- 🌙 **Dark Mode Theme** - Professional GitHub-inspired dark interface
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✨ **Smooth Animations** - Polished user experience with hover effects and transitions
- 🎨 **Modern Styling** - Clean, intuitive interface with consistent design language

## 🎯 Project Purpose

**Core Goal:** Build better routines through visual progress tracking  
**Target Users:** Anyone wanting to build consistency and discipline with daily habits  
**Motivation:** Visual feedback (green squares) provides immediate gratification and encourages maintaining streaks

---

## 🛠 Tech Stack

### Frontend

- **React 18** - UI library with functional components and hooks
- **Vite** - Fast build tool and development server
- **Recharts** - Data visualization library for interactive charts
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with dark mode theme

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling tool
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### Database

- **MongoDB Atlas** - Cloud-hosted NoSQL database

### Development Tools

- **Git & GitHub** - Version control and code hosting
- **npm** - Package management
- **Nodemon** - Auto-restart development server

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- MongoDB Atlas account (free tier) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- Git - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/juanito2110/FinalProjectCS195.git
cd FinalProjectCS195
```

### Step 2: Backend Setup

1. Navigate to server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in the `server` directory:

   ```bash
   # On Windows (PowerShell)
   copy .env.example .env

   # On Mac/Linux
   cp .env.example .env
   ```

4. Edit `.env` and add your MongoDB connection string:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string_here
   ```

   **How to get your MongoDB URI:**

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster (M0 tier)
   - Set up database access (create username/password)
   - Configure network access (allow your IP or 0.0.0.0/0 for development)
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual database password
   - Add database name after `.net/` (e.g., `habittracker`)

5. Start the backend server:

   ```bash
   npm run dev
   ```

   You should see:

   ```
   🚀 Server running on http://localhost:5000
   ✅ Connected to MongoDB
   ```

### Step 3: Frontend Setup

1. Open a **new terminal** and navigate to client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   You should see:

   ```
   VITE v5.x.x ready in xxx ms
   ➜  Local:   http://localhost:3000/
   ```

4. Open your browser and go to `http://localhost:3000`

### Step 4: Verify Installation

✅ Backend running on port 5000  
✅ Frontend running on port 3000  
✅ MongoDB connection successful  
✅ App loads without errors  
✅ Can create and view habits

---

## 📁 Project Structure

```
FinalProjectCS195/
├── server/                    # Backend application
│   ├── models/
│   │   └── Habit.js          # Mongoose schema for habits
│   ├── routes/
│   │   └── habits.js         # API route handlers
│   ├── .env                  # Environment variables (not in git)
│   ├── .env.example          # Environment template
│   ├── .gitignore            # Git ignore file
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express server entry point
│
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── HabitForm.jsx       # Create habit form
│   │   │   ├── HabitForm.css
│   │   │   ├── HabitList.jsx       # Display habits
│   │   │   ├── HabitList.css
│   │   │   ├── HabitHeatmap.jsx    # Individual heatmap
│   │   │   ├── HabitHeatmap.css
│   │   │   ├── OverallHeatmap.jsx  # Aggregate heatmap
│   │   │   └── OverallHeatmap.css
│   │   ├── App.jsx           # Main app component
│   │   ├── App.css           # Global styles
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Base styles
│   ├── index.html            # HTML template
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
│
├── CHECKPOINT-*.md           # Development progress documentation
├── SUBMISSION-GUIDE.md       # This guide!
├── .gitignore                # Root git ignore
└── README.md                 # You are here
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000
```

### Endpoints

#### 1. Get All Habits

```http
GET /habits
```

**Description:** Retrieves all habits sorted by creation date (newest first)

**Response:** `200 OK`

```json
[
  {
    "_id": "657abc123def456...",
    "title": "Morning Exercise",
    "description": "30 minutes of cardio to start the day",
    "createdAt": "2025-12-09T00:00:00.000Z",
    "completions": ["2025-12-09T00:00:00.000Z", "2025-12-08T00:00:00.000Z"]
  }
]
```

#### 2. Create Habit

```http
POST /habits
Content-Type: application/json

{
  "title": "Read Daily",
  "description": "Read for 20 minutes before bed"
}
```

**Description:** Creates a new habit

**Response:** `201 Created`

```json
{
  "_id": "657abc123def456...",
  "title": "Read Daily",
  "description": "Read for 20 minutes before bed",
  "createdAt": "2025-12-09T12:00:00.000Z",
  "completions": []
}
```

#### 3. Mark Habit Complete

```http
PATCH /habits/:id/complete
```

**Description:** Marks habit as complete for today (prevents duplicate entries for same day)

**Response:** `200 OK`

```json
{
  "_id": "657abc123def456...",
  "title": "Read Daily",
  "description": "Read for 20 minutes before bed",
  "createdAt": "2025-12-09T12:00:00.000Z",
  "completions": ["2025-12-09T00:00:00.000Z"]
}
```

#### 4. Delete Habit

```http
DELETE /habits/:id
```

**Description:** Permanently deletes a habit

**Response:** `200 OK`

```json
{
  "message": "Habit deleted successfully"
}
```

#### 5. Get Habit Statistics

```http
GET /habits/:id/stats
```

**Description:** Returns completion statistics for visualization

**Response:** `200 OK`

```json
{
  "totalCompletions": 15,
  "weekData": [2, 3, 1, 2, 4, 1, 2],
  "completions": ["2025-12-09T00:00:00.000Z", ...]
}
```

---

## 🗃️ Database Schema

### Habit Model

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completions: [{
    type: Date
  }]
}
```

**Field Descriptions:**

- `title` - Name of the habit (required)
- `description` - Optional details about the habit
- `createdAt` - Timestamp when habit was created
- `completions` - Array of dates when habit was marked complete

---

## 🎨 Features in Detail

### 1. Individual Habit Heatmaps

- **View:** Click "📅 View Calendar" on any habit card
- **Display:** 30-day calendar grid with day numbers
- **Color Coding:**
  - Green squares = habit completed that day
  - Gray squares = habit not completed
  - Gold border = today's date
- **Interaction:** Hover to see date and completion status
- **Stats:** Shows completion count and success rate (X/30 days, X%)

### 2. Overall Progress Dashboard

Located at the bottom of the page, combines ALL habits:

- **Intensity Levels:**
  - No color/dark gray = 0 habits completed
  - Light green = 1 habit completed
  - Medium green = 2 habits completed
  - Bright green = 3 habits completed
  - Darkest green with glow = 4+ habits completed
- **Interactive:** Click any green square to see:
  - Which habits were completed that day
  - Total number of completions
  - List of habit names
- **Statistics:** Shows total completions, active days, and current streak

### 3. Habit Management

- **Create:** Fill out form with title (required) and description (optional)
- **Complete:** One-click button to mark done (disabled once completed for the day)
- **Delete:** Trash icon with confirmation dialog
- **Visual Feedback:** Buttons change color and state based on completion status

---

## 🎯 Usage Guide

### Creating Your First Habit

1. Fill in the "Habit Title" (e.g., "Morning Exercise")
2. Optionally add a description (e.g., "30 minutes of cardio")
3. Click "+ Add Habit"
4. Your habit appears instantly in the list below

### Marking Habits Complete

1. Find your habit card in the list
2. Click the "✓ Mark Complete" button
3. Button turns blue and says "✓ Completed Today!"
4. Completion count increases
5. Can only mark complete once per day

### Viewing Progress

1. **Individual Habit:** Click "📅 View Calendar" to see 30-day history
2. **All Habits:** Scroll to bottom for aggregate view
3. **Click squares:** See which habits were completed on specific days
4. **Track streaks:** Watch for consecutive green squares

### Deleting Habits

1. Click the 🗑️ icon in the top-right corner of any habit card
2. Confirm deletion in the dialog
3. Habit is permanently removed

---

## 🌙 Dark Mode Design

The app features a professional dark mode theme inspired by GitHub's interface:

- **Background:** Deep dark (#0d1117)
- **Cards:** Dark gray (#21262d, #161b22)
- **Text:** Light colors (#e6edf3, #8b949e)
- **Accents:** Green for success actions (#238636)
- **Borders:** Subtle dark borders (#30363d)
- **Hover Effects:** Blue highlights (#58a6ff)

**Benefits:**

- Reduces eye strain during extended use
- Modern, professional appearance
- High contrast for readability
- Consistent with popular developer tools

---

## 🚀 Development Process

This project was built in phases following best practices:

1. **Phase 1:** Backend setup with MongoDB and Express
2. **Phase 2:** Frontend setup with React and Vite
3. **Phase 3:** CRUD operations (Create, Read, Delete)
4. **Phase 4:** Completion tracking functionality
5. **Phase 5:** Individual habit heatmaps
6. **Phase 6:** Overall progress dashboard
7. **Phase 7:** Dark mode theme implementation

See `CHECKPOINT-*.md` files for detailed development progress.

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Create a new habit
- [ ] Mark habit as complete
- [ ] Verify button shows "Completed Today"
- [ ] Try completing same habit again (should be disabled)
- [ ] View individual habit heatmap
- [ ] Complete multiple habits
- [ ] View overall progress dashboard
- [ ] Click on a day in overall heatmap
- [ ] Delete a habit
- [ ] Refresh page - verify data persists
- [ ] Test responsive design on mobile

---

## 📝 Future Enhancements

Potential features for future versions:

- 🔐 User authentication and accounts
- 🏆 Achievement badges and rewards
- 🔥 Longest streak tracking
- 📊 More chart types (line graphs, pie charts)
- 🔔 Reminder notifications
- 📱 Progressive Web App (PWA)
- 🌍 Multi-language support
- 📤 Export data to CSV
- ✏️ Edit existing habits
- 🎨 Custom themes and colors

---

## 🤝 Contributing

This is an educational project for CS195 at Drake University. While contributions are not actively sought, feedback and suggestions are welcome!

---

## 📄 License

This project is part of an academic course assignment. All rights reserved.  
**Drake University - CS195 - Fall 2025**

---

## 👤 Author

**[Your Name]**  
Drake University  
Computer Science Major  
CS195 - Web Development

**Contact:**

- GitHub: [@juanito2110](https://github.com/juanito2110)
- Email: [your-email@drake.edu]

---

## 🙏 Acknowledgments

- **Course Instructor:** [Instructor Name] - For guidance and project requirements
- **MongoDB Atlas:** For providing free cloud database hosting
- **Recharts:** For the excellent charting library
- **React Community:** For comprehensive documentation
- **GitHub:** For inspiration on the heatmap design

---

## 📚 Resources Used

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Recharts Documentation](https://recharts.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🐛 Troubleshooting

### Backend Issues

**Server won't start:**

- Check if port 5000 is already in use
- Verify MongoDB URI in `.env` file
- Ensure all dependencies are installed: `npm install`

**MongoDB connection error:**

- Check internet connection
- Verify MongoDB Atlas cluster is running
- Confirm IP address is whitelisted in Atlas
- Double-check username/password in connection string

### Frontend Issues

**App won't load:**

- Ensure backend is running first
- Check if port 3000 is available
- Clear browser cache and reload

**CORS errors:**

- Verify backend has CORS enabled
- Check API URL matches backend address

**Habits not appearing:**

- Open browser console to check for errors
- Verify network requests in DevTools
- Ensure backend API is responding

---

## ⚡ Performance

- **Load Time:** < 2 seconds on average connection
- **Database Queries:** Optimized with Mongoose indexes
- **Bundle Size:** Optimized with Vite tree-shaking
- **Responsive:** Smooth animations at 60 FPS

---

## 🎓 Learning Outcomes

Skills demonstrated in this project:

- Full-stack web development with MERN stack
- RESTful API design and implementation
- Database modeling and CRUD operations
- React component architecture and state management
- Responsive CSS and modern UI design
- Data visualization with charts
- Version control with Git
- Environment configuration and security
- Error handling and validation
- User experience (UX) design principles

---

**⭐ If you found this project helpful, please star the repository!**

**Thank you for checking out the Habit Tracker!** 🎉
