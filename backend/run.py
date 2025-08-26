#!/usr/bin/env python3

import uvicorn
import sys
import os

# 添加当前目录到Python路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    """启动FastAPI应用"""
    print("🚀 启动Griffin PF Deployment AI后端服务...")
    print("📍 API地址: http://localhost:8000")
    print("📚 API文档: http://localhost:8000/docs")
    print("🔄 开发模式：代码变更自动重载")
    print("⏹️  按Ctrl+C停止服务\n")
    
    try:
        uvicorn.run(
            "app.main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info",
            access_log=True
        )
    except KeyboardInterrupt:
        print("\n👋 服务已停止")
    except Exception as e:
        print(f"❌ 启动失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
