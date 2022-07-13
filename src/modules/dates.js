const moment = require("moment");

const getDatesInRange = (startDate, endDate) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      dates.push(moment(date).format("MM-DD-YYYY"));
      
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
};

const dateToDay = (date) => {
    const d = new Date(date).getDay();
                
    return days[d]
};

module.exports = {
    getDatesInRange,
    dateToDay,    
}