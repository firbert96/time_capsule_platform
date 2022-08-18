const User = require('../models').users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
  v4: uuidv4,
} = require('uuid');

module.exports = {
  async add(req, res) {
    const {fullname,email,password}=req.body;
    try {
      const  salt = await bcrypt.genSaltSync(10);
      const  passwordDigest = await bcrypt.hashSync(password,salt);
      const params = {
        id:uuidv4(),
        fullname: fullname,
        email: email,
        password: passwordDigest,
      }
      const user = await User.create(params);
      return res.status(201).send(user)
    }
    catch (error) {
      return res.status(422).send(error);
    }
  },

  async login (req,res){
    const {email,password}=req.body;
    try {
      const login = await User.findOne({email});
      if(!login){
          return res.status(400).send('Email not found');
      }
      const result = await bcrypt.compareSync(password,login.password);
      if(result){
          const token = jwt.sign({ id: login.id }, process.env.SECRET_KEY);
          return res.status(201).send(token)
      }
      else{
        return res.status(400).send('Password isn\'t match');
      }
    }
    catch (error) {
      return res.status(422).send(error);
    }
  },
};