# 🎓 EduPredict - Student Success Prediction Platform

<div align="center">
  <img src="src/assets/hero-illustration.png" alt="EduPredict Hero" width="400"/>
  
  **AI-Powered Student Success Prediction Dashboard**
  
  [![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue?logo=tailwindcss)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev/)
</div>

---

## 📖 About

EduPredict is an innovative **AI-powered student success prediction platform** with a fun comic book-inspired UI. It helps educators and institutions identify at-risk students early and take proactive measures to improve academic outcomes.

### ✨ Key Features

- 🎯 **Predictive Analytics** - AI-powered grade predictions based on attendance, assignments, and more
- 📊 **Interactive Dashboards** - Role-based dashboards for Students, Faculty, and Administrators
- 🎮 **Gamification** - XP system, levels, and achievements to motivate students
- 📖 **Comic Strip Stories** - Engaging visual narratives that explain academic journeys
- 🌙 **Theme Modes** - Light, Dark, and unique "Inked" comic book mode
- 🔔 **Real-time Alerts** - Smart notifications for at-risk students
- 📄 **Report Generation** - Downloadable performance reports
- 🎨 **Comic Book Design** - Fun, engaging UI with sticker badges, speech bubbles, and animations

---

## 🛠️ Tech Stack

| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| **React 18**      | UI Framework            |
| **TypeScript**    | Type Safety             |
| **Vite**          | Build Tool & Dev Server |
| **Tailwind CSS**  | Styling                 |
| **Framer Motion** | Animations              |
| **shadcn/ui**     | UI Components           |
| **React Router**  | Navigation              |
| **Recharts**      | Data Visualization      |
| **Lucide Icons**  | Iconography             |
| **Zod**           | Form Validation         |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone https://github.com/VARA4u-tech/student-success-comic.git

# Navigate to the project directory
cd student-success-comic

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will open at `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   ├── ComicButton.tsx
│   ├── ComicCard.tsx
│   ├── ComicStrip.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components
│   ├── LandingPage.tsx
│   ├── StudentDashboard.tsx
│   ├── FacultyDashboard.tsx
│   ├── AdminDashboard.tsx
│   └── ...
├── App.tsx          # Main app with routing
├── index.css        # Global styles & design system
└── main.tsx         # Entry point
```

---

## 🎨 Design System

EduPredict uses a unique **comic book-inspired design system** with:

- **Bold borders** and comic-style shadows
- **Vibrant color palette** (Yellow, Red, Green, Blue accents)
- **Custom fonts** (Bangers for headings, Comic Neue for body text)
- **Sticker badges** and animated elements
- **Halftone patterns** and action backgrounds

---

## 📱 Pages & Features

### Public Pages

- **Landing Page** - Hero section, features, testimonials
- **About Page** - Mission and values
- **Help/FAQ Page** - Common questions and support
- **Contact Page** - Contact form and information

### Dashboard Pages

- **Student Dashboard** - Personal performance, predictions, recommendations
- **Faculty Dashboard** - Class overview, student tracking
- **Admin Dashboard** - Institution-wide analytics, alerts
- **Prediction Page** - Interactive "What If" scenario analysis
- **Reports Page** - Downloadable analytics and charts

---

## 🔧 Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**VARA4u-tech**

- GitHub: [@VARA4u-tech](https://github.com/VARA4u-tech)

---

<div align="center">
  <p>Made with ❤️ for Education</p>
  <p>🎓 <strong>Empowering Students, One Prediction at a Time!</strong> 🚀</p>
</div>
