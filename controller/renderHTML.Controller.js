const indexItem = (req, res, next) => {
   return res.render("pages/items/list.viewsitems.ejs", {
      titlepage: "Hello List Item"
   });
};
const listItem =  (req, res, next) => {
	return res.render("pages/items/list.viewsitems.ejs", {
		titlepage: "Hello List Item"
	});
}; 
const dashboardItem = (req, res, next) => {
	return res.render("pages/dashboard/index.viewDashboard.ejs", {
		titlepage: "Hello dashboard Item",
	});
};
const homeItem = (req, res, next) => {
	return res.render("pages/dashboard/index.viewDashboard.ejs", {
		titlepage: "Hello home Item",
	});
};
const addItem = (req, res, next) => {
	return res.render("pages/items/add.viewsitems.ejs", {
		titlepage: "Hello add Item",
	});
};
export default {
   indexItem,
   listItem,
   dashboardItem,
	addItem,
	homeItem,
};