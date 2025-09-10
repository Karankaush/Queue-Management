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

router.post('/create', createQueue)
router.post('/join/:id', joinQueue)
router.post("/leave/:id", leaveQueue);       
router.get("/:id", getQueueById);             
router.get("/vendor/:vendorId", getVendorQueues); 
router.put("/close/:id", closeQueue);  
module.exports = router