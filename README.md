<p align="center">
  <img src="https://api.iconify.design/mdi/forum-outline.svg?color=%236a1b9a&width=96&height=96" width="96" height="96" alt="Conversations" />
</p>

<h1 align="center">conversations-front</h1>

<p align="center"><strong>Explorador de conversaciones PatyIA</strong> — hilos persistidos en Neon, detalle de mensajes e instrucciones IA.</p>

## Arquitectura

```mermaid
flowchart LR
  F[conversations-front]
  ORCH[main-orchestrator]
  API[conversations Worker]
  DB[(Neon)]
  F -->|/api/conversaciones| ORCH --> API --> DB
```

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=githubpages&logoColor=white)](https://jeff-aporta.github.io/conversations-front/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Cloudflare Workers](https://img.shields.io/badge/API-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://github.com/Jeff-Aporta/conversations-back)
[![Neon](https://img.shields.io/badge/BD-Neon%20BD__CONVERSACIONES-00E599?logo=neon&logoColor=black)](https://neon.tech/)

## Demo

**https://jeff-aporta.github.io/conversations-front/**

## Vista previa

![Explorador de conversaciones](./docs/gh-pages.png)

## Qué hace

- **Lista / detalle** de conversaciones almacenadas en PostgreSQL (Neon).
- **LoginGate** con JWT de system-login antes de consultar datos.
- **Recarga manual** y switch **orquestador local :8780 / producción**.
- Layout de dos paneles (lista + detalle) con scroll contenido.

## Metadatos

Icono: `mdi:forum-outline` · tema `#6a1b9a` · [`JeffAppMeta`](https://github.com/Jeff-Aporta/front-shared/blob/main/cdn/isa/js/core/app-meta.js).

## Desarrollo local

```bash
npx serve .
# main-orchestrator en :8780
```

## Repos relacionados

| Repo | Rol |
|------|-----|
| [conversations-back](https://github.com/Jeff-Aporta/conversations-back) | API conversaciones (Worker) |
| [conversations-front](https://github.com/Jeff-Aporta/conversations-front) | Este panel (GH Pages) |

MIT · [Jeff-Aporta](https://github.com/Jeff-Aporta)
