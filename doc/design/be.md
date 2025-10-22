# Decisiones Backend

## Frameworks considerados

### 1) Node.js con NestJS (TypeScript)
**Contexto:** Framework sobre Node.js que ofrece arquitectura modular, inyección de dependencias y conventions para construir APIs escalables.

**Pros**
- Excelente para I/O intensivo y tiempo real (WebSockets).  
- TypeScript facilita compartir tipos con el frontend.  
- Estructura modular que facilita testing y migración a microservicios.  
- Integración con Swagger/OpenAPI.

**Contras**
- Menos eficiente en tareas CPU-bound (se delegan a workers).  
- Requiere prácticas sólidas de timeouts, rate limiting y manejo de errores.

---

### 2) Django + Django REST Framework (Python)
**Contexto:** Framework maduro en Python; DRF agiliza la creación de APIs REST.

**Pros**
- Desarrollo rápido (auth, admin, ORM listo).  
- Muy bueno para lógica de negocio compleja y transacciones.

**Contras**
- Menos alineado con TypeScript del frontend (no hay sharing directo de tipos).  
- No es la opción más natural para I/O masivo en tiempo real (aunque es posible con Channels).

---

### 3) Spring Boot (Java / Kotlin)
**Contexto:** Framework enterprise para Java/Kotlin, robusto y ampliamente usado en sistemas críticos.

**Pros**
- Gran madurez, seguridad y rendimiento consistente.  
- Excelente para integraciones empresariales y transaccionalidad.

**Contras**
- Curva de aprendizaje y tiempo de desarrollo mayor.  
- Mayor overhead para prototipado rápido del MVP.

---

## Decisión final

**Elegimos: Node.js con NestJS (TypeScript).**

**Por qué:**  
- Mejor velocidad de entrega para el MVP si el equipo ya conoce JS/TS.  
- Soporta necesidades del MVP: autenticación, reservas temporales, notificaciones, geolocalización y pasarelas de pago.  
- Permite compartir DTOs/types con el frontend (React Native + TypeScript), reduciendo errores de integración.  
- Arquitectura modular que facilita evolucionar a microservicios y a un despliegue contenerizado.

---

## Complementos técnicos 

- **Base de datos:** PostgreSQL + PostGIS (ACID y consultas geoespaciales).  
- **Cache / locks:** Redis (TTL para reservas temporales, locks distribuidos).  
- **Colas / notificaciones:** RabbitMQ (desacopla API y workers; simple para MVP).  
- **Infra:** Docker para el MVP; migrar a Kubernetes gestionado cuando haga falta.  
- **Seguridad:** JWT + refresh tokens, TLS, cumplimiento de requisitos de pasarela (no almacenar datos sensibles).

---

## Riesgos y mitigaciones 
- **CPU-bound tasks:** offload a workers o servicios especializados.  
- **Concursos sobre stock/reservas:** Redis locks + transacciones en Postgres.  
- **Operación:** empezar con Docker Compose; usar servicios gestionados (DB, Redis) si es posible.
