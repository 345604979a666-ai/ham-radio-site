# 火腿工坊 - 业余无线电爱好者网站

> 从理论到实践，开启你的无线电之旅

## 快速开始

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd ham-radio-site

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建（用于部署）
npm run build
```

## 项目结构

```
ham-radio-site/
├── docs/                    # 文档内容
│   ├── .vitepress/          # VitePress配置
│   │   └── config.mjs       # 站点配置
│   ├── basics/              # 无线电基础
│   │   ├── index.md
│   │   ├── electromagnetic.md
│   │   ├── modulation.md
│   │   ├── antenna.md
│   │   └── bands.md
│   ├── components/          # 电子元器件
│   │   ├── index.md
│   │   ├── passive.md
│   │   ├── active.md
│   │   ├── rf.md
│   │   └── testing.md
│   ├── projects/            # 电子小制作
│   │   ├── index.md
│   │   ├── crystal-radio.md
│   │   ├── fm-transmitter.md
│   │   ├── hf-antenna.md
│   │   └── sdr-receiver.md
│   ├── public/              # 静态资源
│   └── index.md             # 首页
├── package.json
└── README.md
```

## 内容板块

### 📡 无线电基础
- 电磁波与频段
- 调制与解调
- 天线基础
- 业余频段划分与法规

### 🔧 电子元器件
- 无源器件（电阻、电容、电感）
- 有源器件（二极管、三极管、集成电路）
- 射频器件（巴伦、滤波器、LNA）
- 检测与使用

### ⚡ 电子小制作
- ⭐ 矿石收音机（无需电源）
- ⭐⭐ FM发射器（集成电路方案）
- ⭐⭐ 短波天线（倒V天线）
- ⭐⭐⭐ SDR接收机（RTL-SDR）

## 部署

### Vercel（推荐）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 部署
vercel --prod
```

### GitHub Pages

```bash
# 1. 修改 config.mjs 中的 base 路径
base: '/ham-radio-site/',

# 2. 构建
npm run build

# 3. 部署 docs/.vitepress/dist 到 gh-pages 分支
```

### Cloudflare Pages

直接连接 GitHub 仓库，自动构建部署。

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态网站生成器
- Markdown - 内容编写
- 无需后端，纯静态部署

## 贡献

欢迎提交 Issue 和 PR！

## 许可

MIT License

## 声明

本站所有内容仅供学习交流使用。在中国境内使用无线电发射设备，必须：
1. 取得业余无线电操作证
2. 设备获得型号核准（CMIIT ID）
3. 遵守《中华人民共和国无线电管理条例》
