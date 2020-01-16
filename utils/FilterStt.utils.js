import {itemService} from "./../service/index.service";
const createFilterStt = (currStatus) =>{
   let statusFiter = [
      {name: "All", value:"all", count: 0, link: "all", class: "default"},
      {name: "Active", value:"active", count: 0, link: "active", class: "default"},
      {name: "InActive", value:"inactive", count: 0, link: "inactive", class: "default"},
   ];
   statusFiter.forEach(async(item, index)=>{
      let condition = {};
      if(item.value === "all"){
         condition = {};
      }else if(item.value !== "all"){
         condition = {status : item.value};
      }
      if(item.value == currStatus){
         statusFiter[index].class = "success";
      }
      let resultCount = await itemService.countFilter(condition);
      statusFiter[index].count = resultCount;
   });
   return statusFiter;
};
export default {
   createFilterStt,
};
