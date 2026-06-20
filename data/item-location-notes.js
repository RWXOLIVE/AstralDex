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
		location: 'Petalburg City Gym',
		kind: 'Gift',
		item: 'Ability Capsule',
		quantity: 2,
		note: 'Requires to do Norman Double'
	},
	{
		location: 'Petalburg City Gym',
		kind: 'Gift',
		item: 'Chilan Berry',
		quantity: 1,
		note: 'Requires to do Norman Double'
	},
	{
		location: 'Petalburg City Gym',
		kind: 'Gift',
		item: 'Sitrus Berry',
		quantity: 30,
		note: 'Requires to do Norman Double'
	},
	{
		location: 'Petalburg City Gym',
		kind: 'Gift',
		item: 'TM Facade',
		quantity: 2,
		note: 'Requires to do Norman Double'
	},
	{
		location: 'Petalburg City Gym',
		kind: 'Gift',
		item: 'TM Hyper Voice',
		quantity: 1,
		note: 'Requires to do Norman Double'
	}

	// Example item-specific note:
	// ,{
	// 	location: 'Route 103',
	// 	item: 'Potion',
	// 	note: 'Hidden behind the tree'
	// }
];
