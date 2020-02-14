const folderView	 = __path_views_admin + "pages/dashboard/";
const pageTitleIndex = "DashBoard Management"; 

const listDashBoard = (req, res) => {
   return res.render(`${folderView}index.dashBoard.ejs`, { 
      pageTitle: pageTitleIndex,
       "courseName": "<p>NodeJS</p>"
      });
}; 


export default {
   listDashBoard,
};