# Dockerfile (root) – multi-stage
# ---- build stage ----
FROM node:22-bookworm AS build
WORKDIR /app

# Install ffmpeg and yt-dlp
RUN apt-get update && \
    apt-get install -y ffmpeg && \ 
    curl -Lo /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm ci

# Copy source files and build
COPY tsconfig.json .
COPY src ./src

RUN npm run build

# ---- runtime stage ----
FROM node:22-bookworm-slim
WORKDIR /app

# Copy ffmpeg and yt-dlp from build stage
COPY --from=build /usr/bin/ffmpeg /usr/bin/ffmpeg
COPY --from=build /usr/local/bin/yt-dlp /usr/local/bin/yt-dlp

COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node

CMD ["node", "dist/index.js"]
