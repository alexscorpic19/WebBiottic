# Guía de Despliegue

## Requisitos Previos
- Node.js 20.x
- PNPM 8.x
- MongoDB 8.x
- Nginx
- Certificados SSL

## Configuración del Servidor
1. Instalar dependencias del sistema
```bash
apt update
apt install nginx mongodb
```

2. Configurar Nginx
- Copiar biottic.conf a /etc/nginx/sites-available/
- Crear enlace simbólico en sites-enabled
- Reiniciar Nginx

3. Configurar MongoDB
- Seguir las mejores prácticas de seguridad
- Crear usuario y base de datos

4. Configurar PM2
- Instalar PM2 globalmente
- Configurar el archivo ecosystem.config.js
- Configurar el inicio automático

## Despliegue Manual (si es necesario)
1. Clonar el repositorio
2. Instalar dependencias: `pnpm install`
3. Construir: `pnpm run build`
4. Iniciar servidor: `pm2 start ecosystem.config.js`

## CI/CD
El despliegue automático se realiza mediante GitHub Actions:
- Staging: Push a `develop`
- Producción: Crear tag con formato `v*`