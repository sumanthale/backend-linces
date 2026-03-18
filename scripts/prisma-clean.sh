#!/bin/bash

echo "🧹 Cleaning Prisma setup..."

# Remove generated prisma client
rm -rf node_modules/.prisma

# Remove prisma migrations
rm -rf prisma/migrations

# Remove SQLite database
rm -f prisma/dev.db
rm -f dev.db
rm -f *.db

# Remove prisma client build
rm -rf node_modules/@prisma/client

echo "✅ Prisma cleanup complete"
echo "You can now re-run migrations.  "