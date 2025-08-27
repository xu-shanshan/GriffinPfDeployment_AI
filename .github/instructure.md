Prompt 要求： 

1. 检查前端代码的同时需要考虑后端代码，并记住，前后端技术栈是
- Frontend: React, typescript，Fluent UI v9, axios/fetch
- Backend: Python + FastAPI, httpx, pydantic, python-dotenv

2. 按照FastAPI最佳实践，将后端代码模块化重构，分离组件
   架构模式: Repository → Service → Router (符合FastAPI最佳实践)
   举个例子：
            1. 核心模块:
            - core/config.py - 应用配置
            - core/logging.py - 日志配置
            - core/mock_data.py - Mock数据

            2. 数据模型:
            - models/ve_model.py - VE模型

            3. 仓储层:
            - repositories/base_repository.py - 仓储基类
            - repositories/ve_repository.py - VE数据访问

            4. 服务层:
            - services/ve_service.py - VE业务逻辑

            5. API路由:
            - api/ve_routes.py - VE路由实现

<!-- 3. 按照: React, typescript，Fluent UI v9最佳实践，将前端代码模块化重构，分离组件 -->


2. 修改代码后， 需要检查后没有红色告警，要修复。



