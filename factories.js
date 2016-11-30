var factories = {
	inOrder: [
		{
			name: "Brick factory",
			produces: "Bricks",
			rate: 800,
			denom: 2,
			consumes: {
				"Clay": 3,
				"Credits": 10
			},
			upgrade: {
				"Clay": 200,
				"Credits": 500000
			}
		},

		{
			name: "Concrete factory",
			produces: "Concrete",
			rate: 2100,
			denom: 14,
			consumes: {
				"Credits": 20,
				"Gravel": 3,
				"Limestone": 2
			},
			upgrade: {
				"Credits": 2000000,
				"Bricks": 1000,
				"Clay": 1000,
				"Limestone": 500
			}
		},

		{
			name: "Fertilizer factory",
			produces: "Fertilizer",
			rate: 1210,
			denom: 11,
			consumes: {
				"Credits": 90,
				"Limestone": 8
			},
			upgrade: {
				"Credits": 4000000,
				"Concrete": 5000,
				"Bricks": 2500,
				"Limestone": 500
			}
		},

		{
			name: "Ironworks",
			produces: "Steel",
			rate: 450,
			denom: 1,
			consumes: {
				"Credits": 350,
				"Iron ore": 7,
				"Coal": 10
			},
			upgrade: {
				"Credits": 10000000,
				"Concrete": 9000,
				"Bricks": 500,
				"Limestone": 3000
			}
		},

		{
			name: "Oil refinery",
			produces: "Fossil fuel",
			rate: 640,
			denom: 4,
			consumes: {
				"Credits": 150,
				"Crude oil": 4
			},
			upgrade: {
				"Credits": 20000000,
				"Concrete": 16000,
				"Steel": 500,
				"Gravel": 500
			}
		},

		{
			name: "Glazier's workshop",
			produces: "Glass",
			rate: 640,
			denom: 8,
			consumes: {
				"Credits": 3000,
				"Quartz sand": 6,
				"Fossil fuel": 8,
				"Limestone": 4
			},
			upgrade: {
				"Credits": 20000000,
				"Concrete": 25000,
				"Bricks": 3000,
				"Limestone": 150
			}
		},

		{
			name: "Copper refinery",
			produces: "Copper",
			rate: 270,
			denom: 3,
			consumes: {
				"Credits": 2500,
				"Chalcopyrite": 9
			},
			upgrade: {
				"Credits": 40000000,
				"Concrete": 25000,
				"Steel": 1000,
				"Glass": 500
			}
		},

		{
			name: "Insecticide factory",
			produces: "Insecticides",
			rate: 3500,
			denom: 35,
			consumes: {
				"Credits": 2400,
				"Copper": 1,
				"Limestone": 3
			},
			upgrade: {
				"Credits": 30000000,
				"Concrete": 25000,
				"Steel": 2000,
				"Copper": 500
			}
		},

		{
			name: "Aluminium factory",
			produces: "Aluminium",
			rate: 320,
			denom: 4,
			consumes: {
				"Credits": 5000,
				"Bauxite": 24
			},
			upgrade: {
				"Credits": 40000000,
				"Concrete": 25000,
				"Steel": 2500,
				"Glass": 1500
			}
		},

		{
			name: "Plastic factory",
			produces: "Plastics",
			rate: 10,
			denom: 1,
			consumes: {
				"Credits": 400,
				"Crude oil": 1
			},
			upgrade: {
				"Credits": 50000000,
				"Concrete": 16000,
				"Steel": 1000,
				"Aluminium": 500
			}
		},

		{
			name: "Lithium refinery",
			produces: "Lithium",
			rate: 750,
			denom: 5,
			consumes: {
				"Credits": 5000,
				"Lithium ore": 115
			},
			upgrade: {
				"Credits": 60000000,
				"Concrete": 25000,
				"Steel": 10000,
				"Glass": 1000
			}
		},

		{
			name: "Battery factory",
			produces: "Batteries",
			rate: 600,
			denom: 10,
			consumes: {
				"Credits": 75000,
				"Lithium": 20,
				"Plastics": 40,
				"Aluminium": 10
			},
			upgrade: {
				"Credits": 100000000,
				"Concrete": 20000,
				"Aluminium": 10000,
				"Glass": 6000
			}
		},

		{
			name: "Arms factory",
			produces: "Weapons",
			rate: 125,
			denom: 25,
			consumes: {
				"Credits": 250000,
				"Steel": 1,
				"Aluminium": 1,
				"Batteries": 1
			},
			upgrade: {
				"Credits": 200000000,
				"Bricks": 500000,
				"Concrete": 50000,
				"Glass": 10000
			}
		},

		{
			name: "Silicon refinery",
			produces: "Silicon",
			rate: 120,
			denom: 2,
			consumes: {
				"Credits": 49500,
				"Quartz sand": 20,
				"Clay": 1,
				"Fossil fuel": 5
			},
			upgrade: {
				"Credits": 220000000,
				"Concrete": 20000,
				"Steel": 1200,
				"Glass": 1500
			}
		},

		{
			name: "Electronics factory",
			produces: "Electronics",
			rate: 480,
			denom: 8,
			consumes: {
				"Credits": 5000,
				"Plastics": 4,
				"Copper": 3,
				"Silicon": 1
			},
			upgrade: {
				"Credits": 300000000,
				"Concrete": 20000,
				"Aluminium": 1000,
				"Glass": 8000
			}
		},

		{
			name: "Titanium refinery",
			produces: "Titanium",
			rate: 320,
			denom: 4,
			consumes: {
				"Credits": 10000,
				"Ilmenite": 8
			},
			upgrade: {
				"Credits": 350000000,
				"Concrete": 9000,
				"Steel": 500,
				"Glass": 3000
			}
		},

		{
			name: "Medical technology Inc.",
			produces: "Medical technology",
			rate: 400,
			denom: 10,
			consumes: {
				"Credits": 90000,
				"Titanium": 4,
				"Plastics": 2,
				"Electronics": 2
			},
			upgrade: {
				"Credits": 500000000,
				"Concrete": 40000,
				"Steel": 9500,
				"Plastics": 16000
			}
		},

		{
			name: "Silver refinery",
			produces: "Silver",
			rate: 3000,
			denom: 50,
			consumes: {
				"Credits": 10000,
				"Silver ore": 8
			},
			upgrade: {
				"Credits": 750000000,
				"Concrete": 35000,
				"Steel": 15000,
				"Glass": 1500
			}
		},

		{
			name: "Gold refinery",
			produces: "Gold",
			rate: 240,
			denom: 3,
			consumes: {
				"Credits": 20000,
				"Gold ore": 20
			},
			upgrade: {
				"Credits": 1000000000,
				"Concrete": 20000,
				"Steel": 20000,
				"Glass": 20000
			}
		},

		{
			name: "Goldsmith",
			produces: "Jewellery",
			rate: 100,
			denom: 2,
			consumes: {
				"Credits": 50000,
				"Rough diamonds": 1000,
				"Gold": 1,
				"Silver": 1
			},
			upgrade: {
				"Credits": 500000000,
				"Concrete": 20000,
				"Bricks": 90000,
				"Glass": 20000
			}
		},

		{
			name: "Drone shipyard",
			produces: "Scan drones",
			rate: 1,
			denom: 1,
			consumes: {
				"Credits": 25000000,
				"Electronics": 25,
				"Titanium": 50,
				"Batteries": 250
			},
			upgrade: {
				"Credits": 2000000000,
				"Concrete": 16000,
				"Plastics": 120000,
				"Glass": 40000
			}
		},

		{
			name: "Truck plant",
			produces: "Trucks",
			rate: 100,
			denom: 50,
			consumes: {
				"Credits": 2500000,
				"Steel": 100,
				"Batteries": 25,
				"Silver": 50
			},
			upgrade: {
				"Credits": 2000000000,
				"Bricks": 500000,
				"Electronics": 90000,
				"Silver": 50000
			}
		}
	]
};

( function () {
	var i, factory,
		factoryList = factories.inOrder;

	factories.byName = {};
	factories.byProduct = {};

	for ( i = 0; i < factoryList.length; i++ ) {
		factory = factoryList[ i ];
		factories.byName[ factory.name ] = factory;
		factories.byProduct[ factory.produces ] = factory;
	}
}() );

module.exports = {
	data: factories
};
