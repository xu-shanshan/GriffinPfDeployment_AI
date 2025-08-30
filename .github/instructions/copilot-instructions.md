# Griffin PilotFish Management System - Copilot Instructions

GriffinPfDeployment_AI is a full-stack **Deployment Management System** with React frontend and ASP.NET Core 8 backend. It provides enterprise-grade deployment management with **role-based access control**, **Virtual Environments/service management**, and **CI/CD actions**.

## Background 
- **Service Deployment Types**:
  - **Model B**: Services deployed on physical machines (PE). The physical environment is called **APE** (AutoPilot Physical Environment).  
  - **Model B2**: Services deployed on a container within a physical machine. The container environment is called **ACE** (AutoPilot Container Environment).  

- **Deployment Rules**:  
  - **Model B Service** → must be deployed by a B type VE  
  - **Model B2 Service** → can be deployed by a B type VE or a B2 type VE  

### VE / Environment Hierarchy & Service Onboarding

| Service Type   | VE Type       | Inherited By Environment | Notes                               |
|----------------|---------------|--------------------------|-------------------------------------|
| Model B        | B type VE     | APE (Physical Env)       | Can only be onboarded to B type VE  |
| Model B2       | B type VE     | APE (Physical Env)       | Can be onboarded to B type VE       |
| Model B2       | B2 type VE    | CPE (Container Env)      | Can be onboarded to B2 type VE      |

#### Explanation

1. **Virtual Environment (VE)**
   - Logical abstraction that groups services and configurations  
   - Enables reuse of common configurations across multiple physical/container environments  
   - VE integrates by APE/CPE.
   - There are two VE categories:  
     - **B type VE** → for Model B services  
     - **B2 type VE** → for Model B2 services 
   - **VE Types Examples**:  
     - **B type VE**: SovBase, ModelBSov  
     - **B2 type VE**: OwaMailB2-SOV, TodoB2-SOV  

2. **Service Onboarding**
   - **Model B service** → onboard to **B type VE** only; → inherited by **APE**    
   - **Model B2 service** → can onboard to **B type VE** or **B2 type VE**  
     - If onboarded to **B type VE** → inherited by **APE**  
     - If onboarded to **B2 type VE** → inherited by **CPE**  
3. **Deployment Scope**
   - **VE-level**: deploy all onboarded services under a VE  
   - **Service-level**: deploy individual service(s) within a VE
4. **Service Management**
   - **Pipeline / Drop URL**:  
     - Each service can have multiple pipelines  
     - Each pipeline can produce a latest **Drop URL** for deployment


### Mock Data 

Mock data is used to simulate the actual data that will be used in the application. It helps in testing and development without relying on real data.
mockData refer to file `.github/instructions/ReleaseMapping.json`.

mockData = {
  "CloudBuildRoot": "https://cloudbuild.microsoft.com",
  "ExpectedVEs": {
    "SovBaseVEs": ["SovBase"],
    "ModelBSovVEs": ["ModelBSov"],
    "ModelB2SovVEs": [
      "TBA1-SOV","OwaMailB2-SOV","EBA1-SOV","M365Coral1B2-SOV","FastV2B2-SOV",
      "MessagesIngestionServiceB2-SOV","ConnectorsB2-SOV","VSOB2-SOV","ProtocolsB2-SOV",
      "ContentEnrichmentServiceB2-SOV","GraphAnalyticsB2-SOV","TodoB2-SOV",
      "MicroSvcB2-SOV","GraphConnectorsB2-SOV","FlowControlB2-SOV"
    ]
  },

  "ExpectedServices": {
    "SovBase": [
      "ActionsAssistants","ActionsB2NetCore","AHCoreB2","ApplicationHost","ClearData",
      "ComplianceAuthServerV2","CompliancePolicyNetCore","ContentEnhancementService",
      "ControllerService","DirectoryReplication","DNPublisher","DocParserServiceNetCore",
      "ESS","FlowControl","GraphAnalytics","GraphConnectors","GriffinDataBus",
      "GriffinLocalWatchdog","GriffinLocalWatchdogNetCore","GriffinPrivilegedSetupService",
      "GriffinRoutingUpdateService","GriffinUtilityNetCore","LinkExtraction",
      "LocalShardSearch","LogScrubServer","ManagementNetCore","MessagesIngestionService",
      "NetworkWatchdog","NotesFabric","OwaMailB2","OwaWatchDog","OWS","PDAS",
      "PingB2NetCore","Pop3B2","portablerankerserviceb2","PrimeCore","ProcessorsB2NetCore",
      "RecB2","SdsProcessors","SearchInsightsNetCore","SearchNetCore","SignalB2Service",
      "SignalPatchService","SignalPropagation","SigsMLService","SpellerB2SubstrateSDK",
      "SpoolsScaleOutCore","SpoonsCore","SpoonsProcessorsCore","SsmsNetCore",
      "StoreExtension","SubsHwWatchdog","SubstrateAppWatchdogNetCore",
      "SubstrateArchiveService","SubstrateSearchAssistants","TenantDataSink",
      "TenantSearchProcessorsCore","TokenIssuerSAPs","UserContext","UserKnowledgeBase",
      "WebhookB2NetCore"
    ],
    "ModelBSov": [
      "ActionsAssistants","ActionsB2NetCore","AHCoreB2","ApplicationHost","ClearData",
      "ComplianceAuthServerV2","CompliancePolicyNetCore","ContentEnhancementService",
      "ControllerService","DirectoryReplication","DNPublisher","DocParserServiceNetCore",
      "ESS","FlowControl","GraphAnalytics","GraphConnectors","GriffinDataBus",
      "GriffinLocalWatchdog","GriffinLocalWatchdogNetCore","GriffinPrivilegedSetupService",
      "GriffinRoutingUpdateService","GriffinUtilityNetCore","LinkExtraction",
      "LocalShardSearch","LogScrubServer","ManagementNetCore","MessagesIngestionService",
      "NetworkWatchdog","OwaMailB2","OwaWatchDog","OWS","PDAS","PingB2NetCore",
      "Pop3B2","portablerankerserviceb2","PrimeCore","ProcessorsB2NetCore","RecB2",
      "SdsProcessors","SearchInsightsNetCore","SearchNetCore","SignalB2Service",
      "SignalPatchService","SignalPropagation","SigsMLService","SpellerB2SubstrateSDK",
      "SpoolsScaleOutCore","SpoonsCore","SpoonsProcessorsCore","SsmsNetCore",
      "StoreExtension","SubstrateAppWatchdogNetCore","SubstrateArchiveService",
      "SubstrateSearchAssistants","TenantDataSink","TenantSearchProcessorsCore",
      "TokenIssuerSAPs","UserContext","UserKnowledgeBase","WebhookB2NetCore"
    ],
    "TBA1-SOV": ["PingB2NetCore","TenantSearchProcessorsCore"],
    "OwaMailB2-SOV": ["OwaMailB2"],
    "EBA1-SOV": ["DNPublisher","DirectoryReplication","SignalPropagation","ClearData","Ssmsnetcore","SearchInsightsNetCore"],
    "M365Coral1B2-SOV": ["SdsProcessors"],
    "FastV2B2-SOV": ["SpoonsProcessorsCore","LinkExtraction","PrimeCore"],
    "MessagesIngestionServiceB2-SOV": ["MessagesIngestionService"],
    "ConnectorsB2-SOV": ["ProcessorsB2NetCore","WebhookB2NetCore","ActionsB2NetCore","ActionsAssistants"],
    "VSOB2-SOV": ["ESS","PDAS","UserKnowledgeBase","SignalB2Service","SigsMLService"],
    "ProtocolsB2-SOV": ["Pop3B2"],
    "ContentEnrichmentServiceB2-SOV": ["ContentEnhancementService"],
    "GraphAnalyticsB2-SOV": ["GraphAnalytics"],
    "TodoB2-SOV": ["SignalPatchService"],
    "MicroSvcB2-SOV": ["SubstrateArchiveService","DocParserServiceNetCore"],
    "GraphConnectorsB2-SOV": ["GraphConnectors"],
    "FlowControlB2-SOV": ["FlowControl"]
  },
  "Apps": {
    "AHCoreB2": { "ServiceName": "AHB2" },
    "ApplicationHost": { "ServiceName": "AH" },
    "ReplicationDeliveryProcessorService": { "ServiceName": "RDPService" }
  },

  "Services": {
    "OwaMailB2": {
      "BuildType": "RingPromotion",
      "IncrementalBuildPipelineId": 33874,
      "PipelineId": 1418,
      "RingPromotionRootPath": "autopilot",
      "BuildRoot": "https://outlookgriffinservice.blob.core.windows.net/owamailb2/prod_image.txt",
      "PpeVeName": "OwaMailB2-PPE",
      "BuildPathPattern": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/<BuildVersion>?root=autopilot"
    },
    "OWS": {
      "BuildType": "RingPromotion",
      "IncrementalBuildPipelineId": 33876,
      "RingPromotionRootPath": "autopilot",
      "BuildRoot": "https://outlookgriffinservice.blob.core.windows.net/ows/prod_image.txt",
      "PpeVename": "OWA-PPE",
      "BuildPathPattern": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/ows_ms/<BuildVersion>?root=autopilot"
    },
    "GriffinRoutingUpdateService": {
      "BuildType": "RingPromotion",
      "IncrementalBuildPipelineId": 31234,
      "MainlineBuildPipelineId": 31235,
      "PipelineId": 31238,
      "RingPromotionRootPath": "target/distrib/Autopilot/Microsoft.Griffin.BricksV2.RoutingUpdateService",
      "BuildRoot": "target/distrib/Autopilot/Microsoft.Griffin.BricksV2.RoutingUpdateService",
      "PpeVeName": "AutoPPE",
      "BuildPathPattern": "VSO://https://ossinfra.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/secondary/OSS_RoutingPlane_Retail_Drops_Signing_Git/Sec.1.0.0.<BuildVersion>?root=/target/distrib/Autopilot/Microsoft.Griffin.BricksV2.RoutingUpdateService"
    }
  }
}

#### Explanation

1. **ExpectedVEs**
  Essentially a grouping of VEs, mainly used to define the **deployment scope** and for organizational management.
  For the frontend, the core requirement is to display the list of VEs the user can operate on, along with their corresponding Services, rather than being forced to show them strictly by group.
  In other words, the frontend only needs to know which VEs are available for selection and what Services exist under each VE.

2. **ExpectedServices**
  This represents the mapping from **VE → Services**.
  - **Key**: VE name
  - **Value**: Services under that VE
  The frontend must use this data to dynamically show the VE details.

3. **Services**
  Contains detailed information for each Service (Build info, Pipeline, Drop URL, etc.).
  The frontend needs to display and operate on this information (e.g., trigger deployments, select builds, etc.).


## Architecture

### Frontend (React + TypeScript)
- React 19 with TypeScript
- Microsoft FluentUI v9 for UI components
- Vite for build tooling
- React Router v6 for routing
- Zustand for state management
- React Query for server state management

### Backend (ASP.NET Core 8)
- ASP.NET Core 8 Web API for backend services
- Entity Framework Core with SQL Server for storing VE, services, build info, and deployment history
- Azure DevOps REST API / SDK integration for:  
  - Reading INI files  
  - Retrieving Pipeline artifacts  
  - OAuth2 / PAT authentication  
  - Redis Cache for frequently accessed VE/Service data and INI configurations
- Asynchronous Task Processing with Hangfire / BackgroundService for deployment triggers and artifact downloads
- JWT Authentication and role-based authorization for secure API access
- Repository Pattern with generic base classes for maintainable data access layer

## Repository Structure

### Frontend (`/src/frontend`)
- `components/`: Reusable UI components (auth, layout, forms, cards)
- `pages/`: Page components with routing
- `hooks/`: Custom React hooks
- `services/`: API service layer
- `store/`: State management (Zustand)
- `types/`: TypeScript definitions

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

## Coding Standards

### Frontend
- Use functional components with React.FC
- Strict TypeScript (no `any` types)
- FluentUI makeStyles for styling
- Zustand for global state, React Query for server state
- React Hook Form + Zod for validation

### Backend
- Follow .NET conventions and Clean Architecture
- Async/await for all I/O operations
- Repository pattern with generic base classes
- Dependency injection throughout
- JWT authentication with role-based authorization

## Key Features

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

### Core Functionality
1. **Visibility**
   - View all VEs and their associated services
   - Check **Build information** and **Drop URLs** for each service
   - Monitor deployment status and history per VE/service
2. **Control**
   - Trigger deployments at **VE level** or **Service level**
   - Only authorized users defined in `AllowedToSignClaims` can perform deployments
   - Support both **single deployment** and **batch deployment** scenarios
3. **Traceability**
   - Track deployment actions with user identity, timestamp, and affected VE/services
   - Maintain **audit logs** of all deployment events and Drop URL access
   - Ensure compliance and visibility for operational audits
4. **Configuration Management**
   - Read configuration files (INI) from Azure DevOps repositories
   - Cache frequently accessed configurations in **Redis**
   - Support **Environment-Level (VE)** and **Service-Level** settings
5. **Integration & Automation**
   - Integrate with **Azure DevOps REST API / SDK** for Pipeline artifacts and build metadata
   - Automate deployment workflows and validate user permissions before triggering tasks
   - Support **asynchronous task execution** via Hangfire / BackgroundService

## Development Commands

### Frontend
- Install: `npm install --legacy-peer-deps` (in `/src/frontend`)
- Dev server: `npm run dev`
- Build: `npm run build`

### Backend
- Build: `dotnet build` (in `/src/backend`)
- Run: `dotnet run --project <project_name>`

## Environment Setup
- Node.js 18+ for frontend
- .NET 8 SDK for backend
- SQL Server LocalDB for database
- Microsoft OAuth for authentication
