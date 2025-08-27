from typing import Dict, Any
from app.models.dashboard import DashboardStats
from app.models.ve import VE, VEStats
from app.core.mock_data import MOCK_DATA
from .base_repository import BaseRepository

class DashboardRepository(BaseRepository):
    """Dashboard数据访问层"""
    
    async def get_dashboard_stats(self) -> DashboardStats:
        """获取Dashboard统计数据"""
        # 计算统计数据
        total_ves = len(MOCK_DATA["ves"])
        active_services = sum(ve["stats"]["deployed_services"] for ve in MOCK_DATA["ves"])
        recent_deployments = len(MOCK_DATA["deployment_history"])
        
        # 获取收藏的VE
        favorite_ves = []
        for ve_data in MOCK_DATA["ves"]:
            if ve_data["is_favorite"]:
                ve = VE(
                    name=ve_data["name"],
                    description=ve_data["description"],
                    ve_type=ve_data["ve_type"],
                    group=ve_data["group"],
                    stats=VEStats(**ve_data["stats"]),
                    is_favorite=ve_data["is_favorite"],
                    last_updated=ve_data["last_updated"]
                )
                favorite_ves.append(ve)
        
        return DashboardStats(
            total_ves=total_ves,
            active_services=active_services,
            recent_deployments=recent_deployments,
            success_rate=98.5,
            favorite_ves=favorite_ves
        )
    
    def get_dashboard_info(self) -> Dict[str, Any]:
        """获取Dashboard基本信息"""
        return {
            "app_name": "Griffin PF Deployment AI",
            "version": "1.0.0",
            "description": "Griffin PF Deployment AI Dashboard"
        }
    
    async def get_data(self):
        return await self.get_dashboard_stats()
