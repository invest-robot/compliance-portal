@echo off
chcp 65001 >nul
echo =========================================
echo   腾讯云 CloudBase 一键部署
echo =========================================
echo.

REM 检查 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Node.js，请先安装 Node.js (>=22.0.0)
    echo    下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
echo.

REM 安装 CloudBase CLI
echo 📦 正在安装 CloudBase CLI...
npm install -g @cloudbase/cli
if %errorlevel% neq 0 (
    echo ❌ 安装失败，请手动运行: npm install -g @cloudbase/cli
    pause
    exit /b 1
)
echo ✅ CloudBase CLI 安装完成
echo.

REM 检查登录状态
echo 🔐 检查登录状态...
cloudbase login --check
if %errorlevel% neq 0 (
    echo 📱 请在浏览器中完成登录授权...
    cloudbase login
)
echo ✅ 登录成功
echo.

echo =========================================
echo   请输入 CloudBase 环境 ID
echo =========================================
echo.
echo 💡 如何获取环境 ID：
echo    1. 访问 https://console.cloud.tencent.com/tcb
echo    2. 创建或选择一个环境
echo    3. 复制环境 ID（格式如：prod-xxx 或 dev-xxx）
echo.
set /p ENV_ID="请输入环境 ID: "

if "%ENV_ID%"=="" (
    echo ❌ 环境 ID 不能为空
    pause
    exit /b 1
)

echo.
echo 🚀 开始部署到环境: %ENV_ID%
echo.

cloudbase framework:deploy -e %ENV_ID%

echo.
echo =========================================
echo   ✅ 部署完成！
echo =========================================
echo.
echo 🌐 访问地址: https://%ENV_ID%.service.tcloudbase.com
echo.
echo 💡 如需绑定自定义域名，请访问腾讯云控制台配置
pause
