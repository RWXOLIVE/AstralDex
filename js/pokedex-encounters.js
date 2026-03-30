
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
		this.hideRates = !!location.hideRates;

		var buf = '<div class="pfx-body dexentry">';

		buf += '<a href="/" class="pfx-backbutton button" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
		buf += '<h1><a href="/encounters/'+id+'" data-target="push" class="button subtle">'+location.name+'</a></h1>';

		// distribution
		buf += '<ul class="utilichart metricchart nokbd">';
		buf += '</ul>';

		buf += '</div>';

		this.html(buf);
		this.handleDupeUpdate = this.handleDupeUpdate.bind(this);
		$(document).on('encounterlist:dupes-updated.' + this.cid, this.handleDupeUpdate);

		setTimeout(this.renderDistribution.bind(this));
	},
	remove: function() {
		$(document).off('encounterlist:dupes-updated.' + this.cid);
		PokedexResultPanel.prototype.remove.apply(this, arguments);
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
		var hideRates = !!locationData.hideRates;

        var formatRate = function(i) {
            if (hideRates) return '';
            if (i === undefined || i === null) i = 0;
            return i.toString().padStart(2, 'z') + '% '
        }

        var formatRange = function(min, max) {
            return min.toString().padStart(3, '0') + '-' + max.toString().padStart(3, '0') + ' '
        }

        if (hideRates) {
            var pushCustomRows = function(modeData) {
                if (!modeData || !modeData['encs']) return;
                for (let i = 0; i < modeData['encs'].length; i++) {
                    let enc = modeData['encs'][i];
                    let min = enc.minLvl;
                    let max = enc.maxLvl;
                    let mon = enc.species;
                    results.push('E' + formatRange(min, max) + mon);
                }
            };
            pushCustomRows(locationData['land']);
            pushCustomRows(locationData['surf']);
            pushCustomRows(locationData['rock']);
            pushCustomRows(locationData['fish']);
        } else {
        var landRateTable = (locationData['land'] && locationData['land']['rates'] && locationData['land']['rates'].length) ? locationData['land']['rates'] : landRates;
        if (locationData['land'] && locationData['land']['encs'] !== undefined) {
            for (let i = 0; i < locationData['land']['encs'].length; i++) {
                let enc = locationData['land']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('L' + formatRate(landRateTable[i]) + formatRange(min, max) + mon);
            }
        }

        var surfRateTable = (locationData['surf'] && locationData['surf']['rates'] && locationData['surf']['rates'].length) ? locationData['surf']['rates'] : surfRates;
        if (locationData['surf'] && locationData['surf']['encs'] !== undefined) {
            for (let i = 0; i < locationData['surf']['encs'].length; i++) {
                let enc = locationData['surf']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('W' + formatRate(surfRateTable[i]) + formatRange(min, max) + mon);
            }
        }

        var rockRateTable = (locationData['rock'] && locationData['rock']['rates'] && locationData['rock']['rates'].length) ? locationData['rock']['rates'] : rockRates;
        if (locationData['rock'] && locationData['rock']['encs'] !== undefined) {
            for (let i = 0; i < locationData['rock']['encs'].length; i++) {
                let enc = locationData['rock']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('R' + formatRate(rockRateTable[i]) + formatRange(min, max) + mon);
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
		this.updateDupeHighlightClasses();
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
			if (parts.length >= 2) {
				var rangeToken = '';
				if (parts.length >= 3) {
					rateText = parts[0].replace(/z/g, '');
					rangeToken = parts[1];
					id = parts[2];
				} else {
					rangeToken = parts[0];
					id = parts[1];
				}
				var range = rangeToken.split('-');
				var min = parseInt(range[0], 10);
				var max = parseInt(range[1], 10);
				levelText = (min === max) ? ('Lv ' + min) : ('Lv ' + min + '-' + max);
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
            case 'E':
				return '<h3>Gift/Static</h3>';
            
			}
			return '<pre>error: "'+results[i]+'"</pre>';
		} else if (offscreen) {
			return ''+template.name+' '+template.abilities['0']+' '+(template.abilities['1']||'')+' '+(template.abilities['H']||'')+'';
		} else {
			var desc = '';
			if (!this.hideRates && rateText) {
				desc += rateText + ' ';
			}
			desc += levelText;
			var rowHtml = BattleSearch.renderTaggedLocationRowInner(template, desc, undefined, id);
			return this.decorateDupeEncounterRow(rowHtml, id);
		}
	},
	decorateDupeEncounterRow: function(rowHtml, speciesId) {
		var cleanId = toID(speciesId);
		if (!cleanId) return rowHtml;
		var decorated = rowHtml.replace(/^<a\b/, '<a data-encounter-species="' + BattleLog.escapeHTML(cleanId) + '"');
		if (this.isDupeSpecies(cleanId)) {
			decorated = decorated.replace(/^<a\b/, '<a class="encounter-dupe"');
		}
		return decorated;
	},
	isDupeSpecies: function(speciesId) {
		return !!(window.PokedexEncounterDupeStore &&
			PokedexEncounterDupeStore.isDupe &&
			PokedexEncounterDupeStore.isDupe(speciesId));
	},
	handleDupeUpdate: function() {
		this.updateDupeHighlightClasses();
	},
	updateDupeHighlightClasses: function() {
		if (!this.$chart || !this.$chart.length) this.$chart = this.$('.utilichart');
		if (!this.$chart || !this.$chart.length) return;
		var self = this;
		this.$chart.find('a[data-encounter-species]').each(function() {
			var $row = $(this);
			var speciesId = toID($row.attr('data-encounter-species'));
			$row.toggleClass('encounter-dupe', self.isDupeSpecies(speciesId));
		});
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
