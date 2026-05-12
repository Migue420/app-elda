# Elda Circular 2026 - Sistema Operativo Cívico (Civic OS)

Portal dinámico para la gestión de residuos e innovación ciudadana en Elda, España. Una herramienta de ingeniería social y financiera diseñada para maximizar el ahorro municipal (>90€/tonelada) y fomentar el civismo a través de la gamificación.

## 🎯 Objetivos del Proyecto

- **Transformar el civismo en ahorro municipal**: Cada tonelada recuperada ahorra 90€ al municipio
- **Gamificación Z-ero**: Cuestionarios por niveles (Primaria, Secundaria, Universidad)
- **Sistema de recompensas**: Elda-Coins canjeables en comercios locales
- **Mapa de proximidad**: 10 "Esquinas de Quita y Pon" optimizadas
- **Calendario mono-producto**: Un residuo diferente cada día

## 📁 Estructura del Proyecto

```
/workspace
├── docs/                    # Documentación estratégica
├── public/
│   ├── media/              # Iconos y assets multimedia
│   ├── manifest.json       # PWA Manifest
│   └── sw.js               # Service Worker
├── src/
│   ├── components/         # Componentes UI React
│   │   ├── ProximityMap.jsx
│   │   ├── MonoProductCalendar.jsx
│   │   ├── QuizEngine.jsx
│   │   └── AuditDashboard.jsx
│   ├── context/            # Context API para estado global
│   │   └── AppContext.jsx
│   ├── data/               # Archivos JSON de datos
│   │   ├── collectionPoints.json
│   │   ├── quizData.json
│   │   └── partners.json
│   ├── hooks/              # Custom React Hooks
│   │   └── usePWA.js
│   ├── pages/              # Páginas principales
│   │   └── LandingPage.jsx
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globales
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Tecnologías Utilizadas

- **React 19** - Framework UI
- **Vite 8** - Build tool y dev server
- **Lucide React** - Iconografía técnica
- **PWA** - Progressive Web App instalable
- **LocalStorage** - Persistencia de datos local

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js >= 18.x
- npm >= 9.x

### Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🎨 Diseño "Boogie Pop Art"

La interfaz utiliza una estética vibrante con:
- Colores neón: `#ff00ff` (magenta), `#00ff88` (verde), `#ffd700` (dorado)
- Alto contraste sobre fondos oscuros
- Gradientes y efectos glow
- Tipografía moderna y espaciada

## 🪙 Sistema de Elda-Coins

### Ganancia de Monedas
- Completar cuestionarios: 10-30 puntos según nivel
- Reciclaje verificado: Variables según kg
- Retos semanales: Bonus especiales

### Canje en Partners
Los comercios locales pueden validar el canje:
- Cafeterías: 50 coins = 10% descuento
- Panaderías: 30 coins = producto gratis
- Librerías: 100 coins = 15% descuento

## 📊 Panel de Auditoría

El dashboard muestra en tiempo real:
- Kilogramos totales recuperados
- Ahorro municipal acumulado (90€/tonelada)
- Elda-Coins en circulación
- Progreso hacia objetivos anuales

## 🔗 Integración Multimedia

Preparado para recibir URLs de Google Drive/Notebook:

```javascript
// Ejemplo de configuración para despliegue
const MEDIA_URLS = {
  icons: 'https://drive.google.com/...',
  videos: 'https://notebook.google.com/...'
};
```

## 📱 PWA Installable

La aplicación es una Progressive Web App que:
- Funciona offline gracias al Service Worker
- Se puede instalar en dispositivos móviles
- Notificaciones push (futuro)
- Actualizaciones automáticas en segundo plano

## 👥 Niveles Educativos

### Primaria (🌟)
- Preguntas básicas sobre reciclaje
- 10 puntos por respuesta correcta
- Enfoque lúdico y visual

### Secundaria (⚡)
- Conceptos intermedios de economía circular
- 20 puntos por respuesta correcta
- Datos específicos del municipio

### Universidad (🎓)
- Temas avanzados de sostenibilidad
- 30 puntos por respuesta correcta
- Casos de estudio reales

## 📈 Métricas de Impacto

| Métrica | Objetivo 2026 |
|---------|--------------|
| Toneladas recuperadas | +500 Tn |
| Ahorro municipal | 45.000€ |
| Participación ciudadana | 60% |
| Elda-Coins emitidas | 100.000 |
| Partners adheridos | 50+ |

## 📄 Licencia

MIT License - Proyecto abierto para la comunidad de Elda

---

**Elda Circular 2026** - Transformando residuos en recursos, civismo en ahorro.
