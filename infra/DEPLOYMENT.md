# Production Deployment Guide (Phase 4)

This document walks through containerizing MyPDFHero, provisioning the VPS, and serving the site at **https://mypdfhero.com**.

---

## 1. Prerequisites

1. Ubuntu/Debian-based VPS with at least 2 vCPU / 4 GB RAM.
2. Docker Engine 24+ and Docker Compose plugin installed.
3. Domain `mypdfhero.com` with access to DNS records.
4. Git + SSH access to the VPS.

---

## 2. Prepare the repository on the VPS

```bash
ssh ubuntu@<VPS_IP>
sudo apt update && sudo apt install -y git
sudo mkdir -p /opt/mypdfhero && sudo chown $USER:$USER /opt/mypdfhero
cd /opt/mypdfhero
git clone https://github.com/<your-org>/mypdfhero.git .
```

> Tip: if the repository is private, configure SSH keys before cloning.

---

## 3. Build and start the production stack

```bash
cd /opt/mypdfhero
docker compose -f infra/docker-compose.prod.yml up -d --build
```

Services included:

| Service   | Description                         | Internal Port |
|-----------|-------------------------------------|---------------|
| backend   | Express API with Ghostscript/sharp  | 4000          |
| frontend  | Next.js app served via `next start` | 3000          |
| caddy     | Reverse proxy + automatic HTTPS     | 80/443 (public) |

Logs:

```bash
docker compose -f infra/docker-compose.prod.yml logs -f backend
docker compose -f infra/docker-compose.prod.yml logs -f frontend
docker compose -f infra/docker-compose.prod.yml logs -f caddy
```

To update the app later:

```bash
cd /opt/mypdfhero
git pull
docker compose -f infra/docker-compose.prod.yml up -d --build
```

---

## 4. DNS configuration

Create the following records at your DNS provider:

| Type | Host | Value        | TTL |
|------|------|--------------|-----|
| A    | @    | `<VPS_IP>`   | 5m  |
| A    | www  | `<VPS_IP>`   | 5m  |

Wait for propagation (usually < 10 minutes). Caddy will request TLS certificates automatically once the domain resolves to your VPS.

---

## 5. Environment variables & networking

- `frontend` container receives `NEXT_PUBLIC_API_URL=https://mypdfhero.com` so browser calls hit the same domain.
- `backend` container is locked to `FRONTEND_ORIGIN=https://mypdfhero.com` for strict CORS.
- Internal traffic happens over the `web` Docker network; no other ports are exposed.

---

## 6. Post-deployment checks

1. Visit `https://mypdfhero.com` – ensure the homepage renders.
2. Upload sample PDFs/images to every tool to confirm API responses.
3. Hit `https://mypdfhero.com/api/health` – should proxy to the backend health endpoint.
4. Set up uptime monitoring (Healthchecks, Better Stack, etc.).

---

## 7. Troubleshooting

- **Caddy can’t obtain certificates** – verify DNS A records point to the VPS and that ports 80/443 are open in the firewall.
- **sharp build failures** – rerun `docker compose ... up -d --build`. The Dockerfile already installs `libc6-compat`, `python3`, `make`, and `g++` for native modules.
- **Ghostscript missing** – container already installs it. If you run outside Docker, ensure `gs` is installed on the host.

---

You are now production-ready for Phase 4. 🎉

