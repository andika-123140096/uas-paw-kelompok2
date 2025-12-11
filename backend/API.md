# Job Portal API Documentation

This API provides endpoints for a job portal system with roles: Job Seeker and Employer.

All endpoints return JSON responses. Authentication uses JWT tokens in Authorization header: `Bearer <token>`.

Each endpoint supports GET (info message) and the appropriate method (POST/PUT/DELETE) for actions.

## Authentication

### Register User
- **URL**: `/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "job_seeker" or "employer"
  }
  ```
- **Response**: `{"message": "User registered", "user_id": int}` or error

### Get Current User
- **URL**: `/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object

## Jobs

### List Jobs (Browse)
- **URL**: `/jobs`
- **Method**: `GET`
- **Query Params**: `title`, `location`, `salary_min`, `salary_max`, `type`
- **Response**: Array of job objects

### Get Job Detail
- **URL**: `/jobs/{id}`
- **Method**: `GET`
- **Response**: Job object

### Create Job (Employer)
- **URL**: `/create-job`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "requirements": "string",
    "salary": "string",
    "location": "string",
    "type": "string"
  }
  ```
- **Response**: `{"message": "Job created", "job_id": int}`

### Update Job (Employer)
- **URL**: `/jobs/{id}`
- **Method**: `PUT`
- **Body**: Partial job fields
- **Response**: `{"message": "Job updated"}`

### Delete Job (Employer)
- **URL**: `/jobs/{id}`
- **Method**: `DELETE`
- **Response**: `{"message": "Job deleted"}`

## Profile (Job Seeker)

### Get Profile
- **URL**: `/profile`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Profile object

### Update Profile
- **URL**: `/profile`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Partial profile fields
- **Response**: `{"message": "Profile updated"}`

## Applications

### Apply to Job
- **URL**: `/applications`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "job_id": int
  }
  ```
- **Response**: `{"message": "Applied", "application_id": int}`

### Get My Applications
- **URL**: `/my-applications`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of application objects

### Get Job Applicants (Employer)
- **URL**: `/jobs/{job_id}/applications`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of applicant objects

### Update Application Status (Employer)
- **URL**: `/applications/{id}`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "pending|shortlisted|rejected|accepted"
  }
  ```
- **Response**: `{"message": "Status updated"}`

## Notes
- All POST/PUT requests expect JSON body with `Content-Type: application/json`.
- Authentication: Include `Authorization: Bearer <token>` in headers for protected endpoints.
- Errors: `{"error": "message"}` with appropriate HTTP status code.
- Roles: 'job_seeker' or 'employer' in registration.
- Status in applications: 'pending', 'shortlisted', 'rejected', 'accepted'.

## Examples

### Register a Job Seeker
```bash
curl -X POST http://localhost:6543/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"pass123","role":"job_seeker"}'
```
Response: `{"message": "User registered", "user_id": 1}`

### Login
```bash
curl -X POST http://localhost:6543/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```
Response: `{"token": "jwt_token_here", "role": "job_seeker"}`

### Get Jobs (Public)
```bash
curl http://localhost:6543/jobs
```

### Create Job (Employer)
```bash
curl -X POST http://localhost:6543/create-job \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Developer","description":"Job desc","requirements":"Skills","salary":"5000","location":"Jakarta","type":"Full-time"}'
```

### Apply to Job (Seeker)
```bash
curl -X POST http://localhost:6543/applications \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"job_id": 1}'
```

### Get Profile (Seeker)
```bash
curl -H "Authorization: Bearer <token>" http://localhost:6543/profile
```