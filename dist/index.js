"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RBAC {
    constructor(rules) {
        this.roles = rules;
    }
    roleExists(role) {
        return this.roles.hasOwnProperty(role);
    }
    getRole(role) {
        if (this.roleExists(role)) {
            return this.roles[role];
        }
        return null;
    }
    checkPermission(role, permission) {
        const roleDefinition = this.getRole(role);
        if (roleDefinition) {
            if (roleDefinition.can.includes(permission) ||
                roleDefinition.can.includes("*")) {
                return true;
            }
            else if (roleDefinition.can.some((p) => p.endsWith(":*"))) {
                const wildcardPrefix = permission.split(":")[0] + ":";
                return roleDefinition.can.some((p) => p.startsWith(wildcardPrefix));
            }
            else if (roleDefinition.inherits) {
                for (const inheritedRole of roleDefinition.inherits) {
                    if (this.checkPermission(inheritedRole, permission)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    can(role, permission) {
        if (!role) {
            return false;
        }
        return this.checkPermission(role, permission);
    }
}
exports.default = RBAC;
