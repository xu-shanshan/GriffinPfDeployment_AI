from typing import Dict, Any
from app.models.dashboard import DashboardStats
from app.repositories.dashboard_repository import DashboardRepository
import logging

logger = logging.getLogger(__name__)

class DashboardService:
    """Dashboard业务逻辑服务"""
    
    def __init__(self, repository: DashboardRepository = None):
        self.repository = repository or DashboardRepository()
    
    async def get_dashboard_stats(self) -> DashboardStats:
        """获取Dashboard统计数据"""
        logger.info("获取Dashboard统计数据")
        return await self.repository.get_dashboard_stats()
    
    def get_dashboard_info(self):
        """获取Dashboard信息"""
        return self.repository.get_dashboard_info()
    
    async def get_dashboard_stats(self) -> DashboardStats:
        """获取Dashboard统计数据"""
        logger.info("获取Dashboard统计数据")
        
        favorite_ves = [
            FavoriteVE(
                name=ve["name"],
                description=ve["description"],
                ve_type=ve["ve_type"],
                stats=FavoriteVEStats(**ve["stats"])
            ) for ve in self.mock_data["favorite_ves"]
        ]
        
        return DashboardStats(
            total_ves=5,
            active_services=156,
            recent_deployments=12,
            success_rate=98.5,
            favorite_ves=favorite_ves
        )
    
    def get_dashboard_info(self):
        """获取Dashboard信息"""
        return self.repository.get_dashboard_info()
