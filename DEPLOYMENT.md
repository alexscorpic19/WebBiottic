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

3. Verificar configuración de email:
   ```bash
   # En el servidor de staging o producción
   cd /home/admin/web/[dominio]/public_html
   pnpm run test:email
   ```
   
   El script debería mostrar "Configuración válida" y "Correo enviado" con un ID de mensaje.

4. Verificar puertos en el servidor:
   ```bash
   # Verificar que los puertos 587 (TLS) y 465 (SSL) estén abiertos
   ```

## Estructura de Directorios
El sistema requiere los siguientes directorios:

```bash
/var/log/biottic/           # Logs de la aplicación
  ├── err.log              # Logs de error
  └── out.log              # Logs de salida estándar

/home/admin/web/test.biottic.com.co/
  ├── public_html/         # Directorio principal de la aplicación
  │   ├── assets/         # Archivos estáticos
  │   ├── server/         # Código del servidor
  │   └── index.html      # Archivo principal
  └── tmp/                # Archivos temporales
```

Los directorios se crean automáticamente durante el despliegue. Los permisos son:
- `/var/log/biottic`: 755, owner: admin:admin
- `/home/admin/web/test.biottic.com.co/tmp`: 755, owner: admin:admin

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

## Configuración de Puertos

El sistema utiliza los siguientes puertos:

- **Puerto 3000**: Servidor de staging (test.biottic.com.co)
- **Puerto 3001**: Servidor de producción (biottic.com.co)

Ambos servidores pueden ejecutarse simultáneamente en el mismo host.

## Verificación de Servidores

Para verificar que ambos servidores estén funcionando correctamente:

```bash
# Verificar servidor de staging
curl http://localhost:3000/api/health

# Verificar servidor de producción
curl http://localhost:3001/api/health
```

Ambos deben devolver un estado 200 con un JSON que contiene `{"status":"ok"}`.
