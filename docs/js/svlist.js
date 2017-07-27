var readySvList = function() {
	let fnNm = "readySvList";
	console.log("[%s] start.", fnNm);

	displayTableList(M011_SERVANT);

	// event bind
	$("#svlist-form").on("submit", function(e){
		filterList();
		return e.preventDefault();
	});

	console.log("[%s] end.", fnNm);
}
readyArray.push(readySvList);

var displayTableList = function(list) {

	let $tbl_header = $("#svlist-listarea thead");
	let $tbl_body = $("#svlist-listarea tbody");
	let $tbl_footer = $("#svlist-listarea tfoot");

	let thead_text = "<tr>" + 
					 "  <th>No</th>" + 
					 "  <th>Name</th>" + 
					 "  <th>Class</th>" + 
					 "</tr>";

	$tbl_header.append(thead_text);
	$tbl_footer.append(thead_text);

	$tbl_body.empty();

	let tr_base = "<tr data-open=\"svlist-svinfo\">" +
				  "  <td data-gender=\"％gender％\">％svno％</td>" +
				  "  <td>％svname％</td>" +
				  "  <td>％svclass％</td>" +
				  "</tr>";

	$.each(list, function(idx, data) {
		let new_line = tr_base.replace(/％svno％/, idx);
		new_line = new_line.replace(/％svname％/, data.name);
		new_line = new_line.replace(/％svclass％/, data.classabbr);
		new_line = new_line.replace(/％gender％/, data.gender);

		$tbl_body.append(new_line);
	});

	$("#svlist-listarea tbody").on("click", "tr", function(){
		let key = $(this).find("td:eq(0)").text();
		let data = list[key];

		let info_html = "<h5>No." + zeroPadding(key, 3) + " " + data.name + "</h5>"

		// TODO

		$("#svlist-svinfo .detail").html(info_html);
	});

}

var filterList = function() {
	console.log("[%s]", $("#svlist-listarea tbody tr").length);

	$("#svlist-listarea tbody tr").show();

	let str = $("#svlist-input_filter").val().split(" ");

	$.each(str, function(idx, elm) {
		$("#svlist-listarea tbody tr").filter(function(index){
			return ($(this).html().indexOf(elm) < 0);
		}).hide();
	});
}







/* master data */

var M002_CLASS = {
	0  : { fullname:"Shielder", abbrname:"盾" },
	1  : { fullname:"Saber", abbrname:"剣" },
	2  : { fullname:"Archer", abbrname:"弓" },
	3  : { fullname:"Lancer", abbrname:"槍" },
	4  : { fullname:"Rider", abbrname:"騎" },
	5  : { fullname:"Caster", abbrname:"術" },
	7  : { fullname:"Assassin", abbrname:"殺" },
	8  : { fullname:"Berserker", abbrname:"狂" },
	9  : { fullname:"Ruler", abbrname:"裁" },
	10 : { fullname:"Avenger", abbrname:"讐" },
	11 : { fullname:"Alterego", abbrname:"エゴ" },
	12 : { fullname:"MoonCancer", abbrname:"桜" },
}


var M011_SERVANT = {
      1 : { name:"マシュ・キリエライト", classnm:"Shielder", classabbr:"盾", gender:"女性" },
      2 : { name:"アルトリア・ペンドラゴン", classnm:"Saber", classabbr:"剣", gender:"女性" },
      3 : { name:"アルトリア・ペンドラゴン(オルタ)", classnm:"Saber", classabbr:"剣", gender:"女性" },
      4 : { name:"アルトリア・ペンドラゴン(リリィ)", classnm:"Saber", classabbr:"剣", gender:"女性" },
      5 : { name:"ネロ・クラウディウス", classnm:"Saber", classabbr:"剣", gender:"女性" },
      6 : { name:"ジークフリート", classnm:"Saber", classabbr:"剣", gender:"男性" },
      7 : { name:"ガイウス・ユリウス・カエサル", classnm:"Saber", classabbr:"剣", gender:"男性" },
      8 : { name:"アルテラ", classnm:"Saber", classabbr:"剣", gender:"女性" },
      9 : { name:"ジル・ド・レェ（剣）", classnm:"Saber", classabbr:"剣", gender:"男性" },
     10 : { name:"シュヴァリエ・デオン", classnm:"Saber", classabbr:"剣", gender:"？" },
     11 : { name:"エミヤ", classnm:"Archer", classabbr:"弓", gender:"男性" },
     12 : { name:"ギルガメッシュ", classnm:"Archer", classabbr:"弓", gender:"男性" },
     13 : { name:"ロビンフッド", classnm:"Archer", classabbr:"弓", gender:"男性" },
     14 : { name:"アタランテ", classnm:"Archer", classabbr:"弓", gender:"女性" },
     15 : { name:"エウリュアレ", classnm:"Archer", classabbr:"弓", gender:"女性" },
     16 : { name:"アーラシュ", classnm:"Archer", classabbr:"弓", gender:"男性" },
     17 : { name:"クー・フーリン(槍)", classnm:"Lancer", classabbr:"槍", gender:"男性" },
     18 : { name:"エリザベート・バートリー", classnm:"Lancer", classabbr:"槍", gender:"女性" },
     19 : { name:"武蔵坊弁慶", classnm:"Lancer", classabbr:"槍", gender:"男性" },
     20 : { name:"クー・フーリン(Prototype)", classnm:"Lancer", classabbr:"槍", gender:"男性" },
     21 : { name:"レオニダス一世", classnm:"Lancer", classabbr:"槍", gender:"男性" },
     22 : { name:"ロムルス", classnm:"Lancer", classabbr:"槍", gender:"男性" },
     23 : { name:"メドゥーサ", classnm:"Rider", classabbr:"騎", gender:"女性" },
     24 : { name:"ゲオルギウス", classnm:"Rider", classabbr:"騎", gender:"男性" },
}









