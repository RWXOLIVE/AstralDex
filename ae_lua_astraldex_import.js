(function(global){
var payload={"events":[],"pokemon":{"storage":[],"party":[{"metLevel":5,"speciesId":498,"metLocationName":"Fateful Encounter","location":"party","setName":"ae_lua Party 1","nickname":"Tepig","species":"Tepig","otId":3858181562,"ability":"Iron Fist","item":"","id":"party:0:498:1268250291:3858181562","moves":["Tackle","Ember","Tail Whip","(No Move)"],"nature":"Mild","level":5,"ivs":{"spd":31,"hp":13,"spe":31,"def":18,"spa":30,"atk":31},"personality":1268250291,"slotIndex":0,"evs":{"spd":0,"hp":0,"spe":0,"def":0,"spa":0,"atk":0},"metLocationHex":"0xFF","metLocation":255}]},"version":1,"astralDex":{"importJavaScript":"(function(){var key=\"porydex-encounter-selections\";var incoming={\"starterlocation\":\"tepig\"};var current={};try{current=JSON.parse(localStorage.getItem(key)||\"{}\")}catch(e){}localStorage.setItem(key,JSON.stringify(Object.assign(current||{},incoming||{})));location.reload();})();","encounterSelections":{"starterlocation":"tepig"},"sources":{"starterlocation":[{"metLevel":5,"speciesId":498,"metLocationName":"Fateful Encounter","location":"party","astralDexSpeciesId":"tepig","nickname":"Tepig","species":"Tepig","metLocation":255,"slotIndex":0,"id":"party:0:498:1268250291:3858181562","metLocationHex":"0xFF","encounterSpeciesId":"tepig"}]},"storageKey":"porydex-encounter-selections"},"sessionId":"ae_lua:2026-06-30T19:51:01Z","updatedAt":"2026-06-30T19:51:08Z","source":"ae_lua","deaths":[]};
var storageKey="porydex-encounter-selections";
function own(value,key){return Object.prototype.hasOwnProperty.call(value,key);}
function objectKeys(value){var keys=[];for(var key in value){if(own(value,key))keys.push(key);}return keys;}
function asObject(value){return value&&typeof value==="object"&&!Array.isArray(value)?value:{}}
function readSelections(){try{return asObject(JSON.parse(global.localStorage.getItem(storageKey)||"{}"));}catch(err){return {};}}
function importAeLuaAstralDexEncounters(source){
source=asObject(source);
var dex=asObject(source.astralDex||source);
var incoming=asObject(dex.encounterSelections||dex.selections);
var current=readSelections();
var applied={};
var changed=false;
var keys=objectKeys(incoming);
for(var i=0;i<keys.length;i++){
var locationId=String(keys[i]||"");
var speciesId=String(incoming[locationId]||"");
if(!locationId||!speciesId)continue;
applied[locationId]=speciesId;
if(current[locationId]!==speciesId){current[locationId]=speciesId;changed=true;}
}
global.localStorage.setItem(storageKey,JSON.stringify(current));
var result={changed:changed,count:objectKeys(applied).length,selections:applied,storageKey:storageKey};
if(typeof global.CustomEvent==="function"&&typeof global.dispatchEvent==="function"){global.dispatchEvent(new global.CustomEvent("ae-lua-astraldex-import",{detail:result}));}
return result;
}
global.AE_LUA_FRAG_EXPORT=payload;
global.AE_LUA_ASTRALDEX_EXPORT=asObject(payload.astralDex);
global.importAeLuaAstralDexEncounters=importAeLuaAstralDexEncounters;
var host=String(global.location&&global.location.hostname||"");
var shouldAutoImport=!global.AE_LUA_ASTRALDEX_SKIP_AUTO_IMPORT&&(host==="astral-dex.vercel.app"||!!(global.document&&global.document.querySelector&&global.document.querySelector(".encounterlist-catch")));
if(shouldAutoImport&&global.localStorage){
var result=importAeLuaAstralDexEncounters(payload);
if(result.changed&&global.location&&typeof global.location.reload==="function"){global.location.reload();}
}
})(typeof window!=="undefined"?window:this);
