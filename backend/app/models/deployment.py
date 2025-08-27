from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class DeploymentItem(BaseModel):
    id: str
    ve_name: str
    service_names: List[str]
    status: str
    started_at: str
    completed_at: Optional[str] = None
    build_version: str
    deployed_by: str
    duration: Optional[str] = None

class DeploymentHistoryResponse(BaseModel):
    items: List['DeploymentItem']
    total_count: int
    page: int
    page_size: int

class DeploymentCreateRequest(BaseModel):
    service_names: List[str]
    pipeline_id: Optional[int] = None
    build_version: Optional[str] = None
    ve_name: str
