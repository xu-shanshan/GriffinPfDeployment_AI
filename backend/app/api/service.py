from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from ..models.service import ServiceDetail, ConfigUpdateRequest
from ..services.service_service import ServiceService
from ..core.logging import logger

router = APIRouter(prefix="/service", tags=["Service"])

# 创建服务实例
service_service = ServiceService()

@router.get("/{service_name}", response_model=ServiceDetail)
async def get_service_detail(
    service_name: str,
    ve_name: Optional[str] = Query(None, description="VE名称")
):
    """获取服务详情"""
    try:
        logger.info(f"API请求: 获取服务详情 - {service_name}")
        return await service_service.get_service_detail(service_name, ve_name)
    except ValueError as e:
        logger.warning(f"服务不存在: {service_name}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"服务详情API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取服务详情失败: {str(e)}")

@router.put("/{service_name}/config")
async def update_service_config(
    service_name: str,
    config_request: ConfigUpdateRequest
):
    """更新服务配置"""
    try:
        logger.info(f"API请求: 更新服务配置 - {service_name}")
        return await service_service.update_service_config(service_name, config_request)
    except ValueError as e:
        logger.warning(f"服务不存在: {service_name}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"更新服务配置API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"更新服务配置失败: {str(e)}")

@router.put("/{service_name}/pipeline/{pipeline_id}/default")
async def set_default_pipeline(
    service_name: str,
    pipeline_id: int
):
    """设置默认Pipeline"""
    try:
        logger.info(f"API请求: 设置默认Pipeline - 服务: {service_name}, Pipeline: {pipeline_id}")
        return await service_service.set_default_pipeline(service_name, pipeline_id)
    except ValueError as e:
        logger.warning(f"服务或Pipeline不存在: {service_name}, {pipeline_id}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"设置默认Pipeline API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"设置默认Pipeline失败: {str(e)}")
