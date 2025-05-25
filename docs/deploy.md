# 部署指南

本文档提供了如何构建、测试和部署 COS72 Tauri + Next.js 应用的指南。

## 环境要求

- Node.js v23.0.0 或更高版本
- Rust 1.70.0 或更高版本
- pnpm 10.0.0 或更高版本
- Tauri CLI 2.0.0 或更高版本

## 初始化

首先，克隆仓库并安装依赖：

```bash
# 克隆仓库
git clone <repository-url>
cd Tauri-COS72-V0.2

# 安装依赖
pnpm install
```

## 开发流程

### 开发模式

在开发模式下运行应用程序：

```bash
pnpm tauri dev
```

这将启动 Next.js 开发服务器并打开 Tauri 窗口，加载应用程序。

### 测试

运行测试：

```bash
# 前端测试
pnpm test

# Rust 测试
cd src-tauri && cargo test
```

## 构建应用程序

### 构建发布版本

构建可分发的应用程序包：

```bash
# 构建前端
pnpm build

# 构建Tauri应用
pnpm tauri build
```

构建完成后，可以在以下位置找到构建的应用程序：

- Windows: `src-tauri/target/release/bundle/msi/`
- macOS: `src-tauri/target/release/bundle/dmg/`
- Linux: `src-tauri/target/release/bundle/appimage/` 或 `src-tauri/target/release/bundle/deb/`

## 发布步骤

1. 更新版本号：
   - 在 `package.json` 中更新 `version` 字段
   - 在 `src-tauri/Cargo.toml` 中更新 `version` 字段
   - 在 `src-tauri/tauri.conf.json` 中更新 `version` 字段
   - 在 `src/components/AboutDialog.tsx` 中更新版本显示

2. 更新变更日志：
   - 在 `docs/CHANGES.md` 中记录变更

3. 构建应用程序：
   ```bash
   pnpm build
   pnpm tauri build
   ```

4. 测试构建的应用程序

5. 发布新版本

## 故障排除

如果在构建过程中遇到问题，请尝试以下步骤：

1. 清理临时文件：
   ```bash
   pnpm clean
   ```

2. 重新安装依赖：
   ```bash
   rm -rf node_modules
   pnpm install
   ```

3. 删除 Rust 构建缓存：
   ```bash
   cd src-tauri && cargo clean
   ```

4. 重试构建

## 版本管理

当前版本：0.13.0

版本号更新规则：
- 主要功能更新：递增0.01 (例如：0.13.0 -> 0.14.0)
- 小功能或修复：递增0.0.1 (例如：0.13.0 -> 0.13.1)

## 技术栈

- **前端**: Next.js 15.3.2, React 19.1.0, TailwindCSS 4.1.7
- **后端**: Tauri 2.0, Rust Latest
- **包管理**: pnpm 10.0+
- **构建工具**: Tauri CLI 2.0

## 特性

- About对话框显示系统信息
- 响应式窗口设计
- 跨平台支持
- 现代化UI界面 