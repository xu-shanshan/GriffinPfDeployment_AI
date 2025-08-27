from pydantic import BaseModel
from typing import List, Optional

class VEStats(BaseModel):
    total_services: int
    deployed_services: int
    dragon_services: int
    pfgold_services: int
    ready_to_deploy: int

class VE(BaseModel):
    name: str
    description: str
    ve_type: str
    group: str
    stats: VEStats
    is_favorite: bool
    last_updated: str

class VEDetail(BaseModel):
    name: str
    description: str
    ve_type: str
    group: str
    stats: VEStats
    is_favorite: bool
    last_updated: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class VEListResponse(BaseModel):
    items: List[VE]
    total_count: int
    page: int
    page_size: int
    has_next: bool
    has_previous: bool
