[CmdletBinding()]
param(
    [switch]$Production,
    [switch]$Install,
    [int]$Port = 3000
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
║           Griffin PF Deployment AI - Frontend             ║
║                 React + Fluent UI v9 前端                 ║
╚════════════════════════════════════════════════════════════╝
"@ "Magenta"

$frontendPath = Join-Path $PSScriptRoot "frontend"

if (!(Test-Path $frontendPath)) {
    Write-ColorOutput "❌ 前端目录不存在: $frontendPath" "Red"
    exit 1
}

Push-Location $frontendPath

try {
    # 检查Node.js
    try {
        $nodeVersion = node --version
        Write-ColorOutput "📦 Node.js版本: $nodeVersion" "Green"
    } catch {
        Write-ColorOutput "❌ Node.js未安装，请先安装Node.js" "Red"
        exit 1
    }
    
    # 检查npm
    try {
        $npmVersion = npm --version  
        Write-ColorOutput "📦 NPM版本: $npmVersion" "Green"
    } catch {
        Write-ColorOutput "❌ NPM未安装" "Red"
        exit 1
    }
    
    # 安装依赖
    if ($Install -or !(Test-Path "node_modules")) {
        Write-ColorOutput "📦 安装Node.js依赖..." "Yellow"
        if (Test-Path "package.json") {
            npm install
        } else {
            Write-ColorOutput "❌ package.json 文件不存在" "Red"
            exit 1  
        }
    }
    
    Write-ColorOutput "🚀 启动React开发服务器..." "Green"
    Write-ColorOutput "🌐 Frontend: http://localhost:$Port" "Cyan"
    Write-ColorOutput ""
    
    if ($Production) {
        Write-ColorOutput "🏭 生产模式构建并启动..." "Yellow"
        npm run build
        npm run preview
    } else {
        Write-ColorOutput "🛠️  开发模式启动 (热重载)..." "Yellow"
        npm run dev
    }
    
} catch {
    Write-ColorOutput "❌ 前端启动失败: $($_.Exception.Message)" "Red"
    exit 1
} finally {
    Pop-Location
}
