<p align="center">
  <img src="https://api.iconify.design/mdi/forum-outline.svg?color=%236a1b9a&width=96&height=96" width="96" height="96" alt="Conversations" />
</p>

<h1 align="center">conversations-front</h1>

<p align="center"><strong>Explorador de conversaciones PatyIA</strong> — hilos persistidos en Neon, detalle de mensajes e instrucciones IA.</p>

## Arquitectura
![Diagrama de arquitectura](https://mermaid.ink/img/JSV7aW5pdDogeyJmbG93Y2hhcnQiOiB7ImN1cnZlIjogInN0ZXBBZnRlciIsICJodG1sTGFiZWxzIjogdHJ1ZSwgIm5vZGVTcGFjaW5nIjogNDQsICJyYW5rU3BhY2luZyI6IDUyLCAicGFkZGluZyI6IDE4fX19JSUKZmxvd2NoYXJ0IExSCiAgRltjb252ZXJzYXRpb25zLWZyb250XQogIE9SQ0hbbWFpbi1vcmNoZXN0cmF0b3JdCiAgQVBJW2NvbnZlcnNhdGlvbnMgV29ya2VyXQogIERCWyhOZW9uKV0KICBGIC0tPnwvYXBpL2NvbnZlcnNhY2lvbmVzfCBPUkNIIC0tPiBBUEkgLS0-IERC)

> **Fuente del diagrama:** [`docs/arquitectura.mmd`](docs/arquitectura.mmd) — editar el `.mmd`; regenerar imagen: `node scripts/mermaid-ink-url.mjs conversations/frontend/docs/arquitectura.mmd` (desde `apps/`).

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
- **Recarga manual** y switch **local / producción** (TargetSwitch).
- Layout de dos paneles (lista + detalle) con scroll contenido.

## Metadatos

Icono: `mdi:forum-outline` · tema `#6a1b9a` · [`JeffAppMeta`](https://github.com/Jeff-Aporta/front-shared/blob/main/cdn/isa/js/core/app-meta.js).

## Desarrollo local

```bash
npx serve .
# TargetSwitch → modo local si desarrollas backends en wrangler dev
```

## Repos relacionados

| Repo | Rol |
|------|-----|
| [conversations-back](https://github.com/Jeff-Aporta/conversations-back) | API conversaciones (Worker) |
| [conversations-front](https://github.com/Jeff-Aporta/conversations-front) | Este panel (GH Pages) |

MIT · [Jeff-Aporta](https://github.com/Jeff-Aporta)
