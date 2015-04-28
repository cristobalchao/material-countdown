'use strict';

var app = angular.module('amCountdownApp');

/**
 * @ngdoc function
 * @name amCountdownApp.controller:CountdownCtrl
 * @description
 * # CountdownCtrl
 * Controller of the amCountdownApp
 */
app.controller('CountdownCtrl',
    ['$scope', '$timeout', '$window', '$log',
        'COUNTDOWN_TEXT', 'DATE_LOCALE', 'DATE_FORMAT', 'DATE_TARGET',
        function ($scope, $timeout, $window, $log,
                  COUNTDOWN_TEXT, DATE_LOCALE, DATE_FORMAT, DATE_TARGET) {

            var $body = document.body;
            var $ink = $body.querySelector('#ink');

            $scope.debug = false;
            $scope.animating = false;
            $scope.stopTimer = false;

            $scope.createRandomRipple = function () {
                var top = Math.floor(Math.random() * $window.innerHeight) + 1;
                var left = Math.floor(Math.random() * $window.innerWidth) + 1;
                $scope.createRipple(top + 'px', left + 'px');
            };

            $scope.createRipple = function (top, left) {
                $ink.style.top = top;
                $ink.style.left = left;
                if (!!$scope.theme) {
                    $body.classList.remove($scope.theme);
                }
                $scope.theme = 'theme-' + Math.floor((Math.random() * 20) + 1);
                $body.classList.add($scope.theme);
                $ink.classList.add('active');

                $timeout(function () {
                    $body.style.backgroundColor = $window.getComputedStyle($ink)['background-color'];
                    $ink.style.top = $ink.style.left = $ink.style.height = $ink.style.width = '';
                    $ink.classList.remove('active');
                    $scope.animating = false;
                }, 600);
            };

            // currently, this does nothing
            moment.locale(DATE_LOCALE);

            // now and then
            $scope.now = moment();
            $scope.then = moment(DATE_TARGET, DATE_FORMAT);

            $scope.tick = function () {
                $scope.now = moment();
                $scope.diff = $scope.then - $scope.now;
                $scope.duration = moment.duration($scope.diff, "ms");

                $scope.diffFormatted = $scope.duration.format("d h m s");

                $scope.diffSplit = $scope.diffFormatted.split(' ');
                $scope.dhms = {
                    day: {
                        value: $scope.diffSplit.length < 4 ? '0' : $scope.diffSplit[$scope.diffSplit.length - 4],
                        label: "day"
                    },
                    hr: {
                        value: $scope.diffSplit.length < 3 ? '0' : $scope.diffSplit[$scope.diffSplit.length - 3],
                        label: "hour"
                    },
                    min: {
                        value: $scope.diffSplit.length < 2 ? '0' : $scope.diffSplit[$scope.diffSplit.length - 2],
                        label: "minute"
                    },
                    sec: {
                        value: $scope.diffSplit.length < 1 ? '0' : $scope.diffSplit[$scope.diffSplit.length - 1],
                        label: "second"
                    }
                };

                if ($scope.dhms.sec.value === '0') {
                    $scope.createRandomRipple();
                }

                if ($scope.diffSplit.length === 1 && $scope.diffSplit[0] === "0") {
                    $scope.stopTimer = true;
                }

                if ($scope.dhms.day.value != '1') {
                    $scope.dhms.day.label += 's';
                }
                if ($scope.dhms.hr.value != '1') {
                    $scope.dhms.hr.label += 's';
                }
                if ($scope.dhms.min.value != '1') {
                    $scope.dhms.min.label += 's';
                }
                if ($scope.dhms.sec.value != '1') {
                    $scope.dhms.sec.label += 's';
                }

                if ($scope.debug) {
                    $log.log("Now", $scope.now);
                    $log.log("Then", $scope.then);
                    $log.log("Diff", $scope.diff);
                    $log.log("Duration ms", $scope.duration);
                    $log.log("Diff formatted", $scope.diffFormatted);
                }

                $timeout(function () {
                    if (!$scope.stopTimer) {
                        $scope.tick();
                    } else {
                        $scope.createRipple(
                            (Math.floor(Math.random() * $window.innerHeight) + 1) + 'px',
                            (Math.floor(Math.random() * $window.innerWidth) + 1) + 'px');
                    }
                }, 1000);
            };

            $scope.makeWaves = function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                if (!$scope.animating) {
                    $scope.animating = true;
                    $scope.createRipple(evt.pageY - 50 + 'px', evt.pageX - 50 + 'px');
                }
            };

            $scope.getCountdownText = function () {
                return COUNTDOWN_TEXT;
            };
        }
    ]
);
