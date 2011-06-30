var Ovi = Ovi || {};
Ovi.Preferences = function(config){
    // private variables
    var _color = config ? config.color : undefined,
        _st = Ovi.Preferences.StorageTypes,
        _storageType = !!window.localStorage ? _st.local :
            !!document.documentElement.addBehavior ? _st.userData : _st.notSupported;
            
    return $({
        dirty: true,
        getColor: function(){
            return _color;
        },
        setColor: function(color){
            _color = color;
            $(this).trigger('dataChange');
        },
        save: function(id){
            switch(_storageType){
                case _st.local :
                    localStorage[id] = _color;
                    break;
                case _st.userData :
                    var docStore = document.documentElement;
                    docStore.addBehavior('#default#userdata');
                    docStore.setAttribute('Ovi.Preferences', _color);
                    docStore.save(id);
                    break;
                case _st.notSupported :
                    throw new Error('save is not supported in this browser');
            }
            this.dirty = false;
        },
        load: function(id){
            switch(_storageType){
                case _st.local :
                    _color = localStorage[id];
                    break;
                case _st.userData :
                    var docStore = document.documentElement;
                    docStore.load(id);
                    _color = docStore.getAttribute('Ovi.Preferences');
                    break;
                case _st.notSupported :
                    throw new Error('save is not supported in this browser');
            }
            this.dirty = false;
        }
    }).bind('dataChange', function(){
        this.dirty = true;
    })[0];
};

Ovi.Preferences.StorageTypes = {
    'notSupported': 0,
    'local': 1, /* FF3.5+, Chrome4+, IE8+, Safari4+ */
    'userData': 2 /* IE5.0 to IE7.0 */
};