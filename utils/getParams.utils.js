let Param = (params, property, defaulValue) =>{
   if(params.hasOwnProperty(property) && params[property] !== undefined){
      return params[property]; // lấy trạng thái trên url (all, active, inactive)
   }
   return defaulValue;
};

export default {
   Param,
};
