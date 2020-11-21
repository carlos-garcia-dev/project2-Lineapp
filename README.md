# Project2

##### Made by Maria Luisa Santos & Carlos García

Project with a CRUD populated database

###### Endpoint List

###### Guest

| Method | Path        | Description        |
| ------ | ----------- | ------------------ |
| Get    | /           |
| Get    | /events/    | Listado de eventos |
| Get    | /events/:id | Detalles evento    |

###### Client

| Method | Path      | Description       |
| ------ | --------- | ----------------- |
| Get    | /register | Registro          |
| Post   | /register | Registro          |
| Get    | /login    | Acceso            |
| Post   | /login    | Acceso            |
| Get    | /profile  | Eventos guardados |

###### Partner

| Method | Path                       | Description         |
| ------ | -------------------------- | ------------------- |
| Get    | /partner/register          | Registro            |
| Post   | /partner/register          | Registro            |
| Get    | /partner/login             | Acceso              |
| Post   | /partner/login             | Acceso              |
| Get    | /partner/event-list        | Eventos guardados   |
| Get    | /partner/event-list/edit   | Edición eventos     |
| Post   | /partner/event-list/edit   | Edición eventos     |
| Get    | /partner/event-list/delete | Eliminación eventos |

###### Admin

| Method | Path                | Description      |
| ------ | ------------------- | ---------------- |
| Get    | /management         | Acceso           |
| Get    | /management/clients | Gestión clientes |
| Get    | /management/partner | Gestión partner  |
