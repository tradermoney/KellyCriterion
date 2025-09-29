#!/bin/bash

# 设置错误时退出
set -e

# 定义颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# 清理函数
cleanup() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        error "Script failed with exit code $exit_code"
    fi
    # 确保在脚本退出时杀死所有子进程
    pkill -P $$ || true
}

# 设置清理钩子
trap cleanup EXIT

# 检查服务器是否真正可用
check_server() {
    # 检查 vite.svg，这是一个静态资源，应该立即可用
    if curl -s http://localhost:55289/vite.svg > /dev/null; then
        # 如果静态资源可用，再等待几秒让应用完全加载
        sleep 3
        return 0
    fi
    return 1
}

log "Starting Kelly Criterion App..."

# 检查是否安装了node
if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# 检查node版本
NODE_VERSION=$(node -v)
log "Using Node.js version: $NODE_VERSION"

# 查找并杀死已存在的vite进程
log "Checking for existing vite processes..."
EXISTING_PIDS=$(pgrep -f "vite" || true)
if [ ! -z "$EXISTING_PIDS" ]; then
    warn "Found existing vite processes (PIDs: $EXISTING_PIDS). Killing them..."
    for pid in $EXISTING_PIDS; do
        kill -9 $pid 2>/dev/null || true
    done
    sleep 2
fi

# 检查package.json是否存在
if [ ! -f "package.json" ]; then
    error "package.json not found. Are you in the correct directory?"
    exit 1
fi

# 检查node_modules是否存在，不存在则安装依赖
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    log "Installing dependencies..."
    npm install --verbose
else
    log "Dependencies already installed"
fi

# 检查vite是否在本地安装
if [ ! -f "node_modules/.bin/vite" ]; then
    warn "Local vite not found, installing..."
    npm install vite --save-dev
fi

# 启动开发服务器
log "Starting development server..."
npm run dev -- --host > dev-server.log 2>&1 &
SERVER_PID=$!

# 等待服务器启动
log "Waiting for server to start..."
for i in {1..30}; do
    if check_server; then
        log "Server is up and running at http://localhost:55289"
        log "Server process ID: $SERVER_PID"
        log "Server logs are available in dev-server.log"
        log "Note: The app may take a few more seconds to fully compile and be ready"
        exit 0
    fi
    sleep 1
done

error "Server failed to start within 30 seconds"
kill -9 $SERVER_PID 2>/dev/null || true
exit 1 