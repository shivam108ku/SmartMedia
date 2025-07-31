const express = require('express')
const router = express.Router();

// Post /api/post [protected]
router.post('/',postController)

module.exports = router;