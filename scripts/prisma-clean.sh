#!/bin/bash

echo "🧹 Cleaning Prisma setup..."

# Remove prisma migrations
rm -rf prisma/migrations

# Remove SQLite database
rm -f prisma/dev.db
rm -f dev.db
rm -f *.db



echo "✅ Prisma cleanup complete"
echo "You can now re-run migrations.  "