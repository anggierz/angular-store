# 🛍️ Angular Store

Tienda online desarrollada con **Angular 18**, **NgRx** y **Angular Material**. Permite navegar productos, añadir al carrito, procesar el pago y confirmar la compra.

Este repositorio es la solución al Ejercicio Incremental de la asignatura DESARROLLO FRONTEND CON FRAMEWORKS II del Máster de Desarrollo Web de la UEM.

---

## 📦 Características

- Visualización de productos desde [Fake Store API](https://fakestoreapi.com)
- Registro y login de usuario con persistencia en `sessionStorage`
- Búsqueda de productos
- Carrito con gestión de cantidades y eliminación de productos
- Checkout con formulario de envío y validaciones
- Proceso de pago simulado
- Confirmación final de compra
- Estado global con **NgRx**
- Persistencia del carrito en `localStorage`
- Test unitarios con **Jasmine + Karma**
- Test e2e con **Cypress** (incluye mock de servicios)

---

## 🚀 Instalación y ejecución

1. Clona el repositorio

```bash
git clone https://github.com/anggierz/angular-store.git
cd angular-store
```

2. Instala las dependencias

```bash
npm install
```
3. Levanta la aplicación

```bash
ng serve
```
Accede en: `http://localhost:4200`

---

### 🧪 Tests unitarios

```bash
npm run test
```

Verás el porcentaje de **code coverage** en la carpeta /coverage. Todos los componentes y servicios están cubiertos con más del **80%**.

---

### 🧪 Tests end-to-end (Cypress)

Primero, asegúrate de tener la app corriendo (`npm start`) en otro terminal.

```bash
npm run cypress:open
```

O ejecuta directamente en modo headless:

```bash
npm run cypress:run
```

🧪 **Test cubierto**:  
✅ Añadir 2 productos desde la home  
✅ Añadir 1 producto desde búsqueda  
✅ Llenar formulario de envío  
✅ Rellenar datos de pago  
✅ Ver pantalla de confirmación  
✅ Mock de los servicios utilizados


---