# LogiTrack - Sistema de Gestión y Auditoría de Bodegas

## Descripción
LogiTrack es un sistema backend desarrollado en Spring Boot para la gestión centralizada de múltiples bodegas distribuidas en distintas ciudades. Permite controlar entradas, salidas y transferencias de productos, registrar auditorías y proteger el acceso mediante autenticación JWT.

## Características principales
- Gestión completa de materiales almacenados por bodega.
- Registro detallado de movimientos de inventario (entradas, salidas, transferencias).
- Auditoría automática de cambios con historial de operaciones por usuario.
- Seguridad robusta con roles (ADMIN, EMPLEADO) y autenticación basada en tokens JWT.
- API REST documentada con Swagger para facilitar integración y pruebas.
- Persistencia en base de datos PostgreSQL.

## Tecnologías utilizadas
- Java 17+
- Spring Boot 3.x
- Spring Data JPA / Hibernate
- Spring Security con JWT
- PostgreSQL 15+
- Maven como gestor de dependencias
- Swagger/OpenAPI para documentación

## Estructura del proyecto
- **/src/main/java:** Código fuente Java con entidades, repositorios, servicios y controladores REST.
- **/src/main/resources:** Configuración de Spring Boot, propiedades y archivos estáticos.
- **README.md:** Documentación y guía del proyecto.
- **/sql:** Scripts para creación de base de datos y carga inicial.

## Requisitos previos
- Java JDK 17 o superior
- PostgreSQL 15 o superior instalado y configurado
- Visual Studio Code u otro IDE compatible con Java y Spring
- Maven 3.6+ instalado

## Configuración inicial
1. Clonar repositorio.
2. Modificar `src/main/resources/application.properties` para configurar la conexión a PostgreSQL con tus credenciales.
3. Ejecutar los scripts SQL en `/sql` para crear la base de datos y las tablas.
4. Importar el proyecto en VS Code y construirlo con Maven.
5. Ejecutar la aplicación con el comando `./mvnw spring-boot:run` o desde el IDE.
6. Acceder a la documentación Swagger en `http://localhost:8080/swagger-ui.html`.

## Uso
- Para autenticarse, enviar peticiones a `/api/auth/login` con usuario y contraseña.
- El token JWT obtenido debe ser usado en el encabezado Authorization en peticiones posteriores.
- Consultar y gestionar bodegas, productos y movimientos a través de los endpoints REST.

## Planes futuros
- Mejorar interfaz frontend para gestión visual.
- Añadir notificaciones y alertas de stock bajo.
- Integración con sistemas ERP externos.

## Autor
Equipo de Desarrollo LogiTrack

## Licencia
Proyecto para fines académicos/empresariales, sin licencia abierta por ahora.
