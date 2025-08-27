from typing import Optional, Dict, Any, List
import logging
from app.models.ve import VEListResponse, VEDetailResponse, VEServicesResponse, VEItem, VEServiceItem

logger = logging.getLogger(__name__)

class VERepository:
    """VE数据访问层"""
    
    def __init__(self):
        # Mock数据存储 - 在实际项目中这里会连接真实数据库
        self._mock_ves = self._init_mock_ves()
        self._mock_services = self._init_mock_services()
    
    def _init_mock_ves(self) -> List[Dict[str, Any]]:
        """初始化Mock VE数据"""
        return [
            {
                "name": "SovBase",
                "description": "Base sovereign virtual environment for core services",
                "ve_type": "B Type",
                "group": "SovBaseVEs",
                "stats": {
                    "total_services": 67,
                    "deployed_services": 62,
                    "dragon_services": 89,
                    "pfgold_services": 67,
                    "ready_to_deploy": 5
                },
                "is_favorite": True,
                "last_updated": "2024-12-20T14:00:00Z"
            },
            {
                "name": "ModelBSov",
                "description": "Model B sovereign virtual environment",
                "ve_type": "B Type",
                "group": "ModelBSovVEs",
                "stats": {
                    "total_services": 65,
                    "deployed_services": 58,
                    "dragon_services": 65,
                    "pfgold_services": 62,
                    "ready_to_deploy": 7
                },
                "is_favorite": True,
                "last_updated": "2024-12-20T08:00:00Z"
            },
            {
                "name": "OwaMailB2-SOV",
                "description": "Outlook Web App Mail B2 services",
                "ve_type": "B2 Type",
                "group": "ModelB2SovVEs",
                "stats": {
                    "total_services": 1,
                    "deployed_services": 1,
                    "dragon_services": 1,
                    "pfgold_services": 1,
                    "ready_to_deploy": 0
                },
                "is_favorite": True,
                "last_updated": "2024-12-20T14:00:00Z"
            },
            {
                "name": "GraphConnectorsB2-SOV",
                "description": "Graph Connectors B2 services",
                "ve_type": "B2 Type",
                "group": "ModelB2SovVEs",
                "stats": {
                    "total_services": 1,
                    "deployed_services": 0,
                    "dragon_services": 1,
                    "pfgold_services": 0,
                    "ready_to_deploy": 1
                },
                "is_favorite": False,
                "last_updated": "2024-12-20T10:00:00Z"
            },
            {
                "name": "FlowControlB2-SOV",
                "description": "Flow Control B2 services",
                "ve_type": "B2 Type",
                "group": "ModelB2SovVEs",
                "stats": {
                    "total_services": 1,
                    "deployed_services": 0,
                    "dragon_services": 1,
                    "pfgold_services": 0,
                    "ready_to_deploy": 0
                },
                "is_favorite": False,
                "last_updated": "2024-12-20T12:00:00Z"
            },
            {
                "name": "TodoB2-SOV",
                "description": "Todo B2 services",
                "ve_type": "B2 Type",
                "group": "ModelB2SovVEs",
                "stats": {
                    "total_services": 1,
                    "deployed_services": 1,
                    "dragon_services": 1,
                    "pfgold_services": 1,
                    "ready_to_deploy": 0
                },
                "is_favorite": False,
                "last_updated": "2024-12-20T11:00:00Z"
            }
        ]
    
    def _init_mock_services(self) -> Dict[str, List[Dict[str, Any]]]:
        """初始化Mock服务数据"""
        return {
            "SovBase": [
                {
                    "id": "owamailb2",
                    "name": "OwaMailB2",
                    "description": "Outlook Web App Mail Backend",
                    "status": "ready",
                    "in_dragon": True,
                    "in_pfgold": True,
                    "current_version": "v2.1.234",
                    "pipeline": "ExchangeMailPipeline",
                    "pipeline_version": "v3.2.1",
                    "icon": "mail",
                    "icon_color": "blue",
                    "ready_to_deploy": True
                },
                {
                    "id": "graphconnectors",
                    "name": "GraphConnectors",
                    "description": "Graph Connectors Service",
                    "status": "not-deployed",
                    "in_dragon": True,
                    "in_pfgold": True,
                    "current_version": None,
                    "pipeline": "GraphConnectorsPipeline",
                    "pipeline_version": "v2.8.5",
                    "icon": "flash",
                    "icon_color": "orange",
                    "ready_to_deploy": False
                },
                {
                    "id": "flowcontrol",
                    "name": "FlowControl",
                    "description": "Flow Control Service",
                    "status": "missing-pfgold",
                    "in_dragon": True,
                    "in_pfgold": False,
                    "current_version": None,
                    "pipeline": "FlowControlPipeline",
                    "pipeline_version": "v1.9.3",
                    "icon": "activity",
                    "icon_color": "yellow",
                    "ready_to_deploy": False
                },
                {
                    "id": "invalidservice",
                    "name": "InvalidService",
                    "description": "Service not in Dragon map",
                    "status": "config-error",
                    "in_dragon": False,
                    "in_pfgold": True,
                    "current_version": "v1.0.0",
                    "pipeline": None,
                    "pipeline_version": None,
                    "icon": "alert",
                    "icon_color": "red",
                    "ready_to_deploy": False
                }
            ]
        }
    
    async def get_all_ves(self) -> List[Dict[str, Any]]:
        """获取所有VE数据"""
        try:
            logger.info("Repository层: 获取所有VE数据")
            return self._mock_ves
        except Exception as e:
            logger.error(f"获取VE数据Repository层错误: {str(e)}")
            raise
    
    async def get_ve_by_name(self, ve_name: str) -> Optional[Dict[str, Any]]:
        """根据VE名称获取VE数据"""
        try:
            logger.info(f"Repository层: 获取VE数据 - {ve_name}")
            return next((ve for ve in self._mock_ves if ve["name"] == ve_name), None)
        except Exception as e:
            logger.error(f"获取VE数据Repository层错误: {str(e)}")
            raise
    
    async def get_ve_services(self, ve_name: str) -> List[Dict[str, Any]]:
        """获取VE下的服务列表"""
        try:
            logger.info(f"Repository层: 获取VE服务列表 - {ve_name}")
            return self._mock_services.get(ve_name, [])
        except Exception as e:
            logger.error(f"获取VE服务列表Repository层错误: {str(e)}")
            raise
    
    async def get_favorite_ves(self) -> List[Dict[str, Any]]:
        """获取收藏的VE列表"""
        try:
            logger.info("Repository层: 获取收藏VE列表")
            return [ve for ve in self._mock_ves if ve.get("is_favorite", False)]
        except Exception as e:
            logger.error(f"获取收藏VE列表Repository层错误: {str(e)}")
            raise

    async def fetch_list(self, search, ve_type, group, page, page_size) -> VEListResponse:
        items = []
        for ve in self._mock_ves.values():
            if search and search not in ve["name"]:
                continue
            if ve_type and ve_type != ve["type"]:
                continue
            if group and group != ve["group"]:
                continue
            items.append(VEItem(name=ve["name"], type=ve["type"], group=ve["group"], status=ve["status"]))
        total = len(items)
        return VEListResponse(ves=items[(page-1)*page_size:page*page_size], total=total)

    async def fetch_detail(self, ve_name: str) -> Optional[VEDetailResponse]:
        ve = self._mock_ves.get(ve_name)
        if not ve:
            return None
        return VEDetailResponse(**ve)

    async def fetch_services(self, ve_name: str, status: Optional[str], config_filter: Optional[str]) -> VEServicesResponse:
        ve = self._mock_ves.get(ve_name)
        if not ve:
            return VEServicesResponse(services=[])
        services = [VEServiceItem(**s) for s in ve.get("services", [])]
        if status:
            services = [s for s in services if s.status == status]
        return VEServicesResponse(services=services)
        # config_filter 可按需实现
        return VEServicesResponse(services=services)
