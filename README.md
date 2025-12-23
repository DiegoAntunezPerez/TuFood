# 🍽️ TuFood — Proyecto React

> TuFood es una aplicación web desarrollada con **React** que permite **explorar recetas**, **buscar por nombre**, **filtrar por país** y **guardar recetas favoritas**, utilizando la API pública **TheMealDB**.
> El objetivo del proyecto es demostrar el uso práctico de los principales conceptos aprendidos en React: componentes, estado, efectos, routing, contexto y custom hooks.

---

## Funcionalidades principales

```sh
- 🔍 Búsqueda de recetas por nombre
- 🌍 Exploración de recetas por país
- 🎲 Recetas aleatorias al entrar en la sección Recetas
- ❤️ Sistema de favoritos persistente (localStorage)
- 📄 Página de detalle de receta
- 📱 Diseño Full Responsive
```

## Páginas de la aplicación

La aplicación cuenta con **4 páginas principales**, gestionadas con `react-router-dom`:

- **Home (`/`)**
  - Recetas en tendencia
  - Selección destacada por países
- **Recetas (`/recipes`)**
  - Recetas aleatorias al entrar
  - Búsqueda por nombre
  - Filtros por país
- **Favoritos (`/favorites`)**
  - Listado de recetas guardadas
- **Detalle de receta (`/recipe/:id`)**
  - Información completa de la receta
  - Vídeo de YouTube embebido (si existe)

---

## Tecnologías utilizadas

- **React**
- **React Router DOM**
- **JavaScript (ES6+)**
- **CSS**
- **TheMealDB API**
- **Vite**

---

## Gestión del estado

La aplicación utiliza varios tipos de estado:

- `useState` para:
  - Búsquedas
  - Recetas cargadas
  - Estados de carga
- `useEffect` para:
  - Peticiones a la API
  - Sincronización de datos
- `useContext` para:
  - Sistema global de favoritos
- **Custom Hook (`useFavorites`)**
  - Encapsula el acceso al contexto de favoritos
  - Evita duplicación de lógica

---

## Sistema de Favoritos

- Implementado mediante **Context API**
- Persistencia con **localStorage**
- Accesible desde cualquier componente
- Añadir / quitar favoritos sin recargar la página

---

## API utilizada

- **TheMealDB**
  - Búsqueda por nombre
  - Filtro por país
  - Recetas aleatorias
  - Detalle de receta

https://www.themealdb.com/api.php

---

## Autor

Proyecto realizado por **Diego Antúnez**
