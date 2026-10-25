# Employee Management System

A small React app for managing employee records. Built with Vite, no backend needed: data is saved in the browser's localStorage.

## Features

- Add, edit and delete employees
- Search by name, email or role
- Filter by department
- Live headcount and payroll total
- Basic form validation

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
```

## Project structure

```
src/
  App.jsx                    state and filtering logic
  components/
    EmployeeForm.jsx         add / edit form
    EmployeeTable.jsx        employee list
  App.css
```

## Ideas for later

- Connect to a real API (Node + MongoDB or Express + Postgres)
- Login and roles
- Pagination and sorting
- Export to CSV
