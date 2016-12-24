var util = require( './util' ),
	fc = require( './factoryConfiguration' ),
	resources = require( './resources' ),
	facpromise = fc.getCurrentUser(),
	upgrades = [];

facpromise.then( function ( facs ) {
	facs.getTenNextEfficient( function ( upgrades ) {
		var i, j, upg, ukey, ckey, consumeFiveDays, ckeys, ukeys, fukeys,
			whkeys,
			whupgrades = {},
			facupgrades = {},
			upgradeConsume = {},
			totalprice = 0;

		for ( i = 0; i < upgrades.length; i++ ) {
			upg = upgrades[ i ];
			totalprice += upg.price;

			facupgrades[ upg.name ] = upg.level;

			ukeys = Object.keys( upg.resources );

			for ( j = 0; j < ukeys.length; j++ ) {
				ukey = ukeys[ j ];

				if ( upgradeConsume[ ukey ] === undefined ) {
					upgradeConsume[ ukey ] = 0;
				}

				upgradeConsume[ ukey ] += upg.resources[ ukey ];
			}

			whkeys = Object.keys( upg.warehouseUpgrades );

			for ( j = 0; j < whkeys.length; j++ ) {
				whupgrades[ whkeys[ j ] ] = upg.warehouseUpgrades[ whkeys[ j ] ];
			}
		}

		whkeys = Object.keys( whupgrades );

		console.log( '== WAREHOUSE UPGRADES ==' );

		for ( i = 0; i < whkeys.length; i++ ) {
			console.log( whkeys[ i ] + ' to ' + whupgrades[ whkeys[ i ] ] );
		}

		fukeys = Object.keys( facupgrades );

		console.log( '== FACTORY UPGRADES ==' );

		for ( i = 0; i < fukeys.length; i++ ) {
			console.log( fukeys[ i ] + ' to ' + facupgrades[ fukeys[ i ] ] );
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
