# QuenchNow Security Configuration

## Access Control Implementation

The application now includes comprehensive access control to protect sensitive operations and restrict secret access.

### Access Control Features

#### 1. Role-Based Permissions
- **Guest**: Limited read access
- **User**: Standard app functionality
- **Admin**: Full access including secret management

#### 2. Secret Access Protection
- **None**: No access to secrets (production default)
- **Read**: Can view secret status only
- **Write**: Can modify secrets (restricted to specific admin endpoints)

#### 3. Rate Limiting
- Development: 1000 requests/minute
- Production: 100 requests/minute
- Restricted Production: 50 requests/minute

#### 4. IP Whitelisting
- Can be configured for production environments
- Add trusted IP addresses to `ipWhitelist` array

### Environment Configurations

#### Development Environment
```typescript
{
  allowedRoles: ['admin', 'user', 'guest'],
  requireAuthentication: false,
  rateLimitPerMinute: 1000,
  secretAccessLevel: 'read'
}
```

#### Production Environment
```typescript
{
  allowedRoles: ['admin', 'user'],
  requireAuthentication: true,
  rateLimitPerMinute: 100,
  secretAccessLevel: 'none'
}
```

#### Restricted Production Environment
```typescript
{
  allowedRoles: ['admin'],
  requireAuthentication: true,
  rateLimitPerMinute: 50,
  ipWhitelist: [], // Add trusted IPs
  secretAccessLevel: 'none'
}
```

### Protected Endpoints

#### Secret Management Routes
- `GET /api/admin/secrets` - View secret configuration status (admin only)
- `POST /api/admin/clear-cache` - Clear application cache (admin only)

#### Protected Paths
- `/api/secrets/*` - Secret management
- `/api/config/*` - Configuration management  
- `/api/admin/*` - Administrative functions

### Security Best Practices

1. **Never expose actual secret values** - Only return configuration status
2. **Implement proper authentication** - Required in production
3. **Use IP whitelisting** - For high-security environments
4. **Monitor rate limits** - Prevent abuse and DDoS
5. **Regular security audits** - Review access logs and permissions

### Deployment Security

When deploying to production:

1. Set `NODE_ENV=production`
2. Configure proper authentication
3. Add trusted IPs to whitelist if needed
4. Monitor access logs
5. Regularly rotate secrets

### Emergency Procedures

If security is compromised:

1. Immediately change all API keys and secrets
2. Review access logs for unauthorized activity
3. Update IP whitelist to block suspicious addresses
4. Consider temporarily enabling restricted mode
5. Audit all user permissions

## Contact

For security issues, please contact the development team immediately.