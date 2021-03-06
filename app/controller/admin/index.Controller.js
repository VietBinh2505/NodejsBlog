import renderItemHTML   from "./Items.Controller";
import renderGroupHTML  from "./groups.Controller";
import renderUsersHTML  from "./users.Controller";
import categ_ctl        from "./categs.Controller";
import article          from "./articles.Controller";
import renderdashBoardHTML   from "./dashBoard.Controller";

export const itemsCTL    = renderItemHTML;
export const UsersCTL    = renderUsersHTML;
export const GroupsCTL   = renderGroupHTML;
export const CategCTL    = categ_ctl;
export const articleCTL  = article;
export const dashBoardCTL= renderdashBoardHTML;
