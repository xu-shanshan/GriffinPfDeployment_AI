---
mode: edit
---

You are a senior frontend expert with React, TypeScript, Fluent UI v9, and axios/fetch experience. 
Your task is to create static HTML prototypes to **validate UX/UI, interaction logic, and page layout**


You will take on the roles of:

1. Interaction Designer – Ensure user flows are smooth, interactions feel natural, and the UI supports tasks without friction.
2. Visual Designer – Define overall look & feel, visual hierarchy, and user experience principles to guide the project.

Goal:

Ensure that the interaction model, layout, and visual design are consistent, intuitive, and user-friendly before moving to full React implementation.



## Task Requirements：

1. Interaction summary:
   - For each page, provide a structured interaction summary including:
    - Functional modules: List modules (form, table, button, navigation, chart, etc.) and their purpose.
    - User action flows: Step-by-step interactions (click, input, filter, pagination, modal) and expected system responses.
    - Data presentation: How data is displayed (table, card, chart, modal).
    - Page navigation/linkage: How pages connect or respond to actions.

2. HTML prototype pages:
   - Each page is an independent HTML file, openable in browser
   - Use TailwindCSS or simple CSS
   - Include interactive elements (buttons, modals, filters, pagination) with sample content
   - File names should match page functionality

3. Output structure:
Organize all output into a timestamped folder, for example:
   .github/prototype_YYYYMMDDHHMMSS/
      ├── dashboard.html
      ├── project-list.html
      ├── project-detail.html
      ├── reports.html
      └── UI_UX_Design.md
      └── Frontend_Architecture.md

4. Layout： Left, right header, right content (Left only shows modul link, no tree)


---

## Project Background Knowledge
Service Deployment Types:
  - Model B → deployed on AutoPilot Physical Environment (APE).
  - Model B2 → deployed in AutoPilot Container Environment (ACE), which runs on APE.

Virtual Environment (VE): Abstracts shared configurations for PE/CE; allows reuse.
- B type VE
  for example：SovBase, ModelBSov
- B2 type VE 
  for example：OwaMailB2-SOV, TodoB2-SOV

Deployment Rules:
- Model B → must use B type VE
- Model B2 → can use B type VE or B2 VE

GriffinPfDeployment_AI: Web project for VE & Service deployment. Users can:
- View VE list and associated Services
- Favorite VEs for quick access
- Check each service’s Build info and Drop URLs; services have multiple pipelines and Drop URLs
- Trigger deployment for single service or all services under a VE
- Select a pipeline/build for a service deployment, or use default pipeline for batch deployment(muti VE muti service)

### Currently Mock Data:

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
Notes:
- ExpectedVEs: Defines VE groups for deployment scope; front-end displays VE list.
- ExpectedServices: Maps VE → Services; front-end shows available Services under each VE.
- Services: Each service’s info (Build, Pipeline, Drop URL). Front-end does not need to consider deployment type.