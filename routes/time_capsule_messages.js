const express = require('express');
const router = express.Router();
const time_capsule_messageController = require('../controllers/time_capsule_messages');
const authenticate=require('../middlewares/authentication.js');
const upload = require('../middlewares/multer');
const timeCapsuleMessagesMiddlewares = require('../middlewares/time_capsule_messages');

router.get('/time_capsule_message/list_by_users_id',authenticate,time_capsule_messageController.list);
router.get('/time_capsule_message/list_all',time_capsule_messageController.listAll);
router.post('/time_capsule_message/add',authenticate,timeCapsuleMessagesMiddlewares.add,time_capsule_messageController.add);
router.put('/time_capsule_message/add_or_update_attachment',authenticate, upload.single('attachment'), time_capsule_messageController.addOrUpdateAttachment);
router.put('/time_capsule_message/update',authenticate,timeCapsuleMessagesMiddlewares.update,time_capsule_messageController.update);

module.exports = router; 