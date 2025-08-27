from typing import Optional, Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class ServiceRepository:
    """Service数据访问层"""
    
    def __init__(self):
        # Mock数据存储 - 在实际项目中这里会连接真实数据库
        self._mock_services = self._init_mock_data()
    
    def _init_mock_data(self) -> Dict[str, Any]:
        """初始化Mock数据"""
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
                    },
                    {
                        "id": 33874,
                        "name": "Incremental Build",
                        "description": "Fast incremental build pipeline",
                        "type": "incremental",
                        "is_default": False,
                        "latest_build": "20241220.3",
                        "drop_url": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.3?root=autopilot",
                        "icon": "refresh-cw"
                    },
                    {
                        "id": 31234,
                        "name": "Incremental Build Alt",
                        "description": "Alternative incremental build",
                        "type": "incremental",
                        "is_default": False,
                        "latest_build": "20241220.2",
                        "drop_url": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.2?root=autopilot",
                        "icon": "refresh-cw"
                    }
                ],
                "config": {
                    "BuildType": "RingPromotion",
                    "PipelineId": 1418,
                    "IncrementalBuildPipelineId": 33874,
                    "RingPromotionRootPath": "autopilot",
                    "BuildRoot": "https://outlookgriffinservice.blob.core.windows.net/owamailb2/prod_image.txt",
                    "PpeVeName": "OwaMailB2-PPE",
                    "BuildPathPattern": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/<BuildVersion>?root=autopilot"
                }
            },
            "GraphConnectors": {
                "name": "GraphConnectors",
                "description": "Graph Connectors Service",
                "status": "not-deployed",
                "version": None,
                "build_type": "RingPromotion",
                "service_type": "B Type",
                "last_deploy": None,
                "active_pipelines": 2,
                "is_favorite": False,
                "pipelines": [
                    {
                        "id": 2001,
                        "name": "Main Pipeline",
                        "description": "Primary build pipeline for GraphConnectors",
                        "type": "main",
                        "is_default": True,
                        "latest_build": "20241220.2",
                        "drop_url": "VSO://https://graphconnectors.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/graphconnectors_ms/20241220.2?root=autopilot",
                        "icon": "zap"
                    }
                ],
                "config": {
                    "BuildType": "RingPromotion",
                    "PipelineId": 2001
                }
            }
        }
    
    async def fetch_by_name(self, service_name: str) -> Optional[Dict[str, Any]]:
        """根据服务名获取服务数据"""
        try:
            logger.info(f"Repository层: 获取服务数据 - {service_name}")
            return self._mock_services.get(service_name)
        except Exception as e:
            logger.error(f"获取服务数据Repository层错误: {str(e)}")
            raise
    
    async def update_config(self, service_name: str, config: Dict[str, Any]) -> bool:
        """更新服务配置"""
        try:
            logger.info(f"Repository层: 更新服务配置 - {service_name}")
            if service_name in self._mock_services:
                self._mock_services[service_name]["config"] = config
                return True
            return False
        except Exception as e:
            logger.error(f"更新服务配置Repository层错误: {str(e)}")
            raise
    
    async def pipeline_exists(self, service_name: str, pipeline_id: int) -> bool:
        """检查Pipeline是否存在"""
        try:
            service_data = self._mock_services.get(service_name)
            if not service_data:
                return False
            
            pipelines = service_data.get("pipelines", [])
            return any(p["id"] == pipeline_id for p in pipelines)
        except Exception as e:
            logger.error(f"检查Pipeline存在Repository层错误: {str(e)}")
            raise
    
    async def set_default_pipeline(self, service_name: str, pipeline_id: int) -> bool:
        """设置默认Pipeline"""
        try:
            logger.info(f"Repository层: 设置默认Pipeline - {service_name}, {pipeline_id}")
            service_data = self._mock_services.get(service_name)
            if not service_data:
                return False
            
            # 更新Pipeline默认状态
            pipelines = service_data.get("pipelines", [])
            for pipeline in pipelines:
                pipeline["is_default"] = (pipeline["id"] == pipeline_id)
            
            return True
        except Exception as e:
            logger.error(f"设置默认Pipeline Repository层错误: {str(e)}")
            raise
