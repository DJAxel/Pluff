import timetablePartial from 'partials/timetable.html';
import holidaysPartial from 'partials/holidays.html';
import freeRoomsPartial from 'partials/free-rooms.html';
import missingPartial from 'partials/errors/missing.html';

export default function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      template: timetablePartial,
      controller: 'TimeTableCtrl',
      resolve: {
        // Load the timetable JSON before the controller
        timetableInfo() {
          return { url: '/me', kind: 'me' };
        },
      },
    })
    .when('/search/:category/:query', {
      template: timetablePartial,
      controller: 'TimeTableCtrl',
      resolve: {
        timetableInfo($route) {
          let categoryUrl;
          const queryUrl = $route.current.params.query;

          // Load correct API url
          switch ($route.current.params.category) {
            case 'room':
              categoryUrl = 'room';
              break;
            case 'class':
              categoryUrl = 'class';
              break;
            case 'teacher':
              categoryUrl = 'teacher';
              break;
            case 'subject':
              categoryUrl = 'subject';
              break;
            default:
              categoryUrl = 'query';
              break;
          }

          return { url: `/${categoryUrl}/${queryUrl}`, kind: categoryUrl };
        },
      },
    })
    .when('/holidays', {
      template: holidaysPartial,
      controller: 'HolidayCtrl',
    })
    .when('/free-rooms', {
      template: freeRoomsPartial,
      controller: 'RoomCtrl',
    })
    .otherwise({
      template: missingPartial,
      controller: 'ErrorCtrl',
    });

  // We don't want no fake hashbangs we want the real shite
  $locationProvider.html5Mode(true);
  // With html5Mode on true, Angular sets up a fallback for older browsers with '#'.
  // However, this strips out the hash. We need this for the API
  $locationProvider.hashPrefix('!');
}
