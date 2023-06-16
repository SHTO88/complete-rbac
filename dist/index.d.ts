interface RBACRules {
    [key: string]: {
        can: string[];
        inherits?: string[];
    };
}
declare class RBAC {
    private roles;
    constructor(rules: RBACRules);
    private roleExists;
    private getRole;
    private checkPermission;
    can(role: string | undefined, permission: string): boolean;
}
export default RBAC;
