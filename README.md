# Kelly Criterion Calculator

[简体中文](./README_zh-CN.md) | English

🎯 **Live Demo**: [https://tradermoney.github.io/KellyCriterion/](https://tradermoney.github.io/KellyCriterion/)

A professional quantitative investment risk management tool that helps investors understand and apply the Kelly Criterion for optimal position sizing strategies.

## 📚 What is Kelly Criterion?

The Kelly Criterion is a mathematical formula used to determine the optimal size of a series of bets to maximize long-term growth. In investing, it helps determine what percentage of your capital to allocate to each investment opportunity.

**Formula**: f* = (bp - q) / b

Where:
- f* = fraction of capital to wager
- b = odds received on the wager
- p = probability of winning
- q = probability of losing (1 - p)

## ✨ Key Features

### 🎮 Interactive Simulation
- Real-time Monte Carlo simulation with adjustable parameters
- Multiple betting strategies comparison
- Visual feedback with animated charts and statistics

### 📊 Comprehensive Visualization
- **29 Time-Series Charts**: Complete performance analysis across multiple dimensions
  - Wealth curves and cumulative returns
  - Drawdown analysis and risk metrics
  - Return distribution and histogram
  - Performance metrics comparison
  - Risk-return scatter plots
  - And many more...

### 🎯 Multiple Strategies Support
- **Kelly Criterion**: Optimal betting strategy for maximum growth
- **Fractional Kelly**: Conservative variant (e.g., Half Kelly, Quarter Kelly)
- **Fixed Fraction**: Bet a fixed percentage of capital
- **Fixed Stake**: Bet a fixed amount
- **Paroli**: Progressive betting (increase on wins)
- **Martingale**: Double-down on losses (high risk)

### 🔧 Flexible Configuration
- Initial capital
- Number of simulation rounds
- Win probability and odds
- Transaction fees
- Maximum bet limit
- Ruin threshold
- Number of simulation paths

### 📈 Detailed Statistics
- **Performance Metrics**: Final wealth, returns, profit paths
- **Risk Metrics**: Standard deviation, max drawdown, ruin rate
- **Distribution Analysis**: Percentiles, median, min/max values

### 💾 Data Persistence
- Auto-save simulation results
- Resume from last session
- Export results as CSV or JSON

### 🌍 Internationalization
- 🇨🇳 Simplified Chinese
- 🇺🇸 English
- Easy to add more languages

### 🎨 Modern UI/UX
- Dark mode support
- Responsive design (optimized for desktop)
- Smooth animations with Framer Motion
- Material-UI components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/tradermoney/KellyCriterion.git
cd KellyCriterion

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:55289
```

### Build for Production

```bash
# Build for GitHub Pages
npm run build:github

# Preview production build
npm run preview:github
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI + Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📖 Usage Guide

1. **Set Parameters**: Configure initial capital, win probability, odds, and other simulation parameters
2. **Select Strategies**: Add multiple strategies for comparison (Kelly, Fractional Kelly, Fixed Fraction, etc.)
3. **Run Simulation**: Click "Start Simulation" to run Monte Carlo simulation
4. **Analyze Results**: View comprehensive charts and statistics to compare strategy performance
5. **Export Data**: Export simulation results as CSV or JSON for further analysis

## 🎯 Use Cases

### 1. Investment Portfolio Management
Use Kelly Criterion to determine optimal position sizes for different investments based on their expected returns and probabilities.

### 2. Trading Strategy Optimization
Compare different betting strategies to find the optimal balance between growth and risk.

### 3. Risk Management Education
Visualize the impact of different strategies on long-term wealth accumulation and understand the importance of proper position sizing.

### 4. Strategy Backtesting
Simulate thousands of betting scenarios to understand the statistical properties of different strategies.

## ⚠️ Important Notes

- The Kelly Criterion assumes you know the true probabilities and odds, which is rarely the case in real-world investing
- Full Kelly can be very aggressive; fractional Kelly (e.g., Half Kelly) is often recommended
- Martingale strategy has extremely high risk and can lead to rapid bankruptcy
- This tool is for educational and simulation purposes only; always do your own research before making investment decisions

## 📝 Project Structure

```
KellyCriterion/
├── src/
│   ├── components/       # React components
│   ├── core/            # Core simulation logic
│   ├── contexts/        # React contexts (Theme, Language)
│   ├── i18n/            # Internationalization
│   ├── stores/          # Zustand state management
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── public/              # Static assets
└── dist/                # Build output (GitHub Pages)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Live Demo**: [https://tradermoney.github.io/KellyCriterion/](https://tradermoney.github.io/KellyCriterion/)
- **GitHub Repository**: [https://github.com/tradermoney/KellyCriterion](https://github.com/tradermoney/KellyCriterion)

## 📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

⭐ If you find this project helpful, please consider giving it a star on GitHub!
