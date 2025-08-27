from typing import Optional
from app.models.service import Service, ServiceDetail, ServiceListResponse
from app.repositories.service_repository import ServiceRepository
import logging

logger = logging.getLogger(__name__)

class ServiceService:
    """服务业务逻辑服务"""
    
    def __init__(self, repository: ServiceRepository = None):
        # 允许通过依赖注入或手动传递 repository
        self.repository = repository or ServiceRepository()

    async def get_services_by_ve(self, ve_name: str) -> ServiceListResponse:
        """根据VE获取服务列表"""
        logger.info(f"获取VE服务列表: {ve_name}")
        services = await self.repository.get_services_by_ve(ve_name)
        return ServiceListResponse(
            items=services,
            ve_name=ve_name,
            total_count=len(services)
        )
    
    async def get_service_by_id(self, service_id: str, ve_name: str) -> Optional[Service]:
        """根据ID获取服务详情"""
        logger.info(f"获取服务详情: {service_id} in {ve_name}")
        return await self.repository.get_service_by_id(service_id, ve_name)

    async def get_service_detail(self, service_name: str, ve_name: Optional[str] = None) -> Optional[ServiceDetail]:
        """获取服务详情"""
        logger.info(f"获取服务详情: {service_name}, VE: {ve_name}")
        
        service_data = await self.repository.fetch_by_name(service_name)
        if not service_data:
            return None
        
        pipelines = [Pipeline(**p) for p in service_data["pipelines"]]
        
        return ServiceDetail(
            name=service_data["name"],
            description=service_data["description"],
            status=service_data["status"],
            version=service_data.get("version"),  # 兼容 None
            build_type=service_data["build_type"],
            service_type=service_data["service_type"],
            last_deploy=service_data.get("last_deploy"),  # 兼容 None
            active_pipelines=service_data["active_pipelines"],
            is_favorite=service_data["is_favorite"],
            pipelines=pipelines,
            config=service_data["config"]
        )

    async def set_default_pipeline(self, service_name: str, pipeline_id: int) -> bool:
        """设置默认管道"""
        exists = await self.repository.pipeline_exists(service_name, pipeline_id)
        if not exists:
            raise ValueError("管道不存在")
        return await self.repository.set_default_pipeline(service_name, pipeline_id)