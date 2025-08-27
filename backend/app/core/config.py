from pydantic import BaseSettings
from typing import List

class Settings(BaseSettings):
    # App基础配置
    app_name: str = "Griffin PF Deployment AI"
    description: str = "Griffin PF Deployment AI Backend API"
    version: str = "1.0.0"
    debug: bool = True
    
    # 服务器配置
    host: str = "0.0.0.0"
    port: int = 8000
    api_prefix: str = "/api/v1"
    
    # CORS配置
    allowed_origins: List[str] = ["*"]
    
    # 日志配置
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"

settings = Settings()
        env_file = ".env"
        env_file_encoding = 'utf-8'

# 全局设置实例
settings = Settings()
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

# 全局设置实例
settings = Settings()
