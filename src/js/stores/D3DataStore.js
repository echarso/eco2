import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
var  excellInput = require("../d3/excellParsingTimeLiner.js");

class D3DataStore extends EventEmitter {
  constructor() {
    super();



    this.barId = 0;
    this.allReadyLineMounted = false;


    this.cycleData = {
	 "name": "flare",
	 "children": [
	  {
	   "name": "Jenuary",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 2000 },
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 4000}
	    ]
	  },
	  {
	   "name": "February",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 1000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 3000}
	    ]
	  },
	  {
	   "name": "March",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 2000}
	    ]
	  },
	  {
	   "name": "April",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 1000}
	    ]
	  },
	  {
	   "name": "May",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 4812},
	       {"name": "balance", "size": 1000}
	    ]
	  },
	  {
	   "name": "June",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 4812},
	       {"name": "balance", "size": 2000}
	    ]
	  },
	  {
	   "name": "July",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 4000}
	    ]
	  },
	  {
	   "name": "August",
	   "size":"1",
	   "children": [
	       {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 4000}
	    ]
	  },
	  {
	   "name": "September",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 4000}
	    ]
	  },
	  {
	   "name": "Octomber",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 4000}
	    ]
	  },
	  {
	   "name": "November",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 4000}
	    ]
	  },
	  {
	   "name": "December",
	   "size":"1",
	   "children": [
	      {"name": "expenses", "size": 3000},
	       {"name": "income", "size": 3812},
	       {"name": "balance", "size": 4000}
	    ]
	  }
	  
	 ]
	};

	this.colorKeys = ["expenses","balance","income"];
	
	this.barMonthBase = new Array ();
	this.barMonthBase.push({State:"Jenuary",expenses:3413,balance:1000,income:5213});
	this.barMonthBase.push({State:"February",expenses:3513,balance:1000,income:4213});
	this.barMonthBase.push({State:"March",expenses:3613,balance:1000,income:4513});
	this.barMonthBase.push({State:"April",expenses:3213,balance:1000,income:4213});
	this.barMonthBase.push({State:"May",expenses:3413,balance:1000,income:4243});
	this.barMonthBase.push({State:"June",expenses:3313,balance:1000,income:3313});
	this.barMonthBase.push({State:"July",expenses:3213,balance:1000,income:4513});
	this.barMonthBase.push({State:"August",expenses:3713,balance:1000,income:3213});
	this.barMonthBase.push({State:"September",expenses:3413,balance:1000,income:3213});
	this.barMonthBase.push({State:"Octomber",expenses:3113,balance:1000,income:4213});
	this.barMonthBase.push({State:"November",expenses:3913,balance:1000,income:5213});
	this.barMonthBase.push({State:"December",expenses:3213,balance:1000,income:3913});


	this.barMonth = new Array ();
	this.barMonth.push({State:"Jenuary",expenses:3413,balance:1000,income:5213});
	this.barMonth.push({State:"February",expenses:3513,balance:1000,income:4213});
	this.barMonth.push({State:"March",expenses:3613,balance:1000,income:4513});
	this.barMonth.push({State:"April",expenses:3213,balance:1000,income:4213});
	this.barMonth.push({State:"May",expenses:3413,balance:1000,income:4243});
	this.barMonth.push({State:"June",expenses:3313,balance:1000,income:3313});
	this.barMonth.push({State:"July",expenses:3213,balance:1000,income:4513});
	this.barMonth.push({State:"August",expenses:3713,balance:1000,income:3213});
	this.barMonth.push({State:"September",expenses:3413,balance:1000,income:3213});
	this.barMonth.push({State:"Octomber",expenses:3113,balance:1000,income:4213});
	this.barMonth.push({State:"November",expenses:3913,balance:1000,income:5213});
	this.barMonth.push({State:"December",expenses:3213,balance:1000,income:3913});

	this.monthTransactionKeys = ["expenses","balance","income"];


/***********************************************************************/

    this.barCostCategoryBase = new Array ();
    this.barCostCategoryBase.push({State:" < 50 ",    amount:3413  ,times:500 });
    this.barCostCategoryBase.push({State:" < 150 ",   amount:2513  ,times:700 });
    this.barCostCategoryBase.push({State:" < 300 ",   amount:1913  ,times:800 });
    this.barCostCategoryBase.push({State:" < 600 ",   amount:3213  ,times:460 });
    this.barCostCategoryBase.push({State:" < 1100 ",  amount:2413  ,times:300 });
    this.barCostCategoryBase.push({State:" < 1700",   amount:1313  ,times:600 });
    this.barCostCategoryBase.push({State:" < 2100 ",  amount:2213  ,times:700 });
    this.barCostCategoryBase.push({State:" < 3500 ",  amount:2713  ,times:900 });
    this.barCostCategoryBase.push({State:" < 5000 ",  amount:4413  ,times:600 });
    this.barCostCategoryBase.push({State:" < 10000",  amount:2113  ,times:800 });
    this.barCostCategoryBase.push({State:" < 15000",  amount:1913  ,times:900 });
    this.barCostCategoryBase.push({State:" < 20000",  amount:3213  ,times:200 });
    this.barCostCategoryBase.push({State:" > 20000 ", amount:4613  ,times:400 });

	this.barCostCategory = new Array ();
	this.barCostCategory.push({State:" < 50 ",    amount:3413  ,times:500 });
	this.barCostCategory.push({State:" < 150 ",   amount:2513  ,times:700 });
	this.barCostCategory.push({State:" < 300 ",   amount:1913  ,times:800 });
	this.barCostCategory.push({State:" < 600 ",   amount:3213  ,times:460 });
	this.barCostCategory.push({State:" < 1100 ",  amount:2413  ,times:300 });
	this.barCostCategory.push({State:" < 1700 ",  amount:1313  ,times:600 });
	this.barCostCategory.push({State:" < 2100 ",  amount:2213  ,times:700 });
	this.barCostCategory.push({State:" < 3500 ",  amount:2713  ,times:900 });
	this.barCostCategory.push({State:" < 5000 ",  amount:4413  ,times:600 });
	this.barCostCategory.push({State:" < 10000",  amount:2113  ,times:800 });
	this.barCostCategory.push({State:" < 15000",  amount:1913  ,times:900 });
	this.barCostCategory.push({State:" < 20000",  amount:3213  ,times:200 });
	this.barCostCategory.push({State:" > 20000 ", amount:4613  ,times:400 });


	this.barCostCategoryAugust = new Array ();
	this.barCostCategoryAugust.push({State:" < 50 ",    amount:413  ,times:50 });
	this.barCostCategoryAugust.push({State:" < 150 ",   amount:1213  ,times:700 });
	this.barCostCategoryAugust.push({State:" < 300 ",   amount:1413  ,times:400 });
	this.barCostCategoryAugust.push({State:" < 600 ",   amount:2213  ,times:160 });
	this.barCostCategoryAugust.push({State:" < 1100 ",  amount:2413  ,times:30 });
	this.barCostCategoryAugust.push({State:" < 1700 ",  amount:1313  ,times:80 });
	this.barCostCategoryAugust.push({State:" < 2100 ",  amount:2213  ,times:300 });
	this.barCostCategoryAugust.push({State:" < 3500 ",  amount:1713  ,times:400 });
	this.barCostCategoryAugust.push({State:" < 5000 ",  amount:3413  ,times:100 });
	this.barCostCategoryAugust.push({State:" < 10000",  amount:2413  ,times:60 });
	this.barCostCategoryAugust.push({State:" < 15000",  amount:1013  ,times:400 });
	this.barCostCategoryAugust.push({State:" < 20000",  amount:1213  ,times:800 });
	this.barCostCategoryAugust.push({State:" > 20000 ", amount:2213  ,times:400 });


	this.barCostCategoryJune = new Array ();
	this.barCostCategoryJune.push({State:" < 50 ",    amount:413  ,times:50 });
	this.barCostCategoryJune.push({State:" < 150 ",   amount:1213  ,times:700 });
	this.barCostCategoryJune.push({State:" < 300 ",   amount:1413  ,times:400 });
	this.barCostCategoryJune.push({State:" < 600 ",   amount:2213  ,times:160 });
	this.barCostCategoryJune.push({State:" < 1100 ",  amount:2413  ,times:30 });
	this.barCostCategoryJune.push({State:" < 1700 ",  amount:1313  ,times:80 });
	this.barCostCategoryJune.push({State:" < 2100 ",  amount:2213  ,times:300 });
	this.barCostCategoryJune.push({State:" < 3500 ",  amount:1713  ,times:400 });
	this.barCostCategoryJune.push({State:" < 5000 ",  amount:3413  ,times:100 });
	this.barCostCategoryJune.push({State:" < 10000",  amount:2413  ,times:60 });
	this.barCostCategoryJune.push({State:" < 15000",  amount:1013  ,times:400 });
	this.barCostCategoryJune.push({State:" < 20000",  amount:1213  ,times:800 });
	this.barCostCategoryJune.push({State:" > 20000 ", amount:2213  ,times:400 });

	this.barCostCategoryMarch = new Array ();
	this.barCostCategoryMarch.push({State:" < 50 ",    amount:413  ,times:50 });
	this.barCostCategoryMarch.push({State:" < 150 ",   amount:1513  ,times:700 });
	this.barCostCategoryMarch.push({State:" < 300 ",   amount:2413  ,times:400 });
	this.barCostCategoryMarch.push({State:" < 600 ",   amount:1613  ,times:160 });
	this.barCostCategoryMarch.push({State:" < 1100 ",  amount:2413  ,times:60 });
	this.barCostCategoryMarch.push({State:" < 1700 ",  amount:2313  ,times:10 });
	this.barCostCategoryMarch.push({State:" < 2100 ",  amount:1013  ,times:150 });
	this.barCostCategoryMarch.push({State:" < 3500 ",  amount:2313  ,times:40 });
	this.barCostCategoryMarch.push({State:" < 5000 ",  amount:3413  ,times:90 });
	this.barCostCategoryMarch.push({State:" < 10000",  amount:3213  ,times:80 });
	this.barCostCategoryMarch.push({State:" < 15000",  amount:2013  ,times:500 });
	this.barCostCategoryMarch.push({State:" < 20000",  amount:1813  ,times:600 });
	this.barCostCategoryMarch.push({State:" > 20000 ", amount:2013  ,times:555 });



	this.barCostCategoryMay = new Array ();
	this.barCostCategoryMay.push({State:" < 50 ",    amount:1213  ,times:150 });
	this.barCostCategoryMay.push({State:" < 150 ",   amount:1213  ,times:400 });
	this.barCostCategoryMay.push({State:" < 300 ",   amount:2713  ,times:200 });
	this.barCostCategoryMay.push({State:" < 600 ",   amount:1213  ,times:360 });
	this.barCostCategoryMay.push({State:" < 1100 ",  amount:1413  ,times:160 });
	this.barCostCategoryMay.push({State:" < 1700 ",  amount:2313  ,times:170 });
	this.barCostCategoryMay.push({State:" < 2100 ",  amount:1913  ,times:110 });
	this.barCostCategoryMay.push({State:" < 3500 ",  amount:1213  ,times:80 });
	this.barCostCategoryMay.push({State:" < 5000 ",  amount:2813  ,times:100 });
	this.barCostCategoryMay.push({State:" < 10000",  amount:3213  ,times:88 });
	this.barCostCategoryMay.push({State:" < 15000",  amount:2313  ,times:50 });
	this.barCostCategoryMay.push({State:" < 20000",  amount:1813  ,times:300 });
	this.barCostCategoryMay.push({State:" > 20000 ", amount:3013  ,times:111 });
    this.costCategoryKeys = ["amount","times"];
	/**********************/
	this.monthCostCategory2DArrayBase = [];
	this.monthCostCategory2DArrayBase[1] = [];
	this.monthCostCategory2DArrayBase[1] = this.barCostCategory; 

	this.monthCostCategory2DArrayBase[2] = [];
	this.monthCostCategory2DArrayBase[2] = this.barCostCategory;

	this.monthCostCategory2DArrayBase[3] = [];
	this.monthCostCategory2DArrayBase[3] = this.barCostCategoryMarch;

	this.monthCostCategory2DArrayBase[4] = [];
	this.monthCostCategory2DArrayBase[4] = this.barCostCategory;

	this.monthCostCategory2DArrayBase[5] = [];
	this.monthCostCategory2DArrayBase[5] = this.barCostCategoryMay;

	this.monthCostCategory2DArrayBase[6] = [];
	this.monthCostCategory2DArrayBase[6] = this.barCostCategoryJune;

	this.monthCostCategory2DArrayBase[7] = [];
	this.monthCostCategory2DArrayBase[7] = this.barCostCategory;

	this.monthCostCategory2DArrayBase[8] = [];
	this.monthCostCategory2DArrayBase[8] = this.barCostCategoryAugust;

	this.monthCostCategory2DArrayBase[9] = [];
	this.monthCostCategory2DArrayBase[9] = this.barCostCategory;

	this.monthCostCategory2DArrayBase[10] = [];
	this.monthCostCategory2DArrayBase[10] = this.barCostCategory;

	this.monthCostCategory2DArrayBase[11] = [];
	this.monthCostCategory2DArrayBase[11] = this.barCostCategory;

	this.monthCostCategory2DArrayBase[12] = [];
	this.monthCostCategory2DArrayBase[12] = this.barCostCategory;



  }
// constructor ended 


getBarMonth(){return this.barMonth;}

getBarMonthKeys(){ return this.monthTransactionKeys;}

getBarCostCategory(){  return this.barCostCategory;}

getCostCategoryKeys(){  return this.costCategoryKeys ;}

getBarId(){ return this.barId;}

getYearBalanceLineChartArray(){ return this.YearBalanceLineChartArray;}

getYearLineChartArray () { return this.YearLineChartArray;}

getYearLineBalanceChartArray () { return this.YearLineBalanceChartArray;}

getCycleData(){return this.cycleData;}

getAllTransactions(){ return this.AllTransactions;}

getAllTransactionsByDate(){ return this.AllTransactionsByDate;}


increaseBarId(){ this.barId++;}

updateChartsForMonth(selectedMonth){


   if ( !selectedMonth.children ){
   	selectedMonth = selectedMonth.parent;
   }

    console.log(" 1/2  d3DataStore  updating data for month "  + selectedMonth.data.name );

    for( var month in  this.barMonthBase){

    	if(this.barMonthBase[month].State==selectedMonth.data.name){
		this.barMonth[month].expenses = this.barMonthBase[month].expenses;
    		this.barMonth[month].income   = this.barMonthBase[month].income;
    		this.barMonth[month].balance  = this.barMonthBase[month].balance;

    		 console.log(" 2/2 d3DataStore  updated data "  + this.barMonth[month] );
    	}else{
    		this.barMonth[month].expenses=0;
    		this.barMonth[month].income=0;
    		this.barMonth[month].balance=0;
    	}
    }
	
	var m = getMonthNumberFromName(selectedMonth.data.name);
	if ( this.monthCostCategory2DArrayBase[m]){
	
		var mCostCatAr =this.monthCostCategory2DArrayBase[m];

    	this.barCostCategory = [];

    	for ( var cat in mCostCatAr ){  	 	
		  	 	var costObject = mCostCatAr[cat];

	    		this.barCostCategory.push({
							"State":costObject.State,
							"amount":costObject.amount,
							"times":costObject.times
				});
	 	}
}
   

   this.emit("MONTH_COST_CHART_CHANGE");
   this.emit("MONTH_AMOUNT_OF_MONEY_CHART_CHANGE");
}

updateChartsForYear(selectedYear){

   this.emit("YEAR_COST_CHART_CHANGE");
   this.emit("YEAR_AMOUNT_OF_MONEY_CHART_CHANGE");
}



/**********************************************************************/
/******************  Updating data for input from Excell **************/
updateChartsFromExcell(){
	this.loadedYearsData = excellInput.getLoadedData();
	this.AllTransactions = excellInput.getAllTransactions();
	this.AllTransactionsByDate = excellInput.getAllTransactionsByDate();
	this.YearBalanceLineChartArray = excellInput.getYearBalanceLineChartArray();
	this.YearLineChartArray = excellInput.getYearLineBar();
	this.YearLineBalanceChartArray = excellInput.getYearBalanceLineChartArray();


	this.fixBaseArraysFromExcell();
	

	this.expensesToArray  = excellInput.getExpensesToArray();
	this.incomeFromArray  = excellInput.getIncomeFromArray();
}

 fixBaseArraysFromExcell(){
	// finding the last year.
	// this.loadedYearsData is a map not an ARRAY
	// year is a key value it is 2015...
	var tmpYear = 0 ;
	this.yearsOfTransactions = [];
	this.yearCostCategory2DArrayBase = [];

	for ( var year in this.loadedYearsData){
		if ( year > tmpYear) tmpYear = year;
		this.yearsOfTransactions.push(year);
	}	

	this.fixbarMonthBaseForYear(year);
	this.fixBarCostCategoryBaseForYear(year);

	// set values to show 
	this.setbarMonthToShow();
	this.setYearCostCategoryToShow(year);


	this.emit("DATA_FROM_EXCELL_LOADED");

}
	
/****************************************************************************************/
// barMonthBase and yearCostCategory2DArrayBase[y] are already set 
// loading the corresponding data to the to show bars 
/************************* UPDATING BAR FOR YEAR ***************************************/


setbarMonthToShow(){

	this.barMonth = [];
	for ( var i in this.barMonthBase){
		this.barMonth.push({"State":this.barMonthBase[i].State,"expenses":this.barMonthBase[i].expenses,
							"income":this.barMonthBase[i].income,"balance":this.barMonthBase[i].balance
							});
	}
}

setYearCostCategoryToShow(y){
	this.barCostCategory = [];
	for ( var i in this.yearCostCategory2DArrayBase[y]){
		var cc =this.yearCostCategory2DArrayBase[y][i];
		console.log("cc "  + cc.State + " am " + cc.amount + " times " + cc.times);
		this.barCostCategory.push({"State":cc.State,"amount":cc.amount,"times":cc.times});
	}	
}


/****************************************************************************************/


fixbarMonthBaseForYear( y ){
	var yearAr = this.loadedYearsData[y];
	this.barMonthBase = [];
	for (var j = 1 ; j <13 ; j++){
		var monthName = getMonthName(j.toString());
		
		if( yearAr.months[j]){ 
			var month = yearAr.months[j];
			this.barMonthBase[j-1]={"State":monthName,	"expenses":month.expenses,"income":month.income,"balance":month.balance};
		}else{	
			// no data for this month in this year 
			// so we initialize with zero we could have taken the values of the previous month
			this.barMonthBase[j-1]={"State":monthName,"expenses":0,"income":0,"balance":0}; 
		}
	}
}

fixBarCostCategoryBaseForYear( y ){
	// if we have not entry for this year
	  	 
	this.yearCostCategory2DArrayBase[y] = [];

	console.log(this.loadedYearsData[y]);
	
	for ( var cat in this.loadedYearsData[y].costCategory ){
			var cost = this.loadedYearsData[y].costCategory[cat];
			this.yearCostCategory2DArrayBase[y].push({
						"State":cost.category,
						"amount":cost.amount,
						"times":cost.times*100
			});
	}
    
    /// must be reloaded the maps for this year 
    this.monthCostCategory2DArrayBase =[];
    var months = this.loadedYearsData[y].months;


    for (var j = 1 ; j <13 ; j++){

    	this.monthCostCategory2DArrayBase[j] =[];
    	if ( months[j]){
    		var mCostCatAr = months[j].costCategory;
	    	for ( var cat in mCostCatAr ){
		  	 	
		  	 	var cost = mCostCatAr[cat];
		  	 	console.log("month " + j + " loaded cat --- > " + cost.category + "  amount " + cost.amount  );
		  	 	


	    		this.monthCostCategory2DArrayBase[j].push({
							"State":cost.category,
							"amount":cost.amount,
							"times":cost.times
				});
	    	}
    	}else{
    		for ( var cat in this.categoryTypeArrayD3){
    			console.log("month " + j + " loaded cat --- > " + this.categoryTypeArrayD3[cat] + "  amount " + 0  );
	    		this.monthCostCategory2DArrayBase[j].push({
							"State":this.categoryTypeArrayD3[cat],
							"amount":0,
							"times":0
				});	
    		}
    	}
    }

	


}

categoryTypeArrayD3= [100, 250, 600 , 1100, 1600, 2000, 3000, 6000, 10000];

/************************************************* DONE EXCELL FUNCITONS ******************/ 

handleActions(action) {
    switch(action.type) {
      case "LOAD_DATA_FOR_MONTH": {
        this.updateChartsForMonth(action.month);
        break;
      }
      case "LOAD_DATA_FOR_YEAR": {
        this.updateChartsForYear(action.year);
        break;
      }
      case "DATA_LOADED_FROM_EXCELL":{

      	console.log(" Action handled  ");

 		this.updateChartsFromExcell();
        break;
      	
      }
    }
  }



getAlreadyLineMounted(){
	return this.allReadyLineMounted;
}

setAlreadyLineMounted( flag){
	this.allReadyLineMounted = flag;
}

}



const d3DataStore = new D3DataStore;
dispatcher.register(d3DataStore.handleActions.bind(d3DataStore));

export default d3DataStore;

function getMonthName(month){
	switch(month){
		case "1": return "Jenuary";
		case "2": return "February";
		case "3": return "March";
		case "4": return "April";
		case "5": return "May";
		case "6": return "June";
		case "7": return "July";
		case "8": return "August";
		case "9": return "September";
		case "10": return "Octomber";
		case "11": return "November";
		case "12": return "December";
	}
}

function getMonthNumberFromName( name){
	switch(name){
		case  "Jenuary" :  	return 1;
		case  "February" : 	return 2;
		case  "March" : 	return 3;
		case  "April" : 	return 4;
		case  "May" : 		return 5;
		case  "June" : 	 	return 6;
		case  "July" : 		return 7;
		case  "August" : 	return 8;
		case  "September" : return 9;
		case  "Octomber" : 	return 10;
		case  "November" : 	return 11;
		case  "December" : 	return 12;
	}
}