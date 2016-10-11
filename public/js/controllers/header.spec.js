describe('HeaderController', function () {
  var ctrl;
  var scope = {};

  beforeEach(function () {
    module('mean.system');

    inject(function ($controller) {
      ctrl = $controller('HeaderController', { $scope: scope });
    });
  })

  it('should have menus', function () {
    expect(scope.menu[0].title).toEqual('Articles');
    expect(scope.menu[1].link).toEqual('articles/create');
  });
});
