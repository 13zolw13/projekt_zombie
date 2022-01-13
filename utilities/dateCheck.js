 function dateCheck (date){
const thisDay=(new Date(Date.now())).getDate()
const lastUpdate=new Date(date).getDate()
if (thisDay===lastUpdate) return false;
return true;
}
 
module.exports = {
    dateCheck
}