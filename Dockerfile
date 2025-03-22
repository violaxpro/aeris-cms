# Dockerfile for Next.js 14
# Use the lightest Node.js image as a base
FROM node:18-slim AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies first for caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Use a lightweight production image
FROM node:18-slim AS runner
WORKDIR /app

# Install pnpm globally in production image
RUN npm install -g pnpm

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variable
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Run the Next.js application
CMD ["pnpm", "start"]

