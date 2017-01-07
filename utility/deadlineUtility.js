

// Compare 2 dates if getdate()> somedate!!!


function dateEqual(a,b){
 
  		return (((a.getUTCFullYear()== b.getUTCFullYear()) && (a.getUTCMonth() == b.getUTCMonth()) && (a.getUTCDate() == b.getUTCDate()))?1:0);
  	  	
  
 }



module.exports.dateEqual = dateEqual


