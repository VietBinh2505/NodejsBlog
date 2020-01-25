const ItemsModel = require(__path_schemas +  'items');

let createFilterStatus =  async (currentStatus) => {
    let statusFilter = [
		{name: 'All', value: 'all', count: 0, class: 'default'},
		{name: 'Active', value: 'active',  count: 0, class: 'default'},
		{name: 'InActive', value: 'inactive',  count: 0, class: 'default'}
	];

	for(let index = 0; index < statusFilter.length; index++) {
		let item = statusFilter[index];
		let condition = (item.value !== "all") ? {status: item.value} : {};
		if(item.value === currentStatus) statusFilter[index].class = 'success';

		await ItemsModel.countDocuments(condition).then( (data) => {
			statusFilter[index].count = data;
		});
	}
   return statusFilter;
}

module.exports = {
   createFilterStatus
};
