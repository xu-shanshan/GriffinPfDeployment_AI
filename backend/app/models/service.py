from pydantic import BaseModel
from typing import List, Optional

class Pipeline(BaseModel):
    id: int
    name: str
    description: str
    type: str
    is_default: bool
    latest_build: str
    drop_url: str
    icon: str

class Service(BaseModel):
    id: str
    name: str
    description: Optional[str]
    status: str
    in_dragon: bool
    in_pfgold: bool
    current_version: Optional[str]
    pipeline: Optional[str]
    pipeline_version: Optional[str]
    icon: Optional[str]
    icon_color: Optional[str]
    ready_to_deploy: bool

class ServiceDetail(BaseModel):
    name: str
    description: str
    status: str
    version: Optional[str]  # 修复：允许为 None
    build_type: str
    service_type: str
    last_deploy: Optional[str]  # 修复：允许为 None
    active_pipelines: int
    is_favorite: bool
    pipelines: List[Pipeline]
    config: dict

class ServiceDetailResponse(BaseModel):
    data: ServiceDetail

class ServiceListResponse(BaseModel):
    items: List[Service]
    ve_name: str
    total_count: int

class ConfigUpdateRequest(BaseModel):
    config: dict
    create_pr: bool = True
