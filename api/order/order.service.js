const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const fs = require('fs')

async function query(filterBy = {}, loggedinUser) {
	try {
		const criteria = _buildCriteria(filterBy, loggedinUser)
		const collection = await dbService.getCollection('order')
		const orders = await collection.find(criteria).toArray()
		console.log('orders:', orders.length)

		return orders

	} catch (err) {
		logger.error('cannot find orders', err)
		throw err
	}
}

async function add(order) {
	try {
		const collection = await dbService.getCollection('order')
		const addedOrder = await collection.insertOne(order)
		return order
	} catch (err) {
		logger.error('cannot insert order', err)
		throw err
	}
}

function _buildCriteria(filterBy, loggedinUser) {
	console.log('filterBy:', filterBy)
	var criteria = {}
	//var userId = loggedinUser.appId

	if (filterBy.type === "trips") {
		console.log("Filter by trip")
		criteria = { 'mainGuest.guestId': Number(filterBy.userId) }
	}

	if (filterBy.type === "orders") {
		console.log("Filter by orders")
		criteria.hostId = Number(filterBy.userId)
	}

	console.log("criteria: ", criteria)
	return criteria
}

module.exports = {
	query,
	remove,
	add,
	update,
	getById,
}


async function remove(orderId) {
	try {
		const collection = await dbService.getCollection('order')
		const criteria = {_id: ObjectId(orderId)}
		const {deletedCount} = await collection.deleteOne(criteria)
		//console.log('dbug: orderId.ser:', deletedCount)
		return deletedCount
	} catch (err) {
		logger.error(`cannot remove order ${orderId}`, err)
		throw err
	}
}

async function getById(orderId) {
	try {
		const collection = await dbService.getCollection('order')
		const order = collection.findOne({_id: ObjectId(orderId)})
		return order
	} catch (err) {
		logger.error(`while finding order ${orderId}`, err)
		throw err
	}
}

async function update(order) {
	try {
		var id = ObjectId(order._id)
		delete order._id
		const collection = await dbService.getCollection('order')
		await collection.updateOne({_id: id}, {$set: {...order}})
		order._id = id
		return order
	} catch (err) {
		logger.error(`cannot update order ${orderId}`, err)
		throw err
	}
}

//_saveOrders()
async function _saveOrders() {
	var orders = require('../../services/order.json')
	console.log('orders:', orders)

	try {
		const collection = await dbService.getCollection('order')
		orders.forEach((order) => {
			console.log('order:', order)
			// order._id = ObjectId(order._id)
			add(order)
		})
	} catch (err) {
		logger.error('cannot insert orders', err)
		throw err
	}
}
