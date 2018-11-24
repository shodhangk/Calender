var eventApp = angular.module("event", []); 

eventApp.controller("eventCtrl", function($scope,  $http) {
    $scope.events = [];

    $http.defaults.headers.post['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr('content')
 
    $scope.new_event = {};

    $scope.get_events = function() {
      $http({
        method : "GET",
        url : "/events"
      }).then(function(response) {
          console.log("hello")
          $scope.events = response.data.events;
        }, function(response) {
            console.log(response.data)
        });
    }

    $scope.create_event = function() {
      var req = {
        method: 'POST',
        url: '/events',
        headers: {
          "Content-Type": "application/json"
        },
        data: { event: $scope.new_event }
       }
      $http(req).then(function(response) {
        console.log("hello")
        $scope.events.push(response.data.event);
        $scope.new_event ={}
      }, function(response) {

      });
  }

    $scope.get_events()
});

eventApp.directive('datetime', function (
  ) {
      return {
          restrict: 'E',
          template: "<div class='form-group'>" +
                      "<div class='input-group date' id='datetimepicker'>"+
                          "<input type='text' class='form-control'/>" + 
                          "<span class='input-group-addon'>" + 
                              "<span class='glyphicon'></span>"+
                          "</span>"+
                      "</div>" +
                    "</div>",
          link: function (scope, element) {

              scope.fileName = 'Choose a file...';
              if (element.attr("format") == 'time') {
                element.find("#datetimepicker").datetimepicker({
                  format: 'LT'
                });
                element.children().find("span.glyphicon").addClass("glyphicon-time")
              } else if (element.attr("format") == 'date') {
                element.find("#datetimepicker").datetimepicker({
                  format: 'YYYY/MM/DD'
                });
                element.children().find("span.glyphicon").addClass("glyphicon-calendar")
              }
              
              let date_binder = element.attr("ng-datetime-bind").split(".")
              element.find('input').on('change keyup paste load input submit click blur', function (e) {
                scope.$apply(function () {
                    scope[date_binder[0]][date_binder[1]] = element.find("#datetimepicker").data("DateTimePicker").date()._d
                });
            });
              scope.uploadFile = function(){
                  var formData = new FormData();

                  // Add code to submit the formData  
              };
          }
      };
  });