#!/bin/bash

echo "⚡ Resetting Prisma database..."

# Reset database
npx prisma migrate reset --force

echo "📦 Generating Prisma client..."
npx prisma migrate

echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Database reset and seed complete!"