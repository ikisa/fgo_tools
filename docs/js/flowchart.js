var readyFlowchart = function() {
	let fnNm = "readyFlowchart";
	console.log("[%s] start.", fnNm);


	let $form = $("#summerflow-form");

	let template = "<fieldset class=\"fieldset\" id=\"summerflow-fieldset%flow-no%\">" +
	               "  <legend>開拓計画%flow-no%</legend>" +
	               "  <input type=\"checkbox\" name=\"\" id=\"summerflow-flow%flow-no%_a\"><label for=\"summerflow-flow%flow-no%_a\">Ａ案</label>" +
	               "  <input type=\"checkbox\" name=\"\" id=\"summerflow-flow%flow-no%_b\"><label for=\"summerflow-flow%flow-no%_b\">Ｂ案</label>" +
	               "  <input type=\"checkbox\" name=\"\" id=\"summerflow-flow%flow-no%_c\"><label for=\"summerflow-flow%flow-no%_c\">Ｃ案</label>" +
	               "</fieldset>" +
	               "";

    let data = [
    	{ A: { material: [40, 0, 0] }, B: { material: [0, 30, 0] }, C: { material: [0, 0, 50] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    	{ A: { material: [50, 0, 0] }, B: { material: [0, 40, 0] }, C: { material: [20, 0, 30] }, },
    ];

    let result = [
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:true, B:false, C:true },
    	{ A:false, B:true, C:true },
    	{ A:true, B:false, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:false, B:true, C:true },
    	{ A:true, B:false, C:true },
    ];

	data.forEach(function(item, index, array){
		let newFlow = template;
		newFlow = newFlow.replace(/%flow-no%/g, String(index + 1));

		$form.append($(newFlow));

		if (result[index].A) $("#summerflow-flow" + String(index + 1) + "_a").prop({ checked: true });
		if (result[index].B) $("#summerflow-flow" + String(index + 1) + "_b").prop({ checked: true });
		if (result[index].C) $("#summerflow-flow" + String(index + 1) + "_c").prop({ checked: true });

	});

	console.log("[%s] end.", fnNm);
}
readyArray.push(readyFlowchart);


