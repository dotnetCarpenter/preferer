module("setup test", {
    setup: function() {
        this.User = { name: 'Jon' };
		this.User.pref = new Ovi.Preferences();
	}
});

test("expect in test", 1, function() {
    ok(typeof this.User === "Object");
});
