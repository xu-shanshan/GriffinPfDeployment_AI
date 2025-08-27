"""
数据模型模块
"""
from .dashboard import DashboardStats, FavoriteVE
from .ve import VE, VEStats, VEListResponse, VEDetail
from .service import Service, ServiceDetail, Pipeline, ConfigUpdateRequest
from .deployment import Deployment, DeploymentCreateRequest, DeploymentListResponse

__all__ = [
    "DashboardStats",
    "FavoriteVE", 
    "VE",
    "VEStats",
    "VEListResponse",
    "VEDetail",
    "Service",
    "ServiceDetail",
    "Pipeline",
    "ConfigUpdateRequest",
    "Deployment",
    "DeploymentCreateRequest", 
    "DeploymentListResponse"
]
