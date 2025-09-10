const {registerUser, loginUser, updateUser, deleteUser} = require('../controllers/userController')
const express = require('express')

const router = express.Router();


router.post('/register', registerUser)
router.get('/login', loginUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)


module.exports = router