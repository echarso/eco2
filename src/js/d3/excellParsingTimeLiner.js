/**
 * 
 */



/*




1 . when we generate a testcase then numeric parameters , text parameters should be and common simple



A:::numeric_input->8 B:::text_input->text, C:::plain 


2. in ctrAlloption 
	a crtOptionCtr should carry the information like of been numeric , text or common by the followings 
		

*/


var excellParser = {};

var AllTransactions =[];
var PROJECT_BANK_GOOGLE = [];
var years = [];
var ExpensesToArray =[];
var IncomeFromArray = [];
var LineChartArray = [];
var LineChartKeys =["expenses","income"];
var BalanceLineChartArray =[];
var BalanceLineChartKeys=["balance"];
var XLSX = require('xlsx');

import * as  D3Actions from "../actions/D3Actions";

function transClass( ){
   this.person;
   this.year;
   this.month;
   this.day;
   this.time;
   this.transcaction;
   this.moneyTo;
   this.moneyFrom;
   this.transactionType;
};

var xlf;
excellParser.setXlf = function( xlfInput){
    xlf = xlfInput;
    if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

}
//var drop = document.getElementById('drop');



function handleDrop(e) {
	
	    e.stopPropagation();
	    e.preventDefault();
	    var files = e.dataTransfer.files;
	    var i,f;
	    for (i = 0, f = files[i]; i != files.length; ++i) {
	    	var workbook ;
	        var reader = new FileReader();
	        var name = f.name;
	        reader.onload = function(e) {
	            var data = e.target.result;

	            workbook = XLSX.read(data, {type: 'binary'});
	            process_wb(workbook);
				
	            /* DO SOMETHING WITH workbook HERE */
	          };
	          reader.readAsBinaryString(f);
	        //reader.readAsBinaryString(f);
	       // reader.readAsArrayBuffer(f);

	 }
}



function process_wb(workbook){
	
var sheetIteration = 0 ; ////// to be removed Haris
	var sheet_name_list = workbook.SheetNames;
    var temporary_hack_to_read_first_sheet_only = 0 ; 
	sheet_name_list.forEach(function(y) { /* iterate through sheets */
		


	   var sheet = workbook.Sheets[y];
	   var range = XLSX.utils.decode_range(sheet['!ref']); // get the range
	   
	   var C = 0 ;
	   var R= 0;
	   if ( temporary_hack_to_read_first_sheet_only == 0){
		   haveFunWithNombers(sheet, C, R);
		   temporary_hack_to_read_first_sheet_only= 1;
	   }


      alert("DONE PARSING EXCELL");

      
      sheetIteration++;
	
	});
	
	   


}


function handleDragover(e) {

	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}

/*
if(drop.addEventListener) {
	
	drop.addEventListener('dragenter', handleDragover, false);
	drop.addEventListener('dragover', handleDragover, false);
	drop.addEventListener('drop', handleDrop, false);
}
*/
//var xlf = document.getElementById('xlf');
function handleFile(e) {

	


	alert(" we have a file ");
	var files = e.target.files;
	var f = files[0];
	{
		
		  	var workbook ;
	        var reader = new FileReader();
	        var name = f.name;
	           
	        reader.onload = function(e) {

		            var data = e.target.result;
		            
					var arr = fixdata(data);
					workbook = XLSX.read(btoa(arr), {type: 'base64'})
					
		           // workbook = XLSX.read(data, {type: 'binary'});
		            process_wb(workbook);
					
					//var worker = new Worker('generateAllTCWW.js');
					//worker.postMessage();
					
		            /* DO SOMETHING WITH workbook HERE */
		          };
		        //  reader.readAsBinaryString(f);
				
	            /* DO SOMETHING WITH workbook HERE */
	          //reader.readAsBinaryString(f);
	        reader.readAsArrayBuffer(f);

	
	}

}

//if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);


function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}





function haveFunWithNombers(sheet, C, R){



AllTransactions =[];
years = [];
ExpensesToArray =[];
IncomeFromArray = [];
LineChartArray = [];
BalanceLineChartArray =[];

	   var person;
	   var year;
	   var month;
	   var day;
	   var time;
	   var transaction;
	   var moneyTo;
	   var moneyFrom;
	   var transactionType;
	   var rowLast = 0;
	   var date;
	   var originator;
	   var transaction2;
	   var GlobalBalance = 0.0;
	   var GlobalExpenses = 0.0;
	   var GlobalIncome = 0.0;

	  for(var rowIndex = 1; rowLast != 1 ; ++rowIndex) {		    
	
		  var cellref = XLSX.utils.encode_cell({c:C+0, r:rowIndex});
		   	if(sheet[cellref]){
		   			var cell = sheet[cellref];
		   			if(typeof cell.v !== 'undefined' && cell.v  && cell.v.toString().replace(/\s+/g, '') != ""){
		   			  date  = cell.v;
		   		      var dateArray = date.split("-");
                      year = parseInt(dateArray[0]);
                      month = parseInt(dateArray[1]);
                      day = parseInt(dateArray[2]);
		   			}else{
				   		
				   		rowLast = 1;
				   		break;
				   	}
		   	}else{
		   		
		   		rowLast = 1;
		   		break;
		   	}

            var cellref = XLSX.utils.encode_cell({c:C+1, r:rowIndex});
            if(sheet[cellref]){
               originator = sheet[cellref].v;
            }

	
            var cellref = XLSX.utils.encode_cell({c:C+3, r:rowIndex});
            if(sheet[cellref]){
               var numInString = sheet[cellref].v;
               // for javascript a number like that 2.000,2332 should be written like 2000.2332
               numInString = numInString.replace(".","");
               numInString = numInString.replace(",",".");
               transaction2  = parseFloat(numInString);
               GlobalBalance = GlobalBalance + transaction2;

               if ( transaction2 > 0 ) {

               	  GlobalIncome = GlobalIncome + transaction2;
                  moneyFrom = originator;
                  moneyTo = null;
               }else{
               	  var moneyTr = (-1)*transaction2;
                  GlobalExpenses = GlobalExpenses + moneyTr;
                  moneyTo = originator;
                  moneyFrom = null;
               }
            }

   			var tr = new transClass();
   			tr.transaction = transaction2;
   			tr.currentBalance = GlobalBalance;
   			tr.currentExpences = GlobalExpenses;
   			tr.currentIncome = GlobalIncome;

            tr.date = date;
            tr.moneyFrom = moneyFrom;
            tr.moneyTo = moneyTo;
            tr.year = year;
            tr.month = month;
            tr.transactionType = transaction2 >0 ? "income":"expenses";
            if ( transaction2 <0 ){
					transaction2 = (-1) * transaction2;
			}

            if( IncomeFromArray[tr.moneyFrom] == null){
            	IncomeFromArray[tr.moneyFrom] = transaction2;
			}else{
				IncomeFromArray[tr.moneyFrom] += transaction2;
			}


            
            if( ExpensesToArray[tr.moneyTo] == null){
            	ExpensesToArray[tr.moneyTo] = transaction2;
			}else{
				ExpensesToArray[tr.moneyTo] += transaction2;
			}
   		
   			AllTransactions.push(tr);           
	  }		  
	createOurTables( AllTransactions);

	lineChartCreate ( AllTransactions);


/*alert(" done ? ")
  for ( var i  in years){
  	console.log(" year : " + i);
  	console.log(" year expenses: " + years[i].expenses);
  	console.log(" year income  : " + years[i].income);
  	console.log(" year balance : " + years[i].balance);
  	printcostCategory(0,years[i].costCategory);
	
	for ( var m in years[i].months){
		
  		var ma  = years[i].months[m];
  		console.log("    month         : " + m  );
  		console.log("    month expenses: " + ma.expenses);
  		console.log("    month income  : " + ma.income);
  		console.log("    month balance : " + ma.balance);
  		printcostCategory(1,ma.costCategory);

  	}

  }
alert( " printing done ");
*/
}


var categoryTypeArray= [100, 250, 600 , 1100, 1600, 2000, 3000, 6000, 10000];

  
function printcostCategory( index , category ){
	for ( var j in categoryTypeArray){
		
		var cat = categoryTypeArray[j];
		if ( category[cat] != null ){
			console.log("costCategory " + cat + " amount " + category[cat].amount + " times " +  category[cat].times );
		}else{
			console.log("costCategory " + cat + " amount 0   times  0 ");
		}

	}

}

function createOurTables( transactionLoaded){
for ( var index in transactionLoaded){

		var tr = transactionLoaded[index];

		if ( years[tr.year] == null){
               years[tr.year] = {};
               years[tr.year].name = tr.year;
               years[tr.year].income  = 0.0;
               years[tr.year].expenses = 0.0;
               years[tr.year].balance = tr.transaction ;
               years[tr.year].costCategory = [];
               years[tr.year].transactionsForYear =[];
               years[tr.year].transactionsForYear.push(tr);
               if ( tr.transaction < 0){

               	    var gZeroTr = (-1)*tr.transaction;
               		fixCostCategory(years[tr.year].costCategory ,gZeroTr);
               		years[tr.year].expenses  = tr.transaction;

               }else{
               		years[tr.year].income = tr.transaction;
               }
               years[tr.year].months = [];
			   createNewMonthInput(tr, years[tr.year].months);
         
        }else{
        	// year already exists
        	years[tr.year].balance += tr.transaction ;
        	years[tr.year].transactionsForYear.push(tr);
        	if ( tr.transactionType =="expenses"){
        		    var gZeroTr = (-1)*tr.transaction;
               		fixCostCategory(years[tr.year].costCategory , gZeroTr);
               		years[tr.year].expenses  += gZeroTr;
            }else{
               		years[tr.year].income += tr.transaction;
            }

            if ( years[tr.year].months[tr.month] == null){
				createNewMonthInput(tr, years[tr.year].months);
            }else{
            	updateMonthData(tr,years[tr.year].months[tr.month] );	
            }

        }
	}

  generateDataDoneEvent();
}


function updateMonthData(tr,month ){
	month.transactionsForMonth.push(tr);
    month.balance += tr.transaction;
    //console.log(" month balance --> " + month.balance );

    if ( tr.transaction < 0){
        var gZeroTr = (-1)*tr.transaction;	
        fixCostCategory(month.costCategory , gZeroTr);
		month.expenses += gZeroTr;
	    //console.log(" month expenses --> " + month.expenses );

	}else{
		month.income += tr.transaction;
		//console.log(" month income --> " + month.income );
	}

	month.LineChart.push({"date":tr.date,
										 "expenses":month.expenses,
										 "income":month.income});

	month.BalanceLineChart.push({"date":tr.date,
										 "balance":month.balance});
}

function createNewMonthInput ( tr , monthArray){
	monthArray[tr.month]= {};
	monthArray[tr.month].name = tr.month;
	monthArray[tr.month].income = 0.0;
	monthArray[tr.month].expenses = 0.0;
	monthArray[tr.month].balance = tr.transaction;
	monthArray[tr.month].transactionsForMonth =[];
    monthArray[tr.month].transactionsForMonth.push(tr);
	monthArray[tr.month].costCategory = [];
	if ( tr.transaction < 0){
		var gZeroTr = (-1)*tr.transaction;
		fixCostCategory(monthArray[tr.month].costCategory , gZeroTr);
		monthArray[tr.month].expenses = gZeroTr;
	}else{
		monthArray[tr.month].income = tr.transaction;
	}

	monthArray[tr.month].LineChart =[];
	monthArray[tr.month].LineChart.push({"date":tr.date,
										 "expenses":monthArray[tr.month].expenses,
										 "income":monthArray[tr.month].income});

	monthArray[tr.month].BalanceLineChart =[];
	monthArray[tr.month].BalanceLineChart.push({"date":tr.date,
										 "balance":monthArray[tr.month].balance});


}

function fixCostCategory( costCategory , transaction){
	for ( var i in categoryTypeArray){
		if ( transaction < categoryTypeArray[i]){
			var cat = categoryTypeArray[i];
			if ( costCategory[cat] == null ){
				costCategory[cat] = {};
				costCategory[cat].category = cat;
				costCategory[cat].amount = transaction;
				costCategory[cat].times  = 1;
			}else{
				costCategory[cat].category = cat;
				costCategory[cat].amount =   costCategory[cat].amount + transaction;
				costCategory[cat].times++;

			}
			return;
		}
	}
}


function generateDataDoneEvent(){
  	D3Actions.DATA_LOADED_FROM_EXCELL();
}


function lineChartCreate(allTransactions){

    var GlobalExpenses = 0.0;
    var GlobalIncome = 0.0;

    for ( var i = allTransactions.length -1 ; i > -1  ; i--){

        var tr = allTransactions[i];
        var input ={};
        input.date =tr.date;
        if ( tr.transaction <0 ){
            GlobalExpenses += (-1)*tr.transaction;
        }else{
            GlobalIncome +=  tr.transaction;
        }

        input.expenses = GlobalExpenses;
        input.income = GlobalIncome;

        LineChartArray.push(input);

        var bInput ={};
        bInput.date =tr.date;
        bInput.balance =tr.currentBalance;

        BalanceLineChartArray.push(bInput);
    }

}

excellParser.getLoadedData      = function(){  return years;}
excellParser.getAllTransactions = function (){ return AllTransactions;}
excellParser.getExpensesToArray = function(){ return ExpensesToArray;}
excellParser.getIncomeFromArray = function(){ return IncomeFromArray;}

/*----------------*/
excellParser.getYearLineBar = function (){return LineChartArray;}
excellParser.getYearBalanceLineChartArray = function (){ return  BalanceLineChartArray;}

module.exports = excellParser;


