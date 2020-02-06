import util from "util";
const {getParams, filterStt, createalias} = require(__path_helpers + "index.helper");
const {categsService} 		= require(__path_services + "index.Service");
const systemConfig 			= require(__path_configs + "system.Config");
const {Validatecategorys} 	= require(__path_validates + "index.Validate");
const notify 					= require(__path_configs + "notify.Config");

const folderView	 = __path_views + "pages/categorys/";
const pageTitleIndex = "Categorys Management"; 
const pageTitleAdd   = pageTitleIndex + " - Add";
const pageTitleEdit  = pageTitleIndex + " - Edit";
const linkIndex = "/" + systemConfig.prefixAdmin + "/categorys/";

const listCateg =  async(req, res) => {	
	try {
		let params = {}; 
		params.currentStatus = getParams.getParam(req.params, "status", "all"); //lấy trạng thái trên url
		params.keyword 		= getParams.getParam(req.query, "keyword", ""); //lấy trạng thái trên url
		params.sortType 		= getParams.getParam(req.session, "sort_Type", "asc"); //lấy trạng thái trên url
		params.sortFiled 		= getParams.getParam(req.session, "sort_Field", "ordering"); //lấy trạng thái trên url
		
		params.statusFilter = await filterStt.createFilterStatus(params, "categ.Service"); //tạo ra bộ lọc
		params.pagination = {
			totalItems: 1,
			totalItemsPerPage : 4,
			currentPage : parseInt(getParams.getParam(req.query, "page", 1)),
			pageRanges: 3, //số lượng hiển thị ở phân trang
		}; 
		
		params.pagination.currentPage =  await getParams.getParam(req.query, "page", 1); //lấy được trang hiện tại và cập nhập lên cho pagination
		params.pagination.totalItems 	= await categsService.countTotal(params);
		let items = await categsService.showCategService(params); //lấy ra các items
		return res.render(`${folderView}list.viewscateg.ejs`, {
			pageTitle: pageTitleIndex,
			items,
			params,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listItem");
	}
}; 
const formCateg = async (req, res) => {
	let id = await getParams.getParam(req.params, "id", "");
	let item = {id: id, username: "", ordering: 0, status: "novalue"};
	let errors   = null;

	if(id){
		try {
			item = await categsService.showInfoCategEdit(id); //lấy ra các items
			return res.render(`${folderView}form.viewscateg.ejs`, {
				pageTitle: pageTitleEdit,
				item,
				errors,
			});
		} catch (error) {
			console.log(error);
			console.log("error---formItem");
		}
	}else{
		return res.render(`${folderView}form.viewscateg.ejs`, {
			pageTitle: pageTitleAdd,
			item,
			errors
		});
	}
}; 
const saveCateg = async(req, res) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	Validatecategorys.validator(req);
	let item = Object.assign(req.body);
	let errors = req.validationErrors();
	let itemNew = {
		username: req.body.username,
		ordering: req.body.ordering,
		status: req.body.status,
		content: req.body.content,
		slug: createalias.createalias(req.body.slug),
	};
	let checkStatus = (typeof item !== "undefined" && item.id !== "" ) ? "edit" : "add"; //check xem user add hay edit
	try {
		if(errors){
			let pageTitle = (checkStatus == "edit") ? pageTitleEdit : pageTitleAdd;
			return res.render(`${folderView}form.viewscateg.ejs`, { pageTitle, item, errors});
		}else{
			let messNotify = (checkStatus == "edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
			await categsService.saveCateg(item.id, itemNew, checkStatus);
			req.flash("success", messNotify, false);
		}
	} catch (error) {
		console.log(error);
		console.log("error-saveCateg");
	}
	return res.redirect(linkIndex);
};
const deleteCateg = async(req, res) =>{
	let itemId = await getParams.getParam(req.params, "id", "");
	try {
		await categsService.deleteCateg(itemId, "one");
		req.flash("success", notify.DELETE_SUCCESS, false);
	} catch (error) {
		console.log(error);
		console.log("error---deleteCateg");
	}
	return res.redirect(linkIndex);
}; 
const deleteCategMulti = async(req, res) =>{
	let idItem = req.body.cid;
	let length = idItem.length;
	try {
		await categsService.deleteCateg(idItem, "multi");
		req.flash("success", util.format(notify.DELETE_MULTI_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---deleteCategMulti");
	}
	return res.redirect(linkIndex);
};
const changeStatus = async(req, res) =>{
	let currStatus = await getParams.getParam(req.params, "status", ""); //lấy trạng thái trên url
	let id = await getParams.getParam(req.params, "id", ""); //lấy trạng thái trên url
	
	try {
		await categsService.changeStatus(id, currStatus, "one");
	} catch (error) {
		console.log(error);
		console.log("error---changeStatus");
	}
	req.flash("success", notify.CHANGE_STATUS_SUCCESS, false);
	return res.redirect(linkIndex);
};
const changeStatusMulti = async(req, res) =>{
	let statusNew = await getParams.getParam(req.params, "status", "active");
	let idItem = req.body.cid;
	let length = idItem.length;
	try {
		await categsService.changeStatus(idItem, statusNew, "multi");
	} catch (error) {
		console.log(error);
		console.log("error---changeStatusMulti");
	}
	req.flash("success", util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, length), false);
	return res.redirect(linkIndex);
};
const changeOrdering = async(req, res) => {
	let idItems = req.body.cid; //1 là string, 2 là arr
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
		if(length == 1){// đổi 1
			await categsService.changeOrdering(idItems, newOrdering, "");
		}else if(length > 1){ // đổi nhiều
			idItems.forEach(async(idItem, index)=>{
				await categsService.changeOrdering(idItem, newOrdering, index);
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
export default {
   listCateg,
	formCateg,
	saveCateg,
	deleteCateg,
	deleteCategMulti,
	changeStatusMulti,
	changeStatus,
	changeOrdering,
	sort,
};