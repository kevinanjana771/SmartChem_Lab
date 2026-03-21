# SmartChem Lab

A modern, interactive virtual chemistry laboratory for educational purposes.

## Overview

SmartChem Lab is a web-based platform that simulates a chemistry lab environment, allowing students to conduct experiments safely and interactively. The platform features 3D equipment visualization, practical simulations, quizzes, and safety guidelines.

## Features

- 🧪 **Interactive 3D Lab Environment** - Realistic equipment models and interactive workspace
- ⚗️ **Practical Experiments** - Guided chemical experiments and simulations
- 📊 **Real-time Feedback** - Immediate feedback on experimental procedures
- 🔒 **Safety Guidelines** - Comprehensive safety methods and protocols
- 📈 **Progress Tracking** - Monitor learning progress and quiz performance
- 👥 **User Authentication** - Secure login with Google OAuth integration
- 🎨 **Modern UI/UX** - Responsive design with intuitive navigation

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Three.js/Babylon.js** - 3D visualization
- **CSS3** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication

## Project Structure

```
SmartChem_Lab/
├── SmartChem_frontend/  # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   └── utils/       # Utility functions
│   └── package.json
├── SmartChem_backend/   # Node.js backend API
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── config/          # Configuration files
│   └── package.json
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kevinanjana771/SmartChem_Lab.git
   cd SmartChem_Lab
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd SmartChem_backend
   npm install
   # Create .env file with database credentials
   touch .env
   # Add your configuration to .env
   ```

4. **Frontend Setup**
   ```bash
   cd SmartChem_frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Backend**
```bash
cd SmartChem_backend
npm start
```

**Terminal 2 - Frontend**
```bash
cd SmartChem_frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5000` (or configured port)

## Documentation

- [Contributing Guide](.github/CONTRIBUTING.md) - How to contribute to the project
- [Code of Conduct](.github/CODE_OF_CONDUCT.md) - Community guidelines
- [Frontend README](./SmartChem_frontend/README.md) - Frontend-specific documentation

## Contributing

We welcome contributions from the community! Please read our [Contributing Guide](.github/CONTRIBUTING.md) to get started.

### Quick Start for Contributors
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please:
- Open an issue on GitHub
- Check existing documentation
- Contact the maintainers

## Acknowledgments

- All contributors who have helped with code, testing, and suggestions
- Educational institutions using SmartChem Lab
- Open source community

## Roadmap

- [ ] Mobile app support
- [ ] Additional experiment modules
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Community-contributed experiments

---

**Happy Experimenting! 🧬**

For questions or collaboration inquiries, reach out to the project maintainers.
