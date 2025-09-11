const {registerUser, loginUser, updateUser, deleteUser, logoutUser} = require('../controllers/userController')
const express = require('express')

const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.delete('/delete/:id', protect, authorizeRoles("customer"), deleteUser)
router.put('/update/:id', protect, authorizeRoles("customer"), updateUser)


module.exports = router