var util = require( './util' ),
	fc = require( './factoryConfiguration' ),
	resources = require( './resources' ),
	facpromise = fc.getCurrentUser(),
	upgrades = [];

function getNextEfficient( cb ) {
	facpromise.then( function ( facs ) {
		facs.getFactoriesByUpgradeEfficiency( function ( eff ) {
			var upg = eff[ 0 ],
				name = upg.name,
				fac = facs.byName[ name ];
			upgrades.push( { name: name, level: fac.level + 1, price: upg.price, resources: upg.resources } );
			fac.setLevel( fac.level + 1 );

			if ( upgrades.length >= 10 ) {
				cb( upgrades );
				return;
			}

			getNextEfficient( cb );
		} );
	} );
}

getNextEfficient( function ( upgrades ) {
	facpromise.then( function ( facs ) {
		var i, j, upg, ukey, ckey, consumeFiveDays, ckeys, ukeys,
			upgradeConsume = {},
			totalprice = 0;

		for ( i = 0; i < upgrades.length; i++ ) {
			upg = upgrades[ i ];
			totalprice += upg.price;

			console.log( upg.name + ' to level ' + upg.level + ' - costs ' + util.formatNum( upg.price ) );

			ukeys = Object.keys( upg.resources );

			for ( j = 0; j < ukeys.length; j++ ) {
				ukey = ukeys[ j ];

				if ( upgradeConsume[ ukey ] === undefined ) {
					upgradeConsume[ ukey ] = 0;
				}

				upgradeConsume[ ukey ] += upg.resources[ ukey ];
			}
		}

		console.log( 'Total price: ', util.formatNum( totalprice ) );

		consumeFiveDays = facs.getFiveDays();

		ukeys = Object.keys( upgradeConsume );

		for ( i = 0; i < ukeys.length; i++ ) {
			ukey = ukeys[ i ];

			if ( consumeFiveDays[ ukey ] === undefined ) {
				consumeFiveDays[ ukey ] = 0;
			}

			consumeFiveDays[ ukey ] += upgradeConsume[ ukey ];
		}

		ckeys = Object.keys( consumeFiveDays );

		ckeys = util.sortResources( ckeys );

		console.log( '=== RESOURCES NEEDED ===' );
		for ( i = 0; i < ckeys.length; i++ ) {
			ckey = ckeys[ i ];
			console.log( ckey + ': ' + util.formatNum( consumeFiveDays[ ckey ] ) );
		}
	} );
} );
