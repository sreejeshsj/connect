import messageModel from "../models/messages.js";

const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    console.log(sender, receiver)
    const message = await messageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({createdAt:1})
    ;
    res.json({
       success:true,
       message
    })
  } catch (error) {
    res.json({
        success:false,
        message:error.message
    })
  }
};

export {
    getMessages
}
