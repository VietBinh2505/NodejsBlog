import util from "util";
const { getParams, filterStt, FileHelper, stringHelper } = require(__path_helpers + "index.helper");
const { articlesService, categsService } = require(__path_sv_BE + "index.Service");

const { ValidateArt } = require(__path_validates + "index.Validate");
const notify = require(__path_configs + "notify.Config");
const systemConfig = require(__path_configs + "system.Config");
const folderView = __path_views_admin + "pages/article/";
const pageTitleIndex = "Article Management";
const pageTitleAdd = pageTitleIndex + " - Add";
const pageTitleEdit = pageTitleIndex + " - Edit";
const linkIndex = "/" + systemConfig.prefixAdmin + "/article/";
const upLoadAvatar = FileHelper.uploadFile("avatar", "article");

const listArticle = async (req, res) => {
	try {
		let params = {};
		params.currentStatus = await getParams.getParam(req.params, "status", "all"); // lấy trạng thái trên url (all, active, inactive)
		params.keyword = await getParams.getParam(req.query, "keyword", "");
		params.sortType = await getParams.getParam(req.session, "sort_Type", "asc"); // lấy trạng thái trên url (all, active, inactive)
		params.sortFiled = await getParams.getParam(req.session, "sort_Field", "ordering"); // lấy trạng thái trên url (all, active, inactive)
		params.filterCateg = await getParams.getParam(req.session, "filter_categ", "");
		params.statusFilter = await filterStt.createFilterStatus(params, "articles.Service"); // tạo ra bộ lọc
		params.pagination = {
			totalItems: 1,
			totalItemsPerPage: 4,
			currentPage: parseInt(getParams.getParam(req.query, "page", 1)),
			pageRanges: 3, // số lượng hiển thị ở phân trang
		};
		params.itemsGr = await categsService.showAllArticle();
		params.itemsGr.unshift({ "_id": "allvalue", "username": "All Value" }); //thêm phần tử vào vị trí đầu tiên trong mảng
		params.pagination.currentPage = await getParams.getParam(req.query, "page", 1); // lấy được trang hiện tại và cập nhập lên cho pagination
      params.pagination.totalItems = await articlesService.countTotal(params);
      let items = await articlesService.showArticleService(params); // lấy ra các items
		return res.render(`${folderView}list.viewsArticle.ejs`, {
			pageTitle: pageTitleIndex,
			items,
			params,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listArticle");
	}
};
const formArticle = async (req, res) => {
	let id = await getParams.getParam(req.params, "id", "");
	let item = { id: id, username: "", ordering: 0, status: "novalue" };
	let errors = null;
	let itemsGr = await categsService.showAllArticle();
	itemsGr.unshift({ "_id": "novalue", "username": "Choose Category" }); //thêm phần tử vào vị trí đầu tiên trong mảng

	if (id) {
		try {
			item = await articlesService.showInfoArticleEdit(id); // lấy ra các items
			item.categ_id = item.categ.id;
			item.categ_name = item.categ.name;
			return res.render(`${folderView}form.viewsArticle.ejs`, {
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
		return res.render(`${folderView}form.viewsArticle.ejs`, {
			pageTitle: pageTitleAdd,
			item,
			errors,
			itemsGr,
		});
	}
};
const saveArticle = async (req, res) => {
	upLoadAvatar(req, res, async (errorUpload) => {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		let checkStatus = (typeof item !== "undefined" && item.id !== "") ? "edit" : "add"; //check xem user add hay edit
		let errors = ValidateArt.validator(req, errorUpload, checkStatus);
		let itemsGr = await categsService.showAllArticle();
		itemsGr.unshift({ "_id": "novalue", "username": "Choose Group" }); //thêm phần tử vào vị trí đầu tiên trong mảng
		let itemNew = {
			username: req.body.username,
			ordering: req.body.ordering,
			status: req.body.status,
			content: req.body.content,
			special: req.body.special,
			slug: stringHelper.createalias(req.body.slug),
		};
		itemNew.categ = {
			id: item.category_id,
			name: item.category_name,
		};
		console.log(req.file.filename);
		try {
			if (errors.length > 0) {
				let pageTitle = (checkStatus == "edit") ? pageTitleEdit : pageTitleAdd;
				if(req.filename !== undefined){
					FileHelper.removefile("public/upload/article/", req.file.filename);
				}
				if(checkStatus == "edit"){
					item.avatar = item.image_old;
				}
				return res.render(`${folderView}form.viewsArticle.ejs`, { pageTitle, item, errors, itemsGr });
			} else {
				let messNotify = (checkStatus == "edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
				if(req.file == undefined){
					itemNew.avatar = item.image_old;
				}else{
					itemNew.avatar = req.file.filename;
					if(checkStatus === "edit"){
						FileHelper.removefile("public/upload/article/", item.image_old);
					} 
				}
				await articlesService.saveArticle(item.id, itemNew, checkStatus);
				req.flash("success", messNotify);
			}
		} catch (error) {
			console.log(error);
			console.log("error-saveItem");
		}
		return res.redirect(linkIndex);
	});
};
const deleteArticle = async (req, res) => {
	let itemId = await getParams.getParam(req.params, "id", "");
	try {
		await articlesService.deleteArticle(itemId, "one");
	} catch (error) {
		console.log(error);
		console.log("error---deleteArticle");
	}
	req.flash("success", notify.DELETE_SUCCESS);
	return res.redirect(linkIndex);
};
const deleteArticleMulti = async (req, res) => {
	let idItem = req.body.cid;
	let length = idItem.length;
	try {
		await articlesService.deleteArticle(idItem, "multi");
		req.flash("success", util.format(notify.DELETE_MULTI_SUCCESS, length));
	} catch (error) {
		console.log(error);
		console.log("error---deleteArticleMulti");
	}
	return res.redirect(linkIndex);
};
const changeStatus = async (req, res) => {
	let currStatus = await getParams.getParam(req.params, "status", ""); // lấy trạng thái trên url (all, active, inactive)
	let id = await getParams.getParam(req.params, "id", ""); // lấy trạng thái trên url (all, active, inactive)

	try {
		await articlesService.changeStatus(id, currStatus, "one");
	} catch (error) {
		console.log(error);
		console.log("error---changeStatus");
	}
	req.flash("success", notify.CHANGE_STATUS_SUCCESS);
	return res.redirect(linkIndex);
};
const changeStatusMulti = async (req, res) => {
	let idItem = req.body.cid;
	let length = idItem.length;
	let statusNew = await getParams.getParam(req.params, "status", "active");
	try {
		await articlesService.changeStatus(idItem, statusNew, "multi");
	} catch (error) {
		console.log(error);
		console.log("error---changeStatus");
	}
	req.flash("success", util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, length));
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
			await articlesService.changeOrdering(idItems, newOrdering, "");
		} else if (length > 1) {
			idItems.forEach(async (idItem, index) => {
				await articlesService.changeOrdering(idItem, newOrdering, index);
			});
		}
		req.flash("success", util.format(notify.CHANGE_ORDERING_SUCCESS, length));
	} catch (error) {
		console.log(error);
		console.log("error---changeOrdering");
	}
	return res.redirect(linkIndex);
};
const changeSpecial = async (req, res) => {
	let currSpecial = await getParams.getParam(req.params, "special", ""); // lấy trạng thái trên url (all, active, inactive)
	let id = await getParams.getParam(req.params, "id", ""); // lấy trạng thái trên url (all, active, inactive)

	try {
		await articlesService.changeSpecial(id, currSpecial, "one");
	} catch (error) {
		console.log(error);
		console.log("error---changeNormal");
	}
	req.flash("success", notify.CHANGE_STATUS_SUCCESS);
	return res.redirect(linkIndex);
};
const changeSpecialMulti = async (req, res) => {
	let idItem = req.body.cid;
	let length = idItem.length;
	let currSpecial = await getParams.getParam(req.params, "special", "normal");
	try {
		await articlesService.changeSpecial(idItem, currSpecial, "multi");
	} catch (error) {
		console.log(error);
		console.log("error---changeSpecialMulti");
	}
	req.flash("success", util.format(notify.CHANGE_NORMAL_MULTI_SUCCESS, length));
	return res.redirect(linkIndex);
};
const sort = async (req, res) => {
	req.session.sort_Field = await getParams.getParam(req.params, "sortField", "ordering");
	req.session.sort_Type = await getParams.getParam(req.params, "sortType", "asc");
	return res.redirect(linkIndex);
};
const filter_categ = async (req, res) => {
	req.session.filter_categ = await getParams.getParam(req.params, "id", "");
	return res.redirect(linkIndex);
};
export default {
	listArticle,
	formArticle,
	saveArticle,
	deleteArticle,
	deleteArticleMulti,
	changeStatusMulti,
	changeStatus,
	changeOrdering,
	sort,
	filter_categ,
	changeSpecial,
	changeSpecialMulti
};