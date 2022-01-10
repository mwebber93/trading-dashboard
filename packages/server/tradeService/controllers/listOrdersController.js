const listOrdersController = (req, res, data) => {
	const outstandingOrders = data.traderInfo.orders.filter((order) => !order.triggered);
	return res.jsonp(outstandingOrders);
};

module.exports = listOrdersController;
