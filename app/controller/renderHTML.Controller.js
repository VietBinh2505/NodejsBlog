import {getParams, filterStt} from "./../helpers/index.helper";
const {itemService} = require(__path_services + "index.Service");
const systemConfig  = require(__path_configs + "system.Config");
const {ValidateItems}  = require(__path_validates + "index.Validate");
const notify  		= require(__path_configs + "notify.Config");

import util from "util";
const folderView	 = __path_views + "pages/items/";
const pageTitleIndex = "Item Management"; 
const pageTitleAdd   = pageTitleIndex + " - Add";
const pageTitleEdit  = pageTitleIndex + " - Edit";

const linkIndex		 = "/" + systemConfig.prefixAdmin + "/items/";

const listItem =  async(req, res) => {	
	try {
		let currentStatus = await getParams.getParam(req.params, "status", "all"); // lấy trạng thái trên url (all, active, inactive)
		let keyword = await getParams.getParam(req.query, "keyword", "");
		let statusFilter = await filterStt.createFilterStatus(currentStatus); // tạo ra bộ lọc
		let pagination = {
			totalItems: 1,
			totalItemsPerPage : 4,
			currentPage : 1,
			pageRanges: 3, // số lượng hiển thị ở phân trang
		};
		pagination.totalItems = await itemService.countTotal(currentStatus, keyword);
		pagination.currentPage =  await getParams.getParam(req.query, "page", 1); // lấy được trang hiện tại và cập nhập lên cho pagination
		let skip = ((pagination.currentPage - 1) * pagination.totalItemsPerPage); // lấy được số phần tử bỏ qua
		let limit = pagination.totalItemsPerPage; // lấy được số phần tử cần lấy
		let items = await itemService.showItemService(currentStatus, keyword, skip, limit); // lấy ra các items
		return res.render(`${folderView}list.viewsitems.ejs`, {
			pageTitle: pageTitleIndex,
			statusFilter,
			items,
			currentStatus,
			keyword,
			pagination,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listItem");
	}
}; 
const formItem = async (req, res) => {
	let id = await getParams.getParam(req.params, "id", "");
	let item = {id: id, username: "", ordering: 0, status: "novalue"};
	let errors   = null;

	if(id){
		try {
			item = await itemService.showInfoItemEdit(id); // lấy ra các items
			return res.render(`${folderView}form.viewsitems.ejs`, {
				pageTitle: pageTitleEdit,
				item,
				errors,
			});
		} catch (error) {
			console.log(error);
			console.log("error---formItem");
		}
	}else{
		return res.render(`${folderView}form.viewsitems.ejs`, {
			pageTitle: pageTitleAdd,
			item,
			errors
		});
	}
};
const saveItem = async(req, res) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateItems.validator(req);

	let item = Object.assign(req.body);
	let errors = req.validationErrors();
	let itemNew = {
		username: req.body.username,
		ordering: req.body.ordering,
		status: req.body.status,
	};
	try {
		if(typeof item !== "undefined" && item.id !== "" ){	// edit
			if(errors) { 
				res.render(`${folderView}form.viewsitems.ejs`, { pageTitle: pageTitleEdit, item, errors});
			}else {
				itemNew.modified = {
					user_id: 1,
					name: "admin",
					time: Date.now(),
				};
				
				await itemService.saveItem(item.id, itemNew);
				req.flash("success", notify.EDIT_SUCCESS, false);
			}
		}else{ //add
			if(errors) { 
				res.render(`${folderView}form.viewsitems.ejs`, { pageTitle: pageTitleAdd, item, errors});
			}else {
				itemNew.created = {
					name: "admin",
					user_id: 1,
					time: Date.now(),
				};
				await itemService.saveItem(item.id, itemNew);
				req.flash("success", notify.ADD_SUCCESS, false);
			}
		}
	} catch (error) {
		console.log("error-saveItem");
	}
	return res.redirect(linkIndex);
};
const deleteItem = async(req, res) =>{
	let itemId = await getParams.getParam(req.params, "id", "");
	try {
		await itemService.deleteItem(itemId);
		req.flash("success", notify.DELETE_SUCCESS, false);
	} catch (error) {
		console.log(error);
		console.log("error---deleteItem");
	}
	return res.redirect(linkIndex);
};
const deleteMulti = async(req, res) =>{
	let idItem = req.body.cid;
	let length = idItem.length;
	try {
		await itemService.deleteMulti(idItem);
		req.flash("success", util.format(notify.DELETE_MULTI_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---deleteMulti");
	}
	return res.redirect(linkIndex);
};
const changeStatus = async(req, res) =>{
	let currStatus = await getParams.getParam(req.params, "status", ""); // lấy trạng thái trên url (all, active, inactive)
	let id = await getParams.getParam(req.params, "id", ""); // lấy trạng thái trên url (all, active, inactive)
	let status = (currStatus === "active") ? "inactive" : "active";
	let data = {
		status: status,
		modified: {
			user_id: 1,
			name: "admin",
			time: Date.now(),
		}
	};
	try {
		await itemService.changeStatus(id, data);
		req.flash("success", notify.CHANGE_STATUS_SUCCESS, false);
	} catch (error) {
		console.log(error);
		console.log("error---changeStatus");
	}
	return res.redirect(linkIndex);
};
const changeStatusMulti = async(req, res) =>{
	let idItem = req.body.cid;
	let length = idItem.length;
	
	try {
		let statusNew = await getParams.getParam(req.params, "status", "active");
		let data = {
			statusNew,
			modified: {
				user_id: 1,
				name: "admin",
				time: Date.now(),
			}
		};
		await itemService.changeStatusMulti(idItem, data);
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
			await itemService.changeOrdering(idItems, newOrdering, "");
		}else if(length > 1){
			idItems.forEach(async(idItem, index)=>{
				await itemService.changeOrdering(idItem, newOrdering, index);
			});
		}
		req.flash("success", util.format(notify.CHANGE_ORDERING_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---changeOrdering");
	}
	return res.redirect(linkIndex);
};
export default {
	listItem,
	formItem,
	saveItem,
	deleteItem,
	deleteMulti,
	changeStatusMulti,
	changeStatus,
	changeOrdering,
};

