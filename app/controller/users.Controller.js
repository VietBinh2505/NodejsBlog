import util from "util";
const { getParams, filterStt, FileHelper } = require(__path_helpers + "index.helper");
const { userService, groupsService } = require(__path_services + "index.Service");
const { ValidateUsers } = require(__path_validates + "index.Validate");
const notify = require(__path_configs + "notify.Config");
const systemConfig = require(__path_configs + "system.Config");
const folderView = __path_views + "pages/users/";
const pageTitleIndex = "User Management";
const pageTitleAdd = pageTitleIndex + " - Add";
const pageTitleEdit = pageTitleIndex + " - Edit";
const linkIndex = "/" + systemConfig.prefixAdmin + "/users/";
const upLoadAvatar = FileHelper.uploadFile("avatar", "users");

const listUser = async (req, res) => {
	try {
		let params = {};
		params.currentStatus = await getParams.getParam(req.params, "status", "all"); // lấy trạng thái trên url (all, active, inactive)
		params.keyword = await getParams.getParam(req.query, "keyword", "");
		params.sortType = await getParams.getParam(req.session, "sort_Type", "asc"); // lấy trạng thái trên url (all, active, inactive)
		params.sortFiled = await getParams.getParam(req.session, "sort_Field", "ordering"); // lấy trạng thái trên url (all, active, inactive)
		params.filterGroupId = await getParams.getParam(req.session, "filter_groupId", "");

		params.statusFilter = await filterStt.createFilterStatus(params, "users.Service"); // tạo ra bộ lọc
		params.pagination = {
			totalItems: 1,
			totalItemsPerPage: 4,
			currentPage: parseInt(getParams.getParam(req.query, "page", 1)),
			pageRanges: 3, // số lượng hiển thị ở phân trang
		};
		params.itemsGr = await groupsService.showAllGropItem();
		params.itemsGr.unshift({ "_id": "allvalue", "username": "All Value" }); //thêm phần tử vào vị trí đầu tiên trong mảng

		params.pagination.currentPage = await getParams.getParam(req.query, "page", 1); // lấy được trang hiện tại và cập nhập lên cho pagination
		params.pagination.totalItems = await userService.countTotal(params);
		let items = await userService.showUsersService(params); // lấy ra các items
		return res.render(`${folderView}list.viewsusers.ejs`, {
			pageTitle: pageTitleIndex,
			items,
			params,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listItem");
	}
};
const formUser = async (req, res) => {
	let id = await getParams.getParam(req.params, "id", "");
	let item = { id: id, username: "", ordering: 0, status: "novalue" };
	let errors = null;
	let itemsGr = await groupsService.showAllGropItem();
	itemsGr.unshift({ "_id": "novalue", "username": "Choose Group" }); //thêm phần tử vào vị trí đầu tiên trong mảng

	if (id) {
		try {
			item = await userService.showInfoItemEdit(id); // lấy ra các items
			item.group_id = item.group.id;
			item.group_name = item.group.name;
			return res.render(`${folderView}form.viewsusers.ejs`, {
				pageTitle: pageTitleEdit,
				item,
				errors,
				itemsGr,
			});
		} catch (error) {
			console.log(error);
			console.log("error---formItem");
		}
	} else {
		return res.render(`${folderView}form.viewsusers.ejs`, {
			pageTitle: pageTitleAdd,
			item,
			errors,
			itemsGr,
		});
	}
};
const saveUser = async (req, res) => {
	upLoadAvatar(req, res, async (errorUpload) => {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		let checkStatus = (typeof item !== "undefined" && item.id !== "") ? "edit" : "add"; //check xem user add hay edit
		let errors = ValidateUsers.validator(req, errorUpload, checkStatus);
		
		let itemsGr = await groupsService.showAllGropItem();
		itemsGr.unshift({ "_id": "novalue", "username": "Choose Group" }); //thêm phần tử vào vị trí đầu tiên trong mảng
		let itemNew = {
			username: req.body.username,
			ordering: req.body.ordering,
			status: req.body.status,
			content: req.body.content,
		};
		itemNew.group = {
			id: item.group,
			name: item.group_name
		};
		try {
			if (errors.length > 0) {
				let pageTitle = (checkStatus == "edit") ? pageTitleEdit : pageTitleAdd;
				if(req.filename !== undefined){
					FileHelper.removefile("public/upload/users/", req.file.filename);
				}
				if(checkStatus == "edit"){
					item.avatar = item.image_old;
				}
				return res.render(`${folderView}form.viewsusers.ejs`, { pageTitle, item, errors, itemsGr });
			} else {
				let messNotify = (checkStatus == "edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
				if(req.file.filename == undefined){
					itemNew.avatar = item.image_old;
				}else{
					itemNew.avatar = req.file.filename;
					if(checkStatus === "edit"){
						FileHelper.removefile("public/upload/users/", item.image_old);
					} 
				}
				await userService.saveUser(item.id, itemNew, checkStatus);
				req.flash("success", messNotify, false);
			}
		} catch (error) {
			console.log(error);
			console.log("error-saveItem");
		}
		return res.redirect(linkIndex);
	});
};
const deleteUser = async (req, res) => {
	let itemId = await getParams.getParam(req.params, "id", "");
	try {
		await userService.deleteUser(itemId, "one");
	} catch (error) {
		console.log(error);
		console.log("error---deleteUser");
	}
	req.flash("success", notify.DELETE_SUCCESS, false);
	return res.redirect(linkIndex);
};
const deleteUserMulti = async (req, res) => {
	let idItem = req.body.cid;
	let length = idItem.length;
	try {
		await userService.deleteUser(idItem, "multi");
		req.flash("success", util.format(notify.DELETE_MULTI_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---deleteUserMulti");
	}
	return res.redirect(linkIndex);
};
const changeStatus = async (req, res) => {
	let currStatus = await getParams.getParam(req.params, "status", ""); // lấy trạng thái trên url (all, active, inactive)
	let id = await getParams.getParam(req.params, "id", ""); // lấy trạng thái trên url (all, active, inactive)

	try {
		await userService.changeStatus(id, currStatus, "one");
	} catch (error) {
		console.log(error);
		console.log("error---changeStatus");
	}
	req.flash("success", notify.CHANGE_STATUS_SUCCESS, false);
	return res.redirect(linkIndex);
};
const changeStatusMulti = async (req, res) => {
	let idItem = req.body.cid;
	let length = idItem.length;
	let statusNew = await getParams.getParam(req.params, "status", "active");
	try {
		await userService.changeStatus(idItem, statusNew, "multi");
	} catch (error) {
		console.log(error);
		console.log("error---changeStatus");
	}
	req.flash("success", util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, length), false);
	return res.redirect(linkIndex);
};
const changeOrdering = async (req, res) => {
	let idItems = req.body.cid; // 1 là string, 2 là arr
	var length;
	if (((typeof idItems) == "string")) {
		let arr = [];
		arr.push(idItems);
		length = arr.length;
	} else if ((typeof idItems) == "object") {
		length = idItems.length;
	}
	let newOrdering = req.body.ordering;
	try {
		if (length == 1) {
			await userService.changeOrdering(idItems, newOrdering, "");
		} else if (length > 1) {
			idItems.forEach(async (idItem, index) => {
				await userService.changeOrdering(idItem, newOrdering, index);
			});
		}
		req.flash("success", util.format(notify.CHANGE_ORDERING_SUCCESS, length), false);
	} catch (error) {
		console.log(error);
		console.log("error---changeOrdering");
	}
	return res.redirect(linkIndex);
};
const sort = async (req, res) => {
	req.session.sort_Field = await getParams.getParam(req.params, "sortField", "ordering");
	req.session.sort_Type = await getParams.getParam(req.params, "sortType", "asc");
	return res.redirect(linkIndex);
};
const filter_group = async (req, res) => {
	req.session.filter_groupId = await getParams.getParam(req.params, "id", "");
	return res.redirect(linkIndex);
};
export default {
	listUser,
	formUser,
	saveUser,
	deleteUser,
	deleteUserMulti,
	changeStatusMulti,
	changeStatus,
	changeOrdering,
	sort,
	filter_group,
};