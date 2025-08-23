Requisitos Funcionales (RF)

**RF-01: Inicio de sesión y registro de usuarios**

Descripción: Permite que los usuarios se registren o inicien sesión, con su información almacenada de forma segura en una base de datos.

Criterios de aceptación :

Feature: Inicio de sesión y registro de usuarios
  Scenario: Registro e inicio de sesión exitoso
    Given el usuario no tiene cuenta y desea registrarse o iniciar sesión
    When el usuario ingresa sus credenciales y las guarda en la base de datos
    Then el sistema almacena la información de forma segura y permite el inicio de sesión

Prioridad: P0

**RF-02: Visualización de mercados/restaurantes cercanos**

Descripción: Muestra en una landing las ubicaciones de los restaurantes o mercados cercanos al usuario según su ubicación actual.

Criterios de aceptación :

Feature: Visualización de mercados y restaurantes cercanos
  Scenario: Mostrar restaurantes cercanos según ubicación
    Given el usuario tiene activada su ubicación
    When el sistema detecta su ubicación actual
    Then se muestran en la landing los mercados o restaurantes más cercanos

Prioridad: P0

**RF-03: Catálogo de productos disponibles**

Descripción: Presenta un catálogo de alimentos disponibles que están próximos a vencer y que pueden ser reclamados o adquiridos.

Criterios de aceptación :

Feature: Catálogo de productos disponibles
  Scenario: Visualización de alimentos próximos a vencer
    Given existen productos en inventario próximos a vencer
    When el usuario accede al catálogo
    Then el sistema muestra los alimentos disponibles para ser reclamados o adquiridos

Prioridad: P0

**RF-04: Visualización de restaurantes disponibles y no disponibles**

Descripción: Muestra los restaurantes activos o inactivos en la zona del usuario, priorizando los que estén asociados con la aplicación.

Criterios de aceptación :

Feature: Restaurantes activos e inactivos
  Scenario: Mostrar estado de restaurantes
    Given existen restaurantes asociados a la aplicación
    When el usuario consulta la lista de restaurantes
    Then el sistema muestra cuáles están activos y cuáles no disponibles

Prioridad: P1

**RF-05: Barra de búsqueda de restaurantes**

Descripción: Permite al usuario buscar restaurantes específicos según nombre o categoría mediante una barra de navegación.

Criterios de aceptación :

Feature: Búsqueda de restaurantes
  Scenario: Buscar un restaurante específico
    Given el usuario está en la aplicación
    When el usuario ingresa un nombre o categoría en la barra de búsqueda
    Then el sistema muestra los restaurantes que coinciden

Prioridad: P0

**RF-06: Geolocalización del usuario**

Descripción: Detecta y muestra la ubicación actual del usuario para relacionarla con los restaurantes más cercanos disponibles.

Criterios de aceptación :

Feature: Geolocalización del usuario
  Scenario: Detectar ubicación actual
    Given el usuario tiene habilitada la geolocalización
    When el sistema obtiene la ubicación
    Then se muestran los restaurantes más cercanos disponibles

Prioridad: P0

**RF-07: Reserva temporal de productos**

Descripción: Permite al usuario reservar un producto por un tiempo limitado, como 30 minutos, mientras decide o se desplaza.

Criterios de aceptación :

Feature: Reserva temporal de productos
  Scenario: Reservar un producto por tiempo limitado
    Given el usuario selecciona un producto
    When realiza una reserva
    Then el producto queda apartado durante 30 minutos

Prioridad: P1

**RF-08: Recuperación de contraseña**

Descripción: Permite que los usuarios recuperen el acceso a su cuenta en caso de olvidar la contraseña, a través de un enlace de restablecimiento enviado a su correo electrónico registrado.

Criterios de aceptación :
    Feature: Recuperación de contraseña
    Scenario: Restablecimiento mediante correo electrónico
    Given un usuario ha olvidado su contraseña
    When ingresa su correo registrado en la opción "¿Olvidaste tu contraseña?"
    Then el sistema envía un enlace seguro de restablecimiento al correo ingresado
    And el usuario puede definir una nueva contraseña cumpliendo con las políticas de seguridad

Prioridad: P1

**RF-09: Filtro por tiempo de vencimiento**

Descripción: Ofrece un filtro para ordenar los productos según el tiempo que les queda antes de vencer, como 1 día, 3 días o 1 semana.

Criterios de aceptación :

Feature: Filtro de productos por tiempo de vencimiento
  Scenario: Ordenar productos por fecha de vencimiento
    Given el usuario quiere ver productos próximos a vencer
    When aplica un filtro de 1 día, 3 días o 1 semana
    Then el sistema muestra los productos ordenados según la selección

Prioridad: P1

**RF-10: Notificaciones inteligentes para usuarios**

Descripción: Envía alertas automáticas al usuario cuando un producto de su interés está disponible y cerca de su ubicación.

Criterios de aceptación :

 Feature: Notificaciones para usuarios
  Scenario: Alertas sobre productos de interés
    Given el usuario ha mostrado interés en ciertos productos
    When un producto de su interés está disponible y cercano
    Then el sistema envía una notificación automática

Prioridad: P0

**RF-11: Alertas automáticas para negocios**

Descripción: Notifica a los negocios cuando un producto próximo a vencer aún no ha sido vendido, para que tomen acciones rápidas.

Criterios de aceptación :

  Feature: Alertas para negocios
    Scenario: Notificación sobre productos no vendidos
      Given un producto próximo a vencer no ha sido vendido
      When se detecta esta situación
      Then el sistema notifica al negocio para que tome acción

Prioridad: P1

**RF-12: Exportación de datos**

Descripción: El sistema debe permitir exportar los datos de las ventas y transacciones a un formato de base de datos estándar (CSV, SQL u otro formato común).

Criterios de aceptación:

  Feature: Exportación de datos
    Scenario: Exportar registros de ventas
      Given el administrador solicita la exportación
      When el sistema procesa la petición
      Then se genera un archivo en un formato compatible con bases de datos

Prioridad: P1

**RF-13: Edición de precios dinámicos**

Descripción: Ofrece a las tiendas la posibilidad de ajustar el precio de los productos según la cercanía del vencimiento.

Criterios de aceptación :

  Feature: Precios dinámicos
    Scenario: Ajuste de precio según fecha de vencimiento
      Given un producto está próximo a vencer
      When el negocio edita el precio
      Then el sistema actualiza y muestra el nuevo precio

Prioridad: P1

**RF-14: Historial de pedidos**

Descripción: El sistema permite a los usuarios consultar el historial de pedidos realizados en la aplicación.

Criterios de aceptación:

  Feature: Historial de pedidos
    Scenario: Consultar historial
    Given un usuario ha realizado pedidos previos
    When accede a la sección "Historial de pedidos"
    Then el sistema muestra una lista con sus compras pasadas

Prioridad: P1

**RF-15: Recomendaciones de productos**

Descripción: El sistema muestra recomendaciones de productos basadas en las compras anteriores del usuario.

Criterios de aceptación:

  Feature: Recomendaciones de productos
    Scenario: Mostrar sugerencias
      Given un usuario tiene historial de compras
      When accede a la página principal de productos
      Then el sistema muestra recomendaciones personalizadas

Prioridad: P2

**RF-16: Pasarela de pagos**

Descripción: Integra un sistema que recoja y transmita la información de las transacciones realizadas por el usuario.

Criterios de aceptación :

  Feature: Pasarela de pagos
    Scenario: Realizar una transacción
      Given el usuario selecciona productos para comprar
      When procede al pago
      Then el sistema procesa y transmite la información de la transacción

Prioridad: P0


