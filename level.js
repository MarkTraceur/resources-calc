var Sequelize = require( 'sequelize' ),
	config = require( './config.json' ),
	sequelize = new Sequelize( config.db.name, config.db.user, config.db.pass, {
		logging: false,
		host: config.db.host
	} ),

	WarehouseLevel = sequelize.define( 'warehouselevel', {
		name: {
			type: Sequelize.STRING,
			unique: true
		},

		level: {
			type: Sequelize.INTEGER
		}
	} ),

	FactoryLevel = sequelize.define( 'factorylevel', {
		name: {
			type: Sequelize.STRING,
			unique: true
		},

		level: {
			type: Sequelize.INTEGER
		}
	} );

function saveFactoryLevel( name, level ) {
	return FactoryLevel.sync().then( function () {
		return FactoryLevel.upsert( { name: name, level: level } );
	} );
}

function getFactoryLevels() {
	return FactoryLevel.sync().then( function () {
		return FactoryLevel.findAll();
	} );
}

function saveWarehouseLevel( name, level ) {
	return WarehouseLevel.sync().then( function () {
		return WarehouseLevel.upsert( { name: name, level: level } );
	} );
}

function getWarehouseLevels() {
	return WarehouseLevel.sync().then( function () {
		return WarehouseLevel.findAll();
	} );
}

module.exports = {
	WarehouseLevel: WarehouseLevel,
	FactoryLevel: FactoryLevel,
	saveFactoryLevel: saveFactoryLevel,
	getFactoryLevels: getFactoryLevels,
	saveWarehouseLevel: saveWarehouseLevel,
	getWarehouseLevels: getWarehouseLevels
};
