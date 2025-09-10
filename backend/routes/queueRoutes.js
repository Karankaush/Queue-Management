const express = require('express');
const {
  createQueue,
  joinQueue,
  leaveQueue,
  getQueueById,
  getVendorQueues,
  closeQueue,
} = require("../controllers/queueController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");


// Vendor only

router.post('/create',protect, authorizeRoles("vendor"), createQueue)
router.put("/close/:id", protect, authorizeRoles("vendor"), closeQueue);  

// customer only

router.post('/join/:id', protect, authorizeRoles("customer"), joinQueue)
router.post("/leave/:id", protect, authorizeRoles("customer"), leaveQueue);

router.get("/:id", getQueueById);
router.get("/vendor/:vendorId", getVendorQueues);


module.exports = router