var readyCheatsheet = function() {
	let fnNm = "readyCheatsheet";
	console.log("[%s] start.", fnNm);

	$("#cheatsheet input[name='nowlv']").val(1);
	$("#cheatsheet input[name='targetlv']").val(100);

	// bind
	$("#cheatsheet fieldset[name='rarity']").on("click", ":radio", function(){
		setDetail();
	});
	$("#cheatsheet input[name='nowlv']").on("blur", function(){
		setDetail();
	});

	$("#cheatsheet fieldset[name='rarity'] :radio:eq(0)").click();

	console.log("[%s] end.", fnNm);
}
readyArray.push(readyCheatsheet);

function setDetail() {

	console.log("[%s]", $("#cheatsheet [name='rarity']:checked").val());
	console.log("[%s][%s]", $("#cheatsheet #cheatsheet-nowlv").val(), $("#cheatsheet #cheatsheet-targetlv").val());

	let rarity = $("#cheatsheet [name='rarity']:checked").val();
	let nowlv = $("#cheatsheet input[name='nowlv']").val();
	let targetlv = $("#cheatsheet input[name='targetlv']").val();
	$("#cheatsheet-nowlv").text(nowlv + " to Lv" + targetlv);

	let dataArray = calcSummary(rarity, nowlv, targetlv);

	dispSummary(dataArray);
}

function calcSummary(rarity, nowLv, targetLv) {
	let sum = { exp:0, qp:0 };

	// レアリティごとの情報を取得
	let rId = "r" + rarity.toString();
	console.log("[%s]", rId);
	let rInfo = MASTERDATA[rId];
	let qp_bairitsu = rInfo.qp_wariai;

	// 霊基再臨
	let rsltSairin = [];
	for (let sIdx = 0; sIdx < rInfo.sairin.length; sIdx++) {
		let rsInfo = rInfo.sairin[sIdx];
		let reqlv = rsInfo.reqlv;
		let maxlv = rsInfo.maxlv;
		let sSum = { exp:0, qp:0 };
		let startLv = (nowLv > reqlv) ? nowLv : reqlv;

		for (let idx = startLv; idx < maxlv; idx++) {
			sSum.exp += MASTERDATA.exp[idx];
			sSum.qp += MASTERDATA.qp[idx] * qp_bairitsu;
		}

		if (nowLv < maxlv) {
			sum.exp += sSum.exp;
			sum.qp += (sSum.qp + rsInfo.qp);
		}

		rsltSairin.push({ "maxlv":maxlv, "exp":sum.exp, "qp":sum.qp });
	}
	let rsInfo = rInfo.sairin[rInfo.sairin.length - 1];

	// 聖杯転臨
	let rsltTenrin = [];
	let seihai_su = (nowLv > rsInfo.maxlv) ? 0 : 1;
	for (let tIdx = 0; tIdx < rInfo.tenrin.length; tIdx++) {
		let rtInfo = rInfo.tenrin[tIdx];
		let reqlv = rtInfo.reqlv;
		let maxlv = rtInfo.maxlv;
		let sSum = { exp:0, qp:0 };
		let startLv = (nowLv > reqlv) ? nowLv : reqlv;

		for (let idx = startLv; idx < maxlv; idx++) {
			sSum.exp += MASTERDATA.exp[idx];
			sSum.qp += MASTERDATA.qp[idx] * qp_bairitsu;
		}

		if (nowLv < maxlv) {
			sum.exp += sSum.exp;
			sum.qp += (sSum.qp + rtInfo.qp);
		}

		if (nowLv <= maxlv) {
			seihai_su++;
		}

		rsltTenrin.push({ "maxlv":maxlv, "exp":sum.exp, "qp":sum.qp });
	}
	let rtInfo = rInfo.tenrin[rInfo.tenrin.length - 1];

	// スキル
	let nowSkills = { 1:{ lv:1 }, 2:{ lv:1 }, 3:{ lv:1 } };
	let sumSkills = { 1:{ qp:0 }, 2:{ qp:0 }, 3:{ qp:0 } };
	let skillInfo = rInfo.skill;

	for (let key in nowSkills) {
		let item = nowSkills[key];

		for (let idx = item.lv; idx < 10; idx++) {
			let sum = skillInfo[idx].qp;
			sumSkills[key].qp += sum;
		}
	}




	// 結果の設定
	let result = {
		sairin: rsltSairin.reverse(),
		tenrin: rsltTenrin.reverse(),
		seihai: (seihai_su - 1),
		skill: sumSkills,
	}

	console.log("result [" + result + "]");

	// 返戻
	return result;	
}


function dispSummary(dataInfo) {

	let $group = $("#cheatsheet-summary-cardgroup");

	// 空にする
	$group.empty();

	// 以下、確認のためにとりあえず
	$group.append($(dispSummaryCard("聖杯", dataInfo.seihai)));

	let sum = (dataInfo.tenrin[0].qp + dataInfo.skill[1].qp + dataInfo.skill[2].qp + dataInfo.skill[3].qp);
	$group.append($(dispSummaryCard("必要QP", sum.toLocaleString())));

	let item = dataInfo.tenrin[0];
	$group.append($(dispSummaryCard("経験値(Lv" + item.maxlv + ")", item.exp.toLocaleString())));
	$group.append($(dispSummaryCard("QP(Lv" + item.maxlv + ")", item.qp.toLocaleString())));

	item = dataInfo.sairin[0];
	$group.append($(dispSummaryCard("経験値(Lv" + item.maxlv + ")", item.exp.toLocaleString())));
	$group.append($(dispSummaryCard("QP(Lv" + item.maxlv + ")", item.qp.toLocaleString())));

	item = dataInfo.skill;
	$group.append($(dispSummaryCard("QP(Skill 1)", item[1].qp.toLocaleString())));
	$group.append($(dispSummaryCard("QP(Skill 2)", item[2].qp.toLocaleString())));
	$group.append($(dispSummaryCard("QP(Skill 3)", item[3].qp.toLocaleString())));

}

const templateSummaryCard = 
	"<div class=\"cell\">" +
	"  <div class=\"card\">" +
	"    <div class=\"card-section\" style=\"text-align: center;\">" +
	"      <div class=\"stat\">%card-value%</div>" +
	"    </div>" +
	"    <div class=\"card-divider\" style=\"justify-content: center;\">" +
	"      %card-title%" +
	"    </div>" +
	"  </div>" +
	"</div>" +
	"";

function dispSummaryCard(title, value) {
	let newCard = templateSummaryCard;
	newCard = newCard.replace(/%card-title%/g, title);
	newCard = newCard.replace(/%card-value%/g, value);

	return newCard;
}














var MASTERDATA = {
	exp: [
		0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500,
		5500, 6600, 7800, 9100, 10500, 12000, 13600, 15300, 17100, 19000,
		21000, 23100, 25300, 27600, 30000, 32500, 35100, 37800, 40600, 43500,
		46500, 49600, 52800, 56100, 59500, 63000, 66600, 70300, 74100, 78000,
		82000, 86100, 90300, 94600, 99000, 103500, 108100, 112800, 117600, 122500,
		127500, 132600, 137800, 143100, 148500, 154000, 159600, 165300, 171100, 177000,
		183000, 189100, 195300, 201600, 208000, 214500, 221100, 227800, 234600, 241500,
		248500, 255600, 262800, 270100, 277500, 285000, 292600, 300300, 308100, 316000,
		324000, 332100, 340300, 348600, 357000, 365500, 374100, 382800, 391600, 400500,
		418500, 454900, 510100, 584500, 678500, 792500, 926900, 1082100, 1258500, 1456500
	],
	qp: [
		0, 100, 130, 160, 190, 220, 250, 280, 310, 340,
		370, 400, 430, 460, 490, 520, 550, 580, 610, 640,
		670, 700, 730, 760, 790, 820, 850, 880, 910, 940,
		970, 1000, 1030, 1060, 1090, 1120, 1150, 1180, 1210, 1240,
		1270, 1300, 1330, 1360, 1390, 1420, 1450, 1480, 1510, 1540,
		1570, 1600, 1630, 1660, 1690, 1720, 1750, 1780, 1810, 1840,
		1870, 1900, 1930, 1960, 1990, 2020, 2050, 2080, 2110, 2140,
		2170, 2200, 2230, 2260, 2290, 2320, 2350, 2380, 2410, 2440,
		2470, 2500, 2530, 2560, 2590, 2620, 2650, 2680, 2710, 2740,
		2770, 2800, 2830, 2860, 2890, 2920, 2950, 2980, 3010, 3040
	],
	tane: {
		4: 32400,
	},


	r5: {
		qp_wariai: 6.0,
		sairin: [
			{ reqlv:0, maxlv:50, qp:0, monument: 0, piece: 0, },
			{ reqlv:50, maxlv:60, qp:100000, monument: 5, piece: 0, },
			{ reqlv:60, maxlv:70, qp:300000, monument: 12, piece: 0, },
			{ reqlv:70, maxlv:80, qp:1000000, monument: 0, piece: 5, },
			{ reqlv:80, maxlv:90, qp:300000, monument: 0, piece: 12, },
		],
		tenrin: [
			{ reqlv:90, maxlv:92, qp:9000000 },
			{ reqlv:92, maxlv:94, qp:10000000 },
			{ reqlv:94, maxlv:96, qp:11000000 },
			{ reqlv:96, maxlv:98, qp:12000000 },
			{ reqlv:98, maxlv:100, qp:13000000 },
		],
		skill: [
			{ qp:0, kiseki:0, maseki:0, hiseki:0 },
			{ qp:200000, kiseki:5, maseki:0, hiseki:0 },
			{ qp:400000, kiseki:12, maseki:0, hiseki:0 },
			{ qp:1200000, kiseki:0, maseki:5, hiseki:0 },
			{ qp:1600000, kiseki:0, maseki:12, hiseki:0 },
			{ qp:4000000, kiseki:0, maseki:0, hiseki:5 },
			{ qp:5000000, kiseki:0, maseki:0, hiseki:12 },
			{ qp:10000000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:12000000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:20000000, kiseki:0, maseki:0, hiseki:0 },
		],
	},
	r4: {
		qp_wariai: 4.0,
		sairin: [
			{ reqlv:0, maxlv:40, qp:0, monument: 0, piece: 0, },
			{ reqlv:40, maxlv:50, qp:50000, monument: 4, piece: 0, },
			{ reqlv:50, maxlv:60, qp:150000, monument: 10, piece: 0, },
			{ reqlv:60, maxlv:70, qp:500000, monument: 0, piece: 4, },
			{ reqlv:70, maxlv:80, qp:1500000, monument: 0, piece: 10, },
		],
		tenrin: [
			{ reqlv:80, maxlv:85, qp:4000000 },
			{ reqlv:85, maxlv:90, qp:5000000 },
			{ reqlv:90, maxlv:92, qp:6000000 },
			{ reqlv:92, maxlv:94, qp:7000000 },
			{ reqlv:94, maxlv:96, qp:8000000 },
			{ reqlv:96, maxlv:98, qp:9000000 },
			{ reqlv:98, maxlv:100, qp:10000000 },
		],
		skill: [
			{ qp:0, kiseki:0, maseki:0, hiseki:0 },
			{ qp:100000, kiseki:4, maseki:0, hiseki:0 },
			{ qp:200000, kiseki:10, maseki:0, hiseki:0 },
			{ qp:600000, kiseki:0, maseki:4, hiseki:0 },
			{ qp:800000, kiseki:0, maseki:10, hiseki:0 },
			{ qp:2000000, kiseki:0, maseki:0, hiseki:4 },
			{ qp:2500000, kiseki:0, maseki:0, hiseki:10 },
			{ qp:5000000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:6000000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:10000000, kiseki:0, maseki:0, hiseki:0 },
		],
	},
	r3: {
		qp_wariai: 2.0,
		sairin: [
			{ reqlv:0, maxlv:30, qp:0, monument: 0, piece: 0, },
			{ reqlv:30, maxlv:40, qp:30000, monument: 4, piece: 0, },
			{ reqlv:40, maxlv:50, qp:100000, monument: 8, piece: 0, },
			{ reqlv:50, maxlv:60, qp:300000, monument: 0, piece: 4, },
			{ reqlv:60, maxlv:70, qp:900000, monument: 0, piece: 8, },
		],
		tenrin: [
			{ reqlv:70, maxlv:75, qp:1000000 },
			{ reqlv:75, maxlv:80, qp:2000000 },
			{ reqlv:80, maxlv:85, qp:3000000 },
			{ reqlv:85, maxlv:90, qp:4000000 },
			{ reqlv:90, maxlv:92, qp:5000000 },
			{ reqlv:92, maxlv:94, qp:6000000 },
			{ reqlv:94, maxlv:96, qp:7000000 },
			{ reqlv:96, maxlv:98, qp:8000000 },
			{ reqlv:98, maxlv:100, qp:9000000 },
		],
		skill: [
			{ qp:0, kiseki:0, maseki:0, hiseki:0 },
			{ qp:50000, kiseki:4, maseki:0, hiseki:0 },
			{ qp:100000, kiseki:8, maseki:0, hiseki:0 },
			{ qp:300000, kiseki:0, maseki:4, hiseki:0 },
			{ qp:400000, kiseki:0, maseki:8, hiseki:0 },
			{ qp:1000000, kiseki:0, maseki:0, hiseki:4 },
			{ qp:1250000, kiseki:0, maseki:0, hiseki:8 },
			{ qp:2500000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:3000000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:5000000, kiseki:0, maseki:0, hiseki:0 },
		],
	},
	r2: {
		qp_wariai: 1.5,
		sairin: [
			{ reqlv:0, maxlv:25, qp:0, monument: 0, piece: 0, },
			{ reqlv:25, maxlv:35, qp:15000, monument: 3, piece: 0, },
			{ reqlv:35, maxlv:45, qp:45000, monument: 6, piece: 0, },
			{ reqlv:45, maxlv:55, qp:150000, monument: 0, piece: 3, },
			{ reqlv:55, maxlv:65, qp:450000, monument: 0, piece: 6, },
		],
		tenrin: [
			{ reqlv:65, maxlv:70, qp:600000 },
			{ reqlv:70, maxlv:75, qp:800000 },
			{ reqlv:75, maxlv:80, qp:1000000 },
			{ reqlv:80, maxlv:85, qp:2000000 },
			{ reqlv:85, maxlv:90, qp:3000000 },
			{ reqlv:90, maxlv:92, qp:4000000 },
			{ reqlv:92, maxlv:94, qp:5000000 },
			{ reqlv:94, maxlv:96, qp:6000000 },
			{ reqlv:96, maxlv:98, qp:7000000 },
			{ reqlv:98, maxlv:100, qp:8000000 },
		],
		skill: [
			{ qp:0, kiseki:0, maseki:0, hiseki:0 },
			{ qp:20000, kiseki:3, maseki:0, hiseki:0 },
			{ qp:40000, kiseki:6, maseki:0, hiseki:0 },
			{ qp:120000, kiseki:0, maseki:3, hiseki:0 },
			{ qp:160000, kiseki:0, maseki:6, hiseki:0 },
			{ qp:400000, kiseki:0, maseki:0, hiseki:3 },
			{ qp:500000, kiseki:0, maseki:0, hiseki:6 },
			{ qp:1000000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:1200000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:2000000, kiseki:0, maseki:0, hiseki:0 },
		],
	},
	r1: {
		qp_wariai: 1.0,
		sairin: [
			{ reqlv:0, maxlv:20, qp:0, monument: 0, piece: 0, },
			{ reqlv:20, maxlv:30, qp:10000, monument: 2, piece: 0, },
			{ reqlv:30, maxlv:40, qp:30000, monument: 4, piece: 0, },
			{ reqlv:40, maxlv:50, qp:100000, monument: 0, piece: 2, },
			{ reqlv:50, maxlv:60, qp:300000, monument: 0, piece: 4, },
		],
		tenrin: [
			{ reqlv:60, maxlv:70, qp:400000 },
			{ reqlv:70, maxlv:75, qp:600000 },
			{ reqlv:75, maxlv:80, qp:800000 },
			{ reqlv:80, maxlv:85, qp:1000000 },
			{ reqlv:85, maxlv:90, qp:2000000 },
			{ reqlv:90, maxlv:92, qp:3000000 },
			{ reqlv:92, maxlv:94, qp:4000000 },
			{ reqlv:94, maxlv:96, qp:5000000 },
			{ reqlv:96, maxlv:98, qp:6000000 },
			{ reqlv:98, maxlv:100, qp:7000000 },
		],
		skill: [
			{ qp:0, kiseki:0, maseki:0, hiseki:0 },
			{ qp:10000, kiseki:2, maseki:0, hiseki:0 },
			{ qp:20000, kiseki:4, maseki:0, hiseki:0 },
			{ qp:60000, kiseki:0, maseki:2, hiseki:0 },
			{ qp:80000, kiseki:0, maseki:4, hiseki:0 },
			{ qp:200000, kiseki:0, maseki:0, hiseki:2 },
			{ qp:250000, kiseki:0, maseki:0, hiseki:4 },
			{ qp:500000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:600000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:1000000, kiseki:0, maseki:0, hiseki:0 },
		],
	},
	r0: {
		qp_wariai: 1.5,
		sairin: [
			{ reqlv:0, maxlv:25, qp:0, monument: 0, piece: 0, },
			{ reqlv:25, maxlv:35, qp:15000, monument: 0, piece: 0, },
			{ reqlv:35, maxlv:45, qp:45000, monument: 0, piece: 0, },
			{ reqlv:45, maxlv:55, qp:150000, monument: 0, piece: 0, },
			{ reqlv:55, maxlv:65, qp:450000, monument: 0, piece: 0, },
		],
		tenrin: [
			{ reqlv:65, maxlv:70, qp:600000 },
			{ reqlv:70, maxlv:75, qp:800000 },
			{ reqlv:75, maxlv:80, qp:1000000 },
			{ reqlv:80, maxlv:85, qp:2000000 },
			{ reqlv:85, maxlv:90, qp:3000000 },
			{ reqlv:90, maxlv:92, qp:4000000 },
			{ reqlv:92, maxlv:94, qp:5000000 },
			{ reqlv:94, maxlv:96, qp:6000000 },
			{ reqlv:96, maxlv:98, qp:7000000 },
			{ reqlv:98, maxlv:100, qp:8000000 },
		],
		skill: [
			{ qp:0, kiseki:0, maseki:0, hiseki:0 },
			{ qp:20000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:40000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:120000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:160000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:400000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:500000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:1000000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:1200000, kiseki:0, maseki:0, hiseki:0 },
			{ qp:2000000, kiseki:0, maseki:0, hiseki:0 },
		],
	},

}

