import asyncio
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import random
from app.models.ve import VE, VEDetail, VEStats, VEListResponse
from app.models.service import Service, ServiceListResponse
from typing import Optional, List
import logging

logger = logging.getLogger(__name__)

class VEService:
    """VE业务逻辑服务"""
    
    def __init__(self):
        self.mock_data = self._init_mock_data()
    
    def _init_mock_data(self) -> dict:
        """初始化模拟数据"""
        return {
            "ves": [
                {
                    "name": "SovBase",
                    "description": "Base sovereign virtual environment for core services",
                    "ve_type": "B Type VE",
                    "group": "Core",
                    "stats": {
                        "total_services": 89,
                        "deployed_services": 62,
                        "dragon_services": 89,
                        "pfgold_services": 67,
                        "ready_to_deploy": 15
                    },
                    "is_favorite": True,
                    "last_updated": "2 hours ago"
                },
                {
                    "name": "ModelBSov",
                    "description": "Model B sovereign environment",
                    "ve_type": "B Type VE",
                    "group": "Core",
                    "stats": {
                        "total_services": 45,
                        "deployed_services": 30,
                        "dragon_services": 45,
                        "pfgold_services": 35,
                        "ready_to_deploy": 8
                    },
                    "is_favorite": True,
                    "last_updated": "5 hours ago"
                }
            ],
            "services": {
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
                    }
                ]
            }
        }
    
    async def get_ves(
        self, 
        search: Optional[str] = None
    ) -> VEListResponse:
        """获取VE列表"""
        logger.info(f"获取VE列表, 搜索: {search}")
        
        ves = []
        for ve_data in self.mock_data["ves"]:
            if not search or search.lower() in ve_data["name"].lower():
                ves.append(VE(
                    name=ve_data["name"],
                    description=ve_data["description"],
                    ve_type=ve_data["ve_type"],
                    group=ve_data["group"],
                    stats=VEStats(**ve_data["stats"]),
                    is_favorite=ve_data["is_favorite"],
                    last_updated=ve_data["last_updated"]
                ))
        
        return VEListResponse(
            items=ves,
            total_count=len(ves),
            page=1,
            page_size=10,
            has_next=False,
            has_previous=False
        )
    
    async def get_ve_detail(self, ve_name: str) -> Optional[VEDetail]:
        """获取VE详情"""
        logger.info(f"获取VE详情: {ve_name}")
        
        ve_data = next((ve for ve in self.mock_data["ves"] if ve["name"] == ve_name), None)
        if not ve_data:
            return None
        
        return VEDetail(
            name=ve_data["name"],
            description=ve_data["description"],
            ve_type=ve_data["ve_type"],
            group=ve_data["group"],
            stats=VEStats(**ve_data["stats"]),
            is_favorite=ve_data["is_favorite"],
            last_updated=ve_data["last_updated"]
        )
    
    async def get_ve_services(
        self,
        ve_name: str,
        status: Optional[str] = None
    ) -> ServiceListResponse:
        """获取VE下的服务列表"""
        logger.info(f"获取VE服务列表: {ve_name}, 状态: {status}")
        
        services_data = self.mock_data["services"].get(ve_name, [])
        services = []
        
        for service_data in services_data:
            if not status or service_data["status"] == status:
                services.append(Service(**service_data))
        
        return ServiceListResponse(services=services)
            end_idx = start_idx + page_size
            paged_ves = filtered_ves[start_idx:end_idx]
            
            result = VEListResponse(
                items=paged_ves,
                total_count=total_count,
                page=page,
                page_size=page_size,
                has_next=end_idx < total_count,
                has_previous=page > 1
            )
            
            logger.info(f"成功返回{len(paged_ves)}个VE，总共{total_count}个")
            return result
            
        except Exception as e:
            logger.error(f"获取VE列表失败: {str(e)}")
            raise
    
    async def get_ve_detail(self, ve_name: str) -> VEDetail:
        """获取VE详情"""
        try:
            logger.info(f"获取VE详情: {ve_name}")
            
            # 查找VE数据
            ve_data = None
            for ve in self.mock_data["ves"]:
                if ve["name"] == ve_name:
                    ve_data = ve
                    break
            
            if not ve_data:
                raise ValueError(f"VE '{ve_name}' not found")
            
            ve_detail = VEDetail(
                name=ve_data["name"],
                description=ve_data["description"],
                ve_type=ve_data["ve_type"],
                group=ve_data["group"],
                stats=VEStats(**ve_data["stats"]),
                is_favorite=ve_data["is_favorite"],
                last_updated=ve_data["last_updated"]
            )
            
            logger.info(f"成功返回VE详情: {ve_name}")
            return ve_detail
            
        except Exception as e:
            logger.error(f"获取VE详情失败: {str(e)}")
            raise
    
    async def get_ve_services(
        self,
        ve_name: str,
        status: Optional[str] = None,
        config_filter: Optional[str] = None
    ) -> ServiceListResponse:
        """获取VE的服务列表"""
        try:
            logger.info(f"获取VE服务列表: {ve_name}, 状态过滤: {status}, 配置过滤: {config_filter}")
            
            # 获取服务数据
            services_data = self.mock_data["services"].get(ve_name, [])
            
            # 过滤服务
            filtered_services = []
            for service_data in services_data:
                if status and service_data["status"] != status:
                    continue
                    
                if config_filter:
                    if config_filter == "dragon-only" and (not service_data["in_dragon"] or service_data["in_pfgold"]):
                        continue
                    elif config_filter == "pfgold-only" and (not service_data["in_pfgold"] or service_data["in_dragon"]):
                        continue
                    elif config_filter == "both" and (not service_data["in_dragon"] or not service_data["in_pfgold"]):
                        continue
                
                service = Service(**service_data)
                filtered_services.append(service)
            
            result = ServiceListResponse(services=filtered_services)
            logger.info(f"成功返回{len(filtered_services)}个服务")
            return result
            
        except Exception as e:
            logger.error(f"获取VE服务列表失败: {str(e)}")
            raise
        
        return ServiceDetail(
            id=service_name.lower().replace(" ", "_"),
            name=service_name,
            description=self._get_service_description(service_name),
            status=random.choice(list(ServiceStatus)),
            in_dragon=True,
            in_pfgold=random.choice([True, False]),
            current_version=f"20241220.{random.randint(1, 9)}",
            pipelines=pipelines,
            config=ServiceConfig(
                build_type=BuildType(service_config["BuildType"]),
                pipeline_id=service_config.get("PipelineId"),
                incremental_build_pipeline_id=service_config.get("IncrementalBuildPipelineId"),
                ring_promotion_root_path=service_config.get("RingPromotionRootPath"),
                build_root=service_config.get("BuildRoot"),
                ppe_ve_name=service_config.get("PpeVeName"),
                build_path_pattern=service_config.get("BuildPathPattern")
            ),
            deployment_history=deployment_history,
            metrics={
                "cpu_usage": random.randint(20, 80),
                "memory_usage": random.randint(30, 70),
                "success_rate": random.uniform(90, 99.9)
            }
        )

    async def set_favorite(self, ve_name: str, is_favorite: bool):
        """Set VE favorite status"""
        if is_favorite:
            self.favorite_ves.add(ve_name)
        else:
            self.favorite_ves.discard(ve_name)

    def _get_ve_description(self, ve_name: str) -> str:
        """Get VE description"""
        descriptions = {
            "SovBase": "Base sovereign virtual environment for core services",
            "ModelBSov": "Model B sovereign virtual environment",
            "OwaMailB2-SOV": "Outlook Web App Mail B2 services",
            "GraphConnectorsB2-SOV": "Graph Connectors B2 services",
            "FlowControlB2-SOV": "Flow Control B2 services",
            "TodoB2-SOV": "Todo B2 services"
        }
        return descriptions.get(ve_name, f"{ve_name} virtual environment")

    def _get_service_description(self, service_name: str) -> str:
        """Get service description"""
        descriptions = {
            "OwaMailB2": "Outlook Web App Mail Backend",
            "GraphConnectors": "Graph Connectors Service",
            "FlowControl": "Flow Control Service",
            "SignalPatchService": "Signal Patch Service"
        }
        return descriptions.get(service_name, f"{service_name} service")
