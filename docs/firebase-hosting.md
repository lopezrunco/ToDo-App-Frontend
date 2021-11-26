# Deploy con Firebase Hosting

### Configuracion inicial
Estos comandos se ejecutan solo una vez para crear y desplegar el proyecto
```bash
# Instalar el CLI de firebase
npm install -g firebase-tools
# Google login
firebase login
# Iniciar proyecto (opcional, solo si el proyecto no esta configurado)
firebase init
# Desplegar
firebase deploy
```

### Comandos para desplegar la app
```bash
# Compilar la app
npm run build
# Desplegar
firebase deploy
# Alternativa en un solo comando (build + deploy)
npm run deploy
```