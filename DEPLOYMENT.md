# Guía de Despliegue

## Requisitos Previos
- Node.js 20.x
- PNPM 8.x
- MongoDB 8.x
- Nginx
- Certificados SSL
- Cuenta de Gmail con contraseña de aplicación configurada

## Configuración del Email
1. Configurar Gmail:
   - Habilitar autenticación de dos factores
   - Generar contraseña de aplicación
   - Guardar la contraseña de aplicación para usar en EMAIL_PASS

2. Variables de entorno para email:
   ```bash
   # Local (.env)
   EMAIL_SERVICE=gmail
   EMAIL_USER=biottic.com@gmail.com
   EMAIL_PASS=njehsshsuvggpxot
   EMAIL_FROM=biottic.com@gmail.com
   EMAIL_TO=contacto@biottic.com.co
   EMAIL_SUBJECT_PREFIX=[Biottic Web]
   ```

3. Verificar puertos en el servidor:
   ```bash
   # Verificar que los puertos 587 (TLS) y 465 (SSL) estén abiertos
   sudo ufw status
   # Si es necesario, abrir puertos
   sudo ufw allow 587
   sudo ufw allow 465
   ```

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
