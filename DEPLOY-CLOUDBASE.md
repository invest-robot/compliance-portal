# 腾讯云 CloudBase 部署指南

## 快速开始

### 前置准备

1. **Node.js 环境**：确保已安装 Node.js >= 22.0.0
   ```bash
   node -v  # 检查版本
   ```

2. **腾讯云账号**：注册并实名认证
   - 访问 [腾讯云控制台](https://console.cloud.tencent.com/)

3. **创建 CloudBase 环境**
   - 访问 [CloudBase 控制台](https://console.cloud.tencent.com/tcb)
   - 点击「新建环境」
   - 选择「按量计费」（有免费额度）
   - 记录环境 ID（格式如 `prod-xxx`）

### 一键部署

#### macOS / Linux
```bash
chmod +x deploy-cloudbase.sh
./deploy-cloudbase.sh
```

#### Windows
双击运行 `deploy-cloudbase.bat`

### 手动部署

如果脚本执行失败，可以手动执行：

```bash
# 1. 安装 CLI
npm install -g @cloudbase/cli

# 2. 登录
cloudbase login

# 3. 构建并部署
npm run build:client
cloudbase framework:deploy -e <你的环境ID>
```

## 部署后

- **访问地址**：`https://<环境ID>.service.tcloudbase.com`
- **自定义域名**：在 CloudBase 控制台 → 环境 → 域名管理 中配置

## 常见问题

### Q: 部署后访问 404？
A: CloudBase 默认使用 SPA 路由模式，确保 `cloudbaserc.json` 中配置正确。

### Q: 如何更新代码？
A: 修改代码后重新运行部署脚本即可。

### Q: 免费额度够吗？
A: CloudBase 静态托管免费额度：
- 存储空间：5GB
- 流量：5GB/月
- 请求次数：5万次/月
对于个人项目完全够用。

## 配置文件说明

`cloudbaserc.json` 是 CloudBase 的部署配置文件：
- `envId`: 环境 ID（部署时自动填入）
- `buildCommand`: 构建命令
- `outputPath`: 构建产物目录
