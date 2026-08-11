# Guitunex

Suite de herramientas web para músicos, construida como proyecto de portfolio y aprendizaje. Funciona completamente en el navegador, sin backend.

## Herramientas

### Afinador cromático

- Detección de pitch en tiempo real usando el algoritmo YIN.
- Feedback visual con tira de ticks tipo "strobe tuner" y desviación en cents.
- Selector de instrumento (Guitarra / Bajo) y afinación (Standard, Drop D, Eb Standard).
- Audio real de referencia por cuerda, con repetición automática opcional.
- Selección de dispositivo de entrada de audio (útil con interfaces externas).

### Metrónomo

- Scheduling preciso basado en Web Audio API (no `setInterval`).
- Compás configurable (2/4 a 7/4) y subdivisión (negras, corcheas, tresillos, semicorcheas).
- Acento en el primer beat de cada compás.
- Indicador visual de beat sincronizado con el audio.

## Stack

- React + TypeScript + Vite
- Web Audio API
- CSS Modules
- Vitest para testing

## Desarrollo

```bash
npm install
npm run dev
```

## Tests

```bash
npm run test -- --run
```

## Arquitectura

El proyecto sigue una estructura Feature-First:

```
src/
  features/
    tuner/
    metronome/
  shared/
```

Cada feature contiene sus propios `components/`, `hooks/` y `services/`. El código genuinamente reutilizable entre features vive en `shared/`.