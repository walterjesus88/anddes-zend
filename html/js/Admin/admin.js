var app= angular.module('moduloAdmin', ['ngRoute', 'chart.js','ui.bootstrap','ui.bootstrap.tpls','ui.router','checklist-model','dialogs','xeditable','angularFileUpload', 'datatables'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  .when("/acl", {
    controller: "AdminCtrl",
    controllerAs: "va",
    templateUrl: "/admin/index/acl"
  })


  .otherwise({
    redirectTo: '/'
  });
}])