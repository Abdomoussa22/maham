// packages/Api/axiosInstance.ts
import axios from 'axios';

// Base URL for all API calls
const BASE_URL = 'http://srv792437.hstgr.cloud:8887';

// Static token (later you can replace with dynamic auth handling)
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkJlYXJlciJ9.eyJwcmltYXJ5c2lkIjoiMSIsIm5hbWVpZCI6IjEiLCJ1bmlxdWVfbmFtZSI6ImFkbWluIiwiZ3JvdXBzaWQiOiIwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIlVzZXJJZFwiOjEsXCJEZXB0SWRcIjowLFwiVXNlck5hbWVcIjpcImFkbWluXCIsXCJOaWNrTmFtZVwiOlwiTWFuYWdlbWVudOWRmFwiLFwiUm9sZUtleXNcIjpbXCJhZG1pblwiXSxcIlJvbGVzXCI6W3tcIlJvbGVJZFwiOjEsXCJSb2xlS2V5XCI6XCJhZG1pblwiLFwiRGF0YVNjb3BlXCI6MX1dLFwiRXhwaXJlVGltZVwiOlwiMDAwMS0wMS0wMVQwMDowMDowMFwiLFwiVGVuYW50SWRcIjpudWxsLFwiUGVybWlzc2lvbnNcIjpbXCIqOio6KlwiXSxcIkNvbXBhbnlJRFwiOjAsXCJCcmFuY2hJRFwiOjB9IiwiQXVkaWVuY2UiOiJaUkFkbWluLk5FVCIsIklzc3VlciI6IlpSQWRtaW4uTkVUIiwibmJmIjoxNzU3NTkwNDc4LCJleHAiOjE3NTc2NzY4NzgsImlhdCI6MTc1NzU5MDQ3OCwiaXNzIjoiWlJBZG1pbi5ORVQiLCJhdWQiOiJaUkFkbWluLk5FVCJ9.p0JF2qneNMrAb69rcOO4pTQjjni2F7QceM8gTE2DX4I';

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`, // ✅ Token automatically included
    'Content-Type': 'application/json',
  },
});

export default api;
