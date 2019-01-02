const moment = require("moment");
require("moment-duration-format");

class Util {

    static toPlural (str) {
        let arr = str.toLowerCase().split('');
        arr[0] = arr[0].toUpperCase();
        return arr.join('');
    }
  
    static parseDur(ms){
        let seconds = ms / 1000;
        let days = parseInt(seconds / 86400);
        seconds = seconds % 86400;
        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        let fin = [];
        if(days) fin.push(`${days}d`);
        if(hours) fin.push(`${hours}h`);
        if(minutes) fin.push(`${minutes}m`);
        fin.push(`${seconds}s`);
        return fin.join(' ');
    }
  
  static hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
  
  static diffDur(time) {
    // var time = 1511527898917
    var past = moment(time).format('YYYY-MM-DD HH:mm:ss')
    var now = moment(new Date()).diff(past, 'minutes')

    var seconds = parseInt(moment(new Date()).diff(past, 'seconds') % 60) ;
    var min = parseInt(now % 60);
    var hours = parseInt(now / 60);
    var days = parseInt(hours / 24);
    hours = hours - 24 * days;

    let fin = [];
    if(days) fin.push(`${days}d`);
    if(hours) fin.push(`${hours}h`);
    if(min) fin.push(`${min}m`);
    fin.push(`${seconds}s`);
    return fin.join(' ');
  }
  
    
}

module.exports = Util;