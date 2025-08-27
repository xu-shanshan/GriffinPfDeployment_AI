from fastapi import APIRouter, HTTPException, Path, Query, Depends
from app.services.ve_service import VEService
from app.repositories.ve_repository import VERepository
from app.models.ve import VEListResponse, VEDetailResponse, VEServicesResponse
from typing import Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/ve", tags=["virtual-environments"])

def get_ve_repository() -> VERepository:
    return VERepository()

def get_ve_service(repository: VERepository = Depends(get_ve_repository)) -> VEService:
    return VEService(repository)

@router.get("", response_model=VEListResponse)
async def get_virtual_environments(
    search: Optional[str] = Query(None, description="搜索关键词"),
    ve_type: Optional[str] = Query(None, description="VE类型"),
    group: Optional[str] = Query(None, description="VE组"),
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="页大小"),
    ve_service: VEService = Depends(get_ve_service)
):
    logger.info(f"API层: 获取VE列表请求 - 搜索:{search}, 类型:{ve_type}, 组:{group}")
    try:
        ve_list = await ve_service.get_ve_list(search, ve_type, group, page, page_size)
        return ve_list
    except Exception as e:
        logger.error(f"API层获取VE列表错误: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{ve_name}", response_model=VEDetailResponse)
async def get_ve_detail(
    ve_name: str = Path(..., description="VE名称"),
    ve_service: VEService = Depends(get_ve_service)
):
    logger.info(f"API层: 获取VE详情请求 - {ve_name}")
    try:
        ve_detail = await ve_service.get_ve_detail(ve_name)
        if not ve_detail:
            raise HTTPException(status_code=404, detail=f"VE not found: {ve_name}")
        return ve_detail
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"API层获取VE详情错误: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{ve_name}/services", response_model=VEServicesResponse)
async def get_ve_services(
    ve_name: str = Path(..., description="VE名称"),
    status: Optional[str] = Query(None, description="服务状态过滤"),
    config_filter: Optional[str] = Query(None, description="配置过滤器"),
    ve_service: VEService = Depends(get_ve_service)
):
    logger.info(f"API层: 获取VE服务列表请求 - {ve_name}, 状态:{status}, 配置:{config_filter}")
    try:
        services = await ve_service.get_ve_services(ve_name, status, config_filter)
        return services
    except Exception as e:
        logger.error(f"API层获取VE服务列表错误: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    ve_service: VEService = Depends(get_ve_service)
):
    """获取VE下的服务列表"""
    logger.info(f"API层: 获取VE服务列表请求 - {ve_name}, 状态:{status}, 配置:{config_filter}")
    
    try:
        services = await ve_service.get_ve_services(ve_name, status, config_filter)
        return services
        
    except Exception as e:
        logger.error(f"API层获取VE服务列表错误: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
