# UAS PAW Kelompok 2 - Digit 4 - Job Portal System
Anggota Kelompok :
- Ahmad Aufamahdi Salam (123140092)
- Andika Dinata (123140096)
- Ibrahim Budi Satria (123140097)
- Abel Fortino (123140111)
- Keira Lakeisha Fachra Fuady (123140142)

## Link deployment

Frontend: http://abiebkun.vercel.app/

Backend: http://abiebkun.my.id/

## Setup project di local.
1. Install python, nodejs, postgresql.
- https://www.python.org/ftp/python/3.14.0/python-3.14.0-amd64.exe
- https://nodejs.org/dist/v25.2.1/node-v25.2.1-x64.msi
- https://sbp.enterprisedb.com/getfile.jsp?fileid=1259824

2. Clone repository ini
```bash
git clone https://github.com/andika-123140096/uas-paw-kelompok2
```

3. Masuk ke folder project
```bash
cd uas-paw-kelompok-2
```

4. Lakukan instalasi untuk frontend
```bash
cd frontend
npm install
```

5. Lakukan instalasi untuk backend
```bash
cd backend
python -m venv .venv
pip install --upgrade pip setuptools
pip install -e .
```

6. Bikin database menggunakan pgAdmin4. Nama databasenya ```job_portal_system```
![pgAdmin Setup](./docs/images/pgAdmin.png)

7. edit development.ini agar sesuai dengan konfigurasi database postgresqlmu.
```
sqlalchemy.url = postgresql://postgres:password_postgres_kamu@localhost:5432/job_portal_system
```

8. bikin .env di folder backend/.env
```
JWT_SECRET=your_jwt_secret_key_here
```
Ganti dengan secret key yg aman. Jadi secret keys di development.ini itu bakal dioverride sama ini.

9. Run migrate setelah setup development.ini
```bash
alembic -c development.ini upgrade head
```

## Run server di local

### Frontend
Open folder ini di vscode. Buka terminal
```bash
npm run dev
```
Buka http://localhost:5173/

### Backend
Open folder ini di vscode. Buka terminal
```bash
pserve development.ini
```
Buka http://127.0.0.1:6543

