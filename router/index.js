const getUsers = require('../controllers/getUsers');
const router = new Map();

router.set("/api/get-users", getUsers);

module.exports = router;
