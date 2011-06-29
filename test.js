module("Preferer Tests", {
    setup: function() {
        this.User = { name: 'Jon' };
		this.User.pref = new Ovi.Preferences();
        this.testConfig = { color: 'blue' };
	}
});

test("setup test", 2, function() {
    ok(typeof this.User === "object", "Is User an object");
    ok(typeof this.User.pref === "object", "Is User.pref an object");
});

test("preferences save test", 2, function() {
    ok(this.User.pref.dirty, "is the data dirty prior to saving");
    // saving preferences
    this.User.pref.save();
    ok(!this.User.pref.dirty, "is the data dirty after saving");
});
/*
test("preferences load test", 1, function() {
    ok(false);
});

test("preferences change test", 1, function() {
    ok(false);
});
*/