import util from "util";
const {getParams, filterStt} 			= require(__path_helpers + "index.helper");
const {groupsService, userService} 	= require(__path_services + "index.Service");
const systemConfig 						= require(__path_configs + "system.Config");
const {ValidateGroups} 					= require(__path_validates + "index.Validate");
const notify 								= require(__path_configs + "notify.Config");

const folderView	 = __path_views + "pages/groups/";
const pageTitleIndex = "Group Management"; 
const pageTitleAdd   = pageTitleIndex + " - Add";
const pageTitleEdit  = pageTitleIndex + " - Edit";

const linkIndex = "/" + systemConfig.prefixAdmin + "/groups/";
const listGroups = async(req, res) => {
	try {
		let params = {};
		params.currentStatus = await getParams.getParam(req.params, "status", "all"); // lấy trạng thái trên url (all, active, inactive)
		params.keyword 		= await getParams.getParam(req.query, "keyword", "");
		params.sortType 		= getParams.getParam(req.session, "sort_Type", "asc"); // lấy trạng thái trên url (all, active, inactive)
		params.sortFiled 		= getParams.getParam(req.session, "sort_Field", "ordering"); // lấy trạng thái trên url (all, active, inactive)
		
		params.statusFilter = await filterStt.createFilterStatus(params, "groups.Service"); // tạo ra bộ lọc
		params.pagination = {
			totalItems: 1,
			totalItemsPerPage : 4,
			currentPage : parseInt(getParams.getParam(req.query, "page", 1)),
			pageRanges: 3, // số lượng hiển thị ở phân trang
		}; 
		params.pagination.currentPage =  await getParams.getParam(req.query, "page", 1); // lấy được trang hiện tại và cập nhập lên cho pagination
		params.pagination.totalItems = await groupsService.countTotal(params);
		let items = await groupsService.showGroupsService(params); // lấy ra các items
		
		return res.render(`${folderView}list.viewsGr.ejs`, {
			pageTitle: pageTitleIndex,
			items,
			params,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listGroups");
	}
}; 
const formGroups = async (req, res) => {
	let id = await getParams.getParam(req.params, "id", "");
	let item = {id: id, username: "", ordering: 0, status: "novalue"};
	let errors   = null;

	if(id){ //edit
		try {
			item = await groupsService.showInfoGroupsEdit(id); // lấy ra các items
			return res.render(`${folderView}form.viewsGr.ejs`, {
				pageTitle: pageTitleEdit,
				item,
				errors,
			});
		} catch (error) {
			console.log(error);
			console.log("error---formGroups");
		}
	}else{ //add
		return res.render(`${folderView}form.viewsGr.ejs`, {
			pageTitle: pageTitleAdd,
			item,
			errors
		});
	}
};
const saveGroups = async(req, res) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateGroups.validator(req);
	let item = Object.assign(req.body);
	let errors = req.validationErrors();
	let itemNew = {
		username: req.body.username,
		ordering: req.body.ordering,
		status: req.body.status,
		content: req.body.content,
		group_acp: req.body.group_acp,
	};
	let checkStatus = (typeof item !== "undefined" && item.id !== "" ) ? "edit" : "add"; //check xem user add hay edit
	try {
		if(errors){
			let pageTitle = (checkStatus == "edit") ? pageTitleEdit : pageTitleAdd;
			return res.render(`${folderView}form.viewsGr.ejs`, { pageTitle, item, errors});
		}else{
			let messNotify = (checkStatus == "edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
			await groupsService.saveGroups(item.id, itemNew, checkStatus);
			if(checkStatus == "edit"){
				await userService.saveUser(item.id, itemNew, "edit_u");
			}
			req.flash("success", messNotify, false);
		}
	} catch (error) {
		console.log(error);
		console.log("error-saveGroups");
	}
	return res.redirect(linkIndex);
};
const deleteGroups = async(req, res) =>{
	let itemId = await getParams.getParam(req.params, "id", "");
	let group = {
		name: "Đã xóa",
	};
	try {
		await groupsService.deleteGroups(itemId, "one");
		await userService.saveUser(itemId, group.name, "deleGr");
	} catch (error) {
		console.log(error);
		console.log("error---deleteGroups");
	}
	req.flash("success", notify.DELETE_SUCCESS, false);
	return res.redirect(linkIndex);
};
const deleteMulti = async(req, res) =>{
	let idItem = req.body.cid;
	let length = idItem.length;
	let group = {
		name: "Đã xóa",
	};
	try {
		await groupsService.deleteGroups(idItem, "multi");
		await userService.saveItem(idItem, group.name, "multi");
		req.flash("success", util.format(notify.DELETE_MULTI_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---deleteMulti");
	}
	return res.redirect(linkIndex);
};
const changeStatus = async(req, res) =>{
	let currStatus = await getParams.getParam(req.params, "status", ""); //lấy trạng thái trên url
	let id = await getParams.getParam(req.params, "id", ""); //lấy trạng thái trên url
	
	try {
		await groupsService.changeStatus(id, currStatus, "one");
		req.flash("success", notify.CHANGE_STATUS_SUCCESS, false);
	} catch (error) {
		console.log(error);
		console.log("error---changeStatus");
	}
	return res.redirect(linkIndex);
};
const changeStatusMulti = async(req, res) =>{
	let statusNew = await getParams.getParam(req.params, "status", "active");
	let idItem = req.body.cid;
	let length = idItem.length;
	try {
		await groupsService.changeStatus(idItem, statusNew, "multi");
		req.flash("success", util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---changeStatusMulti");
	}
	return res.redirect(linkIndex);
};
const changeOrdering = async(req, res) => {
	let idItems = req.body.cid; // 1 là string, 2 là arr
	var length;
	if(((typeof idItems) == "string")){
		let arr = [];
		arr.push(idItems);
		length = arr.length;
	}else if((typeof idItems) == "object"){
		length = idItems.length;
	}
	let newOrdering = req.body.ordering;
	try {
		if(length == 1){
			await groupsService.changeOrdering(idItems, newOrdering, "");
		}else if(length > 1){
			idItems.forEach(async(idItem, index)=>{
				await groupsService.changeOrdering(idItem, newOrdering, index);
			});
		}
		req.flash("success", util.format(notify.CHANGE_ORDERING_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---changeOrdering");
	}
	return res.redirect(linkIndex);
};
const sort = async (req, res) =>{
	req.session.sort_Field = await getParams.getParam(req.params, "sortField", "ordering");
	req.session.sort_Type = await getParams.getParam(req.params, "sortType", "asc");
	return res.redirect(linkIndex);
};
const changeGroupACP = async(req, res) => {
	let idItem = await getParams.getParam(req.params, "id", "");
	let CRRGroupACP = await getParams.getParam(req.params, "GroupACP", "no");
	let GroupACP = (CRRGroupACP === "no") ? "yes" : "no";
	let data = {
		group_acp: GroupACP,
		modified: {
			user_id: 1,
			name: "admin",
			time: Date.now(),
		}
	}
	try {
		await groupsService.changeGroupACP(idItem, data);
		req.flash("success", notify.CHANGE_GRACP_SUCCESS, false);
	} catch (error) {
		console.log(error);
		console.log("error---changeOrdering");
	}
	return res.redirect(linkIndex);
};
export default {
	listGroups,
	formGroups,
	saveGroups,
	deleteGroups,
	deleteMulti,
	changeStatusMulti,
	changeStatus,
	changeOrdering,
	sort,
	changeGroupACP,
};
