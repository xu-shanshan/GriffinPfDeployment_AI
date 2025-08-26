import random
from typing import List, Dict, Any, Optional

from .base_service import BaseService

class BuildService(BaseService):
    async def get_service_builds(self, service_name: str, pipeline_id: Optional[int] = None) -> Dict[str, Any]:
        """Get available builds for a service"""
        
        # Mock build data
        builds = []
        for i in range(1, 10):
            build_version = f"20241220.{i}"
            builds.append({
                "version": build_version,
                "pipeline_id": pipeline_id or random.randint(1000, 9999),
                "created_at": f"2024-12-20T{random.randint(10, 23):02d}:{random.randint(10, 59):02d}:00Z",
                "status": random.choice(["success", "failed", "running"]),
                "drop_url": f"VSO://https://artifacts.visualstudio.com/.../drops/{service_name}_ms/{build_version}?root=autopilot",
                "commit_id": f"abc123{random.randint(100, 999)}",
                "author": random.choice(["john.doe", "jane.smith", "bob.wilson"])
            })
        
        return {
            "service_name": service_name,
            "pipeline_id": pipeline_id,
            "builds": builds
        }

    async def get_latest_build(self, service_name: str, pipeline_id: int) -> Optional[Dict[str, Any]]:
        """Get latest build for a service pipeline"""
        builds = await self.get_service_builds(service_name, pipeline_id)
        successful_builds = [b for b in builds["builds"] if b["status"] == "success"]
        
        return successful_builds[0] if successful_builds else None
