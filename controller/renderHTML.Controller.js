import {itemService} from "./../service/index.service";
import filterStt from "./../utils/FilterStt.utils";
const indexItem = (req, res) => {
   return res.render("pages/items/list.viewsitems.ejs", {
      titlepage: "Hello List Item"
   });
};
const listItem =  async(req, res) => {	
	try {
		let currStatus = req.params.status; // lấy trạng thái trên url (all, active, inactive)
		let statusFiter = await filterStt.createFilterStt(currStatus);
		let items = await itemService.itemService();
		return res.render("pages/items/list.viewsitems.ejs", {
			titlepage: "Hello List Item",
			items,
			statusFiter,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listItem");
		return res.render("pages/items/list.viewsitems.ejs", {
			titlepage: "Hello List Item"
		});
	}
}; 
const dashboardItem = (req, res) => {
	return res.render("pages/dashboard/index.viewDashboard.ejs", {
		titlepage: "Hello dashboard Item",
	});
};
const homeItem = (req, res) => {
	return res.render("pages/dashboard/index.viewDashboard.ejs", {
		titlepage: "Hello home Item",
	});
};
const addItem = (req, res) => {
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