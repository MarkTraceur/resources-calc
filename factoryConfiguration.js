var factories = require( './factories' ),
	userFactories = require( './userFactories' ),
	userWarehouses = require( './userWarehouses' ),
	prices = require( './prices' ),
	util = require( './util' ),
	Factory = require( './factory' ).Factory,
	Warehouse = require( './warehouse' ).Warehouse,
	deepCopy = util.deepCopy;

function FactoryConfiguration( config, warehouses ) {
	var i, factory, warehouse,
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
		warehouse = new Warehouse( warehouses[ i ] );
		this.warehouses.inOrder.push( warehouse );
		this.warehouses.byName[ warehouse.name ] = warehouse;
	}
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
			var wh = fc.warehouses.byName[ fac.produces ];

			fac.getUpgradeEfficiency( function ( efficiency, price ) {
				efficiencies.push( { name: fac.name, efficiency: efficiency, price: price, resources: deepCopy( fac.upgrade ) } );
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

function getNull() {
	return new FactoryConfiguration( deepCopy( factories.data ) );
}

function getCurrentUser() {
	return userFactories.getFactoryLevels().then( function ( levels ) {
		return new FactoryConfiguration( deepCopy( levels ), deepCopy( userWarehouses.data ) );
	} );
}

module.exports = {
	getNull: getNull,
	getCurrentUser: getCurrentUser
};
