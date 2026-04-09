# /gestao Route Fix - COMPLETE ✅

**Changes:**
- Added `/gestao` route in `frontend/src/App.tsx` → `AdminDashboard` (protected)
- Placed before catch-all `*` route

**Test:**
1. Login at `/login` (demo: admin@empresa.com / admin123 if seeded)
2. Visit `/gestao` → Should show AdminDashboard (no 404)

**Next:** Restart frontend dev server if needed (`docker compose up` or `npm run dev`).
