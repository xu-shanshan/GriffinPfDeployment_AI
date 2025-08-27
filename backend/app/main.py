from fastapi import FastAPI, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
import logging
from enum import Enum

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 创建FastAPI应用
app = FastAPI(
    title="Griffin PF Deployment AI",
    description="Virtual Environment Management API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据模型定义
class DeploymentStatus(str, Enum):
    pending = "pending"
    running = "running"
    success = "success"
    failed = "failed"
    cancelled = "cancelled"

class ServiceStatus(str, Enum):
    ready = "ready"
    not_deployed = "not-deployed"
    missing_pfgold = "missing-pfgold"
    config_error = "config-error"

class VEType(str, Enum):
    b_type = "B Type"
    b2_type = "B2 Type"

class ServiceModel(BaseModel):
    id: str
    name: str
    description: str
    status: ServiceStatus
    in_dragon: bool
    in_pfgold: bool
    current_version: Optional[str]
    pipeline: Optional[str]
    pipeline_version: Optional[str]
    icon: str
    icon_color: str
    ready_to_deploy: bool

class PipelineModel(BaseModel):
    id: int
    name: str
    description: str
    type: str
    is_default: bool
    latest_build: str
    drop_url: str
    icon: str

class ServiceDetailModel(BaseModel):
    name: str
    description: str
    status: str
    version: str
    build_type: str
    service_type: str
    last_deploy: str
    active_pipelines: int
    is_favorite: bool
    pipelines: List[PipelineModel]
    config: Dict[str, Any]

class VEModel(BaseModel):
    name: str
    description: str
    ve_type: VEType
    group: str
    stats: Dict[str, int]
    is_favorite: Optional[bool] = False
    last_updated: Optional[str] = None

class DeploymentRequest(BaseModel):
    service_names: List[str]
    pipeline_id: Optional[int] = None
    build_version: Optional[str] = None
    ve_name: str

class ConfigUpdateRequest(BaseModel):
    config: Dict[str, Any]
    create_pr: bool = True

# Mock数据
MOCK_DATA = {
    "ves": [
        {
            "name": "SovBase",
            "description": "Base sovereign virtual environment for core services",
            "ve_type": "B Type",
            "group": "SovBaseVEs",
            "stats": {
                "total_services": 67,
                "deployed_services": 62,
                "dragon_services": 89,
                "pfgold_services": 67,
                "ready_to_deploy": 5
            },
            "is_favorite": True,
            "last_updated": "2024-12-20T14:00:00Z"
        },
        {
            "name": "ModelBSov",
            "description": "Model B sovereign virtual environment",
            "ve_type": "B Type",
            "group": "ModelBSovVEs",
            "stats": {
                "total_services": 65,
                "deployed_services": 58,
                "dragon_services": 65,
                "pfgold_services": 62,
                "ready_to_deploy": 7
            },
            "is_favorite": True,
            "last_updated": "2024-12-20T08:00:00Z"
        },
        {
            "name": "OwaMailB2-SOV",
            "description": "Outlook Web App Mail B2 services",
            "ve_type": "B2 Type",
            "group": "ModelB2SovVEs",
            "stats": {
                "total_services": 1,
                "deployed_services": 1,
                "dragon_services": 1,
                "pfgold_services": 1,
                "ready_to_deploy": 0
            },
            "is_favorite": True,
            "last_updated": "2024-12-20T14:00:00Z"
        },
        {
            "name": "GraphConnectorsB2-SOV",
            "description": "Graph Connectors B2 services",
            "ve_type": "B2 Type",
            "group": "ModelB2SovVEs",
            "stats": {
                "total_services": 1,
                "deployed_services": 0,
                "dragon_services": 1,
                "pfgold_services": 0,
                "ready_to_deploy": 1
            },
            "is_favorite": False,
            "last_updated": "2024-12-20T10:00:00Z"
        },
        {
            "name": "FlowControlB2-SOV",
            "description": "Flow Control B2 services",
            "ve_type": "B2 Type",
            "group": "ModelB2SovVEs",
            "stats": {
                "total_services": 1,
                "deployed_services": 0,
                "dragon_services": 1,
                "pfgold_services": 0,
                "ready_to_deploy": 0
            },
            "is_favorite": False,
            "last_updated": "2024-12-20T12:00:00Z"
        },
        {
            "name": "TodoB2-SOV",
            "description": "Todo B2 services",
            "ve_type": "B2 Type",
            "group": "ModelB2SovVEs",
            "stats": {
                "total_services": 1,
                "deployed_services": 1,
                "dragon_services": 1,
                "pfgold_services": 1,
                "ready_to_deploy": 0
            },
            "is_favorite": False,
            "last_updated": "2024-12-20T11:00:00Z"
        }
    ],
    "services": {
        "SovBase": [
            {
                "id": "owamailb2",
                "name": "OwaMailB2",
                "description": "Outlook Web App Mail Backend",
                "status": "ready",
                "in_dragon": True,
                "in_pfgold": True,
                "current_version": "v2.1.234",
                "pipeline": "ExchangeMailPipeline",
                "pipeline_version": "v3.2.1",
                "icon": "mail",
                "icon_color": "blue",
                "ready_to_deploy": True
            },
            {
                "id": "graphconnectors",
                "name": "GraphConnectors",
                "description": "Graph Connectors Service",
                "status": "not-deployed",
                "in_dragon": True,
                "in_pfgold": True,
                "current_version": None,
                "pipeline": "GraphConnectorsPipeline",
                "pipeline_version": "v2.8.5",
                "icon": "flash",
                "icon_color": "orange",
                "ready_to_deploy": False
            },
            {
                "id": "flowcontrol",
                "name": "FlowControl",
                "description": "Flow Control Service",
                "status": "missing-pfgold",
                "in_dragon": True,
                "in_pfgold": False,
                "current_version": None,
                "pipeline": "FlowControlPipeline",
                "pipeline_version": "v1.9.3",
                "icon": "activity",
                "icon_color": "yellow",
                "ready_to_deploy": False
            },
            {
                "id": "invalidservice",
                "name": "InvalidService",
                "description": "Service not in Dragon map",
                "status": "config-error",
                "in_dragon": False,
                "in_pfgold": True,
                "current_version": "v1.0.0",
                "pipeline": None,
                "pipeline_version": None,
                "icon": "alert",
                "icon_color": "red",
                "ready_to_deploy": False
            }
        ]
    },
    "service_details": {
        "OwaMailB2": {
            "name": "OwaMailB2",
            "description": "Outlook Web App Mail Backend Service",
            "status": "healthy",
            "version": "20241220.5",
            "build_type": "RingPromotion",
            "service_type": "B2 Type",
            "last_deploy": "2h",
            "active_pipelines": 3,
            "is_favorite": False,
            "pipelines": [
                {
                    "id": 1418,
                    "name": "Main Pipeline",
                    "description": "Primary build pipeline for OwaMailB2",
                    "type": "main",
                    "is_default": True,
                    "latest_build": "20241220.5",
                    "drop_url": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.5?root=autopilot",
                    "icon": "zap"
                },
                {
                    "id": 33874,
                    "name": "Incremental Build",
                    "description": "Fast incremental build pipeline",
                    "type": "incremental",
                    "is_default": False,
                    "latest_build": "20241220.3",
                    "drop_url": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.3?root=autopilot",
                    "icon": "refresh-cw"
                },
                {
                    "id": 31234,
                    "name": "Incremental Build Alt",
                    "description": "Alternative incremental build",
                    "type": "incremental",
                    "is_default": False,
                    "latest_build": "20241220.2",
                    "drop_url": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.2?root=autopilot",
                    "icon": "refresh-cw"
                }
            ],
            "config": {
                "BuildType": "RingPromotion",
                "PipelineId": 1418,
                "IncrementalBuildPipelineId": 33874,
                "RingPromotionRootPath": "autopilot",
                "BuildRoot": "https://outlookgriffinservice.blob.core.windows.net/owamailb2/prod_image.txt",
                "PpeVeName": "OwaMailB2-PPE",
                "BuildPathPattern": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/<BuildVersion>?root=autopilot"
            }
        }
    },
    "deployment_history": [
        {
            "id": "deploy-001",
            "ve_name": "SovBase",
            "service_names": ["OwaMailB2", "GraphConnectors"],
            "status": "success",
            "started_at": "2024-12-20T10:30:00Z",
            "completed_at": "2024-12-20T10:45:00Z",
            "build_version": "20241220.5",
            "deployed_by": "john.doe@example.com",
            "duration": "15m"
        },
        {
            "id": "deploy-002",
            "ve_name": "ModelBSov",
            "service_names": ["FlowControl"],
            "status": "running",
            "started_at": "2024-12-20T11:00:00Z",
            "completed_at": None,
            "build_version": "20241220.4",
            "deployed_by": "jane.smith@example.com",
            "duration": None
        }
    ]
}

@app.on_event("startup")
async def startup_event():
    logger.info("Griffin PF Deployment AI 启动中...")
    logger.info("API文档地址: http://localhost:8000/docs")

@app.get("/")
async def root():
    """根路径健康检查"""
    return {
        "message": "Griffin PF Deployment AI API", 
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {
        "status": "healthy",
        "service": "Griffin PF Deployment AI",
        "version": "1.0.0"
    }

# Dashboard API
@app.get("/api/dashboard")
async def get_dashboard():
    """获取仪表板数据"""
    total_ves = len(MOCK_DATA["ves"])
    total_services = sum(ve["stats"]["total_services"] for ve in MOCK_DATA["ves"])
    active_services = sum(ve["stats"]["deployed_services"] for ve in MOCK_DATA["ves"])
    recent_deployments = len([d for d in MOCK_DATA["deployment_history"] 
                             if d["started_at"] > "2024-12-19T00:00:00Z"])
    
    return {
        "total_ves": total_ves,
        "active_services": active_services,
        "recent_deployments": recent_deployments,
        "success_rate": 95.6,
        "favorite_ves": [ve for ve in MOCK_DATA["ves"] if ve.get("is_favorite", False)][:3]
    }

# VE Management API
@app.get("/api/ve")
async def get_virtual_environments(
    search: Optional[str] = Query(None),
    ve_type: Optional[str] = Query(None),
    group: Optional[str] = Query(None)
):
    """获取虚拟环境列表"""
    ves = MOCK_DATA["ves"]
    
    # 应用过滤器
    if search:
        ves = [ve for ve in ves if search.lower() in ve["name"].lower() or search.lower() in ve["description"].lower()]
    if ve_type:
        ves = [ve for ve in ves if ve["ve_type"] == ve_type]
    if group:
        ves = [ve for ve in ves if ve["group"] == group]
    
    return {
        "items": ves,
        "total_count": len(ves),
        "page": 1,
        "page_size": 20,
        "has_next": False,
        "has_previous": False
    }

@app.get("/api/ve/{ve_name}")
async def get_ve_detail(ve_name: str = Path(...)):
    """获取VE详细信息"""
    ve = next((v for v in MOCK_DATA["ves"] if v["name"] == ve_name), None)
    if not ve:
        raise HTTPException(status_code=404, detail="VE not found")
    return ve

@app.get("/api/ve/{ve_name}/services")
async def get_ve_services(
    ve_name: str = Path(...),
    status: Optional[str] = Query(None),
    config_filter: Optional[str] = Query(None)
):
    """获取VE下的服务列表"""
    services = MOCK_DATA["services"].get(ve_name, [])
    
    # 应用状态过滤器
    if status:
        services = [s for s in services if s["status"] == status]
    
    # 应用配置过滤器
    if config_filter:
        if config_filter == "both":
            services = [s for s in services if s["in_dragon"] and s["in_pfgold"]]
        elif config_filter == "dragon-only":
            services = [s for s in services if s["in_dragon"] and not s["in_pfgold"]]
        elif config_filter == "pfgold-only":
            services = [s for s in services if not s["in_dragon"] and s["in_pfgold"]]
    
    return {"services": services}

# Service Detail API
@app.get("/api/service/{service_name}")
async def get_service_detail(
    service_name: str = Path(...),
    ve_name: Optional[str] = Query(None)
):
    """获取服务详细信息"""
    service_detail = MOCK_DATA["service_details"].get(service_name)
    if not service_detail:
        raise HTTPException(status_code=404, detail="Service not found")
    return service_detail

@app.put("/api/service/{service_name}/config")
async def update_service_config(
    service_name: str = Path(...),
    config_request: ConfigUpdateRequest
):
    """更新服务配置"""
    if service_name not in MOCK_DATA["service_details"]:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # 更新配置
    MOCK_DATA["service_details"][service_name]["config"] = config_request.config
    
    return {
        "message": "Configuration updated successfully",
        "service": service_name,
        "create_pr": config_request.create_pr
    }

@app.put("/api/service/{service_name}/pipeline/{pipeline_id}/default")
async def set_default_pipeline(
    service_name: str = Path(...),
    pipeline_id: int = Path(...)
):
    """设置默认Pipeline"""
    service_detail = MOCK_DATA["service_details"].get(service_name)
    if not service_detail:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # 更新默认Pipeline
    for pipeline in service_detail["pipelines"]:
        pipeline["is_default"] = (pipeline["id"] == pipeline_id)
    
    return {
        "message": "Default pipeline updated successfully",
        "service": service_name,
        "pipeline_id": pipeline_id
    }

# Deployment API
@app.get("/api/deployments")
async def get_deployment_history(
    ve_name: Optional[str] = Query(None),
    status: Optional[DeploymentStatus] = Query(None),
    limit: int = Query(50, le=100)
):
    """获取部署历史"""
    deployments = MOCK_DATA["deployment_history"]
    
    # 应用过滤器
    if ve_name:
        deployments = [d for d in deployments if d["ve_name"] == ve_name]
    if status:
        deployments = [d for d in deployments if d["status"] == status.value]
    
    return {
        "items": deployments[:limit],
        "total_count": len(deployments),
        "page": 1,
        "page_size": limit
    }

@app.post("/api/deployments")
async def create_deployment(deployment_request: DeploymentRequest):
    """创建新的部署"""
    deployment_id = f"deploy-{len(MOCK_DATA['deployment_history']) + 1:03d}"
    
    new_deployment = {
        "id": deployment_id,
        "ve_name": deployment_request.ve_name,
        "service_names": deployment_request.service_names,
        "status": "pending",
        "started_at": datetime.utcnow().isoformat() + "Z",
        "completed_at": None,
        "build_version": deployment_request.build_version or "latest",
        "deployed_by": "api.user@example.com",
        "duration": None,
        "pipeline_id": deployment_request.pipeline_id
    }
    
    MOCK_DATA["deployment_history"].insert(0, new_deployment)
    
    return {
        "deployment_id": deployment_id,
        "message": "Deployment initiated successfully",
        "status": "pending",
        "services": deployment_request.service_names
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("直接运行FastAPI应用")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
