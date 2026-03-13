var PokedexItemLocationsPanel = Panels.Panel.extend({
	minWidth: 639,
	maxWidth: 639,
	sidebarWidth: 280,
	events: {
		'click .tabbar button': 'clickTab',
		'keyup input.searchbox': 'updateFilter',
		'change input.searchbox': 'updateFilter',
		'search input.searchbox': 'updateFilter',
		'submit': 'submit'
	},
	initialize: function () {
		this.locations = this.buildLocations();

		var buf = '<div class="pfx-body"><form class="pokedex">';
		buf += '<h1><a href="/" data-target="replace">Astral Emerald Pok&eacute;dex</a></h1>';
		buf += '<h4>Modified from <a href="https://dex.pokemonshowdown.com/">Pok&eacute;mon Showdown Dex</a> for Porydex</h4>';
		buf += '<ul class="tabbar centered" style="margin-bottom: 18px"><li><button class="button nav-first" value="">Search</button></li>';
		buf += '<li><button class="button" value="pokemon/">Pok&eacute;mon</button></li>';
		buf += '<li><button class="button" value="encounters/">Encounters</button></li>';
		buf += '<li><button class="button cur" value="itemlocations/">Item Locations</button></li>';
		buf += '<li><button class="button nav-last" value="moves/">Moves</button></li></ul>';
		buf += '<div class="searchboxwrapper"><input class="textbox searchbox" type="search" name="q" value="" autocomplete="off" autofocus placeholder="Filter item locations by area or item name" /></div>';
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
	updateFilter: function (e) {
		this.renderList(e.currentTarget.value || '');
	},
	buildLocations: function () {
		var locations = [];
		var dex = window.BattleItemLocationdex || {};
		for (var id in dex) {
			var location = dex[id];
			if (!location || !location.items || !location.items.length) continue;
			locations.push({
				id: id,
				name: location.name || id,
				items: location.items
			});
		}
		locations.sort(function (a, b) {
			return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
		});
		return locations;
	},
	renderList: function (query) {
		var q = toID(query || '');
		var buf = '<ul class="utilichart">';
		var shownLocations = 0;

		for (var i = 0; i < this.locations.length; i++) {
			var location = this.locations[i];
			var locationNameMatches = !q || toID(location.name).indexOf(q) >= 0;
			var rows = '';

			for (var j = 0; j < location.items.length; j++) {
				var entry = location.items[j];
				var itemMatch = !q || toID(entry.item || entry.itemConst || '').indexOf(q) >= 0;
				if (!locationNameMatches && !itemMatch) continue;
				rows += this.renderItemRow(entry);
			}

			if (!rows) continue;
			shownLocations++;
			buf += '<li class="resultheader"><h3>' + Dex.escapeHTML(location.name) + '</h3></li>';
			buf += rows;
		}

		if (!shownLocations) {
			buf += '<li class="result"><div class="notfound"><em>No matching item locations.</em></div></li>';
		}

		buf += '</ul>';
		this.$('.results').html(buf);
	},
	renderItemRow: function (entry) {
		var kind = entry.kind || 'Field';
		var itemName = entry.item || entry.itemConst || 'Unknown Item';
		var itemId = entry.itemId || toID(itemName);

		var dexItem = Dex.items.get(itemId);
		var hasItemPage = !!(dexItem && dexItem.exists);
		var attrs = hasItemPage ? ' href="/items/' + itemId + '" data-target="push"' : '';
		var iconStyle = hasItemPage ? Dex.getItemIcon(dexItem) : '';
		var icon = iconStyle ? ('<span style="' + iconStyle + '"></span>') : '';

		var buf = '<li class="result"><a' + attrs + ' class="itemlocationrow">';
		buf += '<span class="col tagcol shorttagcol itemlocationtagcol">' + Dex.escapeHTML(kind) + '</span> ';
		buf += '<span class="col itemiconcol">' + icon + '</span> ';
		buf += '<span class="col namecol itemlocationnamecol">' + Dex.escapeHTML(itemName) + '</span> ';
		buf += '</a></li>';
		return buf;
	}
});
