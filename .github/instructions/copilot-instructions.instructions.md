---
applyTo: '**'
---

# Project Context
projectName: GriffinPfDeployment_AI
description: >
  GriffinPfDeployment_AI is a full-stack Deployment Management System.
  It manages Virtual Environments (VE) and services, providing enterprise-grade deployment
  management with role-based access control, CI/CD actions, and configuration traceability.

# Frontend Stack
frontend:
  framework: React
  version: 19
  language: TypeScript
  uiLibrary: FluentUI v9
  buildTool: Vite
  routing: React Router v6
  stateManagement: Zustand
  serverStateManagement: React Query
  codingGuidelines:
    - Use functional components with React.FC
    - Strict TypeScript, no 'any' types
    - Use FluentUI makeStyles for styling
    - React Hook Form + Zod for validation

# Backend Stack
backend:
  framework: ASP.NET Core
  version: 8
  database: SQL Server (EF Core)
  caching: Redis
  authentication: JWT
  authorization: Role-based
  asyncTasks: Hangfire / BackgroundService
  azureIntegration:
    - Azure DevOps REST API / SDK
    - Reading INI files
    - Fetching Pipeline artifacts
    - OAuth2 / PAT authentication
  codingGuidelines:
    - Follow Clean Architecture
    - Use Repository Pattern with generic base classes
    - Async/await for all I/O operations
    - Dependency injection throughout

# VE / Service Concepts
veConcepts:
  VE:
    description: Logical abstraction grouping services and configurations
    types:
      B_type:
        forServices: Model B
        examples: SovBase, ModelBSov
      B2_type:
        forServices: Model B2
        examples: OwaMailB2-SOV, TodoB2-SOV
  serviceDeployment:
    ModelB:
      ve: B type VE
      environment: APE
    ModelB2:
      ve: B type VE or B2 type VE
      environment: APE (if B type VE) or CPE (if B2 type VE)
  deploymentScope:
    - VE level: deploy all onboarded services
    - Service level: deploy individual services
  pipelines:
    - multiple pipelines per service
    - each pipeline provides latest Drop URL

# Permission Model
permissions:
  roles:
    Admin:
      description: Full access; manage VE/services, assign users, trigger deployments, modify configurations
    Operator:
      description: Can trigger deployments only for VE/services defined in AllowedToSignClaims; can view build info
    Viewer:
      description: Read-only access to VE, services, build history, Drop URLs
  levels:
    Read: Access VE/service info, build history, Drop URLs
    Deploy:
      description: Only users/groups in AllowedToSignClaims can trigger deployments
      scopes: VE level, Service level
      exampleIni:
        path: SigningConfig.ini
        content: |
          [AllowedToSignClaims]
          Groups=AME\M365-SovFleet
          Users=AME\xushanshan,AME\chenjzha,AME\peihuazhang
    Admin: Modify configurations, assign users, manage VE/Service settings

# Key Features
features:
  Visibility:
    - View all VEs and services
    - Check Build info and Drop URLs
    - Monitor deployment status and history
  Control:
    - Trigger deployments at VE or Service level
    - Respect AllowedToSignClaims
    - Support single/batch deployment
  Traceability:
    - Track deployment actions (user, timestamp, affected VE/services)
    - Maintain audit logs for compliance
  ConfigurationManagement:
    - Read INI files from Azure DevOps
    - Cache frequently accessed configs in Redis
    - Support VE-level and Service-level settings
  IntegrationAutomation:
    - Azure DevOps REST API / SDK for pipeline artifacts and build metadata
    - Automate deployment workflows with permission validation
    - Support async execution (Hangfire / BackgroundService)

# Repository Structure
repository:
  frontend:
    path: /src/frontend
    folders:
      components: Reusable UI components (auth, layout, forms, cards)
      pages: Page components with routing
      hooks: Custom React hooks
      services: API service layer
      store: Zustand state management
      types: TypeScript definitions
  backend:
    path: /src/backend
    folders:
      Controllers: API endpoints (VE/Service management, deployments, config)
      Services:
        VEManagementService.cs: VE/Service CRUD, state tracking
        DeploymentService.cs: Trigger deployments, async tasks
        AzureDevOpsService.cs: Read INI files, fetch artifacts
      Repositories:
        VERepository.cs
        ServiceRepository.cs
        DeploymentHistoryRepository.cs
      Models: Domain & DTO classes (VE, Service, BuildInfo, DeploymentRecord)
      Data: EF Core DbContext (ApplicationDbContext.cs)
      BackgroundTasks: Async task handlers (DeploymentJob.cs, ArtifactDownloadJob.cs)
      Cache: Redis cache helpers (RedisCacheService.cs)
      Authentication: JWT, role-based auth
      Configurations: App settings, constants, INI parsing helpers
      Utilities: Common helpers, logging, HTTP clients
      Migrations: EF Core migrations

# Development Commands
devCommands:
  frontend:
    install: npm install --legacy-peer-deps
    dev: npm run dev
    build: npm run build
  backend:
    build: dotnet build
    run: dotnet run --project <project_name>

# Environment Setup
environment:
  frontend: Node.js 18+
  backend: .NET 8 SDK
  database: SQL Server LocalDB
  authentication: Microsoft OAuth
