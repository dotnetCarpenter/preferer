module("Preferer Tests", {
    setup: function() {
        this.User = { name: 'Jon' };
		this.User.pref = new Ovi.Preferences();
	}
});

test("setup test", 2, function() {
    ok(typeof this.User === "object");
    ok(typeof this.User.pref === "object");
});

test("preferences save test", 1, function() {
    ok(false);
});

test("preferences load test", 1, function() {
    ok(false);
});

test("preferences change test", 1, function() {
    ok(false);
});