window.AE_LUA_FRAG_EXPORT = window.AE_LUA_FRAG_EXPORT || {
	version: 1,
	source: "ae_lua",
	updatedAt: "",
	events: [],
	deaths: [],
	pokemon: {party: [], storage: []},
	astralDex: {
		storageKey: "porydex-encounter-selections",
		encounterSelections: {},
		sources: {}
	}
};
window.AE_LUA_ASTRALDEX_EXPORT = window.AE_LUA_FRAG_EXPORT.astralDex || {
	storageKey: "porydex-encounter-selections",
	encounterSelections: {},
	sources: {}
};
