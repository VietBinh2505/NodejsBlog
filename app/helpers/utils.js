let createFilterStatus =  async (CRRStatus, collection) => {
	const crrService = require(__path_services + collection);
   let statusFilter = [
		{name: "All", value: "all", count: 0, class: "default"},
		{name: "Active", value: "active",  count: 0, class: "default"},
		{name: "InActive", value: "inactive",  count: 0, class: "default"}
	];

	for(let index = 0; index < statusFilter.length; index++) {
		let item = statusFilter[index];
		let condition = (item.value !== "all") ? {status: item.value} : {};
		if(item.value === CRRStatus) statusFilter[index].class = "success";
		try {
			let data = await crrService.default.countDocument(condition);
			statusFilter[index].count = data;
		} catch (error) {
			console.log(error);
			console.log("createFilterStatus loi tai");
		}
	}
   return statusFilter;
}

module.exports = {
   createFilterStatus
};
