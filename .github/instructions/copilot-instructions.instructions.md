
projectName: Griffin SovOps Manager  
purpose: Deployment Management System for Virtual Environments (VEs) & Services with RBAC, CI/CD integration, traceability.

## Core Domain Concepts
- VE (Virtual Environment): Logical grouping of Services + shared config.
  - Types:
    - B type VE → hosts Model B and Model B2 services (deploys to APE)
    - B2 type VE → hosts Model B2 services only (deploys to CPE)
- Environments:
  - APE (Physical)
  - CPE (Container)
- Service Types:
  - Model B → must be in B type VE → deploys to APE
  - Model B2 → can be in B type VE (APE) OR B2 type VE (CPE)
- Deployment Scope:
  - VE-level (all onboarded services)
  - Service-level (subset / single)

## Mock Data (ReleaseMapping.json)
Use as temporary source of truth until backend endpoints exist.
- ExpectedVEs.* => available VE names (grouping only; UI not forced to show groups)
- ExpectedServices => VE → [Services]
- Services => per-Service build metadata (pipelines, build roots, patterns)
Frontend consumption:
1. List VEs (flatten groups)
2. For selected VE, list services
3. For a service, show build info, Drop URL pattern, pipelines

## Permissions
Roles:
- Admin: Full (read, deploy, configure, assign)
- Operator: Read + deploy (if in AllowedToSignClaims)
- Viewer: Read-only
Deploy Authorization:
- Parse INI [AllowedToSignClaims] (Groups, Users)
- Only listed identities can trigger deployments (VE or Service level)
Auditing:
- Log: user, timestamp, scope (VE / Services), build artifact references

## Required Backend Capabilities
- ASP.NET Core 8 Web API
- EF Core (VE, Service, BuildInfo, DeploymentRecord)
- Azure DevOps REST/SDK:
  - Read INI
  - Fetch pipeline artifacts
- Redis caching (frequently accessed configs + VE/Service maps)
- Async processing (Hangfire / BackgroundService) for deployments & artifact fetch
- JWT + role-based authorization
- Repository + Clean Architecture patterns
- All I/O async

## Required Frontend Patterns
- React 19 + TypeScript (strict; no any)
- FluentUI v9 styling (makeStyles)
- Routing: React Router v6
- State: Zustand (app), React Query (server state)
- Forms: React Hook Form + Zod
- Show:
  - VE list
  - Services per VE
  - Build info (Drop URL resolved from pattern)
  - Deployment history (when API available)
- Trigger deployment only if user has deploy permission

## Data Flow (Interim)
Frontend (ReleaseMapping.json) → later replaced by API:
1. Load VE + Service map
2. Fetch service build details (Services section)
3. Compose Drop URL by substituting <BuildVersion> when needed

## Traceability
Store deployment events with:
- User principal
- Scope (VE / service list)
- Pipelines / build IDs
- Artifact path(s)
- Status + timestamps

## Coding Guidelines (Condensed)
Backend:
- Avoid synchronous blocking
- Keep controllers thin; delegate to Services
- Repositories: generic base + specific
- DTOs for external responses (no EF entities leak)
Frontend:
- Strong typing for domain (VE, Service, BuildInfo, DeploymentRecord)
- Use query keys: ['ve', veName], ['service', veName, serviceName]
- Derive computed flags (canDeploy) from permission state + AllowedToSignClaims

## Non-Functional
- Observability hooks (structured logging)
- Cache invalidation strategy: TTL for static config; bust on manual refresh
- Security: validate user claims each deploy request

## Do / Don't (Assistant Guidance)
Do:
- Enforce async patterns
- Centralize permission checks
- Keep environment distinctions (APE vs CPE)
- Respect grouping semantics but present flattened VE list to UI
Don't:
- Hardcode user identities
- Duplicate permission logic in multiple layers
- Mix deployment orchestration into controllers

## Terminology Glossary
- VE: Virtual Environment grouping services/config
- APE: Physical deployment target
- CPE: Container deployment target
- Drop URL: Artifact location for deployment
- AllowedToSignClaims: Users/groups authorized to deploy
- RingPromotion: Build type with versioned promotion path

## Future Replacement
ReleaseMapping.json → replaced by:
- GET /api/ve
- GET /api/ve/{ve}/services
- GET /api/services/{service}/build
- POST /api/deploy (VE-level or service list)
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
