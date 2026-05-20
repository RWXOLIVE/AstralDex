var PokedexComparePopup = Panels.Popup.extend({
	initialize: function(options) {
		this.basePanel = options.basePanel || null;
		this.compareFragment = options.compareFragment || '';
		this.compareName = options.compareName || this.compareFragment.replace(/^pokemon\//, '');
		this.hasComparePanel = !!options.hasComparePanel;
		this.isSameAsBase = !!(this.basePanel && this.basePanel.fragment === this.compareFragment);

		var buf = '<div class="compare-popup">';
		buf += '<p><strong>Compare with ' + Dex.escapeHTML(this.compareName) + '?</strong></p>';
		buf += '<p class="compare-popup-actions">';
		buf += '<button type="button" class="button js-open-compare"' + (this.isSameAsBase ? ' disabled' : '') + '>Open on right</button> ';
		if (this.hasComparePanel) {
			buf += '<button type="button" class="button js-close-compare">Close right panel</button> ';
		}
		buf += '<button type="button" class="button js-cancel-compare">Cancel</button>';
		buf += '</p>';
		buf += '</div>';

		this.html(buf);
	},
	events: {
		'click .js-open-compare': 'openCompare',
		'click .js-close-compare': 'closeCompare',
		'click .js-cancel-compare': 'close'
	},
	openCompare: function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.isSameAsBase) return;
		this.close();
		this.app.openPokemonCompare(this.compareFragment, this.basePanel, this.source);
	},
	closeCompare: function(e) {
		e.preventDefault();
		e.stopPropagation();
		this.close();
		this.app.closePokemonCompare(this.basePanel);
	}
});

var Pokedex = Panels.App.extend({
	topbarView: Topbar,
	backButtonPrefix: '<i class="fa fa-chevron-left"></i> ',
	states2: {
		'pokemon/:pokemon': PokedexPokemonPanel,
		'moves/:move': PokedexMovePanel,
		'tags/:tag': PokedexTagPanel,
		'items/:item': PokedexItemPanel,
		'abilities/:ability': PokedexAbilityPanel,
		'types/:type': PokedexTypePanel,
		'egggroups/:egggroup': PokedexEggGroupPanel,
		'encounters/:location': PokedexEncountersPanel,
		'encounterlist/': PokedexEncounterListPanel,
		'itemlocations/': PokedexItemLocationsPanel,

		'': PokedexSearchPanel,
		'pokemon/': PokedexSearchPanel,
		'moves/': PokedexSearchPanel,
		'encounters/': PokedexSearchPanel,
		':q': PokedexSearchPanel
	},
	initialize: function() {
		this.routePanel('*path', PokedexSearchPanel); // catch-all default

		for (var i in this.states2) {
			this.routePanel(i, this.states2[i]);
		}
	},
	handleContextMenu: function(e) {
		var target = $(e.currentTarget);
		var compareFragment = this.extractPokemonFragment(target);
		if (!compareFragment) return;

		var basePanel = this.getCompareBasePanel();
		if (!basePanel) return;

		e.preventDefault();
		e.stopImmediatePropagation();

		var compareName = this.extractPokemonName(target, compareFragment);
		if (this.popups && this.popups.length) this.closePopup();
		this.addPopup(PokedexComparePopup, {
			source: target,
			basePanel: basePanel,
			compareFragment: compareFragment,
			compareName: compareName,
			hasComparePanel: !!this.getRightComparePanel(basePanel)
		});
	},
	extractPokemonFragment: function(target) {
		var linkHref = target.data('href') || target.attr('href') || '';
		if (!linkHref) return '';

		linkHref = '' + linkHref;
		if (linkHref.substr(0, this.root.length) === this.root) {
			linkHref = linkHref.substr(this.root.length);
		}
		var match = linkHref.match(/(?:^|\/)pokemon\/([^\/?#]+)/i);
		if (!match || !match[1]) return '';

		var id = match[1];
		try {
			id = decodeURIComponent(id);
		} catch (err) {}
		id = toID(id);
		if (!id) return '';
		return 'pokemon/' + id;
	},
	extractPokemonName: function(target, fragment) {
		var entry = target.attr('data-entry') || '';
		if (entry.indexOf('pokemon|') === 0) return entry.substr(8);
		var id = fragment.substr(8);
		var species = Dex.species.get(id);
		if (species.exists) return species.name;
		return id;
	},
	getCompareBasePanel: function() {
		for (var index = this.i; index >= this.j; index--) {
			var panel = this.panels[index];
			if (!panel || !panel.fragment) continue;
			if (panel.fragment.indexOf('pokemon/') === 0) return panel;
		}
		return null;
	},
	getRightComparePanel: function(basePanel) {
		if (!basePanel) return null;
		var baseIndex = this.getPanelIndex(basePanel);
		if (baseIndex < 0) return null;
		var rightPanel = this.panels[baseIndex + 1];
		if (!rightPanel || !rightPanel.fragment) return null;
		if (rightPanel.fragment.indexOf('pokemon/') !== 0) return null;
		return rightPanel;
	},
	openPokemonCompare: function(compareFragment, basePanel, source) {
		if (!compareFragment || compareFragment.indexOf('pokemon/') !== 0) return false;
		if (!basePanel) basePanel = this.getCompareBasePanel();
		if (!basePanel || basePanel.fragment === compareFragment) return false;
		this.go(compareFragment, basePanel, false, source);
		return true;
	},
	closePokemonCompare: function(basePanel) {
		if (!basePanel) basePanel = this.getCompareBasePanel();
		if (!basePanel) return false;
		var comparePanel = this.getRightComparePanel(basePanel);
		if (!comparePanel) return false;
		this.slicePanel(basePanel);
		return true;
	}
});
var pokedex = new Pokedex();
