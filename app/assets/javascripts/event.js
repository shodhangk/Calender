var eventApp = angular.module("event", ['gm','ngMap']); 

eventApp.controller("eventCtrl", function($scope,  $http, NgMap) {
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
          set_bounds()
        }, function(response) {
            console.log(response.data)
        });
    }

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      var place = $scope.new_event.location.getPlace();
      $scope.new_event.latitude = place.geometry.location.lat();
      $scope.new_event.longitude = place.geometry.location.lng();
      $scope.new_event.location = place.formatted_address

      $scope.$apply();
  });

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
        set_bounds()
      }, function(response) {

      });
  }


  function set_bounds() {
    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i < $scope.events.length; i++) {
      if ($scope.events[i].latitude && $scope.events[i].longitude) {
        var latlng = new google.maps.LatLng($scope.events[i].latitude, $scope.events[i].longitude);
        bounds.extend(latlng);
      }
    }
    NgMap.getMap().then(function(map) {
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
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
                  format: 'HH:mm:ss Z'
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
                    scope[date_binder[0]][date_binder[1]] = element.find("#datetimepicker input").val()
                });
            });
              scope.uploadFile = function(){
                  var formData = new FormData();

                  // Add code to submit the formData  
              };
          }
      };
  });