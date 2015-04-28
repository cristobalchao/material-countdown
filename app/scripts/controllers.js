'use strict';

var app = angular.module('amCountdownApp');

/**
 * @ngdoc function
 * @name amCountdownApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the amCountdownApp
 */
app.controller('MainCtrl',
    ['$scope', '$interval',
      function ($scope, $interval) {

        $scope.stopTimer = false;
        $scope.debug = false;
        $scope.now = moment();

        /*
          Set date-time in the moment:
          e.g. Google IO (May 28th - 12am): 2015-05-28T00:00:00
                PDT  (-07:00): -07:00
                moment("2015-05-28T00:00:00-07:00", "YYYY-MM-DDThh:mm:ssZ");

                CEST (+02:00): +02:00
                moment("2015-05-28T00:00:00+02:00", "YYYY-MM-DDThh:mm:ssZ");     
        */

        // Google IO - PDT 
        $scope.then = moment("2015-05-28T00:00:00-07:00", "YYYY-MM-DDThh:mm:ssZ");

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
            createRandomRipple();
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
            console.log("Now", $scope.now);
            console.log("Then", $scope.then);
            console.log("Diff", $scope.diff);
            console.log("Duration ms", $scope.duration);
            console.log("Diff formatted", $scope.diffFormatted);
          }
        };

        $scope.tick();
    
        $interval(function () {
          console.log(!$scope.stopTimer);
          if (!$scope.stopTimer) {
            $scope.tick();
          } else {
            createRipple((Math.floor(Math.random() * window.innerHeight) + 1)+ 'px', (Math.floor(Math.random() * window.innerWidth) + 1)) + 'px';
          }
        }, 1000);

        var $body = document.body;
        var $ink = $body.querySelector('#ink');

        $scope.animating = false;

        function createRandomRipple() {
          var top = Math.floor(Math.random() * window.innerHeight) + 1;
          var left = Math.floor(Math.random() * window.innerWidth) + 1;
          createRipple(top + 'px', left + 'px');
        }
 
        function createRipple(top, left) {
          $ink.style.top = top;
          $ink.style.left = left;
          $body.classList.remove($scope.theme);
          $scope.theme = 'theme-' + Math.floor((Math.random() * 20) + 1);
          $body.classList.add($scope.theme);
          $ink.classList.add('active');

          setTimeout(function() {
            $body.style.backgroundColor = window.getComputedStyle($ink)['background-color'];
            $ink.style.top = $ink.style.left = $ink.style.height = $ink.style.width = '';
            $ink.classList.remove('active');
            $scope.animating = false;
          }, 600);
        }

        function onClick(e) {
          e.stopPropagation();
          e.preventDefault();

          if (!$scope.animating) {
            $scope.animating = true;
            createRipple(e.pageY - 50 + 'px', e.pageX - 50 + 'px');
          } 
        }

        $body.addEventListener('click', onClick, false);
      }
    ]
  );
