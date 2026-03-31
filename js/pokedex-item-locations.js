var ITEM_LOCATION_ORDER = [
	'starterlocation',
	'littleroottown',
	'route101',
	'oldaletown',
	'route103',
	'route102',
	'petalburgcity',
	'petalburggrotto',
	'route104',
	'petalburgwoods',
	'rustborocity',
	'devoncorp',
	'route116',
	'route115',
	'rusturftunnel',
	'unnamedisland',
	'verdanturftown',
	'dewfordtown',
	'dewfordhill',
	'route107',
	'route106',
	'granitecave',
	'route109',
	'slateportcity',
	'route110',
	'route105',
	'route108',
	'abandonedship',
	'route134',
	'starfallcave',
	'daycare',
	'route117',
	'route118',
	'route111',
	'route112',
	'fierypath',
	'route113',
	'fallarbortown',
	'route114',
	'meteorfalls',
	'miragetower',
	'mtchimney',
	'jaggedpass',
	'lavaridgetown',
	'route119',
	'weatherinstitute',
	'fortreecity',
	'route120',
	'scorchedslab',
	'route121',
	'route122',
	'mtpyre',
	'magmahideout',
	'aquahideout',
	'route123',
	'lilycovecity',
	'route124',
	'mossdeepcity',
	'route125',
	'shoalcave',
	'route127',
	'route126',
	'route128',
	'route129',
	'route130',
	'route131',
	'pacifidlogtown',
	'route132',
	'route133',
	'evergrandecity',
	'victoryroad',
	'underwaterroute124',
	'underwaterroute126',
	'underwaterroute127',
	'underwaterroute128'
];

var ITEM_LOCATION_ORDER_INDEX = (function () {
	var index = {};
	for (var i = 0; i < ITEM_LOCATION_ORDER.length; i++) {
		index[ITEM_LOCATION_ORDER[i]] = i;
	}
	return index;
})();

function normalizeItemLocationOrderKey(key) {
	var normalized = toID(key || '');
	if (normalized.indexOf('alteringcave') === 0) {
		return normalized.replace(/^alteringcave/, 'starfallcave');
	}
	if (normalized.indexOf('evergrandecity') === 0) return 'evergrandecity';
	if (normalized.indexOf('scorchedslabs') === 0) return 'scorchedslab';
	return normalized;
}

function getItemOrderedLocationBaseId(locationId, locationName) {
	var normalized = normalizeItemLocationOrderKey(locationName || locationId || '');
	if (/^route\d+$/.test(normalized) || /^underwaterroute\d+$/.test(normalized)) {
		return normalized;
	}
	for (var i = 0; i < ITEM_LOCATION_ORDER.length; i++) {
		var key = ITEM_LOCATION_ORDER[i];
		if (normalized === key || normalized.indexOf(key) === 0) return key;
	}
	return normalized;
}

function sortItemLocationsByPreferredOrder(locations) {
	locations.sort(function (a, b) {
		var aRank = ITEM_LOCATION_ORDER_INDEX.hasOwnProperty(a.baseArea) ? ITEM_LOCATION_ORDER_INDEX[a.baseArea] : 9999;
		var bRank = ITEM_LOCATION_ORDER_INDEX.hasOwnProperty(b.baseArea) ? ITEM_LOCATION_ORDER_INDEX[b.baseArea] : 9999;
		if (aRank !== bRank) return aRank - bRank;
		if (a.baseArea !== b.baseArea) return a.baseArea < b.baseArea ? -1 : 1;
		if (a.name !== b.name) return a.name < b.name ? -1 : 1;
		return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
	});
}

function isIgnoredItemLocationEntry(entry) {
	if (!entry) return true;
	var itemConstId = toID(entry.itemConst || '');
	var itemId = toID(entry.itemId || '');
	var itemNameId = toID(entry.item || '');
	return itemConstId === 'itemtmsalesman' || itemId === 'tmsalesman' || itemNameId === 'tmsalesman';
}

var ITEM_LOCATION_ICON_URL_OVERRIDES = {
	endlesscandy: 'https://raw.githubusercontent.com/msikma/pokesprite/master/sprites/pokemon-gen8/regular/medicine/rare-candy.png',
	hypercandy: 'https://raw.githubusercontent.com/msikma/pokesprite/master/sprites/pokemon-gen8/regular/exp-candy/xl.png',
	infiniterepel: 'https://raw.githubusercontent.com/msikma/pokesprite/master/sprites/pokemon-gen8/regular/other-item/max-repel.png'
};

var MACHINE_TYPE_BADGE_LABELS = {
	normal: 'NO',
	fire: 'FI',
	water: 'WA',
	electric: 'EL',
	grass: 'GR',
	ice: 'IC',
	fighting: 'FG',
	poison: 'PO',
	ground: 'GD',
	flying: 'FL',
	psychic: 'PS',
	bug: 'BG',
	rock: 'RK',
	ghost: 'GH',
	dragon: 'DR',
	dark: 'DK',
	steel: 'ST',
	fairy: 'FA'
};

var ITEM_LOCATION_CATEGORY_FILTERS = [
	{id: 'all', label: 'All Item Locations'},
	{id: 'heartscales', label: 'Heart Scales'},
	{id: 'rarecandies', label: 'Rare Candies'},
	{id: 'evolutionitems', label: 'Evolution Items'},
	{id: 'helditems', label: 'Held Items (incl. Berries)'},
	{id: 'machinesandtutors', label: 'TM/HM & Move Tutors'},
	{id: 'megastones', label: 'Mega Stones'}
];

var QUICK_MENU_TUTOR_SOURCE = [
	{locationId: 'quickmenututorsstonebadge', locationName: 'Quick Menu Tutors (Stone Badge)', requirement: 'Requires Stone Badge', moves: ['icicle_spear', 'scale_shot', 'rock_blast', 'bullet_seed']},
	{locationId: 'quickmenututorsknucklebadge', locationName: 'Quick Menu Tutors (Knuckle Badge)', requirement: 'Requires Knuckle Badge', moves: ['fire_punch', 'thunder_punch', 'ice_punch', 'shadow_punch', 'mega_punch', 'bullet_punch', 'poison_jab', 'brick_break']},
	{locationId: 'quickmenututorsbalancebadge', locationName: 'Quick Menu Tutors (Balance Badge)', requirement: 'Requires Balance Badge', moves: ['take_down', 'fire_fang', 'thunder_fang', 'ice_fang', 'poison_fang', 'crunch']},
	{locationId: 'quickmenututorsdynamobadge', locationName: 'Quick Menu Tutors (Dynamo Badge)', requirement: 'Requires Dynamo Badge', moves: ['extrasensory', 'signal_beam', 'burning_jealousy', 'scorching_sands', 'discharge', 'iron_head', 'seed_bomb']},
	{locationId: 'quickmenututorsheatbadge', locationName: 'Quick Menu Tutors (Heat Badge)', requirement: 'Requires Heat Badge', moves: ['low_sweep', 'mud_shot', 'bulldoze', 'ice_spinner', 'lash_out']},
	{locationId: 'quickmenututorsfeatherbadge', locationName: 'Quick Menu Tutors (Feather Badge)', requirement: 'Requires Feather Badge', moves: ['stone_edge', 'grassy_glide', 'muddy_water', 'natural_gift', 'nature_power']},
	{locationId: 'quickmenututorsmindbadge', locationName: 'Quick Menu Tutors (Mind Badge)', requirement: 'Requires Mind Badge', moves: ['flip_turn', 'skill_swap', 'power_gem', 'hypnosis']},
	{locationId: 'quickmenututorsrainbadge', locationName: 'Quick Menu Tutors (Rain Badge)', requirement: 'Requires Rain Badge', moves: ['aqua_tail', 'superpower', 'psycho_shift', 'bounce', 'hyper_voice']},
	{locationId: 'petalburgcity', locationName: 'Petalburg City', requirement: 'Quick Menu Tutor (On location)', moves: ['bug_bite', 'torment', 'hidden_power']},
	{locationId: 'verdanturftown', locationName: 'Verdanturf Town', requirement: 'Quick Menu Tutor (On location)', moves: ['covet', 'helping_hand', 'metronome', 'fling']},
	{locationId: 'dewfordtown', locationName: 'Dewford Town', requirement: 'Quick Menu Tutor (On location)', moves: ['trailblaze', 'flame_charge', 'pounce', 'chilling_water']},
	{locationId: 'mauvillecity', locationName: 'Mauville City', requirement: 'Quick Menu Tutor (On location)', moves: ['zen_headbutt', 'rock_slide', 'ancient_power', 'ominous_wind', 'silver_wind', 'parabolic_charge']},
	{locationId: 'route111', locationName: 'Route 111', requirement: 'Quick Menu Tutor (On location)', moves: ['stomping_tantrum', 'temper_flare', 'dig', 'slam']},
	{locationId: 'fierypath', locationName: 'Fiery Path', requirement: 'Quick Menu Tutor (On location)', moves: ['fire_spin', 'lava_plume']},
	{locationId: 'lavaridgetown', locationName: 'Lavaridge Town', requirement: 'Quick Menu Tutor (On location)', moves: ['earth_power', 'alluring_voice', 'psyshock', 'morning_sun']},
	{locationId: 'mossdeepcity', locationName: 'Mossdeep City', requirement: 'Quick Menu Tutor (On location)', moves: ['dream_eater', 'aura_sphere', 'dragon_pulse', 'dark_pulse', 'hex', 'vacuum_wave', 'power_whip']},
	{locationId: 'sootopoliscity', locationName: 'Sootopolis City', requirement: 'Quick Menu Tutor (On location)', moves: ['thunder', 'blizzard', 'fire_blast', 'hydro_pump', 'sky_attack']}
];

var RARE_CANDY_IDS = {
	rarecandy: true,
	endlesscandy: true,
	hypercandy: true
};

var KNOWN_EVOLUTION_ITEM_IDS = {
	auspiciousarmor: true,
	blackaugurite: true,
	chippedpot: true,
	crackedpot: true,
	dawnstone: true,
	deepseascale: true,
	deepseatooth: true,
	dragonscale: true,
	dubiousdisc: true,
	duskstone: true,
	electirizer: true,
	firestone: true,
	galaricacuff: true,
	galaricawreath: true,
	icestone: true,
	kingsrock: true,
	leafstone: true,
	linkingcord: true,
	magmarizer: true,
	maliciousarmor: true,
	metalcoat: true,
	moonstone: true,
	ovalstone: true,
	peatblock: true,
	prismscale: true,
	protector: true,
	razorclaw: true,
	razorfang: true,
	reapercloth: true,
	sachet: true,
	shinystone: true,
	sunstone: true,
	sweetapple: true,
	tartapple: true,
	thunderstone: true,
	upgrade: true,
	waterstone: true,
	whippeddream: true
};

var ITEM_LOCATION_KIND_ORDER = {
	'Field': 0,
	'Hidden': 1,
	'Berry Tree': 2,
	'Gift': 3,
	'Mart': 4,
	'Move Tutor': 5,
	'Unavailable': 6
};

var cachedEvolutionItemIds = null;

function renderItemLocationCategoryOptions() {
	var buf = '';
	for (var i = 0; i < ITEM_LOCATION_CATEGORY_FILTERS.length; i++) {
		var option = ITEM_LOCATION_CATEGORY_FILTERS[i];
		buf += '<option value="' + option.id + '">' + Dex.escapeHTML(option.label) + '</option>';
	}
	return buf;
}

function getItemLocationEntryId(entry) {
	return toID((entry && (entry.itemId || entry.item || entry.itemConst)) || '');
}

function getItemLocationEntryKey(entry) {
	return [
		toID(entry.kind || ''),
		toID(entry.itemConst || ''),
		toID(entry.item || ''),
		toID(entry.moveId || ''),
		String(entry.quantity || ''),
		String(entry.quantityText || ''),
		String(entry.requirement || '')
	].join('|');
}

function sortItemLocationEntries(items) {
	items.sort(function (a, b) {
		var aKind = ITEM_LOCATION_KIND_ORDER.hasOwnProperty(a.kind) ? ITEM_LOCATION_KIND_ORDER[a.kind] : 99;
		var bKind = ITEM_LOCATION_KIND_ORDER.hasOwnProperty(b.kind) ? ITEM_LOCATION_KIND_ORDER[b.kind] : 99;
		if (aKind !== bKind) return aKind - bKind;
		var aName = String(a.item || a.itemConst || '');
		var bName = String(b.item || b.itemConst || '');
		if (aName !== bName) return aName < bName ? -1 : 1;
		var aReq = String(a.requirement || '');
		var bReq = String(b.requirement || '');
		if (aReq !== bReq) return aReq < bReq ? -1 : 1;
		var aKey = getItemLocationEntryKey(a);
		var bKey = getItemLocationEntryKey(b);
		if (aKey === bKey) return 0;
		return aKey < bKey ? -1 : 1;
	});
}

function getEvolutionItemIdSet() {
	if (cachedEvolutionItemIds) return cachedEvolutionItemIds;
	var out = {};
	for (var knownId in KNOWN_EVOLUTION_ITEM_IDS) out[knownId] = true;
	var dex = window.BattlePokedex || {};
	for (var speciesId in dex) {
		var species = dex[speciesId];
		if (!species) continue;
		var evoItemId = toID(species.evoItem || '');
		if (evoItemId) out[evoItemId] = true;
	}
	cachedEvolutionItemIds = out;
	return out;
}

function getMoveTypeBadgeIconMarkup(moveId, labelPrefix) {
	var cleanMoveId = toID(moveId || '');
	if (!cleanMoveId) return '';
	var move = Dex.moves.get(cleanMoveId);
	if (!move || !move.exists || !move.type) return '';
	var typeId = toID(move.type);
	if (!typeId) return '';
	var label = MACHINE_TYPE_BADGE_LABELS[typeId] || move.type.slice(0, 2).toUpperCase();
	var title = labelPrefix + move.name + ' (' + move.type + ')';
	return '<span class="type ' + typeId + '" title="' + Dex.escapeHTML(title) + '" style="display:block;width:24px;height:24px;padding:0;line-height:22px;font-size:8px;text-align:center;letter-spacing:0;">' + Dex.escapeHTML(label) + '</span>';
}

function isMachineEntry(entry) {
	return /^(?:ITEM_TM_|ITEM_HM_)/.test(String(entry && entry.itemConst || ''));
}

function isMoveTutorEntry(entry) {
	return toID(entry && entry.kind || '') === 'movetutor' || !!toID(entry && entry.moveId || '');
}

function getMachineMoveIdFromEntry(entry) {
	var match = /^(?:ITEM_TM_|ITEM_HM_)([A-Z0-9_]+)$/.exec(String(entry && entry.itemConst || ''));
	if (!match) return '';
	return toID(match[1]);
}

function getMachineTypeIconMarkup(entry) {
	return getMoveTypeBadgeIconMarkup(getMachineMoveIdFromEntry(entry), 'TM/HM ');
}

function getMoveTutorTypeIconMarkup(entry) {
	return getMoveTypeBadgeIconMarkup(entry && entry.moveId || '', 'Move Tutor ');
}

function getEntryDexItem(entry) {
	var itemId = getItemLocationEntryId(entry);
	if (!itemId) return null;
	return Dex.items.get(itemId);
}

function isHeartScaleEntry(entry) {
	var itemId = getItemLocationEntryId(entry);
	return itemId === 'heartscale' || toID(entry.itemConst || '') === 'itemheartscale';
}

function isRareCandyEntry(entry) {
	var itemId = getItemLocationEntryId(entry);
	return !!RARE_CANDY_IDS[itemId];
}

function isEvolutionItemEntry(entry) {
	var itemId = getItemLocationEntryId(entry);
	if (!itemId) return false;
	var evoItems = getEvolutionItemIdSet();
	return !!evoItems[itemId];
}

function isMegaStoneEntry(entry) {
	var dexItem = getEntryDexItem(entry);
	return !!(dexItem && dexItem.exists && dexItem.megaStone);
}

function isHeldItemEntry(entry) {
	var dexItem = getEntryDexItem(entry);
	return !!(dexItem && dexItem.exists && !dexItem.megaStone);
}

function entryMatchesItemLocationCategory(entry, category) {
	switch (category) {
	case 'all':
		return true;
	case 'heartscales':
		return isHeartScaleEntry(entry);
	case 'rarecandies':
		return isRareCandyEntry(entry);
	case 'evolutionitems':
		return isEvolutionItemEntry(entry);
	case 'helditems':
		return isHeldItemEntry(entry);
	case 'machinesandtutors':
		return isMachineEntry(entry) || isMoveTutorEntry(entry);
	case 'megastones':
		return isMegaStoneEntry(entry);
	default:
		return true;
	}
}

function buildQuickMenuTutorLocations() {
	var locations = [];
	for (var i = 0; i < QUICK_MENU_TUTOR_SOURCE.length; i++) {
		var source = QUICK_MENU_TUTOR_SOURCE[i];
		var items = [];
		for (var j = 0; j < source.moves.length; j++) {
			var moveId = toID(source.moves[j]);
			if (!moveId) continue;
			var move = Dex.moves.get(moveId);
			var moveName = move && move.exists ? move.name : source.moves[j].replace(/_/g, ' ');
			items.push({
				kind: 'Move Tutor',
				itemConst: 'MOVE_TUTOR_' + source.moves[j].toUpperCase().replace(/[^A-Z0-9]+/g, '_'),
				item: moveName,
				itemId: moveId,
				moveId: moveId,
				requirement: source.requirement
			});
		}
		if (!items.length) continue;
		locations.push({
			id: source.locationId,
			name: source.locationName,
			baseArea: getItemOrderedLocationBaseId(source.locationId, source.locationName),
			items: items
		});
	}
	sortItemLocationsByPreferredOrder(locations);
	return locations;
}

function mergeItemLocationsWithTutors(baseLocations, tutorLocations) {
	var merged = [];
	var byId = {};
	for (var i = 0; i < baseLocations.length; i++) {
		var base = baseLocations[i];
		var clone = {
			id: base.id,
			name: base.name,
			baseArea: base.baseArea,
			items: base.items.slice()
		};
		merged.push(clone);
		byId[clone.id] = clone;
	}

	for (var j = 0; j < tutorLocations.length; j++) {
		var tutorLocation = tutorLocations[j];
		var existing = byId[tutorLocation.id];
		if (!existing) {
			var tutorClone = {
				id: tutorLocation.id,
				name: tutorLocation.name,
				baseArea: tutorLocation.baseArea,
				items: tutorLocation.items.slice()
			};
			sortItemLocationEntries(tutorClone.items);
			merged.push(tutorClone);
			byId[tutorClone.id] = tutorClone;
			continue;
		}
		var seen = {};
		for (var k = 0; k < existing.items.length; k++) {
			seen[getItemLocationEntryKey(existing.items[k])] = true;
		}
		for (var m = 0; m < tutorLocation.items.length; m++) {
			var tutorEntry = tutorLocation.items[m];
			var key = getItemLocationEntryKey(tutorEntry);
			if (seen[key]) continue;
			seen[key] = true;
			existing.items.push(tutorEntry);
		}
		sortItemLocationEntries(existing.items);
	}

	sortItemLocationsByPreferredOrder(merged);
	return merged;
}

function buildUnavailableMegaStoneEntries(baseLocations) {
	var availableIds = {};
	for (var i = 0; i < baseLocations.length; i++) {
		var location = baseLocations[i];
		for (var j = 0; j < location.items.length; j++) {
			var entry = location.items[j];
			if (!isMegaStoneEntry(entry)) continue;
			var availableId = getItemLocationEntryId(entry);
			if (availableId) availableIds[availableId] = true;
		}
	}

	var unavailable = [];
	var items = window.BattleItems || {};
	var itemIds = Object.keys(items).sort(function (a, b) {
		var aItem = Dex.items.get(a);
		var bItem = Dex.items.get(b);
		var aName = aItem && aItem.exists ? aItem.name : a;
		var bName = bItem && bItem.exists ? bItem.name : b;
		return aName < bName ? -1 : (aName > bName ? 1 : 0);
	});
	for (var idx = 0; idx < itemIds.length; idx++) {
		var itemId = itemIds[idx];
		var item = Dex.items.get(itemId);
		if (!item || !item.exists || !item.megaStone) continue;
		if (availableIds[item.id]) continue;
		unavailable.push({
			kind: 'Unavailable',
			itemConst: 'ITEM_' + item.id.toUpperCase(),
			item: item.name,
			itemId: item.id,
			requirement: 'Not obtainable in item locations'
		});
	}
	return unavailable;
}

function getItemLocationIconMarkup(entry, itemId, dexItem) {
	var overrideUrl = ITEM_LOCATION_ICON_URL_OVERRIDES[itemId] || ITEM_LOCATION_ICON_URL_OVERRIDES[toID(entry.itemConst || '')];
	if (overrideUrl) {
		return '<img src="' + Dex.escapeHTML(overrideUrl) + '" alt="" width="24" height="24" style="display:block;width:24px;height:24px;image-rendering:pixelated;" />';
	}
	var tutorTypeIcon = getMoveTutorTypeIconMarkup(entry);
	if (tutorTypeIcon) return tutorTypeIcon;
	var machineTypeIcon = getMachineTypeIconMarkup(entry);
	if (machineTypeIcon) return machineTypeIcon;
	var iconStyle = Dex.getItemIcon(dexItem && dexItem.exists ? dexItem : '');
	return '<span style="' + iconStyle + '"></span>';
}

var PokedexItemLocationsPanel = Panels.Panel.extend({
	minWidth: 639,
	maxWidth: 639,
	sidebarWidth: 280,
	events: {
		'click .tabbar button': 'clickTab',
		'keyup input.searchbox': 'updateFilter',
		'change input.searchbox': 'updateFilter',
		'search input.searchbox': 'updateFilter',
		'change select.itemcategoryfilter': 'updateFilter',
		'submit': 'submit'
	},
	initialize: function () {
		this.locations = this.buildLocations();
		this.tutorLocations = buildQuickMenuTutorLocations();
		this.locationsWithTutors = mergeItemLocationsWithTutors(this.locations, this.tutorLocations);
		this.unavailableMegaStoneEntries = buildUnavailableMegaStoneEntries(this.locations);

		var buf = '<div class="pfx-body"><form class="pokedex">';
		buf += '<h1><a href="/" data-target="replace">Astral Emerald Pok&eacute;dex</a></h1>';
		buf += '<h4>Modified from <a href="https://dex.pokemonshowdown.com/">Pok&eacute;mon Showdown Dex</a> for Porydex</h4>';
		buf += '<ul class="tabbar centered" style="margin-bottom: 18px"><li><button class="button nav-first" value="">Search</button></li>';
		buf += '<li><button class="button" value="pokemon/">Pok&eacute;mon</button></li>';
		buf += '<li><button class="button" value="encounters/">Encounters</button></li>';
		buf += '<li><button class="button cur" value="itemlocations/">Item Locations</button></li>';
		buf += '<li><button class="button nav-last" value="moves/">Moves</button></li></ul>';
		buf += '<div class="searchboxwrapper"><input class="textbox searchbox" type="search" name="q" value="" autocomplete="off" autofocus placeholder="Filter by location, item, move, or requirement" /></div>';
		buf += '<div class="searchboxwrapper" style="margin-top: 6px;">';
		buf += '<label for="item-location-category-filter" style="margin-right: 8px; font-size: 9pt;">Category:</label>';
		buf += '<select id="item-location-category-filter" class="textbox itemcategoryfilter" name="category" style="height: 28px;">';
		buf += renderItemLocationCategoryOptions();
		buf += '</select></div>';
		buf += '</form><div class="results"></div></div>';
		this.$el.html(buf);

		this.renderList('');
	},
	submit: function (e) {
		e.preventDefault();
	},
	clickTab: function (e) {
		e.preventDefault();
		e.stopPropagation();
		this.app.go(e.currentTarget.value, this, true);
	},
	updateFilter: function () {
		var query = this.$('input.searchbox').val() || '';
		this.renderList(query);
	},
	buildLocations: function () {
		var locations = [];
		var dex = window.BattleItemLocationdex || {};
		for (var id in dex) {
			var location = dex[id];
			if (!location || !location.items || !location.items.length) continue;
			var filteredItems = [];
			for (var j = 0; j < location.items.length; j++) {
				if (isIgnoredItemLocationEntry(location.items[j])) continue;
				filteredItems.push(location.items[j]);
			}
			if (!filteredItems.length) continue;
			locations.push({
				id: id,
				name: location.name || id,
				baseArea: getItemOrderedLocationBaseId(id, location.name || id),
				items: filteredItems
			});
		}
		sortItemLocationsByPreferredOrder(locations);
		return locations;
	},
	renderList: function (query) {
		var q = toID(query || '');
		var category = this.$('select.itemcategoryfilter').val() || 'all';
		var sourceLocations = category === 'machinesandtutors' ? this.locationsWithTutors : this.locations;
		var buf = '<ul class="utilichart">';
		var shownLocations = 0;

		for (var i = 0; i < sourceLocations.length; i++) {
			var location = sourceLocations[i];
			var locationNameMatches = !q || toID(location.name).indexOf(q) >= 0;
			var rows = '';

			for (var j = 0; j < location.items.length; j++) {
				var entry = location.items[j];
				if (!entryMatchesItemLocationCategory(entry, category)) continue;
				var quantity = (entry.quantityText || entry.quantity || '').toString();
				var requirement = (entry.requirement || '').toString();
				var moveId = toID(entry.moveId || '');
				var move = moveId ? Dex.moves.get(moveId) : null;
				var moveType = move && move.exists ? move.type : '';
				var searchable = (entry.item || entry.itemConst || '') + ' ' + quantity + ' ' + (entry.kind || '') + ' ' + requirement + ' ' + moveId + ' ' + moveType;
				var itemMatch = !q || toID(searchable).indexOf(q) >= 0;
				if (!locationNameMatches && !itemMatch) continue;
				rows += this.renderItemRow(entry);
			}

			if (!rows) continue;
			shownLocations++;
			buf += '<li class="resultheader"><h3>' + Dex.escapeHTML(location.name) + '</h3></li>';
			buf += rows;
		}

		if (category === 'megastones' && this.unavailableMegaStoneEntries.length) {
			var unavailableRows = '';
			var unavailableLocationName = 'Unavailable Mega Stones';
			var unavailableNameMatches = !q || toID(unavailableLocationName).indexOf(q) >= 0;
			for (var k = 0; k < this.unavailableMegaStoneEntries.length; k++) {
				var unavailableEntry = this.unavailableMegaStoneEntries[k];
				var searchableUnavailable = (unavailableEntry.item || '') + ' ' + (unavailableEntry.kind || '') + ' ' + (unavailableEntry.requirement || '');
				var unavailableMatch = !q || toID(searchableUnavailable).indexOf(q) >= 0;
				if (!unavailableNameMatches && !unavailableMatch) continue;
				unavailableRows += this.renderItemRow(unavailableEntry);
			}
			if (unavailableRows) {
				shownLocations++;
				buf += '<li class="resultheader"><h3>' + Dex.escapeHTML(unavailableLocationName) + '</h3></li>';
				buf += unavailableRows;
			}
		}

		if (!shownLocations) {
			buf += '<li class="result"><div class="notfound"><em>No matching item locations.</em></div></li>';
		}

		buf += '</ul>';
		this.$('.results').html(buf);
	},
	renderItemRow: function (entry) {
		var kind = entry.kind || 'Field';
		var moveId = toID(entry.moveId || '');
		var move = moveId ? Dex.moves.get(moveId) : null;
		var isMoveTutor = !!(move && move.exists);
		var itemName = isMoveTutor ? move.name : (entry.item || entry.itemConst || 'Unknown Item');
		var itemId = isMoveTutor ? move.id : (entry.itemId || toID(itemName));
		var quantity = (entry.quantityText || entry.quantity || '').toString();
		var requirement = (entry.requirement || '').toString();
		var hasQuantity = !!quantity;
		var hasRequirement = !!requirement;

		var dexItem = isMoveTutor ? null : Dex.items.get(itemId);
		var hasItemPage = !!(dexItem && dexItem.exists);
		var attrs = '';
		if (isMoveTutor) attrs = ' href="/moves/' + moveId + '" data-target="push"';
		else if (hasItemPage) attrs = ' href="/items/' + itemId + '" data-target="push"';
		var icon = getItemLocationIconMarkup(entry, itemId, dexItem);
		var quantitySuffix = hasQuantity ? (' x' + quantity) : '';
		var requirementSuffix = hasRequirement ? (' [' + requirement + ']') : '';

		var buf = '<li class="result"><a' + attrs + ' class="itemlocationrow">';
		buf += '<span class="col tagcol shorttagcol itemlocationtagcol">' + Dex.escapeHTML(kind) + '</span> ';
		buf += '<span class="col itemiconcol">' + icon + '</span> ';
		buf += '<span class="col namecol itemlocationnamecol">' + Dex.escapeHTML(itemName + quantitySuffix + requirementSuffix) + '</span> ';
		buf += '</a></li>';
		return buf;
	}
});
