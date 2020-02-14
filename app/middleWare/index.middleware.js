import renderAuthHTML         from "./auth.middleware";
import getCategForMenuIndex    from "./getItem.middleware";

export const AuthMDW            = renderAuthHTML;
export const item               = getCategForMenuIndex;
