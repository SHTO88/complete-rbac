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
            const permissions = Array.isArray(permission) ? permission : [permission];
            for (const perm of permissions) {
                const premWildcardPrefix = perm.split(":")[0] + ":*";
                if (roleDefinition.can.includes(perm) ||
                    roleDefinition.can.includes(premWildcardPrefix) ||
                    roleDefinition.can.includes("*")) {
                    return true;
                }
            }
            if (roleDefinition.inherits) {
                for (const inheritedRole of roleDefinition.inherits) {
                    if (this.checkPermission(inheritedRole, permissions)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    can(role, permission) {
        if (!role || !permission) {
            return false;
        }
        return this.checkPermission(role, permission);
    }
}
exports.default = RBAC;
