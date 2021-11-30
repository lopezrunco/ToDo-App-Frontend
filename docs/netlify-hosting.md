# Deploy con Netlify

- Ir al dashboard
- Click en boton de importar proyecto existente ("Import from Git")
- Autorizar al servicio de Git que se este usando
- Seleccionar el repo
- Seleccionar la rama a desplegar
- Build settings
    - Base directory: dejarlo vacio
    - Build command: npm run build
    - Publish directory: build
- Click en "Show advanced" para setear variables de entorno
    - Setear las variables que agregariamos al archivo .env

### Mas info
- https://docs.netlify.com
- https://docs.netlify.com/routing/redirects/