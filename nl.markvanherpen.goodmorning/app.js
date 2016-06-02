"use strict";

const SpokenDateTime = require('spokendatetime');

function init() {

	Homey.manager('speech-input').on('speech', function ( speech ) {
        const betterDateTime = new SpokenDateTime(new Date(),
            speech.language,
            __("days").toString().split(':'),
            __("months").toString().split(':')
        );

        Homey.log('onSpeech', speech);

        Homey.manager("speech-output").say(__("goodmorning"));

        Homey.manager("speech-output").say(__("currentdatetime"));

        Homey.manager("speech-output").say(betterDateTime.getSpokenDate());

        Homey.manager("speech-output").say(', ');

        Homey.manager("speech-output").say(betterDateTime.getSpokenTime());
    })
	
}


module.exports.init = init;


