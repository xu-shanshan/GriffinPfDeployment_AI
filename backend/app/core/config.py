import os
from pydantic import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    # 应用配置
    app_name: str = "Griffin PF Deployment AI"
    version: str = "1.0.0"
    description: str = "Virtual Environment Management System"
    debug: bool = True
    
    # 服务器配置
    host: str = "0.0.0.0"
    port: int = 8000
    
    # 数据库配置 (如果需要)
    database_url: Optional[str] = None
    
    # API配置
    api_prefix: str = "/api"
    
    # CORS配置
    allowed_origins: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # 日志配置
    log_level: str = "INFO"
    
    # 外部服务配置
    dragon_service_url: Optional[str] = None
    pfgold_service_url: Optional[str] = None
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

# 全局设置实例
settings = Settings()
