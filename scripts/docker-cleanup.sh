#!/bin/bash
# BuffaLogs Docker Cleanup Script
# Frees up disk space by removing unused Docker resources

set -e

echo "🧹 BuffaLogs Docker Cleanup"
echo "==========================="
echo ""

# Show current disk usage
echo "📊 Current Docker disk usage:"
docker system df
echo ""

# Stop BuffaLogs containers
echo "🛑 Stopping BuffaLogs containers..."
docker compose -f docker-compose.yaml down 2>/dev/null || true
docker compose -f docker-compose.lite.yaml down 2>/dev/null || true

# Remove BuffaLogs images
echo "🗑️  Removing BuffaLogs images..."
docker rmi certego/buffalogs buffalogs:lite buffalogs:latest buffalogs:frontend 2>/dev/null || true

# Remove dangling images (untagged)
echo "🗑️  Removing dangling images..."
docker image prune -f

# Remove unused volumes (preserves data volumes)
echo "🗑️  Removing unused volumes..."
docker volume prune -f

# Remove build cache
echo "🗑️  Removing build cache..."
docker builder prune -f

# Remove stopped containers
echo "🗑️  Removing stopped containers..."
docker container prune -f

# Remove unused networks
echo "🗑️  Removing unused networks..."
docker network prune -f

echo ""
echo "📊 Disk usage after cleanup:"
docker system df
echo ""
echo "✅ Cleanup complete!"
