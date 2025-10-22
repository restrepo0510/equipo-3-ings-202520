# Decisiones Frontend

## Frameworks considerados

### 1) React Native (Expo)
**Contexto:** Framework de Facebook que permite crear apps nativas para iOS y Android con JavaScript/TypeScript. Expo añade herramientas para desarrollar y desplegar más fácil.

**Ventajas**
- Código compartido entre plataformas → desarrollo más rápido.  
- Gran ecosistema (mapas, notificaciones, geolocalización).  
- Expo ofrece builds automáticas y actualizaciones OTA.  
- Buen rendimiento para catálogos, mapas y reservas.  

**Desventajas**
- Algunas librerías nativas no están en el flujo *managed* de Expo.  
- Animaciones muy complejas pueden requerir optimización extra.  

---

### 2) Flutter
**Contexto:** SDK de Google que usa Dart y compila a código nativo, con motor de render propio.

**Ventajas**
- Alto rendimiento y animaciones fluidas.  
- UI consistente en iOS y Android.  
- Gran set de widgets y buena documentación.  

**Desventajas**
- Requiere aprender Dart (menos usado que JS/TS).  
- No reutiliza lógica existente en JavaScript.  
- Tamaño inicial de la app más grande.  

---

### 3) Ionic (con Capacitor)
**Contexto:** Framework basado en tecnologías web (HTML, CSS, JS/TS) que permite crear apps híbridas y PWAs, con acceso a APIs nativas vía Capacitor.

**Ventajas**
- Usa tecnologías web conocidas → curva de aprendizaje baja.  
- Una sola base de código para web y móvil.  
- Rápido para prototipos y PWAs.  

**Desventajas**
- Rendimiento menor en funciones intensivas (mapas, gráficos).  
- Experiencia menos “nativa”.  
- Algunas APIs dependen de plugins externos.  

---

## Decisión final

Se elige **React Native con Expo** porque:  
- El equipo domina JavaScript/TypeScript → curva de aprendizaje corta.  
- Cumple con los requisitos del MVP:  
  - **RF-02, RF-06** (mapas y geolocalización).  
  - **RF-03, RF-07** (catálogo y reservas).  
  - **RF-16, RF-17** (pasarela y comprobantes).  
- Permite iterar rápido gracias a Expo (builds automáticas, OTA updates).  
- Si surge alguna limitación, se puede pasar a Bare Workflow sin perder la base en React Native.  

 En conclusión, **React Native (Expo)** es la mejor opción para el MVP por velocidad, compatibilidad y facilidad de mantenimiento.
