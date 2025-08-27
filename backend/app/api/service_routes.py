from fastapi import APIRouter, HTTPException, Path, Query, Depends
from app.services.service_service import ServiceService
from app.repositories.service_repository import ServiceRepository
from app.models.service import ServiceDetailResponse, ConfigUpdateRequest, ServiceListResponse, Service
from typing import Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/service", tags=["services"])

def get_service_repository() -> ServiceRepository:
    """依赖注入：获取Repository实例"""
    return ServiceRepository()

def get_service_service(repository: ServiceRepository = Depends(get_service_repository)) -> ServiceService:
    """依赖注入：获取Service服务实例"""
    return ServiceService(repository)

@router.get("/{service_name}", response_model=ServiceDetailResponse)
async def get_service_detail(
    service_name: str = Path(..., description="服务名称"),
    ve_name: Optional[str] = Query(None, description="VE名称"),
    service_service: ServiceService = Depends(get_service_service)
):
    """获取服务详细信息"""
    logger.info(f"API层: 获取服务详情请求 - {service_name}, VE: {ve_name}")
    
    try:
        service_detail = await service_service.get_service_detail(service_name, ve_name)
        if not service_detail:
            raise HTTPException(status_code=404, detail=f"Service not found: {service_name}")
        
        return ServiceDetailResponse(data=service_detail)
        
    except Exception as e:
        logger.error(f"API层获取服务详情错误: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.put("/{service_name}/pipeline/{pipeline_id}/default")
async def set_default_pipeline(
    service_name: str = Path(..., description="服务名称"),
    pipeline_id: int = Path(..., description="Pipeline ID"),
    service_service: ServiceService = Depends(get_service_service)
):
    """设置默认Pipeline"""
    logger.info(f"API层: 设置默认Pipeline请求 - {service_name}, {pipeline_id}")
    
    try:
        result = await service_service.set_default_pipeline(service_name, pipeline_id)
        return {"success": result}
        
    except ValueError as ve:
        logger.warning(f"API层设置默认Pipeline验证错误: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"API层设置默认Pipeline错误: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/services/")
async def list_services():
    """获取服务列表"""
    return {"message": "Service list placeholder"}

@router.get("/{ve_name}", response_model=ServiceListResponse)
async def get_services_by_ve(ve_name: str):
    """根据VE获取服务列表"""
    return await service_service.get_services_by_ve(ve_name)

@router.get("/{ve_name}/{service_id}", response_model=Service)
async def get_service_detail(ve_name: str, service_id: str):
    """获取服务详情"""
    service = await service_service.get_service_by_id(service_id, ve_name)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service
