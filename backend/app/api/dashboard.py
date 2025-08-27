from fastapi import APIRouter, HTTPException
from ..models.dashboard import DashboardStats
from ..services.dashboard_service import DashboardService
from ..core.logging import logger

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

# 创建服务实例
dashboard_service = DashboardService()

@router.get("/", response_model=DashboardStats)
async def get_dashboard_stats():
    """获取Dashboard统计数据"""
    try:
        logger.info("API请求: 获取Dashboard统计数据")
        return await dashboard_service.get_dashboard_stats()
    except Exception as e:
        logger.error(f"Dashboard API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取Dashboard数据失败: {str(e)}")
