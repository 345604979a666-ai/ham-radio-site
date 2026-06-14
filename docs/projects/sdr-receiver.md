# ⭐⭐⭐ SDR接收机

> "软件定义无线电，用代码解调世界。"

使用RTL-SDR探索软件定义无线电，接收从短波到卫星的各种信号。

## 📋 项目信息

| 项目 | SDR接收机 |
|-----|----------|
| **难度** | ⭐⭐⭐ 高级 |
| **成本** | 50-200元 |
| **时间** | 1-2天 |
| **工具** | 电脑、RTL-SDR、天线 |
| **软件** | SDR#、GQRX、CubicSDR等 |

## 🔧 什么是SDR？

### 传统接收机 vs SDR

```
传统超外差接收机:
天线 → 预选滤波 → 混频 → 中频滤波 → 解调 → 音频
                              ↑
                         硬件决定功能

SDR接收机:
天线 → 射频前端 → ADC采样 → 数字信号处理 → 音频/数据
                              ↑
                         软件决定功能
```

**优势**：
- 一个硬件覆盖多频段、多模式
- 通过软件升级新功能
- 可视化频谱，直观理解信号
- 可录制IQ数据，离线分析

## 📦 硬件选择

### RTL-SDR（推荐入门）

| 参数 | 规格 |
|------|------|
| 频率范围 | 24-1766 MHz（直接采样模式可接收HF） |
| 采样率 | 最大 3.2 MS/s（稳定 2.4 MS/s） |
| 分辨率 | 8-bit |
| 价格 | ¥30-80 |
| 接口 | USB 2.0 |

```
RTL-SDR结构:

天线 ──[E4000/R820T2调谐器]──[RTL2832U]── USB ── 电脑
              ↑                    ↑
         射频前端              ADC+USB控制器
         (变频+滤波)           (采样率2.4MS/s)
```

### 升级选项

| 设备 | 频率 | 采样率 | 分辨率 | 价格 | 特点 |
|------|------|--------|--------|------|------|
| RTL-SDR v3 | 0.5-1766MHz | 2.4MS/s | 8bit | ¥80 | 直接采样HF |
| Airspy HF+ | 0.009-260MHz | 768kS/s | 16bit | ¥800 | HF专用，高动态 |
| Airspy R2 | 24-1800MHz | 10MS/s | 12bit | ¥1200 | VHF/UHF高性能 |
| SDRplay RSP1A | 1kHz-2GHz | 10MS/s | 14bit | ¥1000 | 全频段覆盖 |
| HackRF One | 1MHz-6GHz | 20MS/s | 8bit | ¥1500 | 半双工收发 |
| LimeSDR | 10MHz-3.5GHz | 61.44MS/s | 12bit | ¥3000 | 全双工MIMO |

## 📐 制作步骤

### 步骤1：准备硬件

```
必备:
1. RTL-SDR USB接收棒
2. 天线（根据频段选择）
3. USB延长线（减少电脑干扰）
4. 电脑（Windows/Linux/macOS）

推荐天线:
- VHF/UHF: 原装小天线或DIY 1/4波长天线
- HF: 长线天线+9:1巴伦，或自制HF Upconverter
- ADS-B: 1090MHz专用天线
```

### 步骤2：安装驱动和软件

#### Windows

```
1. 下载 Zadig 驱动安装工具
2. 插入RTL-SDR，在Zadig中选择"Bulk-In, Interface (Interface 0)"
3. 安装 WinUSB 驱动
4. 下载 SDR# (SDRSharp):
   https://airspy.com/download/
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install rtl-sdr gqrx-sdr

# 测试设备
rtl_test -t

# 启动GQRX
gqrx
```

#### macOS

```bash
# 使用Homebrew
brew install rtl-sdr gqrx

# 测试
rtl_test -t
```

### 步骤3：连接和配置

```
连接示意图:

    天线
      │
      ├──────────────┐
      │              │
   [VHF天线]      [HF天线]
   (2m/70cm)      (长线+巴伦)
      │              │
      └──────┬───────┘
             │
        [RTL-SDR]
             │
        USB延长线
             │
           电脑
           │
        [SDR软件]
```

**SDR#配置**：

```
1. 打开SDR#
2. 设置采样率: 2.4 MSPS
3. 设置中心频率: 你想监听的频段中心
4. 选择调制模式:
   - NFM: 窄带调频（对讲机）
   - WFM: 宽带调频（广播）
   - AM: 调幅（中波/短波广播）
   - USB/LSB: 单边带（业余短波）
   - CW: 等幅电报
```

## 📡 接收目标指南

### 1. FM广播 (88-108MHz)

```
设置:
- 模式: WFM
- 带宽: 200kHz
- 天线: 任意VHF天线

预期:
- 可清晰接收本地FM电台
- 了解频谱占用情况
```

### 2. 业余对讲机 (144-148MHz, 430-440MHz)

```
设置:
- 模式: NFM
- 带宽: 12.5kHz 或 25kHz
- 天线: 2m/70cm天线

预期:
- 接收本地火腿通联
- 学习中继台频率和亚音
- 了解本地业余无线电活动
```

### 3. ADS-B航空信号 (1090MHz)

```
设置:
- 模式: RAW (原始数据)
- 软件: dump1090 或 RTL1090
- 天线: 1090MHz专用天线或1/4波长垂直天线

制作1090MHz天线:
波长 = 300/1090 = 0.275m = 27.5cm
1/4波长 = 6.9cm

使用6.9cm导线作为垂直振子
配合接地平面（4根6.9cm导线呈十字）

预期:
- 接收200-400km范围内的飞机
- 显示航班号、高度、速度、位置
```

### 4. 短波广播 (3-30MHz)

```
方法1: 直接采样模式 (RTL-SDR v3)
- 断开内部偏置T
- 连接HF天线到SMA接口
- 软件中启用Direct Sampling (Q branch)

方法2: HF Upconverter
- 使用Ham It Up或自制上变频器
- 将HF信号搬移到100MHz以上
- RTL-SDR正常接收

自制Upconverter:
- 晶振: 100MHz或125MHz
- 混频器: ADE-1或类似
- 低通滤波器: 30MHz截止

设置:
- 模式: AM/USB/LSB
- 带宽: 根据信号调整
- 天线: 10-20m长线天线

预期:
- 接收中国之声、BBC、VOA等短波广播
- 接收业余电台CW/SSB信号
```

### 5. 气象卫星 (NOAA 137MHz)

```
设置:
- 频率: 137.100, 137.620, 137.9125 MHz
- 模式: FM
- 带宽: 34kHz
- 软件: WXtoImg 或 SatDump
- 天线: 137MHz QFH天线或偶极天线

制作137MHz偶极天线:
每臂 = 150/137/2 = 0.55米 = 55cm

预期:
- 接收NOAA卫星云图
- 自动解码为彩色/黑白图像
- 每天2次过境，每次约15分钟
```

### 6. 国际空间站 (ISS 145.800MHz)

```
设置:
- 频率: 145.800 MHz (下行)
- 模式: FM
- 天线: 2m垂直或八木

活动:
- SSTV (慢扫描电视): 定期举办活动
- 语音通联: 宇航员与学校联络
- APRS: 145.825MHz

预期:
- 接收ISS发出的SSTV图像
- 可能听到宇航员与地面通话
```

## 🔧 进阶技巧

### 使用GNU Radio

```python
# 简单的FM接收流程图

from gnuradio import gr, analog, audio, blocks
from osmosdr import sink, source

class FMReceiver(gr.top_block):
    def __init__(self):
        gr.top_block.__init__(self)

        # RTL-SDR源
        self.src = source.args("rtl=0")
        self.src.set_sample_rate(2.4e6)
        self.src.set_center_freq(100e6)  # 100MHz
        self.src.set_gain(30)

        # 降采样
        self.decim = blocks.keep_one_in_n(gr.sizeof_gr_complex, 10)

        # FM解调
        self.demod = analog.fm_demod_cf(
            channel_rate=240e3,
            audio_decim=10,
            deviation=75e3,
            audio_pass=15e3,
            audio_stop=16e3
        )

        # 音频输出
        self.audio = audio.sink(48000, "", True)

        # 连接
        self.connect(self.src, self.decim, self.demod, self.audio)

# 运行
receiver = FMReceiver()
receiver.run()
```

### 信号录制与分析

```
录制IQ数据:
- SDR#: 点击录制按钮
- GQRX: 点击"Rec"按钮
- 命令行: rtl_sdr -f 100000000 -s 2400000 recording.raw

分析工具:
- Audacity: 音频分析
- MATLAB/Python: 频谱分析、解调算法
- Universal Radio Hacker: 协议分析
```

### 解码数字信号

| 信号类型 | 软件 | 频率 |
|---------|------|------|
| POCSAG寻呼 | PDW, multimon-ng |  various |
| FLEX寻呼 | PDW | various |
| AIS船舶 | AISMon, rtl_ais | 162MHz |
| DMR数字对讲 | DSD+, SDRTrunk |  various |
| APCO P25 | DSD+, OP25 |  various |
| ACARS航空 | acarsdec, dumpvdl2 | 131.550MHz |

## 🐛 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|---------|---------|
| 有噪声无信号 | 增益设置不当 | 调整RF增益，尝试自动增益 |
| 图像频率干扰 | 直接采样模式 | 使用Upconverter |
| 电脑干扰 | USB供电噪声 | 使用USB延长线，外接电源 |
| 频率偏移 | 晶振不准 | 软件校准PPM值 |
| 接收距离近 | 天线不好 | 改善天线，升高位置 |
| 软件崩溃 | 驱动问题 | 重新安装驱动，更新软件 |

## 📚 延伸阅读

- [无线电基础](/basics/)
- [调制与解调](/basics/modulation)
- [业余频段划分](/basics/bands)

## 🎯 学习路径

```
第1周: RTL-SDR + SDR#
       → 接收FM广播，熟悉软件操作

第2周: 对讲机频段
       → 接收本地火腿通联，了解中继台

第3周: ADS-B
       → 接收飞机信号，学习解码

第4周: 短波/卫星
       → 接收NOAA云图，ISS SSTV

第5周+: GNU Radio
       → 编写自己的解调程序
```

> 🎉 恭喜你完成了所有入门项目！现在你已经具备了扎实的无线电基础，可以继续探索更高级的主题，如：
> - 自制收发信机（QRP电台）
> - 卫星通信（业余卫星通联）
> - 数字模式（FT8, JS8Call）
> - 微波通信（23cm, 13cm波段）
