# Admin Setup Guide

## User Access Control System

HydroMate now includes a comprehensive user access control system that allows you to approve specific users for testing purposes after deployment.

### How It Works

1. **Access Request Process**
   - Users who try to access the app are prompted to submit an access request
   - Request includes their email and user ID
   - Status is tracked as: `pending`, `approved`, `rejected`, or `suspended`

2. **Admin Review**
   - Admins can review all access requests through the admin panel
   - Each request can be approved or rejected with optional notes
   - Real-time updates when decisions are made

3. **User Experience**
   - Users see their current status (pending, approved, rejected)
   - Approved users can access the full application
   - Rejected users are informed and can contact admin

### Setup Instructions

#### 1. Enable Access Control in Production

The system is configured via environment variables. In production, set:

```bash
# Enable access control
NODE_ENV=production
```

In development, access control is disabled by default.

#### 2. Create Admin Users

You need to manually create admin users in the database. Use the following SQL commands:

```sql
-- First, get your user ID after logging in once
SELECT id, email FROM users WHERE email = 'your-email@example.com';

-- Create admin user (replace with your actual user ID and email)
INSERT INTO admin_users (user_id, email, role, permissions) 
VALUES ('your-user-id', 'your-email@example.com', 'admin', '["approve_users", "manage_access"]');
```

#### 3. Access the Admin Panel

- Visit `/admin` in your deployed application
- Only users with admin privileges can access this page
- You'll see pending requests and can approve/reject them

#### 4. User Workflow

1. **User attempts to access app**
2. **Access request is automatically created**
3. **Admin receives notification via admin panel**
4. **Admin approves/rejects with optional notes**
5. **User is notified and can proceed if approved**

### Admin Panel Features

- **Pending Requests**: View all users waiting for approval
- **User Management**: See all users and their current status
- **Quick Actions**: Approve/reject with notes
- **Status Overview**: Statistics on approved, pending, and rejected users

### API Endpoints

- `POST /api/access-control/request` - Submit access request
- `GET /api/access-control/status` - Check current status
- `GET /api/admin/access-requests` - Get pending requests (admin only)
- `POST /api/admin/access-requests/:userId/approve` - Approve user (admin only)
- `POST /api/admin/access-requests/:userId/reject` - Reject user (admin only)
- `GET /api/admin/users` - Get all users (admin only)

### Security Features

- Admin-only routes protected by middleware
- Rate limiting on all endpoints
- Session-based authentication
- Input validation and sanitization
- SQL injection protection via ORM

### Usage Tips

1. **Set yourself as admin first** - Add your user ID to the admin_users table
2. **Test the flow** - Try accessing the app from a different account to test the request process
3. **Monitor requests** - Check the admin panel regularly for new access requests
4. **Add notes** - Use the notes field to communicate with users about their status

This system gives you full control over who can access your app during testing while maintaining a professional user experience.