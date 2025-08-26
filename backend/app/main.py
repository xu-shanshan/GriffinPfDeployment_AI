from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging

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

# Dashboard端点（临时mock数据）
@app.get("/api/dashboard")
async def get_dashboard():
    """获取仪表板数据"""
    return {
        "total_ves": 18,
        "active_services": 156,
        "recent_deployments": 23,
        "success_rate": 95.6,
        "favorite_ves": [
            {
                "name": "SovBase",
                "description": "Base sovereign virtual environment",
                "ve_type": "B Type",
                "stats": {
                    "total_services": 67,
                    "deployed_services": 62,
                    "ready_to_deploy": 5
                }
            },
            {
                "name": "ModelBSov", 
                "description": "Model B sovereign virtual environment",
                "ve_type": "B Type",
                "stats": {
                    "total_services": 65,
                    "deployed_services": 58,
                    "ready_to_deploy": 7
                }
            },
            {
                "name": "OwaMailB2-SOV",
                "description": "Outlook Web App Mail B2 services",
                "ve_type": "B2 Type", 
                "stats": {
                    "total_services": 1,
                    "deployed_services": 1,
                    "ready_to_deploy": 0
                }
            }
        ]
    }

# VE管理端点
@app.get("/api/ve")
async def get_virtual_environments():
    """获取虚拟环境列表"""
    return {
        "items": [
            {
                "name": "SovBase",
                "description": "Base sovereign virtual environment for core services",
                "ve_type": "B Type",
                "group": "SovBaseVEs",
                "stats": {
                    "total_services": 67,
                    "deployed_services": 62,
                    "dragon_services": 67,
                    "pfgold_services": 65,
                    "ready_to_deploy": 5
                },
                "is_favorite": True,
                "last_updated": "2024-12-20T12:00:00Z"
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
            }
        ],
        "total_count": 18,
        "page": 1,
        "page_size": 20,
        "has_next": False,
        "has_previous": False
    }

@app.get("/api/deployments")
async def get_deployment_history():
    """Get deployment history mock data"""
    return {
        "items": [
            {
                "id": "deploy-001",
                "ve_name": "SovBase",
                "service_names": ["OwaMailB2", "GraphConnectors"],
                "status": "success",
                "started_at": "2024-12-20T10:30:00Z",
                "completed_at": "2024-12-20T10:45:00Z",
                "build_version": "20241220.5"
            },
            {
                "id": "deploy-002", 
                "ve_name": "ModelBSov",
                "service_names": ["FlowControl"],
                "status": "running",
                "started_at": "2024-12-20T11:00:00Z",
                "completed_at": None,
                "build_version": "20241220.4"
            }
        ],
        "total_count": 2,
        "page": 1,
        "page_size": 20
    }

@app.post("/api/deployments")
async def create_deployment(deployment_data: dict):
    """Create new deployment"""
    return {
        "deployment_id": "deploy-003",
        "message": "Deployment initiated successfully",
        "status": "pending"
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("直接运行FastAPI应用")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
    ve_name: Optional[str] = Query(None),
    status: Optional[DeploymentStatus] = Query(None)
