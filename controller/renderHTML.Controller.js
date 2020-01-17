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
		let paginations = {
			tongsophantu: 1,
			sophantutren1trang : 1,
			pageCrr : 1,
			pageRanges: 3, // số lượng hiển thị ở phân trang
		};
		paginations.tongsophantu = await itemService.countTotal(currStatus, keyword);
		paginations.pageCrr =  await getParams.Param(req.query, "page", 1); // lấy được trang hiện tại và cập nhập lên cho pagination
		let skip = ((paginations.pageCrr - 1) * paginations.sophantutren1trang); // lấy được số phần tử bỏ qua
		let limit = paginations.sophantutren1trang; // lấy được số phần tử cần lấy
		let items = await itemService.showItemService(currStatus, keyword, skip, limit); // lấy ra các items
		return res.render("pages/items/list.viewsitems.ejs", {
			titlepage: "Hello List Item",
			items,
			statusFiter,
			currStatus,
			keyword,
			paginations,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listItem");
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