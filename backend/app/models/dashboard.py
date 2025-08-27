from pydantic import BaseModel
from typing import List
from .ve import VE

class FavoriteVEStats(BaseModel):
    total_services: int
    deployed_services: int
    ready_to_deploy: int

class FavoriteVE(BaseModel):
    name: str
    description: str
    ve_type: str
    stats: FavoriteVEStats

class DashboardStats(BaseModel):
    total_ves: int
    active_services: int
    recent_deployments: int
    success_rate: float
    favorite_ves: List[VE]
