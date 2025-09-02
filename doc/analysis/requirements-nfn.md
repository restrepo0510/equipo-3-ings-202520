# 📑 Requisitos No Funcionales


## RNF-01: Actualización en tiempo real de disponibilidad

**Descripción:**  
La plataforma deberá mostrar en tiempo real la disponibilidad de alimentos rescatados de restaurantes, plazas de mercado y supermercados, reduciendo riesgos de pérdida por falta de información actualizada.

**Criterios de aceptación :**
```gherkin
Feature: Actualización en tiempo real de disponibilidad
  Scenario: Consulta de alimentos disponibles
    Given un usuario consulta la lista de alimentos
    When un restaurante actualiza su inventario
    Then el sistema refleja inmediatamente la disponibilidad actualizada
```

**Prioridad:** P0
Puntos: 3
---

## RNF-02: Confiabilidad en el manejo de datos sensibles

**Descripción:**
El sistema deberá garantizar que las transacciones relacionadas con alimentos, beneficiarios y donaciones se registren de manera confiable, evitando duplicaciones o pérdidas de información.

**Criterios de aceptación :**

```gherkin
Feature: Confiabilidad de datos
  Scenario: Registro de una donación
    Given una empresa dona alimentos
    When el sistema guarda la información
    Then debe registrarse sin duplicados ni pérdidas
```

**Prioridad:** P0
Puntos: 3
---

## RNF-03: Tolerancia a fallos

**Descripción:**
La aplicación deberá recuperarse automáticamente ante fallos inesperados (caídas de servidor, errores de red), asegurando la continuidad del servicio en procesos críticos como reservas y entregas.

**Criterios de aceptación :**

```gherkin
Feature: Tolerancia a fallos
  Scenario: Caída de servidor
    Given el sistema sufre una interrupción
    When se restablece el servicio
    Then la aplicación debe continuar operando sin pérdida de reservas confirmadas
```

**Prioridad:** P1
Puntos: 3
---

## RNF-04: Disponibilidad offline básica

**Descripción:**
En comunidades vulnerables con conectividad limitada, el sistema permitirá acceder offline a información previamente cargada, como alimentos reservados o direcciones de puntos de entrega.

**Criterios de aceptación :**

```gherkin
Feature: Disponibilidad offline
  Scenario: Acceso en zonas sin conexión
    Given un usuario pierde conexión a internet
    When intenta ver sus reservas de alimentos
    Then el sistema muestra la información almacenada localmente
```

**Prioridad:** P1
Puntos: 3
---

## RNF-05: Accesibilidad para personas con discapacidad

**Descripción:**
La plataforma deberá cumplir con estándares de accesibilidad digital (WCAG 2.1), garantizando que personas con discapacidad visual o motora puedan acceder a información sobre alimentos y rutas de entrega.

**Criterios de aceptación :**

```gherkin
Feature: Accesibilidad
  Scenario: Navegación con lector de pantalla
    Given un usuario con discapacidad visual accede a la app
    When utiliza un lector de pantalla
    Then la aplicación debe ser completamente navegable y comprensible
```

**Prioridad:** P0
Puntos: 5
---

## RNF-06: Seguridad en almacenamiento de credenciales

**Descripción:**
Todas las credenciales y datos sensibles deberán almacenarse con estándares de seguridad (hashing, salting y cifrado), protegiendo tanto a beneficiarios como a empresas donantes.

**Criterios de aceptación :**

```gherkin
Feature: Seguridad de credenciales
  Scenario: Almacenamiento seguro
    Given un usuario registra su información personal
    When el sistema guarda los datos
    Then deben almacenarse usando hashing y cifrado seguro
```

**Prioridad:** P0
Puntos: 5
---

## RNF-07: Interoperabilidad con sistemas externos

**Descripción:**
La plataforma deberá integrarse con sistemas externos (bases de datos de restaurantes, aplicaciones de logística o instituciones públicas) para facilitar la coordinación en el rescate y redistribución de alimentos.

**Criterios de aceptación :**

```gherkin
Feature: Interoperabilidad
  Scenario: Conexión con sistema externo
    Given la plataforma necesita información de inventario de un restaurante
    When el sistema realiza la conexión
    Then la información debe integrarse correctamente sin pérdida de datos
```

**Prioridad:** P1
Puntos: 5
---

## RNF-08: Mantenibilidad y pruebas

**Descripción:**
El código deberá cumplir con estándares de buenas prácticas y alcanzar al menos un 80% de cobertura en pruebas unitarias, garantizando que las mejoras futuras no afecten la estabilidad del sistema de rescate alimentario.

**Criterios de aceptación :**

```gherkin
Feature: Mantenibilidad y pruebas
  Scenario: Validación de cobertura
    Given un desarrollador ejecuta las pruebas del sistema
    When se revisa el reporte de cobertura
    Then el resultado debe mostrar al menos un 80%
```

**Prioridad:** P2
Puntos: 5
---

## RNF-09: Sostenibilidad y consumo responsable

**Descripción:**
La plataforma promoverá la reducción del desperdicio mediante mensajes y recomendaciones de consumo consciente (ejemplo: sugerencias de porciones adecuadas o tips de conservación de alimentos).

**Criterios de aceptación :**

```gherkin
Feature: Sostenibilidad
  Scenario: Recomendaciones de consumo
    Given un usuario agrega productos a su reserva
    When selecciona cantidades elevadas
    Then el sistema muestra mensajes que fomenten el consumo responsable
```

**Prioridad:** P2
Puntos: 3
---

## RNF-10: Uso ético de los datos del usuario

**Descripción:**
La plataforma garantizará la privacidad de los usuarios, evitando la venta de datos y cumpliendo con la normativa de protección de datos en Colombia (Ley 1581 de 2012).

**Criterios de aceptación :**

```gherkin
Feature: Uso ético de los datos
  Scenario: Manejo de información personal
    Given un usuario registra datos en la plataforma
    When el sistema almacena esta información
    Then se asegura que no se use sin consentimiento ni se comparta con terceros
```

**Prioridad:** P0
Puntos: 3
