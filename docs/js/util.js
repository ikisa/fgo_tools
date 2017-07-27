
/**
 * フォーマット（Date型 -> 文字型）
 * 
 * @param  {Date} date 日付
 * @return 日付文字列 (yyyy/mm/dd h24:mi)
 */
var toLocaleString = function(date) {
    var y = date.getFullYear();
    var m = zeroPadding(date.getMonth() + 1, 2);
    var d = zeroPadding(date.getDate(), 2);
    var h = zeroPadding(date.getHours(), 2);
    var mi = zeroPadding(date.getMinutes(), 2);

    return [y, m, d].join('/') + ' ' + [h, mi].join(':');
}

var zeroPadding = function(num, length){
    return ("0000000000" + num).slice(-length);
}

const SECOND_MILLISECOND = 1000,
      MINUTE_MILLISECOND = 60 * SECOND_MILLISECOND,
      HOUR_MILLISECOND = 60 * MINUTE_MILLISECOND,
      DAY_MILLISECOND = 24 * HOUR_MILLISECOND,
      WEEK_MILLISECOND = 7 * DAY_MILLISECOND,
      YEAR_MILLISECOND = 365 * DAY_MILLISECOND;

var miniuteDistance = function(src, dst) {
    let deltaMillsecond = dst.getTime() - src.getTime();
    return deltaMillsecond / MINUTE_MILLISECOND;
}
