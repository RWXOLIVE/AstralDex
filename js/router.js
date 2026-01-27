var Pokedex = Panels.App.extend({
	topbarView: Topbar,
	backButtonPrefix: '<i class="fa fa-chevron-left"></i> ',
	states2: {
		'pokemon/:pokemon': PokedexPokemonPanel,
		'moves/:move': PokedexMovePanel,
		'items/:item': PokedexItemPanel,
		'abilities/:ability': PokedexAbilityPanel,
		'types/:type': PokedexTypePanel,
		'egggroups/:egggroup': PokedexEggGroupPanel,
        'encounters/:location': PokedexEncountersPanel,

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
	}
});
var pokedex = new Pokedex();

(function () {
  function router() {
    const path = location.pathname.replace(/\/+$/, '');
    const parts = path.split('/').filter(Boolean);

    // /move/Flamethrower
    if (parts[0] === 'move' && parts[1]) {
      renderMovePanel(decodeURIComponent(parts[1]));
      return;
    }

    // /pokemon/Gengar
    if (parts[0] === 'pokemon' && parts[1]) {
      renderPokemonPanel(decodeURIComponent(parts[1]));
      return;
    }

    // default
    if (typeof renderHome === 'function') {
      renderHome();
    }
  }

  // expose navigation helpers
  window.goToMove = function (name) {
    history.pushState({}, '', `/move/${encodeURIComponent(name)}`);
    router();
  };

  window.goToPokemon = function (name) {
    history.pushState({}, '', `/pokemon/${encodeURIComponent(name)}`);
    router();
  };

  window.addEventListener('popstate', router);
  window.addEventListener('load', router);
})();

