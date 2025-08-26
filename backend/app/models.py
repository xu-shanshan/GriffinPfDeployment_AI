from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class VEType(str, Enum):
    B_TYPE = "B Type"
    B2_TYPE = "B2 Type"

class ServiceStatus(str, Enum):
    READY = "ready"
    NOT_DEPLOYED = "not-deployed"
    PREPARED = "prepared"
    MISSING_PFGOLD = "missing-pfgold"
    CONFIG_ERROR = "config-error"
    DEPLOYED = "deployed"

class DeploymentStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELLED = "cancelled"

class BuildType(str, Enum):
    RING_PROMOTION = "RingPromotion"
    INCREMENTAL = "Incremental"
    MAINLINE = "Mainline"

# Request Models
class DeploymentRequest(BaseModel):
    ve_name: str
    service_names: List[str]
    pipeline_id: Optional[int] = None
    build_version: Optional[str] = None
    force_deploy: bool = False

class BulkDeploymentRequest(BaseModel):
    deployments: List[DeploymentRequest]

# Service Models
class PipelineInfo(BaseModel):
    pipeline_id: int
    name: str
    latest_build: Optional[str] = None
    drop_url: Optional[str] = None
    build_type: BuildType
    is_default: bool = False

class ServiceConfig(BaseModel):
    build_type: BuildType
    pipeline_id: Optional[int] = None
    incremental_build_pipeline_id: Optional[int] = None
    mainline_build_pipeline_id: Optional[int] = None
    ring_promotion_root_path: Optional[str] = None
    build_root: Optional[str] = None
    ppe_ve_name: Optional[str] = None
    build_path_pattern: Optional[str] = None

class ServiceResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    status: ServiceStatus
    in_dragon: bool = False
    in_pfgold: bool = False
    current_version: Optional[str] = None
    pipelines: List[PipelineInfo] = []
    config: Optional[ServiceConfig] = None
    ready_to_deploy: bool = False
    last_deployment: Optional[datetime] = None
    
class ServiceDetail(ServiceResponse):
    deployment_history: List[Dict[str, Any]] = []
    metrics: Optional[Dict[str, Any]] = None

# VE Models
class VEStats(BaseModel):
    total_services: int
    deployed_services: int
    dragon_services: int
    pfgold_services: int
    ready_to_deploy: int

class VEResponse(BaseModel):
    name: str
    description: Optional[str] = None
    ve_type: VEType
    group: str
    services: List[ServiceResponse] = []
    stats: VEStats
    is_favorite: bool = False
    last_updated: Optional[datetime] = None

class VEListItem(BaseModel):
    name: str
    description: Optional[str] = None
    ve_type: VEType
    group: str
    stats: VEStats
    is_favorite: bool = False
    last_updated: Optional[datetime] = None

# Deployment Models
class DeploymentResponse(BaseModel):
    deployment_id: str
    ve_name: str
    service_names: List[str]
    status: DeploymentStatus
    pipeline_id: Optional[int] = None
    build_version: Optional[str] = None
    started_at: datetime
    completed_at: Optional[datetime] = None
    logs: List[str] = []
    error_message: Optional[str] = None

class DeploymentHistory(BaseModel):
    deployments: List[DeploymentResponse]
    total_count: int
    page: int
    page_size: int

# Dashboard Models
class DashboardStats(BaseModel):
    total_ves: int
    active_services: int
    recent_deployments: int
    success_rate: float
    favorite_ves: List[VEListItem]

# Search and Filter Models
class SearchFilters(BaseModel):
    query: Optional[str] = None
    ve_type: Optional[VEType] = None
    group: Optional[str] = None
    status: Optional[ServiceStatus] = None
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)

class SearchResults(BaseModel):
    items: List[VEListItem]
    total_count: int
    page: int
    page_size: int
    has_next: bool
    has_previous: bool
