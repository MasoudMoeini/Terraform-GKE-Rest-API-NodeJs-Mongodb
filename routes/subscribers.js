const express = require('express')
const Joi = require('@hapi/joi')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const { append } = require('@hapi/joi/lib/types/object')


// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
  
})

// Creating one
router.post('/', async (req, res) => {
  // check the vlidation of req
/*   const schema = Joi.object({
    name: Joi.string().min(3).required(),
    subscribedToChannel: Joi.string().min(5).required(),
  });
  const validation = Joi.validate(req.body,schema);
  if(validation.error){
    res.status(400).send(validation.error.details[0].message);
    return;
  } */
  // end of validation check
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  // check the vlidation of req
  /* const schema = {
    name: Joi.string().min(3).required(),
    subscribedToChannel: Joi.string().min(5).required()
  }
  const validation = Joi.validate(req.body,schema);
  if(validation.error){
    res.status(400).send(validation.error.details[0].message);
    return;
  } */
   // end of validation check
  //we dont need this part ***
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  //*** 
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}
module.exports = router

