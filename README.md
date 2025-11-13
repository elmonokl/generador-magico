# Generador de Contraseñas Seguras

Generador de contraseñas aleatorias y seguras desarrollado con HTML, CSS y JavaScript puro. Permite crear contraseñas personalizadas con opciones configurables de longitud y tipos de caracteres.

## Descripción

Aplicación web que genera contraseñas seguras usando el API `crypto.getRandomValues` del navegador. Funciona completamente del lado del cliente, garantizando que las contraseñas nunca salgan de tu dispositivo.

## Características

- Longitud configurable entre 8 y 20 caracteres
- Opciones de caracteres: minúsculas (siempre activas), mayúsculas, números y símbolos
- Generación segura con `crypto.getRandomValues`
- Botón para copiar al portapapeles
- Indicador de fortaleza y entropía
- Interfaz responsive con tema oscuro
- Sin dependencias externas

## Cómo Ejecutar

### Opción 1: Abrir directamente

1. Descarga o clona el repositorio
2. Navega a la carpeta `generador-de-contrasenas`
3. Abre `index.html` en tu navegador

### Opción 2: Servidor local

**Python:**
```bash
cd generador-de-contrasenas
python -m http.server 8000
```
Abre `http://localhost:8000`

**Node.js:**
```bash
npm install -g http-server
cd generador-de-contrasenas
http-server
```

**PHP:**
```bash
cd generador-de-contrasenas
php -S localhost:8000
```

## Estructura del Proyecto

```
generador-de-contrasenas/
├── index.html
├── src/
│   ├── css/styles.css
│   └── js/main.js
└── README.md
```

## Uso

1. Ajusta la longitud (8-20 caracteres) con el control deslizante o campo numérico
2. Selecciona los tipos de caracteres deseados
3. Haz clic en "Generar contraseña"
4. Usa "Copiar" para copiar al portapapeles
5. Usa "Regenerar" para generar una nueva contraseña

## Seguridad

- Generación local en el navegador
- Utiliza `crypto.getRandomValues` para aleatoriedad criptográfica
- Sin comunicación con servidores externos
- Código abierto y auditable

## Tecnologías

- HTML5
- CSS3 (variables CSS, Grid, Flexbox)
- JavaScript ES6+
- Web Crypto API

## Requisitos

Navegador moderno compatible con:
- ES6+ JavaScript
- Web Crypto API
- CSS Grid y Flexbox

Compatibilidad: Chrome 11+, Firefox 21+, Safari 5.1+, Edge 12+

## Licencia

MIT License

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir:
1. Haz un fork del repositorio
2. Crea una rama para tu característica
3. Realiza tus cambios
4. Envía un pull request

---

**Nota**: Herramienta educativa y de uso personal. Para aplicaciones críticas, considera herramientas auditadas profesionalmente.
