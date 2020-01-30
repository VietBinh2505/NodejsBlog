import util from "util";
const notify = require(__path_configs + "notify.Config");
const options = {
    name:       { min: 1, max: 30 },
    ordering:   { min: 0, max: 100 },
    status:     { value: "novalue" },
    content:    { min: 5, max: 30 },
};

module.exports = {
    validator: (req) => {
        // NAME
        req.checkBody("username", util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })

        // ORDERING
        req.checkBody("ordering", util.format(notify.ERROR_ORDERING, options.ordering.min, options.ordering.max))
            .isInt({gt: options.ordering.min, lt: options.ordering.max});
        
        // STATUS
        req.checkBody("status", notify.ERROR_STATUS)
            .isNotEqual(options.status.value);
        
        // GROUP_ACP
        req.checkBody("group_acp", notify.ERROR_GROUPACP)
            .notEmpty();

        // CONTENT
        req.checkBody("content", util.format(notify.ERROR_CONTENT, options.content.min, options.content.max) )
            .isLength({min: options.content.min, max: options.content.max});
    }
};
