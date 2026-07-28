# =====================================================================
# TAKTO · web comercial
# Imagen multi-stage. Servicio totalmente independiente del CRM.
# =====================================================================

# --- 1 · Dependencias ------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# --- 2 · Build -------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Las variables NEXT_PUBLIC_* se incrustan en el bundle durante el build,
# así que deben pasarse aquí y no solo en tiempo de ejecución.
ARG NEXT_PUBLIC_SITE_URL=https://takto.online
ARG NEXT_PUBLIC_CRM_LOGIN_URL=https://crm-staging.tehusrattan.com/login
ARG NEXT_PUBLIC_CRM_ONBOARDING_URL=https://crm-staging.tehusrattan.com/onboarding
ARG NEXT_PUBLIC_ALLOW_INDEXING=true

# Las cabeceras de `next.config.ts` se resuelven durante el build, así que
# esta bandera de preview tiene que llegar aquí y no en `docker run`.
# Debe quedar SIN definir para producción.
ARG CSP_ALLOW_INSECURE_PREVIEW=0

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CRM_LOGIN_URL=$NEXT_PUBLIC_CRM_LOGIN_URL \
    NEXT_PUBLIC_CRM_ONBOARDING_URL=$NEXT_PUBLIC_CRM_ONBOARDING_URL \
    NEXT_PUBLIC_ALLOW_INDEXING=$NEXT_PUBLIC_ALLOW_INDEXING \
    CSP_ALLOW_INSECURE_PREVIEW=$CSP_ALLOW_INSECURE_PREVIEW \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- 3 · Runtime -----------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Usuario sin privilegios
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# `output: standalone` produce un servidor con solo las dependencias usadas.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
