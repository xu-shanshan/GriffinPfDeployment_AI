from app.models.dashboard import DashboardStats, FavoriteVE, FavoriteVEStats

class DashboardRepository:
    def __init__(self):
        self._mock_data = {
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
                }
            ]
        }

    async def get_dashboard_stats(self) -> DashboardStats:
        favorite_ves = [
            FavoriteVE(
                name=ve["name"],
                description=ve["description"],
                ve_type=ve["ve_type"],
                stats=FavoriteVEStats(**ve["stats"])
            ) for ve in self._mock_data["favorite_ves"]
        ]
        
        return DashboardStats(
            total_ves=5,
            active_services=156,
            recent_deployments=12,
            success_rate=98.5,
            favorite_ves=favorite_ves
        )

    def get_dashboard_info(self):
        return {"message": "Dashboard API root", "status": "ok"}
