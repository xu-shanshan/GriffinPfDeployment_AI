from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# 导入配置和日志
from .core.config import settings
from .core.logging import logger

# 导入API路由
from .api import dashboard_routes, ve_routes, service_routes

# 创建FastAPI应用
app = FastAPI(
    title=settings.app_name,
    description=settings.description,
    version=settings.version,
    debug=settings.debug
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(dashboard_routes.router, prefix=settings.api_prefix)
app.include_router(ve_routes.router, prefix=settings.api_prefix)
app.include_router(service_routes.router, prefix=settings.api_prefix)

@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "Griffin PF Deployment AI Backend",
        "version": settings.version,
        "docs_url": "/docs"
    }

@app.get("/health")
async def health_check():
    """健康检查"""
    return {
        "status": "healthy",
        "message": "Griffin PF Deployment AI Backend is running",
        "version": settings.version
    }

@app.on_event("startup")
async def startup_event():
    """应用启动事件"""
    logger.info("🚀 Griffin PF Deployment AI 启动中...")
    logger.info(f"📍 API地址: http://{settings.host}:{settings.port}")
    logger.info(f"📚 API文档: http://{settings.host}:{settings.port}/docs")
    logger.info(f"🔍 健康检查: http://{settings.host}:{settings.port}/health")

@app.on_event("shutdown")
async def shutdown_event():
    """应用关闭事件"""
    logger.info("👋 Griffin PF Deployment AI 正在关闭...")

# 全局异常处理
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"未处理的异常: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "detail": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level=settings.log_level.lower()
    )
    last_deploy: str
    active_pipelines: int
    is_favorite: bool
    pipelines: List[PipelineModel]
    config: Dict[str, Any]


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
    logger.info("健康检查: http://localhost:8000/health")

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


