# conversations-front

Explorador web de **conversaciones persistidas** en Neon (`BD_CONVERSACIONES`). Lista hilos por proyecto, abre el detalle con mensajes y metadatos, y permite recargar datos en tiempo real desde el Worker dedicado — desacoplado del grafo LangGraph en Azure.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=githubpages&logoColor=white)](https://jeff-aporta.github.io/conversations-front/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Babel Standalone](https://img.shields.io/badge/Babel%20Standalone-7-F9DC3E?logo=babel&logoColor=black)](https://babeljs.io/)
[![Cloudflare Workers](https://img.shields.io/badge/API-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://github.com/Jeff-Aporta/conversations-back)
[![Neon](https://img.shields.io/badge/BD-Neon%20BD__CONVERSACIONES-00E599?logo=neon&logoColor=black)](https://neon.tech/)
[![system-login](https://img.shields.io/badge/auth-system--login-007FFF)](https://github.com/Jeff-Aporta/system-login-front)
[![Sin build](https://img.shields.io/badge/build-sin%20paso%20de%20build-555)](https://github.com/Jeff-Aporta/conversations-front)

## Demo

**https://jeff-aporta.github.io/conversations-front/**

## Vista previa

![Explorador de conversaciones](./docs/gh-pages.png)

## Qué hace

- **Lista / detalle** de conversaciones almacenadas en PostgreSQL (Neon).
- **LoginGate** con JWT de system-login antes de consultar datos.
- **Recarga manual** y switch **orquestador local :8780 / producción** (`main-orchestrator.jeffaporta.workers.dev` → conversations).
- Layout de dos paneles (lista + detalle) con scroll contenido, sin desbordar `body`.

LangLab puede seguir escribiendo conversaciones vía su cliente HTTP apuntando al mismo Worker.

## Desarrollo local

```bash
npx serve .
# langlab gateway → npm run dev en apps/langlab/backend (:8780)
```

## Repos relacionados

| Repo | Rol |
|------|-----|
| [conversations-back](https://github.com/Jeff-Aporta/conversations-back) | API conversaciones (Worker; front vía **langlab gateway**) |
| [conversations-front](https://github.com/Jeff-Aporta/conversations-front) | Este panel (GH Pages) |

MIT · [Jeff-Aporta](https://github.com/Jeff-Aporta)
