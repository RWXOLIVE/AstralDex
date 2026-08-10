exports.BattleItemLocationNotes = [
	// Add one object per note rule.
	// A rule matches an entry when every field you provide matches.
	//
	// Supported match fields:
	// - locationId: generated location id, for example 'oldaletownmart'
	// - location: visible location header, for example 'Oldale Town Mart'
	// - kind: 'Mart', 'Field', 'Hidden', 'Berry Tree', 'Delivery', etc.
	// - itemConst: exact item constant, for example 'ITEM_ANTIDOTE'
	// - item: visible item name, for example 'Antidote'
	// - itemId: dex item id, for example 'antidote'
	// - quantity or quantityText: optional extra filter when needed
	//
	// Note behavior:
	// - note: text shown inside brackets
	// - noteMode: 'append' (default) or 'replace'
	//
	// This sample targets every mart entry in Oldale Town Mart.
	// It matches the current built-in requirement, so it is safe to keep or delete.
	{
		location: 'Oldale Town Mart',
		kind: 'Mart',
		note: 'Defeat Rival'
	},
	{
		location: 'Fallarbor Town Cozmos House',
		kind: 'Gift',
		item: 'TM Return',
		note: 'Requires returning the Meteorite to Cozmo'
	},
	{
		location: 'Fallarbor Town Cozmos House',
		kind: 'Gift',
		item: 'TM Frustration',
		note: 'Requires returning the Meteorite to Cozmo'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Fire Stone',
		note: 'Requires 2nd Badge'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Ice Stone',
		note: 'Requires 2nd Badge'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Leaf Stone',
		note: 'Requires 2nd Badge'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Moon Stone',
		note: 'Requires 2nd Badge'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Shiny Stone',
		note: 'Requires 2nd Badge'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Sun Stone',
		note: 'Requires 2nd Badge'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Thunder Stone',
		note: 'Requires 2nd Badge'
	},
	{
		location: 'Petalburg City Mart',
		kind: 'Mart',
		item: 'Water Stone',
		note: 'Requires 2nd Badge'
	}

	// Example item-specific note:
	// ,{
	// 	location: 'Route 103',
	// 	item: 'Potion',
	// 	note: 'Hidden behind the tree'
	// }
];
