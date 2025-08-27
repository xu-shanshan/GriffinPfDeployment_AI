from app.models.service import ServiceDetail, Pipeline, ConfigUpdateRequest
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class ServiceService:
    """Service业务逻辑服务"""
    
    def __init__(self):
        self.mock_data = self._init_mock_data()
    
    def _init_mock_data(self) -> dict:
        """初始化模拟数据"""
        return {
            "OwaMailB2": {
                "name": "OwaMailB2",
                "description": "Outlook Web App Mail Backend Service",
                "status": "healthy",
                "version": "20241220.5",
                "build_type": "RingPromotion",
                "service_type": "B2 Type",
                "last_deploy": "2h",
                "active_pipelines": 3,
                "is_favorite": False,
                "pipelines": [
                    {
                        "id": 1418,
                        "name": "Main Pipeline",
                        "description": "Primary build pipeline for OwaMailB2",
                        "type": "main",
                        "is_default": True,
                        "latest_build": "20241220.5",
                        "drop_url": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.5?root=autopilot",
                        "icon": "zap"
                    }
                ],
                "config": {
                    "BuildType": "RingPromotion",
                    "PipelineId": 1418,
                    "IncrementalBuildPipelineId": 33874
                }
            }
        }
    
    async def get_service_detail(self, service_name: str, ve_name: Optional[str] = None) -> Optional[ServiceDetail]:
        """获取服务详情"""
        logger.info(f"获取服务详情: {service_name}, VE: {ve_name}")
        
        service_data = self.mock_data.get(service_name)
        if not service_data:
            return None
        
        pipelines = [Pipeline(**p) for p in service_data["pipelines"]]
        
        return ServiceDetail(
            name=service_data["name"],
            description=service_data["description"],
            status=service_data["status"],
            version=service_data["version"],
            build_type=service_data["build_type"],
            service_type=service_data["service_type"],
            last_deploy=service_data["last_deploy"],
            active_pipelines=service_data["active_pipelines"],
            is_favorite=service_data["is_favorite"],
            pipelines=pipelines,
            config=service_data["config"]
        )