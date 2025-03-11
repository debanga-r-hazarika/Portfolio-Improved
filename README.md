# Modern Tech Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design, dark mode support, smooth animations, and an admin panel for dynamic content management.

## 🚀 Features

### Core Features
- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Dark Mode**: System-aware dark mode support with manual toggle using React Context
- **Project Showcase**: Interactive grid layout for featuring projects with dynamic content management
- **Tech Stack Display**: Visual representation of technical skills and expertise
- **Contact Form**: Interactive contact section with form validation and EmailJS integration
- **Smooth Animations**: Subtle scroll-based animations and transitions using Intersection Observer
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility

### Admin Panel
- **Secure Authentication**: Protected admin routes with simple password-based login
- **Project Management**: CRUD operations for managing portfolio projects
- **Content Editor**: Rich text editor for project descriptions
- **Media Upload**: Image upload functionality for project thumbnails

## 🛠️ Technologies

### Frontend
- **React 18**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Vite**: Next-generation frontend tooling for faster development
- **Lucide Icons**: Beautiful, consistent icon set
- **React Context**: State management for theme and authentication

### Integrations
- **Firebase**: Backend services for admin panel and data storage
- **Intersection Observer**: Native API for scroll-based animations

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Layout components
│   ├── sections/      # Main page sections
│   └── ui/            # Common UI elements
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── assets/           # Static assets
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/debanga-r-hazarika/Portfolio-Improved.git
   cd Portfolio-Improved
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Firestore Database
   - Replace the configuration in `src/firebase/config.ts` with your Firebase project credentials

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

- **Theme**: Modify `tailwind.config.js` to customize colors, fonts, and other design tokens
- **Content**: Update content in the components under `src/components/sections`
- **Styling**: Adjust styles using Tailwind CSS classes or modify component styles

## 🔐 Admin Access

- **Login Password**: Hardcoded in `src/contexts/AuthContext.tsx`
- **Default Password**: `Debanga@91`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

Debanga Raz - [debangaraz2000@gmail.com](mailto:debangaraz2000@gmail.com)

---

Built with ❤️ by Debanga Raz