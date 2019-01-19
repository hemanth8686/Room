/**
 *
 */

var specimenOutString = '';
var labEntryOutString = '';
var txtLabId = '';
var hdLabId = '';
var limit;
var patientNFID = '';


var request;
function initRequest() {
	if (window.XMLHttpRequest)
		request = new XMLHttpRequest();
	else if (window.ActiveXobject)
		request = new ActioveXObject("Microsoft.XMLHTTP");
}

function getSubcategory(categoryId) {
	initRequest();
	request.onreadystatechange = loadingSubcategory;
	request.open("GET", "loadSubCategory.action"
			+ "?method=getSubCategory&categoryId=" + categoryId, true);
	request.send(null);
}

function loadingSubcategory() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			var tripTimeCombo = document.getElementById("cmb_subCategoryName");
			var responseResult = request.responseText;
			var resultSplit = responseResult.split('^');
			tripTimeCombo.options.length = 0;
			var index = 1;
			tripTimeCombo.options[tripTimeCombo.options.length] = new Option('Select', '-1');
			for (index = 0; index < resultSplit.length; index++) {
				if (resultSplit[index] !== ''){
					if(resultSplit[index]+''.indexOf('`') != -1){
						var keyValuePairString = resultSplit[index];
						var keyValuePair= keyValuePairString.split('`');
						tripTimeCombo.options[tripTimeCombo.options.length] = new Option(keyValuePair[1], keyValuePair[0]);
					}
				}
			}

		}
	}
}


function restrictCharacters(e) {
    var key = e.charCode || e.keyCode || 0;
    return (
            key == 8 ||
            key == 9 ||
            (key >= 37 && key <= 40) ||
            (key >= 48 && key <= 57)

    );
}
var currentBoxNumber = 0;
function restrictCharactersEntry(e) {
    var key = e.charCode || e.keyCode || 0;
    return (
            key == 8 ||
            key == 9 ||
            key == 46 ||
            (key >= 37 && key <= 40) ||
            (key >= 48 && key <= 57)

    );
}

function addCategory(){
	try {
		if((document.getElementById('txt_categoryName').value).trim().length == 0){
			alert('Please enter the category name');
			return false;
		}else if((document.getElementById('txt_amount').value).trim() == '' || document.getElementById('txt_amount').value == '0.0' || (document.getElementById('txt_esiAmount').value).trim() == '' || document.getElementById('txt_esiAmount').value == '0.0'){
			if(confirm('Are you proceed with amount or Esi amount is 0')){
				return true;
			}else{
				return false;
			}
		}else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function urlDeleteAlert(){
	try {
		if(confirm('Are you sure you want Deactivate')) return true;
		else return false;
	} catch (e) {
		alert(e);
	}
	return false;
}

function urlActivateAlert(){
	try {
		if(confirm('Are you sure you want Activate')) return true;
		else return false;
	} catch (e) {
		alert(e);
	}
	return false;
}
function addSubCategory(){
	try {
		if(document.getElementById('cmb_category').value == 'Select'){
			alert('Please select the Category name');
			return false;
		}
		else if((document.getElementById('txt_subCategory').value).trim().length == 0){
			alert('Please enter the sub-category name');
			return false;
		}if((document.getElementById('txt_amount').value).trim() == '' || document.getElementById('txt_amount').value == '0.0' || (document.getElementById('txt_esiAmount').value).trim() == '' || document.getElementById('txt_esiAmount').value == '0.0'){
			if(confirm('Are you proceed with amount or Esi amount is 0')){
				return true;
			}else{
				return false;
			}
		}
		return true;
	} catch (e) {
		alert(e);
	}
}

function addComponent(){
	try {
		if(document.getElementById('cmb_category').value == 'Select'){
			alert('Please select the Category');
			return false;
		}else if(document.getElementById('cmb_subCategory').value == 'Select'){
			alert('Please select the Sub-Category');
			return false;
		}else if((document.getElementById('txt_component').value).trim().length == 0){
			alert('Please enter the Component');
			return false;
		}
		return true;
	} catch (e) {
		alert(e);
	}
}

function onChangeCategoryUpdate(categoryName,categoryId,isCategory){
	try {
		if(categoryId != -1){
			if(isCategory)document.getElementById('txt_category').value = categoryName;
			document.getElementById('categoryId').value = categoryId;
			document.getElementById('txt_amount').value = '';
		}else{
			document.getElementById('txt_category').value = '';
			document.getElementById('categoryId').value = '0';
			document.getElementById('txt_amount').value = '';
		}
	} catch (e) {
		alert(e);
	}
}

function onChangeSubCategoryUpdateWithLoading(categoryName,categoryId){
	try {
		if(categoryId != -1){
			document.getElementById('categoryId').value = categoryId;
			document.getElementById('txt_amount').value = '';
			getSubcategory(categoryId);
		}else{
			document.getElementById('categoryId').value = '0';
			document.getElementById('txt_amount').value = '';
		}
	} catch (e) {
		alert(e);
	}
}

function onChangeSubCategoryUpdateWithLoadingForComponent(categoryName,categoryId){
	try {
		if(categoryId != -1){
			document.getElementById('categoryId').value = categoryId;
			getSubcategory(categoryId);
		}else{
			document.getElementById('categoryId').value = '0';
		}
	} catch (e) {
		alert(e);
	}
}

function onChangeSubCategoryForComponent(subCategoryId){
	try {
		if(subCategoryId != -1){
			document.getElementById('subCategoryId').value = subCategoryId;
		}else{
			document.getElementById('subCategoryId').value = '0';
		}
	} catch (e) {
		alert(e);
	}
}

function onChangeSubCategoryUpdate(subCategoryName,subCategoryId){
	try {
		if(subCategoryId != -1){
			document.getElementById('txt_subCategory').value = subCategoryName;
			document.getElementById('subCategoryId').value = subCategoryId;
			document.getElementById('txt_amount').value = '';
		}else{
			document.getElementById('txt_subCategory').value = '';
			document.getElementById('subCategoryId').value = '0';
			document.getElementById('txt_amount').value = '';
		}
	} catch (e) {
		alert(e);
	}
}

function updateCategoryValidation(){
	try {
		if(document.getElementById('categoryId').value == 0){
			alert('Please select the category');
			return false;
		}else if((document.getElementById('txt_category').value).trim().length == 0){
			alert('Please type the category name');
			return false;
		}
		if(document.getElementById('txt_amount').value == '' || document.getElementById('txt_esiAmount').value == ''){
			if(confirm('Are you proceed with amount or Esi amount is 0')){
				return true;
			}else{
				return false;
			}
		}
		return true;
	} catch (e) {
		alert(e);
	}
}

function updateSubCategoryValidation(){
	try {
		if(document.getElementById('categoryId').value == 0){
			alert('Please select the category');
			return false;
		}else if(document.getElementById('subCategoryId').value == 0){
			alert('Please Select the Sub-category');
			return false;
		}else if((document.getElementById('txt_subCategory').value).trim().length == 0){
			alert('Please type the Sub-category name');
			return false;
		}
		if(document.getElementById('txt_amount').value == '' || document.getElementById('txt_esiAmount').value == ''){
			if(confirm('Are you proceed with amount or Esi amount is 0')){
				return true;
			}else{
				return false;
			}
		}
		return true;
	} catch (e) {
		alert(e);
	}
}


function AddComponent(){
	try {
		if(document.getElementById('categoryId').value == 0){
			alert('Please select the category');
			return false;
		}else if(document.getElementById('subCategoryId').value == 0){
			alert('Please Select the Sub-category');
			return false;
		}else if((document.getElementById('txt_subComponent').value).trim().length == 0){
			alert('Please type the Sub-Component name');
			return false;
		}
		return true;
	} catch (e) {
		alert(e);
	}
}

function addXRAY_BodyPart(){
	try {
		if((document.getElementById('txt_bodyPart').value).trim().length == 0){
			alert('Please enter the body part name');
			return false;
		}
	} catch (e) {
		alert(e);
	}
	return true;
}

function addXRAY_ScanView(){
	try {
		if(document.getElementById('cmb_bodyPart').value == 'Select'){
			alert('Please select the part name');
			return false;
		}else if((document.getElementById('txt_scanView').value).trim().length == 0){
			alert('Please enter the scan view name');
			return false;
		}else if((document.getElementById('txt_normalAmount').value).trim().length == 0){
			alert('Please enter the normal amount');
			return false;
		}else if((document.getElementById('txt_noOfFilm').value).trim().length == 0){
			alert('Please enter the not of film');
			return false;
		}else if((document.getElementById('txt_portableAmount').value).trim().length == 0){
			alert('Please enter the portable amount');
			return false;
		}
	} catch (e) {
		alert(e);
	}
	return true;
}

function addCT_BodyPart(){
	try {
		if((document.getElementById('txt_bodyPart').value).trim().length == 0){
			alert('Please enter the body part name');
			return false;
		}else if((document.getElementById('txt_Amount').value).trim().length == 0){
			if(confirm('Are you proceed with amount is 0')){
				return true;
			}else{
				return false;
			}
		}
	} catch (e) {
		alert(e);
	}
	return true;
}

function addCT_View(){
	try {
		if(document.getElementById('cmb_bodyPart').value == 'Select'){
			alert('Please select the part name');
			return false;
		}else if((document.getElementById('txt_study').value).trim().length == 0){
			alert('Please enter the study name');
			return false;
		}else if((document.getElementById('txt_AmountView').value).trim().length == 0){
			alert('Please enter the amount');
			return false;
		}
	} catch (e) {
		alert(e);
	}
}

function ClickTable(event,id) {
	try {
		$('#' + id).slideToggle('fast',function(){

//			if($('#'+id).is(':visible'))alert('slide up');
		});
		event.preventDefault();
	} catch (e) {
		alert(e);
	}
}

function totalCalculation(id,categoryId,subcategoryId,amount){
	try {
		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		if(document.getElementById(id).checked == false){
			if(totalAmount != undefined){
				if(parseInt($('.disRs').val()) > 0){
					$.msgbox({
						'message'	: 'Sorry, You Changed Something after put Discount, please do again',
						'type'		: 'error'
					});
				}else{
				totalAmount = parseFloat(totalAmount) - parseFloat(amount);
				document.getElementById('lbl_totalAmount').innerHTML = totalAmount;
				}
			}
		}else{
			if(totalAmount != undefined){
				if(parseInt($('.disRs').val()) > 0){
					$.msgbox({
						'message'	: 'Sorry, You Changed Something after put Discount, please do again',
						'type'		: 'error'
					});
				}else{
				totalAmount = parseFloat(totalAmount) + parseFloat(amount);
				document.getElementById('lbl_totalAmount').innerHTML = totalAmount;
				}
			}
		}
	} catch (e) {
		alert(''+e);
	}
}

function addDiv(subCategoryName,amt){
	try {
		if((document.getElementById('actionAddDiv').innerHTML).indexOf(subCategoryName) != -1){
			if((document.getElementById('actionAddDiv').innerHTML).indexOf(subCategoryName+', ') != -1)	document.getElementById('actionAddDiv').innerHTML = (document.getElementById('actionAddDiv').innerHTML).replace(subCategoryName, '');
			else document.getElementById('actionAddDiv').innerHTML = (document.getElementById('actionAddDiv').innerHTML).replace(subCategoryName, '' ).replace(amt, '' ).replace("<br>", '' );
		}
		else{
			if((document.getElementById('actionAddDiv').innerHTML).trim().length == 0)document.getElementById('actionAddDiv').innerHTML = document.getElementById('actionAddDiv').innerHTML + subCategoryName+'  '+ amt;
			else document.getElementById('actionAddDiv').innerHTML = document.getElementById('actionAddDiv').innerHTML +'<br>'+ subCategoryName+'  '+ amt;
		}
	} catch (e) {
		alert(e);
	}
}

function addXrayDiv(id, subCategoryName, selectId){
	try {
		if((document.getElementById('actionAddDiv').innerHTML).indexOf(subCategoryName) != -1){
			if(document.getElementById(selectId).checked == false){
				if((document.getElementById('actionAddDiv').innerHTML).indexOf(subCategoryName+', ') != -1)	document.getElementById('actionAddDiv').innerHTML = (document.getElementById('actionAddDiv').innerHTML).replace(subCategoryName+', ', '');
				else document.getElementById('actionAddDiv').innerHTML = (document.getElementById('actionAddDiv').innerHTML).replace(subCategoryName, '');
			}

		}else{
			if((document.getElementById('actionAddDiv').innerHTML).trim().length == 0)document.getElementById('actionAddDiv').innerHTML = document.getElementById('actionAddDiv').innerHTML + subCategoryName;
			else document.getElementById('actionAddDiv').innerHTML = document.getElementById('actionAddDiv').innerHTML +',  '+ subCategoryName;
		}
	} catch (e) {
		alert(e);
	}
}


function selectAll(category_id,value){
	try {
		var idTemp =  category_id.split('_');
		var id = idTemp[1];
			$('#table_'+id).closest('td').find("input[type=checkbox]").each(function() {
				if(this.id.indexOf('_') != -1);
				else{
					if(id !== this.id){
						if(document.getElementById(category_id).checked == true){

							if(document.getElementById(this.id).checked == true){
								document.getElementById(this.id).checked = false;
								totalCalculation(this.id, '', '', this.value);
							}

							document.getElementById(this.id).checked = true;
							$('#'+this.id).attr("disabled", true);
							document.getElementById(this.id).disabled = true;
						}else{
							$('#'+this.id).removeAttr("disabled");
							document.getElementById(this.id).checked = false;
						}
					}
				}

		    });

			totalCalculation(category_id, '', '', value);
	} catch (e) {
		alert(e);
	}
}

//function tableHide(tableFirst, tableSecond){
//	try {
//		alert('tstst');
//		document.getElementById(tableFirst).style.visibility = 'visible';
//		document.getElementById(tableSecond).style.visibility = 'hidden';
//	} catch (e) {
//		alert(e);
//	}
//	return false;
//}

function requisitionFinalSubmit(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('patientNFID').value;
		totalAmount = parseFloat(document.getElementById('totalAmount').value);
//		totalAmount = parseFloat(document.getElementById('totalAmount').value).toFixed(2);
		outString = document.getElementById('outString').value;

		if(outString != ''){
			document.getElementById('formId').action = 'payRequisitionBill.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;
		}
		return false;
//		 $('#tableSecondInside > tbody').html("");
//		 outString = document.getElementById('outString').value;
//		 var outOneRowString = outString.split('@');
//		 for(var index = 0;index < outOneRowString.length;index++){
//			 var trString = '<tr algin="center">';
//			 trString += '<td>';
//			 trString += document.getElementById('hd_parcialView_'+outOneRowString[index]+''.split('`')[1]+outOneRowString[index]+''.split('`')[2]);
//			 trString += '</td>';
//			 trString += '</tr>';
//
//			 $('#tableSecondInside').append(trString);
//		 }
	}catch(e){
		alert(e);
		return false;
	}
}

function requisitionSubmit(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('category_'+indexCategory) != null){
					if(document.getElementById('category_'+indexCategory).checked == true){
						outString += patientNFID+'`'+indexCategory+'`'+0+'`'+document.getElementById('category_'+indexCategory).value+'`'+document.getElementById('category_ord_'+indexCategory).value+'`'+'@';
						categorySelectFlag = 1;
					}
				}
				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById(indexCategory+''+indexSubCategory) != null){
								if(document.getElementById(indexCategory+''+indexSubCategory).checked == true){
									if(categorySelectFlag == 1){
										outString += patientNFID.trim()+'`'+indexCategory+'`'+indexSubCategory+'`'+'0.00'+'`'+document.getElementById('category_ord_'+indexCategory).value+'`'+'@';
									}else{
										outString += patientNFID.trim()+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById(indexCategory+''+indexSubCategory).value+'`'+document.getElementById('category_ord_'+indexCategory).value+'`'+'@';
									}
//									alert(indexCategory+'   '+indexSubCategory+'   '+document.getElementById(indexCategory+''+indexSubCategory).value);
								}
							}
						}

					}

				}

			}
		}

		if(outString != ''){
			var disAmt = $('.disRs').val();
			var disRea = $('.reaID').val();
			if(parseInt(disAmt) > 0){
				if(disRea.trim()=="") {
					$.msgbox({
						'message'	: 'Please Enter the Reason for Discount.',
						'type'		: 'error'
					});
					 return false;
			}else{
			document.getElementById('formId').action = 'payRequisitionBill.action?patientNFID='+patientNFID.trim()+'&totalAmount='+totalAmount+'&outString='+outString+"&discount="+disAmt+"&reason="+disRea;
	        document.getElementById('formId').submit();
	        return true;
			}
		}else{
			document.getElementById('formId').action = 'payRequisitionBill.action?patientNFID='+patientNFID.trim()+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;
		}
	}
		return false;
	} catch (e) {
		alert(e);
		return false;
	}
}




function readySpecimenView(rowId,patientNFID){
	var labId = document.getElementById('labId_'+rowId).value;

	document.getElementById('formId').action = 'specimenCollection.action?patientNFID='+patientNFID+'&labId='+labId;
    document.getElementById('formId').submit();

	return false;
}

function OnChangeSpecimenForOthers(id,specimenName){
	try {
		if(specimenName === 'Others'){
			if(document.getElementById(id).checked)document.getElementById('tr_other').style.display = "inline";
			else document.getElementById('tr_other').style.display = "none";
		}
	} catch (e) {
		alert(e);
	}
}

function specimenCollectionConfim(limit,patientNFID){
	var outString = '';
	var flag = 0;
	var txtLabId = '';
	var hdLabId = '';
	var validationFlag = 0;
	try {
		txtLabId = document.getElementById('txt_labid').value;
		hdLabId = document.getElementById('hd_labId').value;

		if((txtLabId).trim().length == 0){
			alert('Please enter the Lab id');
			return false;
		}else{
			$.post("UserLabIdExist.action",  {
				userLabId:txtLabId
	        },function(serverResponse){
	        	if(serverResponse == "ok");
	        	else{
//	        		alert(serverResponse);
	        		document.getElementById('txt_labid').style.border = "1px solid red";
	        		validationFlag = 1;
	        	}
	        });
		}
		if(validationFlag === 1){
			return false;
		}
		for(var index = 1;index <= parseInt(limit);index++){
			if(document.getElementById('chk_'+index).checked){
				flag = 1;
				if(document.getElementById('chk_'+index) != null){
					if(document.getElementById('chk_'+index).value == 'Others'){
						outString += txtLabId+'`'+hdLabId+'`'+document.getElementById('txt_others').value+'@'
					}else{
						outString += txtLabId+'`'+hdLabId+'`'+document.getElementById('chk_'+index).value+'@';
					}
				}
			}
		}

		if(document.getElementById('tr_other').style.display == "none");
		else{
			if((document.getElementById('txt_others').value).length == 0){
				alert('Please enter Others Specimen, If you select Others');
				return false;
			}
		}

		if(flag == 0){
			alert('Please select atleast one specimen');
			return false;
		}
		if(outString != ''){
			document.getElementById('formId').action = 'specimenCollectionConfirm.action?patientNFID='+patientNFID+'&outString='+outString+'&hdLabId='+hdLabId+'&userLabId='+txtLabId;
		    document.getElementById('formId').submit();
		    return true;
		}
	} catch (e) {
		alert(e);
	}

	return false;
}

function onChangeForSubCombo(id,currentComponentId,selectedValue){
	try {
		selectedValue = selectedValue.trim();
		if(selectedValue == '-1' || selectedValue == 'Negative'){
			document.getElementById('subTriggerCombo_'+id).style.display = 'none';
			document.getElementById('subTriggerCombo_'+id).removeAttribute('name', 'labResultFigure');
			document.getElementById(currentComponentId).setAttribute('name', 'labResultFigure');
		}
		else if(selectedValue == 'Positive'){
			document.getElementById('subTriggerCombo_'+id).style.display = 'initial';
			document.getElementById('subTriggerCombo_'+id).setAttribute('name', 'labResultFigure');
			document.getElementById('subTriggerCombo_'+id).selectedIndex = 0;
			document.getElementById(currentComponentId).removeAttribute('name', 'labResultFigure');
		}
	} catch (e) {
		alert(e);
	}
}

function assignEnteredTiggerTwo(id,value,byPass){
	try {
		if(byPass === 1){
			document.getElementById('triggerCombo_'+id).value = value;
		}else{
			document.getElementById('triggerCombo_'+id).value = 'Positive';

			document.getElementById('subTriggerCombo_'+id).style.display = 'initial';
			document.getElementById('subTriggerCombo_'+id).setAttribute('name', 'labResultFigure');
			document.getElementById('triggerCombo_'+id).removeAttribute('name', 'labResultFigure');
			document.getElementById('subTriggerCombo_'+id).value = value;
		}
	} catch (e) {
		alert(e);
	}
}

function formulaPartOneFixed(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId,dId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'c'){
					cId = document.getElementById('formula_'+splitSecond[1].toString());
					cId.value = parseFloat(1).toFixed(1);
				}
				else if(splitSecond[0] == 'd')dId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		dId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartOneFixed(aId, bId, cId, dId)}
		bId.onkeyup = function(){listenerFunctionPartOneFixed(aId, bId, cId, dId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartOneFixed(aId,bId,cId,dId){
	try {
		if((aId.value).trim().length != 0 && (bId.value).trim().length != 0){
			dId.value = (parseFloat(aId.value) / parseFloat(bId.value)).toFixed(1);
			cId.value = parseFloat(1).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}


function formulaPartOne(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId,dId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'c')cId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'd')dId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		dId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartOne(aId, bId, cId, dId)}
		bId.onkeyup = function(){listenerFunctionPartOne(aId, bId, cId, dId)}
	} catch (e) {
		alert(e);
	}

}

function listenerFunctionPartOne(aId,bId,cId,dId){
	try {
		if((aId.value).trim().length != 0 && (bId.value).trim().length != 0){
			dId.value = (parseFloat(aId.value) / parseFloat(bId.value)).toFixed(1);
			cId.value = Math.sqrt(dId.value).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}

function formulaPartTwo(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'c')cId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartTwo(aId, bId, cId)}
		bId.onkeyup = function(){listenerFunctionPartTwo(aId, bId, cId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartTwo(aId,bId,cId){
	try {
		if((aId.value).trim().length != 0 && (bId.value).trim().length != 0){
			cId.value = (parseFloat(bId.value) / parseFloat(aId.value)).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}

function formulaPartThree(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0].trim() == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0].trim() == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0].trim() == 'c')cId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartThree(aId, bId, cId)}
		bId.onkeyup = function(){listenerFunctionPartThree(aId, bId, cId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartThree(aId,bId,cId){
	try {
		if((aId.value).trim().length != 0 || (bId.value).trim().length != 0){
			var cIdValue = (100 - (parseFloat(aId.value) + parseFloat(bId.value))).toFixed(1);
			if(!isNaN(cIdValue))cId.value = (100 - (parseFloat(aId.value) + parseFloat(bId.value))).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}

function formulaPartFour(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		bId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartFour(aId, bId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartFour(aId,bId){
	try {
		if((aId.value).trim().length != 0){
			bId.value = (100 - parseFloat(aId.value)).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}

function formulaPartFive(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		bId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartFive(aId,bId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartFive(aId,bId){
	try {
		if((aId.value).trim().length != 0){
			bId.value = (parseFloat(aId.value) / 5).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}

function formulaPartSix(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'c')cId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartSix(aId,bId,cId)}
		bId.onkeyup = function(){listenerFunctionPartSix(aId,bId,cId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartSix(aId,bId,cId){
	try {
		if((aId.value).trim().length != 0 && (bId.value).trim().length != 0){
			cId.value = (parseFloat(aId.value) - parseFloat(bId.value)).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}

function formulaPartSeven(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId,dId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'c')cId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'd')dId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		dId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartSix(aId,bId,cId)}
		bId.onkeyup = function(){listenerFunctionPartSix(aId,bId,cId),listenerFunctionPartEight(bId, cId, dId)}
	} catch (e) {
		alert(e);
	}
}

function formulaPartEight(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'c')cId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartEight(aId,bId,cId)}
		bId.onkeyup = function(){listenerFunctionPartEight(aId,bId,cId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartEight(aId,bId,cId){
	try {
		if((aId.value).trim().length != 0 && (bId.value).trim().length != 0){
			cId.value = (parseFloat(aId.value) / parseFloat(bId.value)).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}
function formulaPartNine(idsValue){
	try {
		var idsSplitFirst = idsValue.split('~');
		var aId,bId,cId,dId,eId,fId,gId;
		for(var index = 0;index < idsSplitFirst.length;index++){
			if(idsSplitFirst[index] != 0){
				var splitSecond = idsSplitFirst[index].toString().split('`');
				if(splitSecond[0] == 'a')aId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'b')bId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'c')cId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'd')dId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'e')eId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'f')fId = document.getElementById('formula_'+splitSecond[1].toString());
				else if(splitSecond[0] == 'g')gId = document.getElementById('formula_'+splitSecond[1].toString());
			}
		}
		cId.setAttribute('disabled', 'disabled');
		aId.onkeyup = function(){listenerFunctionPartNine(aId,bId,cId)}
		bId.onkeyup = function(){listenerFunctionPartNine(aId,bId,cId)}
		eId.setAttribute('disabled', 'disabled');
		dId.onkeyup = function(){listenerFunctionPartNine1(dId,bId,eId)}
		bId.onkeyup = function(){listenerFunctionPartNine1(dId,bId,eId)}
		gId.setAttribute('disabled', 'disabled');
		fId.onkeyup = function(){listenerFunctionPartNine2(fId,gId)}
	} catch (e) {
		alert(e);
	}
}

function listenerFunctionPartNine(aId,bId,cId){
	try {
		if((aId.value).trim().length != 0 && (bId.value).trim().length != 0){
			cId.value = (parseFloat(aId.value) / parseFloat(bId.value)).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}
function listenerFunctionPartNine1(dId,bId,eId){
	try {
		if((dId.value).trim().length != 0 && (bId.value).trim().length != 0){
			eId.value = (parseFloat(dId.value) / parseFloat(bId.value)).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}
function listenerFunctionPartNine2(fId,gId){
	try {
		if((fId.value).trim().length != 0){
			gId.value = (parseFloat(fId.value) / 5).toFixed(1);
		}
	} catch (e) {
		alert(e);
	}
}
function labEntryResultSubmit(byPass){
	var outString = '';
	var flag = 0;
	try {
		var resultFig = document.getElementsByName('labResultFigure');
		for(var index = 0;index < resultFig.length;index++){
			var IdValue = document.getElementById('hdUniqueId_'+index).value;
			if(resultFig[index].tagName == 'SELECT'){
				if(resultFig[index].value == '-1'){
					flag = 1;
					resultFig[index].style.border = "1px solid red";
					resultFig[index].value='sss';
					alert(resultFig[index].value)

					alert(IdValue)
				}
			}else if(resultFig[index].tagName == 'INPUT'){
				if((resultFig[index].value).length == 0){
					flag = 1;
					resultFig[index].style.border = "1px solid red";
					resultFig[index].value='';
				}
			}

			outString += ''+document.getElementById('hdCategory_'+IdValue).value+'`'+(resultFig[index].value).trim()+'`'+document.getElementById('hdUnits_'+IdValue).value+'`'+document.getElementById('hdMaleRange_'+IdValue).value+'`'+document.getElementById('hdFeMaleRange_'+IdValue).value+'`'+document.getElementById('hdHead_'+IdValue).value+'@';

//			alert(document.getElementById('hdCategory_'+IdValue).value+'       '+resultFig[index].value+'     '+document.getElementById('hdUnits_'+IdValue).value+'       '+document.getElementById('hdMaleRange_'+IdValue).value+'      '+document.getElementById('hdFeMaleRange_'+IdValue).value);
		}
//		alert(outString);
		if(flag == 1){
			/*alert('Please fill the all missed Result');
			return false;*/
			if (confirm("You have missed some fields. Do you still want to approve the Report?") == true) {
		    	return true;
		    } else {
		    	return false;
		    }

		}
		if(outString != ''){
			document.getElementById('labTestResultOutputString').value = outString;

			if(byPass == 1){
				document.getElementById('formId').action = 'labResultSubmit.action';
			}
			else if(byPass == 2) {
				document.getElementById('formId').action = 'labResultSave.action';
			}
			else if(byPass == 3) {
				document.getElementById('formId').action = 'labResultApproval.action';
			}
			else if(byPass == 4) {
				document.getElementById('formId').action = 'labResultSave1.action';
			}
		    document.getElementById('formId').submit();

		    return true;
		}
	} catch (e) {
		alert(e);
	}
	return false;
}

function labReportInputValidation(){
	try {
		if((document.getElementById('txt_labId').value).trim().length == 0){
			alert('Please give the Lab id');
			return false;
		}
		return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function getLabEntry(rowId,patientNFID){
	var labId = document.getElementById('labId_'+rowId).value;

	document.getElementById('formId').action = 'getlabEntry.action?patientNFID='+patientNFID+'&labId='+labId;
    document.getElementById('formId').submit();

	return false;
}
function getMyLabEntry(patientNFID){
	var labId = $(".myLabIDClass").val();
	document.getElementById('formId').action = 'getMyLabEntry.action?patientNFID='+patientNFID+'&labId='+labId;
    document.getElementById('formId').submit();
	return false;
}
function getLabReportID(rowId,patientNFID){
	alert(a);
	var labId = document.getElementById('labId_'+rowId).value;
	alert(labId);
	document.getElementById('formId').action = 'getLabResultReportbyID.action?patientNFID='+patientNFID+'&labId='+labId;
    document.getElementById('formId').submit();

	return false;
}

function getLabReport(rowId,patientNFID){
	try {
		var userLabId = document.getElementById('userLabiId_'+rowId).value;
		document.getElementById('hd_userLabId').value = userLabId;
		document.getElementById('txt_labId').value = userLabId;

		document.getElementById('formId').action = 'labReport.action';
	    document.getElementById('formId').submit();
	} catch (e) {
		alert(e);
	}
	return false;
}

function specimenCollectionConfirmWithAll(limitLocal,patientNFIDLocal){
	patientNFID = patientNFIDLocal;
	limit = limitLocal;
	try {
		var isReturn = commonSpecimenConfirm();
		if(specimenOutString != ''){

			if(isReturn){
//				$.post('specimenCollectionConfirmWithAll.action',{
//			    	patientNFID:patientNFID,
//			    	outString:specimenOutString,
//			    	hdLabId:hdLabId,
//			    	userLabId:txtLabId
//			    },function callBack(responce){
//			    	alert('callback'+responce);
//			    	document.getElementById('formId').action = 'getlabEntry.action?patientNFID='+patientNFID+'&labId='+labId;
//			        document.getElementById('formId').submit();
//			    });

				document.formName.action = 'specimenCollectionConfirmWithAll.action?patientNFID='+patientNFID+'&outString='+specimenOutString+'&hdLabId='+hdLabId+'&userLabId='+txtLabId;
			    document.formName.submit();

//			    document.forms[0].action = 'specimenCollectionConfirmWithAll.action?patientNFID='+patientNFID+'&outString='+specimenOutString+'&hdLabId='+hdLabId+'&userLabId='+txtLabId;
//			    document.forms[0].submit();
				return true;
			}
		}
	} catch (e) {
		alert(e);
	}

	return false;
}

function userLabIdValidation(){
	var validateFlag = 0;
	try {
		if((txtLabId).trim().length == 0){
			alert('Please enter the Lab id');
			return false;
		}else{
			$.post("UserLabIdExist.action",  {
				sysLabId:hdLabId,
				userLabId:txtLabId
	        },function(serverResponse){

	        	if(serverResponse != 'ok'){
	        		alert(serverResponse);
	        		validateFlag = 1;
	        	}
	        });
		}
	} catch (e) {
		alert(e);
	}
	return validateFlag;
}

function userLabIdValidationButton(){
	var validateFlag = 0;
	try {
		hdLabId = document.getElementById('hd_labId').value;
		txtLabId = document.getElementById('txt_labid').value;
		if((txtLabId).trim().length == 0){
			alert('Please enter the Lab id');
			return false;
		}else{
			$.post("UserLabIdExist.action",  {
				sysLabId:hdLabId,
				userLabId:txtLabId
	        },function(serverResponse){
	        	if(serverResponse != 'ok'){
	        		alert(serverResponse);
	        		document.getElementById('txt_labid').style.border = "1px solid red";
	        		return false;
	        	}else{
	        		document.getElementById('txt_labid').style.border = "1px solid #0063A6";
	        	}
	        });
		}
	} catch (e) {
		alert(e);
	}
	return false;
}

function commonSpecimenConfirm(){
	var outString = '';
	var flag = 0;
	try {
		txtLabId = document.getElementById('txt_labid').value;
		hdLabId = document.getElementById('hd_labId').value;
		if(userLabIdValidation() == 1){
			document.getElementById('txt_labid').style.border = "1px solid red";
			return false;
		}
		for(var index = 1;index <= parseInt(limit);index++){
			if(document.getElementById('chk_'+index).checked){
				flag = 1;
				if(document.getElementById('chk_'+index) != null){
					if(document.getElementById('chk_'+index).value == 'Others'){
						outString += txtLabId+'`'+hdLabId+'`'+document.getElementById('txt_others').value+'@';
					}else{
						outString += txtLabId+'`'+hdLabId+'`'+document.getElementById('chk_'+index).value+'@';
					}
				}
			}
		}
		specimenOutString = outString;
		document.getElementById('labSpecimenOutputString').value = specimenOutString;
		if(document.getElementById('tr_other').style.display == "none");
		else{
			if((document.getElementById('txt_others').value).length == 0){
				alert('Please enter Others Specimen, If you select Others');
				return false;
			}
		}
		if(flag == 0){
			alert('Please select atleast one specimen');
			return false;
		}
	} catch (e) {
		alert(e);
	}
	return true;
}

function labEntryByPassForSave(byPass,limitLocal,patientNFIDLocal){
	var validateFlag = 0;
	try {
			hdLabId = document.getElementById('hd_labId').value;
			txtLabId = document.getElementById('txt_labid').value;
			smpTime = document.getElementById('dateTime').value;

    		if(document.getElementById('txt_labid').value=="-1"){ document.getElementById('txt_labid').value="";}
			if((txtLabId).trim().length == 0){
				alert('Please enter the Lab id');
				return false;
			}else if((smpTime).trim().length == 0){
				alert('Please Select the Sample Collected Date');
				return false;
			}else{
				$.post("UserLabIdExist.action",  {
					sysLabId:hdLabId,
					userLabId:txtLabId
		        },function(serverResponse){
		        	if(serverResponse != 'ok'){
		        		alert(serverResponse);
		        		document.getElementById('txt_labid').style.border = "1px solid red";
		        		return false;
		        	}else{
		        		document.getElementById('txt_labid').style.border = "1px solid #0063A6";
		        		patientNFID = patientNFIDLocal;
		        		limit = limitLocal;
		        		document.getElementById('byPass').value = byPass;
		        		var isSpecimenReturn = commonSpecimenConfirm();
		        		if(isSpecimenReturn){
		        			var isLabEntryReturn = labEntrySaveWithAll(byPass);
		        			if(isLabEntryReturn){
		        				if(byPass==4)
		        					{
		        					document.getElementById('labEntrySaveForm').action = 'labEntrySaveAction1.action';
			        				document.getElementById('labEntrySaveForm').submit();
			        				return true;
		        					}
		        				else{
		        				document.getElementById('labEntrySaveForm').action = 'labEntrySaveAction.action';
		        				document.getElementById('labEntrySaveForm').submit();
		        				return true;
		        				}
		        			}
		        		}
		        	}
		        });
			}
	} catch (e) {
		alert(e);
	}
	return false;
}


//byPass 1--->Save 2--->Approve
function labEntrySaveWithAll(byPass){
	var outString = '';
	var flag = 0;
	var myResult="";
	try {
		var resultFig = document.getElementsByName('labResultFigure');

		for(var index = 0;index < resultFig.length;index++){
			myResult = resultFig[index].value;
			var IdValue = document.getElementById('hdUniqueId_'+index).value;
			if(byPass == 1)flag = 0;
			if(resultFig[index].tagName == 'SELECT'){
				myResult = resultFig[index].value;
				if(resultFig[index].value == '-1'){
					flag = 1;
					resultFig[index].style.border = "1px solid red";
					myResult = "";
				}
			}else if(resultFig[index].tagName == 'INPUT'){
				if((resultFig[index].value).length == 0){
					flag = 1;
				}
			}
			if(byPass == 1){
				if(flag == 0){
					outString += ''+document.getElementById('hdCategory_'+IdValue).value+'`'+(myResult).trim()+'`'+document.getElementById('hdUnits_'+IdValue).value+'`'+document.getElementById('hdMaleRange_'+IdValue).value+'`'+document.getElementById('hdFeMaleRange_'+IdValue).value+'`'+document.getElementById('hdSampleType_'+IdValue).value+'`'+document.getElementById('hdMethod_'+IdValue).value+'`'+document.getElementById('hdHead_'+IdValue).value+'`'+document.getElementById('hdOrder_'+IdValue).value+'`'+$("#abNorm_"+IdValue).is(':checked')+'@';
				}
				labEntryOutString = outString;
				document.getElementById('labTestResultOutputString').value = labEntryOutString;
			}else if(byPass == 2){
				outString += ''+document.getElementById('hdCategory_'+IdValue).value+'`'+(myResult).trim()+'`'+document.getElementById('hdUnits_'+IdValue).value+'`'+document.getElementById('hdMaleRange_'+IdValue).value+'`'+document.getElementById('hdFeMaleRange_'+IdValue).value+'`'+document.getElementById('hdSampleType_'+IdValue).value+'`'+document.getElementById('hdMethod_'+IdValue).value+'`'+document.getElementById('hdHead_'+IdValue).value+'`'+document.getElementById('hdOrder_'+IdValue).value+'`'+$("#abNorm_"+IdValue).is(':checked')+'@';
			}
			else if(byPass == 4){
				outString += ''+document.getElementById('hdCategory_'+IdValue).value+'`'+(myResult).trim()+'`'+document.getElementById('hdUnits_'+IdValue).value+'`'+document.getElementById('hdMaleRange_'+IdValue).value+'`'+document.getElementById('hdFeMaleRange_'+IdValue).value+'`'+document.getElementById('hdSampleType_'+IdValue).value+'`'+document.getElementById('hdMethod_'+IdValue).value+'`'+document.getElementById('hdHead_'+IdValue).value+'`'+document.getElementById('hdOrder_'+IdValue).value+'`'+$("#abNorm_"+IdValue).is(':checked')+'@';

			}
		}
		if(byPass == 2){
			if(flag == 1){

				/*alert('Please fill the all missed Result');
				return false;*/
				labEntryOutString = outString;
				document.getElementById('labTestResultOutputString').value = labEntryOutString;
				if (confirm("You have missed some fields. Do you still want to approve the Report?") == true) {

			    	return true;
			    } else {
			    	return false;
			    }
			}
			labEntryOutString = outString;
			document.getElementById('labTestResultOutputString').value = labEntryOutString;

		}
		else if(byPass == 4){
			if(flag == 1){
				document.getElementById('labTestResultOutputString').value = labEntryOutString;
				if (confirm("You have missed some fields. Do you still want to take Draft Report?") == true) {
			    	return true;
			    } else {
			    	return false;
			    }
			}
			labEntryOutString = outString;
			document.getElementById('labTestResultOutputString').value = labEntryOutString;
		}

	} catch (e) {
		alert(e);
	}
	return true;
}



function totalXRAYCalculation(id,amount){
	try {
		var tempId = id;
		var tempAmount = 0;
		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		if(document.getElementById(id).checked == false){
			if(totalAmount != undefined){
				totalAmount = parseFloat(totalAmount) - parseFloat(amount);
				document.getElementById('lbl_totalAmount').innerHTML = totalAmount;
//				document.getElementById('lbl_totalAmount').innerHTML = totalAmount.toFixed(2);
			}
		}else{
			if(totalAmount != undefined){
				totalAmount = parseFloat(amount) + parseFloat(totalAmount);
				document.getElementById('lbl_totalAmount').innerHTML = totalAmount;
//				document.getElementById('lbl_totalAmount').innerHTML = totalAmount.toFixed(2);
			}
		}
		if(tempId.indexOf('normal_') > -1){
			if(document.getElementById(tempId).checked == true){
				tempId = tempId.replace('normal_','portable_');
				if(document.getElementById(tempId).checked == true){
					document.getElementById(tempId).checked = false;
					tempAmount = document.getElementById(tempId).value;
					totalCalculation(tempId, 0, 0, tempAmount);
				}
			}
		}else if(tempId.indexOf('portable_') > -1){
			if(document.getElementById(tempId).checked == true){
				tempId = tempId.replace('portable_','normal_');
				if(document.getElementById(tempId).checked == true){
					document.getElementById(tempId).checked = false;
					tempAmount = document.getElementById(tempId).value;
					totalCalculation(tempId, 0, 0, tempAmount);
				}
			}
		}
	} catch (e) {
		alert('ddd    '+e);
	}
}

function xRaySubmit(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
//		alert(patientNFID+'      patientNFID');
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById('normal_'+indexCategory+''+indexSubCategory) != null){
								if(document.getElementById('normal_'+indexCategory+''+indexSubCategory).checked == true){
									outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById('normal_'+indexCategory+''+indexSubCategory).value+'`'+'@';
								}
							}
							if(document.getElementById('portable_'+indexCategory+''+indexSubCategory) != null){
								if(document.getElementById('portable_'+indexCategory+''+indexSubCategory).checked == true){
									outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById('portable_'+indexCategory+''+indexSubCategory).value+'`'+'@';
								}
							}
						}

					}

				}

			}
		}
		if(outString != ''){
			document.getElementById('formId').action = 'payXRAY_Bill.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;

//			$.post("payRequisitionBill.action",  {
//				patientNFID:patientNFID,
//				totalAmount:totalAmount,
//				outString:outString
//            });
//			return true;
		}
//		alert('outString    '+outString);
		return false;
	} catch (e) {
		alert(e);
		return false;
	}
}

function labCTSubmit(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('category_'+indexCategory) != null){
					if(document.getElementById('category_'+indexCategory).checked == true){
						outString += patientNFID+'`'+indexCategory+'`'+0+'`'+document.getElementById('category_'+indexCategory).value+'`'+'@';
						categorySelectFlag = 1;
					}
				}

				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById(indexCategory+''+indexSubCategory) != null){
								if(document.getElementById(indexCategory+''+indexSubCategory).checked == true){
									if(categorySelectFlag == 1){
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+'0.00'+'`'+'@';
									}else{
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById(indexCategory+''+indexSubCategory).value+'`'+'@';
									}
//									alert(indexCategory+'   '+indexSubCategory+'   '+document.getElementById(indexCategory+''+indexSubCategory).value);
								}
							}
						}

					}

				}

			}
		}
		if(outString != ''){
			document.getElementById('formId').action = 'payCT_Bill.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;
		}
		return false;
	} catch (e) {
		alert(e);
		return false;
	}


}
function labCTSubmitIP(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('category_'+indexCategory) != null){
					if(document.getElementById('category_'+indexCategory).checked == true){
						outString += patientNFID+'`'+indexCategory+'`'+0+'`'+document.getElementById('category_'+indexCategory).value+'`'+'@';
						categorySelectFlag = 1;
					}
				}

				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById(indexCategory+''+indexSubCategory) != null){
								if(document.getElementById(indexCategory+''+indexSubCategory).checked == true){
									if(categorySelectFlag == 1){
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+'0.00'+'`'+'@';
									}else{
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById(indexCategory+''+indexSubCategory).value+'`'+'@';
									}
//									alert(indexCategory+'   '+indexSubCategory+'   '+document.getElementById(indexCategory+''+indexSubCategory).value);
								}
							}
						}

					}

				}

			}
		}
		if(outString != ''){
			document.getElementById('formId').action = 'payCTOrder.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;
		}
		return false;
	} catch (e) {
		alert(e);
		return false;
	}
}

function xRaySubmitIP(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
//		alert(patientNFID+'      patientNFID');
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById('normal_'+indexCategory+''+indexSubCategory) != null){
								if(document.getElementById('normal_'+indexCategory+''+indexSubCategory).checked == true){
									outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById('normal_'+indexCategory+''+indexSubCategory).value+'`'+'@';
								}
							}
							if(document.getElementById('portable_'+indexCategory+''+indexSubCategory) != null){
								if(document.getElementById('portable_'+indexCategory+''+indexSubCategory).checked == true){
									outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById('portable_'+indexCategory+''+indexSubCategory).value+'`'+'@';
								}
							}
						}

					}

				}

			}
		}
		if(outString != ''){
			document.getElementById('formId').action = 'payXRAYOrder.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;

//			$.post("payRequisitionBill.action",  {
//				patientNFID:patientNFID,
//				totalAmount:totalAmount,
//				outString:outString
//            });
//			return true;
		}
//		alert('outString    '+outString);
		return false;
	} catch (e) {
		alert(e);
		return false;
	}
}


function requisitionSubmitbyConsultant(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);
		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){

			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('category_'+indexCategory) != null){
					if(document.getElementById('category_'+indexCategory).checked == true){
						outString += patientNFID+'`'+indexCategory+'`'+0+'`'+document.getElementById('category_'+indexCategory).value+'`'+document.getElementById('category_ord_'+indexCategory).value+'`'+'@';
						categorySelectFlag = 1;
					}
				}
				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById(indexCategory+''+indexSubCategory) != null){
								if(document.getElementById(indexCategory+''+indexSubCategory).checked == true){
									if(categorySelectFlag == 1){
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+'0.00'+'`'+document.getElementById('category_ord_'+indexCategory).value+'`'+'@';
									}else{
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById(indexCategory+''+indexSubCategory).value+'`'+document.getElementById('category_ord_'+indexCategory).value+'`'+'@';
									}
								}
							}
						}

					}

				}

			}
		}
		if(outString != ''){
			document.getElementById('formId').action = 'payLabOrderfromconsultant.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;
		}
		return false;
	} catch (e) {
		alert(e);
		return false;
	}
}

function labCTSubmitbyConsultant(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('category_'+indexCategory) != null){
					if(document.getElementById('category_'+indexCategory).checked == true){
						outString += patientNFID+'`'+indexCategory+'`'+0+'`'+document.getElementById('category_'+indexCategory).value+'`'+'@';
						categorySelectFlag = 1;
					}
				}

				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById(indexCategory+''+indexSubCategory) != null){
								if(document.getElementById(indexCategory+''+indexSubCategory).checked == true){
									if(categorySelectFlag == 1){
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+'0.00'+'`'+'@';
									}else{
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById(indexCategory+''+indexSubCategory).value+'`'+'@';
									}
//									alert(indexCategory+'   '+indexSubCategory+'   '+document.getElementById(indexCategory+''+indexSubCategory).value);
								}
							}
						}

					}

				}

			}
		}
		if(outString != ''){
			document.getElementById('formId').action = 'payCTBillfromconsultant.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;
		}
		return false;
	} catch (e) {
		alert(e);
		return false;
	}


}


function xRaylabSubmit(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
//		alert(patientNFID+'      patientNFID');
		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		var totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById('normal_'+indexCategory+''+indexSubCategory) != null){
								if(document.getElementById('normal_'+indexCategory+''+indexSubCategory).checked == true){
									outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById('normal_'+indexCategory+''+indexSubCategory).value+'`'+'@';
								}
							}
							if(document.getElementById('portable_'+indexCategory+''+indexSubCategory) != null){
								if(document.getElementById('portable_'+indexCategory+''+indexSubCategory).checked == true){
									outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById('portable_'+indexCategory+''+indexSubCategory).value+'`'+'@';
								}
							}
						}

					}

				}

			}
		}
		if(outString != ''){
			document.getElementById('formId').action = 'payXRAYBillfromConsultant.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;

//			$.post("payRequisitionBill.action",  {
//				patientNFID:patientNFID,
//				totalAmount:totalAmount,
//				outString:outString
//            });
//			return true;
		}
//		alert('outString    '+outString);
		return false;
	} catch (e) {
		alert(e);
		return false;
	}
}

function requisitionSubmitIP(){
	var outString = '';
	var patientNFID = '';
	var totalAmount = '';
	var categorySelectFlag = 0;
	try {
		patientNFID = document.getElementById('hdPatientNFID').value;
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML);
//		totalAmount = parseFloat(document.getElementById('lbl_totalAmount').innerHTML).toFixed(2);

		totalAmount = document.getElementById('lbl_totalAmount').innerHTML;
//		alert(totalAmount);
//		totalAmount = parseFloat(totalAmount);
//		totalAmount = parseFloat(totalAmount).toFixed(2);
		if(document.getElementById('firstCategoryId') != null && document.getElementById('lastCategoryId') != null){
			var firstCategory = parseInt(document.getElementById('firstCategoryId').value);
			var categorycount = parseInt(document.getElementById('lastCategoryId').value);
			for(indexCategory = firstCategory;indexCategory <= categorycount;indexCategory++){
				categorySelectFlag = 0;
				if(document.getElementById('category_'+indexCategory) != null){
					if(document.getElementById('category_'+indexCategory).checked == true){
						outString += patientNFID+'`'+indexCategory+'`'+0+'`'+document.getElementById('category_'+indexCategory).value+'`'+'@';
						categorySelectFlag = 1;
					}
				}

				if(document.getElementById('hdSubCount_'+indexCategory) != null){
					if(document.getElementById('firstSubCategoryId_'+indexCategory) != null && document.getElementById('lastSubCategoryId_'+indexCategory) != null){
						var firstSubCategory = parseInt(document.getElementById('firstSubCategoryId_'+indexCategory).value);
						var subCategoryCount = parseInt(document.getElementById('lastSubCategoryId_'+indexCategory).value);
						for(var indexSubCategory = firstSubCategory;indexSubCategory <= subCategoryCount;indexSubCategory++){
							if(document.getElementById(indexCategory+''+indexSubCategory) != null){
								if(document.getElementById(indexCategory+''+indexSubCategory).checked == true){
									if(categorySelectFlag == 1){
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+'0.00'+'`'+'@';
									}else{
										outString += patientNFID+'`'+indexCategory+'`'+indexSubCategory+'`'+document.getElementById(indexCategory+''+indexSubCategory).value+'`'+'@';
									}
									alert(indexCategory+'   '+indexSubCategory+'   '+document.getElementById(indexCategory+''+indexSubCategory).value);
								}
							}
						}

					}

				}

			}
		}

		if(outString != ''){
			document.getElementById('formId').action = 'payLabOrderfromIP.action?patientNFID='+patientNFID+'&totalAmount='+totalAmount+'&outString='+outString;
	        document.getElementById('formId').submit();
	        return true;
		}
		return false;
	} catch (e) {
		alert(e);
		return false;
	}
}





