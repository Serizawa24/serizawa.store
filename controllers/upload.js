import User from "../models/User.js";
import fs from 'fs';
import path from "path";
import __dirname from "../util/__dirname.js";

export const changeAvatar = async (req, res) => {
  try {
    const filename = req.file.filename;
    let user = await User.findOne({_id:req.user.id})
    let oldfile = user.avatar
    await User.updateOne({ _id: req.user.id },{avatar:filename} )
    if(oldfile !== 'avatar-template') {
      fs.unlink(path.join(__dirname,`../public/${oldfile}`),(err)=>{
        
      })
    }
    res.status(200).json('Updated')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};