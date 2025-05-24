# 🚀 CodeBin

<div align="center">

![CodeBin Logo](public/logo.png)

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Your AI-Powered Code Snippet Management Solution**

[Demo](https://codebin.vercel.app) · [Documentation](docs/README.md) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🌟 Overview

CodeBin revolutionizes code snippet management by combining traditional organization tools with cutting-edge AI capabilities. Built for developers who demand efficiency and intelligence in their workflow, CodeBin offers seamless snippet management, AI-powered code generation, and smart organization features.

### Why CodeBin?

- 🤖 **AI-Powered**: Add your own code or generate and modify code using AI
- 🔄 **Language Transformation**: Convert between programming languages instantly
- 📝 **Smart Organization**: Intelligent tagging and categorization
- ⚡ **Real-time Collaboration**: Instant updates and synchronization
- 🎨 **Beautiful UI**: Modern, responsive design with dark mode support

## 💫 Features

### Core Features

| Feature             | Description                                               |
| ------------------- | --------------------------------------------------------- |
| Code Generation     | Generate code snippets from natural language descriptions |
| Smart Modifications | Enhance existing code with AI-powered suggestions         |
| Language Conversion | Transform code between different programming languages    |
| Real-time Editing   | Write and edit with automatic saving                      |
| Smart Tags          | Organize snippets with intelligent categorization         |

### Additional Features

- **Authentication & Security**

  - Secure user authentication with Clerk
  - Protected API routes
  - Data encryption

- **User Experience**

  - Dark/Light mode
  - Responsive design
  - Toast notifications
  - Keyboard shortcuts

- **Code Management**
  - Syntax highlighting
  - Code formatting
  - Version history
  - Export/Import

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Material-UI
- **State Management**: React Context API
- **Code Editor**: Ace Editor

### Backend

- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **API**: RESTful endpoints
- **AI Integration**: Google Generative AI

### DevOps

- **Version Control**: Git
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database
- Clerk account
- AI service API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/Piyushverma-tech/codebin.git
cd codebin
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
MONGODB_URI=your_mongodb_uri
AI_API_KEY=your_ai_key
```

4. Run development server

```bash
npm run dev
```

## 📁 Project Structure

```
codebin/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── components/
│   │   ├── models/
│   │   └── utils/
│   ├── lib/
│   └── types/
├── public/
├── docs/
└── tests/
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/signin`

### Snippet Endpoints

- `GET /api/snippets`
- `POST /api/snippets`
- `PUT /api/snippets/:id`
- `DELETE /api/snippets/:id`

### AI Endpoints

- `POST /api/generate-code`
- `POST /api/modify-code`
- `POST /api/convert-language`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Project Link: [https://github.com/yourusername/codebin](https://github.com/yourusername/codebin)

---

<div align="center">
Made with ❤️ by Piyush
</div>
