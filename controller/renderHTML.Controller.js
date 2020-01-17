import {itemService} from "./../service/index.service";
import {filterStt, getParams} from "./../utils/index.utils";
const indexItem = (req, res) => {
   return res.render("pages/items/list.viewsitems.ejs", {
      titlepage: "Hello List Item"
   });
};
const listItem =  async(req, res) => {	
	try {
		let currStatus = await getParams.Param(req.params, "status", "all"); // lấy trạng thái trên url (all, active, inactive)
		let keyword = await getParams.Param(req.query, "search", "");
		let statusFiter = await filterStt.createFilterStt(currStatus); // tạo ra bộ lọc
		let items = await itemService.showItemService(currStatus, keyword); // lấy ra các items
		
		return res.render("pages/items/list.viewsitems.ejs", {
			titlepage: "Hello List Item",
			items,
			statusFiter,
			currStatus,
			keyword,
			//itemSeached
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