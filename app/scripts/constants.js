'use strict';

var app = angular.module('amCountdownApp');

/**
 * @ngdoc function
 * @name amCountdownApp.constant:COUNTDOWN_TEXT
 * @description
 * # countdown text
 * Constant of the amCountdownApp
 */
app.constant('COUNTDOWN_TEXT', "Google I/O starts in");

/**
 * @ngdoc function
 * @name amCountdownApp.constant:DATE_LOCALE
 * @description
 * # date locale
 * Constant of the amCountdownApp
 */
app.constant('DATE_LOCALE', "en-US");

/**
 * @ngdoc function
 * @name amCountdownApp.constant:DATE_FORMAT
 * @description
 * # date format
 * Constant of the amCountdownApp
 * example: YYYY-MM-DDThh:mm:ssZ
 */
app.constant('DATE_FORMAT', "YYYY-MM-DDThh:mm:ssZ");

/**
 * @ngdoc function
 * @name amCountdownApp.constant:DATE_TARGET
 * @description
 * # date target
 * Constant of the amCountdownApp
 *
 * Set date-time in the moment:
 *  e.g. Google IO (May 28th - 12am): 2015-05-28T00:00:00
 *  PDT  (-07:00): -07:00
 *  moment("2015-05-28T00:00:00-07:00", "YYYY-MM-DDThh:mm:ssZ");
 *
 *  CEST (+02:00): +02:00
 *  moment("2015-05-28T00:00:00+02:00", "YYYY-MM-DDThh:mm:ssZ");
 */
app.constant('DATE_TARGET', "2015-05-28T00:00:00-07:00");