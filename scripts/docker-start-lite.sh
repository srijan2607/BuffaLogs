#!/bin/bash
# BuffaLogs Lite Startup Script
# Starts the minimal Docker setup for development

set -e

cd "$(dirname "$0")/.."

echo "🚀 BuffaLogs Lite - Starting minimal Docker setup"
echo "=================================================="
echo ""
echo "Services:"
echo "  • PostgreSQL (port 5433)"
echo "  • RabbitMQ (internal)"
echo "  • Django API (port 8000)"
echo "  • Next.js Frontend (port 3000)"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Clean up old containers first
echo "🧹 Cleaning up old containers..."
docker compose -f docker-compose.lite.yaml down 2>/dev/null || true

# Build and start
echo "🔨 Building and starting services..."
docker compose -f docker-compose.lite.yaml up --build -d

echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 5

# Check service status
echo ""
echo "📊 Service Status:"
docker compose -f docker-compose.lite.yaml ps

echo ""
echo "✅ BuffaLogs Lite is running!"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend:  http://localhost:3000"
echo "   API:       http://localhost:8000"
echo "   API Admin: http://localhost:8000/admin"
echo ""
echo "📋 Useful commands:"
echo "   View logs:     docker compose -f docker-compose.lite.yaml logs -f"
echo "   Stop:          docker compose -f docker-compose.lite.yaml down"
echo "   Django shell:  docker exec -it buffalogs_app python manage.py shell"
echo ""
