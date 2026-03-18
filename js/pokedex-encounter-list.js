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
	function getDupeSet() {
		var dupes = {};
		for (var locationId in state.selections) {
			if (!state.selections.hasOwnProperty(locationId)) continue;
			var speciesId = toSelectionId(state.selections[locationId]);
			if (!speciesId) continue;
			dupes[speciesId] = true;
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

var PokedexEncounterListPanel = Panels.Panel.extend({
	minWidth: 639,
	maxWidth: 639,
	events: {
		'click .encounterlist-route-link': 'clickRoute',
		'change .encounterlist-catch': 'changeSelection',
		'click button[name=reset-encounterlist]': 'resetSelections'
	},
	initialize: function () {
		this.locations = this.buildLocations();
		this.locationsById = {};
		for (var i = 0; i < this.locations.length; i++) {
			this.locationsById[this.locations[i].id] = this.locations[i];
		}
		this.activeLocationId = this.locations.length ? this.locations[0].id : '';
		this.handleDupeUpdate = this.handleDupeUpdate.bind(this);
		$(document).on('encounterlist:dupes-updated.' + this.cid, this.handleDupeUpdate);
		this.render();
	},
	remove: function () {
		$(document).off('encounterlist:dupes-updated.' + this.cid);
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
				speciesIds: speciesIds
			});
		}
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
	render: function () {
		var selections = PokedexEncounterDupeStore.getSelections();
		var buf = '<div class="pfx-body dexentry encounterlist-panel">';
		buf += '<a href="/" class="pfx-backbutton button" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
		buf += '<h1>Encounter List</h1>';
		buf += '<p class="encounterlist-controls"><button class="button" name="reset-encounterlist">Reset</button> ';
		buf += '<span class="encounterlist-dupe-count">Dupes: 0</span></p>';
		buf += '<ul class="encounterlist-rows">';
		for (var i = 0; i < this.locations.length; i++) {
			buf += this.renderLocationRow(this.locations[i], selections);
		}
		buf += '</ul>';
		buf += '</div>';
		this.html(buf);
		this.refreshState();
	},
	renderLocationRow: function (location, selections) {
		var selectedSpecies = toID(selections[location.id] || '');
		if (selectedSpecies && location.speciesIds.indexOf(selectedSpecies) < 0) selectedSpecies = '';
		var linkClass = 'encounterlist-route-link';
		if (this.activeLocationId === location.id) linkClass += ' encounterlist-route-active';

		var buf = '<li class="encounterlist-row" data-location-id="' + Dex.escapeHTML(location.id) + '">';
		buf += '<a href="/encounters/' + Dex.escapeHTML(location.id) + '" data-target="push" class="' + linkClass + '" data-location-id="' + Dex.escapeHTML(location.id) + '">';
		buf += Dex.escapeHTML(location.name) + '</a>';
		buf += '<select class="textbox encounterlist-catch" data-location-id="' + Dex.escapeHTML(location.id) + '">';
		buf += '<option value="">(None)</option>';
		for (var i = 0; i < location.speciesIds.length; i++) {
			var speciesId = location.speciesIds[i];
			var selected = speciesId === selectedSpecies ? ' selected' : '';
			buf += '<option value="' + Dex.escapeHTML(speciesId) + '"' + selected + '>';
			buf += Dex.escapeHTML(this.getSpeciesName(speciesId));
			buf += '</option>';
		}
		buf += '</select>';
		buf += '<span class="encounterlist-picked-icon"></span>';
		buf += '</li>';
		return buf;
	},
	clickRoute: function (e) {
		this.activeLocationId = toID($(e.currentTarget).attr('data-location-id'));
		this.highlightActiveRoute();
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
			$row.find('.encounterlist-catch').val(selectedSpecies);
			$row.toggleClass('encounterlist-row-dupe', !!(selectedSpecies && dupes[selectedSpecies]));
			$row.find('.encounterlist-picked-icon').html(self.renderSelectedIcon(selectedSpecies));
		});
		this.$('.encounterlist-dupe-count').text('Dupes: ' + PokedexEncounterDupeStore.getDupeCount());
		this.highlightActiveRoute();
	},
	renderSelectedIcon: function (speciesId) {
		if (!speciesId) return '';
		var template = BattlePokedex[speciesId];
		if (!template || !template.name) return '';
		return '<span style="' + Dex.getPokemonIcon(template.name) + '"></span>';
	}
});
