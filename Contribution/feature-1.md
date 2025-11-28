# Feature 1: Session Timeout Warning

## Description
BuffaLogs needs a session timeout warning mechanism to enhance security by alerting users before their session expires.

## Requirements
- Add warning dialog before session expiration
- Allow users to extend their session
- Auto-redirect to login page on expiration
- Make timeout periods configurable

## Implementation Plan

### 1. Configuration
- Add `NEXT_PUBLIC_SESSION_TIMEOUT` and `NEXT_PUBLIC_SESSION_WARNING_TIME` to `frontend/lib/constants.ts` (or read from env).
- Default values:
  - Timeout: 15 minutes (900000 ms)
  - Warning: 1 minute before timeout

### 2. Frontend Components
- Create `frontend/components/SessionTimeout.tsx`.
- This component will:
  - Track user activity (mousemove, keydown, click, scroll).
  - Maintain a timer for idle detection.
  - Display a warning modal when the warning threshold is reached.
  - Automatically logout and redirect to login when the timeout is reached.
  - Provide an "Extend Session" button to reset the timer.

### 3. Integration
- Import and use `SessionTimeout` in `frontend/pages/_app.tsx`.
- Ensure the component is only active when the user is authenticated (checking for the 'user' cookie).

### 4. Files to Modify/Create
- `frontend/lib/constants.ts`: Add timeout constants.
- `frontend/components/SessionTimeout.tsx`: New component.
- `frontend/pages/_app.tsx`: Integrate the component.

