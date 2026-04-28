var PokedexEncounterDupeStore = window.PokedexEncounterDupeStore || (function () {
	var STORAGE_KEY = 'porydex-encounter-selections';
	var state = {selections: {}};

	function toSelectionId(value) {
		return toID(value || '');
	}
	function cloneSelections() {
		var copy = {};
		for (var locationId in state.selections) {
			if (!state.selections.hasOwnProperty(locationId)) continue;
			copy[locationId] = state.selections[locationId];
		}
		return copy;
	}
	function load() {
		state.selections = {};
		try {
			var raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			var parsed = JSON.parse(raw);
			if (!parsed || typeof parsed !== 'object') return;
			for (var locationId in parsed) {
				if (!parsed.hasOwnProperty(locationId)) continue;
				var cleanLocationId = toSelectionId(locationId);
				var cleanSpeciesId = toSelectionId(parsed[locationId]);
				if (!cleanLocationId || !cleanSpeciesId) continue;
				state.selections[cleanLocationId] = cleanSpeciesId;
			}
		} catch (err) {}
	}
	function save() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state.selections));
		} catch (err) {}
	}
	function getSelectionCounts() {
		var counts = {};
		for (var locationId in state.selections) {
			if (!state.selections.hasOwnProperty(locationId)) continue;
			var speciesId = toSelectionId(state.selections[locationId]);
			if (!speciesId) continue;
			counts[speciesId] = (counts[speciesId] || 0) + 1;
		}
		return counts;
	}
	function getDupeSet() {
		var counts = getSelectionCounts();
		var dupes = {};
		for (var speciesId in counts) {
			if (!counts.hasOwnProperty(speciesId)) continue;
			if (counts[speciesId] > 1) dupes[speciesId] = true;
		}
		return dupes;
	}

	load();

	return {
		getSelections: function () {
			return cloneSelections();
		},
		setSelection: function (locationId, speciesId) {
			var cleanLocationId = toSelectionId(locationId);
			var cleanSpeciesId = toSelectionId(speciesId);
			if (!cleanLocationId) return;
			if (cleanSpeciesId) {
				state.selections[cleanLocationId] = cleanSpeciesId;
			} else {
				delete state.selections[cleanLocationId];
			}
			save();
			$(document).trigger('encounterlist:dupes-updated');
		},
		clear: function () {
			state.selections = {};
			save();
			$(document).trigger('encounterlist:dupes-updated');
		},
		getDupeSet: function () {
			return getDupeSet();
		},
		isDupe: function (speciesId) {
			var cleanSpeciesId = toSelectionId(speciesId);
			if (!cleanSpeciesId) return false;
			return !!getDupeSet()[cleanSpeciesId];
		},
		getDupeCount: function () {
			var count = 0;
			var dupes = getDupeSet();
			for (var speciesId in dupes) {
				if (dupes.hasOwnProperty(speciesId)) count++;
			}
			return count;
		}
	};
})();

var PokedexEncounterAbilityBoostStore = window.PokedexEncounterAbilityBoostStore || (function () {
	var STORAGE_KEY = 'porydex-encounter-ability-boosts';
	var state = {
		staticBoost: false,
		harvestBoost: false
	};

	function toBool(value) {
		return !!value;
	}
	function load() {
		try {
			var raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			var parsed = JSON.parse(raw);
			if (!parsed || typeof parsed !== 'object') return;
			state.staticBoost = toBool(parsed.staticBoost);
			state.harvestBoost = toBool(parsed.harvestBoost);
		} catch (err) {}
	}
	function save() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch (err) {}
	}
	function emitChange() {
		$(document).trigger('encounterlist:abilityboost-updated');
	}

	load();

	return {
		getState: function () {
			return {
				staticBoost: toBool(state.staticBoost),
				harvestBoost: toBool(state.harvestBoost)
			};
		},
		isStaticBoost: function () {
			return !!state.staticBoost;
		},
		isHarvestBoost: function () {
			return !!state.harvestBoost;
		},
		setStaticBoost: function (enabled) {
			state.staticBoost = toBool(enabled);
			save();
			emitChange();
		},
		setHarvestBoost: function (enabled) {
			state.harvestBoost = toBool(enabled);
			save();
			emitChange();
		}
	};
})();

var ENCOUNTER_LOCATION_ORDER = [
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

var ENCOUNTER_LOCATION_ORDER_INDEX = (function () {
	var index = {};
	for (var i = 0; i < ENCOUNTER_LOCATION_ORDER.length; i++) {
		index[ENCOUNTER_LOCATION_ORDER[i]] = i;
	}
	return index;
})();

function normalizeEncounterLocationOrderKey(key) {
	var normalized = toID(key || '');
	if (normalized.indexOf('alteringcave') === 0) {
		return normalized.replace(/^alteringcave/, 'starfallcave');
	}
	if (normalized.indexOf('evergrandecity') === 0) return 'evergrandecity';
	if (normalized.indexOf('scorchedslabs') === 0) return 'scorchedslab';
	return normalized;
}

function getEncounterOrderedLocationBaseId(locationId, locationName) {
	var normalized = normalizeEncounterLocationOrderKey(locationId || locationName || '');
	if (/^route\d+$/.test(normalized) || /^underwaterroute\d+$/.test(normalized)) {
		return normalized;
	}
	for (var i = 0; i < ENCOUNTER_LOCATION_ORDER.length; i++) {
		var key = ENCOUNTER_LOCATION_ORDER[i];
		if (normalized === key || normalized.indexOf(key) === 0) return key;
	}
	return normalized;
}

function sortEncounterLocationsByPreferredOrder(locations) {
	locations.sort(function (a, b) {
		var aBase = getEncounterOrderedLocationBaseId(a.id, a.name);
		var bBase = getEncounterOrderedLocationBaseId(b.id, b.name);
		var aRank = ENCOUNTER_LOCATION_ORDER_INDEX.hasOwnProperty(aBase) ? ENCOUNTER_LOCATION_ORDER_INDEX[aBase] : 9999;
		var bRank = ENCOUNTER_LOCATION_ORDER_INDEX.hasOwnProperty(bBase) ? ENCOUNTER_LOCATION_ORDER_INDEX[bBase] : 9999;
		if (aRank !== bRank) return aRank - bRank;
		if (aBase !== bBase) return aBase < bBase ? -1 : 1;
		if (a.name !== b.name) return a.name < b.name ? -1 : 1;
		return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
	});
}

var PokedexEncounterListPanel = Panels.Panel.extend({
	minWidth: 639,
	maxWidth: 639,
	events: {
		'click .encounterlist-row': 'clickRow',
		'click .encounterlist-route-link': 'clickRoute',
		'input input.encounterlist-search': 'updateFilter',
		'keyup input.encounterlist-search': 'updateFilter',
		'change input.encounterlist-search': 'updateFilter',
		'search input.encounterlist-search': 'updateFilter',
		'input input.encounterlist-catch-search': 'updateCatchFilter',
		'search input.encounterlist-catch-search': 'updateCatchFilter',
		'change .encounterlist-catch': 'changeSelection',
		'change input[name=encounter-static-boost]': 'changeStaticBoost',
		'change input[name=encounter-harvest-boost]': 'changeHarvestBoost',
		'click button[name=reset-encounterlist]': 'resetSelections'
	},
	initialize: function () {
		this.locationFilter = '';
		this.catchFilters = {};
		this.locations = this.buildLocations();
		this.locationsById = {};
		for (var i = 0; i < this.locations.length; i++) {
			this.locationsById[this.locations[i].id] = this.locations[i];
		}
		this.activeLocationId = this.locations.length ? this.locations[0].id : '';
		this.handleDupeUpdate = this.handleDupeUpdate.bind(this);
		this.handleAbilityBoostUpdate = this.handleAbilityBoostUpdate.bind(this);
		$(document).on('encounterlist:dupes-updated.' + this.cid, this.handleDupeUpdate);
		$(document).on('encounterlist:abilityboost-updated.' + this.cid, this.handleAbilityBoostUpdate);
		this.render();
	},
	remove: function () {
		$(document).off('encounterlist:dupes-updated.' + this.cid);
		$(document).off('encounterlist:abilityboost-updated.' + this.cid);
		Panels.Panel.prototype.remove.apply(this, arguments);
	},
	buildLocations: function () {
		var locations = [];
		var dex = window.BattleLocationdex || {};
		for (var id in dex) {
			if (!dex.hasOwnProperty(id) || id === 'rates') continue;
			var locationData = dex[id];
			if (!locationData || !locationData.name) continue;
			var speciesIds = this.getLocationSpecies(locationData);
			if (!speciesIds.length) continue;
			locations.push({
				id: toID(id),
				name: locationData.name,
				speciesIds: speciesIds,
				speciesSearchIndex: this.buildSpeciesSearchIndex(speciesIds),
				searchText: this.buildLocationSearchText(locationData.name, speciesIds)
			});
		}
		sortEncounterLocationsByPreferredOrder(locations);
		return locations;
	},
	getLocationSpecies: function (locationData) {
		var speciesIds = [];
		var seen = {};
		var modes = ['land', 'surf', 'rock', 'fish'];
		for (var i = 0; i < modes.length; i++) {
			var modeData = locationData[modes[i]];
			if (!modeData || !modeData.encs || !modeData.encs.length) continue;
			for (var j = 0; j < modeData.encs.length; j++) {
				var enc = modeData.encs[j];
				var speciesId = toID(enc && enc.species);
				if (!speciesId || seen[speciesId]) continue;
				seen[speciesId] = true;
				speciesIds.push(speciesId);
			}
		}
		return speciesIds;
	},
	getSpeciesName: function (speciesId) {
		var pokemon = BattlePokedex[speciesId];
		return pokemon && pokemon.name ? pokemon.name : speciesId;
	},
	buildSpeciesSearchIndex: function (speciesIds) {
		var index = {};
		for (var i = 0; i < speciesIds.length; i++) {
			var speciesId = speciesIds[i];
			index[speciesId] = toID(speciesId + ' ' + this.getSpeciesName(speciesId));
		}
		return index;
	},
	buildLocationSearchText: function (locationName, speciesIds) {
		var tokens = [locationName || ''];
		for (var i = 0; i < speciesIds.length; i++) {
			var speciesId = speciesIds[i];
			tokens.push(speciesId);
			tokens.push(this.getSpeciesName(speciesId));
		}
		return toID(tokens.join(' '));
	},
	render: function () {
		var selections = PokedexEncounterDupeStore.getSelections();
		var buf = '<div class="pfx-body dexentry encounterlist-panel">';
		buf += '<a href="/" class="pfx-backbutton button" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
		buf += '<h1>Encounter List</h1>';
		buf += '<p class="encounterlist-controls"><button class="button" name="reset-encounterlist">Reset</button> ';
		buf += '<span class="encounterlist-dupe-count">Dupes: 0</span></p>';
		buf += '<div class="searchboxwrapper encounterlist-search-wrap"><input class="textbox searchbox encounterlist-search" type="search" name="encounterlist-q" value="' + Dex.escapeHTML(this.locationFilter || '') + '" autocomplete="off" placeholder="Filter by location or species" aria-label="Filter encounter list" /></div>';
		buf += this.renderAbilityBoostControls();
		buf += '<p class="encounterlist-note">Note: Verdanturf Town is a guaranteed double encounter for grass encounters.</p>';
		buf += '<p class="encounterlist-note">Note: Dewford Town is a guaranteed double encounter for grass encounters.</p>';
		buf += '<p class="encounterlist-note">Note: Starfall Cave is a guaranteed double encounter for grass encounters.</p>';
		buf += '<p class="encounterlist-note">Note: Fiery Path is a guaranteed double encounter for grass encounters.</p>';
		buf += '<ul class="encounterlist-rows">';
		for (var i = 0; i < this.locations.length; i++) {
			buf += this.renderLocationRow(this.locations[i], selections);
		}
		buf += '</ul>';
		buf += '<p class="encounterlist-empty">No encounter locations match your filter.</p>';
		buf += '</div>';
		this.html(buf);
		this.refreshState();
	},
	renderLocationRow: function (location, selections) {
		var selectedSpecies = toID(selections[location.id] || '');
		if (selectedSpecies && location.speciesIds.indexOf(selectedSpecies) < 0) selectedSpecies = '';
		var catchQuery = this.getCatchFilterValue(location.id);
		var linkClass = 'encounterlist-route-link';
		if (this.activeLocationId === location.id) linkClass += ' encounterlist-route-active';

		var buf = '<li class="encounterlist-row" data-location-id="' + Dex.escapeHTML(location.id) + '">';
		buf += '<a href="/encounters/' + Dex.escapeHTML(location.id) + '" data-target="push" class="' + linkClass + '" data-location-id="' + Dex.escapeHTML(location.id) + '">';
		buf += Dex.escapeHTML(location.name) + '</a>';
		buf += '<span class="encounterlist-picked-icon">' + this.renderSelectedIcon(selectedSpecies) + '</span>';
		buf += '<div class="encounterlist-catch-controls">';
		buf += '<input class="textbox encounterlist-catch-search" type="search" data-location-id="' + Dex.escapeHTML(location.id) + '" value="' + Dex.escapeHTML(catchQuery) + '" autocomplete="off" placeholder="Search area species" aria-label="Search species for ' + Dex.escapeHTML(location.name) + '" />';
		buf += '<select class="textbox encounterlist-catch" data-location-id="' + Dex.escapeHTML(location.id) + '">';
		buf += this.renderLocationOptions(location, selectedSpecies, catchQuery);
		buf += '</select>';
		buf += '</div>';
		buf += '</li>';
		return buf;
	},
	renderAbilityBoostControls: function () {
		var state = PokedexEncounterAbilityBoostStore.getState();
		var staticChecked = state.staticBoost ? ' checked' : '';
		var harvestChecked = state.harvestBoost ? ' checked' : '';
		var buf = '<div class="encounterlist-ability-controls">';
		buf += '<label><input type="checkbox" name="encounter-static-boost"' + staticChecked + ' /> Static (+50% Electric)</label>';
		buf += '<label><input type="checkbox" name="encounter-harvest-boost"' + harvestChecked + ' /> Harvest (+50% Grass)</label>';
		buf += '<span class="encounterlist-ability-hint">Boosts are reflected in route encounter percentages.</span>';
		buf += '</div>';
		return buf;
	},
	getCatchFilterValue: function (locationId) {
		var cleanLocationId = toID(locationId || '');
		return this.catchFilters[cleanLocationId] || '';
	},
	getFilteredSpeciesIds: function (location, selectedSpecies, queryId) {
		if (!queryId) return location.speciesIds.slice();
		var filtered = [];
		var searchIndex = location.speciesSearchIndex || {};
		for (var i = 0; i < location.speciesIds.length; i++) {
			var speciesId = location.speciesIds[i];
			if (speciesId === selectedSpecies) {
				filtered.push(speciesId);
				continue;
			}
			var haystack = searchIndex[speciesId] || toID(speciesId + ' ' + this.getSpeciesName(speciesId));
			if (haystack.indexOf(queryId) >= 0) filtered.push(speciesId);
		}
		return filtered;
	},
	renderLocationOptions: function (location, selectedSpecies, queryRaw) {
		var queryId = toID(queryRaw || '');
		var speciesIds = this.getFilteredSpeciesIds(location, selectedSpecies, queryId);
		var buf = '<option value="">(None)</option>';
		if (!speciesIds.length) {
			buf += '<option value="" disabled>(No matches)</option>';
			return buf;
		}
		for (var i = 0; i < speciesIds.length; i++) {
			var speciesId = speciesIds[i];
			var selected = speciesId === selectedSpecies ? ' selected' : '';
			buf += '<option value="' + Dex.escapeHTML(speciesId) + '"' + selected + '>';
			buf += Dex.escapeHTML(this.getSpeciesName(speciesId));
			buf += '</option>';
		}
		return buf;
	},
	renderCatchOptionsForRow: function ($row, location, selectedSpecies) {
		if (!location || !$row || !$row.length) return;
		var locationId = toID(location.id || $row.attr('data-location-id'));
		if (!locationId) return;
		var queryRaw = this.getCatchFilterValue(locationId);
		var $search = $row.find('.encounterlist-catch-search');
		var $select = $row.find('.encounterlist-catch');
		if ($search.length) $search.val(queryRaw);
		if (!$select.length) return;
		$select.html(this.renderLocationOptions(location, selectedSpecies, queryRaw));
		$select.val(selectedSpecies || '');
	},
	clickRoute: function (e) {
		this.activeLocationId = toID($(e.currentTarget).attr('data-location-id'));
		this.highlightActiveRoute();
	},
	clickRow: function (e) {
		if ($(e.target).closest('.encounterlist-catch-controls').length) return;
		var $row = $(e.currentTarget);
		var locationId = toID($row.attr('data-location-id'));
		if (!locationId) return;
		this.activeLocationId = locationId;
		this.highlightActiveRoute();
		if ($(e.target).closest('.encounterlist-route-link').length) return;
		e.preventDefault();
		e.stopPropagation();
		this.app.go('encounters/' + locationId, this, false, $row.find('.encounterlist-route-link'));
	},
	changeSelection: function (e) {
		var $select = $(e.currentTarget);
		var locationId = toID($select.attr('data-location-id'));
		var speciesId = toID($select.val());
		var location = this.locationsById[locationId];
		if (!location) return;
		if (speciesId && location.speciesIds.indexOf(speciesId) < 0) speciesId = '';
		PokedexEncounterDupeStore.setSelection(locationId, speciesId);
	},
	updateCatchFilter: function (e) {
		var $input = $(e.currentTarget);
		var locationId = toID($input.attr('data-location-id'));
		if (!locationId) return;
		this.catchFilters[locationId] = $input.val() || '';
		var location = this.locationsById[locationId];
		if (!location) return;
		var selectedSpecies = toID(PokedexEncounterDupeStore.getSelections()[locationId] || '');
		var $row = $input.closest('.encounterlist-row');
		this.renderCatchOptionsForRow($row, location, selectedSpecies);
	},
	changeStaticBoost: function (e) {
		PokedexEncounterAbilityBoostStore.setStaticBoost(!!$(e.currentTarget).prop('checked'));
	},
	changeHarvestBoost: function (e) {
		PokedexEncounterAbilityBoostStore.setHarvestBoost(!!$(e.currentTarget).prop('checked'));
	},
	syncAbilityBoostControls: function () {
		var state = PokedexEncounterAbilityBoostStore.getState();
		this.$('input[name=encounter-static-boost]').prop('checked', !!state.staticBoost);
		this.$('input[name=encounter-harvest-boost]').prop('checked', !!state.harvestBoost);
	},
	updateFilter: function () {
		this.locationFilter = toID(this.$('input.encounterlist-search').val() || '');
		this.applyLocationFilter();
	},
	matchesLocationFilter: function (location, queryId) {
		if (!queryId) return true;
		if (!location) return false;
		var searchText = location.searchText || toID(location.name || '');
		return searchText.indexOf(queryId) >= 0;
	},
	applyLocationFilter: function () {
		var queryId = this.locationFilter || '';
		var visibleCount = 0;
		var self = this;
		this.$('.encounterlist-row').each(function () {
			var $row = $(this);
			var locationId = toID($row.attr('data-location-id'));
			var location = self.locationsById[locationId];
			var isVisible = self.matchesLocationFilter(location, queryId);
			$row.toggleClass('encounterlist-row-hidden', !isVisible);
			if (isVisible) visibleCount++;
		});
		this.$('.encounterlist-empty').toggle(!visibleCount);
	},
	resetSelections: function (e) {
		e.preventDefault();
		e.stopPropagation();
		PokedexEncounterDupeStore.clear();
	},
	highlightActiveRoute: function () {
		var activeLocationId = this.activeLocationId;
		this.$('.encounterlist-route-link').each(function () {
			var $link = $(this);
			var locationId = toID($link.attr('data-location-id'));
			$link.toggleClass('encounterlist-route-active', activeLocationId && locationId === activeLocationId);
		});
	},
	handleDupeUpdate: function () {
		this.refreshState();
	},
	handleAbilityBoostUpdate: function () {
		this.syncAbilityBoostControls();
	},
	refreshState: function () {
		var selections = PokedexEncounterDupeStore.getSelections();
		var dupes = PokedexEncounterDupeStore.getDupeSet();
		var self = this;
		this.$('.encounterlist-row').each(function () {
			var $row = $(this);
			var locationId = toID($row.attr('data-location-id'));
			var selectedSpecies = toID(selections[locationId] || '');
			var location = self.locationsById[locationId];
			if (location && selectedSpecies && location.speciesIds.indexOf(selectedSpecies) < 0) {
				selectedSpecies = '';
			}
			self.renderCatchOptionsForRow($row, location, selectedSpecies);
			$row.toggleClass('encounterlist-row-dupe', !!(selectedSpecies && dupes[selectedSpecies]));
			$row.find('.encounterlist-picked-icon').html(self.renderSelectedIcon(selectedSpecies));
		});
		this.$('.encounterlist-dupe-count').text('Dupes: ' + PokedexEncounterDupeStore.getDupeCount());
		this.syncAbilityBoostControls();
		this.highlightActiveRoute();
		this.applyLocationFilter();
	},
	renderSelectedIcon: function (speciesId) {
		if (!speciesId) return '';
		var template = BattlePokedex[speciesId];
		if (!template || !template.name) return '';
		return '<span class="picon" style="' + Dex.getPokemonIcon(template.name) + '"></span>';
	}
});
