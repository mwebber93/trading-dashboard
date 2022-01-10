const moment = require('moment');
const Validator = require('jsonschema').Validator;
const validator = new Validator();

const orderSchema = {
	id: '/order',
	type: 'object',
	properties: {
		type: { type: 'string' },
		amount: { type: 'number' },
		price: { type: 'number' },
	},
	required: ['type', 'amount', 'price'],
};

const createNewOrderController = (req, res, data) => {
	try {
		const { errors } = validator.validate(req.body, orderSchema);
		if (errors.length > 0) {
			res.status(400).jsonp(errors[0].message);
		} else {
			const { type, quantity, price } = req.body;
			data.traderInfo.orders.push({
				type,
				quantity,
				price,
				executed: false,
				timestamp: moment().set({ milliseconds: 0, seconds: 0 }).valueOf(),
			});

			res.status(200).jsonp({ message: 'OK' });
		}
	} catch (e) {
		console.error('internal server error');
		res.status(500).send();
	}
};

module.exports = createNewOrderController;
