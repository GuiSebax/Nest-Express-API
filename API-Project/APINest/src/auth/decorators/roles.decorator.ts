// Declarar a regra/intenção na rota, não executar lógica

import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// No controller, quando vc use o UseGuards
// quando vc escreve:
// Ex: @Roles("ADMIN"), vc está anexando no metadata
// -> roles = ["ADMIN"]