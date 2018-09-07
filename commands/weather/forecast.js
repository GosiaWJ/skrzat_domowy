const  commando  = require('discord.js-commando');

function getSeason(m, d) {
    let seasson = 0;
    switch(m) {
        case 1:
        case 2:
            seasson = 4;
            break;
        case 3:
            if (d<=20) seasson = 4;
            else seasson = 1;
            break;
        case 4:
        case 5:
            seasson = 1;
            break;
        case 6:
            if (d>21) seasson = 2;
            else seasson = 1;
            break;
        case 7:
        case 8:
            seasson = 2;
            break;
        case 9:
            if (d<=22) seasson = 2;
            else seasson = 3;
            break;
        case 10:
        case 11:
            seasson = 3;
            break;
        case 12:
            if (d<=22) seasson = 3;
            else seasson = 4;
            break;
        default:
         //   msg.say('Something is wrong, there is no season!'); 
    }
    return seasson;
    // 0 => bad input
    // 1 => spring
    // 2 => summer
    // 3 => fall
    // 4 => winter
}
function getWeekDay(today) {
    let weekend = "none";
    switch(today.getDay()) {
        case 0:
            weekday = "nd   ";
            break;
        case 1:
            weekday = "pn  ";
            break;
        case 2:
            weekday = "wt  ";
            break;
        case 3: 
            weekday = "śr   ";
            break;
        case 4:
            weekday = "czw";
            break;
        case 5:
            weekday = "pt   ";
            break;
        case 6:
            weekday = "sb   ";
            break;
        default:
          //  msg.say('Please, give me a date in form DD.MM.YYYY, e.g. 14.09.2018'); 
    }
    return weekday
}

function getMoonPhase(year, month, day)
{
/* 
 * modified from http://www.voidware.com/moon_phase.htm 
 * took from https://gist.github.com/endel/dfe6bb2fbe679781948c
 */
    var c = e = jd = b = 0;

    if (month < 3) {
        year--;
        month += 12;
    }

    ++month;

    c = 365.25 * year;

    e = 30.6 * month;

    jd = c + e + day - 694039.09; //jd is total days elapsed

    jd /= 29.5305882; //divide by the moon cycle

    b = parseInt(jd); //int(jd) -> b, take integer part of jd

    jd -= b; //subtract integer part to leave fractional part of original jd
    
    /* 
    b = Math.round(jd * 8); //scale fraction from 0-8 and round
    
  if (b >= 8 ) {
        b = 0; //0 and 8 are the same so turn 8 into 0
    }
    */
    if( jd>=0.9200){
        b=7;
    } else if(jd>=0.0000 && jd < 0.0200) {
        b=0;
    }else if(jd>=0.0200 && jd < 0.0900) {
        b=1;
    }else if(jd>=0.4300 && jd < 0.4900) {
        b=3;
    }else if(jd>=0.4900 && jd < 0.5200) {
        b=4;
    }else if(jd>=0.5200 && jd < 0.5800) {
        b=5;
    }  else b = Math.round(jd * 8);

    // 0 => New Moon
    // 1 => Waxing Crescent Moon
    // 2 => Quarter Moon
    // 3 => Waxing Gibbous Moon
    // 4 => Full Moon
    // 5 => Waning Gibbous Moon
    // 6 => Last Quarter Moon
    // 7 => Waning Crescent Moon
    
    var moon = 'none';
    switch(b) {
        case 0:
            moon = "nów :new_moon: ";
            break;
        case 1:
            moon = "sierp przybywajacy :waxing_crescent_moon: ";
            break;
        case 2:
            moon = "kwadra pierwsza :first_quarter_moon: ";
            break;
        case 3:
            moon = "przybywajacy Księżyc garbaty :waxing_gibbous_moon: ";
            break;
        case 4:
            moon = "pełnia :full_moon: ";
            break;
        case 5:
            moon = "ubywajacy Księżyc garbaty :waning_gibbous_moon: ";
            break;
        case 6:
            moon = "ostatnia kwarta :last_quarter_moon: ";
            break;
        case 7:
            moon = "sierp ubywający :waning_crescent_moon: ";
            break;
        default:
           // msg.say('Finding moon phase went wrong. Please, give me a date in form DD.MM.YYYY, e.g. 14.09.2018'); 
    }
    return moon;
}
function getWeatherNames(nb){   
    var name = '';
    switch(nb){
        case 1:
            name = 'słońce :sunny: ';
            break;
        case 2: 
            name = 'mgła :fog: ';
            break;
        case 3:
            name = 'grad :sweat_drops: ';
            break;
        case 4:
            name = 'burza :thunder_cloud_rain: ';
            break;
        case 5:
            name = 'deszcz :cloud_rain: ';
            break;
        case 6: 
            name = 'huragan :cloud_tornado: ';
            break;
        case 7:
            name = 'zachmurzenie :white_sun_cloud: ';
            break;
        case 8:
            name = 'umiarkowany wiatr :wind_blowing_face: ';
            break;
        default:
            name = 'Some error in name of weather.';
    }
    return name;
}
function getDailyWeather(season) {
    var roll_1 = Math.floor(Math.random() *8) + 1;
    var roll_2 = 0;
    var weather = '';
    switch(season){
        case 0:
            weather = 'No season found.';
        case 1:
            roll_2 = Math.floor(Math.random() *11) + 10;
            weather = roll_2 + ' stopni ' + getWeatherNames(roll_1);
            break;
        case 2: 
            roll_2 = Math.floor(Math.random() *17) + 15;
            weather = roll_2 + ' stopni ' + getWeatherNames(roll_1);
            break;
        case 3:
            roll_2 = Math.floor(Math.random() *11) + 5;
            weather = roll_2 + ' stopni ' + getWeatherNames(roll_1);
            break;
        case 4:
            if (roll_1 === 3) {
                roll_2 = Math.floor(Math.random() *10) - 10;
                weather = roll_2 + ' stopni śnieg :cloud_snow: ';
            } else if (roll_1 === 4) {
                roll_2 = Math.floor(Math.random() *10) - 10;
                weather = roll_2 + ' stopni burza śnieżna :cloud_lightning: ';
            } else if (roll_1 === 5) {
                roll_2 = Math.floor(Math.random() *6);
                weather = roll_2 + ' stopni ' + getWeatherNames(roll_1);
            } else {
                roll_2 = Math.floor(Math.random() *16) - 10;
                weather = roll_2 + ' stopni ' + getWeatherNames(roll_1);
            }
            break;
        default:
            weather = 'Error in rolling weather.'
    }
    return weather;
}

module.exports = class WeatherForecastCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'forecast',
            aliases: ['prognoza'],
            group: 'weather',
            memberName: 'forecast',
            description: 'Rolls 7 days weather forecast starting by day given as argument',
            examples: ['forecast 14.09.2018'],
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
    	    args: [
                {
                    key: 'text',
                    prompt: 'Please, give me a date in form DD.MM.YYYY, e.g. 14.09.2018',
                    type: 'string'
                }
            ]
        });
    }

    /*
    hasPermission(msg) {
        if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may change the weather.';
        return true;
    }
    */
    run(msg, { text }) {
        let msgArray = text.split(".");
        let day = parseInt(msgArray.slice(0,1));
        let month = parseInt(msgArray.slice(1,2));
        let year = parseInt(msgArray.slice(2));

        if(year!="") {                
            var forecast = '';
            var today = new Date (year,month-1,day);
            var i;
            for (i=0; i<7; i++) {
                let dy = today.getDate();
                let mh = today.getMonth()+1;
                let yr = today.getFullYear();
                var season = getSeason(mh, dy);
                var week = getWeekDay(today);
                var phase = getMoonPhase(yr, mh, dy);
                var weather = getDailyWeather(season);
                if (dy<10) dy = '0'+dy;
                if (mh<10) mh = '0'+mh;
                forecast += '**'+dy+'.'+mh+'** '+week+' | '+weather+' | '+phase+'\n';
                today.setDate(today.getDate()+1);  
            }
           
            msg.delete();            
           // this.client.user.setActivity(weekday+text+' ☀ ');
            return msg.say(forecast);
        } else {
            return msg.say('Please, give me a date in form DD.MM.YYYY, e.g. 14.09.2018');
        }
    }
}