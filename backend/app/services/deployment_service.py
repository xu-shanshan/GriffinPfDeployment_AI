import asyncio
import uuid
from typing import List, Optional
from datetime import datetime, timedelta
import random

from ..models import *
from .base_service import BaseService

class DeploymentService(BaseService):
    def __init__(self, settings):
        super().__init__(settings)
        
        # Mock deployment storage (in production this would be in database)
        self.deployments: Dict[str, DeploymentResponse] = {}

    async def deploy(self, request: DeploymentRequest) -> DeploymentResponse:
        """Deploy service(s) to a virtual environment"""
        deployment_id = str(uuid.uuid4())
        
        deployment = DeploymentResponse(
            deployment_id=deployment_id,
            ve_name=request.ve_name,
            service_names=request.service_names,
            status=DeploymentStatus.PENDING,
            pipeline_id=request.pipeline_id,
            build_version=request.build_version or f"20241220.{random.randint(1, 9)}",
            started_at=datetime.now(),
            logs=[f"Deployment {deployment_id} initiated for {len(request.service_names)} services"]
        )
        
        self.deployments[deployment_id] = deployment
        
        # Simulate async deployment
        asyncio.create_task(self._simulate_deployment(deployment_id))
        
        return deployment

    async def bulk_deploy(self, request: BulkDeploymentRequest) -> List[DeploymentResponse]:
        """Deploy multiple services across virtual environments"""
        deployments = []
        
        for deployment_req in request.deployments:
            deployment = await self.deploy(deployment_req)
            deployments.append(deployment)
        
        return deployments

    async def get_deployment_history(
        self, 
        page: int = 1, 
        page_size: int = 20,
        ve_name: Optional[str] = None,
        status: Optional[DeploymentStatus] = None
    ) -> DeploymentHistory:
        """Get deployment history"""
        
        # Filter deployments
        filtered_deployments = list(self.deployments.values())
        
        if ve_name:
            filtered_deployments = [d for d in filtered_deployments if d.ve_name == ve_name]
        
        if status:
            filtered_deployments = [d for d in filtered_deployments if d.status == status]
        
        # Sort by start time (newest first)
        filtered_deployments.sort(key=lambda x: x.started_at, reverse=True)
        
        # Pagination
        total_count = len(filtered_deployments)
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        deployments = filtered_deployments[start_idx:end_idx]
        
        return DeploymentHistory(
            deployments=deployments,
            total_count=total_count,
            page=page,
            page_size=page_size
        )

    async def get_deployment(self, deployment_id: str) -> Optional[DeploymentResponse]:
        """Get specific deployment details"""
        return self.deployments.get(deployment_id)

    async def cancel_deployment(self, deployment_id: str):
        """Cancel a running deployment"""
        deployment = self.deployments.get(deployment_id)
        if deployment and deployment.status == DeploymentStatus.RUNNING:
            deployment.status = DeploymentStatus.CANCELLED
            deployment.completed_at = datetime.now()
            deployment.logs.append(f"Deployment {deployment_id} cancelled by user")

    async def _simulate_deployment(self, deployment_id: str):
        """Simulate deployment progress"""
        deployment = self.deployments[deployment_id]
        
        # Wait a bit then start
        await asyncio.sleep(2)
        deployment.status = DeploymentStatus.RUNNING
        deployment.logs.append("Deployment started")
        
        # Simulate deployment steps
        steps = [
            "Validating service configurations",
            "Downloading build artifacts",
            "Preparing deployment environment",
            "Deploying services",
            "Running health checks",
            "Updating service registry"
        ]
        
        for i, step in enumerate(steps):
            await asyncio.sleep(random.uniform(1, 3))
            deployment.logs.append(f"Step {i+1}/{len(steps)}: {step}")
            
            # Random chance of failure
            if random.random() < 0.1:  # 10% failure rate
                deployment.status = DeploymentStatus.FAILED
                deployment.completed_at = datetime.now()
                deployment.error_message = f"Deployment failed during: {step}"
                deployment.logs.append(f"ERROR: {deployment.error_message}")
                return
        
        # Success
        deployment.status = DeploymentStatus.SUCCESS
        deployment.completed_at = datetime.now()
        deployment.logs.append("Deployment completed successfully")
