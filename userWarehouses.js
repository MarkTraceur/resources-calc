var level = require( './level' );

function getWarehouseLevels() {
	return level.getWarehouseLevels();
}

module.exports = {
	getWarehouseLevels: getWarehouseLevels
};
