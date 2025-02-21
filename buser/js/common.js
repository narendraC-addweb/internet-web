function validate_form(form) {    
    var str = '';
	var error=false;
	var elem = document.getElementById(form).elements;
	for(var i = 0; i < elem.length; i++)
	{	
		if(elem[i].className=='class_alert')  elem[i].className='required';
		if(elem[i].value=='' && elem[i].className=='required'){
		 elem[i].className='class_alert';
		 error=true;
		}
/*		str += "<b>Type:</b>" + elem[i].type + "&nbsp&nbsp";
		str += "<b>Name:</b>" + elem[i].name + "&nbsp;&nbsp;";
		str += "<b>Value:</b><i>" + elem[i].value + "</i>&nbsp;&nbsp;";
		str += "<b>Value:</b><i>" + elem[i].id + "</i>&nbsp;&nbsp;";		
		str += "<BR>";
*/
	} 
	if(error==true) return false 
	 $('input[type="submit"]').prop('disabled',true);
};

function customer_validate_form(form) {    
    var str = '';
	var error=false;
	var elem = document.getElementById(form).elements;
	for(var i = 0; i < elem.length; i++)
	{	
		if(elem[i].className=='class_alert')  elem[i].className='required';
		if(elem[i].value=='' && elem[i].className=='required'){
		 elem[i].className='class_alert';
		 error=true;
		}
	} 
	if(error==true) return false;
	if(document.getElementById('billing_address').checked==false){
      if(document.getElementById('address_b').value==''){
	   alert('Please enter billing address');
	   return false
	  }
      if(document.getElementById('building_id_b').value==''){
	   alert('Please enter billing building');
	   return false
	  }	  
	}

};

 var popUpWin=0;

	function popUpWindow(URLStr, left, top, width, height)
	
	{
	
	  if(popUpWin)
	
	  {
	
		if(!popUpWin.closed) popUpWin.close();
	
	  }
	
	  popUpWin = open(URLStr, 'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,width='+width+',height='+height+',left='+left+', top='+top+',screenX='+left+',screenY='+top+'');
	
	}
$(document).ready(function(){
$('.white').click(function(){
  $("#display").html('').hide();
});
$("#customer_search_id").keyup(function() 
{
 var searchbox = $(this).val();
 var dataString = 'searchword='+ searchbox;
 if(searchbox==''){
   $("#display").html('').hide();
 }else{
 $.ajax({
 type: "POST",
 url: "index.php?page=customer_suggestion_list&cust_sug_list=1",
 data: dataString,
 cache: false,
 success: function(html)
 {
  $("#display").html(html).show();
 }
});
}return false;    


});
});

function get_user_listing(val,div_name,script_name){
 var url='index.php?page='+script_name+'&cust_sug_list=1&id='+val;
 document.getElementById(div_name).innerHTML='<img src="images/loading.gif">';
	 $.get(url, function(data){  
	   document.getElementById(div_name).innerHTML=data;
	 });
 }

function trim(data){
	return data.split(" ").join("");
}		
function confirm_delete(url){
 var flag=confirm('Are you sure you want to delete record.');
 if(flag==true)
  window.location=url;
}

function getPrePkgeTTl(){
 var pkgeTll=document.getElementById('total_pre_packages_count').value;
 var pkgeId='';
 var pkgePrice='';
 var ttlPrice=0;
 for(i=1;i<=pkgeTll;i++){
	if(document.getElementById('packages_master_id'+i).checked==true){ 
	 pkgeId=document.getElementById('packages_master_id'+i).value;
	 ttlPrice=ttlPrice+parseFloat(document.getElementById('package_price'+pkgeId).value)
	}
 }
 document.getElementById('total_amount_pre_span').innerHTML=ttlPrice
}

function getCustPkgeTTl(){
 var pkgeTll=document.getElementById('total_cust_packages_count').value;
 var pkgeId='';
 var pkgePrice='';
 var ttlPrice=0;
 for(i=1;i<=pkgeTll;i++){
	if(document.getElementById('package_option_value_id'+i).checked==true){ 
	 pkgeId=document.getElementById('package_option_value_id'+i).value;
	 ttlPrice=ttlPrice+parseFloat(document.getElementById('package_option_value_price'+pkgeId).value)
	}
 }
 document.getElementById('total_amount_cust_span').innerHTML=ttlPrice
}
function changeCsts(){
 var ch=1;
 if(document.getElementById('chat_hid').value=='1'){
  document.getElementById('chat_div').className='show_class';
  document.getElementById('chat_hid').value='2'
  ch=2
 }
  
 if(document.getElementById('chat_hid').value=='2' && ch!=2){
  document.getElementById('chat_div').className='hide_class';
  document.getElementById('chat_hid').value='1'  
 }
}

function getStateCityList(field_name,field_in,val,sf){
 if(sf=='s'){
   var url='index.php?page=get_ajs_val&cust_sug_list=state&val='+val+'&fn='+field_name;
   $.get(url, function(data){  
	   document.getElementById(field_in).innerHTML=data;
   });
 }
 if(sf=='sv'){
   var url='index.php?page=get_ajs_val&cust_sug_list=state_c&val='+val+'&fn='+field_name;
   $.get(url, function(data){  
	   document.getElementById(field_in).innerHTML=data;
   });
 }
 if(sf=='c'){
   var url='index.php?page=get_ajs_val&cust_sug_list=city&val='+val+'&fn='+field_name;
   $.get(url, function(data){  
	   document.getElementById(field_in).innerHTML=data;
   });
 }
}
function FetchCityStateAll(val,sf,oc,req,till){
 if(sf=='ste'){
   var url='index.php?page=get_ajs_val&cust_sug_list=statefinal&val='+val+'&oc='+oc+'&req='+req+'&till='+till;
   $.get(url, function(data){  
	   document.getElementById('state_td').innerHTML=data;
   });
 }
 if(sf=='cty'){
   var url='index.php?page=get_ajs_val&cust_sug_list=cityfinal&val='+val+'&oc='+oc+'&req='+req+'&till='+till;
   $.get(url, function(data){  
	   document.getElementById('city_td').innerHTML=data;
   });
 } 
 if(sf=='area'){
   var url='index.php?page=get_ajs_val&cust_sug_list=areafinal&val='+val+'&oc='+oc+'&req='+req+'&till='+till;
   $.get(url, function(data){  
	   document.getElementById('area_td').innerHTML=data;
   });
 }  
 if(sf=='strt'){
   var url='index.php?page=get_ajs_val&cust_sug_list=streetfinal&val='+val+'&oc='+oc+'&req='+req+'&till='+till;
   $.get(url, function(data){  
	   document.getElementById('street_td').innerHTML=data;
   });
 }   
 if(sf=='buid'){
   var url='index.php?page=get_ajs_val&cust_sug_list=buildingfinal&val='+val+'&oc='+oc+'&req='+req+'&till='+till;
   $.get(url, function(data){  
	   document.getElementById('building_td').innerHTML=data;
   });
 }   
}
function getCustomerUsers(cust_id){
   var url='index.php?page=get_ajs_val&cust_sug_list=cust_detail&cid='+cust_id;
   var url1='index.php?page=get_ajs_val&cust_sug_list=user_list&cid='+cust_id;   
   $.get(url, function(data){  
	   document.getElementById('CustomerDetailTd').innerHTML=data;
       $.get(url1, function(data){  	   
		  document.getElementById('UserListTd').innerHTML=data;					
       });
   });
}
function checkSearchVal(){
 if(document.getElementById('cid').value==''){
  alert('Please enter proper search term');
  return false;
 }
}
function printPage(tid)
{
  var divToPrint=document.getElementById(tid);
  var newWin=window.open('','Print-Window','width=100,height=100');
  newWin.document.open();
  newWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="includes/templates/common/css/style.css" /></head><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
  newWin.document.close();
  setTimeout(function(){newWin.close();},10);
}
function getStreetDataP(val,fldname,rq){
 var url='index.php?page=get_ajs_val&cust_sug_list=StreetDataP&val='+val+'&fldname='+fldname+'&rq='+rq;   
 $.get(url, function(data){  
   document.getElementById('StreetTdP').innerHTML=data;
 });
}
function getBuildingDataP(val,fldname,rq){
 var url='index.php?page=get_ajs_val&cust_sug_list=BuildingDataP&val='+val+'&fldname='+fldname+'&rq='+rq;   
 $.get(url, function(data){  
   document.getElementById('BuildingTdP').innerHTML=data;
 });
}
function getStreetDataB(val,fldname,rq){
 var url='index.php?page=get_ajs_val&cust_sug_list=StreetDataB&val='+val+'&fldname='+fldname+'&rq='+rq;   
 $.get(url, function(data){  
   document.getElementById('StreetTdB').innerHTML=data;
 });
}
function getBuildingDataB(val,fldname,rq){
 var url='index.php?page=get_ajs_val&cust_sug_list=BuildingDataB&val='+val+'&fldname='+fldname+'&rq='+rq;   
 $.get(url, function(data){  
   document.getElementById('BuildingTdB').innerHTML=data;
 });
}


function getBuildingData(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=BuildingData&bid='+val;   
   $.get(url, function(data){  
	   document.getElementById('BuildingTd').innerHTML=data;
   });
}
/*function getBuildingDataB(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=BuildingDataB&bid='+val;   
   $.get(url, function(data){  
	   document.getElementById('BuildingTdB').innerHTML=data;
   });
}*/
function ChkAddress(){
 if(document.getElementById('billing_address').checked==true)
  document.getElementById('billingTD').className='hide_class'
 if(document.getElementById('billing_address').checked==false)
  document.getElementById('billingTD').className='show_class' 
}
function getRentalOption(val){
 if(val==1)
  document.getElementById('monthSpan').className='hide_class';
 if(val==2)
  document.getElementById('monthSpan').className='show_class';
}
function checkStatementForm(){
 var ttlrws=document.getElementById('totalRows').value;
 var errorchk=false;
 for(gp=1;gp<=ttlrws;gp++){
	 if(document.getElementById('due_checkbox'+gp).checked==true)
	 errorchk=true;
 }
 if(errorchk==false){
  alert('Please select atleast one column');
  return false;
 }
 if(document.getElementById('amount_deposit').value==''){
  alert('Please enter amount deposit');
  document.getElementById('amount_deposit').focus();
  return false;
 }
 document.statementForm.submit();
}
function validateSetupBox(form){
 var str = '';
 var error=false;
 var elem = document.getElementById(form).elements;
 for(var i = 0; i < elem.length; i++)
 {	
	if(elem[i].className=='class_alert')  elem[i].className='required';
	if(elem[i].value=='' && elem[i].className=='required'){
	 elem[i].className='class_alert';
	 error=true;
	}
 } 
  if(error==true) return false 	
 var pstb=document.getElementById('primary_setup_box_no').value
 var pcno=document.getElementById('primary_card_no').value
 var sstb=document.getElementById('seconday_setup_box_no').value
 var scno=document.getElementById('seconday_card_no').value
 
 if(pstb!='' || pcno!=''){
   var url='index.php?page=get_ajs_val&cust_sug_list=boxValidate&bxid='+pstb+'&crdid='+pcno;   
   $.get(url, function(data){  
	 if(data==0){
	  alert('Please enter valid Primary Setup Box and Card No.');
	  error=true;
	 }else{
	 if(sstb=='' && scno=='')	 
	  document.customer_reg_form.submit()
	 }
   });
 }
 if(sstb!='' || scno!=''){
   var url='index.php?page=get_ajs_val&cust_sug_list=boxValidate&bxid='+sstb+'&crdid='+scno;   
   $.get(url, function(data){  
	 if(data==0){
	  alert('Please enter valid Additional Setup Box and Card No.');
	  error=true;
	 }else{
	  document.customer_reg_form.submit()
	 }
   });
 }
 
 return false;
}
function GetUList(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=userList&val='+val;
   $.get(url, function(data){  
	   document.getElementById('UserListTd').innerHTML=data;
   });
}
function getChannelName(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=ChannelList&val='+val;
   $.get(url, function(data){  
	   document.getElementById('ChannelTd').innerHTML=data;
   });
}
function getChangePackage(val){

 if(val=='1'){
  document.getElementById('prePackageTd').className='show_class'
  document.getElementById('SingleChannelTd').className='hide_class'  
 }
 if(val=='2'){
  document.getElementById('prePackageTd').className='hide_class'
  document.getElementById('SingleChannelTd').className='show_class'  
 } 
 
 
}

function getProdList(val,ids){
   var url='index.php?page=get_ajs_val&cust_sug_list=ProductList&val='+val+'&id='+ids;
   $.get(url, function(data){  
	document.getElementById('prd'+ids).innerHTML=data
   });
}
function GetProdExtraInfo(val,ids){
   var url='index.php?page=get_ajs_val&cust_sug_list=ProductAttrb&val='+val;
   $.get(url, function(data){  
	document.getElementById('atrb'+ids).innerHTML=data
   });
   var url='index.php?page=get_ajs_val&cust_sug_list=ProductStock&val='+val;
   $.get(url, function(data){  
	document.getElementById('stck'+ids).innerHTML=data
   });
   var url='index.php?page=get_ajs_val&cust_sug_list=ProductPrice&val='+val+'&id='+ids;
   $.get(url, function(data){  
	document.getElementById('prc'+ids).innerHTML=data
	document.getElementById('product_price'+ids).value=data
	document.getElementById('total_price'+ids).value=data	
   });   
}

function GetStateCountry(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=StateCountry&val='+val;
   $.get(url, function(data){  
	   document.getElementById('StateConTd').innerHTML=data;
   });
}
function getAreaData(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=AreaData&val='+val;
   $.get(url, function(data){  
	   document.getElementById('AreaTd').innerHTML=data;
   });
}
function getStreetData(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=StreetData&val='+val;
   $.get(url, function(data){  
	   document.getElementById('StreetTd').innerHTML=data;
   });
}
function getBuildingData(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=BuildingData&bid='+val;   
   $.get(url, function(data){  
	   document.getElementById('BuildingTd').innerHTML=data;
//   	   ChkFibers(val);
   });
}
/*function getBuildingDataB(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=BuildingDataB&bid='+val;   
   $.get(url, function(data){  
	   document.getElementById('BuildingTdB').innerHTML=data;
   });
}*/
function getSetupBoxList(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=SetupBoxList&sno='+val;   
   $.get(url, function(data){  
	   document.getElementById('setupBoxDiv').innerHTML=data;
   });
}
function getBoxDetail(val){
   document.getElementById('setup_box_number').value=document.getElementById('stb_num'+val).value
   document.getElementById('stb_box_id').value=val
   document.getElementById('mso_id').value=document.getElementById('ms_id'+val).value ;
   document.getElementById('box_owner').value=document.getElementById('bxon'+val).value;   
   document.getElementById('setupBoxDiv').innerHTML='';
   //getPackages(document.getElementById('mso_id').value,document.getElementById('box_owner').value);
}
function getSetupBoxListSec(val,cid){
   var url='index.php?page=get_ajs_val&cust_sug_list=SetupBoxListSeondary&sno='+val+'&cid='+cid;   
   $.get(url, function(data){  
	   document.getElementById('setupBoxDiv').innerHTML=data;
   });
}
function getSetupBoxListReplaceReplare(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=SetupBoxListReplaceRepair&sno='+val;
   $.get(url, function(data){  
	   document.getElementById('setupBoxDiv').innerHTML=data;
   });
}
function getBoxDetailSec(val){
   document.getElementById('setup_box_number').value=document.getElementById('stb_num'+val).value
   document.getElementById('stb_box_id').value=val
   document.getElementById('mso_id').value=document.getElementById('ms_id'+val).value ;
   document.getElementById('box_owner').value=document.getElementById('bxon'+val).value;      
   document.getElementById('setupBoxDiv').innerHTML='';
}
function getPackages(val,onw){
   var url='index.php?page=get_ajs_val&cust_sug_list=getPackageList&sno='+val+'&onw='+onw;   
   $.get(url, function(data){  
	   document.getElementById('PackageTd').innerHTML=data;
   });	
}
function getPackageDetail(val){
   var url='index.php?page=get_ajs_val&cust_sug_list=getPackageDetail&val='+val;   
   $.get(url, function(data){  
	   document.getElementById('PackageDetail').innerHTML=data;
   });	
}
var ttldues=0;
function getTotalDues(val,chk){
	if(document.getElementById('due_checkbox'+chk).checked==true){
	 if(parseFloat(document.getElementById('pending_amount'+val).value)!=0)	
	  ttldues=parseFloat(ttldues)+parseFloat(document.getElementById('pending_amount'+val).value);
	 else
	  ttldues=parseFloat(ttldues)+parseFloat(document.getElementById(val).value);
	 if(parseFloat(document.getElementById('pending_amount'+val).value)==0){
	  ttldues=parseFloat(ttldues)-parseFloat(document.getElementById('discount'+val).value);
	  ttldues=parseFloat(ttldues)+parseFloat(document.getElementById('bnFee'+val).value);	  
	 }
	}
	if(document.getElementById('due_checkbox'+chk).checked==false){
	 if(parseFloat(document.getElementById('pending_amount'+val).value)!=0)	
	  ttldues=parseFloat(ttldues)-parseFloat(document.getElementById('pending_amount'+val).value);
	 else
	  ttldues=parseFloat(ttldues)-parseFloat(document.getElementById(val).value);
	 if(parseFloat(document.getElementById('pending_amount'+val).value)==0){
	  ttldues=ttldues+parseFloat(document.getElementById('discount'+val).value);
	  ttldues=ttldues-parseFloat(document.getElementById('bnFee'+val).value);
	 }
	}
   document.getElementById('amount_deposit').value=ttldues;
   document.getElementById('amount_deposit_actual').value=ttldues;   
}
function getOtherOptions(val){
 document.getElementById('cheque_span').className='hide_class';
 document.getElementById('online_transfer_span').className='hide_class';
 document.getElementById('back_deposit_span').className='hide_class';
 if(val=='2')
   document.getElementById('cheque_span').className='show_class';
 if(val=='3')
   document.getElementById('online_transfer_span').className='show_class';
 if(val=='4')
   document.getElementById('back_deposit_span').className='show_class';
}
function checkStatementForm(){
 var ttlrws=document.getElementById('totalRows').value;
 var errorchk=false;
 for(gp=1;gp<=ttlrws;gp++){
	 if(document.getElementById('due_checkbox'+gp).checked==true)
	 errorchk=true;
 }
 if(errorchk==false){
  alert('Please select atleast one column');
  return false;
 }
 if(document.getElementById('payment_mode').value==''){
  alert('Please select payment mode');
  document.getElementById('payment_mode').focus();
  return false;
 }
 var pymde=document.getElementById('payment_mode').value;
 if(pymde=='2'){
  if(document.getElementById('bank_name').value==''){
   alert('Please enter bank name');
   document.getElementById('bank_name').focus();
   return false;
  }
  if(document.getElementById('cheque_no').value==''){
   alert('Please cheque no.');
   document.getElementById('cheque_no').focus();
   return false;
  }
  if(document.getElementById('cheque_date').value==''){
   alert('Please enter cheque date');
   document.getElementById('cheque_date').focus();
   return false;
  }
 }

 if(pymde=='3'){
  if(document.getElementById('bank_name_o').value==''){
   alert('Please enter bank name');
   document.getElementById('bank_name_o').focus();
   return false;
  }
  if(document.getElementById('trans_no').value==''){
   alert('Please transation no.');
   document.getElementById('trans_no').focus();
   return false;
  }
  if(document.getElementById('trans_date').value==''){
   alert('Please enter transation date');
   document.getElementById('trans_date').focus();
   return false;
  }
 }

 if(pymde=='4'){
  if(document.getElementById('bank_name_d').value==''){
   alert('Please enter bank name');
   document.getElementById('bank_name_d').focus();
   return false;
  }
  if(document.getElementById('slip_no').value==''){
   alert('Please slip no.');
   document.getElementById('slip_no').focus();
   return false;
  }
  if(document.getElementById('slip_date').value==''){
   alert('Please enter disposit date');
   document.getElementById('slip_date').focus();
   return false;
  }
 }
 $('input[type="submit"]').prop('disabled',true);
 document.statementForm.submit();

}
function validatePaymentForm(){
 if(document.getElementById('cust_code').value==''){
  alert('Please enter customer code');
  document.getElementById('cust_code').focus();
  return false;
 }
 if(document.getElementById('amount').value==''){
  alert('Please enter amount');
  document.getElementById('amount').focus();
  return false;  
 }
 if(document.getElementById('payment_mode').value==''){
  alert('Please select payment mode');
  document.getElementById('payment_mode').focus();
  return false;
 } 
 var pymde=document.getElementById('payment_mode').value;
 if(pymde=='2'){
  if(document.getElementById('bank_name').value==''){
   alert('Please enter bank name');
   document.getElementById('bank_name').focus();
   return false;
  }
  if(document.getElementById('cheque_no').value==''){
   alert('Please cheque no.');
   document.getElementById('cheque_no').focus();
   return false;
  }
  if(document.getElementById('cheque_date').value==''){
   alert('Please enter cheque date');
   document.getElementById('cheque_date').focus();
   return false;
  }
 }
 if(document.getElementById('cust_id').value==''){
  alert('Please enter valid  customer code');
  document.getElementById('cust_code').focus();
  return false;  
 } 
}
function checkAllbox(val){
 var getTll=document.getElementById('totalRow'+val).value;
 var chksts=document.getElementById('user_right_id_all'+val).checked
 for(i=1;i<=getTll;i++){
  document.getElementById('user_right_id'+val+i).checked=chksts;
 }
}

/////////Mrp Start
function getCurrentPackages(val){
  var pckids = [];
 if(typeof($("#pck"+$(val).val()).val()) != "undefined"){
  pckids=$("#pck"+$(val).val()).val().split(",");
  $('input[name^=\'standard_packages_master_id\']').each(function(){
   if(jQuery.inArray( $(this).val(), pckids )==-1){
	$(this).prop('checked',false);
	$(this).attr('disabled',false);
   }else{
	$(this).prop('checked',true);
	$(this).attr('disabled',true);
   }
  })
 }
 if(typeof($("#chnl"+$(val).val()).val()) != "undefined") {
	  var chnlids = [];	
	  chnlids=$("#chnl"+$(val).val()).val().split(",");
	  $('input[name^=\'channel_id\']').each(function(){
	   if(jQuery.inArray( $(this).val(), chnlids )==-1){
		$(this).prop('checked',false);
		$(this).attr('disabled',false);
	   }else{
		$(this).prop('checked',true);
		$(this).attr('disabled',true);
	   }
	  })
  }
  getTotalAmount();
}
function checkChnlLink(val){
    /*
  var pckchl=$("#pckchl"+$(val).val()).val().split(",");
  if($(val).prop('checked')==true){
   for(i=0;i<pckchl.length;i++){
    $("#channel_id"+pckchl[i]).prop('checked',true)
    $("#channel_id"+pckchl[i]).attr('disabled',true);
   }
  }else{
   for(i=0;i<pckchl.length;i++){
    $("#channel_id"+pckchl[i]).prop('checked',false)
	$("#channel_id"+pckchl[i]).attr('disabled',false);
	
   }	  
  }*/
 getTotalAmount();
}
function getTotalAmount(){
  if($('#box_id').val()==''){
   alert('Please select STB');
   return false;
  }
  
  $('#MainControl').html('<table class="table" id="BasePackageTd" style="margin:0px;"><tr><td colspan="2" align="center"><strong>Base Package</strong></td></tr><tr><th style="text-align:left">Name</th><th style="text-align:right">Amount</th></tr></table><table width="100%" class="table" id="AddonPackageTd" style="margin:0px;"><tr><td colspan="2" align="center"><strong>Addon Pack</strong></td></tr><tr><th style="text-align:left">Name</th><th style="text-align:right">Amount</th></tr></table><table width="100%" class="table" id="ChannelsTd" style="margin:0px;"><tr><td colspan="2" align="center"><strong>Channels</strong></td></tr><tr><th style="text-align:left">Name</th><th style="text-align:right">Amount</th></tr></table><table width="100%" class="table" id="TotalDivTd"><tr><td colspan="2" style="text-align:right">Total Channels:<span id="ttlchnldiv"></span><br /><i style="font-size:11px;color:#007AFF">(Please note, for calculation of Network Capacity Fee 1 HD channel = 2 SD channel)</i></td></tr><tr><td style="text-align:left">Net Amount</td><td id="NetAmountTd" style="text-align:right"></td></tr><tr><td style="text-align:left">NCF Amount</td><td id="NcfAmountTd" style="text-align:right"></td></tr><tr><td style="text-align:left">Tax ('+$('#ttltaxVal').val()+'%)</td><td id="TaxAmountTd" style="text-align:right"></td></tr><tr><td style="color:#007AFF !important;font-size:16px;text-align:right">Total Payable Amount</td><td style="text-align:right;color:#007AFF;font-size:16px" id="TotalAmountTd"></td></tr></table>');
  
  
  var totalAmt=0;
  var chnlcnt=0;
  var chnlcntCutm=0
  $('input[name^=\'standard_packages_master_id\']').each(function(){
	if($(this).prop('checked')==true){
	 totalAmt=parseFloat(totalAmt)+parseFloat($("#totAmt"+$(this).val()).val());
	 chnlcnt=parseInt(chnlcnt)+parseInt($("#totchnl"+$(this).val()).val());
	 chnlcntCutm=parseInt(chnlcntCutm)+parseInt($("#totchnlcustm"+$(this).val()).val());
	  if($("#totpcktyp"+$(this).val()).val()=='2')
	   $('#BasePackageTd').append('<tr><td style="text-align:left">'+$("#totpcknme"+$(this).val()).val()+' <i style="font-size:11px;color:#007AFF">('+$("#totchnlcustm"+$(this).val()).val()+' Channels)</i></td><td style="text-align:right">'+$("#totAmt"+$(this).val()).val()+'</td></tr>')
	  else
	   $('#AddonPackageTd').append('<tr><td style="text-align:left">'+$("#totpcknme"+$(this).val()).val()+' <i style="font-size:11px;color:#007AFF">('+$("#totchnlcustm"+$(this).val()).val()+' Channels)</i></td><td style="text-align:right">'+$("#totAmt"+$(this).val()).val()+'</td></tr>')
	}
  })
  
  var chnlids='';
  if(typeof($("#onlychnl"+$('#box_id').val()).val()) != "undefined"){
	chnlids=$("#onlychnl"+$('#box_id').val()).val().split(",");  
  }
  $('input[name^=\'channel_id\']').each(function(){
												 
	if($(this).prop('checked')==true && $(this).prop('disabled')==true && jQuery.inArray( $(this).val(), chnlids )!=-1){
	 totalAmt=parseFloat(totalAmt)+parseFloat($("#chlamt"+$(this).val()).val());
	 $('#ChannelsTd').append('<tr><td style="text-align:left">'+$("#chlnme"+$(this).val()).val()+' <i style="font-size:11px;color:#007AFF">('+$("#chlcnt"+$(this).val()).val()+' Channels)</i></td><td style="text-align:right">'+$("#chlamt"+$(this).val()).val()+'</td></tr>')
	}
	
	if($(this).prop('checked')==true && $(this).prop('disabled')==false){
	 totalAmt=parseFloat(totalAmt)+parseFloat($("#chlamt"+$(this).val()).val());
	 $('#ChannelsTd').append('<tr><td style="text-align:left">'+$("#chlnme"+$(this).val()).val()+' <i style="font-size:11px;color:#007AFF">('+$("#chlcnt"+$(this).val()).val()+' Channels)</i></td><td style="text-align:right">'+$("#chlamt"+$(this).val()).val()+'</td></tr>')
	}
    if($(this).prop('checked')==true){			 
	 chnlcnt=chnlcnt+parseFloat(($("#chlcnt"+$(this).val()).val()))
     chnlcntCutm=chnlcntCutm+parseFloat(($("#chlcnt"+$(this).val()).val()))
    } 
  })  
  var ncfChnl=chnlcnt-parseFloat($("#ttlchnlcnt").val());
//  console.log(ncfChnl/parseFloat($("#ncfchnlcnt").val()));
  var NcfAmt=0;
  //console.log($("#ncfchnlamt").val());
  if(ncfChnl>0 && parseFloat($("#ncfchnlamt").val())>0) NcfAmt=(Math.ceil(ncfChnl/parseFloat($("#ncfchnlcnt").val())))*parseFloat($("#ncfchnlamt").val());
  $("#ttlchnldiv").html(chnlcntCutm);
  $("#NetAmountTd").html(totalAmt.toFixed(2));
  $("#NcfAmountTd").html(NcfAmt); 

  
  TxAmt=((parseFloat(totalAmt)+parseFloat(NcfAmt))*parseFloat($('#ttltaxVal').val())/100).toFixed(2);
  $("#TaxAmountTd").html(TxAmt);
  finaltotalAmt=parseFloat(totalAmt)+parseFloat(NcfAmt)+parseFloat(TxAmt);
  $("#TotalAmountTd").html(parseFloat(finaltotalAmt).toFixed(2));  
}
function confirmDeactive(){
 var flag=confirm('Are you sure you want to send deactive request for selected pacakges.');
 if(flag==false)
  return false;	
}
function searchChannels(val){
  // Search text
  var text = $(val).val();
 
  // Hide all content class element
  $('.BrdChannelDiv').parent().parent().hide();

  // Search 
   // Search 
   $('.BrdChannelDiv').each(function(){
 
    if($(this).text().toLowerCase().indexOf(""+text+"") != -1 ){
     $(this).closest('.BrdChannelDiv').parent().parent().show();
    }
  });	
}
/////////////Mrp End
