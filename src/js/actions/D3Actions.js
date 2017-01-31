import dispatcher from "../dispatcher";


export function LOAD_DATA_FOR_MONTH(month){
	dispatcher.dispatch({
		"type":"LOAD_DATA_FOR_MONTH",
		"month":month
	});
}

export function LOAD_DATA_FOR_YEAR(year){
	dispatcher.dispatch({
		"type":"LOAD_DATA_FOR_YEAR",
		"year":year
	});
}

export function DATA_LOADED_FROM_EXCELL(){
	console.log(" Action received in Actions ");
	dispatcher.dispatch({
		"type":"DATA_LOADED_FROM_EXCELL"
	});
}


