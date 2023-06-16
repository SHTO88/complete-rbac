interface RBACRules {
  [key: string]: {
    can: string[];
    inherits?: string[];
  };
}

class RBAC {
  private roles: RBACRules;

  constructor(rules: RBACRules) {
    this.roles = rules;
  }

  private roleExists(role: string): boolean {
    return this.roles.hasOwnProperty(role);
  }

  private getRole(role: string): { can: string[]; inherits?: string[] } | null {
    if (this.roleExists(role)) {
      return this.roles[role];
    }
    return null;
  }

  private checkPermission(role: string, permission: string): boolean {
    const roleDefinition = this.getRole(role);
    if (roleDefinition) {
      if (
        roleDefinition.can.includes(permission) ||
        roleDefinition.can.includes("*")
      ) {
        return true;
      } else if (roleDefinition.can.some((p) => p.endsWith(":*"))) {
        const wildcardPrefix = permission.split(":")[0] + ":";
        return roleDefinition.can.some((p) => p.startsWith(wildcardPrefix));
      } else if (roleDefinition.inherits) {
        for (const inheritedRole of roleDefinition.inherits) {
          if (this.checkPermission(inheritedRole, permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  public can(role: string | undefined, permission: string): boolean {
    if (!role) {
      return false;
    }
    return this.checkPermission(role, permission);
  }
}

export default RBAC;
