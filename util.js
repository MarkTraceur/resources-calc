var resources = require( './resources' );

function formatNum( num ) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function deepCopy( obj ) {
	return JSON.parse( JSON.stringify( obj ) );
}

function sortResources( list ) {
	return list.sort( function ( a, b ) {
		var apos = resources.inMarketOrder.indexOf( a ),
			bpos = resources.inMarketOrder.indexOf( b );

		return apos - bpos;
	} );
}

module.exports = {
	formatNum: formatNum,
	deepCopy: deepCopy,
	sortResources: sortResources
};
