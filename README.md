# RBAC (Role-Based Access Control)

RBAC is a super lightweight npm package written in typescript that provides Role-Based Access Control functionality. It allows you to define roles and permissions, and check whether a role has permission for a specific action.

## Installation

You can install the RBAC package using npm:

```
npm install complete-rbac
```

## Usage

```
// Import the RBAC module
import RBAC from 'complete-rbac'

// Define your RBAC rules
const rbac_rules = {
  user: {
    can: ['blog:read'],
  },
  admin: {
    can: ['blog:read', 'blog:create', 'blog:update', 'comments:*', 'users:*'],
  },
  superadmin: {
    can: ['*'],
    inherits: ['admin'],
  },
};

// Create an instance of RBAC
const rbac = new RBAC(rbac_rules);

// Check permissions
console.log(rbac.can('user', 'blog:read')); // Output: true
console.log(rbac.can('admin', 'blog:delete')); // Output: false
console.log(rbac.can('user', ["blog:read", "blog:delete"])); // Output: true

```
