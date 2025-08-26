import asyncio
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import random

from ..models import *
from .base_service import BaseService

class VEService(BaseService):
    def __init__(self, settings):
        super().__init__(settings)
        
        # Mock favorite VEs (in production this would be in database)
        self.favorite_ves = {"SovBase", "ModelBSov", "OwaMailB2-SOV"}

    async def get_dashboard_stats(self) -> DashboardStats:
        """Get dashboard statistics"""
        config_data = self.load_config_data()
        
        # Calculate stats from config
        all_ves = []
        for group_name, ves in config_data["ExpectedVEs"].items():
            for ve_name in ves:
                ve_type = VEType.B2_TYPE if ve_name.endswith("-SOV") else VEType.B_TYPE
                services = config_data["ExpectedServices"].get(ve_name, [])
                
                stats = VEStats(
                    total_services=len(services),
                    deployed_services=random.randint(0, len(services)),
                    dragon_services=len(services),
                    pfgold_services=random.randint(0, len(services)),
                    ready_to_deploy=random.randint(0, 5)
                )
                
                all_ves.append(VEListItem(
                    name=ve_name,
                    description=self._get_ve_description(ve_name),
                    ve_type=ve_type,
                    group=group_name,
                    stats=stats,
                    is_favorite=ve_name in self.favorite_ves,
                    last_updated=datetime.now() - timedelta(hours=random.randint(1, 24))
                ))
        
        # Get favorite VEs
        favorite_ves = [ve for ve in all_ves if ve.is_favorite][:5]
        
        return DashboardStats(
            total_ves=len(all_ves),
            active_services=sum(ve.stats.deployed_services for ve in all_ves),
            recent_deployments=random.randint(15, 30),
            success_rate=95.6,
            favorite_ves=favorite_ves
        )

    async def search_ves(self, filters: SearchFilters) -> SearchResults:
        """Search virtual environments with filters"""
        config_data = self.load_config_data()
        
        all_ves = []
        for group_name, ves in config_data["ExpectedVEs"].items():
            for ve_name in ves:
                # Apply filters
                if filters.query and filters.query.lower() not in ve_name.lower():
                    continue
                
                ve_type = VEType.B2_TYPE if ve_name.endswith("-SOV") else VEType.B_TYPE
                if filters.ve_type and filters.ve_type != ve_type:
                    continue
                    
                if filters.group and filters.group != group_name:
                    continue
                
                services = config_data["ExpectedServices"].get(ve_name, [])
                stats = VEStats(
                    total_services=len(services),
                    deployed_services=random.randint(0, len(services)),
                    dragon_services=len(services),
                    pfgold_services=random.randint(0, len(services)),
                    ready_to_deploy=random.randint(0, 5)
                )
                
                all_ves.append(VEListItem(
                    name=ve_name,
                    description=self._get_ve_description(ve_name),
                    ve_type=ve_type,
                    group=group_name,
                    stats=stats,
                    is_favorite=ve_name in self.favorite_ves,
                    last_updated=datetime.now() - timedelta(hours=random.randint(1, 24))
                ))
        
        # Pagination
        total_count = len(all_ves)
        start_idx = (filters.page - 1) * filters.page_size
        end_idx = start_idx + filters.page_size
        items = all_ves[start_idx:end_idx]
        
        return SearchResults(
            items=items,
            total_count=total_count,
            page=filters.page,
            page_size=filters.page_size,
            has_next=end_idx < total_count,
            has_previous=filters.page > 1
        )

    async def get_ve_details(self, ve_name: str) -> Optional[VEResponse]:
        """Get detailed VE information"""
        config_data = self.load_config_data()
        
        # Find VE in config
        ve_group = None
        for group_name, ves in config_data["ExpectedVEs"].items():
            if ve_name in ves:
                ve_group = group_name
                break
        
        if not ve_group:
            return None
        
        services = config_data["ExpectedServices"].get(ve_name, [])
        service_responses = []
        
        for service_name in services:
            service_config = config_data["Services"].get(service_name)
            pipelines = []
            
            if service_config:
                # Create pipeline info
                if service_config.get("PipelineId"):
                    pipelines.append(PipelineInfo(
                        pipeline_id=service_config["PipelineId"],
                        name="Main Pipeline",
                        latest_build=f"20241220.{random.randint(1, 9)}",
                        drop_url=service_config.get("BuildPathPattern", "").replace("<BuildVersion>", f"20241220.{random.randint(1, 9)}"),
                        build_type=BuildType.RING_PROMOTION,
                        is_default=True
                    ))
                
                if service_config.get("IncrementalBuildPipelineId"):
                    pipelines.append(PipelineInfo(
                        pipeline_id=service_config["IncrementalBuildPipelineId"],
                        name="Incremental Build",
                        latest_build=f"20241220.{random.randint(1, 9)}",
                        drop_url=service_config.get("BuildPathPattern", "").replace("<BuildVersion>", f"20241220.{random.randint(1, 9)}"),
                        build_type=BuildType.INCREMENTAL,
                        is_default=False
                    ))
            
            # Mock service status
            status = random.choice(list(ServiceStatus))
            
            service_responses.append(ServiceResponse(
                id=service_name.lower().replace(" ", "_"),
                name=service_name,
                description=self._get_service_description(service_name),
                status=status,
                in_dragon=True,
                in_pfgold=random.choice([True, False]),
                current_version=f"v{random.randint(1, 5)}.{random.randint(0, 9)}.{random.randint(100, 999)}" if status == ServiceStatus.DEPLOYED else None,
                pipelines=pipelines,
                ready_to_deploy=random.choice([True, False]) if status == ServiceStatus.NOT_DEPLOYED else False,
                last_deployment=datetime.now() - timedelta(hours=random.randint(1, 72)) if status == ServiceStatus.DEPLOYED else None
            ))
        
        stats = VEStats(
            total_services=len(services),
            deployed_services=len([s for s in service_responses if s.status == ServiceStatus.DEPLOYED]),
            dragon_services=len([s for s in service_responses if s.in_dragon]),
            pfgold_services=len([s for s in service_responses if s.in_pfgold]),
            ready_to_deploy=len([s for s in service_responses if s.ready_to_deploy])
        )
        
        ve_type = VEType.B2_TYPE if ve_name.endswith("-SOV") else VEType.B_TYPE
        
        return VEResponse(
            name=ve_name,
            description=self._get_ve_description(ve_name),
            ve_type=ve_type,
            group=ve_group,
            services=service_responses,
            stats=stats,
            is_favorite=ve_name in self.favorite_ves,
            last_updated=datetime.now() - timedelta(hours=random.randint(1, 24))
        )

    async def get_ve_services(self, ve_name: str) -> List[ServiceResponse]:
        """Get services for a specific VE"""
        ve_details = await self.get_ve_details(ve_name)
        return ve_details.services if ve_details else []

    async def get_service_detail(self, service_name: str) -> Optional[ServiceDetail]:
        """Get detailed service information"""
        config_data = self.load_config_data()
        service_config = config_data["Services"].get(service_name)
        
        if not service_config:
            return None
        
        # Create pipeline info
        pipelines = []
        if service_config.get("PipelineId"):
            pipelines.append(PipelineInfo(
                pipeline_id=service_config["PipelineId"],
                name="Main Pipeline",
                latest_build=f"20241220.{random.randint(1, 9)}",
                drop_url=service_config.get("BuildPathPattern", "").replace("<BuildVersion>", f"20241220.{random.randint(1, 9)}"),
                build_type=BuildType.RING_PROMOTION,
                is_default=True
            ))
        
        # Mock deployment history
        deployment_history = [
            {
                "deployment_id": f"deploy-{random.randint(1000, 9999)}",
                "timestamp": (datetime.now() - timedelta(hours=i)).isoformat(),
                "status": random.choice(["success", "failed"]),
                "version": f"20241220.{random.randint(1, 9)}",
                "pipeline_id": service_config.get("PipelineId")
            }
            for i in range(1, 6)
        ]
        
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
