import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../../model/user.js'


// Log In
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
  
      if (!existingUser)
        return res.status(404).json({ message: "User doesn't exist." });
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid Password" });
  
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.SECRET
      );
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong." });
    }
}




// add user

export const addUser = async (req, res) =>
{
  res.set('Access-Control-Allow-Origin', '*');
  const { name, email, cnic, address, phone, gender, image_url, role, domain } = req.body;
  console.log(req.body);
  const found = await User.findOne({ email: req.body.email});
  if (found) {
    res.send("Already Exists");
  } 
  else {
  const user = new User({
    name: name,
    email: email,
    cnic: cnic,
    address: address,
    phone: phone,
    gender: gender,
    image_url: image_url,
    role: role,
    domain: domain
  })
  user.save((err, data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send({message: 'created'})
    }
  })
}
}

export const getEmp = async (req, res) => 
{
  const found = await User.find({role: 'employee'}, {_id: 0, name: true, email: 1, domain: 1, phone: 1});
  if(found){
    res.send({found})
  }
  else{
    res.send({message: 'not found'})
  }
}

export const delUser = async (req, res) => 
{
  console.log(req.body);
  const del = await User.deleteOne({email: req.body.email});
  if(del){
    res.send({message: 'deleted'})
  }
  else{
    res.send({message: 'not found'})
  }
}