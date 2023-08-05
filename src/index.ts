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

  private checkPermission(
    role: string,
    permission: string | string[]
  ): boolean {
    const roleDefinition = this.getRole(role);
    if (roleDefinition) {
      const permissions = Array.isArray(permission) ? permission : [permission];
      for (const perm of permissions) {
        const premWildcardPrefix = perm.split(":")[0] + ":*";
        if (
          roleDefinition.can.includes(perm) ||
          roleDefinition.can.includes(premWildcardPrefix) ||
          roleDefinition.can.includes("*")
        ) {
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

  public can(role: string | undefined, permission: string | string[]): boolean {
    if (!role) {
      return false;
    }
    return this.checkPermission(role, permission);
  }
}

export default RBAC;
