const moment = require('moment');
const Validator = require('jsonschema').Validator;
const validator = new Validator();

const { roundTo2DP } = require('../../helpers');

const orderSchema = {
	id: '/order',
	type: 'object',
	properties: {
		type: { type: 'string' },
		quantity: { type: 'number' },
		price: { type: 'number' },
	},
	required: ['type', 'quantity', 'price'],
};

const createNewOrderController = (req, res, data) => {
	try {
		const { errors } = validator.validate(req.body, orderSchema);
		if (errors.length > 0) {
			res.status(400).jsonp({ message: errors[0].message });
		} else {
			const { type, quantity, price } = req.body;

			data.traderInfo.orders.push({
				type,
				quantity,
				price,
				triggered: false,
				succeeded: false,
				timestamp: moment().set({ milliseconds: 0, seconds: 0 }).valueOf(),
			});

			return res.status(200).jsonp({ message: 'OK' });
		}
	} catch (error) {
		console.error('internal server error', error);
		res.status(500).send();
	}
};

module.exports = createNewOrderController;
