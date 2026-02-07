# Brainion 🧠

**AI-Powered Curriculum Generator** - Create personalized learning paths in seconds

Brainion is an intelligent curriculum generator that uses AI to create structured, week-by-week learning plans tailored to your goals. Simply specify what you want to learn, how long you have, and your skill level, and let AI design your perfect learning journey.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📅 Development Log - February 6, 2026

### ✅ Completed Today - Day 3 Features

**Progress Tracking System:**
- ✅ Added checkboxes to day cards with localStorage persistence
- ✅ Implemented "Mark Week Complete" button
- ✅ Added overall progress bar with percentage calculations
- ✅ Week-level progress tracking with visual indicators
- ✅ Progress state persists across sessions

**Notes & Annotations:**
- ✅ Added "Add Note" button to each day card
- ✅ Created modal dialog for notes with rich text area
- ✅ Notes saved to localStorage per curriculum and day
- ✅ Visual indicator (pulsing dot) on cards with notes
- ✅ "View Note" / "Add Note" button states

**Advanced Input Options:**
- ✅ Time per day slider (1-4 hours)
- ✅ Focus type dropdown (Theory, Project, Balanced, Practice)
- ✅ Prerequisites text field
- ✅ Specific learning goals textarea
- ✅ All parameters integrated into AI prompt generation

**Curriculum Customization:**
- ✅ Regenerate day button with AI-powered regeneration
- ✅ Add custom day functionality with dialog
- ✅ Inline editing for day titles
- ✅ Inline editing for objectives
- ✅ All changes persist to localStorage

**Visual Enhancements:**
- ✅ Week color coding with gradient bars
- ✅ Difficulty badges (Easy/Medium/Hard) based on time
- ✅ Estimated time badges on each day card
- ✅ Enhanced hover effects with lift animation
- ✅ Smooth transitions throughout UI
- ✅ Staggered fade-in animations for weeks
- ✅ Pulsing indicators for in-progress weeks
- ✅ Color-coded progress bars (green when complete)
- ✅ Completion celebrations (emoji when 100% done)

### 🔄 Previously Completed (Days 1-2)

**Foundation & Error Handling:**
- Error boundary and toast notifications
- Input validation and loading states
- API error handling with retry mechanism

**Export & Save Functionality:**
- PDF export capability
- Markdown export (download & copy)
- LocalStorage persistence
- Curriculum history viewer
- Share via URL feature

### 🎯 Next Up - Day 4

**Critical Polish:**
- Mobile responsiveness optimization
- Dark mode implementation
- Accessibility improvements (ARIA labels, keyboard navigation)
- Cross-browser testing
- Performance optimization
- Production deployment
- Documentation updates

---

## ✨ Features

- 🎯 **AI-Generated Curricula** - Leverages Tambo AI to create comprehensive learning plans
- 📅 **Structured Learning** - Week-by-week breakdown with daily objectives
- 🎚️ **Highly Customizable** - Advanced options for time, focus type, prerequisites, and goals
- ✏️ **Inline Editing** - Edit day titles and objectives directly
- 🔄 **Regenerate Days** - AI-powered regeneration for individual days
- ➕ **Custom Days** - Add your own custom learning days
- 📝 **Notes System** - Add personal notes to any day
- ✅ **Progress Tracking** - Mark days and weeks complete with visual progress bars
- 💾 **Export Options** - Download as PDF or Markdown, copy to clipboard
- 🔗 **Share Curricula** - Generate shareable links
- 🎨 **Beautiful UI** - Smooth animations, color-coded weeks, difficulty badges
- 📊 **Smart Analytics** - Track completion percentage and time estimates
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile (in progress)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (or pnpm)
- Tambo AI API key ([Get one here](https://tambo.ai))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/brainion.git
   cd brainion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_TAMBO_API_KEY=your_tambo_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🎓 Usage

1. **Enter your learning goal**
   - Topic: What you want to learn (e.g., "Web Development", "Machine Learning")
   - Duration: How many weeks you have (1-12 weeks)
   - Level: Your current skill level (Beginner, Intermediate, Advanced)

2. **Generate curriculum**
   - Click outside the input or wait a moment
   - AI will generate a structured curriculum with daily objectives

3. **Review and use**
   - Browse through weeks and days
   - Each day includes specific learning objectives
   - Follow the plan at your own pace

## 📁 Project Structure

```
brainion/
├── src/
│   ├── components/
│   │   ├── CurriculumGenerator.tsx    # Main curriculum component
│   │   └── CurriculumGenerator.css    # Component styles
│   ├── types/
│   │   └── curriculum.ts               # TypeScript interfaces
│   ├── App.tsx                         # Main app component
│   ├── App.css                         # App-level styles
│   └── main.tsx                        # Entry point
├── public/                             # Static assets
├── .env.local                          # Environment variables (not committed)
├── package.json                        # Dependencies
├── vite.config.ts                      # Vite configuration
└── tsconfig.json                       # TypeScript configuration
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.2
- **AI Integration**: Tambo AI (@tambo-ai/react)
- **Styling**: Custom CSS
- **Linting**: ESLint with TypeScript support

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔮 Roadmap

See [PLAN.md](./PLAN.md) for the detailed 4-day development roadmap.

### Coming Soon

- ✅ Enhanced error handling and validation
- ✅ Export to PDF and Markdown
- ✅ Save and load curriculum history
- ✅ Progress tracking with checkboxes
- ✅ Notes and annotations
- ✅ Dark mode
- ✅ Advanced customization options
- ⏳ Resource recommendations
- ⏳ Quiz generation
- ⏳ Calendar integration
- ⏳ Backend and user authentication

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Tambo AI](https://tambo.ai) for the AI API
- [React](https://react.dev) team for the amazing framework
- [Vite](https://vitejs.dev) for the blazing-fast build tool

## 📧 Contact

Project Link: [https://github.com/yourusername/brainion](https://github.com/yourusername/brainion)

---

**Built with ❤️ for learners everywhere**
