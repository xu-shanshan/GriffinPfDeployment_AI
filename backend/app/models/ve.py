from pydantic import BaseModel
from typing import Optional, Dict, List, Any
from enum import Enum

class VEType(str, Enum):
    B_TYPE = "B Type"
    B2_TYPE = "B2 Type"

class VEStats(BaseModel):
    total_services: int
    deployed_services: int
    dragon_services: int
    pfgold_services: int
    ready_to_deploy: int

class VEModel(BaseModel):
    name: str
    description: str
    ve_type: VEType
    group: str
    stats: VEStats
    is_favorite: Optional[bool] = False
    last_updated: Optional[str] = None

class ServiceModel(BaseModel):
    id: str
    name: str
    description: str
    status: str
    in_dragon: bool
    in_pfgold: bool
    current_version: Optional[str]
    pipeline: Optional[str]
    pipeline_version: Optional[str]
    icon: str
    icon_color: str
    ready_to_deploy: bool

class VEDetailResponse(BaseModel):
    name: str
    description: str
    ve_type: VEType
    group: str
    stats: VEStats
    is_favorite: Optional[bool] = False
    last_updated: Optional[str] = None

class VEListResponse(BaseModel):
    items: List[VEModel]
    total_count: int
    page: int
    page_size: int
    has_next: bool
    has_previous: bool

class VEServicesResponse(BaseModel):
    services: List[ServiceModel]
