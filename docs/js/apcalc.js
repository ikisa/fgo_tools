var ready4Apcalc = function() {
	let fnNm = "Ap";
	console.log("[%s] start.", fnNm);

    // event binding
	$("#apcalc-calc").on("click", function(){

		let nowap = $("#input_now_ap").val();
	    if (!$.isNumeric(nowap)) { nowap = 0; }
	    else if (nowap < 0) { nowap = 0; }

		let nowlv = $("#input_now_level").val();
	    if (!$.isNumeric(nowlv)) { nowlv = 0; }
	    else if (nowlv < 0) { nowlv = 0; }

		let param = { ap : nowap, time : new Date() };

		let result = apcalculator(nowlv, param);

		showResult(result);

		return false;
	});

	initApc();

	$("#input_now_level").select();

	console.log("[%s] end.", fnNm);
}
readyArray.push(ready4Apcalc);


var initApc = function() {

	let startlv = 0;
	let startap = 0;
	let starttime = new Date();

	// let startlv = 134;
	// let startap = 32;
	// let starttime = new Date("2017/06/16 23:06:12");

	// Storageから取り出す。
	let data = getDataToStorage(STORAGE_NAMESPACE.APCALC);
	if (data) {
		if (data.start) {
			startlv = data.start.lv;
			startap = data.start.ap;
			starttime = data.start.time;
		}
	}



	let param = { ap : startap, time : starttime };



	$("#input_now_level").val(startlv);
	$("#input_now_ap").val(startap);

	let result = apcalculator(startlv, param);
	showResult(result);
}

const AP_KAIFUKU_MIN = 5;

/**
 * Ap Calc
 * 
 * @return {[type]} [description]
 */
var apcalculator = function(nowlv, start) {
	let fnNm = "apcalculator";
	console.log("%s start.", fnNm);

	let startap = start.ap;
	let starttime = start.time;

	let sKey = "lv" + zeroPadding(nowlv, 3);
	// console.log("[%s][%s]", sKey, M001_LEVEL[sKey]);
	let maxap;
	if (M001_LEVEL[sKey]) {
		maxap = M001_LEVEL[sKey].maxap;
	} else {
		maxap = 0;
	}
	// console.log("[%s]", maxap);

    let diffap = maxap - startap;
    let addMin4full = diffap * AP_KAIFUKU_MIN;

	let fulltime = new Date();
    fulltime.setMinutes(starttime.getMinutes() + addMin4full);

    let aftperiod = {
    	hours : parseInt(addMin4full / 60),
    	minutes : (addMin4full % 60)
    }

    let nowtime = new Date();

	let difftime = miniuteDistance(starttime, nowtime);
	console.log("[%s]", difftime);

	let nowap = startap + parseInt(difftime / AP_KAIFUKU_MIN);

	let dummyResult = {
		start : { lv:nowlv, ap:startap, time:toLocaleString(starttime) },
		now   : { ap:nowap, time:toLocaleString(nowtime) },
		full  : { ap:maxap, time:toLocaleString(fulltime), after: aftperiod },
	};

	console.log("%s end.", fnNm);
	return dummyResult;
}




/**
 * show apcalc result
 * 
 * @param  {[type]} result [description]
 * @return {[type]}        [description]
 */
var showResult = function(result) {
	$("#apcalc-result .row").empty();

	let baseCardAp = "<div class=\"medium-3 column\"><div class=\"card\"><div class=\"card-divider\">％title％</div><div class=\"card-section\"><p class=\"stat\">％value％</p></div></div></div>";
	let baseOffsetAp = "<div class=\"medium-offset-3 column\"></div>";

	let baseCardTime = "<div class=\"medium-3 column\"><div class=\"card\"><div class=\"card-divider\">％title％</div><div class=\"card-section\"><p>％value％</p></div></div></div>";
	let baseOffsetTime = "<div class=\"medium-offset-3 column\"></div>";

	$("#apcalc-result .row:eq(0)")
		.append($(baseCardTime.replace(/％title％/, "Start Time").replace(/％value％/, result.start.time)))
		.append($(baseCardTime.replace(/％title％/, "Now Time").replace(/％value％/, result.now.time)))
		.append($(baseCardTime.replace(/％title％/, "Full Time").replace(/％value％/, result.full.time + "<br />(after " + result.full.after.hours + "h " + result.full.after.minutes + "m)")))
		.append($(baseOffsetTime));

	$("#apcalc-result .row:eq(1)")
		.append($(baseCardAp.replace(/％title％/, "Start Ap").replace(/％value％/, result.start.ap)))
		.append($(baseCardAp.replace(/％title％/, "Now Ap").replace(/％value％/, result.now.ap)))
		.append($(baseCardAp.replace(/％title％/, "Full Ap").replace(/％value％/, result.full.ap)))
		.append($(baseOffsetAp));

}





