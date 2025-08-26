from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Azure DevOps Configuration
    azure_devops_pat: str
    azure_devops_org: str
    azure_devops_project: str
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    cors_origins: List[str] = ["http://localhost:3000"]
    
    # Logging
    log_level: str = "INFO"
    
    # Cloud Build Configuration
    cloud_build_root: str = "https://cloudbuild.microsoft.com"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Parse CORS origins if it's a string
        if isinstance(self.cors_origins, str):
            self.cors_origins = [origin.strip() for origin in self.cors_origins.split(",")]

def get_settings() -> Settings:
    return Settings()
