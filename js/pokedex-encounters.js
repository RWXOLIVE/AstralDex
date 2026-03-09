
var PokedexEncountersPanel = PokedexResultPanel.extend({
	initialize: function(id) {
		id = toID(id);
		var location = BattleLocationdex[id];
		this.id = id;
		if (!location || !location.name) {
			this.shortTitle = id || "not found";
			this.html(
				'<div class="pfx-body dexentry"><a href="/" class="pfx-backbutton button" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a><h1>Encounter zone not found</h1><p>No encounter data exists for <code>' +
				BattleLog.escapeHTML(id) +
				'</code>.</p></div>'
			);
			return;
		}
		this.shortTitle = location.name;

		var buf = '<div class="pfx-body dexentry">';

		buf += '<a href="/" class="pfx-backbutton button" data-target="back"><i class="fa fa-chevron-left"></i> Pokédex</a>';
		buf += '<h1><a href="/encounters/'+id+'" data-target="push" class="button subtle">'+location.name+'</a></h1>';

		// distribution
		buf += '<ul class="utilichart metricchart nokbd">';
		buf += '</ul>';

		buf += '</div>';

		this.html(buf);

		setTimeout(this.renderDistribution.bind(this));
	},
	getDistribution: function() {
		if (this.results) return this.results;
		if (!window.BattleLocationdex || !BattleLocationdex.rates) return this.results = [];

        var landRates = BattleLocationdex['rates']['land']
		var oldRodRates = BattleLocationdex['rates']['fish']['old']
        var goodRodRates = BattleLocationdex['rates']['fish']['good']
        var superRodRates = BattleLocationdex['rates']['fish']['super']
        var surfRates = BattleLocationdex['rates']['surf']
        var rockRates = BattleLocationdex['rates']['rock']        

		var location = this.id;
		var locationData = BattleLocationdex[location];
		if (!locationData) return this.results = [];
		var results = [];

        var formatRate = function(i) {
            return i.toString().padStart(2, 'z') + '% '
        }

        var formatRange = function(min, max) {
            return min.toString().padStart(3, '0') + '-' + max.toString().padStart(3, '0') + ' '
        }

        if (locationData['land'] && locationData['land']['encs'] !== undefined) {
            for (let i = 0; i < locationData['land']['encs'].length; i++) {
                let enc = locationData['land']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('L' + formatRate(landRates[i]) + formatRange(min, max) + mon);
            }
        }

        if (locationData['surf'] && locationData['surf']['encs'] !== undefined) {
            for (let i = 0; i < locationData['surf']['encs'].length; i++) {
                let enc = locationData['surf']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('W' + formatRate(surfRates[i]) + formatRange(min, max) + mon);
            }
        }

        if (locationData['rock'] && locationData['rock']['encs'] !== undefined) {
            for (let i = 0; i < locationData['rock']['encs'].length; i++) {
                let enc = locationData['rock']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('R' + formatRate(rockRates[i]) + formatRange(min, max) + mon);
            }
        }

        if (locationData['fish'] && locationData['fish']['encs'] !== undefined) {
            var oldStart = 0;
            for (let i = 0; i < oldRodRates.length; i++) {
                let enc = locationData['fish']['encs'][i + oldStart];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('O' + formatRate(oldRodRates[i]) + formatRange(min, max) + mon);
            }

            var goodStart = oldRodRates.length + oldStart;
            for (let i = 0; i < goodRodRates.length; i++) {
                let enc = locationData['fish']['encs'][i + goodStart];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('G' + formatRate(goodRodRates[i]) + formatRange(min, max) + mon);
            }

            var superStart = goodRodRates.length + goodStart;
            for (let i = 0; i < superRodRates.length; i++) {
                let enc = locationData['fish']['encs'][i + superStart];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('S' + formatRate(superRodRates[i]) + formatRange(min, max) + mon);
            }
        }

		var last = '';
		for (var i=0; i<results.length; i++) {
			if (results[i].charAt(0) !== last) {
				results.splice(i, 0, results[i].charAt(0).toUpperCase());
				i++;
			}
			last = results[i].charAt(0);
		}
		return this.results = results;
	},
	renderDistribution: function() {
		var results = this.getDistribution();
		this.$chart = this.$('.utilichart');

		if (results.length > 1600/33) {
			this.streamLoading = true;
			this.$el.on('scroll', this.handleScroll.bind(this));

			var panelTop = this.$el.children().offset().top;
			var panelHeight = this.$el.outerHeight();
			var chartTop = this.$chart.offset().top;
			var scrollLoc = this.scrollLoc = this.$el.scrollTop();

			var start = Math.floor((scrollLoc - (chartTop-panelTop)) / 33 - 35);
			var end = Math.floor(start + 35 + panelHeight / 33 + 35);
			if (start < 0) start = 0;
			if (end > results.length-1) end = results.length-1;
			this.start = start, this.end = end;

			// distribution
			var buf = '';
			for (var i=0, len=results.length; i<len; i++) {
				buf += '<li class="result">'+this.renderRow(i, i < start || i > end)+'</li>';
			}
			this.$chart.html(buf);
		} else {
			var buf = '';
			for (var i=0, len=results.length; i<len; i++) {
				buf += '<li class="result">'+this.renderRow(i)+'</li>';
			}
			this.$chart.html(buf);
		}
	},
	renderRow: function(i, offscreen) {
		var results = this.results;
		var row = results[i];
		var id = '';
		var rateText = '';
		var levelText = '';

		// Header rows are single-letter mode markers inserted in getDistribution.
		if (row.length > 1) {
			var parts = row.substr(1).trim().split(/\s+/);
			if (parts.length >= 3) {
				rateText = parts[0].replace(/z/g, '');
				var range = parts[1].split('-');
				var min = parseInt(range[0], 10);
				var max = parseInt(range[1], 10);
				levelText = (min === max) ? ('Lv ' + min) : ('Lv ' + min + '-' + max);
				id = parts[2];
			}
		}

		var template = id ? BattlePokedex[id] : undefined;
		if (!template) {
			switch (row.charAt(0)) {
			case 'L':
				return '<h3>Land</h3>';
			case 'O':
				return '<h3>Old Rod</h3>';
            case 'G':
				return '<h3>Good Rod</h3>';	
			case 'S':
				return '<h3>Fishing</h3>';
			case 'W':
				return '<h3>Surfing</h3>';
			case 'R':
				return '<h3>Rock Smash</h3>';
            
			}
			return '<pre>error: "'+results[i]+'"</pre>';
		} else if (offscreen) {
			return ''+template.name+' '+template.abilities['0']+' '+(template.abilities['1']||'')+' '+(template.abilities['H']||'')+'';
		} else {
			var desc = rateText + ' ' + levelText;
			return BattleSearch.renderTaggedLocationRowInner(template, desc, undefined, id);
		}
	},
	handleScroll: function() {
		var scrollLoc = this.$el.scrollTop();
		if (Math.abs(scrollLoc - this.scrollLoc) > 20*33) {
			this.renderUpdateDistribution();
		}
	},
	debouncedPurgeTimer: null,
	renderUpdateDistribution: function(fullUpdate) {
		if (this.debouncedPurgeTimer) {
			clearTimeout(this.debouncedPurgeTimer);
			this.debouncedPurgeTimer = null;
		}

		var panelTop = this.$el.children().offset().top;
		var panelHeight = this.$el.outerHeight();
		var chartTop = this.$chart.offset().top;
		var scrollLoc = this.scrollLoc = this.$el.scrollTop();

		var results = this.results;

		var rowFit = Math.floor(panelHeight / 33);

		var start = Math.floor((scrollLoc - (chartTop-panelTop)) / 33 - 35);
		var end = start + 35 + rowFit + 35;
		if (start < 0) start = 0;
		if (end > results.length-1) end = results.length-1;

		var $rows = this.$chart.children();

		if (fullUpdate || start < this.start - rowFit - 30 || end > this.end + rowFit + 30) {
			var buf = '';
			for (var i=0, len=results.length; i<len; i++) {
				buf += '<li class="result">'+this.renderRow(i, (i < start || i > end))+'</li>';
			}
			this.$chart.html(buf);
			this.start = start, this.end = end;
			return;
		}

		if (start < this.start) {
			for (var i = start; i<this.start; i++) {
				$rows[i].innerHTML = this.renderRow(i);
			}
			this.start = start;
		}

		if (end > this.end) {
			for (var i = this.end+1; i<=end; i++) {
				$rows[i].innerHTML = this.renderRow(i);
			}
			this.end = end;
		}

		if (this.end - this.start > rowFit+90) {
			var self = this;
			this.debouncedPurgeTimer = setTimeout(function() {
				self.renderUpdateDistribution(true);
			}, 1000);
		}
	}
});
