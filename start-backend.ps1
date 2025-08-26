[CmdletBinding()]
param(
    [switch]$Production,
    [switch]$Install,
    [int]$Port = 8000
)

# 设置控制台编码
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

function Write-ColorOutput {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

Write-ColorOutput @"
╔════════════════════════════════════════════════════════════╗
║            Griffin PF Deployment AI - Backend             ║
║                    Python FastAPI 后端                    ║
╚════════════════════════════════════════════════════════════╝
"@ "Cyan"

$backendPath = Join-Path $PSScriptRoot "backend"

if (!(Test-Path $backendPath)) {
    Write-ColorOutput "❌ 后端目录不存在: $backendPath" "Red"
    exit 1
}

Push-Location $backendPath

try {
    # 检查并激活虚拟环境
    $venvPath = "venv\Scripts\activate"
    if (Test-Path "venv\Scripts\activate.ps1") {
        Write-ColorOutput "🐍 激活Python虚拟环境..." "Green"
        & "venv\Scripts\activate.ps1"
    } elseif (Test-Path "venv\Scripts\activate.bat") {
        Write-ColorOutput "🐍 激活Python虚拟环境..." "Green"  
        cmd /c "venv\Scripts\activate.bat"
    } else {
        Write-ColorOutput "⚠️  虚拟环境不存在，正在创建..." "Yellow"
        python -m venv venv
        & "venv\Scripts\activate.ps1"
    }
    
    # 安装依赖
    if ($Install -or !(Test-Path "venv\Lib\site-packages")) {
        Write-ColorOutput "📦 安装Python依赖..." "Yellow"
        pip install --upgrade pip
        if (Test-Path "requirements.txt") {
            pip install -r requirements.txt
        } else {
            Write-ColorOutput "❌ requirements.txt 文件不存在" "Red"
            exit 1
        }
    }
    
    # 检查环境变量文件
    if (!(Test-Path ".env")) {
        if (Test-Path ".env.example") {
            Write-ColorOutput "⚙️  复制环境配置文件..." "Yellow"
            Copy-Item ".env.example" ".env"
            Write-ColorOutput "✏️  请编辑 .env 文件配置必要参数" "Yellow"
        } else {
            Write-ColorOutput "⚠️  .env 文件不存在，使用默认配置" "Yellow"
        }
    }
    
    Write-ColorOutput "🚀 启动FastAPI服务器..." "Green"
    Write-ColorOutput "🌐 Backend API: http://localhost:$Port" "Cyan"
    Write-ColorOutput "📚 API Docs: http://localhost:$Port/docs" "Cyan"
    Write-ColorOutput "🔍 Interactive API: http://localhost:$Port/redoc" "Cyan"
    Write-ColorOutput ""
    
    if ($Production) {
        Write-ColorOutput "🏭 生产模式启动..." "Yellow"
        uvicorn app.main:app --host 0.0.0.0 --port $Port --workers 4
    } else {
        Write-ColorOutput "🛠️  开发模式启动 (热重载)..." "Yellow"
        if (Test-Path "run.py") {
            python run.py
        } else {
            uvicorn app.main:app --reload --host 0.0.0.0 --port $Port
        }
    }
    
} catch {
    Write-ColorOutput "❌ 后端启动失败: $($_.Exception.Message)" "Red"
    exit 1
} finally {
    Pop-Location
}
