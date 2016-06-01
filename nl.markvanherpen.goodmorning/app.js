"use strict";

function init() {
	
	Homey.manager('speech-input').on('speech', function ( speech ) {
        Homey.log('onSpeech', speech);

        //Homey.manager("speech-output").say(__("goodmorning"));


        //Homey.manager("speech-output").say(__("currentdatetime"));
        var current = getDecentDateTime(speech.language);
        //Homey.manager("speech-output").say(current);
        Homey.log('currentDateTime', current);
    })
	
}

/**
 * I want a 'normal' datetime.
 *
 * So in Dutch,
 * Donderdag 22 mei, vijf over half 10
 *
 * @param {string} language
 * @returns {string}
 */
function getDecentDateTime(language) {

    var date = new Date();

    var hour = date.getHours();
    var minutes = date.getMinutes();
    if (minutes == 0)
        minutes = '';
    var dayNum = date.getDate();

    if (language == 'nl') {
        return getDayName(date.getDay()) +
            " " + dayNum +
            " " + getMonthName(date.getMonth()) +
            " , " + getSpokenNLTime(minutes, hour);
    }
    // TODO: Implement correct sequence for English notation
    return getDayName(date.getDay()) +
        " " + dayNum +
        " " + getMonthName(date.getMonth()) +
        " , " + hour +
        " " + minutes;
}

/**
 * Returns the spoken time for Dutch language
 *
 * @param minutes
 * @param hour
 * @returns {string}
 */
function getSpokenNLTime(minutes, hour) {
    var minuteTekst = 'minuten';
    if (minutes == 1 || minutes == 29 || minutes == 31 || minutes == 59)
        minuteTekst = 'minuut';

    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour == 0) {
        hour = 12;
    }

    // Until 'kwart over'
    if (minutes <= 15) {
        if (minutes == 0) {
            return hour + " uur";
        }
        if (minutes == 15) {
            return " kwart over " + hour;
        }
        // 1 - 14
        else {
            return minutes + " " + minuteTekst + " over " + hour;
        }
    }
    // After 'kwart-over'
    else {
        // Add 1 to hour
        hour++;
        if (hour > 12) {
            hour = hour - 12;
        }

        if (minutes >= 16 && minutes <= 29) {
            return (30 - minutes) + " " + minuteTekst + " voor half " + hour;
        }
        if (minutes == 30) {
            return "half " + hour;
        }
        if (minutes >= 31 && minutes <= 44) {
            return (minutes - 30) + " " + minuteTekst + " over half " + hour;
        }
        if (minutes == 45) {
            return "kwart voor " + hour;
        }
        if (minutes >= 46 && minutes <= 59) {
            return (60 - minutes) + " " + minuteTekst +  " voor " + hour;
        }
    }
    return 'geen idee hoe laat het is..';
}

/**
 * Returns dayname based on locale/language.json
 *
 * @param {int} number
 * @returns {string}
 */
function getDayName(number) {
    var names = __("days").toString().split(':');
    if (number in names)
        return names[number];
    return number;
}

/**
 * Returns monthname based on locale/language.json
 *
 * @param {int} number
 * @returns {string}
 */
function getMonthName(number) {
    var names = __("months").toString().split(':');
    if (number in names)
        return names[number];
    return number;
}

module.exports.init = init;


