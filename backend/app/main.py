from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# 导入配置和日志
from .core.config import settings
from .core.logging import logger

# 导入API路由
from .api import dashboard_routes, ve_routes, service_routes

# 导入模型（防止未引用警告）
from .models.deployment import DeploymentRequest, ConfigUpdateRequest  # noqa: F401
from .core.mock_data import MOCK_DATA  # noqa: F401

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


