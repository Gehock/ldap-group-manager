const db = require('../db')

const groupModifyEventSchema = new db.Schema({
    timestamp: { type: Date, default: Date.now },
    operation: { required: true, type: String, enum: ["add", "delete"] },
    targetPerson: { required: true, type: String },
    changedBy: { required: true, type: String },
    group: { required: true, type: String },
    comments: { type: String },
});

const GroupModifyEvent = db.model("GroupModifyEvent", groupModifyEventSchema);

module.exports = GroupModifyEvent;