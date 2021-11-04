const User = require('../models').users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
  v4: uuidv4,
} = require('uuid');

module.exports = {
  async add(req, res) {
    const {fullname,email,password}=req.body;
    const  salt = await bcrypt.genSaltSync(10);
    const  passwordDigest = await bcrypt.hashSync(password,salt);
    const params = {
      id:uuidv4(),
      fullname: fullname,
      email: email,
      password: passwordDigest,
    }
    return User
      .create(params)
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  async login (req,res){
    const {email,password}=req.body;
    let login = await User.findOne({email});

    // validator email
    if(!login){
        return res.status(400).send('Email not found');
    }
    
    let result = await bcrypt.compareSync(password,login.password);
    
    if(result){
        var token = jwt.sign({ id: login.id }, process.env.SECRET_KEY);
        return res.status(201).send(token)
    }
    else{
      return res.status(400).send('Password isn\'t match');
    }
  },
};