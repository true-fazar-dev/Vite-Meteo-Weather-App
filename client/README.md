## Client (Vite + TypeScript + React)

The client-side application is built using **Vite**, **TypeScript**, and **React**. Vite leverages native ES Modules and Hot Module Replacement (HMR) to deliver instant, precise updates during development without reloading the page or resetting application state.

```
src/
├── assets/                 # Images, icons, and static media
├── components/             # Reusable UI components
│   └── icon-renderer.tsx   # Conditional switch-case component for rendering weather FontAwesome (used in App.tsx)
│   └── WeatherForecast.tsx # Forecast which inclue about five weather condition to be rendered on App.tsx
│   └── WeatherHeader.tsx   # Header of the weather for App.tsx
│   └── WeatherLoading.tsx  # Loading for the weather app project for App.tsx
├── interfaces/             # TypeScript interfaces and type definitions
│   └── weather.ts          # TypeScript interface for weather data types used with useState
├── App.tsx                 # Main application component
├── index.css               # Global styles (Tailwind directives)
└── main.tsx                # Application entry point

```

**`components/icon-renderer.tsx`**
Contains a conditional switch-case statement utilizing Font Awesome to dynamically render weather icons for `App.tsx`.

**`interfaces/weather.ts`**
Houses the TypeScript interfaces for weather data types utilized across application state (`useState`).

## Tech Stack & Libraries
    • Framework: React + TypeScript
    • Build Tool: Vite
    • Styling: Tailwind CSS (configured in vite.config.ts via plugins: [react(), tailwindcss()])
    • Icons: Font Awesome (^4.7.0)