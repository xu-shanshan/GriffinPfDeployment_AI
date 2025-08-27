from fastapi import APIRouter, Depends, HTTPException
from app.models.service import ServiceDetail, ConfigUpdateRequest
from app.services.service_service import ServiceService
from typing import Optional

router = APIRouter(prefix="/api", tags=["services"])

def get_service_service() -> ServiceService:
    return ServiceService()

@router.get("/service/{service_name}", response_model=ServiceDetail)
async def get_service_detail(
    service_name: str,
    ve_name: Optional[str] = None,
    service_service: ServiceService = Depends(get_service_service)
):
    """获取服务详情"""
    service = await service_service.get_service_detail(service_name, ve_name)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service