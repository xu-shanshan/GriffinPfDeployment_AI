from typing import Optional, Dict, Any
from ..models.service import ServiceDetail, Pipeline, ConfigUpdateRequest
from ..core.logging import logger

class ServiceService:
    """Service业务逻辑服务"""
    
    def __init__(self):
        self.mock_data = self._initialize_mock_data()
    
    def _initialize_mock_data(self) -> Dict[str, Any]:
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
    
    async def get_service_detail(self, service_name: str, ve_name: Optional[str] = None) -> ServiceDetail:
        """获取服务详情"""
        try:
            logger.info(f"获取服务详情: {service_name}")
            
            service_data = self.mock_data.get(service_name)
            if not service_data:
                raise ValueError(f"Service '{service_name}' not found")
            
            pipelines = [Pipeline(**p) for p in service_data["pipelines"]]
            
            service_detail = ServiceDetail(
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
            
            logger.info(f"成功返回服务详情: {service_name}")
            return service_detail
            
        except Exception as e:
            logger.error(f"获取服务详情失败: {str(e)}")
            raise
    
    async def update_service_config(self, service_name: str, config_request: ConfigUpdateRequest) -> Dict[str, Any]:
        """更新服务配置"""
        try:
            logger.info(f"更新服务配置: {service_name}")
            
            if service_name not in self.mock_data:
                raise ValueError(f"Service '{service_name}' not found")
            
            # 模拟配置更新
            self.mock_data[service_name]["config"] = config_request.config
            
            result = {
                "success": True,
                "message": f"Service {service_name} configuration updated successfully",
                "pr_created": config_request.create_pr
            }
            
            logger.info(f"成功更新服务配置: {service_name}")
            return result
            
        except Exception as e:
            logger.error(f"更新服务配置失败: {str(e)}")
            raise
    
    async def set_default_pipeline(self, service_name: str, pipeline_id: int) -> Dict[str, Any]:
        """设置默认Pipeline"""
        try:
            logger.info(f"设置默认Pipeline: {service_name}, Pipeline: {pipeline_id}")
            
            if service_name not in self.mock_data:
                raise ValueError(f"Service '{service_name}' not found")
            
            # 模拟设置默认pipeline
            pipelines = self.mock_data[service_name]["pipelines"]
            pipeline_found = False
            
            for pipeline in pipelines:
                if pipeline["id"] == pipeline_id:
                    pipeline["is_default"] = True
                    pipeline_found = True
                else:
                    pipeline["is_default"] = False
            
            if not pipeline_found:
                raise ValueError(f"Pipeline {pipeline_id} not found for service {service_name}")
            
            result = {
                "success": True,
                "message": f"Pipeline {pipeline_id} set as default for service {service_name}",
                "service_name": service_name,
                "default_pipeline_id": pipeline_id
            }
            
            logger.info(f"成功设置默认Pipeline: {service_name}")
            return result
            
        except Exception as e:
            logger.error(f"设置默认Pipeline失败: {str(e)}")
            raise
