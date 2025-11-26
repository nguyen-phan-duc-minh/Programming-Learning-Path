# Frontend - Programming Learning Path

## Cấu trúc Project

```
frontend/src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── auth/              # Authentication page
│   ├── survey/            # Survey page
│   └── dashboard/         # Dashboard page
│
├── components/            # React Components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   └── index.ts
│   └── ui/               # UI components
│       ├── ProgressBar.tsx
│       ├── DayCard.tsx
│       ├── DayDetailModal.tsx
│       └── index.ts
│
├── hooks/                 # Custom React Hooks
│   ├── useAuth.ts        # Authentication logic
│   ├── useLearningPath.ts # Learning path management
│   └── index.ts
│
├── services/              # Service Layer
│   ├── api.service.ts    # API calls
│   └── storage.service.ts # LocalStorage management
│
├── types/                 # TypeScript Types
│   └── index.ts          # All type definitions
│
└── lib/                   # Legacy API (deprecated)
    └── api.ts
```

## Kiến trúc

### 1. Components Layer
- **Layout**: Header với navigation và logout
- **UI**: ProgressBar, DayCard, DayDetailModal
- Tái sử dụng, single responsibility

### 2. Custom Hooks
- **useAuth**: Authentication state management
- **useLearningPath**: Learning path operations
- Tách business logic khỏi UI

### 3. Services Layer
- **api.service**: HTTP requests to backend
- **storage.service**: LocalStorage wrapper
- Type-safe, centralized

### 4. Types
- Centralized TypeScript definitions
- Shared across components và services

## Setup

```bash
npm install
npm run dev
```

Backend API: `http://localhost:5001`
Frontend: `http://localhost:3000`

## Kết nối Backend

✅ Backend đang chạy tại port 5001
✅ Frontend gọi API qua services layer
✅ CORS đã được cấu hình
✅ Type-safe với TypeScript

Tất cả endpoints đã được test và hoạt động tốt!
