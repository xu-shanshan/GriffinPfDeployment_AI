from typing import Dict, Any
from ..models.dashboard import DashboardStats, FavoriteVE, FavoriteVEStats
from ..core.logging import logger

class DashboardService:
    """Dashboard业务逻辑服务"""
    
    def __init__(self):
        self.mock_data = self._initialize_mock_data()
    
    def _initialize_mock_data(self) -> Dict[str, Any]:
        """初始化模拟数据"""
        return {
            "stats": {
                "total_ves": 12,
                "active_services": 156,
                "recent_deployments": 23,
                "success_rate": 96.5
            },
            "favorite_ves": [
                {
                    "name": "SovBase",
                    "description": "Base sovereign virtual environment",
                    "ve_type": "B Type",
                    "stats": {
                        "total_services": 89,
                        "deployed_services": 67,
                        "ready_to_deploy": 15
                    }
                },
                {
                    "name": "ModelBSov",
                    "description": "Model B sovereign environment",
                    "ve_type": "B Type", 
                    "stats": {
                        "total_services": 45,
                        "deployed_services": 32,
                        "ready_to_deploy": 8
                    }
                },
                {
                    "name": "OwaMailB2-SOV",
                    "description": "OWA Mail B2 sovereign environment",
                    "ve_type": "B2 Type",
                    "stats": {
                        "total_services": 22,
                        "deployed_services": 19,
                        "ready_to_deploy": 2
                    }
                }
            ]
        }
    
    async def get_dashboard_stats(self) -> DashboardStats:
        """获取Dashboard统计数据"""
        try:
            logger.info("获取Dashboard统计数据")
            
            # 构造收藏的VE数据
            favorite_ves = []
            for ve_data in self.mock_data["favorite_ves"]:
                favorite_ve = FavoriteVE(
                    name=ve_data["name"],
                    description=ve_data["description"],
                    ve_type=ve_data["ve_type"],
                    stats=FavoriteVEStats(**ve_data["stats"])
                )
                favorite_ves.append(favorite_ve)
            
            # 构造完整的统计数据
            dashboard_stats = DashboardStats(
                total_ves=self.mock_data["stats"]["total_ves"],
                active_services=self.mock_data["stats"]["active_services"],
                recent_deployments=self.mock_data["stats"]["recent_deployments"],
                success_rate=self.mock_data["stats"]["success_rate"],
                favorite_ves=favorite_ves
            )
            
            logger.info(f"成功返回Dashboard数据，包含{len(favorite_ves)}个收藏VE")
            return dashboard_stats
            
        except Exception as e:
            logger.error(f"获取Dashboard统计数据失败: {str(e)}")
            raise
