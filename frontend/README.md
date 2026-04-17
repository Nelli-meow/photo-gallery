# Photo Gallery

Simple fullstack app:
- Backend: Node.js + Express + MongoDB (`api`)
- Frontend: React + Vite (`frontend`)

## English - Run locally

### 1) Requirements
- Node.js 18+ (recommended 20+)
- npm
- MongoDB running locally on default URL: `mongodb://localhost/gallery`

### 2) Install dependencies
Open project root and run:

```bash
cd api && npm install
cd ../frontend && npm install
```

### 3) (Optional) Seed test data

```bash
cd api
npm run seed
```

### 4) Start backend

```bash
cd api
npm run dev
```

Backend runs on `http://localhost:8000`.

### 5) Start frontend (second terminal)

```bash
cd frontend
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

---

## Русский - Запуск локально

### 1) Что нужно
- Node.js 18+ (лучше 20+)
- npm
- Локально запущенный MongoDB по адресу `mongodb://localhost/gallery`

### 2) Установка зависимостей
Из корня проекта:

```bash
cd api && npm install
cd ../frontend && npm install
```

### 3) (Опционально) Заполнить тестовыми данными

```bash
cd api
npm run seed
```

### 4) Запуск backend

```bash
cd api
npm run dev
```

Backend будет доступен на `http://localhost:8000`.

### 5) Запуск frontend (во втором терминале)

```bash
cd frontend
npm run dev
```

Откройте URL из вывода Vite (обычно `http://localhost:5173`).
