angular.module('myApp', []).controller("graphCtrl", ['$scope',function () {
    window.onload = function () {
        var s = Snap("#graph");
        s.rect(0, 0, 1, 100);
    };
}]);
