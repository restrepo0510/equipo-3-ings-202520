# Carpeta client

## 📌 ¿Qué hace esta carpeta?

Esta carpeta contiene el código *FrontEnd* de la aplicación, es decir, la interfaz con la que interactúan los usuarios finales.

Aquí se desarrollan las pantallas y componentes que permiten:

* 👤 Registro e inicio de sesión de los usuarios.
* 📍 Visualización de mercados y restaurantes cercanos según la ubicación.
* 🛒 Catálogo de alimentos disponibles próximos a vencer.
* 🔔 Recepción de notificaciones inteligentes sobre productos de interés.
* 💳 Interacción con la pasarela de pagos y generación de comprobantes.

El código está desarrollado bajo buenas prácticas, empleando documentación con *JSDoc* para mantener una estructura clara, legible y fácilmente escalable.

---

## ⚙ Instalación

1. *Clona el repositorio* (si aún no lo tienes):
bash
git clone https://github.com/restrepo0510/equipo-3-ings-202520.git


2. *Ingresa a la carpeta del cliente:*
bash
cd client


3. *Instala las dependencias necesarias:*
bash
npm install


4. *Ejecuta el proyecto en modo desarrollo:*
bash
npx expo start


En la consola aparecerán opciones para abrir la app en:

* 💻 Development build
* 🤖 Android emulator
* 🍎 iOS simulator
* 🚀 Expo Go, una opción ligera para probar la app.

Puedes comenzar a desarrollar editando los archivos dentro del directorio app/, el cual usa *file-based routing* para organizar las vistas.

---

## 🧩 Estructura y estándares

El proyecto sigue los siguientes estándares:

* *Lenguaje principal:* JavaScript
* *Framework:* React Native con Expo
* *Documentación:* JSDoc para describir funciones, componentes y props
* *Estilo de código:* Basado en ESLint y Prettier
* *Buenas prácticas:* Código modular, reutilizable y comentado para facilitar el mantenimiento

---

## 🔄 Reiniciar el proyecto desde cero

Si deseas restablecer el proyecto a su estado inicial, ejecuta:
bash
npm run reset-project


Esto moverá el código de ejemplo a la carpeta app-example/ y creará una nueva carpeta app/ vacía para comenzar desde cero.

---

## 📚 Recursos útiles

* 📘 [Documentación de Expo](https://docs.expo.dev/)
* 📗 [Guías y tutoriales de Expo](https://docs.expo.dev/guides/)
* 📙 [Tutorial paso a paso de Expo](https://docs.expo.dev/tutorial/introduction/)

---

## 🧾 Versiones recomendadas

* *Node.js:* ≥ 18
* *npm:* ≥ 9
* *React Native:* ≥ 0.76
* *Expo SDK:* ≥ 51