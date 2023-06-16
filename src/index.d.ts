declare module "rbac" {
  interface RBACRules {
    [key: string]: {
      can: string[];
      inherits?: string[];
    };
  }

  class RBAC {
    constructor(rules: RBACRules);
    can(role: string, permission: string): boolean;
  }

  export default RBAC;
}
