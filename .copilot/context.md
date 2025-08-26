# GriffinPfDeployment_AI – Copilot Context

## Project Overview
GriffinPfDeployment_AI is a deployment management tool for Virtual Environments (VE) and services. Users can:
- View all VE and their associated services
- Check Build information and Drop URL of a service 
- Trigger deployment for individual services or all services under some VE 

## Tech Stack
- Frontend: React, typescript，Fluent UI v9, axios/fetch
- Backend: Python + FastAPI, httpx, pydantic, python-dotenv

## Data Structure
```json
{
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

```
- ExpectedVEs 
本质上是VE 集合的分组，主要用于定义部署范围（deployment scope）和组织管理。
前端的核心需求是展示 用户可以操作的 VE 列表 和其对应的 Services，而不是强制按照集合显示。
也就是说，前端只需要知道有哪些 VE 可供选择，以及每个 VE 下有哪些 Service。

- ExpectedServices
这是 VE → Service 的映射。key:Ve name value：该VE 下有哪些 Service
前端必须使用这个数据来动态生成 VE 树结构或下拉菜单。

- Services
每个 Service 的具体信息（Build、Pipeline、Drop URL 等）。
前端需要显示和操作这些信息（触发部署、选择 Build 等）。


- 给一些基础背景知识：
Service 的部署方式有2类：Model B, Model B2
Model B服务部署在物理机上，物理环境 就是 APE (AutoPilot Pichical Environment (APE))
Model B2 服务部署在物理机上的某一个容器上，容器环境 就是 ACE(AutoPilot container Environment (ACE))

Virtual Environment (VE):就是由此引出的逻辑概念。会将很多公共的配置 抽出来，让 PE/CE 来集成，就不需要每个PE/CE 都写一遍。
由此就有了也就有2类： for Model B service 的 VE; for Model B2 的 B2 VE。我们的数据结构里其实 并没有关注Service 的部署类型。就像ExpectedVEs 也只是人为的划分了而已。

Model B Service must deployed by B type VE
Model B2 Service can deployed by B type VE or B2 VE


VE types:
- B type VE
    - SovBase
    - ModelBSov
- B2 type VE
    - OwaMailB2-SOV
    - TodoB2-SOV

- Each service can have multiple pipelines and every pipelines can get a lastest Drop URL .




## Page Layout
┌───────────────────────────────────────────────┐
│ Header: GriffinPfDeployment_AI               │
│-----------------------------------------------│
│ Top Filter (Right Top)                        │
│ ┌───────────────────────────┐               │
│ │ VE Filter Input           │               │
│ │ Service Filter Input      │               │
│ └───────────────────────────┘               │
│-----------------------------------------------│
│ Left Panel: VE Tree                            │
│ ┌─────────────┐                                │
│ │ VE 1        │                                │
│ │   ├─ Svc1   │                                │
│ │   └─ Svc2   │                                │
│ │ VE 2        │                                │
│ │   ├─ Svc3   │                                │
│ │   └─ Svc4   │                                │
│ └─────────────┘                                │
│-----------------------------------------------│
│ Right Panel: Service Panel                     │
│ Service Name + Deploy Button                   │
│ Build Type Blocks:                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│ │ RingPromotion │ │ Incremental │ │ Mainline ││
│ │ - Version     │ │ - Version   │ │ - Version││
│ │ - Drop URL    │ │ - Drop URL  │ │ - Drop URL││
│ └─────────────┘ └─────────────┘ └─────────┘ │
│-----------------------------------------------│
│ Footer: Log Panel                             │
│ - Show deploy status / progress / errors     │
└───────────────────────────────────────────────┘


## Workflow





## Security:
- Azure DevOps PAT stored only in backend.
- Frontend never sees PAT directly.
- Backend handles all authentication and API calls.

Concurrency:
- Backend queries Build info and Drop URLs asynchronously to improve speed.
