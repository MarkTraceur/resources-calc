var i, resource, amount,
	resources = require( './resources' ),
	fc = require( './factoryConfiguration' ),
	fd = fc.getFiveDays(),
	keys = Object.keys( fd );

keys = keys.sort( function ( a, b ) {
	return resources.inMarketOrder.indexOf( a ) - resources.inMarketOrder.indexOf( b );
} );

for ( i = 0; i < keys.length; i++ ) {
	resource = keys[ i ];
	amount = fd[ resource ];

	console.log( resource + ': ' + amount );
}
