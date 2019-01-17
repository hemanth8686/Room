/**
 * 
 */





//Billing Module

function roomTypeValidation(){
	try {
		if((document.getElementById('txt_roomType').value).trim().length == 0)alert('Please enter the Room type');
		else if((document.getElementById('txt_rent').value).trim().length == 0)alert('Please enter the rent');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function roomNumberValidation(){
	try {
		if(document.getElementById('cmb_roomType').value == -1)alert('Please select the Room type');
		else if((document.getElementById('txt_roomNumber').value).trim().length == 0)alert('Please enter the room number');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function ICU_RatesValidation(){
	try {
		if((document.getElementById('txt_description').value).trim().length == 0)alert('Please enter the description');
		else if((document.getElementById('txt_units').value).trim().length == 0)alert('Please enter the units');
		else if((document.getElementById('txt_amount').value).trim().length == 0)alert('Please enter the amount');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function OT_RatesValidation(){
	try {
		if((document.getElementById('txt_description').value).trim().length == 0)alert('Please enter the description');
		else if((document.getElementById('txt_minor').value).trim().length == 0 && (document.getElementById('txt_major').value).trim().length == 0 
			&& (document.getElementById('txt_common').value).trim().length == 0 && (document.getElementById('txt_hrBasis').value).trim().length == 0)alert('Please enter the any of minor,major,common or hr basis amount');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function consultant_RatesValidation(){
	try {
		if(document.getElementById('cmb_consultantName').value == -1)alert('Please select the Consultant name');
		else if((document.getElementById('txt_gwd').value).trim().length == 0)alert('Please enter the G.WD');
		else if((document.getElementById('txt_splwd').value).trim().length == 0)alert('Please enter the SPL.WD');
		else if((document.getElementById('txt_icu').value).trim().length == 0)alert('Please enter the ICU');
		else if((document.getElementById('txt_tw').value).trim().length == 0)alert('Please enter the T.W');
		else if((document.getElementById('txt_sicu').value).trim().length == 0)alert('Please enter the SICU');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function insuranceLTD_Validation(){
	try {
		if((document.getElementById('txt_insuranceCompany').value).trim().length == 0)alert('Please enter the insurance company name');
		else if(document.getElementById('txt_insuranceType').value == -1)alert('Please select the insurance type');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function district_Validation(){
	try {
		if((document.getElementById('txt_districtName').value).trim().length == 0)alert('Please enter the district name');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function package_Validation(){
	try {
		if((document.getElementById('txt_packageName').value).trim().length == 0)alert('Please enter the package name');
		else if((document.getElementById('txt_amount').value).trim().length == 0) alert('Please enter the amount');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function OTCharges_Validation(){
	try {
		if(document.getElementById('cmb_roomType').value == -1)alert('Please select the room type');
		else if(document.getElementById('txt_duration').value == -1)alert('Please select the duration');
		else if((document.getElementById('txt_amount').value).trim().length == 0)alert('Please enter the amount');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function othersRates_Validation(){
	try {
		if((document.getElementById('txt_description').value).trim().length == 0)alert('Please enter the description');
		else if((document.getElementById('txt_amount').value).trim().length == 0)alert('Please enter the amount');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}

function procedures_Validation(){
	try {
		if((document.getElementById('txt_description').value).trim().length == 0)alert('Please enter the description');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}


//Ip Module
function onClickRoomAvailability(roomId, rowId){
	try {
		document.getElementById('hd_roomId').value = roomId;
		if(document.getElementById('roomAvailability_'+rowId).value != -1){
			document.getElementById('hd_roomAvailability').value = document.getElementById('roomAvailability_'+rowId).value;
			document.getElementById('formId').action = 'updateRoomAvailability.action';
		    document.getElementById('formId').submit();
		    return true;
		}
	} catch (e) {
		alert(e);
	}
	return false;
}

function roomAllocationWhileOnchage(ipId, patientNFID, roomTypeId, elementId){
	try {
		if(document.getElementById(elementId).value != 'Select'){
			document.getElementById('hd_regId').value = ipId;
			document.getElementById('hd_patientNFID').value = patientNFID;
			document.getElementById('hd_roomTypeId').value = roomTypeId;
			document.getElementById('hd_roomNumber').value = document.getElementById(elementId).value;
			
			document.getElementById('formId').action = "roomAllocation.action";
			document.getElementById('formId').submit();
			return true;
		}
	} catch (e) {
		alert(e);
	}
	return false;
}

function roomAllocationValidation(){
	try {
		if(document.getElementById('cmb_room').value == 'Select'){
			alert('Please select the room number');
			return false;
		}
	} catch (e) {
		alert(e);
	}
	return true;
}



//Settings

function updateCompanyDetailsValidation(){
	try {
		if((document.getElementById('txt_companyName').value).trim().length == 0)alert('Please enter the company name');
		else if((document.getElementById('txt_address').value).trim().length == 0)alert('Please enter the address');
		else if((document.getElementById('txt_phoneNumber').value).trim().length == 0)alert('Please enter the phone number');
		else if((document.getElementById('txt_faxNumber').value).trim().length == 0)alert('Please enter the fax number');
		else if((document.getElementById('txt_email').value).trim().length == 0)alert('Please enter the company email');
		else if((document.getElementById('img_logo').value).trim().length == 0)alert('Please upload the company logo');
		else return true;
	} catch (e) {
		alert(e);
	}
	return false;
}