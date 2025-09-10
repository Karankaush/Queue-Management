const {registerUser, loginUser, updateUser, deleteUser} = require('../controllers/userController')
const express = require('express')

const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");


router.post('/register', registerUser)
router.get('/login', loginUser)
router.delete('/delete/:id', protect, authorizeRoles("customer"), deleteUser)
router.put('/update/:id', protect, authorizeRoles("customer"), updateUser)


module.exports = router