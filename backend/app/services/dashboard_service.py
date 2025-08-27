from typing import Dict, Any
from app.models.dashboard import DashboardStats, FavoriteVE, FavoriteVEStats
import logging

logger = logging.getLogger(__name__)

class DashboardService:
    """Dashboard业务逻辑服务"""
    
    def __init__(self):
        self.mock_data = self._init_mock_data()
    
    def _init_mock_data(self) -> dict:
        """初始化模拟数据"""
        return {
            "favorite_ves": [
                {
                    "name": "SovBase",
                    "description": "Base sovereign virtual environment",
                    "ve_type": "B Type VE",
                    "stats": {
                        "total_services": 89,
                        "deployed_services": 62,
                        "ready_to_deploy": 15
                    }
                },
                {
                    "name": "ModelBSov",
                    "description": "Model B sovereign environment",
                    "ve_type": "B Type VE", 
                    "stats": {
                        "total_services": 45,
                        "deployed_services": 30,
                        "ready_to_deploy": 8
                    }
                }
            ]
        }
    
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
        