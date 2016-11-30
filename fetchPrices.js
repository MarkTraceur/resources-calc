var child_process = require( 'child_process' ),
	jsonfile = require( 'jsonfile' ),

	prices = require( './prices' ),

	Price = prices.Price;

Price.sync().then( function () {
	var proc;

	// Fetch prices from API
	console.log( 'synced, requesting' );
	child_process.exec( './fetchPrices.sh', function () {
		// Open file with prices
		jsonfile.readFile( 'latest-prices.json', function ( err, prices ) {
			var i, price, entry;

			if ( err ) {
				console.log( err );
				return;
			}

			for ( i = 0; i < prices.length; i++ ) {
				price = prices[ i ];

				entry = {
					resourceName: price.NAME_EN,
					timestamp: new Date( parseInt( price.TS + '000', 10 ) ),
					highBid: parseInt( price.SMKURS, 10 ),
					marketPrice: parseInt( price.NORMKURS, 10 )
				};

				if ( entry.highBid === 0 ) {
					entry.highBid = price.NORMKURS;
				}

				Price.create( entry );
			}
		} );
	} );
} );
