# Griffin PF Deployment AI

A modern web application for managing Virtual Environments (VE) and service deployments with AI assistance.

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic v2** - Data validation and serialization
- **httpx** - Async HTTP client for external APIs
- **python-dotenv** - Environment configuration

### Frontend  
- **React 18** - UI framework
- **Fluent UI v9** - Microsoft's design system
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing

## Project Structure

```
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── models.py       # Pydantic data models
│   │   ├── main.py         # FastAPI app configuration
│   │   ├── config.py       # Settings and configuration
│   │   └── services/       # Business logic services
│   ├── requirements.txt    # Python dependencies
│   └── run.py             # Application entry point
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   ├── styles/        # Global styles
│   │   └── main.tsx       # Application entry point
│   ├── package.json       # Node.js dependencies
│   └── vite.config.ts     # Vite configuration
│
└── prototype_*/            # HTML prototypes (reference)
```

## Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the backend:**
   ```bash
   python run.py
   ```
   
   Backend will be available at `http://localhost:8000`
   API docs at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at `http://localhost:3000`

## API Endpoints

### Core Endpoints
- `GET /api/dashboard` - Dashboard statistics
- `GET /api/ve` - List virtual environments (with search/filters)
- `GET /api/ve/{ve_name}` - Get VE details
- `GET /api/ve/{ve_name}/services` - Get VE services
- `POST /api/deploy` - Deploy services
- `GET /api/deployments` - Deployment history

### Authentication
- Currently uses mock authentication
- Production will integrate with Azure AD/Microsoft identity

## Features

### Virtual Environment Management
- Browse and search VEs by type (B Type, B2 Type)
- Filter by groups (SovBaseVEs, ModelBSovVEs, ModelB2SovVEs)
- Mark VEs as favorites
- View detailed service information

### Service Deployment
- Individual service deployment
- Bulk deployment across multiple services
- Pipeline selection (Main, Incremental, Mainline)
- Build version selection
- Real-time deployment status

### Pipeline Management
- Multiple pipeline support per service
- Default pipeline configuration
- Build artifact URLs and versions
- Pipeline-specific deployment options

### Monitoring & History
- Deployment history and logs
- Service health status
- Success rate tracking
- Real-time deployment progress

## Development

### Backend Development
```bash
cd backend
# Run with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
# Run with hot reload
npm run dev
```

### Building for Production
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend  
cd frontend
npm run build
```

## Design System

The frontend uses **Fluent UI v9**, Microsoft's latest design system, which provides:

- Consistent visual design aligned with Microsoft products
- Comprehensive React component library
- Built-in accessibility features
- Dark/light theme support
- Responsive design patterns

## Configuration

### Backend Configuration (`.env`)
```
AZURE_DEVOPS_PAT=your_pat_token
AZURE_DEVOPS_ORG=your_organization
AZURE_DEVOPS_PROJECT=your_project
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000
```

### Environment Variables
- `AZURE_DEVOPS_PAT` - Personal Access Token for Azure DevOps
- `CORS_ORIGINS` - Allowed frontend origins (comma-separated)
- `LOG_LEVEL` - Logging level (INFO, DEBUG, ERROR)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
