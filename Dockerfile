# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.7.1
ARG PNPM_VERSION=9.1.1

FROM node:${NODE_VERSION}-alpine

# Asegúrate de que el entorno NODE_ENV esté configurado para "development"
ENV NODE_ENV=development

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

# Cambia el propietario del directorio de trabajo al usuario 'node'
# Esto se hace antes de copiar los archivos y ejecutar 'pnpm install'
USER root
RUN chown -R node:node /usr/src/app
USER node

# Instala todas las dependencias, incluidas las de desarrollo
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Cambia el entorno a producción si es necesario después de la instalación
ENV NODE_ENV=production

COPY --chown=node:node . .

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]