# Griffin PF Deployment AI - HTML Prototypes

## 原型概述 (Prototype Overview)

这是 Griffin PF Deployment AI 工具的 HTML 原型集合，用于展示虚拟环境(VE)和服务部署管理的核心功能和交互逻辑。

This is a collection of HTML prototypes for the Griffin PF Deployment AI tool, demonstrating core functionality and interaction logic for Virtual Environment (VE) and service deployment management.

## 页面结构 (Page Structure)

```
prototype_20241221143000/
├── login.html                  # 登录页面 (Login Page)
├── dashboard.html             # 主仪表板 (Main Dashboard)
├── ve-list.html              # VE列表页面 (VE List Page)
├── ve-detail.html            # VE详情页面 (VE Detail Page)
├── service-detail.html       # 服务详情页面 (Service Detail Page)
├── deployment-history.html   # 部署历史页面 (Deployment History)
├── pipeline-management.html  # 管道管理页面 (Pipeline Management)
└── README.md                 # 说明文档 (Documentation)
```

## 核心交互逻辑 (Core Interaction Logic)

### 页面功能模块 (Page Function Modules)
- **登录认证** - 用户身份验证表单
- **VE概览** - 虚拟环境和服务的统计信息展示
- **树形结构** - VE和服务的层次化显示
- **服务管理** - 单个服务的详细信息和操作
- **批量部署** - 多服务同时部署功能
- **历史记录** - 部署活动的历史追踪

### 用户操作流程 (User Operation Flow)
1. **Login** → **Dashboard** → **VE Selection** → **Service Operations**
2. **Build Selection** → **Pipeline Configuration** → **Deployment Execution**
3. **Status Monitoring** → **History Review** → **Log Analysis**

### 数据展示方式 (Data Display Methods)
- **Cards** - 统计信息和服务状态展示
- **Tables** - 服务列表和部署历史
- **Tree Structure** - VE和服务的层次关系
- **Modal Dialogs** - 部署配置和详细信息
- **Timeline** - 部署进度和历史

### 页面跳转联动逻辑 (Page Navigation Logic)
- **Breadcrumb Navigation** - 面包屑导航
- **Back Buttons** - 返回上级页面
- **Quick Actions** - 快速操作入口
- **Context Switching** - 上下文相关的页面切换

## 技术特性 (Technical Features)

### 响应式设计 (Responsive Design)
- 使用 TailwindCSS 实现响应式布局
- 支持桌面端和移动端显示
- 自适应网格和弹性布局

### 交互特性 (Interactive Features)
- 动态表单验证和数据更新
- 模态弹窗和确认对话框
- 实时状态更新和进度显示
- 搜索、过滤和分页功能

### 数据模型 (Data Models)
- **VE Types**: SovBase, ModelBSov, ModelB2Sov VEs
- **Service Types**: Model B Services, Model B2 Services
- **Pipeline Types**: Main Pipeline, Incremental Pipeline
- **Deployment Status**: Success, Failed, In Progress

## 使用说明 (Usage Instructions)

### 本地运行 (Local Running)
1. 将所有 HTML 文件下载到本地目录
2. 直接在浏览器中打开 `login.html` 开始体验
3. 按照页面导航进行交互操作

### 功能测试 (Feature Testing)
1. **登录功能** - 任意用户名密码即可登录
2. **VE浏览** - 点击不同VE查看服务列表
3. **服务部署** - 选择构建版本进行模拟部署
4. **历史查看** - 查看部署历史和日志信息

### 数据说明 (Data Notes)
- 所有数据均为示例数据，用于演示界面功能
- Pipeline ID 和 Build Version 基于真实配置结构
- Drop URL 格式遵循实际的 Azure DevOps 规范

## 设计原则 (Design Principles)

### 用户体验 (User Experience)
- **简洁直观** - 清晰的信息层次和操作流程
- **快速响应** - 高效的页面加载和交互反馈
- **错误处理** - 友好的错误提示和恢复机制

### 信息架构 (Information Architecture)
- **层次结构** - VE → Services → Builds → Deployments
- **状态管理** - 实时状态更新和历史追踪
- **权限控制** - 基于角色的功能访问控制

### 扩展性 (Scalability)
- **模块化设计** - 独立的页面组件和功能模块
- **配置驱动** - 基于 JSON 配置的动态内容生成
- **API 就绪** - 为后端集成预留的数据接口

## 后续开发 (Future Development)

### React 转换 (React Migration)
- 将 HTML 原型转换为 React 组件
- 实现状态管理和路由配置
- 集成真实的 API 数据源

### 功能增强 (Feature Enhancement)
- 实时部署监控和通知
- 批量操作和自动化部署
- 高级过滤和搜索功能
- 用户权限和审计日志

### 性能优化 (Performance Optimization)
- 虚拟滚动和懒加载
- 缓存策略和离线支持
- 实时数据同步和更新

---

**注意**: 这些原型文件仅用于功能演示和设计验证，不包含真实的部署逻辑和数据连接。
**Note**: These prototype files are for demonstration and design validation only, and do not include actual deployment logic or data connections.
