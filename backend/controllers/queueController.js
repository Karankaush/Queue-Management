const Queue = require('../models/Queue')

const createQueue = async(req, res) =>{
    try{
        const {vendor, service} = req.body;

        const queue = await Queue.create({
            vendor,
            service,
            customers : [],
        })
        res.status(201).json({message: "Queue created successfully",queue,});
    } catch(err){
        return res.status(500).json({message : err.message})
    }
}

const joinQueue = async(req,res) => {
   try{
     const {id} = req.params;
     const{user} = req.body;

     const queue = await Queue.findOne(id);
     if(!queue) return res.status(404).json({message : "Queue not found"});

     // agar user pehle se hi h

     const alreadyUser = await Queue.customers.find((c) => c.user.toString() === user);
     if(alreadyUser){
         return res.status(400).json({ message: "Already in queue" });
     }

     queue.customers.push({user});
     await queue.save();
     return  res.json({ message: "Joined queue successfully", queue });

   } catch (error) {
    res.status(500).json({ message: error.message });
    }

}

const leaveQueue = async (req, res) => {
  try {
    const { id } = req.params; // queueId
    const { user } = req.body; // customerId

    const queue = await Queue.findById(id);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    queue.customers = queue.customers.filter(
      (c) => c.user.toString() !== user
    );

    await queue.save();
    res.json({ message: "Left queue successfully", queue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQueueById = async (req, res) => {
  try {
    const { id } = req.params;

    const queue = await Queue.findById(id).populate("customers.user", "name email");
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendorQueues = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const queues = await Queue.find({ vendor: vendorId });
    res.json(queues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const closeQueue = async (req, res) => {
  try {
    const { id } = req.params;

    const queue = await Queue.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!queue) return res.status(404).json({ message: "Queue not found" });

    res.json({ message: "Queue closed successfully", queue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {createQueue, joinQueue, leaveQueue, getQueueById, getVendorQueues, closeQueue}