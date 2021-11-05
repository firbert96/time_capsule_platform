const ImageKit = require('imagekit')
const Time_Capsule_Message = require('../models').time_capsule_messages;
const { 
  v4: uuidv4,
} = require('uuid');
const moment = require('moment')
const { Op } = require('sequelize')

const imageKit = new ImageKit({
  publicKey:process.env.PUBLIC_KEY_IMAGEKIT,
  privateKey:process.env.PRIVATE_KEY_IMAGEKIT,
  urlEndpoint:process.env.URL_ENDPOINT_IMAGEKIT
})
const env = process.env.NODE_ENV 

module.exports = {
  listAll(req,res)
  {
    let params = {
      order:[['release_time','asc']],
      where:{
              active:true,
              release_time:{[Op.gte]: moment().toDate()}
            },
      include:'users'
    }
    console.log(moment().toDate())
    return Time_Capsule_Message
      .findAll(params)
      .then((response) => res.status(200).send(response))
      .catch((error) => { res.status(400).send(error); });
  },

  list(req, res) {
    const {filter_fields,filter_data,sort_fields,sort_order}=req.query;
    let params = {}
    
    if(typeof filter_fields != undefined && typeof filter_data != undefined && filter_fields != '' && filter_data != '')
    {
      params.where= {[filter_fields] :  filter_data}
    }

    if(typeof sort_fields != undefined && typeof sort_order != undefined && sort_fields != '' &&  sort_order != '')
    {
      params.order = [[sort_fields,sort_order]]
    }

    params.include = 'users'

    return Time_Capsule_Message
      .findAll(params)
      .then((response) => res.status(200).send(response))
      .catch((error) => { res.status(400).send(error); });
  },

  async add(req, res) {
    if(!req.headers.authorization){
      return res.status(401).send('Unauthorized');
    }
    const {subject,message,release_time}=req.body;
    let params = {
      id:uuidv4(),
      users_id:req.headers.authorization,
      subject: subject,
      message: message,
      release_time: release_time
    }

    if(req.file.fieldname==='attachment' && env!=='test'){
      let attachment = await imageKit.upload({
          file:req.file.buffer.toString('base64'),
          fileName:`IMG-${Date.now()}`
      })
      if (attachment){
          params.attachment=attachment.url;
      }
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
    if(typeof subject != undefined && subject != '')
    {
      params.subject = subject
    }
    if(typeof message != undefined && message != '')
    {
      params.message = message
    }
    if(typeof release_time != undefined && release_time != '')
    {
      params.release_time = moment(release_time).subtract(7, 'hour').toDate();
    }
    if(typeof active != undefined)
    {
      params.active = active
    }
    return Time_Capsule_Message
        .update(params,{where: { id: req.query.id }})
        .then(() => res.status(200).send('Success Update Time Capsule Message'))
        .catch((error) => res.status(400).send(error));
  },

}