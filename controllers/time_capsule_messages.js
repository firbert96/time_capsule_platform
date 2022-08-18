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

module.exports = {
  async listAll(req,res)
  {
    const params = {
      order:[['release_time','asc']],
      where:{
              active:true,
              release_time:{[Op.gte]: moment().toDate()}
            },
      include:'users'
    }
    try{
      const data = await Time_Capsule_Message.findAll(params);
      return res.status(200).send(data);
    }
    catch(error){
      return res.status(422).send(error)
    }
  },

  async list(req, res) {
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

    try{
      const data = await Time_Capsule_Message.findAll(params);
      return res.status(200).send(data);
    }
    catch(error){
      return res.status(422).send(error);
    }
  },

  async add(req, res) {
    const {subject,message,release_time}=req.body;
    const params = {
      id:uuidv4(),
      users_id:req.headers.authorization,
      subject: subject,
      message: message,
      release_time: release_time
    }

    try{
      const create = await Time_Capsule_Message.create(params);
      return res.status(201).send(create)
    }
    catch(error){
      return res.status(422).send(error)
    }
  },

  async update(req, res) {
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
      params.release_time = release_time;
    }
    if(typeof active != undefined)
    {
      params.active = active
    }
    try{
      await Time_Capsule_Message.update(params,{where: { id: req.query.id }});
      return res.status(200).send('Success Update Time Capsule Message');
    }
    catch(error){
      return res.status(422).send(error);
    }
  },

  async addOrUpdateAttachment(req, res){
    try {
      const encoded = req.file.buffer.toString('base64');
      const img = imageKit.upload({
        file: encoded,
        fileName: `IMG-${Date.now()}`
      });
      const params = { attachment:img.url };
      await Time_Capsule_Message.update(params,{where: { id: req.query.id }});
      return res.status(200).send('Success Update Attachment Time Capsule Message');
    }
    catch (error) {
      return res.status(422).send(error);
    }
  },

}