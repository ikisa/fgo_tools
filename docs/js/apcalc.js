var ready4Apcalc = function() {
	let fnNm = "Ap";
	console.log("[%s] start.", fnNm);

	if (!enableStorage()) {
		$("#apcalc-switch_save_area").hide();
	}

    // event binding
	$("#apcalc-calc").on("click", function(){

		let nowap = $("#apcalc-input_now_ap").val();
	    if (!$.isNumeric(nowap)) { nowap = 0; }
	    else if (nowap < 0) { nowap = 0; }

		let nowlv = $("#apcalc-input_now_level").val();
	    if (!$.isNumeric(nowlv)) { nowlv = 0; }
	    else if (nowlv < 0) { nowlv = 0; }

		let param = { ap : nowap, time : new Date() };

		let result = apcalculator(nowlv, param);

		showResult(result);

		return false;
	});

	initApc();

	$("#apcalc-input_now_ap").select();

	$("input").on("click", function(){ $(this).select(); });

	console.log("[%s] end.", fnNm);
}
readyArray.push(ready4Apcalc);


var initApc = function() {

	let startlv = 0;
	let startap = 0;
	let starttime = new Date();
	let flg = false;

	// Storageから取り出す。
	let data = getDataToStorage(STORAGE_NAMESPACE.APCALC);
	if (data) {
		if (data.start) {
			startlv = data.start.lv;
			startap = data.start.ap;
			starttime = new Date(data.start.time);
			flg = data.flg;
		}
	}

	let param = { ap : startap, time : starttime };

	$("#apcalc-input_now_level").val(startlv);
	$("#apcalc-input_now_ap").val(startap);
	$("#apcalc-switch_save").prop({"checked": flg});

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
	let maxap;
	if (M001_LEVEL[sKey]) {
		maxap = M001_LEVEL[sKey].maxap;
	} else {
		maxap = 0;
	}

    let diffap = maxap - startap;
    let addMin4full = diffap * AP_KAIFUKU_MIN;

	let fulltime = new Date();
	console.log(starttime)
    fulltime.setMinutes(starttime.getMinutes() + addMin4full);

    let aftperiod = {
    	hours : parseInt(addMin4full / 60),
    	minutes : (addMin4full % 60)
    }

    let nowtime = new Date();

	let difftime = miniuteDistance(starttime, nowtime);

	let nowap = parseInt(startap) + parseInt(difftime / AP_KAIFUKU_MIN);

	let result = {
		flg   : $("#apcalc-switch_save").prop("checked"),
		start : { lv:nowlv, ap:startap, time:toLocaleString(starttime) },
		now   : { ap:nowap, time:toLocaleString(nowtime) },
		full  : { ap:maxap, time:toLocaleString(fulltime), after: aftperiod },
	};

	if ($("#apcalc-switch_save").prop("checked")) {
		setDataToStorage(STORAGE_NAMESPACE.APCALC, result);
	} else {
		setDataToStorage(STORAGE_NAMESPACE.APCALC, undefined);
	}

	console.log("%s end.", fnNm);
	return result;
}

/**
 * show apcalc result
 * 
 * @param  {[type]} result [description]
 * @return {[type]}        [description]
 */
var showResult = function(result) {
	$("#apcalc-result .row").empty();

	let baseCardTime = "<div class=\"medium-3 column\"><div class=\"card\"><div class=\"card-divider\">％title％</div><div class=\"card-section\"><p>％value％</p></div></div></div>";
	let baseOffsetTime = "<div class=\"medium-offset-3 column\"></div>";

	let idx = 0;
	$("#apcalc-result .row:eq(" + idx + ")")
		.append($(baseCardTime.replace(/％title％/, "Full").replace(/％value％/, result.full.time + "<br />(AP : " + result.full.ap + ", after " + result.full.after.hours + "h " + result.full.after.minutes + "m)")))
		.append($(baseCardTime.replace(/％title％/, "Now").replace(/％value％/, result.now.time + "<br />(AP : " + result.now.ap + ")")))
		.append($(baseCardTime.replace(/％title％/, "Start").replace(/％value％/, result.start.time + "<br />(AP : " + result.start.ap + ")")))
		.append($(baseOffsetTime));

}
