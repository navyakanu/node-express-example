var moment = require('moment');

function dateEqual(a,b){
 
  		return (((a.getUTCFullYear()== b.getUTCFullYear()) && (a.getUTCMonth() == b.getUTCMonth()) && (a.getUTCDate() == b.getUTCDate()))?1:0);
  	  	
  }




function datediff(a,b){

	return (((a.getUTCFullYear() != b.getUTCFullYear()) || (a.getUTCMonth() != b.getUTCMonth()) || (a.getUTCDate() > b.getUTCDate()))?-1:0);
  	  	
}  




function dateCompare(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA,"DD/MM/YYYY");
    var momentB = moment(dateTimeB,"DD/MM/YYYY");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}







module.exports.dateEqual = dateEqual
module.exports.dateCompare = dateCompare


