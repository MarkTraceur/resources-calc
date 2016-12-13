function Warehouse( config ) {
	this.name = config.name;
	this.setLevel( config.level || 0 );
}

Warehouse.prototype.setLevel = function ( level ) {
	this.level = level;
	this.capacity = 5000 * Math.pow( level, 2 );
	this.upgrade = 1250000 * Math.pow( level, 2 );
};

module.exports = {
	Warehouse: Warehouse
};
