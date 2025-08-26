[CmdletBinding()]
param(
    [switch]$SkipBackend,
    [switch]$SkipFrontend,
    [switch]$Production
)

# 设置控制台编码为UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 颜色输出函数
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# 检查端口是否被占用
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# 增强的等待服务启动函数
function Wait-ForService {
    param(
        [string]$ServiceName,
        [int]$Port,
        [int]$TimeoutSeconds = 120,
        $Job = $null
    )
    
    Write-ColorOutput "🔄 等待 $ServiceName 在端口 $Port 启动..." "Yellow"
    
    $elapsed = 0
    $dots = 0
    while ($elapsed -lt $TimeoutSeconds) {
        # 检查作业状态
        if ($Job -and (Get-Job $Job -ErrorAction SilentlyContinue) -and (Get-Job $Job).State -eq "Failed") {
            Write-ColorOutput "`n❌ 服务作业失败!" "Red"
            return $false
        }
        
        if (Test-Port -Port $Port) {
            Write-ColorOutput "`n✅ $ServiceName 已成功启动！" "Green"
            return $true
        }
        
        Start-Sleep -Seconds 2
        $elapsed += 2
        $dots++
        
        # 每10秒显示一次进度
        if ($dots % 5 -eq 0) {
            Write-ColorOutput "`n⏳ 仍在等待 $ServiceName 启动... ($elapsed/$TimeoutSeconds 秒)" "Yellow"
            
            # 显示作业输出（如果有）
            if ($Job -and (Get-Job $Job -ErrorAction SilentlyContinue)) {
                $output = Receive-Job $Job -Keep -ErrorAction SilentlyContinue
                if ($output) {
                    Write-ColorOutput "📋 最新日志输出:" "Cyan"
                    $output | Select-Object -Last 3 | ForEach-Object {
                        Write-ColorOutput "   $_" "Gray"
                    }
                }
            }
        } else {
            Write-Host "." -NoNewline -ForegroundColor Yellow
        }
    }
    
    Write-ColorOutput "`n❌ $ServiceName 启动超时！" "Red"
    return $false
}

# 增强的Python环境检查
function Test-PythonVenv {
    $venvPath = Join-Path $PSScriptRoot "backend\venv\Scripts\activate.ps1"
    if (Test-Path $venvPath) {
        return $venvPath
    }
    
    $venvPath = Join-Path $PSScriptRoot "backend\venv\Scripts\activate.bat"
    if (Test-Path $venvPath) {
        return $venvPath
    }
    
    return $null
}

# 检查Python是否可用
function Test-Python {
    try {
        $pythonVersion = python --version 2>&1
        Write-ColorOutput "🐍 发现Python: $pythonVersion" "Green"
        return $true
    }
    catch {
        Write-ColorOutput "❌ Python未安装或不在PATH中" "Red"
        return $false
    }
}

# 检查Node.js依赖
function Test-NodeModules {
    $nodeModulesPath = Join-Path $PSScriptRoot "frontend\node_modules"
    return Test-Path $nodeModulesPath
}

# 检查Node.js是否可用
function Test-NodeJS {
    try {
        $nodeVersion = node --version 2>&1
        $npmVersion = npm --version 2>&1
        Write-ColorOutput "📦 发现Node.js: $nodeVersion, NPM: v$npmVersion" "Green"
        return $true
    }
    catch {
        Write-ColorOutput "❌ Node.js未安装或不在PATH中" "Red"
        return $false
    }
}

Write-ColorOutput @"
╔══════════════════════════════════════════════════════════════╗
║              Griffin PF Deployment AI - 启动脚本              ║
║                     前后端一键启动工具                        ║
╚══════════════════════════════════════════════════════════════╝
"@ "Cyan"

# 检查项目目录
$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

Write-ColorOutput "🔍 项目目录检查..." "Yellow"
if (!(Test-Path $backendPath)) {
    Write-ColorOutput "❌ 未找到后端目录: $backendPath" "Red"
    Write-ColorOutput "💡 请确保在项目根目录下运行此脚本" "Yellow"
    exit 1
}

if (!(Test-Path $frontendPath)) {
    Write-ColorOutput "❌ 未找到前端目录: $frontendPath" "Red"
    Write-ColorOutput "💡 请确保在项目根目录下运行此脚本" "Yellow"
    exit 1
}

Write-ColorOutput "✅ 项目目录检查通过" "Green"

# 全局变量用于跟踪进程
$global:BackendJob = $null
$global:FrontendJob = $null

# 增强的清理函数
function Cleanup {
    Write-ColorOutput "`n🧹 正在清理进程..." "Yellow"
    
    if ($global:BackendJob) {
        Write-ColorOutput "⏹️  停止后端服务..." "Yellow"
        try {
            Stop-Job $global:BackendJob -PassThru -ErrorAction SilentlyContinue | Remove-Job -Force -ErrorAction SilentlyContinue
        }
        catch {
            Write-ColorOutput "⚠️  后端作业清理失败: $($_.Exception.Message)" "Yellow"
        }
    }
    
    if ($global:FrontendJob) {
        Write-ColorOutput "⏹️  停止前端服务..." "Yellow"
        try {
            Stop-Job $global:FrontendJob -PassThru -ErrorAction SilentlyContinue | Remove-Job -Force -ErrorAction SilentlyContinue
        }
        catch {
            Write-ColorOutput "⚠️  前端作业清理失败: $($_.Exception.Message)" "Yellow"
        }
    }
    
    # 强制结束可能残留的进程
    try {
        $processesToKill = Get-Process | Where-Object {$_.ProcessName -match "node|python|uvicorn" -and $_.ProcessName -notmatch "pythonw"}
        if ($processesToKill) {
            Write-ColorOutput "🔪 发现残留进程，正在清理..." "Red"
            $processesToKill | ForEach-Object {
                try {
                    Write-ColorOutput "  终止进程: $($_.ProcessName) (PID: $($_.Id))" "Red"
                    Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
                }
                catch {
                    # 忽略错误
                }
            }
        }
    }
    catch {
        # 忽略进程清理错误
    }
    
    Write-ColorOutput "✅ 清理完成" "Green"
}

# 注册清理事件
Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { Cleanup } | Out-Null

# 修复Ctrl+C处理 - 使用不同的方法
try {
    $null = [console]::TreatControlCAsInput = $false
    # 注册控制台取消事件
    Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { 
        Cleanup 
    } | Out-Null
} catch {
    Write-ColorOutput "⚠️  无法注册Ctrl+C处理，使用基本清理" "Yellow"
}

try {
    # 1. 启动后端
    if (-not $SkipBackend) {
        Write-ColorOutput "`n🚀 正在启动后端服务..." "Cyan"
        
        # 检查Python环境
        if (-not (Test-Python)) {
            throw "Python环境不可用，请安装Python 3.8+"
        }
        
        # 检查虚拟环境
        $venvScript = Test-PythonVenv
        if (-not $venvScript) {
            Write-ColorOutput "⚠️  未检测到Python虚拟环境，尝试创建..." "Yellow"
            Push-Location $backendPath
            try {
                Write-ColorOutput "📦 创建Python虚拟环境..." "Yellow"
                python -m venv venv
                Start-Sleep -Seconds 2
                $venvScript = Test-PythonVenv
                if (-not $venvScript) {
                    throw "虚拟环境创建失败"
                }
                Write-ColorOutput "✅ 虚拟环境创建成功" "Green"
            }
            finally {
                Pop-Location
            }
        } else {
            Write-ColorOutput "✅ 发现虚拟环境: $venvScript" "Green"
        }
        
        # 启动后端作业
        $global:BackendJob = Start-Job -ScriptBlock {
            param($BackendPath, $VenvScript, $Production, $DebugPreference, $VerbosePreference)
            
            try {
                Set-Location $BackendPath
                Write-Host "📁 切换到目录: $BackendPath" -ForegroundColor Yellow
                
                # 激活虚拟环境
                Write-Host "🐍 激活Python虚拟环境..." -ForegroundColor Yellow
                if ($VenvScript.EndsWith(".ps1")) {
                    try {
                        & $VenvScript
                    } catch {
                        # 如果PowerShell脚本失败，尝试批处理文件
                        $batScript = $VenvScript -replace "\.ps1$", ".bat"
                        if (Test-Path $batScript) {
                            cmd /c """$batScript"""
                        } else {
                            throw "虚拟环境激活失败"
                        }
                    }
                } else {
                    cmd /c """$VenvScript"""
                }
                
                # 升级pip
                Write-Host "📦 升级pip..." -ForegroundColor Yellow
                python -m pip install --upgrade pip --quiet
                
                # 检查并安装依赖
                if (Test-Path "requirements.txt") {
                    Write-Host "📦 安装Python依赖..." -ForegroundColor Yellow
                    pip install -r requirements.txt --quiet
                } else {
                    Write-Host "⚠️  未找到requirements.txt文件" -ForegroundColor Yellow
                }
                
                # 检查环境文件
                if (!(Test-Path ".env")) {
                    if (Test-Path ".env.example") {
                        Write-Host "📋 复制环境配置文件..." -ForegroundColor Yellow
                        Copy-Item ".env.example" ".env"
                    }
                }
                
                # 启动FastAPI
                Write-Host "🔥 启动FastAPI服务器..." -ForegroundColor Green
                Write-Host "🌐 服务将在 http://localhost:8000 启动" -ForegroundColor Cyan
                
                if ($Production) {
                    Write-Host "🏭 生产模式启动..." -ForegroundColor Yellow
                    uvicorn app.main:app --host 0.0.0.0 --port 8000
                } else {
                    Write-Host "🛠️  开发模式启动..." -ForegroundColor Yellow
                    if (Test-Path "run.py") {
                        python run.py
                    } else {
                        # 直接使用uvicorn命令
                        uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
                    }
                }
            }
            catch {
                Write-Error "后端启动失败: $($_.Exception.Message)"
                if ($DebugPreference -eq "Continue" -or $VerbosePreference -eq "Continue") {
                    Write-Error "堆栈跟踪: $($_.ScriptStackTrace)"
                }
                throw
            }
        } -ArgumentList $backendPath, $venvScript, $Production, $DebugPreference, $VerbosePreference
        
        # 等待后端启动
        if (-not (Wait-ForService -ServiceName "Backend API" -Port 8000 -TimeoutSeconds 120 -Job $global:BackendJob)) {
            Write-ColorOutput "📋 后端启动日志:" "Red"
            $jobOutput = Receive-Job $global:BackendJob -ErrorAction SilentlyContinue
            if ($jobOutput) {
                $jobOutput | ForEach-Object {
                    Write-ColorOutput "   $_" "Gray"
                }
            }
            
            # 检查作业状态
            if (Get-Job $global:BackendJob -ErrorAction SilentlyContinue) {
                $jobState = (Get-Job $global:BackendJob).State
                Write-ColorOutput "📊 后端作业状态: $jobState" "Yellow"
            }
            
            throw "后端启动失败"
        }
    } else {
        Write-ColorOutput "⏭️  跳过后端启动" "Yellow"
    }
    
    # 2. 启动前端
    if (-not $SkipFrontend) {
        Write-ColorOutput "`n🚀 正在启动前端服务..." "Cyan"
        
        # 检查Node.js环境
        if (-not (Test-NodeJS)) {
            throw "Node.js环境不可用，请安装Node.js 16+"
        }
        
        # 检查node_modules
        if (-not (Test-NodeModules)) {
            Write-ColorOutput "⚠️  未检测到node_modules，正在安装依赖..." "Yellow"
            Push-Location $frontendPath
            try {
                Write-ColorOutput "📦 安装Node.js依赖..." "Yellow"
                npm install
                Write-ColorOutput "✅ 前端依赖安装完成" "Green"
            }
            finally {
                Pop-Location  
            }
        } else {
            Write-ColorOutput "✅ 发现node_modules目录" "Green"
        }
        
        # 启动前端作业
        $global:FrontendJob = Start-Job -ScriptBlock {
            param($FrontendPath, $Production)
            
            try {
                Set-Location $FrontendPath
                Write-Host "📁 切换到目录: $FrontendPath" -ForegroundColor Yellow
                
                Write-Host "🔥 启动React开发服务器..." -ForegroundColor Green
                Write-Host "🌐 服务将在 http://localhost:3000 启动" -ForegroundColor Cyan
                
                if ($Production) {
                    Write-Host "🏭 生产模式构建..." -ForegroundColor Yellow
                    npm run build
                    npm run preview -- --port 3000
                } else {
                    Write-Host "🛠️  开发模式启动..." -ForegroundColor Yellow
                    npm run dev -- --port 3000 --host 0.0.0.0
                }
            }
            catch {
                Write-Error "前端启动失败: $($_.Exception.Message)"
                throw
            }
        } -ArgumentList $frontendPath, $Production
        
        # 等待前端启动
        if (-not (Wait-ForService -ServiceName "Frontend Dev Server" -Port 3000 -TimeoutSeconds 60 -Job $global:FrontendJob)) {
            Write-ColorOutput "⚠️  前端启动可能需要更长时间，继续等待..." "Yellow"
        }
    } else {
        Write-ColorOutput "⏭️  跳过前端启动" "Yellow"  
    }
    
    # 显示启动完成信息
    Write-ColorOutput @"

╔══════════════════════════════════════════════════════════════╗
║                        🎉 启动完成！                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  📍 后端API:     http://localhost:8000                       ║
║  📍 API文档:     http://localhost:8000/docs                  ║
║  📍 前端应用:    http://localhost:3000                       ║  
║                                                              ║
║  💡 提示:                                                    ║
║     • 按 Ctrl+C 停止所有服务                                 ║
║     • 查看实时日志请等待片刻                                  ║
║     • 修改代码会自动热重载                                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

"@ "Green"
    
    # 持续显示日志 - 使用更安全的方式
    Write-ColorOutput "📊 实时日志输出 (按 Ctrl+C 退出):`n" "Cyan"
    
    # 使用简单的循环而不是事件处理
    $startTime = Get-Date
    while ($true) {
        # 检查是否需要退出（运行时间检查或其他条件）
        try {
            $hasOutput = $false
            
            if ($global:BackendJob -and (Get-Job $global:BackendJob -ErrorAction SilentlyContinue) -and (Get-Job $global:BackendJob).State -eq "Running") {
                $backendOutput = Receive-Job $global:BackendJob -ErrorAction SilentlyContinue
                if ($backendOutput) {
                    $hasOutput = $true
                    $backendOutput | ForEach-Object { 
                        Write-ColorOutput "[Backend] $_" "Blue" 
                    }
                }
            }
            
            if ($global:FrontendJob -and (Get-Job $global:FrontendJob -ErrorAction SilentlyContinue) -and (Get-Job $global:FrontendJob).State -eq "Running") {
                $frontendOutput = Receive-Job $global:FrontendJob -ErrorAction SilentlyContinue
                if ($frontendOutput) {
                    $hasOutput = $true
                    $frontendOutput | ForEach-Object { 
                        Write-ColorOutput "[Frontend] $_" "Magenta" 
                    }
                }
            }
            
            # 检查作业状态
            if ($global:BackendJob -and (Get-Job $global:BackendJob -ErrorAction SilentlyContinue) -and (Get-Job $global:BackendJob).State -eq "Failed") {
                Write-ColorOutput "[Backend] ❌ 后端服务异常退出" "Red"
                break
            }
            
            if ($global:FrontendJob -and (Get-Job $global:FrontendJob -ErrorAction SilentlyContinue) -and (Get-Job $global:FrontendJob).State -eq "Failed") {
                Write-ColorOutput "[Frontend] ❌ 前端服务异常退出" "Red"
                break
            }
            
            Start-Sleep -Seconds 1
        }
        catch {
            Write-ColorOutput "🛑 监控循环中断，准备退出..." "Yellow"
            break
        }
    }

} catch {
    Write-ColorOutput "❌ 启动失败: $($_.Exception.Message)" "Red"
    
    if ($DebugPreference -eq "Continue" -or $VerbosePreference -eq "Continue") {
        Write-ColorOutput "🔍 调试信息:" "Yellow"
        Write-ColorOutput "   异常类型: $($_.Exception.GetType().Name)" "Gray"
        Write-ColorOutput "   堆栈跟踪: $($_.ScriptStackTrace)" "Gray"
        
        if ($VerbosePreference -eq "Continue") {
            Write-ColorOutput "🔧 详细诊断信息:" "Yellow"
            Write-ColorOutput "   PowerShell版本: $($PSVersionTable.PSVersion)" "Gray"
            Write-ColorOutput "   操作系统: $($PSVersionTable.OS)" "Gray"
            Write-ColorOutput "   当前位置: $(Get-Location)" "Gray"
        }
    }
    
    Cleanup
    exit 1
} finally {
    # 确保在任何情况下都执行清理
    Cleanup
}

