from abc import ABC, abstractmethod
from typing import Any, Dict

class BaseRepository(ABC):
    """仓储层基类"""
    
    def __init__(self):
        # 可在此处初始化数据库连接等
        pass
    
    @abstractmethod
    async def get_data(self) -> Dict[str, Any]:
        """获取数据的抽象方法"""
        pass
