from fastapi import APIRouter, Depends, HTTPException
from app.models.dashboard import DashboardStats
from app.services.dashboard_service import DashboardService
from app.repositories.dashboard_repository import DashboardRepository
from ..core.logging import logger

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

def get_dashboard_repository() -> DashboardRepository:
    return DashboardRepository()

def get_dashboard_service(repository: DashboardRepository = Depends(get_dashboard_repository)) -> DashboardService:
    return DashboardService(repository)

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    dashboard_service: DashboardService = Depends(get_dashboard_service)
):
    """获取Dashboard统计数据"""
    try:
        logger.info("API请求: 获取Dashboard统计数据")
        return await dashboard_service.get_dashboard_stats()
    except Exception as e:
        logger.error(f"Dashboard API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取Dashboard数据失败: {str(e)}")


@router.get("/")
async def dashboard_root(dashboard_service: DashboardService = Depends(get_dashboard_service)):
    return dashboard_service.get_dashboard_info()

@router.get("/stats")
async def get_dashboard_stats():
    """获取仪表板统计信息"""
    return {"message": "Dashboard stats placeholder"}

@router.get("/info")
async def get_dashboard_info():
    """获取仪表板基本信息"""
    return dashboard_service.get_dashboard_info()