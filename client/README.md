# Client (VITE + Typescript + React)

for this client part of the project I use Vite with React. Vite provided Hot Module Replacement (HMR). Over native ES Modules, it can leverage the API to provide instant, precise update without reloading page or blowing away application state, in this project we used Vite with React

```
src/
├── assets/                 # Images, icons, and static media
├── components/             # Reusable UI components
│   └── icon-renderer.tsx   # Conditional switch-case component for rendering weather favicons (used in App.tsx)
│   └── WeatherForecast.tsx # Forecast which inclue about five weather condition to be rendered on App.tsx
│   └── WeatherHeader.tsx   # Header of the weather for App.tsx
│   └── WeatherLoading.tsx  # Loading for the weather app project for App.tsx
├── interfaces/             # TypeScript interfaces and type definitions
│   └── weather.ts          # TypeScript interface for weather data types used with useState
├── App.tsx                 # Main application component
├── index.css               # Global styles (Tailwind directives)
└── main.tsx                # Application entry point

```

**Components: icon-renderer.tsx**
this is where a conditional switch case statement to ensure what icon it will render using favicon, used this for app.tsx

**interfaces: weather.ts**
this is where interface of weather that will use on useState weather data types, 

## Tech Stack & Libraries
    • Framework: React + TypeScript
    • Build Tool: Vite
    • Styling: Tailwind CSS (configured in vite.config.ts via plugins: [react(), tailwindcss()])
    • Icons: Font Awesome (^4.7.0)