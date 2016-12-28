var Sequelize = require( 'sequelize' ),
	config = require( './config.json' ),
	sequelize = new Sequelize( config.db.name, config.db.user, config.db.pass, {
		logging: false,
		host: config.db.host
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
