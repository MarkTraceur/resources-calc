var Sequelize = require( 'sequelize' ),
	sequelize = new Sequelize( 'resourceprices', 'root', 'trustno1', {
		logging: false,
		host: 'localhost'
	} ),

	Price = sequelize.define( 'price', {
		resourceName: {
			type: Sequelize.STRING
		},

		timestamp: {
			type: Sequelize.DATE
		},

		highBid: {
			type: Sequelize.INTEGER
		},

		marketPrice: {
			type: Sequelize.INTEGER
		}
	} );

function getAveragePrice( resource ) {
	return Price.sync().then( function () {
		return Price.findAll( {
			attributes: [
				'resourceName',
				[ sequelize.fn( 'AVG', sequelize.col( 'highBid' ) ), 'averageHighBid' ]
			],
			where: {
				resourceName: resource
			}
		} ).then( function ( prices ) {
			return prices[ 0 ];
		} );
	} );
}

module.exports = {
	Price: Price,
	getAveragePrice: getAveragePrice
};
