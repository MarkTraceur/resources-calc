function formatNum( num ) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function deepCopy( obj ) {
	return JSON.parse( JSON.stringify( obj ) );
}

module.exports = {
	formatNum: formatNum,
	deepCopy: deepCopy
};
