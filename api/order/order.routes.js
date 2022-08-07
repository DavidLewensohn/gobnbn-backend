const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
//const {log} = require('../../middlewares/logger.middleware')
//const {addOrder, getOrders, deleteOrder, getOrderById, updateOrder} = require('./order.controller')
const {addOrder, getOrders } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
//router.get('/host', requireAuth, getGuestOrders)
//router.get('/guest', requireAuth, getHostOrders)

router.post('/', requireAuth, addOrder)
//router.delete('/:id', requireAuth, deleteOrder)
//router.get('/:id', getOrderById)
//router.put('/:id', updateOrder)



// router.get('/', log, getOrders)
// router.post('/',  log, requireAuth, addOrder)
// router.delete('/:id',  requireAuth, deleteOrder)

module.exports = router
