# Repositorio remoto de takto-web

> **Estado: NO EJECUTADO.** Ningún comando de abajo se ha lanzado.
> `gh` CLI **no está instalado** en este equipo y no hay token autorizado, así
> que el repositorio tiene que crearlo el operador.
>
> No se leyeron ni se extrajeron credenciales de Git Credential Manager.

## Recomendación

| | |
| --- | --- |
| Nombre | `takto-web` |
| Visibilidad | **privado** |
| Rama principal | `main` |
| Rama de trabajo actual | `feature/takto-rebrand` |
| Descripción | Web comercial pública de TAKTO |

**No** inicializar con README, `.gitignore` ni licencia: el repositorio local ya
tiene historial y esos archivos chocarían.

## Historial que debe conservarse

Todo. Son commits pequeños e intencionales que documentan las decisiones:

```
501fb4e chore(web): prepare isolated deployment package for takto.online
8fdc7bf fix(web): harden hero motion, favicon and contact channel
8de3b03 feat(web): rebrand commercial site to TAKTO on takto.online
bc99dd8 docs(web): document motion and accessibility behavior
a1ac0a4 test(web): cover visible content and motion safety
6132ddb fix(web): refine responsive animated sections
e5900df feat(web): animate product workflow mockups
fa35d7a feat(web): add progressive reveal motion system
7b5fc20 fix(web): restore invisible landing content
06a87bd chore(web): keep public/ so the Docker build can copy it
d08f5f0 docs(web): add deployment runbook
50170a4 test(web): add landing and form coverage
491ae82 feat(web): add legal and SEO pages
1b2fa5b feat(web): add demo request form
bd88a0e feat(web): build responsive marketing landing
dba6f5f chore(web): scaffold Tehus CRM marketing site
c5f62cf chore: inicializa repositorio tehus-crm-web
```

`main` está en `06a87bd`; `feature/visual-motion-polish` y `feature/takto-rebrand`
llevan el trabajo posterior.

## 1 · Crear el repositorio (lo hace el operador)

En GitHub: **New repository** → propietario `zabaisai` (el mismo del CRM) →
nombre `takto-web` → **Private** → sin inicializar con ningún archivo.

Con `gh` instalado y autenticado sería:

```bash
gh repo create zabaisai/takto-web --private --disable-wiki
```

## 2 · Añadir el remoto

```bash
cd /c/Users/Usuario/Desktop/Tehus-crm-web

git remote -v                       # debe estar vacío
git remote add origin git@github.com:zabaisai/takto-web.git
# o por HTTPS:
# git remote add origin https://github.com/zabaisai/takto-web.git
git remote -v
```

## 3 · Publicar (requiere autorización explícita)

```bash
git push -u origin main
git push -u origin feature/takto-rebrand
git push -u origin feature/visual-motion-polish   # opcional, historial de la fase visual
```

**Nunca** `--force`.

## 4 · Protección recomendada de `main`

En *Settings → Branches → Add rule* para `main`:

- Requerir pull request antes de fusionar (1 aprobación).
- Requerir que el check **CI / verify** pase.
- Requerir que la rama esté actualizada antes de fusionar.
- Bloquear force push y borrado de la rama.
- Aplicar las reglas también a administradores.

## 5 · CI

`.github/workflows/ci.yml` ya está en el repositorio. Ejecuta, en este orden:

`npm ci` → `npm test` → `npm run lint` → `npm run typecheck` → `npm run build`
→ `docker build` → comprobación de que la imagen no lleva artefactos de QA ni `.env`.

No necesita secretos.

## 6 · Después de publicar

Actualizar el paso 2 del runbook de despliegue para usar `git clone` en lugar de
`rsync`, que es lo que da trazabilidad y recuperación.
