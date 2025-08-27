from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from ..models.ve import VEListResponse, VEDetail
from ..models.service import ServiceListResponse
from ..services.ve_service import VEService
from ..core.logging import logger

router = APIRouter(prefix="/ve", tags=["Virtual Environment"])

# 创建服务实例
ve_service = VEService()

@router.get("/", response_model=VEListResponse)
async def get_ves(
    search: Optional[str] = Query(None, description="搜索关键字"),
    ve_type: Optional[str] = Query(None, description="VE类型过滤"),
    group: Optional[str] = Query(None, description="组过滤"),
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(50, ge=1, le=100, description="每页数量")
):
    """获取VE列表"""
    try:
        logger.info(f"API请求: 获取VE列表，参数: search={search}, ve_type={ve_type}, group={group}")
        return await ve_service.get_ves(search, ve_type, group, page, page_size)
    except Exception as e:
        logger.error(f"VE列表API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取VE列表失败: {str(e)}")

@router.get("/{ve_name}", response_model=VEDetail)
async def get_ve_detail(ve_name: str):
    """获取VE详情"""
    try:
        logger.info(f"API请求: 获取VE详情 - {ve_name}")
        return await ve_service.get_ve_detail(ve_name)
    except ValueError as e:
        logger.warning(f"VE不存在: {ve_name}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"VE详情API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取VE详情失败: {str(e)}")

@router.get("/{ve_name}/services", response_model=ServiceListResponse)
async def get_ve_services(
    ve_name: str,
    status: Optional[str] = Query(None, description="服务状态过滤"),
    config_filter: Optional[str] = Query(None, description="配置过滤")
):
    """获取VE的服务列表"""
    try:
        logger.info(f"API请求: 获取VE服务列表 - {ve_name}，参数: status={status}, config_filter={config_filter}")
        return await ve_service.get_ve_services(ve_name, status, config_filter)
    except Exception as e:
        logger.error(f"VE服务列表API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取VE服务列表失败: {str(e)}")
