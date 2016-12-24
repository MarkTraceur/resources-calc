var factories = require( './factories' ),
	resources = require( './resources' ),
	userFactories = require( './userFactories' ),
	userWarehouses = require( './userWarehouses' ),
	prices = require( './prices' ),
	util = require( './util' ),
	Factory = require( './factory' ).Factory,
	Warehouse = require( './warehouse' ).Warehouse,
	deepCopy = util.deepCopy;

function FactoryConfiguration( config, warehouses ) {
	var i, factory, warehouse,
		wkeys = [],
		inOrder = config.inOrder;

	this.inOrder = [];
	this.byName = {};
	this.byProduct = {};

	for ( i = 0; i < config.length; i++ ) {
		factory = new Factory( config[ i ] );
		this.inOrder.push( factory );
		this.byName[ factory.name ] = factory;
		this.byProduct[ factory.produces ] = factory;
	}

	this.warehouses = {};
	this.warehouses.inOrder = [];
	this.warehouses.byName = {};

	for ( i = 0; i < warehouses.length; i++ ) {
		wkeys.push( warehouses[ i ].name );
		warehouse = new Warehouse( warehouses[ i ] );
		this.warehouses.byName[ warehouse.name ] = warehouse;
	}

	wkeys = util.sortResources( wkeys );

	for ( i = 0; i < wkeys.length; i++ ) {
		this.warehouses.inOrder.push( this.warehouses.byName[ wkeys[ i ] ] );
	}

	this.pendingUpgradeCosts = {};
}

FactoryConfiguration.prototype.getFactoriesByUpgradeEfficiency = function ( cb ) {
	var efficiencies = [],
		fc = this,
		fs = this.inOrder;

	function maybeCb() {
		if ( efficiencies.length >= fs.length ) {
			cb( efficiencies.sort( function ( a, b ) {
				return b.efficiency - a.efficiency;
			} ) );
		}
	}

	for ( i = 0; i < fs.length; i++ ) {
		( function ( fac ) {
			fac.getUpgradeEfficiency( function ( price, profit ) {
				var i, efficiency, currentCost, wh, whkeys,
					whupgrades = {},
					upgrade = deepCopy( fac.upgrade ),
					ukeys = Object.keys( upgrade );

				for ( i = 0; i < ukeys.length; i++ ) {
					if ( ukeys[ i ] === 'Credits' ) {
						continue;
					}

					wh = fc.warehouses.byName[ ukeys[ i ] ];
					fc.pendingUpgradeCosts[ ukeys[ i ] ] = fc.pendingUpgradeCosts[ ukeys[ i ] ] || 0;
					currentCost = fc.pendingUpgradeCosts[ ukeys[ i ] ];

					while ( currentCost + upgrade[ ukeys[ i ] ] > wh.capacity ) {
						price += wh.upgrade;
						wh.setLevel( wh.level + 1 );
						whupgrades[ ukeys[ i ] ] = wh.level;
					}
				}

				whkeys = Object.keys( whupgrades );

				for ( i = 0; i < whkeys.length; i++ ) {
					fc.warehouses.byName[ whkeys[ i ] ].setLevel(
						fc.warehouses.byName[ whkeys[ i ] ].level - whupgrades[ whkeys[ i ] ]
					);
				}

				efficiency = profit / price;

				efficiencies.push( { name: fac.name, efficiency: efficiency, price: price, resources: deepCopy( fac.upgrade ), profit: profit, warehouseUpgrades: whupgrades } );
				maybeCb();
			} );
		}( fs[ i ] ) );
	}
};

FactoryConfiguration.prototype.getFiveDays = function () {
	var i, j, fs, keys, cfd, key, consume,
		totals = {},
		fs = this.inOrder;

	for ( i = 0; i < fs.length; i++ ) {
		cfd = fs[i].consumesFiveDays;
		keys = Object.keys( cfd );

		for ( j = 0; j < keys.length; j++ ) {
			key = keys[j];
			consume = cfd[key];

			if ( totals[key] === undefined ) {
				totals[key] = 0;
			}

			totals[key] += consume;
		}
	}

	return totals;
};

FactoryConfiguration.prototype.getNextEfficient = function ( cb ) {
	var fc = this;

	this.getFactoriesByUpgradeEfficiency( function ( eff ) {
		var i,
			upg = eff[ 0 ],
			whupgrades = upg.warehouseUpgrades,
			whkeys = Object.keys( whupgrades ),
			name = upg.name,
			fac = fc.byName[ name ];

		fac.setLevel( fac.level + 1 );

		for ( i = 0; i < whkeys.length; i++ ) {
			fc.warehouses.byName[ whkeys[ i ] ].setLevel(
				fc.warehouses.byName[ whkeys[ i ] ].level + whupgrades[ whkeys[ i ] ]
			);
		}

		cb( {
			name: name,
			level: fac.level,
			price: upg.price,
			resources: upg.resources,
			warehouseUpgrades: upg.warehouseUpgrades
		} );
	} );
};

FactoryConfiguration.prototype.getTenNextEfficientInternal = function ( upgrades, cb ) {
	var fc = this;

	this.pendingUpgradeCosts = this.getFiveDays();

	this.getNextEfficient( function ( upgrade ) {
		var i,
			us = upgrade.resources,
			ukeys = Object.keys( us );

		for ( i = 0; i < ukeys.length; i++ ) {
			fc.pendingUpgradeCosts[ ukeys[ i ] ] = fc.pendingUpgradeCosts[ ukeys[ i ] ] || 0;
			fc.pendingUpgradeCosts[ ukeys[ i ] ] += us[ ukeys[ i ] ];
		}

		upgrades.push( upgrade );

		if ( upgrades.length >= 10 ) {
			fc.pendingUpgradeCosts = {};
			cb( upgrades );
			return;
		}

		fc.getTenNextEfficientInternal( upgrades, cb );
	} );
};

FactoryConfiguration.prototype.getTenNextEfficient = function ( cb ) {
	this.getTenNextEfficientInternal( [], cb );
};


function getNull() {
	return new FactoryConfiguration( deepCopy( factories.data ) );
}

function getCurrentUser() {
	return userFactories.getFactoryLevels().then( function ( levels ) {
		return userWarehouses.getWarehouseLevels().then( function ( whlevels ) {
			return new FactoryConfiguration( deepCopy( levels ), deepCopy( whlevels ) );
		} );
	} );
}

module.exports = {
	getNull: getNull,
	getCurrentUser: getCurrentUser
};
