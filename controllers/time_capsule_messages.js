const User = require('../models').users;
const Time_Capsule_Message = require('../models').time_capsule_messages;
const { 
  v4: uuidv4,
} = require('uuid');

module.exports = {
  list(req, res) {
    return Time_Capsule_Message
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((response) => res.status(200).send(response))
      .catch((error) => { res.status(400).send(error); });
  },

  add(req, res) {
    if(!req.headers.authorization){
      return res.status(401).send('Unauthorized');
    }
    const {subject,message,release_time}=req.body;
    const params = {
      id:uuidv4(),
      users_id:req.headers.authorization,
      subject: subject,
      message: message,
      release_time: release_time,
    }
    return Time_Capsule_Message
      .create(params)
      .then((response) => res.status(201).send(response))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    if(!req.headers.authorization){
      return res.status(401).send('Unauthorized');
    }

    const {subject,message,release_time,active}=req.body;
    let params = {};
    if(typeof subject != undefined)
    {
      params.subject = subject
    }
    if(typeof message != undefined)
    {
      params.message = message
    }
    if(typeof release_time != undefined)
    {
      params.release_time = release_time
    }
    if(typeof active != undefined)
    {
      params.active = active
    }
    return Time_Capsule_Message
        .update(params,{where: { id: req.query.id }})
        .then((response) => res.status(200).send(response))
        .catch((error) => res.status(400).send(error));
  },

}