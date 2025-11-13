# 📑 Requisitos Funcionales


---
## RF-01: Inicio de sesión y registro de usuarios

Descripción: Permite que los usuarios se registren o inicien sesión, con su información almacenada de forma segura en una base de datos.

Criterios de aceptación:

```gherkin
Feature: Inicio de sesión y registro de usuarios
  Scenario: Registro e inicio de sesión exitoso
    Given el usuario no tiene cuenta y desea registrarse o iniciar sesión
    When el usuario ingresa sus credenciales y las guarda en la base de datos
    Then el sistema almacena la información de forma segura y permite el inicio de sesión
```

Prioridad: P0

Puntos: 2

---
## RF-02: Visualización de mercados/restaurantes cercanos

Descripción: Muestra en una landing las ubicaciones de los restaurantes o mercados cercanos al usuario según su ubicación actual.

Criterios de aceptación:

```gherkin
Feature: Visualización de mercados y restaurantes cercanos
  Scenario: Mostrar restaurantes cercanos según ubicación
    Given el usuario tiene activada su ubicación
    When el sistema detecta su ubicación actual
    Then se muestran en la landing los mercados o restaurantes más cercanos
```

Prioridad: P0

Puntos: 3

---
## RF-03: Catálogo de productos disponibles

Descripción: Presenta un catálogo de alimentos disponibles que están próximos a vencer y que pueden ser reclamados o adquiridos.

Criterios de aceptación:

```gherkin
Feature: Catálogo de productos disponibles
  Scenario: Visualización de alimentos próximos a vencer
    Given existen productos en inventario próximos a vencer
    When el usuario accede al catálogo
    Then el sistema muestra los alimentos disponibles para ser reclamados o adquiridos
```

Prioridad: P0

Puntos: 2

---
## RF-04: Visualización de restaurantes disponibles y no disponibles

Descripción: Muestra los restaurantes activos o inactivos en la zona del usuario, priorizando los que estén asociados con la aplicación.

Criterios de aceptación:

```gherkin
Feature: Restaurantes activos e inactivos
  Scenario: Mostrar estado de restaurantes
    Given existen restaurantes asociados a la aplicación
    When el usuario consulta la lista de restaurantes
    Then el sistema muestra cuáles están activos y cuáles no disponibles
```

Prioridad: P1

Puntos: 3

---
## RF-05: Barra de búsqueda de restaurantes

Descripción: Permite al usuario buscar restaurantes específicos según nombre o categoría mediante una barra de navegación.

Criterios de aceptación:

```gherkin
Feature: Búsqueda de restaurantes
  Scenario: Buscar un restaurante específico
    Given el usuario está en la aplicación
    When el usuario ingresa un nombre o categoría en la barra de búsqueda
    Then el sistema muestra los restaurantes que coinciden
```

Prioridad: P0

Puntos: 2

---
## RF-06: Geolocalización del usuario

Descripción: Detecta y muestra la ubicación actual del usuario para relacionarla con los restaurantes más cercanos disponibles.

Criterios de aceptación:

```gherkin
Feature: Geolocalización del usuario
  Scenario: Detectar ubicación actual
    Given el usuario tiene habilitada la geolocalización
    When el sistema obtiene la ubicación
    Then se muestran los restaurantes más cercanos disponibles
```

Prioridad: P0

Puntos: 5

---
## RF-07: Reserva temporal de productos

Descripción: Permite al usuario reservar un producto por un tiempo limitado, como 5 minutos, mientras decide pagar.

Criterios de aceptación:

```gherkin
Feature: Reserva temporal de productos
  Scenario: Reservar un producto por tiempo limitado
    Given el usuario selecciona un producto
    When realiza una reserva
    Then el producto queda apartado durante 30 minutos
```

Prioridad: P1

Puntos: 3

---
## RF-08: Escáner de código QR o de barras

Descripción: Facilita a los negocios el registro rápido de productos mediante el escaneo de códigos, incluyendo fecha de vencimiento.

Criterios de aceptación:

```gherkin
Feature: Registro de productos mediante escaneo
  Scenario: Escanear producto con QR o código de barras
    Given el negocio tiene un producto con código QR o de barras
    When el producto es escaneado
    Then el sistema registra automáticamente la información incluyendo fecha de vencimiento
```

Prioridad: P1

Puntos: 3

---
## RF-09: Filtro por tiempo de vencimiento

Descripción: Ofrece un filtro para ordenar los productos según el tiempo que les queda antes de vencer, como 1 día, 3 días o 1 semana.

Criterios de aceptación:

```gherkin
Feature: Filtro de productos por tiempo de vencimiento
  Scenario: Ordenar productos por fecha de vencimiento
    Given el usuario quiere ver productos próximos a vencer
    When aplica un filtro de 1 día, 3 días o 1 semana
    Then el sistema muestra los productos ordenados según la selección
```

Prioridad: P1

Puntos: 2

---
## RF-10: Notificaciones inteligentes para usuarios

Descripción: Envía alertas automáticas al usuario cuando un producto de su interés está disponible y cerca de su ubicación.

Criterios de aceptación:

```gherkin
Feature: Notificaciones para usuarios
  Scenario: Alertas sobre productos de interés
    Given el usuario ha mostrado interés en ciertos productos
    When un producto de su interés está disponible y cercano
    Then el sistema envía una notificación automática
```

Prioridad: P0

Puntos: 3

---
## RF-11: Alertas automáticas para negocios

Descripción: Notifica a los negocios cuando un producto próximo a vencer aún no ha sido vendido, para que tomen acciones rápidas.

Criterios de aceptación:

```gherkin
Feature: Alertas para negocios
  Scenario: Notificación sobre productos no vendidos
    Given un producto próximo a vencer no ha sido vendido
    When se detecta esta situación
    Then el sistema notifica al negocio para que tome acción
```

Prioridad: P1

Puntos: 3

---
## RF-12: Carga masiva de productos

Descripción: Permite a los negocios subir varios productos simultáneamente mediante archivos como Excel o CSV.

Criterios de aceptación:

```gherkin
Feature: Carga masiva de productos
  Scenario: Subida de productos mediante archivo
    Given el negocio tiene un archivo Excel o CSV con productos
    When carga el archivo en el sistema
    Then los productos se registran de forma simultánea
```

Prioridad: P1

Puntos: 3

---
## RF-13: Edición de precios dinámicos

Descripción: Ofrece a las tiendas la posibilidad de ajustar el precio de los productos según la cercanía del vencimiento.

Criterios de aceptación:

```gherkin
Feature: Precios dinámicos
  Scenario: Ajuste de precio según fecha de vencimiento
    Given un producto está próximo a vencer
    When el negocio edita el precio
    Then el sistema actualiza y muestra el nuevo precio
```

Prioridad: P1

Puntos: 3

---
## RF-14: Estadísticas de impacto ambiental

Descripción: Muestra a los negocios información como la cantidad de alimentos rescatados o CO₂ evitado gracias a sus acciones.

Criterios de aceptación:

```gherkin
Feature: Estadísticas ambientales
  Scenario: Visualización de impacto ambiental
    Given el negocio ha realizado ventas o rescates de alimentos
    When accede a su panel de estadísticas
    Then el sistema muestra la cantidad de alimentos rescatados y CO₂ evitado
```

Prioridad: P2

Puntos: 3

---
## RF-15: Navegación con Google Maps

Descripción: Permite abrir la ubicación del restaurante o tienda en aplicaciones como Google Maps para facilitar la recolección.

Criterios de aceptación:

```gherkin
Feature: Navegación con Google Maps
  Scenario: Abrir ubicación del restaurante
    Given el usuario selecciona un restaurante o tienda
    When pulsa la opción “ver en Google Maps”
    Then el sistema abre la ubicación en la aplicación de mapas
```

Prioridad: P1

Puntos: 5

---
## RF-16: Pasarela de pagos

Descripción: Integra un sistema que recoja y transmita la información de las transacciones realizadas por el usuario.

Criterios de aceptación:

```gherkin
Feature: Pasarela de pagos
  Scenario: Realizar una transacción
    Given el usuario selecciona productos para comprar
    When procede al pago
    Then el sistema procesa y transmite la información de la transacción
```

Prioridad: P0

Puntos: 5

---
## RF-17: Comprobantes de pago

Descripción: Envía comprobantes de pago al correo electrónico, por SMS y dentro del mismo aplicativo una vez realizada la compra.

Criterios de aceptación:

```gherkin
Feature: Comprobantes de pago
  Scenario: Enviar comprobante al usuario
    Given el usuario ha realizado una compra
    When el pago es confirmado
    Then el sistema envía el comprobante por correo, SMS y dentro del aplicativo
```

Prioridad: P0

Puntos: 3

---
## RF-18: Límite de compra por usuario

Descripción: Restringe la cantidad máxima de productos que un usuario puede adquirir, para evitar acaparamiento de alimentos.

Criterios de aceptación:

```gherkin
Feature: Restricción de compras
  Scenario: Límite máximo por usuario
    Given un usuario está adquiriendo productos
    When alcanza el límite permitido
    Then el sistema impide realizar más compras de ese producto
```

Prioridad: P1

Puntos: 2

---
## RF-19: Horarios especiales de venta

Descripción: Permite a los negocios establecer horarios específicos en los que ofrecerán productos próximos a vencer.

Criterios de aceptación:

```gherkin
Feature: Horarios especiales de venta
  Scenario: Disponibilidad según horario definido
    Given un negocio define un horario especial de venta
    When el usuario accede fuera de ese horario
    Then el producto no estará disponible hasta que el horario lo permita
```

Prioridad: P2

Puntos: 3

---
## RF-20: Comunicación con el usuario

Descripción: Incluye una opción para que los negocios respondan dudas o comentarios enviados por los usuarios.

Criterios de aceptación:

```gherkin
Feature: Comunicación usuario-negocio
  Scenario: Interacción mediante mensajes
    Given un usuario envía una duda o comentario
    When el negocio recibe la consulta
    Then el sistema permite al negocio responder desde la aplicación
```

Prioridad: P2

Puntos: 3 

---

## RF-21: Perfil de usuario

Descripción: Permite que los usuarios y empresas visualicen y editen la información de su perfil, incluyendo nombre, correo electrónico y foto de perfil.

Criterios de aceptación:

```gherkin
Feature: Perfil de usuario
  Scenario: Visualización y edición de perfil
    Given el usuario tiene una cuenta activa
    When el usuario accede a su perfil
    Then puede visualizar y actualizar sus datos personales de manera segura
```

Prioridad: P1

Puntos: 3

---

## RF-22: Apartado de productos favoritos

Descripción: Permite a los usuarios marcar productos como favoritos para acceder a ellos rápidamente en una sección dedicada.

Criterios de aceptación:

```gherkin
Feature: Productos favoritos
  Scenario: Agregar un producto a favoritos
    Given el usuario está visualizando un producto
    When el usuario selecciona la opción de “Agregar a favoritos”
    Then el producto se guarda en la sección de favoritos del usuario
```

Prioridad: P2

Puntos: 2

---

## RF-23: Apartado de opiniones

Descripción: Permite visualizar las opiniones de otros usuarios sobre un producto.

Criterios de aceptación:

```gherkin
Feature: Opiniones de productos
  Scenario: Visualizar opiniones de un producto
    Given el usuario accede al detalle de un producto
    When existen opiniones registradas
    Then el usuario puede ver una lista de opiniones con calificación y comentarios
```

Prioridad: P2

Puntos: 2

---

## RF-24: Escribir una opinión

Descripción: Permite a los usuarios escribir y publicar una opinión sobre un producto.

Criterios de aceptación:

```gherkin
Feature: Escribir opinión sobre producto
  Scenario: Publicar una nueva opinión
    Given el usuario tiene una cuenta activa
    When el usuario accede al detalle de un producto y escribe su comentario
    Then el sistema guarda y muestra la nueva opinión junto con la calificación
```

Prioridad: P1

Puntos: 3

---

## RF-25: Agregar un nuevo producto (solo empresas)

Descripción: Permite que las empresas registradas agreguen nuevos productos con información como nombre, descripción, imágenes y precio.

Criterios de aceptación:

```gherkin
Feature: Agregar un nuevo producto
  Scenario: Empresa registra un producto
    Given el usuario tiene un rol de empresa
    When accede al apartado de “Agregar producto” e ingresa la información requerida
    Then el producto queda registrado y disponible en la plataforma
```

Prioridad: P0

Puntos: 4

---

## RF-26: Editar un producto (solo empresas)

Descripción: Permite que las empresas editen los detalles de sus productos previamente registrados.

Criterios de aceptación:

```gherkin
Feature: Editar producto existente
  Scenario: Empresa modifica información de un producto
    Given el usuario tiene un rol de empresa y el producto le pertenece
    When edita campos como nombre, descripción o precio
    Then el sistema actualiza la información y la refleja en la plataforma
```

Prioridad: P0

Puntos: 3

---


