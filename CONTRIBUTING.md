# Contributing to Portfolio-Improved

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub
We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [GitHub Flow](https://guides.github.com/introduction/flow/index.html)
All code changes happen through pull requests. Pull requests are the best way to propose changes to the codebase.

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project.

## Reporting Bugs 🐛

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Share the exact commands you used
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests 🚀

We welcome feature requests! Here's how to submit one:

1. Check existing issues to see if the feature has been suggested before
2. Provide a clear and detailed explanation of the feature
3. Explain why this feature would be valuable to most users
4. Optional: Provide mockups or prototypes

## Development Process 🛠️

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- A GitHub account

### Setup
1. Fork the repository
2. Clone your forked repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/Portfolio-Improved.git
   cd Portfolio-Improved
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Create a Firebase project and update configuration
   - Go to Firebase Console
   - Create a new project
   - Set up Firestore Database
   - Copy configuration to `src/firebase/config.ts`

5. Start development server
   ```bash
   npm run dev
   ```

### Making Changes
1. Create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test your changes thoroughly
4. Commit with a descriptive message
   ```bash
   git commit -m "Add detailed description of changes"
   ```
5. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request

## Pull Request Process 📝

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes if necessary.
3. Increase version numbers in package.json to the new version that this Pull Request would represent.
4. The PR will be reviewed by the maintainers, who may request changes or provide feedback.

## Code of Conduct 🤝

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Questions?

If you have any questions, feel free to open an issue or reach out to the maintainer at debangaraz2000@gmail.com.

Happy Coding! 💻✨