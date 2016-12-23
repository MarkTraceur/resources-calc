var Sequelize = require( 'sequelize' ),
	sequelize = new Sequelize( 'resourcelevels', 'root', 'trustno1', {
		logging: false,
		host: 'localhost'
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

module.exports = {
	WarehouseLevel: WarehouseLevel,
	FactoryLevel: FactoryLevel,
	saveFactoryLevel: saveFactoryLevel,
	getFactoryLevels: getFactoryLevels
};
