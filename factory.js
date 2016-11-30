var factories = require( './factories' ).data,
	prices = require( './prices' );

function Factory( config ) {
	var baseFactory = factories.byName[ config.name ];

	this.name = config.name;
	this.produces = baseFactory.produces;
	this.denom = baseFactory.denom;
	this.baseFactory = baseFactory;
	this.setLevel( config.level || 0 );
}

Factory.prototype.setLevel = function ( level ) {
	var i, ckey, ukey,
		baseFactory = this.baseFactory,
		baseConsumes = baseFactory.consumes,
		ckeys = Object.keys( baseConsumes ),
		baseUpgrade = baseFactory.upgrade,
		ukeys = Object.keys( baseUpgrade );

	this.level = level;
	this.rate = this.baseFactory.rate * level;

	this.consumes = {};
	this.consumesHourly = {};
	this.consumesFiveDays = {};

	for ( i = 0; i < ckeys.length; i++ ) {
		ckey = ckeys[ i ];
		this.consumes[ ckey ] = baseConsumes[ ckey ] * level;
		this.consumesHourly[ ckey ] = this.consumes[ ckey ] * baseFactory.rate / baseFactory.denom;
		this.consumesFiveDays[ ckey ] = this.consumesHourly[ ckey ] * 120;
	}

	this.upgrade = {};
	for ( i = 0; i < ukeys.length; i++ ) {
		ukey = ukeys[ i ];
		this.upgrade[ ukey ] = baseUpgrade[ ukey ] * Math.pow( level + 1, 2 );
	}
};

Factory.prototype.getUpgradePrice = function ( cb ) {
	var i,
		totalprice = 0,
		upgrade = this.upgrade,
		ukeys = Object.keys( upgrade ),
		needed = ukeys.length;

	for ( i = 0; i < ukeys.length; i++ ) {
		( function ( ukey ) {
			if ( ukey === 'Credits' ) {
				needed--;
				totalprice += upgrade[ ukey ];
			} else {
				prices.getAveragePrice( ukey ).then( function ( result ) {
					var price = result.dataValues.averageHighBid;
					totalprice += price * upgrade[ ukey ];
					if ( --needed <= 0 ) {
						cb( totalprice );
					}
				} );
			}
		}( ukeys[ i ] ) );
	}
};

Factory.prototype.getProfit = function ( cb ) {
	var i,
		totalrevenue = 0,
		totalcost = 0,
		factory = this,
		consumes = factory.consumesHourly,
		ckeys = Object.keys( consumes ),
		needed = 1 + ckeys.length;

	prices.getAveragePrice( factory.produces ).then( function ( result ) {
		var price = result.dataValues.averageHighBid;
		totalrevenue += factory.rate * price;

		if ( --needed <= 0 ) {
			cb( totalrevenue - totalcost );
		}
	} );

	for ( i = 0; i < ckeys.length; i++ ) {
		( function ( ckey ) {
			if ( ckey === 'Credits' ) {
				totalcost += consumes[ ckey ];
				needed--;
			} else {
				prices.getAveragePrice( ckey ).then( function ( result ) {
					var price = result.dataValues.averageHighBid;
					totalcost += consumes[ ckey ] * price;

					if ( --needed <= 0 ) {
						cb( totalrevenue - totalcost );
					}
				} );
			}
		}( ckeys[ i ] ) );
	}
};

Factory.prototype.getUpgradeProfitIncrease = function ( cb ) {
	var factory = this;

	this.getProfit( function ( profit ) {
		var oldLevel = factory.level;
		factory.setLevel( oldLevel + 1 );
		factory.getProfit( function ( newProfit ) {
			factory.setLevel( oldLevel );
			cb( newProfit - profit );
		} );
	} );
};

Factory.prototype.getUpgradeEfficiency = function ( cb ) {
	var profitIncrease, upgradePrice;

	function maybeCb() {
		if ( profitIncrease !== undefined && upgradePrice !== undefined ) {
			cb( profitIncrease / upgradePrice, upgradePrice );
		}
	}

	this.getUpgradeProfitIncrease( function ( increase ) {
		profitIncrease = increase;
		maybeCb();
	} );

	this.getUpgradePrice( function ( price ) {
		upgradePrice = price;
		maybeCb();
	} );
};

module.exports = {
	Factory: Factory
};
