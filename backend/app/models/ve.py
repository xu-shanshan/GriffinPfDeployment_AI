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

class VE(BaseModel):
    name: str
    description: Optional[str]
    ve_type: Optional[str]
    group: Optional[str]
    stats: VEStats
    is_favorite: bool
    last_updated: str

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

class VEItem(BaseModel):
    name: str
    type: str
    group: str
    status: str

class VEListResponse(BaseModel):
    items: List[VE]
    total_count: int

class VEDetailResponse(BaseModel):
    name: str
    type: str
    group: str
    status: str
    services: Optional[list] = []

class VEServiceItem(BaseModel):
    name: str
    status: str

class VEServicesResponse(BaseModel):
    services: List[VEServiceItem]
