
var STORAGE_NAMESPACE = {};
STORAGE_NAMESPACE.APCALC = "apcalc";

var enableStorage = function() {
    try {
        if (typeof localStorage === 'undefined') {
            return false;
        } else if (window.localStorage) {
            //detect IE10 and private mode
        }
    } catch(e) {
        return false;
    }
    return true;
}


var setDataToStorage = function(namespace, data) {
	if (!enableStorage()) return;
	storage.setItem(namespace, JSON.stringify(data));
}

var getDataToStorage = function(namespace) {
	if (!enableStorage()) return undefined;
	let result;
	try {
		result = JSON.parse(storage.getItem(namespace))	
	} catch(e) {
		return undefined;
	}
	return result;
}

var setItemToStorage = function(namespace, key, val) {
	if (!enableStorage()) return;
	let data = getDataToStorage(namespace);
	data[key] = val;
	setDataToStorage(namespace, data);
}

var getItemToStorage = function(namespace, key) {
	if (!enableStorage()) return undefined;
	let result = undefined;
	try {
		let data = getDataToStorage(namespace);
		result = data[key];
	} catch(e) {
		return undefined;
	}
	return result;
}


/* --- master data --- */


var M001_LEVEL = {
  "lv001" : { "maxap": 20, "cost":25 },
  "lv002" : { "maxap": 21, "cost":26 },
  "lv003" : { "maxap": 22, "cost":27 },
  "lv004" : { "maxap": 23, "cost":28 },
  "lv005" : { "maxap": 24, "cost":31 },
  "lv006" : { "maxap": 25, "cost":32 },
  "lv007" : { "maxap": 26, "cost":33 },
  "lv008" : { "maxap": 27, "cost":34 },
  "lv009" : { "maxap": 28, "cost":35 },
  "lv010" : { "maxap": 31, "cost":38 },
  "lv011" : { "maxap": 32, "cost":39 },
  "lv012" : { "maxap": 33, "cost":40 },
  "lv013" : { "maxap": 34, "cost":41 },
  "lv014" : { "maxap": 35, "cost":42 },
  "lv015" : { "maxap": 38, "cost":45 },
  "lv016" : { "maxap": 39, "cost":46 },
  "lv017" : { "maxap": 40, "cost":47 },
  "lv018" : { "maxap": 41, "cost":48 },
  "lv019" : { "maxap": 42, "cost":49 },
  "lv020" : { "maxap": 45, "cost":52 },
  "lv021" : { "maxap": 46, "cost":53 },
  "lv022" : { "maxap": 47, "cost":53 },
  "lv023" : { "maxap": 48, "cost":54 },
  "lv024" : { "maxap": 49, "cost":54 },
  "lv025" : { "maxap": 50, "cost":55 },
  "lv026" : { "maxap": 51, "cost":55 },
  "lv027" : { "maxap": 52, "cost":56 },
  "lv028" : { "maxap": 53, "cost":56 },
  "lv029" : { "maxap": 54, "cost":56 },
  "lv030" : { "maxap": 55, "cost":59 },
  "lv031" : { "maxap": 56, "cost":60 },
  "lv032" : { "maxap": 57, "cost":60 },
  "lv033" : { "maxap": 58, "cost":61 },
  "lv034" : { "maxap": 59, "cost":61 },
  "lv035" : { "maxap": 60, "cost":62 },
  "lv036" : { "maxap": 61, "cost":62 },
  "lv037" : { "maxap": 62, "cost":63 },
  "lv038" : { "maxap": 63, "cost":63 },
  "lv039" : { "maxap": 64, "cost":63 },
  "lv040" : { "maxap": 65, "cost":66 },
  "lv041" : { "maxap": 66, "cost":67 },
  "lv042" : { "maxap": 67, "cost":67 },
  "lv043" : { "maxap": 68, "cost":68 },
  "lv044" : { "maxap": 69, "cost":68 },
  "lv045" : { "maxap": 70, "cost":69 },
  "lv046" : { "maxap": 71, "cost":69 },
  "lv047" : { "maxap": 72, "cost":70 },
  "lv048" : { "maxap": 73, "cost":70 },
  "lv049" : { "maxap": 74, "cost":70 },
  "lv050" : { "maxap": 75, "cost":73 },
  "lv051" : { "maxap": 76, "cost":74 },
  "lv052" : { "maxap": 77, "cost":74 },
  "lv053" : { "maxap": 78, "cost":75 },
  "lv054" : { "maxap": 79, "cost":75 },
  "lv055" : { "maxap": 80, "cost":76 },
  "lv056" : { "maxap": 81, "cost":76 },
  "lv057" : { "maxap": 82, "cost":77 },
  "lv058" : { "maxap": 83, "cost":77 },
  "lv059" : { "maxap": 84, "cost":78 },
  "lv060" : { "maxap": 85, "cost":78 },
  "lv061" : { "maxap": 86, "cost":79 },
  "lv062" : { "maxap": 87, "cost":79 },
  "lv063" : { "maxap": 88, "cost":80 },
  "lv064" : { "maxap": 89, "cost":80 },
  "lv065" : { "maxap": 90, "cost":81 },
  "lv066" : { "maxap": 91, "cost":81 },
  "lv067" : { "maxap": 92, "cost":82 },
  "lv068" : { "maxap": 93, "cost":82 },
  "lv069" : { "maxap": 94, "cost":83 },
  "lv070" : { "maxap": 95, "cost":83 },
  "lv071" : { "maxap": 96, "cost":84 },
  "lv072" : { "maxap": 97, "cost":84 },
  "lv073" : { "maxap": 98, "cost":85 },
  "lv074" : { "maxap": 99, "cost":85 },
  "lv075" : { "maxap": 100, "cost":86 },
  "lv076" : { "maxap": 101, "cost":86 },
  "lv077" : { "maxap": 102, "cost":87 },
  "lv078" : { "maxap": 103, "cost":87 },
  "lv079" : { "maxap": 104, "cost":88 },
  "lv080" : { "maxap": 105, "cost":88 },
  "lv081" : { "maxap": 106, "cost":89 },
  "lv082" : { "maxap": 107, "cost":89 },
  "lv083" : { "maxap": 108, "cost":90 },
  "lv084" : { "maxap": 109, "cost":90 },
  "lv085" : { "maxap": 110, "cost":91 },
  "lv086" : { "maxap": 111, "cost":91 },
  "lv087" : { "maxap": 112, "cost":92 },
  "lv088" : { "maxap": 113, "cost":92 },
  "lv089" : { "maxap": 114, "cost":93 },
  "lv090" : { "maxap": 115, "cost":93 },
  "lv091" : { "maxap": 116, "cost":94 },
  "lv092" : { "maxap": 117, "cost":94 },
  "lv093" : { "maxap": 118, "cost":95 },
  "lv094" : { "maxap": 119, "cost":95 },
  "lv095" : { "maxap": 120, "cost":96 },
  "lv096" : { "maxap": 121, "cost":96 },
  "lv097" : { "maxap": 122, "cost":97 },
  "lv098" : { "maxap": 123, "cost":97 },
  "lv099" : { "maxap": 124, "cost":98 },
  "lv100" : { "maxap": 125, "cost":98 },
  "lv101" : { "maxap": 126, "cost":99 },
  "lv102" : { "maxap": 126, "cost":100 },
  "lv103" : { "maxap": 127, "cost":100 },
  "lv104" : { "maxap": 127, "cost":101 },
  "lv105" : { "maxap": 128, "cost":101 },
  "lv106" : { "maxap": 128, "cost":102 },
  "lv107" : { "maxap": 129, "cost":102 },
  "lv108" : { "maxap": 129, "cost":103 },
  "lv109" : { "maxap": 130, "cost":103 },
  "lv110" : { "maxap": 130, "cost":104 },
  "lv111" : { "maxap": 131, "cost":104 },
  "lv112" : { "maxap": 131, "cost":105 },
  "lv113" : { "maxap": 132, "cost":105 },
  "lv114" : { "maxap": 132, "cost":106 },
  "lv115" : { "maxap": 133, "cost":106 },
  "lv116" : { "maxap": 133, "cost":107 },
  "lv117" : { "maxap": 134, "cost":107 },
  "lv118" : { "maxap": 134, "cost":108 },
  "lv119" : { "maxap": 135, "cost":108 },
  "lv120" : { "maxap": 135, "cost":109 },
  "lv121" : { "maxap": 136, "cost":109 },
  "lv122" : { "maxap": 136, "cost":109 },
  "lv123" : { "maxap": 136, "cost":110 },
  "lv124" : { "maxap": 136, "cost":110 },
  "lv125" : { "maxap": 137, "cost":110 },
  "lv126" : { "maxap": 137, "cost":110 },
  "lv127" : { "maxap": 137, "cost":111 },
  "lv128" : { "maxap": 137, "cost":111 },
  "lv129" : { "maxap": 138, "cost":111 },
  "lv130" : { "maxap": 138, "cost":111 },
  "lv131" : { "maxap": 138, "cost":111 },
  "lv132" : { "maxap": 138, "cost":111 },
  "lv133" : { "maxap": 139, "cost":111 },
  "lv134" : { "maxap": 139, "cost":111 },
  "lv135" : { "maxap": 139, "cost":111 },
  "lv136" : { "maxap": 139, "cost":111 },
  "lv137" : { "maxap": 140, "cost":111 },
  "lv138" : { "maxap": 140, "cost":111 },
  "lv139" : { "maxap": 140, "cost":111 },
  "lv140" : { "maxap": 140, "cost":111 }
}






