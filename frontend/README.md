# Frontend (React + Vite)

This frontend is a minimal React + Vite app for the Job Portal backend documented in `backend/API.md`.

Features implemented:

- User authentication (register / login) for roles `job_seeker` and `employer`
- Jobs listing with search & filters
- Job detail and apply (job seeker)
- Employer job CRUD (create, edit, delete)
- Profile management (seeker)
- My applications (seeker) and Applicants/Status management (employer)

Quick start

1. Install dependencies:

   npm install
   npm install react-router-dom@6

2. (Optional) Set backend URL:

   Create a `.env` in the `frontend` folder with:

   VITE_API_URL=http://localhost:6543

   The default is `http://localhost:6543` which matches `backend/API.md`.

3. Run dev server:

   npm run dev

Notes & Implementation details

- Auth token is stored in `localStorage` as `token` and role as `role`.
- All requests use `src/api.js`, which wraps `fetch` and attaches the Authorization header when token is available.
- This is intentionally minimal and intended as a base to expand the UI and error handling.

Next steps / ideas

- Add better UI, form validation and file upload for CV.
- Add pagination and more robust query/filter UI.
- Add saved jobs and company profile pages (optional features).

Dark mode / Theme

- This project supports dark mode. A theme toggle is available in the header and the theme preference is saved to `localStorage`.
- To change the initial behaviour, edit `src/theme.js` (it reads `prefers-color-scheme` if no stored preference).
