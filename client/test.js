const moment = require("moment");

//const date = moment.unix(1617667992).toString().substr(16, 5);

//console.log(date); //.substr(4, 6);

function toTime(secs) {
  const time = moment.unix(secs).toString().substr(16, 5);
  let hours = parseInt(time.slice(0, 2));
  if (hours > 12) {
    let hours = parseInt(time.slice(0, 2));
    console.log(hours);
    return (hours - 12).toString() + time.slice(2) + " PM";
  } else {
    return time + " AM";
  }
}

console.log(toTime(1617667992));
