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
            " , " + hour + " uur " +
            " " + minutes;
    }
    // TODO: Implement correct sequence for English notation
    return getDayName(date.getDay()) +
        " " + dayNum +
        " " + getMonthName(date.getMonth()) +
        " , " + hour +
        " " + minutes;
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


