Hilary.scope('heinz').register({
    name: 'HomeVM',
    dependencies: ['jQuery', 'ko', 'router'],
    factory: function ($, ko, router) {
        'use strict';

        var HomeVM;

		var self = {
			searchString: undefined,
			go: undefined,
			onSearchInputChanged: undefined,
			isAuthenticated: false
		};

		var HomeAuthenticateState = function(state) {
			if (state == true) {
				self.isAuthenticated = true;
				console.log('WOWOW' + self.isAuthenticated);
			} else {
				self.isAuthenticated = false;
			}
		}

        HomeVM = function () {

            var  oldSearchString;

			self.searchString = ko.observable('');
			self.go = function () {
                if (self.searchString().length) {
                    router.navigate('/search/?q=' + self.searchString());
                    oldSearchString = self.searchString();
                } else {
                    router.navigate('/');
                }
            };

            // subscribe to self.searchString, and auto-search when it changes
			self.onSearchInputChanged = ko.computed(function () {
                if (self.searchString() !== oldSearchString) {
					self.go();
                }
            });

            // but don't auto-search more than twice per second
			self.onSearchInputChanged.extend({ rateLimit: 500 });

            return self;
        };

        return {
        	HomeVM: HomeVM,
			HomeAuthenticateState: HomeAuthenticateState
		};
    }
});
