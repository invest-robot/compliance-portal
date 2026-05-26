#!/bin/bash

# 腾讯云 CloudBase 一键部署脚本
# 使用方法: chmod +x deploy-cloudbase.sh && ./deploy-cloudbase.sh

set -e

echo "========================================="
echo "  腾讯云 CloudBase 一键部署"
echo "========================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js (>=22.0.0)"
    echo "   下载地址: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 安装 CloudBase CLI
echo "📦 正在安装 CloudBase CLI..."
npm install -g @cloudbase/cli 2>/dev/null || {
    echo "⚠️  安装失败，请手动运行: npm install -g @cloudbase/cli"
    exit 1
}
echo "✅ CloudBase CLI 安装完成"
echo ""

# 检查登录状态
echo "🔐 检查登录状态..."
if ! cloudbase login --check 2>/dev/null; then
    echo "📱 请在浏览器中完成登录授权..."
    cloudbase login
fi
echo "✅ 登录成功"
echo ""

# 获取环境 ID
echo "========================================="
echo "  请选择或输入 CloudBase 环境 ID"
echo "========================================="
echo ""
echo "💡 如何获取环境 ID："
echo "   1. 访问 https://console.cloud.tencent.com/tcb"
echo "   2. 创建或选择一个环境"
echo "   3. 复制环境 ID（格式如：prod-xxx 或 dev-xxx）"
echo ""
read -p "请输入环境 ID: " ENV_ID

if [ -z "$ENV_ID" ]; then
    echo "❌ 环境 ID 不能为空"
    exit 1
fi

echo ""
echo "🚀 开始部署到环境: $ENV_ID"
echo ""

# 执行部署
cloudbase framework:deploy -e "$ENV_ID"

echo ""
echo "========================================="
echo "  ✅ 部署完成！"
echo "========================================="
echo ""
echo "🌐 访问地址: https://$ENV_ID.service.tcloudbase.com"
echo ""
echo "💡 如需绑定自定义域名，请访问腾讯云控制台配置"
