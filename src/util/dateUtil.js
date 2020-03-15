var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

export function getOpenTableDate(date) {
    if (date === null) return 
    let dayOfWeek = days[date.getDay()]
    let dayOfMonth = date.getDate();
    let month = months[date.getMonth()]
    let year = date.getFullYear();
    let dateString = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    return dateString;
}

export function getOpenTableTime(date, time) {
    if (date === null || time === null) return 
    let dayOfMonth = pad(date.getDate(), 2);
    let month = pad(date.getMonth(), 2)
    let year = date.getFullYear();
    let dateString = `${year}-${month}-${dayOfMonth}T${time}`;

    return dateString;
}