假设你是一个超级厉害的前端专家，精通 React 全家桶，但现在我们先要生成原型图，用 HTML 原型快速展示页面和交互逻辑。

需求：
1. 请仔细阅读以下功能需求（我会提供），总结出核心交互逻辑：
   - 页面功能模块（如表单、列表、按钮、导航、图表等）
   - 用户操作流程（点击、输入、筛选、分页、弹窗等）
   - 数据展示方式（表格、卡片、图表、弹窗等）
   - 页面之间的跳转或联动逻辑

2. 为每个页面生成独立 HTML 文件：
   - HTML 文件名应与页面功能匹配
   - 使用 TailwindCSS 或简易 CSS
   - 页面应体现主要交互和布局，不需要真实数据，可用示例内容
   - 每个页面的 HTML 可以在浏览器直接打开查看效果

3. 输出要求：
   - 首先输出交互逻辑总结（中文 + 简单英文）
   - 然后输出多页面 HTML 原型，每个页面独立 HTML
   - 指定统一文件夹存放，如 /prototype_YYYYMMDDHHMMSS/

4. 示例输出结构：
/prototype_YYYYMMDDHHHMMSS/
   ├── login.html
   ├── dashboard.html
   ├── project-list.html
   ├── project-detail.html
   ├── reports.html

5. 输出示例 HTML：
- login.html：表单 + 登录按钮，居中
- dashboard.html：导航栏 + 统计卡片 + 项目入口
- project-list.html：表格 + 筛选 + 分页 + 操作按钮
- project-detail.html：卡片展示详情 + 编辑/删除按钮 + 弹窗
- reports.html：图表 + 筛选条件

请根据我提供的具体需求生成原型图，确保每个页面的布局和交互逻辑清晰，HTML 可直接在浏览器打开，并保持每个页面独立文件。

真是功能需求如下：

GriffinPfDeployment_AI is a deployment management tool for Virtual Environments (VE) and services. Users can:
- View all VE and their associated services
- Check Build information and Drop URL of a service 
- Trigger deployment for individual services or all services under some VE 
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

- Each service 会有多个 pipelines ，每个pipline 都会有自己的 drop url list.用户可以自由选择 使用哪个 pipline 的buildnumber 的dropurl 来部署。用户也可以自己设置哪个pipelines作为默认的pipline 部署，这样就可以不需要每次都选了，如果用户没有选，那么系统漠然采取最新的buildnumber部署