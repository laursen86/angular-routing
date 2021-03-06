/// <reference path="../testcommon.ts" />
describe('state.stateRules', function () {
    'use strict';
    //Note: This line below is to be able to run the test cases both on the build output as well
    //      as the raw source, this is because the solution is wrapped in a function on build.
    //      It is a bit of a mess though which I am not to fond of, but will have to do for now.
    var mod = angular.mock['module'];
    var inject = angular.mock.inject;
    beforeEach(mod('dotjem.routing', function () {
        return function () {
        };
    }));
    describe('validateName', function () {
        it('accepts "valid" as name', function () {
            inject(function () {
                test.StateRules.validateName('valid');
            });
        });
        it('accepts "valid.sub" as name', function () {
            inject(function () {
                test.StateRules.validateName('valid.sub');
            });
        });
        it('accepts "valid.sub.child" as name', function () {
            inject(function () {
                test.StateRules.validateName('valid.sub.child');
            });
        });
        it('accepts "another" as name', function () {
            inject(function () {
                test.StateRules.validateName('another');
            });
        });
        it('accepts "another.sub" as name', function () {
            inject(function () {
                test.StateRules.validateName('another.sub');
            });
        });
        it('accepts "another.sub.child" as name', function () {
            inject(function () {
                test.StateRules.validateName('another.sub.child');
            });
        });
        it('rejects "" as name', function () {
            inject(function () {
                expect(function () {
                    test.StateRules.validateName('');
                }).toThrow("Invalid name: ''.");
            });
        });
        it('rejects ".!"#" as name', function () {
            inject(function () {
                expect(function () {
                    test.StateRules.validateName('.!"#');
                }).toThrow("Invalid name: '.!\"#'.");
            });
        });
        it('rejects "." as name', function () {
            inject(function () {
                expect(function () {
                    test.StateRules.validateName('.');
                }).toThrow("Invalid name: '.'.");
            });
        });
        it('rejects "almost.valid." as name', function () {
            inject(function () {
                expect(function () {
                    test.StateRules.validateName('almost.valid.');
                }).toThrow("Invalid name: 'almost.valid.'.");
            });
        });
        it('rejects ".almost.valid" as name', function () {
            inject(function () {
                expect(function () {
                    test.StateRules.validateName('.almost.valid');
                }).toThrow("Invalid name: '.almost.valid'.");
            });
        });
        it('rejects reserved rootName as name', function () {
            inject(function () {
                //Note: Root name actually fails because it contains a $atm, which is not valid for names...
                //      but should we change it at some point, it would be nice to be notified with a failing test if we suddenly
                //      where to allow a state with same name as root.
                expect(function () {
                    test.StateRules.validateName(test.RootName);
                }).toThrow(test.replaceWithRoot("Invalid name: 'root'."));
            });
        });
    });
});
