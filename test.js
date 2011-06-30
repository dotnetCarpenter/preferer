module("Preferer Tests", {
    setup: function() {
        this.testConfig = { color: 'blue' };
        this.User = { name: 'Jon' };        
        this.User.pref = new Ovi.Preferences();
	}
});

test("setup test", 3, function() {
    deepEqual(typeof this.User, "object", "Is User an object");
    deepEqual(typeof this.User.pref, "object", "Is User.pref an object");
    deepEqual(typeof this.testConfig, "object", "Is testConfig an object");
});

test("preferences save/load test", 6, function() {
    ok(this.User.pref.dirty, "is the data dirty prior to saving");    
    
    // saving preferences with the user name as id
    this.User.pref.save( this.User.name );
    ok(!this.User.pref.dirty, "is the data dirty after saving");
    
    this.User.pref.setColor('yellow');
    ok(this.User.pref.dirty, "is the data dirty after changing color to yellow");    
    equal(this.User.pref.getColor(), 'yellow');
    
    // saving preferences with the user name as id
    this.User.pref.save( this.User.name );
    
    // save the prefered color in a local variable
    var color = this.User.pref.getColor();
    
    // clear user pref object
    this.User.pref = null;
    ok(this.User.pref === null);
    
    this.User.pref = new Ovi.Preferences();
    this.User.pref.load( this.User.name );
    deepEqual(this.User.pref.getColor(), color);
});

test("preferences change test", 4, function() {
    deepEqual(this.User.pref.getColor(), undefined);
    // create new Prefences class with configuration and override the existing User.pref
    this.User.pref = new Ovi.Preferences(this.testConfig);
    deepEqual(this.User.pref.getColor(), this.testConfig.color);
    
/*    $(this.User.pref).bind('dataChange', function(){
        this.dirty = true;
    });
*/

    // force dirty to be false before change
    this.User.pref.dirty = false;
    this.User.pref.setColor("red");
    
    ok(this.User.pref.dirty, "is the data dirty after changing color");
    deepEqual(this.User.pref.getColor(), "red");
});
