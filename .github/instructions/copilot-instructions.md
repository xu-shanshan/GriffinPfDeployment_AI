# Griffin SovOps Manager System - Copilot Instructions




### Mock Data 

Mock data simulates actual application data and lives in:  
`.github/instructions/ReleaseMapping.json`

#### Explanation

1. **ExpectedVEs**
 - Groups of VEs, defining **deployment scope** & organizational structure  
 - Frontend displays: available VEs + their Services  


2. **ExpectedServices**
  This represents the mapping from **VE → [Services]**.
  - **Key**: VE name
  - **Value**: Service list under that VE
  The frontend must use this data to dynamically show the VE details.

3. **Services**
  Contains detailed information for each Service (Build info, Pipeline, Drop URL, etc.).
  The frontend needs to display and operate on this information (e.g., trigger deployments, select builds, etc.).


## Repository Structure


### Backend (`/src/backend`)
- `Controllers/`: API controllers for VE/Service management, deployment triggers, and configuration endpoints
- `Services/`: Business logic layer
  - `VEManagementService.cs` → VE and Service CRUD, state tracking
  - `DeploymentService.cs` → Trigger deployments, handle async tasks
  - `AzureDevOpsService.cs` → Read INI files, fetch Pipeline artifacts via REST API / SDK
- `Repositories/`: Data access layer (Repository pattern)
  - `VERepository.cs`
  - `ServiceRepository.cs`
  - `DeploymentHistoryRepository.cs`
- `Models/`: Domain and DTO classes
  - `VE.cs`
  - `Service.cs`
  - `BuildInfo.cs`
  - `DeploymentRecord.cs`
- `Data/`: EF Core DbContext and database configuration
  - `ApplicationDbContext.cs`
- `BackgroundTasks/`: Asynchronous task handlers
  - `DeploymentJob.cs` → Hangfire / BackgroundService tasks
  - `ArtifactDownloadJob.cs` → Download Pipeline artifacts asynchronously
- `Cache/`: Redis cache helpers and configuration
  - `RedisCacheService.cs`
- `Authentication/`: JWT, role-based authorization
- `Configurations/`: App settings, constants, INI parsing helpers
- `Utilities/`: Common helpers, logging, HTTP clients for API calls
- `Migrations/`: EF Core migrations

### Permission Management
- **User Groups**: Organize users into teams for easier management
- **User Roles**:
  - **Admin**: Full access; can trigger deployments, manage VE/services, modify configurations, assign users, and manage Environment-Level (APE/CPE/VE) and Service-Level settings
  - **Operator**: Can trigger deployments, but only for VE/services assigned in the `AllowedToSignClaims` section; can also view build information
  - **Viewer**: Read-only access to VE, services, build history, and Drop URLs
- **Permission Levels**:
  - **Read**: Access VE/service info, build history, Drop URLs. All users not listed in `AllowedToSignClaims` have read-only access
  - **Deploy (Sign)**:
    - Only users or groups defined in the `AllowedToSignClaims` section can trigger deployments
    - Deployment can be done at:
      - **VE level**: deploy all services under a VE
      - **Service level**: deploy individual services within a VE
    - Example from `SigningConfig.ini`:
      ```ini
      [AllowedToSignClaims]
      Groups=AME\M365-SovFleet
      Users=AME\xushanshan,AME\chenjzha,AME\peihuazhang
      ```
    - Users in this list or group have **“sign/deploy” permission** for the specified VE/services
  - **Admin**: Modify VE/service configurations, assign users, manage Environment-Level (APE/CPE/VE) settings, Service-Level settings, and user roles



