from fastapi import APIRouter, Depends, HTTPException
from app.models.dashboard import DashboardStats
from app.services.dashboard_service import DashboardService
from ..core.logging import logger

router = APIRouter(prefix="/api", tags=["dashboard"])

def get_dashboard_service() -> DashboardService:
    return DashboardService()

@router.get("/dashboard", response_model=DashboardStats)
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