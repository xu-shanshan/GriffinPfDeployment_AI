import logging
import sys
from typing import Any

# 配置日志格式
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger("griffin_pf_ai")
    logger.setLevel(getattr(logging, settings.log_level.upper()))
    
    # 避免重复添加handler
    if logger.handlers:
        return logger
    
    # 创建控制台handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.DEBUG)
    
    # 创建格式化器
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    console_handler.setFormatter(formatter)
    
    # 添加handler到logger
    logger.addHandler(console_handler)
    
    return logger

# 创建全局logger实例
logger = setup_logging()
