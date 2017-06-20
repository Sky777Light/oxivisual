webpackJsonp([0,4],{

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(id, firstName, secondName, email, role, created, avatar, active, password, passwordRepeat, projects, users, newUser) {
        if (id === void 0) { id = null; }
        if (firstName === void 0) { firstName = ''; }
        if (secondName === void 0) { secondName = ''; }
        if (email === void 0) { email = ''; }
        if (role === void 0) { role = null; }
        if (created === void 0) { created = null; }
        if (avatar === void 0) { avatar = ''; }
        if (active === void 0) { active = true; }
        if (password === void 0) { password = ''; }
        if (passwordRepeat === void 0) { passwordRepeat = ''; }
        if (projects === void 0) { projects = []; }
        if (users === void 0) { users = []; }
        if (newUser === void 0) { newUser = false; }
        this._id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.role = role;
        this.created = created;
        this.avatar = avatar;
        this.active = active;
        this.password = password;
        this.passwordRepeat = passwordRepeat;
        this.projects = projects;
        this.users = users;
        this.newUser = newUser;
    }
    return User;
}());
//# sourceMappingURL=user.interface.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Main__ = __webpack_require__(224);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Project__ = __webpack_require__(727);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Project__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Project__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ModelStructure__ = __webpack_require__(726);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__ModelStructure__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__ModelStructure__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__ModelStructure__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_2__ModelStructure__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_2__ModelStructure__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_2__ModelStructure__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constant_data__ = __webpack_require__(375);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__constant_data__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__constant_data__["b"]; });




//# sourceMappingURL=entities.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces_user_interface__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_entities__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(storageService, authService, router) {
        this.storageService = storageService;
        this.authService = authService;
        this.router = router;
        this.User = new __WEBPACK_IMPORTED_MODULE_4__interfaces_user_interface__["a" /* User */]();
    }
    UserService.prototype.logIn = function (remember, user, done) {
        var _this = this;
        this.authService.post('/auth/login', user).subscribe(function (response) {
            var res = JSON.parse(response._body);
            if (res.status) {
                remember ? _this.storageService.set('token', res.token) : _this.storageService.setSession('token', res.token);
                _this.router.navigate(['/']);
            }
            else {
                if (done)
                    done(res.message);
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    UserService.prototype.logOut = function () {
        var _this = this;
        this.storageService.remove('token');
        this.storageService.removeSession('token');
        this.authService.post('/auth/logout', {}).subscribe(function (response) {
            var res = JSON.parse(response._body);
            if (res.status) {
                _this.User = null;
            }
            alertify.success(res.message);
            _this.router.navigate(['/login']);
        }, function (error) { });
    };
    UserService.prototype.setUser = function (user) {
        this.User = user;
        if (user.projects) {
            for (var i = 0; i < user.projects.length; i++) {
                user.projects[i] = new __WEBPACK_IMPORTED_MODULE_5__entities_entities__["a" /* Project */](user.projects[i]);
            }
        }
    };
    UserService.prototype.getUser = function () {
        return this.User;
    };
    UserService.prototype.resolUser = function (resol, obj) {
        var resolFlag = true;
        for (var i in resol) {
            resol[i] = obj[i] ? true : false;
            if (!resol[i])
                resolFlag = false;
        }
        return resolFlag;
    };
    UserService.prototype.lettersNoImg = function (user) {
        var l1 = '';
        var l2 = '';
        if (user.firstName) {
            l1 = user.firstName.charAt(0).toUpperCase();
        }
        if (user.secondName) {
            l2 = user.secondName.charAt(0).toUpperCase();
        }
        return l1 + l2;
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], UserService);
    return UserService;
    var _a, _b, _c;
}());
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webgl_view_webgl_view__ = __webpack_require__(374);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__webgl_view_webgl_view__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__webgl_view_webgl_view__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webgl_view_controls_controls__ = __webpack_require__(370);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__webgl_view_controls_controls__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webgl_view_preloader_preloader__ = __webpack_require__(371);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__webgl_view_preloader_preloader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webgl_view_tooltip_tooltip__ = __webpack_require__(373);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__webgl_view_tooltip_tooltip__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webgl_view_svg_draw_svg_draw__ = __webpack_require__(372);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__webgl_view_svg_draw_svg_draw__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tree_tree__ = __webpack_require__(724);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_5__tree_tree__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_5__tree_tree__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__slimscroll_directive__ = __webpack_require__(722);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_6__slimscroll_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__upload_files_upload_file__ = __webpack_require__(725);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__upload_files_upload_file__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__templates_loader_templates_loader__ = __webpack_require__(723);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__templates_loader_templates_loader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__safeHtml__ = __webpack_require__(721);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__safeHtml__["a"]; });










//# sourceMappingURL=directives.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractChangesView; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AbstractChangesView = (function () {
    function AbstractChangesView() {
        this.DIR = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR;
        this.ProjClasses = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */];
        this.callbacks = [];
    }
    AbstractChangesView.prototype.ngOnInit = function () {
        var _this = this;
        if (this.htmlTemplate) {
        }
        else {
            if (this.tempLoad) {
                this.tempLoad.callbacks.push(function () {
                    //this.cssUrl =  this.tempLoad.cssUrl;
                    _this.htmlTemplate = _this.tempLoad.htmlTemplate;
                    for (var i = 0; i < _this.callbacks.length; i++) {
                        _this.callbacks[i]();
                    }
                });
            }
            else {
                for (var i = 0; i < this.callbacks.length; i++) {
                    this.callbacks[i]();
                }
            }
        }
        if (this.parent && this.parent.onLoadTemplate)
            setTimeout(function () { return _this.parent.onLoadTemplate(_this.constructor.name.toLowerCase()); }, 100);
    };
    AbstractChangesView.prototype.updateAfterInput = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("tempLoad"), 
        __metadata('design:type', Object)
    ], AbstractChangesView.prototype, "tempLoad", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AbstractChangesView.prototype, "htmlTemplate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AbstractChangesView.prototype, "modelData", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AbstractChangesView.prototype, "htmlUrl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AbstractChangesView.prototype, "cssUrl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AbstractChangesView.prototype, "parent", void 0);
    AbstractChangesView = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-webgl-changes-view'
        }), 
        __metadata('design:paramtypes', [])
    ], AbstractChangesView);
    return AbstractChangesView;
}());
//# sourceMappingURL=abstract.changes.view.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Main; });
var Main = (function () {
    function Main(instance) {
        if (instance === void 0) { instance = null; }
        this.adapt(instance);
        if (!this.created)
            this.created = Date.now();
    }
    Main.prototype.toString = function () {
        //let result='';
        //for(let f in this){
        //   if(typeof this[f]) result +=f+":"+this[f]+",";
        //}
        return JSON.stringify(this);
    };
    Main.prototype.adapt = function (entity) {
        if (entity === void 0) { entity = {}; }
        for (var field in entity) {
            this[field] = entity[field];
        }
        return this;
    };
    return Main;
}());
//# sourceMappingURL=Main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthGuardService = (function () {
    function AuthGuardService(router, storageService, authService, userService) {
        this.router = router;
        this.storageService = storageService;
        this.authService = authService;
        this.userService = userService;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        if (this.storageService.get("token") || this.storageService.getSession("token")) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuardService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.authService.get('/api/users/user/undefined').map(function (res) {
            res = res.json();
            if (res.status) {
                _this.userService.setUser(res.res);
                return res.res;
            }
            else {
                _this.userService.logOut();
                return false;
            }
        });
    };
    AuthGuardService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */]) === 'function' && _d) || Object])
    ], AuthGuardService);
    return AuthGuardService;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(81);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggedGuardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoggedGuardService = (function () {
    function LoggedGuardService(router, storageService) {
        this.router = router;
        this.storageService = storageService;
    }
    LoggedGuardService.prototype.canActivate = function (route, state) {
        if (!this.storageService.get("token") && !this.storageService.getSession("token")) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    };
    LoggedGuardService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */]) === 'function' && _b) || Object])
    ], LoggedGuardService);
    return LoggedGuardService;
    var _a, _b;
}());
//# sourceMappingURL=logged-guard.service.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
        this.openMenu = 'out';
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(853),
            styles: [__webpack_require__(794)],
            animations: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('slideInOut', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        transform: 'translate3d(-100%, 0, 0)'
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('in => out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in-out')),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('out => in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in-out'))
                ]),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicProject; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BasicProject = (function () {
    function BasicProject(projectService) {
        this.projectService = projectService;
    }
    BasicProject.prototype.ngOnInit = function () {
        this.project = this.projectService.getProject();
    };
    BasicProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-basic-project',
            template: __webpack_require__(854),
            styles: [__webpack_require__(795)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], BasicProject);
    return BasicProject;
    var _a;
}());
//# sourceMappingURL=basic.project.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_services__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives__ = __webpack_require__(222);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Costumization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextAr; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Costumization = (function () {
    function Costumization(projectService, authService, sanitizer) {
        //let editor = CodeMirror.fromTextArea(myTextarea, {
        //    lineNumbers: true
        //});
        this.projectService = projectService;
        this.authService = authService;
        this.sanitizer = sanitizer;
        this.curNameSpace = this;
        this.menuList = [
            { title: 'Corporate style', active: true },
            { title: 'Tooltip' },
            { title: 'Pre-loader' }
        ];
        this.tabList = [];
        for (var i = 0; i < this.menuList.length; i++) {
            this.tabList.push(new CodeConfig({ cstm: this, _jsMode: i == 1 }).config);
        }
    }
    Costumization.prototype.ngOnInit = function () {
        var _this = this;
        this.project = this.projectService.getProject();
        if (this.project.model && this.project.model.data && this.project.model.data.length) {
            this.loadTemplates();
        }
        else {
            this.project.select = function (p) {
                _this.loadTemplates();
                delete _this.project['select'];
            };
        }
        //for(let i =0,arr:any=[this.cssCode,this.htmlCode];i<arr.length;i++){
        //    let editor = CodeMirror.fromTextArea(arr[i].nativeElement, {
        //        lineNumbers: true,keyMap:'sublime',mode:'css',value:'.tes {     width:10px; }',theme:'dracula'
        //    });
        //}
    };
    Costumization.prototype.loadTemplates = function () {
        var _this = this;
        var model = this.project.model, _DIR = __WEBPACK_IMPORTED_MODULE_3__entities_entities__["c" /* Config */].FILE.DIR;
        this.modelData = model.data[0];
        var _loop_1 = function(u, types) {
            var _template = _DIR.PROJECT_TEMPLATE.NAME + _DIR.PROJECT_TEMPLATE.TYPES[u], templateMode = _DIR.PROJECT_TEMPLATE.HTML, htmlUrl = _template + templateMode, cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;
            if (model.data[0].templates.indexOf(u) > -1) {
                _template = __WEBPACK_IMPORTED_MODULE_3__entities_entities__["c" /* Config */].PROJ_LOC + model.link + _DIR.DELIMETER + _template.replace('assets/', '');
                htmlUrl = _template + templateMode;
                cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;
            }
            var _loop_2 = function(i, arr) {
                this_1.authService.get(arr[i]).subscribe(function (res) {
                    _this.tabList[u][i].value = res._body;
                    setTimeout(function () {
                        _this.tabList[u][i].oninit();
                    });
                    setTimeout(function () {
                        _this.tabList[u][1].active = false;
                    }, 111);
                    _this.tabList[u].active = false;
                    if (u === 0 && i == 1) {
                        _this.curItem = _this.tabList[u];
                        _this.curItem.active = true;
                    }
                });
            };
            for (var i = 0, arr = [cssUrl, htmlUrl]; i < arr.length; i++) {
                _loop_2(i, arr);
            }
        };
        var this_1 = this;
        for (var u = 0, types = _DIR.PROJECT_TEMPLATE.TYPES; u < types.length; u++) {
            _loop_1(u, types);
        }
    };
    Costumization.prototype.ngAfterViewInit = function () {
        //for (let i = 0, arr = this.tabList; i < arr.length; i++) {
        //    arr[i][1].active = false;
        //}
    };
    /*  ngAfterViewChecked(){
     for (let i = 0, arr = this.tabList; i < arr.length; i++) {
     if(arr[i][1].active || arr[i][0].active){
     arr[i][0].oninit();
     arr[i][1].oninit();
     }
     }
     }*/
    Costumization.prototype.codeChange = function () {
        if (this.curItem) {
            for (var i = 0; i < 2; i++) {
                var curVal = this.curItem[i].html.getValue();
                this.curItem[i].value = curVal;
            }
        }
        if (this[this.curTemplate]) {
            this[this.curTemplate].tempLoad.updateCss(this.curItem[0].value);
            this[this.curTemplate].updateAfterInput(this.curItem[1].value);
        }
    };
    Costumization.prototype.onLoadTemplate = function (template) {
        this.curTemplate = template;
        this.codeChange();
    };
    Costumization.prototype.saveChanges = function () {
        var self = this, model = this.project.model, data = model.data[0], _FILE = __WEBPACK_IMPORTED_MODULE_3__entities_entities__["c" /* Config */].FILE, _DIR = _FILE.DIR, _form = new FormData();
        _form.append('dir', __WEBPACK_IMPORTED_MODULE_3__entities_entities__["c" /* Config */].FILE.DIR.DELIMETER);
        _form.append('_id', self.project._id);
        for (var u = 0, types = [_FILE.STORAGE.CONTROLS, _FILE.STORAGE.TOOLTIP, _FILE.STORAGE.PRELOADER]; u < types.length; u++) {
            for (var i = 0, arr = this.tabList[u]; i < arr.length; i++) {
                _form.append(types[u], new File([new Blob([this.tabList[u][i].value], { type: 'text/*' })], i == 0 ? _DIR.PROJECT_TEMPLATE.CSS : _DIR.PROJECT_TEMPLATE.HTML));
            }
        }
        self.authService.post("/api/projects/project/template/update", _form).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                alertify.success(res.message);
            }
            else {
                alertify.error(res.message);
            }
        });
    };
    Costumization.prototype.selectCurItem = function (item, list, index) {
        for (var i = 0; i < list.length; i++) {
            list[i].active = false;
        }
        item.active = !item.active;
        if (!isNaN(index)) {
            this.curItem = this.tabList[index];
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("cssCode"), 
        __metadata('design:type', Object)
    ], Costumization.prototype, "cssCode", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("htmlCode"), 
        __metadata('design:type', Object)
    ], Costumization.prototype, "htmlCode", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("preloader"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__directives_directives__["g" /* Preloader */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__directives_directives__["g" /* Preloader */]) === 'function' && _a) || Object)
    ], Costumization.prototype, "preloader", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("wcontrols"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__directives_directives__["d" /* WControls */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__directives_directives__["d" /* WControls */]) === 'function' && _b) || Object)
    ], Costumization.prototype, "wcontrols", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("wtooltip"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__directives_directives__["e" /* WTooltip */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__directives_directives__["e" /* WTooltip */]) === 'function' && _c) || Object)
    ], Costumization.prototype, "wtooltip", void 0);
    Costumization = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-costumization',
            template: __webpack_require__(855),
            styles: [__webpack_require__(796)]
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_services__["b" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_services__["b" /* ProjectService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _f) || Object])
    ], Costumization);
    return Costumization;
    var _a, _b, _c, _d, _e, _f;
}());
var TextAr = (function () {
    function TextAr() {
    }
    TextAr.prototype.change = function () {
        console.log("change");
    };
    TextAr.prototype.ngOnInit = function () {
    };
    TextAr.prototype.ngAfterViewInit = function () {
        this.config.html = (this.txtarea['nativeElement']);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], TextAr.prototype, "config", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("txtarea"), 
        __metadata('design:type', Object)
    ], TextAr.prototype, "txtarea", void 0);
    TextAr = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-text-code-mirror',
            template: '<textarea #txtarea (change)="change()" [innerText]="config.value"></textarea>'
        }), 
        __metadata('design:paramtypes', [])
    ], TextAr);
    return TextAr;
}());
var CodeConfig = (function () {
    function CodeConfig(options) {
        if (options === void 0) { options = {}; }
        this.config = [
            {
                title: 'Css Code',
                active: true,
                oninit: function (elem) {
                    this.html = CodeMirror.fromTextArea(this.html, {
                        lineNumbers: true,
                        matchBrackets: true,
                        mode: 'css',
                        indentUnit: 4,
                        theme: 'ambiance'
                    });
                    this.html.on('change', function () {
                        options.cstm.codeChange();
                    });
                },
                config: {
                    autoFocus: true,
                    addModeClass: true,
                    language: 'css',
                    rtl: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: 'css',
                    indentUnit: 4,
                    theme: 'ambiance',
                    //mode: {name: 'javascript', json: true},
                    value: ''
                }
            },
            {
                title: (options._jsMode ? 'JS' : 'HTML') + ' Code',
                isJS: (options._jsMode),
                active: true,
                oninit: function (e) {
                    this.html = CodeMirror.fromTextArea(this.html, {
                        lineNumbers: true,
                        matchBrackets: true,
                        continueComments: "Enter",
                        extraKeys: { "Ctrl-Q": "toggleComment" },
                        mode: options._jsMode ? "javascript" : 'htmlmixed',
                        indentUnit: 4,
                        theme: 'ambiance'
                    });
                    this.html.on('change', function () {
                        options.cstm.codeChange();
                    });
                },
                config: { lineNumbers: true, theme: 'ambiance', mode: 'text/html', value: '' }
            }
        ];
    }
    CodeConfig.prototype.getAttr = function () {
        var html = document.createElement('textarea');
        html.className = 'cos-code';
        return html;
    };
    return CodeConfig;
}());
//# sourceMappingURL=costumization.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_services__ = __webpack_require__(80);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewProject; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreviewProject = (function () {
    function PreviewProject(projectService, sanitizer) {
        this.projectService = projectService;
        this.sanitizer = sanitizer;
        this.data = {};
    }
    PreviewProject.prototype.ngOnInit = function () {
        var _this = this;
        var project = this.projectService.getProject(), _self = this, link = "preview?scene=" + project.model.link;
        this.dataSrc = project.model && project.model.link ? this.sanitizer.bypassSecurityTrustResourceUrl(link) : null;
        if (this.dataSrc) {
            var chekIfIframeCreated = setInterval(function () {
                if (_this.ifrm) {
                    clearInterval(chekIfIframeCreated);
                    _this.ifrm['nativeElement'].onload = function () {
                        _self.urlC = this.contentWindow.location.href;
                        _self.data = {
                            ifr: "<iframe width=\"720\" height=\"405\" src=" + (_self.urlC) + " frameborder=0 allowfullscreen ></iframe>",
                            link: _self.urlC
                        };
                    };
                }
            }, 100);
        }
    };
    PreviewProject.prototype.copyUrl = function () {
        var copyTextarea = this.textAr['nativeElement'];
        copyTextarea.select();
        try {
            alertify.success("Url copied was " + (document.queryCommandEnabled('copy') && document.queryCommandSupported('copy') && document.execCommand('copy') ? 'successful' : 'unsuccessful'));
        }
        catch (err) {
            alertify.error("Oops, unable to copy");
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("textAr"), 
        __metadata('design:type', Object)
    ], PreviewProject.prototype, "textAr", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("ifrm"), 
        __metadata('design:type', Object)
    ], PreviewProject.prototype, "ifrm", void 0);
    PreviewProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-preview',
            template: __webpack_require__(856),
            styles: [__webpack_require__(797)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_services__["b" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_services__["b" /* ProjectService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _b) || Object])
    ], PreviewProject);
    return PreviewProject;
    var _a, _b;
}());
//# sourceMappingURL=preview.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_project_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProjectComponent = (function () {
    function ProjectComponent(shareService, route, router, userService, projectService) {
        this.shareService = shareService;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.projectService = projectService;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var selectedProject = null;
            _this.userService.getUser().projects.forEach(function (project) {
                if (project._id == params['id']) {
                    selectedProject = project;
                }
            });
            if (selectedProject) {
                _this.projectService.setProject(selectedProject);
                _this.shareService.changeHeaderSubject(_this.projectService.getProject());
            }
            else {
                _this.router.navigate(['/']);
            }
        });
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project',
            template: __webpack_require__(857),
            styles: [__webpack_require__(798)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */]) === 'function' && _e) || Object])
    ], ProjectComponent);
    return ProjectComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=project.component.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_services__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_directives__ = __webpack_require__(222);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SourceProject; });
/* unused harmony export ProjTabs */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SourceProject = (function () {
    function SourceProject(projectService, authService) {
        this.projectService = projectService;
        this.authService = authService;
        this.editview = false;
        this.instance = this;
        this._CONFIG = __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */];
    }
    SourceProject.prototype.ngOnChanges = function (changes) {
    };
    SourceProject.prototype.ngAfterViewInit = function () {
    };
    SourceProject.prototype.ngOnInit = function () {
        var _this = this;
        this.project = this.projectService.getProject();
        //this.tempNewChild = new ENTITY.ModelStructure();
        this.project.select = function (p) {
            if (p.data)
                _this.select(p.data[0]);
            delete _this.project['select'];
        };
        if (this.project.model && this.project.model.data && this.project.model.data.length) {
            this.project.select(this.project.model);
        }
    };
    SourceProject.prototype.create = function (form) {
        var _this = this;
        if (form.invalid)
            return alertify.error('Please fill all inputs correctly');
        var myForm = new FormData(), fileReader = new FileReader(), filesUpload = [
            { a: this.modelObj, n: (this.modelObj.category == __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_OBJ ? __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.MODEL_OBJ : __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.SVG_FILE) },
            { a: this.framesObj, n: __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.PREVIEW_IMG }
        ];
        myForm.append('name', this.project.model.name);
        myForm.append('_id', this.project._id);
        myForm.append('preview', this.project.image);
        for (var f = 0; f < filesUpload.length; f++) {
            var types = filesUpload[f];
            if (!types.a['files'] || !types.a['files'].length)
                return alertify.error('Please upload all files');
            for (var i = 0; i < types.a['files'].length; i++) {
                var file = types.a['files'][i];
                myForm.append(types.n, file, file.name);
            }
        }
        this.authService.post("/api/projects/project/model/create", myForm).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                _this.project.model.link = res.model.link;
                _this.project.model.data = [new __WEBPACK_IMPORTED_MODULE_2__entities_entities__["h" /* ModelStructure */](res.model.data)];
                _this.select(_this.project.model.data[0]);
                alertify.success(res.message);
            }
            else {
                alertify.error(res.message);
            }
        }, function (error) {
        });
    };
    SourceProject.prototype.update = function (form) {
        if (form.invalid)
            return alertify.error('Please fill all inputs correctly');
        var data = this.project.model.data[0], self = this;
        this.uploadStructure(data, function () {
            var _form = new FormData();
            _form.append('dir', __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.DIR.DELIMETER);
            _form.append('_id', self.project._id);
            _form.append(__WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.SITE_STRUCTURE, new Blob([JSON.stringify([data.clone()])], { type: 'text/json' }));
            self.authService.post("/api/projects/project/model/update", _form).subscribe(function (res) {
                res = res.json();
                if (res.status) {
                    alertify.success(res.message);
                }
                else {
                    alertify.error(res.message);
                }
            });
        }, data.projFilesDirname);
    };
    SourceProject.prototype.uploadStructure = function (area, callback, dirStartFrom) {
        var _self = this, siteStructure = [], isModel = area._category == __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].PROJ_DESTINATION.ModelStructure;
        if (area) {
            var _form = new FormData(), filesUpload = [
                { a: area.svgDestination, n: __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.SVG_FILE },
                { a: area.destination, n: __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.MODEL_OBJ },
                { a: area.alignImages, n: __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.ALIGN_IMG },
                { a: area.images, n: __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.STORAGE.PREVIEW_IMG }
            ];
            if (isModel) {
                if (area.camera.isSVG) {
                    filesUpload.splice(1, 1);
                }
                else {
                    filesUpload.splice(0, 1);
                }
            }
            _form.append('dir', dirStartFrom);
            _form.append('destination', area.destination);
            _form.append('_id', this.project._id);
            for (var f = 0; f < filesUpload.length; f++) {
                var types = filesUpload[f];
                if (!(types.a instanceof Array) || !types.a.length)
                    continue;
                for (var i = 0; i < types.a.length; i++) {
                    var file = types.a[i].file;
                    if (file instanceof File)
                        _form.append(types.n, file, file.name);
                }
            }
            _self.authService.post("/api/projects/project/model/update", _form).subscribe(function (res) {
                res = res.json();
                if (res.status) {
                    area.projFilesDirname = dirStartFrom;
                    area.hasChanges = false;
                    if (isModel) {
                        if (area.destination instanceof Array) {
                            area.destination = area.destination[0].name;
                            if (area.camera.isSVG) {
                                delete area.destination;
                            }
                            else {
                                delete area.svgDestination;
                            }
                        }
                        if (area.svgDestination instanceof Array) {
                            area.svgDestination = area.svgDestination[0].name;
                            if (area.camera.isSVG) {
                                delete area.destination;
                            }
                            else {
                                delete area.svgDestination;
                            }
                        }
                        ['alignImages', 'images'].forEach(function (field) {
                            for (var f = 0; area[field] && f < area[field].length; f++) {
                                if (area[field][f] instanceof __WEBPACK_IMPORTED_MODULE_2__entities_entities__["f" /* ProjFile */] || area[field][f].file)
                                    area[field][f] = area[field][f].name;
                            }
                        });
                    }
                }
                else {
                    alertify.error(res.message);
                }
                if (area.areas) {
                    var startAt = 0, uploadChild = function (_ar) {
                        if (!_ar)
                            return callback();
                        _self.uploadStructure(_ar, function (res) {
                            uploadChild(area.areas[startAt++]);
                        }, _ar.projFilesDirname || (dirStartFrom + __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */].FILE.DIR.DELIMETER + _ar._id));
                    };
                    uploadChild(area.areas[startAt++]);
                }
                else {
                    callback();
                }
            });
        }
        else {
            callback();
        }
    };
    SourceProject.prototype.select = function (child) {
        var _this = this;
        if (this.selectedChild && this.selectedChild._id == child._id)
            return;
        if (this.selectedChild) {
            this.selectedChild._selected = !this.selectedChild._selected;
            if (this.selectedChild.glApp)
                this.selectedChild.glApp = this.selectedChild.parent = null;
            if (!this.selectedChild.preview)
                this.selectedChild.preview = this.project.image;
        }
        this.selectedChild = null;
        setTimeout(function () {
            _this.selectedChild = child;
            child.sourcesApp = _this;
            child.parent = _this.project.model.data[0];
            child.canEdit = true;
            child._selected = !child._selected;
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("modelObj"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__directives_directives__["b" /* UploadFile */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__directives_directives__["b" /* UploadFile */]) === 'function' && _a) || Object)
    ], SourceProject.prototype, "modelObj", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("framesObj"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__directives_directives__["b" /* UploadFile */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__directives_directives__["b" /* UploadFile */]) === 'function' && _b) || Object)
    ], SourceProject.prototype, "framesObj", void 0);
    SourceProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects-source',
            template: __webpack_require__(859),
            styles: [__webpack_require__(800)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_services__["b" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_services__["b" /* ProjectService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_services__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_services__["a" /* AuthService */]) === 'function' && _d) || Object])
    ], SourceProject);
    return SourceProject;
    var _a, _b, _c, _d;
}());
var ProjTabs = (function () {
    function ProjTabs(source) {
        this.source = source;
        this.classes = ['hide'];
    }
    ProjTabs.prototype.toggle = function (elem) {
        elem.className = elem.className.match(this.classes[0]) ? elem.className.replace(this.classes[0], '') : elem.className + " " + this.classes[0];
    };
    return ProjTabs;
}());
//# sourceMappingURL=source.project.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProjectsComponent = (function () {
    function ProjectsComponent(userService, shareService) {
        this.userService = userService;
        this.shareService = shareService;
        //data work with header
        this.header = {
            title: 'Projects',
            arrLength: 0,
            searchName: '',
            sortType: 'A-Z'
        };
        //new project
        this.createNewProject = false;
        this.User = this.userService.getUser();
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.shareService.changeHeaderSubject(this.header);
    };
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__(862),
            styles: [__webpack_require__(803)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _b) || Object])
    ], ProjectsComponent);
    return ProjectsComponent;
    var _a, _b;
}());
//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersComponent = (function () {
    function UsersComponent(shareService, userService, authService) {
        this.shareService = shareService;
        this.userService = userService;
        this.authService = authService;
        //data work with header
        this.header = {
            title: 'Users',
            arrLength: 0,
            searchName: '',
            sortType: 'A-Z'
        };
        this.canEdit = false;
        //create new user
        this.createNewUser = false;
        this.message = {
            email: '',
            password: ''
        };
        this.User = this.userService.getUser();
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.shareService.changeHeaderSubject(this.header);
        this.subNewUser = this.shareService.shareListener.subscribe(function (user) {
            if (user != undefined) {
                if (user.newUser) {
                    _this.authService.post('/api/users/user', user).subscribe(function (res) {
                        res = res.json();
                        if (res.status) {
                            _this.User.users.push(res.res);
                            _this.createNewUser = false;
                        }
                        else {
                            if (res.email)
                                _this.message.email = res.message;
                        }
                        alertify.success(res.message);
                    }, function (error) { });
                }
                else {
                    _this.createNewUser = false;
                }
            }
        });
    };
    UsersComponent.prototype.ngOnDestroy = function () {
        this.subNewUser.unsubscribe();
    };
    //pop-up functions
    UsersComponent.prototype.deactivateUser = function (user) {
        var temp = Object.assign({}, user);
        temp.active = !temp.active;
        this.authService.put('/api/users/user', temp).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                user.active = !user.active;
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    UsersComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.authService.delete('/api/users/user', user).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                var idx = _this.User.users.indexOf(user);
                _this.User.users.splice(idx, 1);
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    // change user card
    UsersComponent.prototype.selectUser = function (user, edit) {
        if (this.selectedUser === user) {
            if (edit) {
                this.canEdit = edit;
            }
            return;
        }
        this.canEdit = edit;
        this.selectedUser = user;
    };
    UsersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(866),
            styles: [__webpack_require__(807)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], UsersComponent);
    return UsersComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_user_interface__ = __webpack_require__(151);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(userService) {
        this.userService = userService;
        this.remember = true;
        this.message = '';
        this.resol = {
            email: true,
            password: true
        };
        this.user = new __WEBPACK_IMPORTED_MODULE_2__interfaces_user_interface__["a" /* User */]();
    }
    LoginComponent.prototype.logIn = function () {
        var _this = this;
        if (!this.userService.resolUser(this.resol, this.user))
            return false;
        this.userService.logIn(this.remember, this.user, function (message) {
            _this.message = message;
        });
    };
    LoginComponent.prototype.keyDown = function ($event) {
        if ($event.keyCode == 13) {
            this.logIn();
        }
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(867),
            styles: [__webpack_require__(808)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_services__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities_entities__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewSceneComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PreviewSceneService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PreviewSceneComponent = (function () {
    function PreviewSceneComponent(authService, location) {
        this.authService = authService;
        this.location = location;
        this.model = new __WEBPACK_IMPORTED_MODULE_3__entities_entities__["a" /* Project */]();
    }
    PreviewSceneComponent.prototype.ngOnInit = function () {
        var _this = this;
        //let remote:any = this.location.path().split("?")[1];
        //if(!remote)return alertify.error('couldn`t find the project');
        //remote = remote.split("&");
        var dmens = __WEBPACK_IMPORTED_MODULE_3__entities_entities__["c" /* Config */].PROJ_DMNS, areas = this.location.path().split(dmens[0]), main = areas[0];
        main = main.split(dmens[1])[1];
        if (!main)
            return alertify.error("No project scene exist");
        this.authService.get(__WEBPACK_IMPORTED_MODULE_3__entities_entities__["c" /* Config */].PROJ_LOC + main + __WEBPACK_IMPORTED_MODULE_3__entities_entities__["c" /* Config */].SITE_STRUCTURE).subscribe(function (res) {
            if (!res.status || res._body.match('!doctype html')) {
                alertify.error("No project found");
            }
            else {
                _this.model.data = [];
                for (var _data = res.json(), i = 0; i < _data.length; i++) {
                    _this.model.data.push(__WEBPACK_IMPORTED_MODULE_3__entities_entities__["d" /* ProjMain */].inject(_data[i]));
                    if (areas.length > 1) {
                        var curIArea = areas[areas.length - 1].split(dmens[1])[1];
                        if (!curIArea)
                            return alertify.error("Something went wrong");
                        _this.checkChild(_this.model.data[i], curIArea, function (c) { return _this.select(c); });
                    }
                    else
                        _this.select(_this.model.data[i]);
                }
            }
        }, function (e) {
            console.log(e);
        }, function () {
        });
    };
    PreviewSceneComponent.prototype.checkChild = function (child, curIArea, calback) {
        if (child.projFilesDirname.indexOf(curIArea) > -1) {
            calback(child);
        }
        else if (child.areas) {
            for (var d = 0; d < child.areas.length; d++) {
                this.checkChild(child.areas[d], curIArea, calback);
            }
        }
    };
    PreviewSceneComponent.prototype.select = function (child) {
        this.selected = child;
        child.parent = this.model.data[0];
    };
    PreviewSceneComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-scene-preview',
            template: __webpack_require__(868),
            styles: [__webpack_require__(809)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]) === 'function' && _b) || Object])
    ], PreviewSceneComponent);
    return PreviewSceneComponent;
    var _a, _b;
}());
var PreviewSceneService = (function () {
    function PreviewSceneService() {
    }
    PreviewSceneService.prototype.canActivate = function () {
        return true;
    };
    PreviewSceneService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], PreviewSceneService);
    return PreviewSceneService;
}());
//# sourceMappingURL=preview.project.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_changes_view__ = __webpack_require__(223);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WControls; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WControls = (function (_super) {
    __extends(WControls, _super);
    function WControls() {
        _super.call(this);
    }
    WControls = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-webgl-controls',
            template: __webpack_require__(869),
            styles: [__webpack_require__(812)]
        }), 
        __metadata('design:paramtypes', [])
    ], WControls);
    return WControls;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_changes_view__["a" /* AbstractChangesView */]));
//# sourceMappingURL=controls.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_changes_view__ = __webpack_require__(223);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Preloader; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        _super.call(this);
        this.isActive = false;
    }
    Preloader.prototype.onPreloaderLoad = function () {
        this.preloader['nativeElement'].className += ' active';
    };
    Preloader.prototype.onUpdatePreloaderStatus = function (value) {
        if (!this.progressB)
            this.progressB = document.querySelector('.pre-progress-bar>.pre-progress-status');
        if (this.progressB)
            this.progressB.style.width = (this.progressB.parentNode.clientWidth * value) + 'px';
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("prevImg"), 
        __metadata('design:type', Object)
    ], Preloader.prototype, "prevImg", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("preloader"), 
        __metadata('design:type', Object)
    ], Preloader.prototype, "preloader", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], Preloader.prototype, "preview", void 0);
    Preloader = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-preloader',
            template: __webpack_require__(870),
            styles: [__webpack_require__(813)]
        }), 
        __metadata('design:paramtypes', [])
    ], Preloader);
    return Preloader;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_changes_view__["a" /* AbstractChangesView */]));
//# sourceMappingURL=preloader.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webgl_view__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fabric__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fabric___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_fabric__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SVGView; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SVGView = (function () {
    function SVGView() {
        this.canEdit = false;
        this.isFinish = false;
        this.zoomDelta = 10;
        this.scaleDelta = 1.002;
        this.options = {};
        this.showHelpZoomer = false;
        this.COLORS = ['#00ff00', "#ff0000"];
        this.MODES = {};
        this.defOpacity = 0.1;
        this.MODES = { EDIT: 1, ADD: 2, NORMAL: 3, NO: 4 };
        this.MOUSE = { DOWN: 1, UP: 2, CUR: 0, GROUP: 3 };
        this.mode = this.MODES.ADD;
        this.curImgZoom = new Image();
        this.curImgBufferZoom = new Image();
    }
    SVGView.prototype.ngOnInit = function () {
    };
    SVGView.prototype.reload = function (data) {
        var _this = this;
        fabric.loadSVGFromString(data, function (o, _options) {
            _this.options = _options;
            _this.parseSVG(data, (function (_objects) {
                _this.onFinishParse(o, _options, _objects);
            }));
        });
    };
    SVGView.prototype.ngAfterViewInit = function () {
        var _this = this;
        var svg = this.selected.svgDestination;
        if (svg instanceof Array)
            svg = svg[0].name;
        this.dataSrc = svg && svg.match('.svg') ? __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_LOC + this.selected.projFilesDirname + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.DELIMETER + svg : null;
        var _self = this, domElem = this.dataEl['nativeElement'], handler = (domElem.addEventListener || domElem.attachEvent).bind(domElem);
        this.canEdit = this.selected.canEdit;
        fabric.Object.prototype.set({
            selectable: false,
            transparentCorners: false,
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            padding: 7,
            _add: function (e) {
                this.remove(e);
                e._parent = this;
                return this.addWithUpdate(e);
            },
            dropSelf: function () {
                if (this._objects) {
                    while (this._objects.length)
                        this._objects[0].dropSelf();
                }
                else if (this.type == _self.shapes.CIRCLE) {
                    if (this._parent) {
                        this._parent.remove(this);
                    }
                    else {
                        _self.fabricJS.remove(this);
                    }
                }
                else {
                    var _p = this.get('_points');
                    if (_p)
                        _p.forEach(function (e) {
                            if (e._parent) {
                                e._parent.remove(e);
                            }
                            else {
                                _self.fabricJS.remove(e);
                            }
                        });
                }
                if (this._dataSource)
                    this._dataSource.active = false;
                if (this._parent) {
                    this._parent.remove(this);
                }
                else {
                    _self.fabricJS.remove(this);
                }
                _self.fabricJS.renderAll();
                _self.toSVG();
            },
            _clone: function (isHard) {
                var _this = this;
                this.setCoords();
                var clone = ['fill', 'hoverFill', 'defFill', 'opacity', '_hasUpdate', 'scaleX0', 'scaleY0', 'points0', 'id', '_tooltip', '_data', '_dataSource', 'material', 'click', 'selectable', '_objects'], _pn = this.get('_points');
                var _points = isHard || this._hasUpdate ? this.get('points') : this.get('points').map(function (el, d) {
                    var _pC = new fabric.Point((el.x) * _this.scaleX0, (el.y) * _this.scaleY0);
                    //this.left = this.top = 0;
                    _this._hasUpdate /*= this.scaleX0 = this.scaleY0 = this.scaleY = this.scaleX */ = 1;
                    //console.log(this.scaleX0, this.scaleY0);
                    return _pC;
                }), newObj = new this.constructor(_points);
                for (var i = 0; i < clone.length; i++) {
                    newObj[clone[i]] = this[clone[i]];
                }
                newObj.perPixelTargetFind = !_self.selected.canEdit;
                if (!newObj.id)
                    newObj.set('id', __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].randomstr());
                if (this._parent) {
                    this._parent._add(newObj);
                }
                else {
                    _self.fabricJS._add(newObj);
                }
                if (_pn) {
                    newObj.set('_points', _pn);
                    for (var i = 0; i < _pn.length; i++) {
                        if (_pn[i]._parent) {
                            _pn[i]._parent.remove(_pn[i].parent).remove(_pn[i])._add(_pn[i]);
                        }
                        else {
                            _self.fabricJS.remove(_pn[i].parent).remove(_pn[i])._add(_pn[i]);
                        }
                        _pn[i].parent = newObj;
                    }
                }
                if (this._parent) {
                    this._parent.remove(this);
                }
                else {
                    _self.fabricJS.remove(this);
                }
                newObj.setCoords();
                return newObj;
            },
            getScreenPst: function () {
                this.onscreenParams = this.getCenterPoint();
                this.onscreenOffset = _self.glapp.app._offset();
            },
            getBoundingBox: function () {
                if (this.type == _self.shapes.POLYGON) {
                    var points = this.get('points'), xMin = void 0, xMax = void 0, yMin = void 0, yMax = void 0;
                    xMin = xMax = yMin = yMax = 0;
                    for (var i = 0; i < points.length; i++) {
                        var x = points[i].x, y = points[i].y;
                        if (x < xMin) {
                            xMin = x;
                        }
                        if (x > xMax) {
                            xMax = x;
                        }
                        if (y < yMin) {
                            yMin = y;
                        }
                        if (y > yMax) {
                            yMax = y;
                        }
                    }
                    this.width = xMax - xMin;
                    this.height = yMax - yMin;
                    if (this._parent) {
                        this.minX = this._parent.left - xMin;
                        this.minY = this._parent.top - yMin;
                    }
                    else {
                        this.minX = xMin;
                        this.minY = yMin;
                    }
                    this.left += this.minX;
                    this.top += this.minY;
                }
            }
        });
        fabric.Canvas.prototype.set({
            _add: function (e) {
                this.remove(e);
                e._parent = this;
                return this.add(e);
            }
        });
        setTimeout(function () {
            _this.fabricJS = new fabric.Canvas(_this.dataEl.nativeElement, {
                selection: true, borderColor: 'red',
                cornerColor: 'green',
                cornerSize: 6
            });
            _this.curFill = _this.getRandomColor();
            _this.settings = {
                CIRCLE: {
                    radius: 1,
                    opacity: 0.75,
                    strokeWidth: 5,
                    stroke: 'red',
                    selectable: true,
                    excludeFromExport: true,
                    hasControls: false,
                    originX: 'center',
                    originY: 'center'
                },
                POLYGON: {
                    fill: _this.curFill,
                    opacity: _this.selected.camera.opacity,
                    selectable: false,
                    perPixelTargetFind: !_this.selected.canEdit
                }, GROUP: {
                    selectable: false,
                    perPixelTargetFind: !_this.selected.canEdit
                }
            };
            _this.shapes = {
                GROUP: 'group',
                POLYGON: 'polygon',
                CIRCLE: 'circle'
            };
            if (_this.dataSrc) {
                fabric.loadSVGFromURL(_this.dataSrc, function (o, options) {
                    _this.options = options;
                    options.width *= _this.scaleDelta;
                    options.height *= _this.scaleDelta;
                    _this.glapp.authServ.get(_this.dataSrc, { hasAuthHeader: false }).subscribe(function (res) {
                        _this.parseSVG(res._body, (function (_objects) {
                            _self.onFinishParse(o, options, _objects);
                            _this.onLoadSVG();
                        }));
                    });
                });
            }
            else {
                _this.onLoadSVG();
            }
        }, 200);
    };
    SVGView.prototype.onFinishParse = function (o, options, _objects) {
        var _self = this;
        if (o && options) {
            options.objects = o;
            _self.resize(false, false, options);
            var scaleMultiplierX_1 = _self.fabricJS.width / options.width, scaleMultiplierY_1 = _self.fabricJS.height / options.height, outs = [], groups = [];
            var _loop_1 = function(itm, maxL) {
                var cur = o[itm];
                if (cur.type == _self.shapes.POLYGON) {
                    var center_1 = cur.getCenterPoint(), _points_1 = [], points0 = cur.get('points'), _p = points0.concat([]).map(function (el, d) {
                        cur.left = cur.top = 0;
                        cur.scaleX = cur.scaleY = 1;
                        var _pC = new fabric.Point(center_1.x + el.x * scaleMultiplierX_1, center_1.y + el.y * scaleMultiplierY_1);
                        if (_self.canEdit) {
                            var circle = new fabric.Circle(_self.settings.CIRCLE);
                            circle.left = _pC.x;
                            circle.top = _pC.y;
                            circle._iter = d;
                            circle.parent = cur;
                            _points_1.push(circle);
                        }
                        return _pC;
                    });
                    if (_points_1.length)
                        cur.set('_points', _points_1);
                    cur.set('points', _p);
                    cur.set('points0', points0);
                    cur.set('_center', center_1);
                    outs.push(cur);
                }
                else if (cur.type == _self.shapes.GROUP) {
                }
                var orCloner = void 0, cloneCur = cur._clone(true);
                orCloner = cloneCur;
                for (var u = 0; u < _objects.length; u++) {
                    if (cloneCur.id == _objects[u].id) {
                        var _c = _objects.splice(u, 1)[0];
                        if (_c.group) {
                            var _group = void 0;
                            for (var g = 0; g < groups.length; g++) {
                                if (_c.group.id == groups[g].id) {
                                    _group = groups[g];
                                    break;
                                }
                            }
                            if (!_group) {
                                _group = new SVGGroup(_self, _c.group.id);
                                groups.push(_group);
                            }
                            _group.add(cloneCur);
                            cloneCur = _group;
                        }
                        break;
                    }
                }
                for (var i = 0, areas = _self.selected.areas; areas && i < areas.length; i++) {
                    if (areas[i]._id.match(cloneCur.id)) {
                        cloneCur._data = areas[i];
                        break;
                    }
                }
                for (var i = 0, sources = _self.glapp.preToolTip.dataElem; sources && i < sources.length; i++) {
                    if (sources[i]._id == cloneCur.id || (cloneCur._data && sources[i]._id == cloneCur._data.dataSourceId)) {
                        cloneCur._dataSource = sources[i];
                        break;
                    }
                }
                orCloner.opacity = _self.canEdit ? _self.selected.camera.opacity : _self.defOpacity;
                if (!orCloner.defFill)
                    orCloner.defFill = orCloner.fill;
                if (!orCloner.hoverFill)
                    orCloner.hoverFill = cloneCur._data && cloneCur._data.areas && cloneCur._data.areas.length || cloneCur._dataSource ? _self.COLORS[0] : _self.COLORS[1];
                if (!cloneCur._tooltip && cloneCur.type == _self.shapes.POLYGON)
                    cloneCur._tooltip = new __WEBPACK_IMPORTED_MODULE_2__webgl_view__["c" /* OxiToolTip */](cloneCur, _self.glapp.app);
            };
            for (var itm = 0, maxL = o.length; itm < maxL; itm++) {
                _loop_1(itm, maxL);
            }
            for (var g = 0; g < groups.length; g++) {
                var _n = groups[g].make();
                for (var f = 0, args = ['_data', '_dataSource', 'id']; f < args.length; f++) {
                    _n[args[f]] = groups[g][args[f]];
                }
                _n._tooltip = new __WEBPACK_IMPORTED_MODULE_2__webgl_view__["c" /* OxiToolTip */](_n, _self.glapp.app);
            }
            this.fabricJS.calcOffset().renderAll();
        }
    };
    SVGView.prototype.updateImgZoomer = function (callback) {
        var _self = this;
        this.curImgBufferZoom.src = this.fabricJS.toDataURL();
        var _bCnvc = _self.bufferC['nativeElement'], _cnvs = _bCnvc.getContext('2d');
        _cnvs.drawImage(_self.glapp.app._slider.isDebug ? _self.glapp.app._slider.currentAlignFrame : _self.glapp.app._slider.currentFrame, 0, 0, _bCnvc.width, _bCnvc.height);
        _cnvs.drawImage(_self.curImgBufferZoom, 0, 0);
        _self.curImgZoom.src = _bCnvc.toDataURL();
        if (callback)
            callback();
    };
    SVGView.prototype.drawZoom = function (event) {
        var _this = this;
        this.showHelpZoomer = [this.MODES.EDIT, this.MODES.ADD].indexOf(this.mode) > -1 && this.selected.camera.showZoomHelper;
        if (!this.showHelpZoomer)
            return;
        var _deltaX = this.zoomDelta, _deltaY = _deltaX * this.curImgZoom.height / this.curImgZoom.width, zCnvs = this.zoomer['nativeElement'], _offset = event.e.target.getBoundingClientRect();
        this.updateImgZoomer(function () {
            zCnvs.getContext('2d').drawImage(_this.curImgZoom, event.e.clientX - _offset.left - _deltaX, event.e.clientY - _offset.top - _deltaY, 2 * _deltaX, 2 * _deltaY, 0, 0, zCnvs.width, zCnvs.height);
        });
    };
    SVGView.prototype.onLoadSVG = function () {
        var _this = this;
        var _self = this, fabricJS = this.fabricJS;
        if (this.canEdit) {
            this.upperC = document.getElementsByClassName('upper-canvas')[0];
            this.eventsData = [
                { cntx: window, name: __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.KEY.UP, callback: function (e) { return _this.onKeyUp(e); } },
                { cntx: window, name: __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.KEY.DOWN, callback: function (e) { return _this.onKeyDown(e); } },
                {
                    cntx: this.upperC,
                    name: __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CNTXMENU,
                    callback: function (e) { return _this.onMouseDown(e); }
                },
            ];
            this.eventsData.forEach(function (el) {
                fabric.util.addListener(el.cntx, el.name, el.callback);
            });
            fabricJS.on('object:selected', function (e) {
                if (_this.mode != _this.MODES.EDIT)
                    _this.mode = _this.MODES.NO;
            });
            fabricJS.on('before:selection:cleared', function (options) {
                if (_this.mode != _this.MODES.EDIT)
                    _this.mode = _this.MODES.ADD;
            });
            fabricJS.on('mouse:wheel', function (event) {
                _this.zoomDelta += (event.e.deltaY || event.e.detail || event.e.wheelDelta) / 10;
                _this.drawZoom(event);
                event.e.preventDefault();
            });
            fabricJS.on("mouse:move", function (event) {
                var pos = fabricJS.getPointer(event.e);
                _this.glapp.app._projControls.showControls(event.e, false);
                if (_this.mode == _this.MODES.NO) {
                }
                else if (_this.mode === _this.MODES.EDIT && _this.currentShape) {
                    var points = _this.currentShape.get("points");
                    points[points.length - 1].x = pos.x;
                    points[points.length - 1].y = pos.y;
                    _this.currentShape.set({
                        points: points
                    });
                    _this.currentShape._clone(true);
                    fabricJS.renderAll();
                }
                _this.drawZoom(event);
            });
            fabricJS.on("mouse:up", function (event) {
                _this.MOUSE.CUR = _this.MOUSE.UP;
                if (_this.mode === _this.MODES.NO && _this.currentShape && [_this.shapes.POLYGON, _this.shapes.GROUP].indexOf(_this.currentShape.type) > -1) {
                    if (!_this.glapp.app._projControls.showAttachPopUp(event.target)) {
                        _this.mode = _this.MODES.ADD;
                        _this.currentShape = false;
                    }
                }
            });
            fabricJS.on("mouse:down", function (event) {
                _this.MOUSE.CUR = _this.MOUSE.DOWN;
                var pos = fabricJS.getPointer(event.e), polySet = _this.settings.POLYGON, pointSet = _this.settings.CIRCLE;
                pointSet.left = pos.x;
                pointSet.top = pos.y;
                if (_this.mode == _this.MODES.GROUP) {
                    _this.curGroup.add(event.target);
                }
                else if (_this.mode == _this.MODES.NO) {
                    if (_this.currentShape) {
                    }
                    else {
                        _this.mode = _this.MODES.ADD;
                    }
                }
                else if (_this.mode === _this.MODES.ADD) {
                    var _points_2 = [{
                            x: pos.x,
                            y: pos.y
                        }, {
                            x: pos.x + 1,
                            y: pos.y + 1
                        }];
                    var circle = new fabric.Circle(pointSet), _pointsSel = [circle];
                    circle.parent = _this.currentShape = new fabric.Polygon(_points_2, polySet);
                    circle._iter = 0;
                    _this.currentShape.set("_points", _pointsSel);
                    fabricJS._add(_this.currentShape)._add(circle).renderAll();
                    _this.mode = _this.MODES.EDIT;
                }
                else if (_this.mode === _this.MODES.EDIT && _this.currentShape && _this.currentShape.type === "polygon") {
                    var points = _this.currentShape.get("points"), _points = _this.currentShape.get("_points");
                    points.push({
                        x: pos.x,
                        y: pos.y
                    });
                    _this.currentShape._parent.remove(_this.currentShape);
                    _points.forEach(function (e) {
                        e._parent.remove(e);
                    });
                    _this.currentShape = new fabric.Polygon(points, polySet);
                    var circle = new fabric.Circle(pointSet);
                    circle.parent = _this.currentShape;
                    circle._iter = _points.length;
                    _points.push(circle);
                    _this.currentShape.set("_points", _points);
                    fabricJS._add(_this.currentShape);
                    _points.forEach(function (e) {
                        fabricJS._add(e);
                    });
                }
            });
            fabricJS.on('object:moving', function (e) {
                var x = e.e.movementX, y = e.e.movementY, curActiv = e.target;
                if (curActiv) {
                    switch (curActiv.type) {
                        case 'polygon':
                            {
                                //curActiv.get("_points").forEach((obj)=> {
                                //    obj.set('left', obj.left + x);
                                //    obj.set('top', obj.top + y);
                                //    obj.setCoords();
                                //});
                                break;
                            }
                        case 'circle':
                            {
                                var _p = curActiv.parent.get('points');
                                _p[curActiv._iter].x += x;
                                _p[curActiv._iter].y += y;
                                //curActiv.parent.set('points',_p);
                                //curActiv.parent.setCoords();
                                //curActiv.parent._parent.remove(curActiv.parent)._add(curActiv.parent);
                                //curActiv.parent._parent._add(curActiv.parent);
                                curActiv.parent._clone(true);
                                //var bound = curActiv.parent.getBoundingRect();
                                //curActiv.setTop(curActiv.originalState.top);
                                //curActiv.setLeft(curActiv.originalState.left);
                                //curActiv.setScaleX(curActiv.originalState.scaleX);
                                //curActiv.setScaleY(curActiv.originalState.scaleY);
                                //curActiv.parent.setCoords();
                                break;
                            }
                    }
                    fabricJS.calcOffset().renderAll();
                    _this.toSVG();
                }
            });
            /*fabricJS.on('object:modified', (e)=> {
             var obj = e.target;
             var matrix = obj.calcTransformMatrix();
             if (obj.type == 'polygon') {
             obj.get("_points").forEach(function (p) {
             return fabric.util.transformPoint(p, matrix);
             });
             fabricJS.renderAll();
             }

             });*/
            fabricJS.on('mouse:over', function (e) {
                if (_this.mode != _this.MODES.NO || !e.target)
                    return;
                e.target.opacity = 1;
                if (e.target._objects)
                    e.target._objects.forEach(function (el) {
                        el.opacity = 1;
                    });
                _this.currentShape = e.target;
                _this.fabricJS.renderAll();
            });
            fabricJS.on('mouse:out', function (e) {
                if (_this.mode != _this.MODES.NO || !e.target)
                    return;
                _this.currentShape = null;
                e.target.opacity = _this.selected.camera.opacity;
                if (e.target._objects)
                    e.target._objects.forEach(function (el) {
                        el.opacity = e.target.opacity;
                    });
                _this.fabricJS.renderAll();
            });
        }
        else {
            fabricJS.on('mouse:over', function (e) {
                if (!e.target)
                    return;
                _this.intersectingCheck(e.target, function () {
                    _this.currentShape = e.target;
                    if (e.target.type == _this.shapes.GROUP) {
                        var isGreen_1 = e.target._data && e.target._data.areas && e.target._data.areas.length || e.target._dataSource;
                        e.target._objects.forEach(function (el) {
                            if (!el.defFill)
                                el.defFill = el.fill;
                            if (!el.hoverFill)
                                el.hoverFill = isGreen_1 ? _self.COLORS[0] : _self.COLORS[1];
                            el.set('fill', el.hoverFill);
                            el.set('opacity', _this.selected.camera.opacity);
                        });
                    }
                    else {
                        e.target.set('fill', e.target.hoverFill).set('opacity', _this.selected.camera.opacity).setCoords();
                    }
                    if (e.target._tooltip)
                        e.target._tooltip.show();
                    _this.fabricJS.renderAll();
                });
            });
            fabricJS.on('mouse:out', function (e) {
                if (!e.target)
                    return;
                _this.intersectingCheck(e.target, function () {
                    _this.currentShape = null;
                    if (e.target._tooltip)
                        e.target._tooltip.show(false);
                    if (e.target.type == _this.shapes.GROUP) {
                        e.target._objects.forEach(function (el) {
                            el.set('fill', el.defFill);
                            el.set('opacity', _self.defOpacity);
                        });
                    }
                    else {
                        e.target.set('fill', e.target.defFill);
                        e.target.set('opacity', _self.defOpacity);
                    }
                    _this.fabricJS.renderAll();
                });
            });
            fabricJS.on('mouse:up', function (e) {
                if (!e.target)
                    return;
                if (e.target.click)
                    e.target.click();
            });
        }
        fabricJS.on("after:render", function () {
            fabricJS.calcOffset();
        });
        setTimeout(function () {
            if (_this.glapp.app && _this.glapp.app._events)
                _this.glapp.app._events.onWindowResize();
            _this.isFinish = true;
        }, 100);
    };
    SVGView.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    SVGView.prototype.toSVG = function () {
        var svgName = 'models.svg';
        this.selected.svgDestination = [{
                name: svgName,
                file: new File([new Blob([this.fabricJS.toSVG(['name'])], { type: 'text/*' })], svgName)
            }];
        this.selected.hasChanges = true;
    };
    SVGView.prototype.onKeyUp = function (e) {
        if (this.curGroup) {
            this.curGroup.make();
            this.curGroup = null;
            this.toSVG();
        }
        this.mode = this.MODES.NO;
        if (e.keyCode === 27 || e.keyCode === 13) {
            this.onFinishDraw();
        }
    };
    SVGView.prototype.onKeyDown = function (e) {
        if (e.keyCode == 16) {
            this.mode = this.MODES.GROUP;
            if (!this.curGroup) {
                this.curGroup = new SVGGroup(this);
            }
        }
    };
    SVGView.prototype.onMouseDown = function (e) {
        e.preventDefault();
        this.lastSelectedShape = null;
        if (e.button == 2) {
            if (this.mode == this.MODES.NO && this.currentShape) {
                this.glapp.app._projControls.showControls(e);
                this.lastSelectedShape = this.currentShape;
            }
            else {
                this.onFinishDraw();
            }
        }
    };
    SVGView.prototype.onFinishDraw = function () {
        if (this.currentShape && this.currentShape.type == this.shapes.POLYGON) {
            var points = this.currentShape.get('points');
            points.pop();
            this.currentShape.set({
                points: points
            });
            this.currentShape._clone(true);
            this.toSVG();
        }
        this.curFill = this.settings.POLYGON.fill = this.getRandomColor();
        this.mode = this.MODES.NO;
        this.currentShape = null;
        this.fabricJS.deactivateAll().renderAll();
    };
    SVGView.prototype.resize = function (_w, _h, options) {
        if (_w === void 0) { _w = null; }
        if (_h === void 0) { _h = null; }
        if (options === void 0) { options = null; }
        if (!this.fabricJS)
            return;
        if (!_w && this.glapp.app._container)
            _w = this.glapp.app._container.clientWidth;
        if (!_h && this.glapp.app._container)
            _h = this.glapp.app._container.clientHeight;
        var scaleMultiplierX = _w / this.fabricJS.width, scaleMultiplierY = _h / this.fabricJS.height, scaleX0 = scaleMultiplierX, scaleY0 = scaleMultiplierY, objects = this.fabricJS._objects, prevW = this.fabricJS.width, prevH = this.fabricJS.height;
        if (_w)
            this.fabricJS.setWidth(_w);
        if (_h)
            this.fabricJS.setHeight(_h);
        if (options) {
            scaleMultiplierX = scaleX0 = this.fabricJS.width / options.width;
            scaleMultiplierY = scaleY0 = this.fabricJS.height / options.height;
            objects = options.objects;
        }
        else {
            scaleX0 = _w / prevW;
            scaleY0 = _h / prevH;
        }
        if (!(scaleX0 == 1 && scaleY0 == 1 && scaleMultiplierX == 1 && scaleMultiplierY == 1))
            this.resizeElements(objects, scaleX0, scaleY0, scaleMultiplierX, scaleMultiplierY);
        if (this.zoomer) {
            var _cnvs = this.zoomer['nativeElement'], _bCnvs = this.bufferC['nativeElement'];
            _bCnvs.width = _w;
            _bCnvs.height = _h;
            _cnvs.width = _w * 0.2;
            _cnvs.height = _h * 0.2;
            _cnvs.style.width = _w * 0.2 + 'px';
            _cnvs.style.height = _h * 0.2 + 'px';
        }
        this.fabricJS.calcOffset().renderAll();
    };
    SVGView.prototype.resizeElements = function (objects, scaleX0, scaleY0, scaleMultiplierX, scaleMultiplierY) {
        for (var i = 0, list = objects.concat([]); i < list.length; i++) {
            var cur = list[i];
            cur.scaleX0 = scaleX0;
            cur.scaleY0 = scaleY0;
            cur._hasUpdate = 0;
            cur.left = ((cur.left * scaleMultiplierX));
            cur.top = (cur.top * scaleMultiplierY);
            if (cur.type != this.shapes.CIRCLE) {
                cur.scaleX *= scaleMultiplierX;
                cur.scaleY *= scaleMultiplierY;
            }
            if (cur._tooltip)
                cur._tooltip.show(false);
            if (this.isFinish) {
                if (cur.type == this.shapes.POLYGON) {
                    cur._clone();
                }
                else if (cur.type == this.shapes.GROUP) {
                    this.resizeElements(cur._objects, scaleX0, scaleY0, scaleMultiplierX, scaleMultiplierY);
                }
            }
        }
    };
    SVGView.prototype.ngOnDestroy = function () {
        //delete this.selected.svgDestination;
        this.eventsData.forEach(function (el) {
            fabric.util.removeListener(el.cntx, el.name, el.callback);
        });
    };
    SVGView.prototype.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    SVGView.prototype.rgbToHex = function (arr) {
        return "#" + this.componentToHex(arr[0]) + this.componentToHex(arr[1]) + this.componentToHex(arr[2]);
    };
    SVGView.prototype.getBoundingBox = function (points) {
    };
    SVGView.prototype.parseSVG = function (svg, callback) {
        var _self = this, parser = new DOMParser(), doc = parser.parseFromString(svg, "image/svg+xml"), allElem = [], options = {}, _svg = doc.childNodes[1], parseDom = (function parseDom(_el, parent) {
            if (parent === void 0) { parent = null; }
            var _loop_2 = function(i) {
                var e = _el.childNodes[i], elem = void 0, setAttr = function setAttr(elem) {
                    if (elem) {
                        if (elem === 2) {
                            elem = {};
                        }
                        else {
                            if (parent) {
                                parent._add(elem);
                            } //else {
                            //_self.fabricJS._add(elem);
                            allElem.push(elem);
                        }
                        var _loop_3 = function(attr) {
                            var cntn = e.attributes[attr].textContent, _field = e.attributes[attr].localName;
                            switch (_field) {
                                case 'id':
                                    {
                                        elem[_field] = cntn;
                                        break;
                                    }
                                case 'style':
                                    {
                                        cntn.split(";").forEach(function (e) {
                                            if (!e || !e.trim().length)
                                                return;
                                            var _el = e.split(":"), _f = _el[0].trim();
                                            switch (_f) {
                                                case 'opacity':
                                                    {
                                                        elem[_f] = parseFloat(_el[1]);
                                                        break;
                                                    }
                                                case 'fill':
                                                    {
                                                        elem[_f] = _el[1].trim();
                                                        /*_self.rgbToHex(_el[1].split(",").map((e)=> {
                                                         return +e.replace(/[^0-9.]/g, "")
                                                         }));*/
                                                        break;
                                                    }
                                            }
                                        });
                                        break;
                                    }
                                case 'transform':
                                    {
                                        var _f_1 = ['left', "top", "scaleX", "scaleY"];
                                        cntn.split(" ").forEach(function (e, key) {
                                            if (!_f_1[key] || !e)
                                                return;
                                            elem[_f_1[key]] = parseFloat(e.replace(/[^-0-9.]/g, ""));
                                        });
                                        break;
                                    }
                            }
                        };
                        for (var attr in e.attributes) {
                            _loop_3(attr);
                        }
                        if (!elem.id)
                            elem.id = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].randomstr();
                        elem.getBoundingBox();
                        return elem;
                    }
                };
                if (e.nodeName == _self.shapes.POLYGON) {
                    //let _elem = setAttr(2),
                    //    _pX = parent ? parent._left : 0,
                    //    _pY = parent ? parent._top : 0,
                    //    _cX = parent ? _elem._left : 0,
                    //    _cY = parent ? _elem._top : 0;
                    elem = new fabric.Polygon(e.attributes.points.textContent.split(" ").map(function (el) {
                        var _d = el.split(",");
                        if (_d.length < 2)
                            return null;
                        return new fabric.Point(parseFloat(_d[0]), parseFloat(_d[1]));
                    }).filter(function (e) {
                        if (e)
                            return e;
                    }), _self.settings.POLYGON);
                    setAttr(elem);
                }
                else if (e.nodeName == 'g') {
                    elem = new fabric.Group();
                    if (e.childNodes.length) {
                        setAttr(elem);
                        parseDom(e, elem);
                    }
                }
            };
            for (var i = 0; i < _el.childNodes.length; i++) {
                _loop_2(i);
            }
        })(_svg);
        for (var attr in _svg.attributes) {
            var _fN = _svg.attributes[attr].localName;
            switch (_fN) {
                case 'height':
                case 'width':
                    {
                        options[_fN] = parseFloat(_svg.attributes[attr].textContent);
                        break;
                    }
            }
        }
        callback(allElem, options);
    };
    SVGView.prototype.intersectingCheck = function (activeObject, onSuccess) {
        activeObject.setCoords();
        if (typeof activeObject.refreshLast != 'boolean') {
            activeObject.refreshLast = true;
        }
        ;
        //loop canvas objects
        activeObject.canvas.forEachObject(function (targ) {
            if (targ === activeObject)
                return; //bypass self
            //check intersections with every object in canvas
            if (activeObject.intersectsWithObject(targ)
                || activeObject.isContainedWithinObject(targ)
                || targ.isContainedWithinObject(activeObject)) {
                //objects are intersecting - deny saving last non-intersection position and break loop
                if (typeof activeObject.lastLeft == 'number') {
                    activeObject.left = activeObject.lastLeft;
                    activeObject.top = activeObject.lastTop;
                    activeObject.refreshLast = false;
                    return;
                }
            }
            else {
                activeObject.refreshLast = true;
            }
        });
        if (activeObject.refreshLast) {
            //save last non-intersecting position if possible
            activeObject.lastLeft = activeObject.left;
            activeObject.lastTop = activeObject.top;
        }
        if (onSuccess)
            onSuccess();
    };
    SVGView.prototype.exportJSON = function (e) {
        e.preventDefault();
        var _self = this, fileName = 'export', itr = 0, pathesStore = [], scale = 100, xR = scale / _self.fabricJS.width, yR = scale / _self.fabricJS.height, round = 2;
        (function parse(elmnts) {
            elmnts.forEach(function (e) {
                if (e.type == _self.shapes.POLYGON) {
                    pathesStore.push({ id: "a" + itr++, path: e.points });
                }
                else if (e._objects) {
                    parse(e._objects);
                }
            });
        })(this.fabricJS._objects);
        pathesStore.forEach(function (o, i) {
            o.path = o.path.reduce(function (p, c, n) {
                var s = p;
                if (p instanceof fabric.Point)
                    s = "M " + (c.x * xR).toFixed(round) + "," + (c.y * yR).toFixed(round);
                return s + " L " + (c.x * xR).toFixed(round) + "," + (c.y * yR).toFixed(round);
            }) + " Z";
        });
        var file = new File([JSON.stringify(pathesStore)], fileName, { type: 'text/json' }), a = document.createElement('a');
        a.setAttribute('href', URL.createObjectURL(file));
        a.download = fileName + '.json';
        a.innerHTML = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("parentEl"), 
        __metadata('design:type', Object)
    ], SVGView.prototype, "parentEl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("zoomer"), 
        __metadata('design:type', Object)
    ], SVGView.prototype, "zoomer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("bufferC"), 
        __metadata('design:type', Object)
    ], SVGView.prototype, "bufferC", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("dataEl"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], SVGView.prototype, "dataEl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SVGView.prototype, "selected", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__webgl_view__["a" /* WebglView */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__webgl_view__["a" /* WebglView */]) === 'function' && _b) || Object)
    ], SVGView.prototype, "glapp", void 0);
    SVGView = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-svg-view',
            template: __webpack_require__(871),
            styles: [__webpack_require__(814)]
        }), 
        __metadata('design:paramtypes', [])
    ], SVGView);
    return SVGView;
    var _a, _b;
}());
var SVGGroup = (function () {
    function SVGGroup(canvas, id) {
        if (id === void 0) { id = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].randomstr(); }
        this.group = []; //new fabric.Group({selectable: false});
        this.editPoints = [];
        this.canvas = canvas;
        this.id = id;
        //this.color = this.canvas.getRandomColor()
    }
    SVGGroup.prototype.getScreenPst = function () {
        return { x: 0, y: 0 };
    };
    SVGGroup.prototype.add = function (element) {
        var _this = this;
        if (element && element.type == this.canvas.shapes.POLYGON) {
            if (!this.color)
                this.color = element.fill;
            element.fill = this.color;
            [element].concat(element.get('_points')).forEach(function (elem) {
                if (!elem)
                    return;
                elem._parent.remove(elem);
                if (elem._dataSource)
                    elem._dataSource.active = false;
                elem._data = elem._dataSource = elem._tooltip = null;
                if (elem.type == element.type) {
                    _this.group.push(elem);
                }
                else {
                    _this.editPoints.push(elem);
                }
            });
            this.canvas.fabricJS.renderAll();
        }
    };
    SVGGroup.prototype.childs = function () {
        return this.group;
    };
    SVGGroup.prototype.clone = function (from) {
        var _this = this;
        if (from._parent) {
            from._parent.remove(from);
        }
        else {
            this.canvas.fabricJS.remove(from);
        }
        from._objects.forEach(function (el) {
            _this.add(el);
        });
        return this.make();
    };
    SVGGroup.prototype.make = function () {
        var group = new fabric.Group(this.childs(), this.canvas.settings.GROUP);
        group.set('id', this.id);
        this.group.forEach(function (e) {
            e._parent = group;
        });
        this.canvas.fabricJS._add(group);
        this.editPoints.forEach(function (el) {
            el._parent._add(el);
        });
        this.canvas.fabricJS.renderAll();
        return group;
    };
    return SVGGroup;
}());
//# sourceMappingURL=svg.draw.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_changes_view__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_services__ = __webpack_require__(80);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WTooltip; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WTooltip = (function (_super) {
    __extends(WTooltip, _super);
    function WTooltip(authService, vc) {
        _super.call(this);
        this.authService = authService;
        this.vc = vc;
        this.dataSourceLoaded = false;
        this.dataElem = [];
    }
    WTooltip.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.modelData || !this.modelData.dataSource)
            return alertify.error('Data source is not defined');
        this.authService.get(this.modelData.dataSource, { hasAuthHeader: false }).subscribe(function (res) {
            try {
                _this.dataSource = JSON.parse(res._body);
                _this.dataSourceLoaded = true;
            }
            catch (e) {
                alertify.error(e);
            }
            finally {
                setTimeout(function () {
                    if (_this.htmlTemplate) {
                        _this.initParser();
                    }
                    else {
                        _this.callbacks.push(function () {
                            _this.initParser();
                        });
                    }
                    _super.prototype.ngOnInit.call(_this);
                });
            }
        }, function (res) {
            alertify.error("Incorrect dataSource: " + res && res.message ? res.message : res);
        });
    };
    WTooltip.prototype.onEventPrevent = function (event) {
        event.preventDefault();
        return false;
    };
    WTooltip.prototype.initParser = function (value) {
        var _this = this;
        if (value === void 0) { value = null; }
        var val = value;
        try {
            if (!value)
                val = this.htmlTemplate;
            this.parser = this.authService.safeJS(val);
            var _data = this.parser({ dataSource: this.dataSource });
            _data.forEach(function (el, i) {
                if (_this.isEdit && i == 0) {
                    el.tooltip.active = el.active = true;
                    el._left = 160 + 'px';
                    el._top = 220 + 'px';
                }
                el.onclick = function () { };
            });
            this.dataElem = _data;
        }
        catch (e) {
            alertify.error("Incorrect dataSource: " + e);
        }
    };
    WTooltip.prototype.updateAfterInput = function (value) {
        if (value === void 0) { value = null; }
        if (value) {
            this.initParser(value);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], WTooltip.prototype, "isEdit", void 0);
    WTooltip = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-webgl-tooltip',
            template: __webpack_require__(872),
            styles: [__webpack_require__(815)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === 'function' && _b) || Object])
    ], WTooltip);
    return WTooltip;
    var _a, _b;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_changes_view__["a" /* AbstractChangesView */]));
//# sourceMappingURL=tooltip.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_services__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tooltip_tooltip__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controls_controls__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__preloader_preloader__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__svg_draw_svg_draw__ = __webpack_require__(372);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WebGLService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebglView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return OxiToolTip; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var WebGLService = (function () {
    function WebGLService() {
        this.navchange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    WebGLService.prototype.emit = function (data) {
        this.navchange.emit(data);
    };
    WebGLService.prototype.subscribe = function (component, callback) {
        // set 'this' to component when callback is called
        return this.navchange.subscribe(function (data) {
            callback.call(component, data);
        });
    };
    WebGLService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], WebGLService);
    return WebGLService;
}());
var WebglView = (function () {
    function WebglView(location, authServ) {
        this._id = Date.now();
        this.inited = false;
        this.location = location;
        this.authServ = authServ;
        this._self = this;
    }
    WebglView.prototype.ngOnChanges = function (changes) {
        if (changes.selected.currentValue.created != changes.selected.previousValue.created)
            this.initWebgl();
        if (this.selected)
            this.selected.glApp = this.app;
    };
    WebglView.prototype.ngOnInit = function () {
        this.initWebgl();
        if (this.selected)
            this.selected.glApp = this.app;
    };
    WebglView.prototype.initWebgl = function () {
        if (!this.inited)
            return this.inited = true;
        if (this.selected.images.length) {
            this.preview = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_LOC + this.selected.projFilesDirname + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.DELIMETER + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PROJECT_PREVIEW + this.selected.images[this.selected.currentItem || 0];
        }
        else if (this.selected.preview) {
            this.preview = this.selected.preview;
        }
        this.app = new OxiAPP(this);
    };
    WebglView.prototype.ngOnDestroy = function () {
        //console.log('webgl context ' + this._id + " was clear");
        this.app._animation.stop();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("renderParent"), 
        __metadata('design:type', Object)
    ], WebglView.prototype, "renderParent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("preloader"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__preloader_preloader__["a" /* Preloader */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__preloader_preloader__["a" /* Preloader */]) === 'function' && _b) || Object)
    ], WebglView.prototype, "preloader", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("preToolTip"), 
        __metadata('design:type', (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__tooltip_tooltip__["a" /* WTooltip */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__tooltip_tooltip__["a" /* WTooltip */]) === 'function' && _e) || Object)
    ], WebglView.prototype, "preToolTip", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("preControls"), 
        __metadata('design:type', (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__controls_controls__["a" /* WControls */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__controls_controls__["a" /* WControls */]) === 'function' && _f) || Object)
    ], WebglView.prototype, "preControls", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("projCnt"), 
        __metadata('design:type', Object)
    ], WebglView.prototype, "projCnt", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("svgEl"), 
        __metadata('design:type', (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__svg_draw_svg_draw__["a" /* SVGView */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_8__svg_draw_svg_draw__["a" /* SVGView */]) === 'function' && _g) || Object)
    ], WebglView.prototype, "svgEl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], WebglView.prototype, "selected", void 0);
    WebglView = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-webgl-view',
            template: __webpack_require__(873),
            styles: [__webpack_require__(816)]
        }), 
        __metadata('design:paramtypes', [(typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"]) === 'function' && _j) || Object, (typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* AuthService */]) === 'function' && _k) || Object])
    ], WebglView);
    return WebglView;
    var _b, _e, _f, _g, _j, _k;
}());
var OxiAPP = (function () {
    function OxiAPP(main) {
        var _this = this;
        this.isMobile = false;
        this.imgType = '';
        this.screen = {};
        this._files = {};
        this.allLoad = false;
        this.curLoadedTemplates = 0;
        this.infoHTML = [];
        this.TEMPLATES = {
            TOOLTIP: 'app-project-webgl-tooltip',
            CONTROLS: 'app-project-webgl-controls',
            PRELOADER: 'app-project-preloader'
        };
        this.main = main;
        this.isMobile = this.deviceCheck();
        this.scene = new THREE.Scene();
        this.model = new THREE.Object3D();
        this.scene.add(this.model);
        var renderer = this.gl = new THREE.WebGLRenderer({
            antialias: true, alpha: true,
            clearAlpha: true,
            sortObjects: false
        }), SCREEN_WIDTH = this.screen.width = 720, SCREEN_HEIGHT = this.screen.height = 405, _self = this;
        renderer.domElement.className = 'gl-view';
        if (main.selected.canEdit)
            main.projCnt.nativeElement.style.height = main.projCnt.nativeElement.clientWidth * (SCREEN_HEIGHT / SCREEN_WIDTH) + 'px';
        this._preloaderStatus = document.querySelector('.preloader-data.preloader-status') || { style: {} };
        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.camera = new THREE.PerspectiveCamera(30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 200000);
        this.controls = main.selected.canEdit ? new THREE.OrbitControls(this.camera, renderer.domElement) : {
            update: function () {
            }, target: this.scene.position.clone()
        };
        this.controls.enabled = !!this.main.selected.canEdit;
        if (this.controls.enabled)
            this.controls.addEventListener('change', function () {
                main.selected.hasRecalcChanges = main.selected.hasChanges = true;
                if (main.selected.camera.frameState[main.selected.currentItem])
                    main.selected.camera.frameState[main.selected.currentItem].hasChanges = true;
                _this.camera.updateProjectionMatrix();
                _this.dataSave();
                _this._animation.play();
            });
        /*-----------set config data----------*/
        this.camera.positionDef = new THREE.Vector3(34800, 18600, -600);
        if (main.selected.camera) {
            if (main.selected.camera.rotation) {
                this.camera.rotation.x = main.selected.camera.rotation._x;
                this.camera.rotation.y = main.selected.camera.rotation._y;
                this.camera.rotation.z = main.selected.camera.rotation._z;
            }
            if (main.selected.camera.position) {
                this.camera.positionDef.copy(main.selected.camera.position);
            }
            if (main.selected.camera.fov) {
                this.camera.fov = main.selected.camera.fov;
            }
            if (main.selected.camera.scale) {
                this.model.scale.multiplyScalar(main.selected.camera.scale);
            }
            if (main.selected.camera.zoom) {
                this.camera.zoom = main.selected.camera.zoom;
            }
            if (main.selected.camera.target) {
                this.controls.target.copy(main.selected.camera.target);
            }
        }
        this.camera.position.copy(this.camera.positionDef);
        this.camera.updateProjectionMatrix();
        var curDist = this.camera.positionDef.distanceTo(this.controls.target), curAngle = Math.acos((this.camera.positionDef.x - this.controls.target.x) / curDist);
        this.camera.updateView = function (angle) {
            var _cm = main.selected.camera, _p = _cm.frameState[main.selected.currentItem];
            if (_p) {
                _this.camera.position.set(_p.x, _p.y, _p.z);
                if (_p.target)
                    _this.controls.target.set(_p.target.x, _p.target.y, _p.target.z);
            }
            else {
                var quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (angle * 10) * Math.PI / 180);
                _this.camera.position.copy(_this.camera.positionDef.clone().applyQuaternion(quaternion));
                if (_cm.target)
                    _this.controls.target.set(_cm.target.x, _cm.target.y, _cm.target.z);
            }
            _this.camera.lookAt(_this.controls.target);
            _this.camera.updateProjectionMatrix();
            _this._animation.play();
        };
        if (this.main.selected.canEdit)
            this.scene.add(new THREE.AxisHelper(500));
        //let light = new THREE.DirectionalLight(0xffffff);
        //light.position.set(1, 1, 1);
        //this.scene.add(light);
        THREE.Mesh.prototype.getScreenPst = function () {
            var mesh = this, m = _self.gl.domElement, offset = _self._offset(), width = m.clientWidth, height = m.clientHeight, widthHalf = width / 2, heightHalf = height / 2, position = new THREE.Vector3();
            mesh.updateMatrixWorld();
            mesh.updateMatrix();
            mesh.geometry.computeBoundingBox();
            mesh.geometry.computeBoundingSphere();
            var boundingBox = mesh.geometry.boundingBox;
            position.subVectors(boundingBox.max, boundingBox.min);
            position.multiplyScalar(0.5);
            position.add(boundingBox.min);
            position.project(_self.camera);
            position.x = (position.x * widthHalf) + widthHalf + offset.left;
            position.y = -(position.y * heightHalf) + heightHalf + offset.top;
            mesh.onscreenParams = position;
            mesh.onscreenOffset = offset;
        };
        this.templates = [main.preToolTip, main.preControls, main.preloader];
        this.templates.forEach(function (el) {
            el.callbacks.push(function () {
                _this.onFinishLoadTemplates();
            });
        });
    }
    OxiAPP.prototype.onFinishLoadTemplates = function () {
        var _this = this;
        var main = this.main;
        if (++this.curLoadedTemplates == this.templates.length) {
            setTimeout(function () {
                _this.loadModel(function () {
                    _this.checkLoadedImg(function () {
                        var parentCanvas = _this._container = main.projCnt['nativeElement'], onFinish = function () {
                            var onEnd = function () {
                                _this._animation.play();
                                _this.allLoad = true;
                                var _preloader = document.querySelector(_this.TEMPLATES.PRELOADER);
                                if (_preloader)
                                    _preloader.parentNode.removeChild(_preloader);
                            };
                            if (_this._slider.isLoaded) {
                                onEnd();
                            }
                            else {
                                _this._slider.onFinish = function () {
                                    onEnd();
                                };
                            }
                        };
                        if (main.preloader.prevImg) {
                            main.preloader.prevImg['nativeElement'].className += ' active';
                        }
                        else {
                            main.preloader.preloader['nativeElement'].className += ' active';
                        }
                        parentCanvas.appendChild(_this.gl.domElement);
                        _this._projControls = new OxiControls(_this);
                        _this._slider = new OxiSlider(_this);
                        _this._events = new OxiEvents(_this);
                        _this._animation = new OxiAnimation(_this);
                        var _inter = setTimeout(function () {
                            Pace.stop();
                            onFinish();
                        }, 2000);
                        Pace.once('done', function (e) {
                            clearTimeout(_inter);
                            onFinish();
                        });
                    });
                });
            }, 100);
        }
    };
    OxiAPP.prototype.loadTemplates = function () {
    };
    OxiAPP.prototype.checkLoadedImg = function (callback) {
        var _this = this;
        var _self = this, allows = ['1', '2'], checkLow = function () {
            if (_this.isMobile) {
                _this.imgType = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PREVIEW.LOW;
            }
            callback();
        };
        if (this.main.selected.images.length) {
            var isAllowed = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PREVIEW.WEBP);
            if (isAllowed) {
                if (isAllowed == allows[0]) {
                    _self.imgType = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PREVIEW.WEBP;
                    callback();
                }
                else {
                    checkLow();
                }
            }
            else {
                var img_1 = new Image();
                img_1.onload = function () {
                    var isAllow = !!(img_1.height > 0 && img_1.width > 0);
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PREVIEW.WEBP, isAllow ? allows[0] : allows[1]);
                    if (isAllow) {
                        _self.imgType = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PREVIEW.WEBP;
                        callback();
                    }
                    else {
                        checkLow();
                    }
                };
                img_1.onerror = function () {
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PREVIEW.WEBP, allows[1]);
                    checkLow();
                };
                img_1.src = './assets/img/img_large_0_4.webp';
            }
        }
        else {
            checkLow();
        }
    };
    OxiAPP.prototype.toggleSVG = function () {
        if (this.main.svgEl) {
            this.main.svgEl.fabricJS._objects.forEach(function (el) {
                if (el._dataSource) {
                    el._dataSource.active = false;
                }
            });
        }
        else {
            this.model.traverse(function (el) {
                if (el._dataSource) {
                    el._dataSource.active = false;
                }
            });
        }
    };
    OxiAPP.prototype.updateData = function (data) {
        var _selected = this.main.selected, settings = _selected.camera;
        _selected.hasChanges = _selected.hasRecalcChanges = true;
        if (_selected.camera.frameState[_selected.currentItem])
            _selected.camera.frameState[_selected.currentItem].hasChanges = true;
        switch (data) {
            case 'scale':
                {
                    this.model.scale.z = this.model.scale.y = this.model.scale.x;
                    break;
                }
            case 'isSVG':
                {
                    this.toggleSVG();
                    break;
                }
            case 'opacity':
                {
                    if (this.model) {
                        this.model.traverse(function (child) {
                            if (child.type == 'Mesh') {
                                child.material.opacity = settings.opacity;
                            }
                        });
                    }
                    if (this.main.svgEl) {
                        this.main.svgEl.fabricJS._objects.forEach(function (el) {
                            el.opacity = settings.opacity;
                        });
                        this.main.svgEl.fabricJS.renderAll();
                    }
                    break;
                }
            case 'update':
                {
                    break;
                }
            case 'kompass':
                this._projControls.kompas.onUpdate();
                {
                    break;
                }
            case 'cameraPst':
                {
                    break;
                }
            case 'y':
            case 'x':
                {
                    var val_1 = settings.resolution[data], prop_1 = this._slider._W() / this._slider._H(), isHeight_1 = data == 'y', _px_1 = 'px', elem = [this._slider.container.childNodes];
                    if (!elem[0] || !elem[0].length)
                        break;
                    if (this._slider.alignImgContainer instanceof Node) {
                        var el = this._slider.alignImgContainer.childNodes;
                        if (el && el.length)
                            elem.push(el);
                    }
                    elem.forEach(function (lstChilds) {
                        [].forEach.call(lstChilds, function (el) {
                            el.style.height = (isHeight_1 ? val_1 : val_1 / prop_1) + _px_1;
                            el.style.width = (isHeight_1 ? val_1 * prop_1 : val_1) + _px_1;
                        });
                    });
                    this._events.onWindowResize();
                    break;
                }
            case 'size':
            case 'lens':
                {
                    //settings.size =this._slider._W() * 1.1 > window.innerWidth ? (window.innerWidth / this._slider._W()) * 0.9 : 1;
                    var sizeX = this.gl.domElement.clientWidth, sizeY = this.gl.domElement.clientHeight;
                    settings.aspect = sizeX / sizeY;
                    this.camera.setLens(settings.lens * settings.aspect, settings.size);
                    this.camera.updateProjectionMatrix();
                    break;
                }
            default:
                {
                    this.camera.updateProjectionMatrix();
                }
        }
        this.dataSave();
        this._animation.play();
    };
    OxiAPP.prototype.deviceCheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window['opera']);
        return check;
    };
    OxiAPP.prototype.recalc = function () {
        var _selected = this.main.selected, _c = this.camera.position.clone(), _t = this.controls.target.clone();
        _selected.camera.frameState = [];
        _selected.camera.frameState[_selected.currentItem] = {
            x: _c.x,
            y: _c.y,
            z: _c.z,
            target: { x: _t.x, y: _t.y, z: _t.z }
        };
        for (var i = 0; i < _selected.images.length; i++) {
            if (_selected.currentItem == i)
                continue;
            var quaternion = new THREE.Quaternion(), _cmC = _c.clone();
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), ((i - _selected.currentItem) * 10) * Math.PI / 180);
            _cmC.applyQuaternion(quaternion);
            _selected.camera.frameState[i] = {
                x: _cmC.x,
                y: _cmC.y,
                z: _cmC.z,
                target: { x: _t.x, y: _t.y, z: _t.z }
            };
        }
        _selected.hasRecalcChanges = false;
    };
    OxiAPP.prototype.dataSave = function () {
        var old = this.main.selected.camera;
        if (!(old instanceof __WEBPACK_IMPORTED_MODULE_1__entities_entities__["e" /* OxiCamera */])) {
            this.main.selected.camera = new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["e" /* OxiCamera */]({
                position: this.camera.position,
                rotation: this.camera.rotation,
                target: this.controls.target,
                frameState: old.frameState,
                //resolution: new ENTITY.Vector3({x: this._slider._W(), y: this._slider._H()}),
                fov: this.camera.fov,
                zoom: this.camera.zoom,
                scale: this.model.scale.x,
                lens: old.lens,
                opacity: old.opacity,
                size: old.size,
            });
        }
        else {
            old.position = this.camera.position.clone();
            old.rotation = this.camera.rotation.clone();
            old.target = this.controls.target.clone();
            old.fov = this.camera.fov;
            old.zoom = this.camera.zoom;
            old.scale = this.model.scale.x;
        }
    };
    OxiAPP.prototype.loadModel = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () {
            console.log("load was finished succesed");
        }; }
        var _self = this;
        if (this.main.selected.cash.model) {
            this._onLoadModel(this.main.selected.cash.model);
            callback();
        }
        else if (this.main.selected.projFilesDirname && this.main.selected.destination && this.main.selected.destination.match('.obj')) {
            var loader = this.loader = this.loader || new THREE.OBJLoader();
            loader.load(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_LOC + this.main.selected.projFilesDirname + "/" + this.main.selected.destination, function (object) {
                _this._onLoadModel(object);
                callback();
            }, function (e) { return _this.onProgress(e); }, function (e) { return _this.onError(e); });
        }
        else {
            callback();
        }
    };
    OxiAPP.prototype.onError = function (xhr) {
        alertify.error(xhr);
    };
    OxiAPP.prototype.onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            this.main.preloader.onUpdatePreloaderStatus(xhr.loaded / xhr.total);
        }
    };
    OxiAPP.prototype._onLoadModel = function (object) {
        var _this = this;
        if (this.model.children)
            for (var i = 0; i < this.model.children.length; i++)
                this.model.remove(this.model.children[i]);
        if (this.main.selected.camera.isSVG) {
        }
        else {
            this.model.add(object);
            object.traverse(function (child) {
                if (child.type == 'Mesh') {
                    child.material = new THREE.MeshBasicMaterial({
                        transparent: true,
                        opacity: _this.main.selected.camera.opacity
                    });
                    child.material.opacity0 = child.material.opacity;
                    child.material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
                    child.renderOrder = 0;
                    //child.name = child.name.toLowerCase();
                    if (child.name.match(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].IGNORE)) {
                        child.material.color = new THREE.Color(0, 0, 0);
                    }
                    for (var i = 0, areas = _this.main.selected.areas; areas && i < areas.length; i++) {
                        if (areas[i]._id.match(child.name)) {
                            child._data = areas[i];
                            break;
                        }
                    }
                    for (var i = 0, sources = _this.main.preToolTip.dataElem; sources && i < sources.length; i++) {
                        if (sources[i]._id == child.name || (child._data && sources[i]._id == child._data.dataSourceId)) {
                            child._dataSource = sources[i];
                            break;
                        }
                    }
                }
            });
        }
        this.main.selected.cash.model = object;
    };
    OxiAPP.prototype.updateInfoHTML = function () {
        for (var i = 0; i < this.infoHTML.length; i++) {
            this.infoHTML[i].update();
        }
    };
    //TODO
    OxiAPP.prototype._deleteArea = function (item) {
        delete item._data;
        for (var i = 0, areas = this.main.selected.areas; areas && i < areas.length; i++) {
            if (areas[i].created == item.created) {
                delete item._data;
                break;
            }
        }
    };
    OxiAPP.prototype._parent = function () {
        return this.main.renderParent['nativeElement'];
    };
    OxiAPP.prototype.onFilesSelected = function (files) {
        var _self = this, filereader = this._fileReader = this._fileReader || new FileReader(), _flStrg, onFinish;
        if (!files || !files.length)
            return console.error("files had not been selected");
        switch (files[0].category) {
            case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_OBJ:
                {
                    _flStrg = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.STORAGE.MODEL_OBJ;
                    onFinish = function () { return _self._animation.play(); };
                    break;
                }
            case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.PREVIEW_IMG:
                {
                    _flStrg = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.STORAGE.PREVIEW_IMG;
                    this.main.selected.images = [];
                    onFinish = function () { return _self._slider.addFrames(); };
                    break;
                }
            case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.ALIGN_IMG:
                {
                    _flStrg = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.STORAGE.ALIGN_IMG;
                    this.main.selected.alignImages = [];
                    onFinish = function () { return _self._slider.addAlignImg(); };
                    break;
                }
            case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_SVG:
                {
                    _flStrg = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.STORAGE.SVG_FILE;
                    onFinish = function () {
                    };
                    break;
                }
        }
        if (!_flStrg || !onFinish)
            return alertify.error("file category is not recognized");
        this._files[_flStrg] = files;
        var startFrom = 0;
        function parseFiles(cur) {
            if (!cur)
                return onFinish();
            switch (cur.category) {
                case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_SVG:
                case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_OBJ:
                    {
                        filereader.readAsText(cur);
                        break;
                    }
                case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.PREVIEW_IMG:
                case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.ALIGN_IMG:
                    {
                        filereader.readAsDataURL(cur);
                        break;
                    }
                default:
                    {
                        parseFiles(files[startFrom++]);
                    }
            }
            filereader.onloadend = function (e) {
                switch (cur.category) {
                    case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_OBJ:
                        {
                            var loader = _self.loader = _self.loader || new THREE.OBJLoader();
                            loader.parse(e.currentTarget.result, function (m) {
                                _self.main.selected.destination = [new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["f" /* ProjFile */]({ file: cur, name: cur.name })];
                                _self._onLoadModel(m);
                            });
                            break;
                        }
                    case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_SVG:
                        {
                            _self.main.svgEl.reload(e.currentTarget.result);
                            break;
                        }
                    case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.PREVIEW_IMG:
                        {
                            _self.main.selected.images.push(new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["f" /* ProjFile */]({
                                file: cur,
                                name: cur.name,
                                data: e.currentTarget.result
                            }));
                            break;
                        }
                    case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.ALIGN_IMG:
                        {
                            _self.main.selected.alignImages.push(new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["f" /* ProjFile */]({
                                file: cur,
                                name: cur.name,
                                data: e.currentTarget.result
                            }));
                            break;
                        }
                }
                parseFiles(files[startFrom++]);
            };
        }
        ;
        parseFiles(files[startFrom++]);
    };
    OxiAPP.prototype._offset = function () {
        return this.gl.domElement.getBoundingClientRect();
    };
    OxiAPP.prototype.onEventPrevent = function (event) {
        event.preventDefault();
        return false;
    };
    OxiAPP.prototype.render = function () {
        if (Pace.running)
            return;
        this.updateInfoHTML();
        this.gl.render(this.scene, this.camera);
    };
    return OxiAPP;
}());
var OxiEvents = (function () {
    function OxiEvents(app) {
        var _this = this;
        this.canEdit = false;
        this.pathOnMove = 50;
        var _self = this, elem = app.gl.domElement, handler = (elem.addEventListener || elem.attachEvent).bind(elem);
        this.canEdit = app.main.selected.canEdit;
        this.main = app;
        this.EVENTS_NAME = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME;
        this.mouse = new OxiMouse(app);
        this.raycaster = new THREE.Raycaster();
        handler(this.EVENTS_NAME.MOUSE_DOWN, function (e) { return _this.onMouseDown(e); });
        handler(this.EVENTS_NAME.MOUSE_UP, function (e) { return _this.onMouseUp(e); });
        handler(this.EVENTS_NAME.MOUSE_MOVE, function (e) { return _this.onMouseMove(e); });
        handler(this.EVENTS_NAME.DB_CLICK, function (e) { return _this.onDbClick(e); });
        handler(this.EVENTS_NAME.SELECT_START, app.onEventPrevent);
        if (!this.canEdit)
            handler(this.EVENTS_NAME.MOUSE_OUT, function (e) { return _this.onMouseOut(e); });
        window.addEventListener('resize', function () { return _this.onWindowResize(); });
        this.onWindowResize();
    }
    OxiEvents.prototype.onWindowResize = function () {
        var app = this.main, _w = app._slider._W(), _nat = app._slider.currentFrame.naturalWidth / app._slider.currentFrame.naturalHeight, _h = _nat ? _w / _nat : app._slider._H(), _px = 'px', svgEl = this.main.main.svgEl;
        app.camera.aspect = _w / _h;
        app.camera.updateProjectionMatrix();
        app.gl.setSize(_w, _h);
        app._container.style.height = _h + _px;
        //app.updateInfoHTML();
        if (svgEl)
            svgEl.resize(_w, _h);
        if (app._animation)
            app._animation.play();
    };
    OxiEvents.prototype.onMouseUp = function (ev) {
        var _this = this;
        var _self = this, btn = ev.button;
        this.mouse.down = this.lastEv = false;
        this.main._projControls.show(ev, false);
        switch (btn) {
            case 0:
            case 1:
                {
                    if (this.canEdit) {
                        if (this.lastInter)
                            this.main._projControls.showAttachPopUp(this.lastInter.object);
                    }
                    if (this.lastInter && this.lastInter.object.click)
                        this.lastInter.object.click();
                    break;
                }
            case 2:
                {
                    if (this.canEdit) {
                        this.onSelected(ev, function (inter) {
                            _this.main._projControls.show(ev);
                        });
                    }
                    break;
                }
        }
        ev.preventDefault();
    };
    OxiEvents.prototype.onMouseMove = function (ev) {
        var _this = this;
        if (this.lastInter) {
            this.main._projControls.show(ev, false);
            this.lastInter = null;
        }
        if (this.canEdit) {
            this.onSelected(ev, function (inter) {
                _this.main._projControls.show({ x: -1500 }, true, false);
            });
        }
        else {
            if (this.mouse.down) {
                if (!this.lastEv)
                    return this.lastEv = ev;
                if (Math.abs(ev.clientX - this.lastEv.clientX) > this.pathOnMove) {
                    this.main._slider.move((ev.clientX > this.lastEv.clientX ? -1 : 1));
                    this.lastEv = ev;
                }
                else if (Math.abs(ev.clientY - this.lastEv.clientY) > this.pathOnMove) {
                    this.main._slider.move((ev.clientY > this.lastEv.clientY ? -1 : 1));
                    this.lastEv = ev;
                }
            }
            else {
                this.onSelected(ev, function (inter) {
                    _this.main._projControls.show(ev);
                });
            }
        }
    };
    OxiEvents.prototype.onSelected = function (ev, callback) {
        var intersectList = this.inter(ev);
        if (intersectList && intersectList[0]) {
            if (intersectList[0].object.name.match(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].IGNORE))
                return;
            this.lastInter = intersectList[0];
            callback(intersectList[0]);
        }
    };
    OxiEvents.prototype.onMouseDown = function (ev) {
        this.mouse.down = ev;
        this.lastEv = false;
    };
    OxiEvents.prototype.onMouseOut = function (ev) {
        if (this.mouse.down)
            this.onMouseUp(ev);
    };
    OxiEvents.prototype.onDbClick = function (e) {
        if (this.canEdit) {
            this.main.controls.target.copy(this.main.scene.position);
            this.main.controls.update();
        }
        this.main.onEventPrevent(e);
    };
    OxiEvents.prototype.onCntxMenu = function (event) {
        event.preventDefault();
        return false;
    };
    OxiEvents.prototype.inter = function (ev, arg) {
        if (arg === void 0) { arg = null; }
        var _self = this, elements = arg && arg.childs ? arg.childs : [_self.main.model];
        if (this.mouse.down || !elements)
            return false;
        if (arg && arg.position) {
            var direction = new THREE.Vector3().subVectors(arg.target, arg.position);
            _self.raycaster.set(arg.position, direction.clone().normalize());
        }
        else {
            var mouseVector = _self.mouse.interPoint(ev);
            _self.raycaster.setFromCamera(mouseVector, _self.main.camera);
        }
        return _self.raycaster.intersectObjects(elements, true);
    };
    return OxiEvents;
}());
var OxiMouse = (function () {
    function OxiMouse(main) {
        this.isDown = false;
        this.main = main;
    }
    OxiMouse.prototype.interPoint = function (ev) {
        var _slider = this.main.gl.domElement, rect = _slider.getBoundingClientRect(), canvasW = _slider.clientWidth, canvasH = _slider.clientHeight, _x = (ev ? ev.clientX : canvasW / 2) - rect.left, _y = (ev ? ev.clientY : canvasH / 2) - rect.top;
        if (ev && ev.touches) {
            var firstFing = ev.touches.length ? ev.touches[0] : ev.changedTouches[0];
            _x = firstFing.clientX;
            _y = firstFing.clientY;
        }
        return new THREE.Vector2(((_x) / canvasW) * 2 - 1, -((_y) / canvasH) * 2 + 1);
    };
    OxiMouse.prototype.cumulativeOffset = function (element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return {
            offsetLeft: top,
            offsetTop: left
        };
    };
    return OxiMouse;
}());
var OxiAnimation = (function () {
    function OxiAnimation(main) {
        var _this = this;
        this.canAnimate = false;
        this.isStop = false;
        this.lastUpdate = Date.now();
        this.maxTimeUpdate = 1500;
        this.id = Date.now();
        this.animations = [];
        this.lastIter = 0;
        this.app = main;
        this.play();
        setTimeout(function () {
            _this.animate();
        }, 100);
    }
    OxiAnimation.prototype.add = function (callback) {
        this.animations.push(callback);
    };
    OxiAnimation.prototype.animate = function () {
        var _this = this;
        if (!this.app.gl.domElement.width || this.isStop)
            return;
        for (var i = 0; i < this.animations.length; i++) {
            this.animations[i]();
        }
        if (this.canAnimate) {
            this.canAnimate = this.lastUpdate > Date.now();
            if (!this.canAnimate || this.lastIter > 2)
                this.lastIter = 0;
            this.app.render();
        }
        if (this.app._container.clientWidth != this.app._container.lastClientWidth) {
            this.app._container.lastClientWidth = this.app._container.clientWidth;
            this.app._events.onWindowResize();
            this.app._projControls.show({}, false);
        }
        requestAnimationFrame(function () {
            _this.animate();
        });
    };
    OxiAnimation.prototype.play = function (flag) {
        if (flag === void 0) { flag = true; }
        this.lastUpdate = Date.now() + (this.maxTimeUpdate);
        if (this.canAnimate)
            return;
        this.canAnimate = flag || !Pace.running;
        //this.animate();
    };
    OxiAnimation.prototype.stop = function () {
        this.isStop = true;
        this.canAnimate = false;
        this.lastIter = 0;
    };
    return OxiAnimation;
}());
var OxiSlider = (function () {
    function OxiSlider(app) {
        this.currentFrame = {};
        this.currentAlignFrame = {};
        this.currentPagination = {};
        this.canEdit = false;
        this.isDebug = false;
        this.isLoaded = true;
        this.canEdit = app.main.selected.canEdit;
        this.app = app;
        this.addFrames();
        if (this.canEdit)
            this.addAlignImg();
    }
    OxiSlider.prototype.addFrames = function () {
        var _this = this;
        var _self = this, app = this.app;
        [this.container, this.imgPagination].forEach(function (domEl) {
            _this.removeNode(domEl);
        });
        var div = this.container = document.createElement('div'), imgPagination = this.imgPagination = document.createElement('ul'), _selected = app.main.selected, _resol = _selected.camera.resolution, _px = 'px', canEdit = this.canEdit;
        if (!app.main.selected.images || !app.main.selected.images.length)
            return;
        imgPagination.className = 'img-pagination';
        var _loop_1 = function(i) {
            var img = document.createElement('img'), curImg = app.main.selected.images[i];
            if (typeof curImg == 'string') {
                img.src = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_LOC + _selected.projFilesDirname + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.DELIMETER + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PROJECT_PREVIEW + app.imgType;
                if (app.imgType == __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PREVIEW.WEBP) {
                    var imgD = curImg.split(".");
                    imgD.pop();
                    img.src += imgD.join(".") + '.webp';
                }
                else {
                    img.src += curImg;
                }
            }
            else {
                img.src = curImg.data;
            }
            if (parseInt(i) == _selected.currentItem) {
                img.className = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].ACTIVE;
                this_1.currentFrame = img;
                _self.isLoaded = false;
                img.onload = function () {
                    if (!_resol.x) {
                        _resol.x = _self._W();
                        _resol.y = _self._H();
                    }
                    _self.app._events.onWindowResize();
                    //_self.onResize();
                    _self.isLoaded = true;
                    if (_self.onFinish)
                        _self.onFinish();
                };
            }
            //if (_resol && _resol.x) {
            //    img.style.width = _resol.x + _px;
            //    img.style.height = _resol.y + _px;
            //}
            div.appendChild(img);
            if (canEdit) {
                var item = document.createElement('li');
                item.innerHTML = (+i + 1) + '';
                if (+i == _selected.currentItem) {
                    item.className = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].ACTIVE;
                    this_1.currentPagination = item;
                }
                item.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CLICK, function () {
                    var saveD = function () {
                        var _c = app.camera.position, _t = app.controls.target;
                        _selected.camera.frameState[_selected.currentItem] = {
                            x: _c.x,
                            y: _c.y,
                            z: _c.z,
                            target: { x: _t.x, y: _t.y, z: _t.z }
                        };
                    }, anyway = function () {
                        _this.updateView(i);
                        _this.app.dataSave();
                    };
                    if (!_selected.camera.frameState[_selected.currentItem]) {
                        saveD();
                        anyway();
                    }
                    else if (_selected.camera.frameState[_selected.currentItem].hasChanges) {
                        delete _selected.camera.frameState[_selected.currentItem].hasChanges;
                        new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["a" /* Confirm */]({
                            title: "The data view for current (" + (+_selected.currentItem + 1) + ") has been changed, accept to save, if cancel will lose",
                            onOk: function () {
                                saveD();
                            },
                            onCancel: function () {
                                delete _selected.camera.frameState[_selected.currentItem];
                            },
                            onAnyWay: function () {
                                anyway();
                            }
                        });
                    }
                    else {
                        anyway();
                    }
                });
                imgPagination.appendChild(item);
            }
        };
        var this_1 = this;
        for (var i in app.main.selected.images) {
            _loop_1(i);
        }
        div.style.display = this.isDebug ? 'none' : '';
        div.className = [__WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].CENTER_CONTAINER, __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].IMG_SLIDER].join(" ");
        app._container.appendChild(div);
        if (canEdit) {
            app._container.appendChild(imgPagination);
            imgPagination.style.bottom = -imgPagination.clientHeight + 'px';
        }
    };
    OxiSlider.prototype.onResize = function () {
        var val = this.app.main.selected.camera.resolution, _px = 'px', elem = [this.container.childNodes];
        if (!elem[0] || !elem[0].length)
            return;
        if (this.alignImgContainer instanceof Node) {
            var el = this.alignImgContainer.childNodes;
            if (el && el.length)
                elem.push(el);
        }
        elem.forEach(function (lstChilds) {
            [].forEach.call(lstChilds, function (el) {
                el.style.height = val.y + _px;
                el.style.width = val.x + _px;
            });
        });
    };
    OxiSlider.prototype.addAlignImg = function () {
        this.removeNode(this.alignImgContainer);
        if (!this.canEdit)
            return;
        var div = this.alignImgContainer = document.createElement('div'), _selected = this.app.main.selected, _resol = _selected.camera.resolution, _px = 'px';
        for (var i = 0, arr = _selected.alignImages, _length = arr.length; i < _length; i++) {
            var img = document.createElement('img'), curImg = arr[i];
            img.src = typeof curImg == 'string' ? __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_LOC + _selected.projFilesDirname + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.DELIMETER + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR.PROJECT_ALIGN_IMG + curImg : curImg.data;
            if (i == _selected.currentItem) {
                img.className = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].ACTIVE;
                this.currentAlignFrame = img;
            }
            //if (_resol && _resol.x) {
            //    img.style.width = _resol.x + _px;
            //    img.style.height = _resol.y + _px;
            //}
            div.appendChild(img);
        }
        div.style.display = this.isDebug ? '' : 'none';
        div.className = [__WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].CENTER_CONTAINER, __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].IMG_SLIDER].join(" ");
        this.app._container.appendChild(div);
    };
    OxiSlider.prototype.toggleDebug = function () {
        this.isDebug = !this.isDebug;
        this.alignImgContainer.style.display = this.isDebug ? '' : 'none';
        this.container.style.display = !this.isDebug ? '' : 'none';
    };
    OxiSlider.prototype.removeNode = function (domEl) {
        if (!domEl)
            return;
        while (domEl.firstChild)
            domEl.removeChild(domEl.firstChild);
        if (domEl.parentNode)
            domEl.parentNode.removeChild(domEl);
    };
    OxiSlider.prototype.updateView = function (selectedItem) {
        this.currentFrame['className'] = this.currentAlignFrame['className'] = this.currentPagination['className'] = '';
        this.app.main.selected.currentItem = selectedItem;
        this.app.camera.updateView(selectedItem - this.app.main.selected.currentItem0);
        this.currentFrame = this.container.childNodes[selectedItem];
        this.currentPagination = this.imgPagination && this.imgPagination.childNodes[selectedItem] ? this.imgPagination.childNodes[selectedItem] : {};
        this.currentAlignFrame = this.alignImgContainer && this.alignImgContainer.childNodes[selectedItem] ? this.alignImgContainer.childNodes[selectedItem] : {};
        this.currentFrame['className'] = this.currentAlignFrame['className'] = this.currentPagination['className'] = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].ACTIVE;
        //this.app._events.onMouseOut({});
        this.app._projControls.show({}, false);
    };
    OxiSlider.prototype.move = function (next) {
        if (next < 0) {
            if (this.app.main.selected.currentItem < 1) {
                return this.updateView(this.app.main.selected.images.length - 1);
            }
        }
        else {
            if (this.app.main.selected.currentItem >= this.app.main.selected.images.length - 1) {
                return this.updateView(0);
            }
        }
        this.updateView(this.app.main.selected.currentItem + next);
    };
    OxiSlider.prototype._W = function () {
        return this.currentFrame.clientWidth || this.currentFrame.width || this.container.clientWidth || this.app.main.selected.camera.resolution.x || this.app.screen.width;
    };
    OxiSlider.prototype._H = function () {
        return this.currentFrame.clientHeight || this.currentFrame.height || this.container.clientHeight || this.app.main.selected.camera.resolution.y || this.app.screen.height;
    };
    OxiSlider.prototype._offsetLeft = function () {
        return this.container.offsetLeft || this.app._container.offsetLeft;
    };
    OxiSlider.prototype._offsetTop = function () {
        return this.container.offsetTop || this.app._container.offsetTop;
    };
    return OxiSlider;
}());
var OxiControls = (function () {
    function OxiControls(app) {
        var _this = this;
        var _self = this, div = this.controls = document.createElement('div'), _div = document.querySelector(app.TEMPLATES.CONTROLS + ' .' + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_CONTROLS_MOVE), _backArea = document.querySelector(app.TEMPLATES.CONTROLS + ' .' + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_BACK_AREA), kompass = document.querySelector(app.TEMPLATES.CONTROLS + ' .' + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_COMPASS);
        this.app = app;
        if (_div)
            _div.style.display = 'none';
        if (_backArea)
            _backArea.style.display = 'none';
        if (app.main.selected.canEdit) {
            div.className = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_CONTROLS;
            app._parent().appendChild(div);
            var getSelected_1 = function () {
                return app.main.selected.camera.isSVG ? app.main.svgEl.lastSelectedShape : _this.app._events.lastInter.object;
            }, childSelected_1 = function (child) {
                var _elem = getSelected_1();
                _elem._data = child;
                child._id = _elem.name || _elem.id || "";
                child.name = child._id.toUpperCase();
                child._id += Date.now();
                if (!_this.app.main.selected.areas) {
                    _this.app.main.selected.areas = [child];
                }
                else {
                    _this.app.main.selected.areas.push(child);
                }
            }, removeChild_1 = function () {
                var _elem = getSelected_1();
                for (var i = 0, areas = app.main.selected.areas; i < areas.length; i++) {
                    if (areas[i]._id == _elem._data._id) {
                        areas.splice(i, 1);
                        break;
                    }
                }
                _elem._data = null;
            };
            [
                {
                    className: 'attach-new', click: function (onFinish) {
                        var _elem = getSelected_1();
                        if (_elem._data) {
                            new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["a" /* Confirm */]({
                                title: "This area had already a structure (" + _elem._data.name + "), if ok will resave!!!",
                                onOk: function () {
                                    removeChild_1();
                                    childSelected_1(new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["h" /* ModelStructure */]());
                                },
                                onAnyWay: function () {
                                    onFinish();
                                }
                            });
                        }
                        else {
                            childSelected_1(new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["h" /* ModelStructure */]());
                            onFinish();
                        }
                    }, icon: '../assets/img/ic_library_add_white_24px.svg'
                },
                {
                    className: 'attach-link', click: function (onFinish) {
                        var onChange = function () {
                            var prompt = new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["b" /* Prompt */]({
                                title: "Input the link",
                                txt: 'https://google.com',
                                onOk: function () {
                                    childSelected_1(new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["i" /* LinkGeneralStructure */]({
                                        destination: prompt.input.value || ''
                                    }));
                                    onFinish();
                                }
                            });
                        };
                        var _elem = getSelected_1();
                        if (_elem._data) {
                            new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["a" /* Confirm */]({
                                title: "This area had already a structure (" + _elem._data.name + "), if ok will resave!!!",
                                onOk: function () {
                                    onChange();
                                    removeChild_1();
                                },
                                onAnyWay: function () {
                                    onFinish();
                                }
                            });
                        }
                        else {
                            onChange();
                        }
                    }, icon: '../assets/img/ic_link_white_24px.svg'
                },
                {
                    className: 'attach-js', click: function (onFinish) {
                        var onChange = function () {
                            var prompt = new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["b" /* Prompt */]({
                                title: "Please input js code",
                                txt: 'alert("TEST")',
                                onOk: function (input) {
                                    childSelected_1(new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["j" /* GeneralStructure */]({
                                        destination: prompt.input.value || ''
                                    }));
                                    onFinish();
                                }
                            });
                        };
                        var _elem = getSelected_1();
                        if (_elem._data) {
                            new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["a" /* Confirm */]({
                                title: "This area had already a structure (" + _elem._data.name + "), if ok will resave!!!",
                                onOk: function () {
                                    onChange();
                                    removeChild_1();
                                },
                                onAnyWay: function () {
                                    onFinish();
                                }
                            });
                        }
                        else {
                            onChange();
                        }
                    }, icon: '../assets/img/JS.svg'
                },
                {
                    className: 'cntrls-close', click: function (onFinish) {
                        var _elem = getSelected_1();
                        if (_elem._data) {
                            new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["a" /* Confirm */]({
                                title: "This area has a structure (" + _elem._data.name + "), if ok will remove!!!",
                                onOk: function () {
                                    removeChild_1();
                                    if (app.main.selected.camera.isSVG)
                                        _elem.dropSelf();
                                },
                                onAnyWay: function () {
                                    onFinish();
                                }
                            });
                        }
                        else {
                            if (app.main.selected.camera.isSVG)
                                _elem.dropSelf();
                            onFinish();
                        }
                    }, icon: '../assets/img/ic_close_white_24px.svg'
                }
            ].forEach(function (el, item) {
                var domEl = document.createElement('div');
                domEl.className = el.className;
                domEl.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CLICK, function (e) {
                    el.click(function () { return _this.show(e, false); });
                    app.main.selected.hasChanges = true;
                });
                div.appendChild(domEl);
                var icon = document.createElement('img');
                icon.src = el.icon;
                icon.setAttribute('fillColor', '#ffffff');
                icon.setAttribute('fill', '#ffffff');
                icon.style.color = '#ffffff';
                domEl.appendChild(icon);
            });
            app.model.traverse(function (child) {
                if (child.type == "Mesh" && child._dataSource) {
                    child._toolTip = new OxiToolTip(child, app);
                }
            });
        }
        else {
            if (this.app.main.selected.images.length > 1) {
                var arrows = [{ _c: 'left', _i: -1 }, { _c: 'right', _i: 1 }];
                if (_div) {
                    div = _div;
                    _div.style.display = '';
                    for (var i = 0; i < _div.childNodes.length; i++) {
                        var childDiv = _div.childNodes[i];
                        var _loop_2 = function(u) {
                            if (childDiv.localName == 'div') {
                                var dir_1 = arrows.splice(u, 1)[0]._i;
                                childDiv.addEventListener((this_2.app.isMobile ? __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.TOUCH_END : __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CLICK), function (e) {
                                    _this.app._slider.move(dir_1);
                                });
                                childDiv.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.SELECT_START, this_2.app.onEventPrevent);
                                return "break";
                            }
                        };
                        var this_2 = this;
                        for (var u = 0; u < arrows.length; u++) {
                            var state_2 = _loop_2(u);
                            if (state_2 === "break") break;
                        }
                    }
                }
                else {
                    div.className = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_CONTROLS_MOVE;
                    app._container.appendChild(div);
                    arrows.forEach(function (child) {
                        var childDiv = document.createElement('div');
                        childDiv.className = child._c;
                        childDiv.style.backgroundImage = 'url("assets/img/left_arrow.png")';
                        div.appendChild(childDiv);
                        childDiv.addEventListener((_this.app.isMobile ? __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.TOUCH_END : __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CLICK), function (e) {
                            _this.app._slider.move(child._i);
                        });
                        childDiv.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.SELECT_START, _this.app.onEventPrevent);
                    });
                }
            }
            div.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.SELECT_START, this.app.onEventPrevent);
            app.model.traverse(function (child) {
                if (child.type == "Mesh") {
                    //child.material.visible = false;
                    child.material.opacity = 0;
                    child._toolTip = new OxiToolTip(child, app);
                }
            });
            var path = this.app.main.location.path(), areas_1 = path.split(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_DMNS[0]);
            if (areas_1.length > 1) {
                var back = _backArea;
                if (!back) {
                    back = document.createElement('div');
                    back.className = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_BACK_AREA;
                    back.style.backgroundImage = "url('assets/img/android-system-back.png')";
                    app._container.appendChild(back);
                }
                else {
                    back.style.display = '';
                }
                areas_1.pop();
                back.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CLICK, function (e) {
                    e.preventDefault();
                    window.location.href = window.location.origin + (areas_1.length > 1 ? areas_1.join(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_DMNS[0]) : areas_1.join(''));
                });
                back.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CNTXMENU, function (e) { return app._events.onCntxMenu(e); }, false);
            }
        }
        div.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CNTXMENU, function (e) { return app._events.onCntxMenu(e); }, false);
        if (!kompass) {
            kompass = document.createElement('div');
            kompass.className = 'kompass';
            kompass.style.backgroundImage = 'url("assets/img/kompas.png")';
            app._container.appendChild(kompass);
        }
        this.kompas = kompass;
        kompass.onUpdate = function () {
            kompass.style.display = !_self.app.main.selected.camera.kompass.enabled ? 'none' : '';
            kompass.style.transform = 'rotate(' + (_self.app.main.selected.currentItem * __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].ANGLE_STEP + app.main.selected.camera.kompass.angle) + 'deg)';
        };
        kompass.onUpdate();
    }
    OxiControls.prototype.show = function (pos, flag, fl) {
        if (flag === void 0) { flag = true; }
        if (fl === void 0) { fl = true; }
        var canEdit = this.app.main.selected.canEdit;
        if (this.kompas)
            this.kompas.onUpdate();
        var _inter = this.app._events.lastInter;
        if (_inter) {
            _inter = _inter.object;
            if (_inter._toolTip)
                _inter._toolTip.show(flag);
            if (!_inter.material.defColor)
                _inter.material.defColor = _inter.material.color.clone();
            if (!_inter.material.onSelectColor)
                _inter.material.onSelectColor = new THREE.Color(61 / 250, 131 / 250, 203 / 250);
            _inter.material.color = flag ? _inter.material.onSelectColor : _inter.material.defColor;
            _inter.material.transparent = fl;
            _inter.renderOrder = flag ? 100 : 0;
        }
        this.showControls(pos, flag);
        this.app._animation.play();
        //this.app.updateInfoHTML();
    };
    OxiControls.prototype.showControls = function (pos, flag) {
        if (flag === void 0) { flag = true; }
        var canEdit = this.app.main.selected.canEdit;
        if (flag) {
            if (this.controls.className.indexOf(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].ACTIVE) < 0) {
                this.controls.className += " " + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].ACTIVE;
            }
        }
        else {
            this.controls.className = this.controls.className.replace(" " + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].ACTIVE, '');
        }
        if (canEdit) {
            var _d = document.querySelector('app-aside');
            if (_d) {
                _d = _d.getBoundingClientRect();
            }
            this.controls.style.left = ((pos.clientX || pos.x) - 15 - (_d.right ? _d.right : 0)) + 'px';
            this.controls.style.top = ((pos.clientY || pos.y) - this.controls.clientHeight / 2 - 15) + 'px';
        }
        else {
        }
    };
    OxiControls.prototype.showAttachPopUp = function (elem) {
        var _this = this;
        if (!elem || !elem._data) {
            alertify.error('please create area for this element, on right click');
            return false;
        }
        var _mesh = elem, _dialog = new __WEBPACK_IMPORTED_MODULE_4__dialogs_dialog__["c" /* Dialog */]({ title: 'Attach data source' });
        var _loop_3 = function(i, _a) {
            if (_a[i].active)
                return "continue";
            var d = document.createElement('div'), spa = document.createElement('span'), btn = document.createElement('button');
            btn.addEventListener('click', function () {
                if (_mesh._dataSource) {
                    _mesh._dataSource.active = false;
                }
                _mesh._data.dataSourceId = _a[i]._id;
                _mesh._dataSource = _a[i];
                _mesh._tooltip = new OxiToolTip(_mesh, _this.app);
                _dialog.anyWay();
                _this.app._animation.play();
            });
            btn.innerText = 'Attach';
            spa.innerText = _a[i]._id;
            d.className = "my-dialog";
            d.appendChild(spa);
            d.appendChild(btn);
            _dialog.body.appendChild(d);
        };
        for (var i = 0, _a = this.app.main.preToolTip.dataElem; i < _a.length; i++) {
            _loop_3(i, _a);
        }
        return true;
    };
    return OxiControls;
}());
var OxiToolTip = (function () {
    function OxiToolTip(mesh, main) {
        this.canEdit = false;
        var tooltip;
        var tooltipParent = main._preloaderStatus._tooltips;
        if (!tooltipParent) {
            tooltipParent = document.querySelector('.' + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_TOOLTIPS.CONTAINER);
            if (!tooltipParent) {
                tooltipParent = document.createElement('div');
                tooltipParent.className = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["g" /* ProjClasses */].PROJ_TOOLTIPS.CONTAINER;
                main._parent().appendChild(tooltipParent);
            }
            main._preloaderStatus._tooltips = tooltipParent;
            tooltipParent.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CNTXMENU, function (e) { return main._events.onCntxMenu(e); }, false);
        }
        this.main = main;
        this.canEdit = main.main.selected.canEdit;
        if (mesh._tooltip) {
            for (var i = 0; i < main.infoHTML.length; i++) {
                if (main.infoHTML[i]._id == mesh._tooltip._id) {
                    main.infoHTML.splice(i, 1);
                    break;
                }
            }
        }
        this._id = Date.now() * Math.random();
        main.infoHTML.push(this);
        if (mesh._dataSource) {
            mesh._dataSource.active = true;
        }
        else {
            tooltip = document.createElement('div');
            var tooltCnt = document.createElement('div'), head = document.createElement('div'), spanHead = document.createElement('span'), spanBody = document.createElement('div'), body = document.createElement('div');
            body.appendChild(spanBody);
            head.appendChild(spanHead);
            tooltCnt.appendChild(head);
            tooltCnt.appendChild(document.createElement('hr'));
            tooltCnt.appendChild(body);
            tooltip.appendChild(tooltCnt);
            tooltip.className = 'cos-info active';
            tooltCnt.className = 'cos-tooltip';
            body.className = 'cos-tooltip-body';
            spanBody.className = 'cos-tooltip-body-title';
            head.className = 'cos-tooltip-header';
            spanBody.innerHTML = mesh._data ? mesh._data.name : mesh.name;
            spanHead.innerHTML = mesh.name;
            //tooltip.innerHTML += '<div class="cos-label"><span>0</span></div>';
            var sp = void 0, ps = void 0;
            if (mesh._data && mesh._data.areas) {
                sp = document.createElement('div');
                sp.className = 'cos-label';
                ps = document.createElement('span');
                sp.appendChild(ps);
                ps.innerText = mesh._data.areas.length;
                tooltip.appendChild(sp);
            }
            this.tooltip = tooltip;
            this.tooltipCnt = tooltCnt;
            [tooltip, tooltCnt, sp, ps].forEach(function (e) {
                if (e)
                    e.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.SELECT_START, main.onEventPrevent);
            });
        }
        this.mesh = mesh;
        if (!mesh.material)
            mesh.material = {};
        mesh.material.onSelectColor = new THREE.Color(1.0, 0.1, 0.1);
        if (!main.main.selected.canEdit) {
            if (mesh._data || mesh._dataSource) {
                if (mesh._data._category == __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_DESTINATION.ModelStructure) {
                    mesh.material.onSelectColor = new THREE.Color(0.1, 1.0, 0.1);
                }
                mesh.click = function () {
                    switch (mesh._data._category) {
                        case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_DESTINATION.ModelStructure:
                            {
                                var _url = mesh._data.projFilesDirname.split("/");
                                window.location.href += "&area=" + _url[_url.length - 1];
                                break;
                            }
                        case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_DESTINATION.LinkGeneralStructure:
                            {
                                window.open(mesh._data.destination);
                                break;
                            }
                        case __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_DESTINATION.GeneralStructure:
                            {
                                try {
                                    main.main.authServ.safeJS(mesh._data.destination)();
                                }
                                catch (e) {
                                }
                                break;
                            }
                    }
                };
                if (mesh._dataSource) {
                    mesh._dataSource.onclick = mesh.click;
                }
                else {
                    tooltip.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CLICK, function (e) { return mesh.click(); });
                }
            }
            else if (mesh._dataSource) {
                if (mesh._dataSource.URL && mesh._dataSource.URL.match(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PATTERNS.URL)) {
                    mesh.click = function () {
                        window.open(mesh._dataSource.URL);
                    };
                    mesh._dataSource.onclick = mesh.click;
                    if (tooltip)
                        tooltip.addEventListener(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].EVENTS_NAME.CLICK, function (e) { return mesh.click(); });
                    mesh.material.onSelectColor = new THREE.Color(0.1, 1.0, 0.1);
                }
            }
        }
        if (!mesh._dataSource)
            tooltipParent.appendChild(tooltip);
        this.update();
    }
    OxiToolTip.prototype.show = function (show) {
        if (show === void 0) { show = true; }
        //this.mesh.material.visible = show || this.canEdit;
        this.mesh.material.opacity = (show || this.canEdit) ? this.mesh.material.opacity0 : 0;
        if (this.tooltip) {
            this.tooltip.className = show ? 'cos-info active act' : 'cos-info active';
            this.tooltipCnt.className = show ? 'cos-tooltip active' : 'cos-tooltip';
        }
        else {
            this.mesh._dataSource.tooltip.active = !!show;
        }
        this.update();
    };
    OxiToolTip.prototype.update = function () {
        this.mesh.getScreenPst();
        if (this.tooltip) {
            this.tooltip.style.left = this.mesh.onscreenParams.x + 'px';
            this.tooltip.style.top = this.mesh.onscreenParams.y + 'px';
            this.tooltip.className += this.checkPst(this.mesh.onscreenParams.x, this.mesh.onscreenParams.y);
        }
        else {
            this.mesh._dataSource._left = (this.mesh.onscreenParams.x - this.mesh.onscreenOffset.left) + 'px';
            this.mesh._dataSource._top = (this.mesh.onscreenParams.y - this.mesh.onscreenOffset.top) + 'px';
            this.checkPst(this.mesh.onscreenParams.x, this.mesh.onscreenParams.y, this.mesh._dataSource);
        }
    };
    OxiToolTip.prototype.checkPst = function (x, y, dataSource) {
        if (dataSource === void 0) { dataSource = null; }
        var minX = 0, minY = 0, maxX = this.main._slider._W(), maxY = this.main._slider._H(), tootlipWidth = 280, tooltipHeight = 160, classes = [' tooltip-align-left', ' tooltip-align-right', ' tooltip-align-bottom'];
        if (dataSource)
            dataSource.alignLeft = dataSource.alignRight = dataSource.alignBottom = false;
        if (x + tootlipWidth > maxX) {
            if (dataSource)
                dataSource.alignLeft = true;
            return classes[0];
        }
        else if (x - tootlipWidth < minX) {
            if (dataSource)
                dataSource.alignRight = true;
            return classes[1];
        }
        else if (y - tooltipHeight < minY) {
            if (dataSource)
                dataSource.alignBottom = true;
            return classes[2];
        }
        return '';
    };
    OxiToolTip.prototype.htmlToElement = function (html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    };
    return OxiToolTip;
}());
//# sourceMappingURL=webgl.view.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProjClasses; });
var Config = (function () {
    function Config() {
    }
    Config.randomInteger = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = Date.now(); }
        return Math.round(min + Math.random() * (max - min));
    };
    Config.randomstr = function () {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    };
    Config.SITE_STRUCTURE = '/site_structure.json';
    Config.PROJ_LOC = 'uploads/projects/';
    Config.PROJ_DMNS = ["&", '='];
    Config.PROJ_DESTINATION = {
        GeneralStructure: 0,
        LinkGeneralStructure: 1,
        ModelStructure: 2,
        OxiCamera: 3,
        Vector3: 4,
        ProjFile: 5,
    };
    Config.EVENTS_NAME = {
        KEY: {
            DOWN: 'keydown',
            UP: 'keyup',
        },
        CNTXMENU: 'contextmenu',
        DB_CLICK: 'dblclick',
        SELECT_START: 'selectstart',
        CLICK: 'click',
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
        MOUSE_OUT: 'mouseout',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup'
    };
    Config.FILE = {
        TYPE: {
            MODEL_OBJ: 1,
            PREVIEW_IMG: 2,
            ALIGN_IMG: 3,
            MODEL_SVG: 4
        },
        STORAGE: {
            SITE_STRUCTURE: 'structure',
            MODEL_OBJ: 'model[]',
            PREVIEW_IMG: 'frames[]',
            ALIGN_IMG: 'alignFrames[]',
            PRELOADER: 'preloader[]',
            CONTROLS: 'controls[]',
            TOOLTIP: 'tooltip[]',
            SVG_FILE: 'svgs[]'
        },
        DIR: {
            DELIMETER: "/",
            PROJECT_PREVIEW: 'images/',
            PROJECT_ALIGN_IMG: 'align_images/',
            PROJECT_TEMPLATE: {
                NAME: 'assets/templates/',
                CSS: 'style.css',
                HTML: 'index.html',
                JS: 'index.js',
                TYPES: ['controls/', 'tooltip/', 'preloader/'],
                _TYPE: {
                    PRELOADER: 2,
                    TOOLTIP: 1,
                    CONTROLS: 0,
                }
            },
            PREVIEW: {
                LOW: 'low/',
                WEBP: 'webp/',
            }
        }
    };
    Config.PATTERNS = {
        URL: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    };
    Config.IGNORE = 'ignore';
    Config.ANGLE_STEP = 10;
    Config.DYNAMIC_IJNECT = {
        PRELOADER: {
            HTML: './assets/defaults/preloader/index.html',
            CSS: './assets/defaults/preloader/style.css'
        }
    };
    return Config;
}());
var ProjClasses = (function () {
    function ProjClasses() {
    }
    ProjClasses.IMG_SLIDER = 'img-slider-container';
    ProjClasses.CENTER_CONTAINER = 'center-container';
    ProjClasses.PROJ_TOOLTIP_CONTAINER = 'tooltip-container';
    ProjClasses.PROJ_BACK_AREA = 'back-area';
    ProjClasses.PROJ_CONTROLS = 'oxi-controls';
    ProjClasses.PROJ_CONTROLS_MOVE = 'oxi-controls-move';
    ProjClasses.PROJ_CONTROLS_CONTAINER = 'oxi-controls-container';
    ProjClasses.PROJ_COMPASS = 'kompass';
    ProjClasses.PROJ_TOOLTIPS = {
        CONTAINER: 'tooltip-container',
        TOOLTIP: 'tooltip',
        HEADER: 'header',
        BODY: 'body',
    };
    ProjClasses.ACTIVE = 'active';
    return ProjClasses;
}());
//# sourceMappingURL=constant.data.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShareService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShareService = (function () {
    function ShareService() {
        this.shareSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](undefined);
        this.shareListener = this.shareSubject.asObservable();
        this.headerSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](undefined);
        this.headerListener = this.headerSubject.asObservable();
    }
    ShareService.prototype.changeShareSubject = function (val) {
        this.shareSubject.next(val);
    };
    ShareService.prototype.changeHeaderSubject = function (val) {
        this.headerSubject.next(val);
    };
    ShareService.prototype.setHeaderArr = function (length) {
        this.headerSubject.value.arrLength = length;
    };
    ShareService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ShareService);
    return ShareService;
}());
//# sourceMappingURL=share.service.js.map

/***/ }),

/***/ 390:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 390;


/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(81);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(http, storageService) {
        this.http = http;
        this.storageService = storageService;
    }
    AuthService.prototype.createAuthorizationHeader = function (headers) {
        var token = this.storageService.get("token") || this.storageService.getSession("token");
        headers.append('Authorization', token);
    };
    AuthService.prototype.get = function (url, options) {
        if (options === void 0) { options = { hasAuthHeader: true }; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        if (options.hasAuthHeader)
            this.createAuthorizationHeader(headers);
        return this.http.get(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers }));
    };
    AuthService.prototype.post = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = { hasAuthHeader: true }; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        if (options.hasAuthHeader)
            this.createAuthorizationHeader(headers);
        return this.http.post(url, data, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers }));
    };
    AuthService.prototype.put = function (url, data) {
        if (data === void 0) { data = {}; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers }));
    };
    AuthService.prototype.delete = function (url, data) {
        if (data === void 0) { data = {}; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
            headers: headers,
            body: data
        }));
    };
    AuthService.prototype.safeJS = function (jsCode) {
        var res = function () { };
        try {
            res = Function("return " + jsCode)();
        }
        catch (e) {
            alertify.error(e);
        }
        finally {
            return res;
        }
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */]) === 'function' && _b) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b;
}());
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 592:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 592;


/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(730);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectService = (function () {
    function ProjectService(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.Project = new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["a" /* Project */]();
    }
    ProjectService.prototype.setProject = function (project) {
        var _this = this;
        if (!(project instanceof __WEBPACK_IMPORTED_MODULE_1__entities_entities__["a" /* Project */])) {
            this.Project = new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["a" /* Project */](project);
        }
        else {
            this.Project = project;
        }
        if (!(this.Project.model instanceof __WEBPACK_IMPORTED_MODULE_1__entities_entities__["b" /* ProjectModel */])) {
            this.Project.model = new __WEBPACK_IMPORTED_MODULE_1__entities_entities__["b" /* ProjectModel */](this.Project.model);
        }
        if (this.Project.model.link) {
            if (!(this.Project.model.data instanceof Array)) {
                this.authService.get(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_LOC + this.Project.model.link + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].SITE_STRUCTURE).subscribe(function (res) {
                    _this.Project.model.data = [];
                    for (var _data = res.json(), i = 0; i < _data.length; i++) {
                        _this.Project.model.data.push(__WEBPACK_IMPORTED_MODULE_1__entities_entities__["d" /* ProjMain */].inject(_data[i]));
                    }
                    if (_this.Project.select)
                        _this.Project.select(_this.Project.model);
                });
            }
        }
    };
    ProjectService.prototype.getProject = function () {
        return this.Project;
    };
    ProjectService.prototype.createProject = function (project) {
        var _this = this;
        var link = '/api/projects/project';
        this.authService.post(link, project).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                var user = _this.userService.getUser();
                user.projects.push(res.res);
            }
            alertify.success(res.message);
        }, function (error) {
        });
    };
    ProjectService.prototype.changeProject = function (project) {
        var _this = this;
        var link = '/api/projects/project';
        this.authService.put(link, project).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                alertify.success(res.message);
                //this.setProject(res.res);
                for (var key in project) {
                    _this.Project[key] = project[key];
                }
            }
            else {
                alertify.error(res.message);
            }
        }, function (error) {
        });
    };
    ProjectService.prototype.deleteProject = function (project, callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var link = '/api/projects/project';
        this.authService.delete(link, { _id: project._id }).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                var user = _this.userService.getUser();
                for (var i = 0; i < user.projects.length; i++) {
                    if (user.projects[i]._id == project._id) {
                        user.projects.splice(i, 1);
                        break;
                    }
                }
                if (callback)
                    callback();
            }
            alertify.success(res.message);
        }, function (error) {
            alertify.error(error && error.message ? error.message : error);
        });
    };
    ProjectService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], ProjectService);
    return ProjectService;
    var _a, _b;
}());
//# sourceMappingURL=project.service.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//enableProdMode(); // for production mode
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(850),
            styles: [__webpack_require__(791)],
            host: { 'window:beforeunload': 'beforeClose' }
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_codemirror__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_dynamic_component_index__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_dynamic_component_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_dynamic_component_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__router__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_storage_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_auth_guard_service__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_logged_guard_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_share_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_name_pipe__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_login_login_component__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_home_home_component__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_home_aside_aside_component__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_home_users_users_component__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_home_projects_projects_component__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_home_header_header_component__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_home_users_user_card_user_card_component__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_home_users_new_user_new_user_component__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_home_projects_new_project_new_project_component__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_home_projects_view_view_project__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_home_projects_edit_edit_project__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_home_project_project_component__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_home_project_source_source_project__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_home_project_basic_basic_project__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_home_project_costumization_costumization__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_home_project_preview_preview__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_project_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__directives_directives__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_home_project_source_edit_view_edit_view__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_preview_preview_project__ = __webpack_require__(369);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_home_projects_projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_home_aside_aside_component__["a" /* AsideComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_home_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_home_users_users_component__["a" /* UsersComponent */],
                __WEBPACK_IMPORTED_MODULE_14__pipes_name_pipe__["a" /* NamePipe */],
                __WEBPACK_IMPORTED_MODULE_22__components_home_users_user_card_user_card_component__["a" /* UserCardComponent */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["a" /* SlimScroll */],
                __WEBPACK_IMPORTED_MODULE_23__components_home_users_new_user_new_user_component__["a" /* NewUserComponent */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["b" /* UploadFile */],
                __WEBPACK_IMPORTED_MODULE_26__components_home_projects_edit_edit_project__["a" /* EditProject */],
                __WEBPACK_IMPORTED_MODULE_34__components_home_project_source_edit_view_edit_view__["a" /* EditView */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["c" /* WebglView */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["d" /* WControls */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["e" /* WTooltip */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["f" /* SVGView */],
                __WEBPACK_IMPORTED_MODULE_30__components_home_project_costumization_costumization__["a" /* TextAr */],
                __WEBPACK_IMPORTED_MODULE_35__components_preview_preview_project__["a" /* PreviewSceneComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_home_project_preview_preview__["a" /* PreviewProject */],
                __WEBPACK_IMPORTED_MODULE_30__components_home_project_costumization_costumization__["b" /* Costumization */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["g" /* Preloader */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["h" /* HtmlDirective */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["i" /* TemplatesLoader */],
                //AbstractTemplateProject,
                __WEBPACK_IMPORTED_MODULE_24__components_home_projects_new_project_new_project_component__["a" /* NewProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["j" /* MTree */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["k" /* MNode */],
                __WEBPACK_IMPORTED_MODULE_25__components_home_projects_view_view_project__["a" /* ViewProject */],
                __WEBPACK_IMPORTED_MODULE_28__components_home_project_source_source_project__["a" /* SourceProject */],
                __WEBPACK_IMPORTED_MODULE_29__components_home_project_basic_basic_project__["a" /* BasicProject */],
                __WEBPACK_IMPORTED_MODULE_27__components_home_project_project_component__["a" /* ProjectComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5_ng2_codemirror__["CodemirrorModule"],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__["a" /* AlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_angular2_dynamic_component_index__["DynamicComponentModule"],
                __WEBPACK_IMPORTED_MODULE_7__router__["a" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_9__services_storage_service__["a" /* StorageService */],
                __WEBPACK_IMPORTED_MODULE_11__services_auth_guard_service__["a" /* AuthGuardService */],
                __WEBPACK_IMPORTED_MODULE_12__services_logged_guard_service__["a" /* LoggedGuardService */],
                __WEBPACK_IMPORTED_MODULE_10__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_13__services_share_service__["a" /* ShareService */],
                __WEBPACK_IMPORTED_MODULE_33__directives_directives__["l" /* WebGLService */],
                __WEBPACK_IMPORTED_MODULE_35__components_preview_preview_project__["b" /* PreviewSceneService */],
                __WEBPACK_IMPORTED_MODULE_32__services_project_service__["a" /* ProjectService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsideComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AsideComponent = (function () {
    function AsideComponent(userService, route) {
        var _this = this;
        this.userService = userService;
        this.route = route;
        this.menuChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        route.data.subscribe(function (data) {
            _this.User = data.user;
            if (!_this.User || typeof _this.User == "boolean")
                _this.User = data.user = {};
            if (!data.user.projects)
                data.user.projects = [];
            if (!data.user.users)
                data.user.users = [];
            for (var i = 0; i < data.user.users.length; i++) {
                if (data.user.users[i]._id == data.user._id) {
                    _this.user = data.user.users[i];
                    break;
                }
            }
        });
    }
    AsideComponent.prototype.closeMenu = function () {
        this.menu = 'out';
        this.menuChange.emit(this.menu);
    };
    AsideComponent.prototype.logOut = function () {
        this.userService.logOut();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AsideComponent.prototype, "menu", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], AsideComponent.prototype, "menuChange", void 0);
    AsideComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-aside',
            template: __webpack_require__(851),
            styles: [__webpack_require__(792)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], AsideComponent);
    return AsideComponent;
    var _a, _b;
}());
//# sourceMappingURL=aside.component.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_project_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeaderComponent = (function () {
    function HeaderComponent(shareService, projectService, _router, location) {
        this.shareService = shareService;
        this.projectService = projectService;
        this._router = _router;
        this.location = location;
        this.sortActive = false;
        this.headerData = {};
        this.headerSettings = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subHeaderData = this.shareService.headerListener.subscribe(function (data) {
            if (data) {
                _this.headerData = data;
            }
        });
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.subHeaderData.unsubscribe();
    };
    HeaderComponent.prototype.deactivate = function () {
        var id = this.headerData._id;
        var temp = {
            _id: id,
            published: !this.headerData.published
        };
        this.projectService.changeProject(temp);
    };
    HeaderComponent.prototype.delete = function () {
        var _this = this;
        this.projectService.deleteProject(this.headerData, function () {
            _this._router.navigate(['projects']);
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("backProject"), 
        __metadata('design:type', Object)
    ], HeaderComponent.prototype, "backProject", void 0);
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(852),
            styles: [__webpack_require__(793)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_project_service__["a" /* ProjectService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common__["Location"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_common__["Location"]) === 'function' && _d) || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditView; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditView = (function () {
    function EditView() {
        this._CONFIG = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */];
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], EditView.prototype, "modelStructure", void 0);
    EditView = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-edit-view',
            template: __webpack_require__(858),
            styles: [__webpack_require__(799)]
        }), 
        __metadata('design:paramtypes', [])
    ], EditView);
    return EditView;
}());
//# sourceMappingURL=edit.view.js.map

/***/ }),

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_share_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProject; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditProject = (function () {
    function EditProject(userService, shareService) {
        this.userService = userService;
        this.shareService = shareService;
        this.resol = {
            title: true,
            link: true
        };
        this.user = this.userService.getUser();
        this.project = new __WEBPACK_IMPORTED_MODULE_2__entities_entities__["a" /* Project */]();
    }
    //photo change
    EditProject.prototype.loadPhoto = function ($event) {
        var _this = this;
        var fr = new FileReader();
        try {
            fr['readAsDataURL']($event.target.files[0]);
            fr.onload = function () {
                _this.project.image = fr.result;
            };
        }
        catch (err) {
            console.log('load photo err: ', err);
        }
    };
    EditProject.prototype.removePhoto = function () {
        this.project.image = '';
    };
    //user save accept/cancel
    EditProject.prototype.keyDown = function (event) {
        if (event.keyCode == 13) {
            this.accept();
        }
        else if (event.keyCode == 27) {
            this.cancel();
        }
    };
    EditProject.prototype.accept = function () {
        if (!this.userService.resolUser(this.resol, this.project))
            return false;
        this.project.newProject = true;
        this.shareService.changeShareSubject(this.project);
    };
    EditProject.prototype.cancel = function () {
        this.project.newProject = false;
        this.shareService.changeShareSubject(this.project);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__entities_entities__["IProject"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__entities_entities__["IProject"]) === 'function' && _a) || Object)
    ], EditProject.prototype, "project", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], EditProject.prototype, "title", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], EditProject.prototype, "keyDown", null);
    EditProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-edit',
            template: __webpack_require__(860),
            styles: [__webpack_require__(801)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_share_service__["a" /* ShareService */]) === 'function' && _c) || Object])
    ], EditProject);
    return EditProject;
    var _a, _b, _c;
}());
//# sourceMappingURL=edit.project.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_project_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewProjectComponent = (function () {
    function NewProjectComponent(userService, projectService) {
        this.userService = userService;
        this.projectService = projectService;
        this.openedStateChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.resol = {
            title: true,
            link: true
        };
        this.User = this.userService.getUser();
        this.project = new __WEBPACK_IMPORTED_MODULE_2__entities_entities__["a" /* Project */]();
        this._CONFIG = __WEBPACK_IMPORTED_MODULE_2__entities_entities__["c" /* Config */];
        this.Create = true;
    }
    NewProjectComponent.prototype.ngOnInit = function () {
        this.tempProject = Object.assign({}, this.project);
    };
    //photo change
    NewProjectComponent.prototype.loadPhoto = function ($event) {
        var _this = this;
        var fr = new FileReader();
        try {
            fr['readAsDataURL']($event.target.files[0]);
            fr.onload = function () {
                _this.project.image = fr.result;
            };
        }
        catch (err) {
            console.log('load photo err: ', err);
        }
    };
    NewProjectComponent.prototype.removePhoto = function () {
        this.project.image = '';
    };
    //user save accept/cancel
    NewProjectComponent.prototype.keyDown = function (event) {
        if (event.keyCode == 13 && this.Create) {
            this.accept(this.createViewForm);
        }
        else if (event.keyCode == 27 && this.Create) {
            this.cancel();
        }
    };
    NewProjectComponent.prototype.accept = function (form) {
        form.clicked = true;
        if (form.invalid || !this.userService.resolUser(this.resol, this.project))
            return false;
        !this.project._id ? this.projectService.createProject(this.project) : this.projectService.changeProject(this.project);
        this.cancel();
    };
    NewProjectComponent.prototype.cancel = function () {
        this.openedState = false;
        this.openedStateChange.emit(this.openedState);
    };
    NewProjectComponent.prototype.reset = function () {
        this.project.image = this.tempProject.image;
        this.project.link = this.tempProject.link;
        this.project.title = this.tempProject.title;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("createViewForm"), 
        __metadata('design:type', Object)
    ], NewProjectComponent.prototype, "createViewForm", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], NewProjectComponent.prototype, "project", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], NewProjectComponent.prototype, "title", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], NewProjectComponent.prototype, "Create", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], NewProjectComponent.prototype, "openedState", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], NewProjectComponent.prototype, "openedStateChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NewProjectComponent.prototype, "keyDown", null);
    NewProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-new-project',
            template: __webpack_require__(861),
            styles: [__webpack_require__(802)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_project_service__["a" /* ProjectService */]) === 'function' && _c) || Object])
    ], NewProjectComponent);
    return NewProjectComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=new-project.component.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_project_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewProject; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewProject = (function () {
    function ViewProject(projectService) {
        this.projectService = projectService;
        this.openedPopUp = false;
        this.Editable = true;
    }
    ViewProject.prototype.openPopUp = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.Editable)
            return;
        //if(!this.openedPopUp)
        this.projectService.setProject(this.project);
        this.openedPopUp = !this.openedPopUp;
        return false;
    };
    ViewProject.prototype.deactivateProject = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var id = this.project._id;
        var temp = {
            _id: id,
            published: !this.project.published
        };
        this.projectService.changeProject(temp);
        this.project.published = temp.published;
        this.openedPopUp = !this.openedPopUp;
        return false;
    };
    ViewProject.prototype.deleteProject = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.projectService.deleteProject({ _id: this.project._id });
        this.openedPopUp = !this.openedPopUp;
        return false;
    };
    ViewProject.prototype.openUrl = function () {
        console.log('tet');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__entities_entities__["IProject"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__entities_entities__["IProject"]) === 'function' && _a) || Object)
    ], ViewProject.prototype, "project", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ViewProject.prototype, "Editable", void 0);
    ViewProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-view',
            template: __webpack_require__(863),
            styles: [__webpack_require__(804)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */]) === 'function' && _b) || Object])
    ], ViewProject);
    return ViewProject;
    var _a, _b;
}());
//# sourceMappingURL=view.project.js.map

/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_user_interface__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewUserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewUserComponent = (function () {
    function NewUserComponent(shareService, userService) {
        this.shareService = shareService;
        this.userService = userService;
        this.tempNewUser = new __WEBPACK_IMPORTED_MODULE_1__interfaces_user_interface__["a" /* User */]();
        this.resol = {
            firstName: true,
            secondName: true,
            email: true,
            password: true,
            passwordRepeat: true,
            role: true
        };
        this.User = this.userService.getUser();
    }
    NewUserComponent.prototype.ngOnInit = function () {
        this.message.email = '';
    };
    //photo change
    NewUserComponent.prototype.loadPhoto = function ($event) {
        var _this = this;
        var fr = new FileReader();
        try {
            fr['readAsDataURL']($event.target.files[0]);
            fr.onload = function () {
                _this.tempNewUser.avatar = fr.result;
            };
        }
        catch (err) {
            console.log('load photo err: ', err);
        }
    };
    NewUserComponent.prototype.removePhoto = function () {
        this.tempNewUser.avatar = '';
    };
    //user save accept/cancel
    NewUserComponent.prototype.keyDown = function (event) {
        if (event.keyCode == 13) {
            this.accept();
        }
        else if (event.keyCode == 27) {
            this.cancel();
        }
    };
    NewUserComponent.prototype.accept = function () {
        if (!this.userService.resolUser(this.resol, this.tempNewUser))
            return false;
        if (this.tempNewUser.password !== this.tempNewUser.passwordRepeat) {
            this.message.password = "Password is incorrect";
            return false;
        }
        this.tempNewUser.newUser = true;
        this.shareService.changeShareSubject(this.tempNewUser);
    };
    NewUserComponent.prototype.cancel = function () {
        this.shareService.changeShareSubject(this.tempNewUser);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], NewUserComponent.prototype, "message", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NewUserComponent.prototype, "keyDown", null);
    NewUserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-new-user',
            template: __webpack_require__(864),
            styles: [__webpack_require__(805)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], NewUserComponent);
    return NewUserComponent;
    var _a, _b;
}());
//# sourceMappingURL=new-user.component.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_user_interface__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserCardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserCardComponent = (function () {
    function UserCardComponent(userService, authService) {
        this.userService = userService;
        this.authService = authService;
        this.userChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.resol = {
            firstName: true,
            secondName: true,
            email: true
        };
        this.message = '';
        this.tempUser = new __WEBPACK_IMPORTED_MODULE_1__interfaces_user_interface__["a" /* User */]();
        //popup menu
        this.openMenu = false;
    }
    UserCardComponent.prototype.ngOnInit = function () {
        this.User = this.userService.getUser();
    };
    UserCardComponent.prototype.ngOnChanges = function (changes) {
        if (changes['user'] && changes['user'].currentValue) {
            var user = changes['user'].currentValue;
            this.switchUser(user);
        }
    };
    UserCardComponent.prototype.switchUser = function (user) {
        var _this = this;
        this.authService.get('/api/users/user/' + user._id).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                user.users = res.res.users;
                user.projects = res.res.projects;
            }
            _this.tempUser = Object.assign({}, user);
        }, function (error) { });
    };
    //photo change
    UserCardComponent.prototype.loadPhoto = function ($event) {
        var _this = this;
        var fr = new FileReader();
        try {
            fr['readAsDataURL']($event.target.files[0]);
            fr.onload = function () {
                _this.tempUser.avatar = fr.result;
            };
        }
        catch (err) {
            console.log('load photo err: ', err);
        }
    };
    UserCardComponent.prototype.removePhoto = function () {
        this.tempUser.avatar = '';
    };
    //popup functions
    UserCardComponent.prototype.deactivate = function () {
        var _this = this;
        this.tempUser.active = !this.tempUser.active;
        this.authService.put('/api/users/user', this.tempUser).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                _this.user.active = _this.tempUser.active;
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    UserCardComponent.prototype.delete = function () {
        var _this = this;
        this.authService.delete('/api/users/user', this.user).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                var idx = _this.User.users.indexOf(_this.user);
                _this.User.users.splice(idx, 1);
                _this.userChange.emit(null);
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    //change user
    UserCardComponent.prototype.changeUser = function () {
        var _this = this;
        if (!this.userService.resolUser(this.resol, this.tempUser))
            return false;
        this.authService.put('/api/users/user', this.tempUser).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                _this.user.firstName = _this.tempUser.firstName;
                _this.user.secondName = _this.tempUser.secondName;
                _this.user.email = _this.tempUser.email;
                _this.user.active = _this.tempUser.active;
                _this.user.avatar = res.res.avatar;
            }
            else {
                if (res.email)
                    _this.message = res.message;
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    UserCardComponent.prototype.reset = function () {
        this.tempUser = Object.assign({}, this.user);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], UserCardComponent.prototype, "canEdit", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], UserCardComponent.prototype, "user", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], UserCardComponent.prototype, "userChange", void 0);
    UserCardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-card',
            template: __webpack_require__(865),
            styles: [__webpack_require__(806)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], UserCardComponent);
    return UserCardComponent;
    var _a, _b;
}());
//# sourceMappingURL=user-card.component.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Dialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Confirm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Prompt; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dialog = (function () {
    function Dialog(val) {
        var _this = this;
        this.values = val;
        this.parent = document.body;
        var div = this.container = document.createElement('div');
        this.popUp = document.createElement('div');
        div.className = 'dialog-view';
        this.popUp.className = 'dialog-pop-up';
        div.appendChild(this.popUp);
        this.parent.appendChild(div);
        this.popUp.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        var title = document.createElement('h4');
        title.innerHTML = val.title;
        this.popUp.appendChild(title);
        var body = this.body = document.createElement('div');
        body.className = "body-dialog";
        this.popUp.appendChild(body);
        var btns = this.btns = document.createElement('div');
        var btnOk = document.createElement('span');
        btns.className = 'new-btns';
        btnOk.className = 'true-btn';
        btnOk.innerText = 'accept';
        btnOk.addEventListener('click', function () { return _this.onOk(); });
        div.addEventListener('click', function () { return _this.onOk(); });
        btns.appendChild(btnOk);
        this.popUp.appendChild(btns);
    }
    Dialog.prototype.onOk = function () {
        if (this.values.onOk)
            this.values.onOk();
        this.anyWay();
    };
    Dialog.prototype.anyWay = function () {
        if (this.values.onAnyWay)
            this.values.onAnyWay();
        var foo = this.container;
        while (foo.firstChild)
            foo.removeChild(foo.firstChild);
        if (foo.parentNode)
            foo.parentNode.removeChild(foo);
    };
    return Dialog;
}());
var Confirm = (function (_super) {
    __extends(Confirm, _super);
    function Confirm(val) {
        var _this = this;
        _super.call(this, val);
        var btnCancel = document.createElement('span');
        btnCancel.className = 'false-btn';
        btnCancel.innerText = 'cancel';
        btnCancel.addEventListener('click', function () { return _this.onCancel(); });
        this.btns.appendChild(btnCancel);
    }
    Confirm.prototype.onCancel = function () {
        if (this.values.onCancel)
            this.values.onCancel();
        this.anyWay();
    };
    return Confirm;
}(Dialog));
var Prompt = (function (_super) {
    __extends(Prompt, _super);
    function Prompt(val) {
        var _this = this;
        _super.call(this, val);
        var input = this.input = document.createElement('input');
        input.value = val.txt || 'Default input data';
        input.addEventListener('change', function (e) {
            _this.input.className = input.value.length ? '' : 'error';
        });
        this.body.appendChild(input);
    }
    Prompt.prototype.onOk = function () {
        if (!this.input.value)
            return this.input.className = 'error';
        _super.prototype.onOk.call(this);
    };
    Prompt.prototype.anyWay = function () {
        if (!this.input.value)
            return this.input.className = 'error';
        _super.prototype.anyWay.call(this);
    };
    return Prompt;
}(Dialog));
//# sourceMappingURL=dialog.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HtmlDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Sets the element's innerHTML to a sanitized version of [safeHtml]
var HtmlDirective = (function () {
    function HtmlDirective(elementRef, sanitizer) {
        this.elementRef = elementRef;
        this.sanitizer = sanitizer;
    }
    HtmlDirective.prototype.ngOnChanges = function (changes) {
        if ('safeHtml' in changes) {
            this.elementRef.nativeElement.innerHTML =
                this.sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SecurityContext"].HTML, this.safeHtml);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], HtmlDirective.prototype, "safeHtml", void 0);
    HtmlDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[safeHtml]' }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Sanitizer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Sanitizer"]) === 'function' && _b) || Object])
    ], HtmlDirective);
    return HtmlDirective;
    var _a, _b;
}());
//# sourceMappingURL=safeHtml.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlimScroll; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var defaults = {
    width: "auto",
    height: "250px",
    size: "7px",
    color: "#000",
    position: "right",
    distance: "1px",
    start: "top",
    opacity: .4,
    transition: .3,
    alwaysVisible: false,
    disableFadeOut: false,
    railVisible: false,
    railColor: "#333",
    railOpacity: .2,
    railClass: "slimScrollRail",
    barClass: "slimScrollBar",
    wrapperClass: "slimScrollDiv",
    allowPageScroll: false,
    wheelStep: 20,
    touchScrollStep: 200,
    borderRadius: "7px",
    railBorderRadius: "7px",
    scrollTo: 0
};
var SlimScroll = (function () {
    function SlimScroll(renderer, elementRef) {
        this._minBarHeight = 30;
        this._releaseScroll = false;
        this._renderer = renderer;
        this._me = elementRef.nativeElement;
        this._options = Object.assign({}, defaults);
    }
    SlimScroll.prototype.ngOnInit = function () {
        this.init();
    };
    SlimScroll.prototype.ngOnDestroy = function () {
        if (this._changesTracker) {
            clearInterval(this._changesTracker);
        }
    };
    SlimScroll.prototype.onResize = function () {
        this.init();
    };
    Object.defineProperty(SlimScroll.prototype, "width", {
        set: function (value) {
            this._options.width = value || defaults.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "height", {
        set: function (value) {
            this._options.height = value || defaults.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "size", {
        set: function (value) {
            this._options.size = value || defaults.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "color", {
        set: function (value) {
            this._options.color = value || defaults.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "position", {
        set: function (value) {
            this._options.position = value || defaults.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "distance", {
        set: function (value) {
            this._options.distance = value || defaults.distance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "start", {
        set: function (value) {
            this._options.start = value || defaults.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "opacity", {
        set: function (value) {
            this._options.opacity = value || defaults.opacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "transition", {
        set: function (value) {
            this._options.transition = value || defaults.transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "alwaysVisible", {
        set: function (value) {
            this._options.alwaysVisible = value || defaults.alwaysVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "disableFadeOut", {
        set: function (value) {
            this._options.disableFadeOut = value || defaults.disableFadeOut;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railVisible", {
        set: function (value) {
            this._options.railVisible = value || defaults.railVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railColor", {
        set: function (value) {
            this._options.railColor = value || defaults.railColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railOpacity", {
        set: function (value) {
            this._options.railOpacity = value || defaults.railOpacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railClass", {
        set: function (value) {
            this._options.railClass = value || defaults.railClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "barClass", {
        set: function (value) {
            this._options.barClass = value || defaults.barClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "wrapperClass", {
        set: function (value) {
            this._options.wrapperClass = value || defaults.wrapperClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "allowPageScroll", {
        set: function (value) {
            this._options.allowPageScroll = value || defaults.allowPageScroll;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "wheelStep", {
        set: function (value) {
            this._options.wheelStep = value || defaults.wheelStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "touchScrollStep", {
        set: function (value) {
            this._options.touchScrollStep = value || defaults.touchScrollStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "borderRadius", {
        set: function (value) {
            this._options.borderRadius = value || defaults.borderRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railBorderRadius", {
        set: function (value) {
            this._options.railBorderRadius = value || defaults.railBorderRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "scrollTo", {
        set: function (value) {
            this._options.scrollTo = value || defaults.scrollTo;
        },
        enumerable: true,
        configurable: true
    });
    SlimScroll.prototype.trackPanelHeightChanged = function () {
        var _this = this;
        this._previousHeight = this._me.scrollHeight;
        this._changesTracker = setInterval(function () {
            if (_this._previousHeight !== _this._me.scrollHeight) {
                _this._previousHeight = _this._me.scrollHeight;
                _this.init();
            }
        }, 1000);
    };
    SlimScroll.prototype.hasParentClass = function (e, className) {
        if (!e) {
            return false;
        }
        if (e.classList.contains(this._options.wrapperClass)) {
            return true;
        }
        return this.hasParentClass(e.parentElement, className);
    };
    SlimScroll.prototype.onWheel = function (e) {
        // use mouse wheel only when mouse is over
        if (!this._isOverPanel) {
            return;
        }
        var delta = 0;
        if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
        }
        if (e.detail) {
            delta = e.detail / 3;
        }
        var target = e.target || e.currentTarget || e.relatedTarget;
        if (this.hasParentClass(target, this._options.wrapperClass)) {
            // scroll content
            this.scrollContent(delta, true);
        }
        // stop window scroll
        if (e.preventDefault && !this._releaseScroll) {
            e.preventDefault();
        }
        if (!this._releaseScroll) {
            e.returnValue = false;
        }
    };
    SlimScroll.prototype.attachWheel = function (target) {
        var _this = this;
        if (window.addEventListener) {
            target.addEventListener("DOMMouseScroll", function (e) { return _this.onWheel(e); }, false);
            target.addEventListener("mousewheel", function (e) { return _this.onWheel(e); }, false);
        }
        else {
            document.addEventListener("mousewheel", function (e) { return _this.onWheel(e); }, false);
        }
    };
    SlimScroll.prototype.showBar = function () {
        // recalculate bar height
        this.getBarHeight();
        clearTimeout(this._queueHide);
        // when bar reached top or bottom
        if (this._percentScroll === ~~this._percentScroll) {
            // release wheel
            this._releaseScroll = this._options.allowPageScroll;
        }
        else {
            this._releaseScroll = false;
        }
        this._lastScroll = this._percentScroll;
        // show only when required
        if (this._barHeight >= this._me.offsetHeight) {
            // allow window scroll
            this._releaseScroll = true;
            return;
        }
        this._renderer.setElementStyle(this._bar, "opacity", this._options.opacity.toString());
        this._renderer.setElementStyle(this._rail, "opacity", this._options.railOpacity.toString());
    };
    SlimScroll.prototype.hideBar = function () {
        var _this = this;
        // only hide when options allow it
        if (!this._options.alwaysVisible) {
            this._queueHide = setTimeout(function () {
                if (!(_this._options.disableFadeOut && _this._isOverPanel) && !_this._isOverBar && !_this._isDragg) {
                    _this._renderer.setElementStyle(_this._bar, "opacity", "0");
                    _this._renderer.setElementStyle(_this._rail, "opacity", "0");
                }
            }, 1000);
        }
    };
    SlimScroll.prototype.scrollContent = function (y, isWheel, isJump) {
        if (isJump === void 0) { isJump = false; }
        this._releaseScroll = false;
        var delta = y;
        var maxTop = this._me.offsetHeight - this._bar.offsetHeight;
        if (isWheel) {
            // move bar with mouse wheel
            delta = parseInt(this._bar.style.top, 10) + y * this._options.wheelStep / 100 * this._bar.offsetHeight;
            // move bar, make sure it doesn"t go out
            delta = Math.min(Math.max(delta, 0), maxTop);
            // if scrolling down, make sure a fractional change to the
            // scroll position isn"t rounded away when the scrollbar"s CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
            // scroll the scrollbar
            this._renderer.setElementStyle(this._bar, "top", delta + "px");
        }
        // calculate actual scroll amount
        this._percentScroll = parseInt(this._bar.style.top, 10) / (this._me.offsetHeight - this._bar.offsetHeight);
        delta = this._percentScroll * (this._me.scrollHeight - this._me.offsetHeight);
        if (isJump) {
            delta = y;
            var offsetTop = delta / this._me.scrollHeight * this._me.offsetHeight;
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            this._renderer.setElementStyle(this._bar, "top", offsetTop + "px");
        }
        // scroll content
        this._me.scrollTop = delta;
        // ensure bar is visible
        this.showBar();
        // trigger hide when scroll is stopped
        this.hideBar();
    };
    SlimScroll.prototype.getBarHeight = function () {
        // calculate scrollbar height and make sure it is not too small
        this._barHeight = Math.max(this._me.offsetHeight / (this._me.scrollHeight === 0 ? 1 : this._me.scrollHeight) * this._me.offsetHeight, this._minBarHeight);
        this._renderer.setElementStyle(this._bar, "height", this._barHeight + "px");
        // hide scrollbar if content is not long enough
        var display = this._barHeight === this._me.offsetHeight ? "none" : "block";
        this._renderer.setElementStyle(this._bar, "display", display);
    };
    SlimScroll.prototype.refresh = function () {
        this.getBarHeight();
        // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
        if ("height" in this._options && this._options.height === "auto") {
            this._renderer.setElementStyle(this._me.parentElement, "height", "auto");
            this._renderer.setElementStyle(this._me, "height", "auto");
            var height = this._me.parentElement.clientHeight;
            this._renderer.setElementStyle(this._me.parentElement, "height", height + "px");
            this._renderer.setElementStyle(this._me, "height", height + "px");
        }
        else if ("height" in this._options) {
            var h = this._options.height;
            this._renderer.setElementStyle(this._me.parentElement, "height", h);
            this._renderer.setElementStyle(this._me, "height", h);
        }
    };
    SlimScroll.prototype.setup = function () {
        var _this = this;
        // wrap content
        var wrapper = document.createElement("div");
        this._renderer.setElementClass(wrapper, this._options.wrapperClass, true);
        this._renderer.setElementStyle(wrapper, "position", "relative");
        this._renderer.setElementStyle(wrapper, "overflow", "hidden");
        this._renderer.setElementStyle(wrapper, "width", this._options.width);
        this._renderer.setElementStyle(wrapper, "height", this._options.height);
        // update style for the div
        this._renderer.setElementStyle(this._me, "overflow", "hidden");
        this._renderer.setElementStyle(this._me, "width", this._options.width);
        this._renderer.setElementStyle(this._me, "height", this._options.height);
        // create scrollbar rail
        this._rail = document.createElement("div");
        this._renderer.setElementClass(this._rail, this._options.railClass, true);
        this._renderer.setElementStyle(this._rail, "width", this._options.size);
        this._renderer.setElementStyle(this._rail, "height", "100%");
        this._renderer.setElementStyle(this._rail, "position", "absolute");
        this._renderer.setElementStyle(this._rail, "top", "0");
        this._renderer.setElementStyle(this._rail, "display", this._options.railVisible ? "block" : "none");
        this._renderer.setElementStyle(this._rail, "border-radius", this._options.railBorderRadius);
        this._renderer.setElementStyle(this._rail, "background", this._options.railColor);
        this._renderer.setElementStyle(this._rail, "opacity", this._options.railOpacity.toString());
        this._renderer.setElementStyle(this._rail, "transition", "opacity " + this._options.transition + "s");
        this._renderer.setElementStyle(this._rail, "z-index", "90");
        // create scrollbar
        this._bar = document.createElement("div");
        this._renderer.setElementClass(this._bar, this._options.barClass, true);
        this._renderer.setElementStyle(this._bar, "background", this._options.color);
        this._renderer.setElementStyle(this._bar, "width", this._options.size);
        this._renderer.setElementStyle(this._bar, "position", "absolute");
        this._renderer.setElementStyle(this._bar, "top", "0");
        this._renderer.setElementStyle(this._bar, "opacity", this._options.opacity.toString());
        this._renderer.setElementStyle(this._bar, "transition", "opacity " + this._options.transition + "s");
        this._renderer.setElementStyle(this._bar, "display", this._options.alwaysVisible ? "block" : "none");
        this._renderer.setElementStyle(this._bar, "border-radius", this._options.borderRadius);
        this._renderer.setElementStyle(this._bar, "webkit-border-radius", this._options.borderRadius);
        this._renderer.setElementStyle(this._bar, "moz-border-radius", this._options.borderRadius);
        this._renderer.setElementStyle(this._bar, "z-index", "99");
        // set position
        if (this._options.position === "right") {
            this._renderer.setElementStyle(this._rail, "right", this._options.distance);
            this._renderer.setElementStyle(this._bar, "right", this._options.distance);
        }
        else {
            this._renderer.setElementStyle(this._rail, "left", this._options.distance);
            this._renderer.setElementStyle(this._bar, "left", this._options.distance);
        }
        // wrap it
        this._me.parentElement.insertBefore(wrapper, this._me);
        wrapper.appendChild(this._me);
        if (this._options.scrollTo > 0) {
            // jump to a static point
            var offset = this._options.scrollTo;
            // scroll content by the given offset
            this.scrollContent(offset, false, true);
        }
        // append to parent div
        this._me.parentElement.appendChild(this._bar);
        this._me.parentElement.appendChild(this._rail);
        this._bar.addEventListener("mousedown", function (e) {
            _this._isDragg = true;
            // disable text selection
            _this._renderer.setElementStyle(document.querySelector('body'), "-webkit-user-select", "none");
            _this._renderer.setElementStyle(document.querySelector('body'), "-moz-user-select", "none");
            _this._renderer.setElementStyle(document.querySelector('body'), "-ms-user-select", "none");
            _this._renderer.setElementStyle(document.querySelector('body'), "user-select", "none");
            var t = parseFloat(_this._bar.style.top);
            var pageY = e.pageY;
            var mousemoveEvent = function (event) {
                var currTop = t + event.pageY - pageY;
                _this._renderer.setElementStyle(_this._bar, "top", (currTop >= 0 ? currTop : 0) + "px");
                var position = _this._bar.getClientRects()[0];
                if (position) {
                    _this.scrollContent(0, position.top > 0);
                }
            };
            var mouseupEvent = function () {
                _this._isDragg = false;
                // return normal text selection
                _this._renderer.setElementStyle(document.querySelector('body'), "-webkit-user-select", "initial");
                _this._renderer.setElementStyle(document.querySelector('body'), "-moz-user-select", "initial");
                _this._renderer.setElementStyle(document.querySelector('body'), "-ms-user-select", "initial");
                _this._renderer.setElementStyle(document.querySelector('body'), "user-select", "initial");
                _this.hideBar();
                document.removeEventListener("mousemove", mousemoveEvent, false);
                document.removeEventListener("mouseup", mouseupEvent, false);
            };
            document.addEventListener("mousemove", mousemoveEvent, false);
            document.addEventListener("mouseup", mouseupEvent, false);
            return false;
        }, false);
        // on rail over
        this._rail.addEventListener("mouseenter", function () { return _this.showBar(); }, false);
        this._rail.addEventListener("mouseleave", function () { return _this.hideBar(); }, false);
        // on bar over
        this._bar.addEventListener("mouseenter", function () { return _this._isOverBar = true; }, false);
        this._bar.addEventListener("mouseleave", function () { return _this._isOverBar = false; }, false);
        // show on parent mouseover
        this._me.addEventListener("mouseenter", function () {
            _this._isOverPanel = true;
            _this.showBar();
            _this.hideBar();
        }, false);
        this._me.addEventListener("mouseleave", function () {
            _this._isOverPanel = false;
            _this.hideBar();
        }, false);
        // support for mobile
        this._me.addEventListener("touchstart", function (e) {
            if (e.touches.length) {
                // record where touch started
                _this._touchDif = e.touches[0].pageY;
            }
        }, false);
        this._me.addEventListener("touchmove", function (e) {
            // prevent scrolling the page if necessary
            if (!_this._releaseScroll) {
                e.preventDefault();
            }
            if (e.touches.length) {
                // see how far user swiped
                var diff = (_this._touchDif - e.touches[0].pageY) / _this._options.touchScrollStep;
                // scroll content
                _this.scrollContent(diff, true);
                _this._touchDif = e.touches[0].pageY;
            }
        }, false);
        // set up initial height
        this.getBarHeight();
        // hide bar on init if alwaysVisible equal false
        this.hideBar();
        // check start position
        if (this._options.start === "bottom") {
            // scroll content to bottom
            this._renderer.setElementStyle(this._bar, "top", this._me.offsetHeight - this._bar.offsetHeight + "px");
            this.scrollContent(0, true);
        }
        // attach scroll events
        this.attachWheel(window);
        // check whether it changes in content
        this.trackPanelHeightChanged();
    };
    SlimScroll.prototype.init = function () {
        // ensure we are not binding it again
        if (this._bar && this._rail) {
            this.refresh();
        }
        else {
            this.setup();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:resize", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SlimScroll.prototype, "onResize", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "width", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "height", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "size", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "color", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "position", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "distance", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "start", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "opacity", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "transition", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "alwaysVisible", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "disableFadeOut", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "railVisible", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "railColor", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "railOpacity", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "railClass", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "barClass", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "wrapperClass", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "allowPageScroll", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "wheelStep", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "touchScrollStep", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "borderRadius", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "railBorderRadius", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "scrollTo", null);
    SlimScroll = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: "[slimScroll]"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _b) || Object])
    ], SlimScroll);
    return SlimScroll;
    var _a, _b;
}());
//# sourceMappingURL=slimscroll.directive.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatesLoader; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TemplatesLoader = (function () {
    function TemplatesLoader(authService) {
        this.authService = authService;
        this.callbacks = [];
        var cssId = ('cssInject' + __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].randomInteger()), cssEl = document.getElementById(cssId);
        if (!cssEl) {
            cssEl = document.createElement('style');
            cssEl.id = cssId;
            cssEl.setAttribute('type', 'text/css');
            document.head.appendChild(cssEl);
        }
        this.cssElement = cssEl;
    }
    TemplatesLoader.prototype.ngOnInit = function () {
        var _this = this;
        var model = this.model, _DIR = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.DIR;
        if (!model || isNaN(this.templateType))
            return;
        var fileType = _DIR.PROJECT_TEMPLATE.HTML, _template = _DIR.PROJECT_TEMPLATE.NAME + _DIR.PROJECT_TEMPLATE.TYPES[this.templateType], htmlUrl = _template + fileType, cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;
        if (model.templates.indexOf(this.templateType) > -1 && model.projFilesDirname) {
            _template = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].PROJ_LOC + model.projFilesDirname + _DIR.DELIMETER + _template.replace('assets/', '');
            var newT = '?time=' + Date.now();
            htmlUrl = _template + fileType + newT;
            cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS + newT;
        }
        //this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cssUrl);
        var _loop_1 = function(i, arr) {
            this_1.authService.get(arr[i].link).subscribe(function (res) {
                _this[arr[i]._f] = res._body;
                if (arr[i]._f == arr[1]._f)
                    _this.updateCss(res._body);
                if (_this[arr[0]._f] && _this[arr[1]._f]) {
                    for (var i_1 = 0; i_1 < _this.callbacks.length; i_1++) {
                        _this.callbacks.shift()();
                    }
                }
            });
        };
        var this_1 = this;
        for (var i = 0, arr = [{ link: htmlUrl, _f: 'htmlTemplate' }, { link: cssUrl, _f: 'cssUrl' }]; i < arr.length; i++) {
            _loop_1(i, arr);
        }
    };
    TemplatesLoader.prototype.updateCss = function (value) {
        if (value)
            this.cssElement.innerText = value;
    };
    TemplatesLoader.prototype.ngOnDestroy = function () {
        this.cssElement.parentNode.removeChild(this.cssElement);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], TemplatesLoader.prototype, "model", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], TemplatesLoader.prototype, "templateType", void 0);
    TemplatesLoader = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-template-loader',
            template: '<p></p>'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], TemplatesLoader);
    return TemplatesLoader;
    var _a;
}());
//# sourceMappingURL=templates.loader.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MTree; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MNode = (function () {
    function MNode() {
        this.IsExpanded = true;
    }
    MNode.prototype.toggle = function () {
        this.IsExpanded = !this.IsExpanded;
    };
    MNode.prototype.select = function (item) {
        this.mainParent.select(item);
    };
    MNode.prototype.delete = function () {
        var itemDroped = this.parent.areas.splice(this._iter, 1)[0];
        if (this.mainParent.selectedChild.glApp)
            this.mainParent.selectedChild.glApp._deleteArea(itemDroped);
        this.mainParent.select(this.parent);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MNode.prototype, "classes", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MNode.prototype, "lastE", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MNode.prototype, "arrow", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MNode.prototype, "item", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MNode.prototype, "parent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MNode.prototype, "mainParent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MNode.prototype, "_iter", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("iconBtn"), 
        __metadata('design:type', Object)
    ], MNode.prototype, "iconBtn", void 0);
    MNode = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'node',
            template: "\n<li [ngClass]=\"{'last-item':lastE}\">\n\n\t<div class =\"iconButton\"   [ngClass]=\"item._selected?classes+' active':classes\"  #iconBtn>\n\t    <a  (click)=\"select(item )\" >{{item.name}}</a>\n\t    <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"showPopUp\">\n          <i class=\"material-icons set-icon\" (click)=\"showPopUp = !showPopUp\">more_vert</i>\n        </div>\n\t</div>\n\t<div *ngIf=\"!arrow\" class=\"left-arrow\"></div>\n\t<div *ngIf=\"!arrow && lastE\" class=\"left-arrow end-list\"></div>\n\n\t    <div class=\"pop-up bla-t\" [hidden]=\"!showPopUp\" *ngIf=\"showPopUp\" (click)=\"showPopUp = !showPopUp\" >\n            <div class=\"pop-up-item\"  *ngIf=\"item.areas && item.areas.length\" (click)=\"IsExpanded = !IsExpanded\">\n              <i class=\"material-icons\">visibility</i>\n              <div class=\"pop-up-row-name\">\n                <span>{{IsExpanded?\"Hide\":\"Expand\"}}</span>\n              </div>\n            </div>\n            <div class=\"pop-up-item\" (click)=\"delete()\" *ngIf=\"item._id != parent._id\">\n              <i class=\"material-icons\">delete</i>\n              <div class=\"pop-up-row-name\">\n                <span>Delete</span>\n              </div>\n            </div>\n        </div>\n\t<div *ngIf=\"IsExpanded\">\n        <ul *ngIf=\"item.areas\" class=\"tree-webgl-view\">\n              <node  *ngFor=\"let subitem of item.areas; let itT = index\"  [_iter]=\"index\" [classes]=\"subitem._category===0?'js-code':subitem._category==1?'link':'' \" [mainParent]=\"mainParent\"  [parent]=\"item\" [item]=\"subitem\" [lastE]=\"itT == item.areas.length-1\"></node>\n        </ul>\n\t</div>\n</li>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], MNode);
    return MNode;
}());
var MTree = (function () {
    function MTree() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], MTree.prototype, "data", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], MTree.prototype, "mainParent", void 0);
    MTree = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tree',
            template: "\n<ul class=\"tree-webgl-view first\"  >\n\t\t<node *ngFor=\"let item of data\" [arrow]=\"1\" [classes]=\"'main'\" [parent]=\"item\" [mainParent]=\"mainParent\" [item]=\"item\"     ></node>\n</ul>\n",
            styles: [__webpack_require__(810)]
        }), 
        __metadata('design:paramtypes', [])
    ], MTree);
    return MTree;
}());
//# sourceMappingURL=tree.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_entities__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadFile; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploadFile = (function () {
    function UploadFile() {
        this.accept = '';
    }
    UploadFile.prototype.ngOnInit = function () {
        var _this = this;
        var fileTag = this.fileUpload['nativeElement'];
        fileTag.addEventListener('change', function (e) {
            var files = e.target.files;
            if (!files.length)
                return;
            _this.files = [];
            var _loop_1 = function(i) {
                if (_this.category) {
                    if (_this.category instanceof Array) {
                        var _fType = files[i].name.split(".");
                        _fType = _fType[_fType.length - 1];
                        files[i].category = _this.category = __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.STORAGE.SVG_FILE.match(_fType) ? __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_SVG : __WEBPACK_IMPORTED_MODULE_1__entities_entities__["c" /* Config */].FILE.TYPE.MODEL_OBJ;
                    }
                    else {
                        files[i].category = _this.category;
                    }
                }
                var _multiaC = _this.accept.split(",");
                if (_multiaC.length > 1) {
                    _multiaC.forEach(function (e) {
                        if (files[i].name.match(e) || files[i].type.match(e))
                            _this.files.push(files[i]);
                    });
                }
                else {
                    if (files[i].name.match(_this.accept) || files[i].type.match(_this.accept))
                        _this.files.push(files[i]);
                }
            };
            for (var i = 0; i < files.length; i++) {
                _loop_1(i);
            }
            if (!_this.files.length || !_this.inject || !_this.inject.onFilesSelected)
                return;
            _this.inject.onFilesSelected(_this.files);
        });
        this.btnFile['nativeElement'].addEventListener('click', function (e) {
            fileTag.click();
        });
        if (this.multiple)
            fileTag.setAttribute('multiple', '');
        if (this.required) {
            fileTag.setAttribute('name', 'fileTag' + Math.random());
            fileTag.setAttribute('required', true);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], UploadFile.prototype, "accept", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], UploadFile.prototype, "category", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], UploadFile.prototype, "multiple", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], UploadFile.prototype, "required", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], UploadFile.prototype, "title", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], UploadFile.prototype, "inject", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], UploadFile.prototype, "files", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("fileUpload"), 
        __metadata('design:type', Object)
    ], UploadFile.prototype, "fileUpload", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnFile"), 
        __metadata('design:type', Object)
    ], UploadFile.prototype, "btnFile", void 0);
    UploadFile = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-file-upload',
            template: '<input type="file" accept="{{accept}}"   [(ngModel)]="filesModel" #filesModels="ngModel" class="hidden" #fileUpload>' +
                ' <label [class.full-op]="filesModels.invalid"  [hidden] = "filesModels.valid">{{title}} is required</label> ' +
                '<div #btnFile class="btn-def">{{title}}</div>  <div class="list-files" *ngIf="files" [innerHTML]="files.toString()"></div>',
            styles: [__webpack_require__(811)]
        }), 
        __metadata('design:paramtypes', [])
    ], UploadFile);
    return UploadFile;
}());
//# sourceMappingURL=upload.file.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Main__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant_data__ = __webpack_require__(375);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ProjFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OxiCamera; });
/* unused harmony export Kompass */
/* unused harmony export Vector3 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return GeneralStructure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LinkGeneralStructure; });
/* unused harmony export PCash */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ModelStructure; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var ProjMain = (function (_super) {
    __extends(ProjMain, _super);
    function ProjMain(entity) {
        if (entity === void 0) { entity = { name: 'Child' }; }
        _super.call(this, entity);
        this.copyS(entity);
        this._category = __WEBPACK_IMPORTED_MODULE_1__constant_data__["a" /* Config */].PROJ_DESTINATION[this.constructor.name];
    }
    ProjMain.prototype.clone = function () {
        var noClone = ['glApp', 'sourcesApp', 'cash', 'canEdit', '_selected', 'hasChanges', 'hasRecalcChanges', 'parent'], acceptType = ['boolean', 'string', 'number'];
        function cloneObject(obj) {
            var temp = obj instanceof Array ? [] : {};
            for (var i in obj) {
                if (noClone.indexOf(i) > -1)
                    continue;
                else if (typeof (obj[i]) == "object" && obj[i] != null)
                    temp[i] = cloneObject(obj[i]);
                else if (obj.hasOwnProperty(i) && acceptType.indexOf(typeof obj[i]) > -1)
                    temp[i] = obj[i];
            }
            return temp;
        }
        return cloneObject(this);
    };
    ProjMain.prototype.copyS = function (entity) {
        if (entity === void 0) { entity = {}; }
        var _self = this, noClone = ['File'];
        function cloneObject(obj) {
            var temp = obj instanceof Array ? [] : _self || entity;
            for (var i in obj) {
                if (typeof (obj[i]) == "object" && obj[i] != null && noClone.indexOf(obj[i].constructor.name) < 0)
                    temp[i] = (obj[i] instanceof Array ? cloneObject(obj[i]) : (ProjMain.inject(obj[i])));
                else
                    temp[i] = obj[i];
            }
            return temp;
        }
        return cloneObject(entity);
    };
    ProjMain.inject = function (obj) {
        switch (obj._category) {
            case __WEBPACK_IMPORTED_MODULE_1__constant_data__["a" /* Config */].PROJ_DESTINATION.LinkGeneralStructure:
                return new LinkGeneralStructure(obj);
            case __WEBPACK_IMPORTED_MODULE_1__constant_data__["a" /* Config */].PROJ_DESTINATION.ModelStructure:
                return new ModelStructure(obj);
            case __WEBPACK_IMPORTED_MODULE_1__constant_data__["a" /* Config */].PROJ_DESTINATION.OxiCamera:
                return new OxiCamera(obj);
            case __WEBPACK_IMPORTED_MODULE_1__constant_data__["a" /* Config */].PROJ_DESTINATION.Vector3:
                return new Vector3(obj);
            default:
                return new GeneralStructure(obj);
        }
    };
    return ProjMain;
}(__WEBPACK_IMPORTED_MODULE_0__Main__["a" /* Main */]));
var ProjFile = (function (_super) {
    __extends(ProjFile, _super);
    function ProjFile(entity) {
        _super.call(this, entity);
    }
    return ProjFile;
}(ProjMain));
var OxiCamera = (function (_super) {
    __extends(OxiCamera, _super);
    function OxiCamera(entity) {
        if (entity === void 0) { entity = {}; }
        _super.call(this, entity);
        if (!this.fov)
            this.fov = 30;
        if (!this.scale)
            this.scale = 1;
        if (!this.resolution)
            this.resolution = new Vector3();
        if (!this.size)
            this.size = 36;
        if (!this.lens)
            this.lens = 19;
        if (!this.frameState)
            this.frameState = {};
        if (!this.opacity)
            this.opacity = 0.7;
        if (!this.kompass)
            this.kompass = new Kompass();
        if (this.isSVG === undefined)
            this.isSVG = false;
        if (this.showZoomHelper === undefined)
            this.showZoomHelper = true;
    }
    return OxiCamera;
}(ProjMain));
var Kompass = (function (_super) {
    __extends(Kompass, _super);
    function Kompass(a) {
        if (a === void 0) { a = {}; }
        _super.call(this, a);
        if (!this.angle)
            this.angle = 0;
        if (!this.enabled !== false)
            this.enabled = true;
    }
    return Kompass;
}(ProjMain));
var Vector3 = (function (_super) {
    __extends(Vector3, _super);
    function Vector3(entity) {
        if (entity === void 0) { entity = {}; }
        _super.call(this, entity);
    }
    return Vector3;
}(ProjMain));
var GeneralStructure = (function (_super) {
    __extends(GeneralStructure, _super);
    function GeneralStructure(entity) {
        _super.call(this, entity);
    }
    return GeneralStructure;
}(ProjMain));
var LinkGeneralStructure = (function (_super) {
    __extends(LinkGeneralStructure, _super);
    function LinkGeneralStructure(entity) {
        _super.call(this, entity);
    }
    return LinkGeneralStructure;
}(GeneralStructure));
var PCash = (function () {
    function PCash() {
        this.images = [];
    }
    return PCash;
}());
var ModelStructure = (function (_super) {
    __extends(ModelStructure, _super);
    function ModelStructure(entity) {
        if (entity === void 0) { entity = {}; }
        _super.call(this, entity);
        this._selected = false;
        this.canEdit = false;
        this.cash = new PCash();
        if (!this.images)
            this.images = [];
        if (!this.alignImages)
            this.alignImages = [];
        if (!this.camera)
            this.camera = new OxiCamera();
        if (!this.currentItem)
            this.currentItem = 0;
        if (!this.templates)
            this.templates = [];
        this.currentItem = +this.currentItem;
        this.currentItem0 = this.currentItem;
    }
    return ModelStructure;
}(GeneralStructure));
//# sourceMappingURL=ModelStructure.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Main__ = __webpack_require__(224);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProjectModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var ProjectModel = (function (_super) {
    __extends(ProjectModel, _super);
    function ProjectModel(entity) {
        if (entity === void 0) { entity = null; }
        _super.call(this, entity);
    }
    return ProjectModel;
}(__WEBPACK_IMPORTED_MODULE_0__Main__["a" /* Main */]));
var Project = (function (_super) {
    __extends(Project, _super);
    function Project(entity) {
        if (entity === void 0) { entity = null; }
        _super.call(this, entity);
    }
    return Project;
}(__WEBPACK_IMPORTED_MODULE_0__Main__["a" /* Main */]));
//# sourceMappingURL=Project.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NamePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NamePipe = (function () {
    function NamePipe(shareService) {
        this.shareService = shareService;
    }
    NamePipe.prototype.transform = function (items, name, sortType) {
        if (!name) {
            return this.sort(items, sortType);
        }
        if (items) {
            this.filteredList = items.filter(function (item) {
                if (item.firstName)
                    return ((item.firstName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1) || (item.secondName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1));
                return (item.title.toUpperCase().indexOf(name.toUpperCase(), 0) > -1);
            });
            return this.sort(this.filteredList, sortType);
        }
    };
    NamePipe.prototype.sort = function (array, type) {
        if (type == 'A-Z') {
            array.sort(function (a, b) {
                if (((a.firstName + a.secondName) || a.title) < ((b.firstName + b.secondName) || b.title)) {
                    return -1;
                }
                else if (((a.firstName + a.secondName) || a.title) > ((b.firstName + b.secondName) || b.title)) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if (type == 'Z-A') {
            array.sort(function (a, b) {
                if (((a.firstName + a.secondName) || a.title) > ((b.firstName + b.secondName) || b.title)) {
                    return -1;
                }
                else if (((a.firstName + a.secondName) || a.title) < ((b.firstName + b.secondName) || b.title)) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if (type == 'Newest to older') {
            array.sort(function (a, b) {
                if (a.created < b.created) {
                    return -1;
                }
                else if (a.created > b.created) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if (type == 'Older to newest') {
            array.sort(function (a, b) {
                if (a.created > b.created) {
                    return -1;
                }
                else if (a.created < b.created) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        this.shareService.setHeaderArr(array.length);
        return array;
    };
    NamePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'namefilter'
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object])
    ], NamePipe);
    return NamePipe;
    var _a;
}());
//# sourceMappingURL=name.pipe.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_logged_guard_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_home_home_component__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_home_projects_projects_component__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_home_users_users_component__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_home_project_project_component__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_home_project_basic_basic_project__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_project_source_source_project__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_home_project_costumization_costumization__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_home_project_preview_preview__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_preview_preview_project__ = __webpack_require__(369);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });













var routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_4__components_home_home_component__["a" /* HomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__["a" /* AuthGuardService */]],
        resolve: {
            user: __WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__["a" /* AuthGuardService */]
        },
        children: [
            {
                path: 'projects',
                component: __WEBPACK_IMPORTED_MODULE_5__components_home_projects_projects_component__["a" /* ProjectsComponent */]
            },
            {
                path: 'users',
                component: __WEBPACK_IMPORTED_MODULE_6__components_home_users_users_component__["a" /* UsersComponent */]
            },
            {
                path: 'project/:id',
                component: __WEBPACK_IMPORTED_MODULE_7__components_home_project_project_component__["a" /* ProjectComponent */],
                children: [
                    {
                        path: '',
                        redirectTo: 'basic',
                        pathMatch: 'full'
                    },
                    {
                        path: 'basic',
                        component: __WEBPACK_IMPORTED_MODULE_8__components_home_project_basic_basic_project__["a" /* BasicProject */]
                    },
                    {
                        path: 'costumization',
                        component: __WEBPACK_IMPORTED_MODULE_10__components_home_project_costumization_costumization__["b" /* Costumization */]
                    },
                    {
                        path: 'source',
                        component: __WEBPACK_IMPORTED_MODULE_9__components_home_project_source_source_project__["a" /* SourceProject */]
                    },
                    {
                        path: 'preview',
                        component: __WEBPACK_IMPORTED_MODULE_11__components_home_project_preview_preview__["a" /* PreviewProject */]
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_1__services_logged_guard_service__["a" /* LoggedGuardService */]]
    },
    {
        path: 'preview',
        component: __WEBPACK_IMPORTED_MODULE_12__components_preview_preview_project__["a" /* PreviewSceneComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__components_preview_preview_project__["b" /* PreviewSceneService */]]
    },
    {
        path: "**",
        redirectTo: '/users'
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=router.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".app-wrap {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-aside {\n  position: fixed;\n  z-index: 2000;\n  top: 0;\n  left: 0;\n  display: inline-block;\n  float: left;\n  width: 260px;\n  height: 100%;\n  background-color: #ffffff;\n  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n  app-aside header {\n    width: 100%;\n    height: 160px;\n    background-color: #1976D2;\n    padding: 20px;\n    color: #ffffff; }\n    app-aside header .asd-hd-top {\n      width: 100%;\n      height: 64px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside header .asd-hd-top .asd-name-in {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        width: 60px;\n        height: 60px;\n        border-radius: 50%;\n        background: no-repeat;\n        background-position: 50% 50%;\n        background-size: auto 100%;\n        background-color: #ffffff;\n        font-family: Roboto-Light;\n        font-size: 20px;\n        color: #181818; }\n      app-aside header .asd-hd-top .asd-status-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: end;\n            -ms-flex-align: end;\n                align-items: flex-end; }\n        app-aside header .asd-hd-top .asd-status-wrap i {\n          height: 16px;\n          width: 20px;\n          line-height: 0.7; }\n        app-aside header .asd-hd-top .asd-status-wrap .asd-status {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          width: 80px;\n          height: 24px;\n          background-color: rgba(255, 255, 255, 0.1);\n          border-radius: 100px;\n          font-size: 12px;\n          font-family: Roboto-Medium; }\n    app-aside header .asd-hd-bot {\n      width: 100%;\n      height: 60px;\n      padding-top: 21px;\n      font-size: 14px; }\n      app-aside header .asd-hd-bot .asd-email-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-aside header .asd-hd-bot .asd-email-wrap .asd-email {\n          font-family: Roboto-Light;\n          opacity: 0.4; }\n  app-aside .pop-up {\n    width: 100%;\n    height: 160px;\n    padding: 20px 0;\n    border-bottom: 2px solid #D6D5D5;\n    box-shadow: none;\n    border-radius: 0; }\n    app-aside .pop-up .pop-up-item i {\n      margin-right: 32px; }\n    app-aside .pop-up .pop-up-item .pop-up-num {\n      font-size: 13px; }\n    app-aside .pop-up .asd-active {\n      color: #1976D2;\n      background-color: rgba(25, 118, 210, 0.1); }\n  app-aside footer {\n    width: 100%;\n    height: calc( 100% - 320px);\n    padding: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    font-size: 15px;\n    color: #9B9B9B; }\n    app-aside footer .asd-logout {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-aside footer .asd-logout i {\n        margin-right: 30px; }\n    app-aside footer .asd-terms {\n      width: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside footer .asd-terms a {\n        text-decoration: underline;\n        font-size: 13px;\n        color: #9B9B9B; }\n      app-aside footer .asd-terms img {\n        width: 88px;\n        -webkit-filter: invert(40%) grayscale(100%);\n                filter: invert(40%) grayscale(100%); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: calc(100% - 70px);\n  height: 90px;\n  padding: 0 30px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-item-align: end;\n      align-self: flex-end;\n  -webkit-transition: margin .4s ease-in-out, width .4s ease-in-out;\n  transition: margin .4s ease-in-out, width .4s ease-in-out; }\n  app-header .header-wrap {\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-header .header-wrap span {\n      white-space: nowrap; }\n    app-header .header-wrap .header-tag {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 24px;\n      color: #444444;\n      line-height: 1; }\n      app-header .header-wrap .header-tag i {\n        margin-right: 24px; }\n      app-header .header-wrap .header-tag span {\n        font-size: 12px;\n        color: #FFA000; }\n      app-header .header-wrap .header-tag .arr-info {\n        color: #9B9B9B;\n        margin-left: 10px; }\n      app-header .header-wrap .header-tag .header-title-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start; }\n    app-header .header-wrap .header-main {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: end;\n          -ms-flex-pack: end;\n              justify-content: flex-end; }\n      app-header .header-wrap .header-main .header-search {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        height: 40px;\n        width: 100%;\n        min-width: 150px;\n        margin: 0 60px;\n        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.12); }\n        app-header .header-wrap .header-main .header-search input {\n          width: 100%;\n          font-size: 16px; }\n          app-header .header-wrap .header-main .header-search input::-webkit-input-placeholder {\n            color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-search input::-moz-placeholder {\n            color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-search input:-ms-input-placeholder {\n            color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-search input:-moz-placeholder {\n            color: #4D4D4E; }\n      app-header .header-wrap .header-main .header-sort {\n        height: 100%;\n        width: 270px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        font-size: 15px; }\n        app-header .header-wrap .header-main .header-sort .sort-select {\n          position: relative;\n          margin-left: 20px;\n          width: 184px;\n          height: 40px;\n          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);\n          border-radius: 2px;\n          color: #9B9B9B;\n          -webkit-transition: box-shadow .3s;\n          transition: box-shadow .3s; }\n          app-header .header-wrap .header-main .header-sort .sort-select .sort-present {\n            width: 100%;\n            height: 100%;\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: justify;\n                -ms-flex-pack: justify;\n                    justify-content: space-between;\n            padding: 0 20px;\n            cursor: pointer; }\n          app-header .header-wrap .header-main .header-sort .sort-select .pop-up {\n            width: 184px;\n            position: absolute;\n            z-index: 200;\n            top: 45px; }\n            app-header .header-wrap .header-main .header-sort .sort-select .pop-up .pop-up-item {\n              height: 30px;\n              padding: 5px 20px; }\n              app-header .header-wrap .header-main .header-sort .sort-select .pop-up .pop-up-item .sort-selected {\n                color: #EBEBEB; }\n          app-header .header-wrap .header-main .header-sort .sort-select:hover {\n            box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1); }\n        app-header .header-wrap .header-main .header-sort .sort-active {\n          color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-sort .sort-active i {\n            color: #1976D2; }\n      app-header .header-wrap .header-main .pop-up-icon {\n        height: 40px;\n        width: 40px; }\n        app-header .header-wrap .header-main .pop-up-icon .set-icon {\n          font-size: 29px; }\n        app-header .header-wrap .header-main .pop-up-icon .pop-up {\n          position: absolute;\n          z-index: 100;\n          right: 0;\n          top: 50px;\n          width: 200px;\n          height: 100px; }\n      app-header .header-wrap .header-main .header-main-mnu {\n        margin: 0 10px;\n        height: 100%;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        app-header .header-wrap .header-main .header-main-mnu .mnu-item {\n          height: 100%;\n          cursor: pointer;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          padding: 0 20px;\n          border: 3px solid transparent; }\n          app-header .header-wrap .header-main .header-main-mnu .mnu-item:hover {\n            color: #1976D2; }\n        app-header .header-wrap .header-main .header-main-mnu .mnu-item-active {\n          color: #1976D2;\n          border-bottom-color: #1976D2; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-home {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative; }\n  app-home .main-content {\n    display: inline-block;\n    width: 100%;\n    height: calc(100% - 90px);\n    border-top: 2px solid #EBEBEB;\n    -webkit-transition: margin .4s ease-in-out, width .4s ease-in-out;\n    transition: margin .4s ease-in-out, width .4s ease-in-out;\n    overflow: auto; }\n  app-home .openedMenu {\n    margin-left: 260px;\n    width: calc(100% - 260px); }\n  app-home .menu-btn {\n    cursor: pointer;\n    position: absolute;\n    z-index: 1000;\n    top: 20px;\n    left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 50px;\n    height: 50px;\n    color: #ffffff;\n    border-radius: 50%;\n    background-color: #1976D2;\n    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2);\n    visibility: visible;\n    opacity: 1;\n    -webkit-transition: opacity .3s, visibility 0s .3s;\n    transition: opacity .3s, visibility 0s .3s; }\n  app-home .menu-btn-hide {\n    visibility: hidden;\n    opacity: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-basic-project {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  app-basic-project .half-basic-l, app-basic-project .half-basic-r {\n    width: 50%;\n    height: 100%;\n    padding-top: 60px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    app-basic-project .half-basic-l .basic-cont-wrap, app-basic-project .half-basic-r .basic-cont-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n      app-basic-project .half-basic-l .basic-cont-wrap .basic-inf, app-basic-project .half-basic-l .basic-cont-wrap .basic-prev, app-basic-project .half-basic-r .basic-cont-wrap .basic-inf, app-basic-project .half-basic-r .basic-cont-wrap .basic-prev {\n        font-size: 18px;\n        color: #444444; }\n      app-basic-project .half-basic-l .basic-cont-wrap .basic-inf, app-basic-project .half-basic-r .basic-cont-wrap .basic-inf {\n        padding: 0 30px;\n        margin-bottom: 15px; }\n      app-basic-project .half-basic-l .basic-cont-wrap .basic-prev, app-basic-project .half-basic-r .basic-cont-wrap .basic-prev {\n        padding: 0 10px;\n        margin-bottom: 40px; }\n      app-basic-project .half-basic-l .basic-cont-wrap app-project-view, app-basic-project .half-basic-r .basic-cont-wrap app-project-view {\n        width: 380px; }\n      app-basic-project .half-basic-l .basic-cont-wrap app-new-project .new-form, app-basic-project .half-basic-r .basic-cont-wrap app-new-project .new-form {\n        padding: 0 30px; }\n  app-basic-project .half-basic-r {\n    border-left: 2px solid #EBEBEB;\n    background-color: rgba(235, 235, 235, 0.3); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n.costumization {\n  padding: 0 10px;\n  color: #444444;\n  font-size: 16px;\n  line-height: 18px; }\n  .costumization .cos-preview {\n    padding: 20px;\n    height: calc(100vh - 93px);\n    overflow: auto; }\n  .costumization .cos-edit-body {\n    padding: 20px 15px;\n    overflow: auto;\n    background: #fdfdfd;\n    border: 1px solid #EBEBEB;\n    border-top: none;\n    height: calc(100vh - 152px);\n    min-height: 420px; }\n    .costumization .cos-edit-body .cos-item {\n      width: 0;\n      height: 0;\n      -webkit-transform: translateY(-60%);\n              transform: translateY(-60%);\n      position: absolute;\n      left: 0;\n      z-index: 0;\n      padding: 10px 15px;\n      opacity: 0;\n      -webkit-transition: opacity,-webkit-transform 0.2s linear;\n      transition: opacity,-webkit-transform 0.2s linear;\n      transition: opacity,transform 0.2s linear;\n      transition: opacity,transform 0.2s linear,-webkit-transform 0.2s linear; }\n      .costumization .cos-edit-body .cos-item.active {\n        opacity: 1;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n        width: 100%;\n        z-index: 1; }\n      .costumization .cos-edit-body .cos-item .w3-bar .w3-button:hover {\n        color: #fff;\n        background: #d6d6d6; }\n      .costumization .cos-edit-body .cos-item .w3-bar .w3-button.active {\n        color: #fff;\n        background-color: #5D5D5E;\n        border-radius: 2px 2px 0 0; }\n      .costumization .cos-edit-body .cos-item .cos-code {\n        overflow: auto;\n        display: none;\n        min-height: 350px;\n        width: 100%; }\n        .costumization .cos-edit-body .cos-item .cos-code.active {\n          display: block; }\n  .costumization .cos-row {\n    padding: 0;\n    margin: 0; }\n    .costumization .cos-row:nth-child(2) {\n      background: #fdfdfd; }\n  .costumization .cos-header {\n    padding: 20px 15px;\n    border-bottom: 1px solid #EBEBEB; }\n    .costumization .cos-header.cos-t {\n      border-right: 1px solid #EBEBEB;\n      border-left: 1px solid #EBEBEB; }\n    .costumization .cos-header .btn-def {\n      float: right;\n      cursor: pointer;\n      color: #328AFB; }\n      .costumization .cos-header .btn-def:hover {\n        color: #77BBFF; }\n  .costumization .cos-list {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    position: absolute;\n    z-index: 2;\n    width: 100%;\n    background: #fff; }\n    .costumization .cos-list li {\n      background: #fff;\n      padding: 20px 15px;\n      -webkit-transition: color,0.2s linear,-webkit-transform;\n      transition: color,0.2s linear,-webkit-transform;\n      transition: transform,color,0.2s linear;\n      transition: transform,color,0.2s linear,-webkit-transform;\n      border-bottom: 1px solid #EBEBEB;\n      cursor: pointer; }\n      .costumization .cos-list li:hover {\n        border-color: #1976D2;\n        border-right: 1px solid;\n        color: #1976D2;\n        -webkit-transform: translateX(10px);\n                transform: translateX(10px); }\n        .costumization .cos-list li:hover polygon {\n          fill: #1976D2; }\n      .costumization .cos-list li.active {\n        border-color: #1976D2;\n        color: #1976D2; }\n      .costumization .cos-list li .mailicon {\n        float: right; }\n\n.w3-light-grey, .w3-hover-light-grey:hover, .w3-light-gray, .w3-hover-light-gray:hover {\n  color: #000 !important;\n  background-color: #f1f1f1 !important; }\n\n.w3-border-bottom {\n  border-bottom: 1px solid #ccc !important; }\n\n.w3-bar {\n  width: 100%;\n  overflow: hidden; }\n\n.w3-container:after, .w3-container:before, .w3-panel:after, .w3-panel:before, .w3-row:after, .w3-row:before, .w3-row-padding:after, .w3-row-padding:before, .w3-cell-row:before, .w3-cell-row:after, .w3-clear:after, .w3-clear:before, .w3-bar:before, .w3-bar:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.w3-bar .w3-button {\n  white-space: normal; }\n\n.w3-bar .w3-bar-item {\n  padding: 8px 16px;\n  float: left;\n  width: auto;\n  border: none;\n  outline: none;\n  display: block; }\n\n.w3-dark-grey, .w3-hover-dark-grey:hover, .w3-dark-gray, .w3-hover-dark-gray:hover {\n  color: #fff !important;\n  background-color: #616161 !important; }\n\n.w3-btn, .w3-button {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.w3-btn, .w3-button {\n  border: none;\n  display: inline-block;\n  outline: 0;\n  padding: 8px 16px;\n  vertical-align: middle;\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  background-color: inherit;\n  text-align: center;\n  cursor: pointer;\n  white-space: nowrap; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "iframe {\n  width: 1109.5px;\n  height: 624px;\n  vertical-align: middle;\n  top: 0;\n  min-height: 600px; }\n\n.tabs-view .model-config .inp-form input {\n  font-size: 12px;\n  padding: 10px 2px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "app-project {\n  height: 100%;\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n.model-config .row {\n  margin: 5px 0; }\n\n.model-config .inp-form input[type=checkbox] {\n  -webkit-transform: scale(2.5);\n          transform: scale(2.5);\n  width: initial;\n  display: block;\n  margin-top: 10px;\n  margin-left: 10px;\n  cursor: pointer; }\n\n.model-config .inp-form.col-lg-12 {\n  margin: 20px 0; }\n\n.model-config .inp-form label.full-op {\n  right: inherit; }\n\n.model-config .upload-list {\n  padding: 10px 0; }\n  .model-config .upload-list app-file-upload {\n    margin: 5px 0; }\n    .model-config .upload-list app-file-upload .btn-def, .model-config .upload-list app-file-upload .list-files {\n      width: 50%;\n      float: left; }\n    .model-config .upload-list app-file-upload .btn-def {\n      padding: 10px;\n      background: #ffffff; }\n    .model-config .upload-list app-file-upload .list-files {\n      padding: 13px 10px; }\n\n.model-config .files-top-block {\n  border-bottom: 1px solid #EBEBEB;\n  margin: 20px 0;\n  display: inline-block;\n  padding: 0 10px;\n  width: 100%;\n  margin-top: 10px; }\n  .model-config .files-top-block .input-wrap input {\n    margin-top: 0; }\n\n.bottom-block {\n  padding: 0 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__(51);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__auth_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_guard_service__ = __webpack_require__(225);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(65);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__project_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logged_guard_service__ = __webpack_require__(226);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__share_service__ = __webpack_require__(38);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage_service__ = __webpack_require__(81);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_service__ = __webpack_require__(20);
/* unused harmony namespace reexport */







//# sourceMappingURL=services.js.map

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n.my-btn {\n  padding: 0 6px 0 6px;\n  margin: 6px 8px 6px 8px;\n  border-radius: 3px;\n  font-size: 14px;\n  text-align: center;\n  text-transform: uppercase;\n  border: none;\n  outline: none;\n  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15); }\n  .my-btn.round {\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    background: #FFA000;\n    color: #ffffff;\n    float: right; }\n    .my-btn.round i {\n      display: table;\n      margin: auto; }\n  .my-btn:active {\n    margin-top: 15px; }\n  .my-btn:hover {\n    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3); }\n\n.source-creating {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n  .source-creating .input-wrap {\n    margin-bottom: 30px; }\n\n.tabs-view .tabs-blocks {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex; }\n\n.tabs-view .my-table tr:nth-child(1) td {\n  padding: 20px 30px; }\n  .tabs-view .my-table tr:nth-child(1) td.webgl-item {\n    padding: 0; }\n\n.tabs-view .my-table tr:nth-child(2) td {\n  height: calc(100vh - 160px);\n  overflow: auto; }\n\n.tabs-view .my-table td {\n  max-width: 0px;\n  padding: 10px 0;\n  -webkit-transition: width,display,0.1s;\n  transition: width,display,0.1s;\n  vertical-align: top; }\n  .tabs-view .my-table td .source-creating {\n    -webkit-transform: translate(-50%, 0%);\n            transform: translate(-50%, 0%);\n    position: relative;\n    background: #ffffff;\n    padding: 30px;\n    z-index: 3; }\n  .tabs-view .my-table td.s-tab {\n    background: rgba(128, 128, 128, 0.1); }\n    .tabs-view .my-table td.s-tab.webgl-item {\n      background: gray;\n      padding: 0;\n      margin: 0;\n      max-height: calc(100vh - 230px);\n      vertical-align: middle; }\n      .tabs-view .my-table td.s-tab.webgl-itemtd {\n        padding: 0; }\n    .tabs-view .my-table td.s-tab .add-btn {\n      position: relative;\n      outline: none;\n      border: none;\n      float: right;\n      right: 30px;\n      bottom: 0; }\n  .tabs-view .my-table td .webgl-view {\n    padding: 0;\n    margin: 0; }\n\n.tabs-view .my-table .tabs-header {\n  -webkit-transition: width,display,0.1s;\n  transition: width,display,0.1s;\n  border-bottom: 2px solid #EBEBEB; }\n  .tabs-view .my-table .tabs-header:nth-child(1) {\n    width: 305px; }\n  .tabs-view .my-table .tabs-header:nth-child(2) {\n    width: 370px; }\n  .tabs-view .my-table .tabs-header .temp-data {\n    display: inline-table;\n    width: 100%;\n    vertical-align: top; }\n    .tabs-view .my-table .tabs-header .temp-data .temp-header {\n      display: table-cell;\n      padding: 20px;\n      border-bottom: 2px solid #EBEBEB; }\n    .tabs-view .my-table .tabs-header .temp-data .tabs-body {\n      display: table-row; }\n      .tabs-view .my-table .tabs-header .temp-data .tabs-body .body-data {\n        display: block;\n        padding: 20px;\n        height: calc(100vh - 163px); }\n  .tabs-view .my-table .tabs-header .title, .tabs-view .my-table .tabs-header .text-btn {\n    display: inline; }\n  .tabs-view .my-table .tabs-header .title {\n    float: left; }\n  .tabs-view .my-table .tabs-header .text-btn {\n    float: right;\n    text-transform: uppercase;\n    cursor: pointer;\n    font-size: 16px;\n    color: #328AFB;\n    font-weight: 500;\n    -webkit-transition: opacity .5s;\n    transition: opacity .5s; }\n    .tabs-view .my-table .tabs-header .text-btn:hover {\n      opacity: 0.6; }\n  .tabs-view .my-table .tabs-header.no-width {\n    width: 10px;\n    text-align: center;\n    padding: 20px; }\n  .tabs-view .my-table .tabs-header img:hover {\n    cursor: pointer;\n    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3); }\n  .tabs-view .my-table .tabs-header:nth-child(2) {\n    background: rgba(128, 128, 128, 0.1); }\n\n.tabs-view .model-config .inp-form input {\n  width: 100%;\n  background: #ffffff;\n  font-size: 22px;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.13); }\n  .tabs-view .model-config .inp-form input[disabled] {\n    background: #CACACA; }\n\n.center-container {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  z-index: 2;\n  width: 100%;\n  height: 100%; }\n\n.img-slider-container img {\n  display: none;\n  width: 100%;\n  margin: auto; }\n  .img-slider-container img.active {\n    display: block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n.edit-form {\n  padding: 35px 30px 25px 30px; }\n  .edit-form .main-info {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    .edit-form .main-info .item-form {\n      width: 100%; }\n    .edit-form .main-info .item-photo {\n      position: relative;\n      margin-top: 30px;\n      width: 360px;\n      height: 260px; }\n      .edit-form .main-info .item-photo .photo {\n        width: 100%;\n        height: 220px;\n        border-radius: inherit; }\n      .edit-form .main-info .item-photo .photo-ctrl {\n        -webkit-box-pack: start;\n            -ms-flex-pack: start;\n                justify-content: flex-start; }\n      .edit-form .main-info .item-photo .photo-info {\n        display: inline-block;\n        position: absolute;\n        bottom: 1px;\n        right: 0; }\n  .edit-form .new-btns {\n    margin-top: 62px; }\n  .edit-form .text-btn {\n    text-transform: uppercase; }\n    .edit-form .text-btn:hover {\n      cursor: pointer;\n      color: #328AFB; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-new-project .new-form {\n  width: 420px;\n  height: 580px;\n  padding: 35px 30px 25px 30px; }\n  app-new-project .new-form .main-info {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    app-new-project .new-form .main-info .item-form {\n      width: 100%; }\n    app-new-project .new-form .main-info .item-photo {\n      position: relative;\n      margin-top: 30px;\n      width: 360px;\n      height: 260px; }\n      app-new-project .new-form .main-info .item-photo .photo {\n        width: 100%;\n        height: 220px;\n        border-radius: inherit; }\n      app-new-project .new-form .main-info .item-photo .photo-ctrl {\n        -webkit-box-pack: start;\n            -ms-flex-pack: start;\n                justify-content: flex-start; }\n      app-new-project .new-form .main-info .item-photo .photo-info {\n        display: inline-block;\n        position: absolute;\n        bottom: 1px;\n        right: 0; }\n  app-new-project .new-form .new-btns {\n    margin-top: 62px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 803:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-projects, .edit-form {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  app-projects main, .edit-form main {\n    width: 100%;\n    height: 100%;\n    padding: 30px 20px; }\n    app-projects main .projects-wrap, .edit-form main .projects-wrap {\n      width: 100%;\n      height: calc(100% - 56px); }\n      app-projects main .projects-wrap .projects-list, .edit-form main .projects-wrap .projects-list {\n        height: 100%;\n        width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-project-view {\n  padding: 0 10px 20px 10px;\n  height: 300px; }\n  app-project-view .project {\n    width: 100%;\n    height: 100%;\n    background-color: #ffffff;\n    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);\n    border-radius: 2px; }\n    app-project-view .project .project-content {\n      position: relative;\n      width: 100%;\n      height: 220px;\n      padding: 20px 0;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      color: #ffffff;\n      border-radius: 2px;\n      background-position: 50% 50%;\n      background-size: cover;\n      background-color: #4D4D4E;\n      font-size: 14px; }\n      app-project-view .project .project-content .project-ctrl-wrap {\n        width: 100%;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        padding: 0 0 0 20px; }\n        app-project-view .project .project-content .project-ctrl-wrap .unpublished {\n          font-weight: 500;\n          color: #FFA000; }\n        app-project-view .project .project-content .project-ctrl-wrap .project-ctrl {\n          width: 100%;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: end;\n              -ms-flex-pack: end;\n                  justify-content: flex-end;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center; }\n          app-project-view .project .project-content .project-ctrl-wrap .project-ctrl .pop-up-icon {\n            margin: 0 12px;\n            color: #ffffff; }\n            app-project-view .project .project-content .project-ctrl-wrap .project-ctrl .pop-up-icon .pop-up {\n              position: absolute;\n              z-index: 100;\n              right: 0;\n              top: 35px;\n              width: 170px;\n              height: 100px; }\n          app-project-view .project .project-content .project-ctrl-wrap .project-ctrl .pop-up-icon-active {\n            background-color: #9B9B9B; }\n      app-project-view .project .project-content .no-img {\n        cursor: default;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        opacity: 0.2;\n        font-size: 38px;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%); }\n      app-project-view .project .project-content .project-info {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        padding: 0 20px; }\n        app-project-view .project .project-content .project-info .project-title {\n          font-size: 24px; }\n        app-project-view .project .project-content .project-info .project-created {\n          opacity: 0.5; }\n    app-project-view .project .img-true {\n      background: -webkit-linear-gradient(top, rgba(13, 13, 13, 0) 0%, #101010 100%), 50% 50% no-repeat;\n      background: linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #101010 100%), 50% 50% no-repeat;\n      background-color: rgba(0, 0, 0, 0.3);\n      background-size: cover; }\n    app-project-view .project .project-bot {\n      width: 100%;\n      height: 60px;\n      padding: 15px 20px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 14px; }\n      app-project-view .project .project-bot .project-admin {\n        color: #9B9B9B;\n        width: 44px; }\n      app-project-view .project .project-bot .project-users {\n        width: calc(100% - 44px);\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-project-view .project .project-bot .project-users .project-user {\n          width: 50%;\n          padding-left: 20px;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center; }\n          app-project-view .project .project-bot .project-users .project-user .project-user-name {\n            width: calc(100% - 40px);\n            margin-left: 10px;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap; }\n          app-project-view .project .project-bot .project-users .project-user .project-user-img {\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: center;\n                -ms-flex-pack: center;\n                    justify-content: center;\n            color: #4A4A4A;\n            width: 30px;\n            height: 30px;\n            border-radius: 50%;\n            background: no-repeat;\n            background-position: 50% 50%;\n            background-size: auto 100%;\n            background-color: #EBEBEB; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-new-user .new-form {\n  width: 460px;\n  height: 540px; }\n  app-new-user .new-form .main-info {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    app-new-user .new-form .main-info .item-photo {\n      padding-top: 30px;\n      width: 130px;\n      height: 200px; }\n      app-new-user .new-form .main-info .item-photo .photo {\n        width: 130px;\n        height: 130px; }\n    app-new-user .new-form .main-info .item-form {\n      width: 240px;\n      margin-left: 30px; }\n  app-new-user .new-form .user-status {\n    width: 100%;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    margin: 50px 0 58px; }\n    app-new-user .new-form .user-status .user-status-item {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 16px;\n      color: #4A4A4A; }\n      app-new-user .new-form .user-status .user-status-item span {\n        margin-left: 12px; }\n      app-new-user .new-form .user-status .user-status-item .selected-status {\n        color: #1976D2; }\n    app-new-user .new-form .user-status label {\n      position: absolute;\n      width: 100%;\n      left: 0;\n      top: 30px;\n      text-align: center;\n      color: #ff0000;\n      font-size: 12px;\n      opacity: 0;\n      -webkit-transition: opacity .5s;\n      transition: opacity .5s;\n      border-top: 2px solid #ff0000; }\n    app-new-user .new-form .user-status .err-status {\n      opacity: 1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-user-card {\n  height: 420px;\n  width: 100%; }\n  app-user-card .user-card, app-user-card .user-card-foot {\n    padding: 0 30px 0 27px;\n    border-bottom: 2px solid #EBEBEB; }\n  app-user-card .user-card {\n    height: 340px;\n    width: 100%; }\n    app-user-card .user-card .user-card-head {\n      width: 100%;\n      height: 80px;\n      position: relative;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-user-card .user-card .user-card-head .user-card-hd-name {\n        font-size: 24px;\n        color: #444444; }\n      app-user-card .user-card .user-card-head .user-card-hd-status {\n        font-size: 14px;\n        font-style: italic;\n        color: #9B9B9B;\n        margin-left: 10px; }\n      app-user-card .user-card .user-card-head .pop-up-icon {\n        height: 40px;\n        width: 40px; }\n        app-user-card .user-card .user-card-head .pop-up-icon .pop-up {\n          position: absolute;\n          z-index: 100;\n          right: 0;\n          top: 50px;\n          width: 200px;\n          height: 215px; }\n      app-user-card .user-card .user-card-head .user-card-created-date {\n        position: absolute;\n        line-height: 0.7;\n        bottom: 0px;\n        font-size: 14px;\n        color: #9B9B9B; }\n    app-user-card .user-card .user-card-body {\n      width: 100%;\n      height: 260px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      app-user-card .user-card .user-card-body .item-photo {\n        padding-top: 35px;\n        width: 120px;\n        height: 100%; }\n      app-user-card .user-card .user-card-body .item-form {\n        width: 320px;\n        margin-left: 60px; }\n  app-user-card .user-card-foot {\n    height: 80px;\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-user-card .user-card-foot .user-ft-l {\n      margin-right: 15px; }\n    app-user-card .user-card-foot .user-ft-r {\n      margin-left: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-users {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  app-users main {\n    width: 100%;\n    height: 100%; }\n    app-users main .user-list-wrap {\n      position: relative;\n      height: 100%;\n      padding: 0;\n      border-right: 2px solid #EBEBEB; }\n      app-users main .user-list-wrap .user-list {\n        height: calc(100% - 86px);\n        width: 100%; }\n        app-users main .user-list-wrap .user-list .slimscroll-wrap {\n          width: 100%;\n          height: 100%; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item {\n            padding-left: 30px;\n            width: 100%;\n            height: 80px;\n            border-bottom: 2px solid #EBEBEB;\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: justify;\n                -ms-flex-pack: justify;\n                    justify-content: space-between; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-item-img-wrap {\n              cursor: pointer;\n              float: left;\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-align: center;\n                  -ms-flex-align: center;\n                      align-items: center;\n              -webkit-box-pack: center;\n                  -ms-flex-pack: center;\n                      justify-content: center;\n              font-size: 14px;\n              color: #4A4A4A;\n              width: 39px;\n              height: 39px;\n              border-radius: 50%;\n              background: no-repeat;\n              background-position: 50% 50%;\n              background-size: auto 100%;\n              background-color: #EBEBEB; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap {\n              height: 100%;\n              width: calc(100% - 39px);\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-align: center;\n                  -ms-flex-align: center;\n                      align-items: center;\n              -webkit-box-pack: justify;\n                  -ms-flex-pack: justify;\n                      justify-content: space-between; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap {\n                margin-left: 15px;\n                width: 100%; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name {\n                  display: -webkit-inline-box;\n                  display: -ms-inline-flexbox;\n                  display: inline-flex;\n                  -webkit-box-align: center;\n                      -ms-flex-align: center;\n                          align-items: center; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name i {\n                    margin-left: 10px;\n                    font-size: 21px;\n                    line-height: 0.7; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name span {\n                    display: block;\n                    float: left; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name .new-title {\n                    margin-left: 10px;\n                    color: #FFA000; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-status {\n                  font-size: 14px;\n                  font-family: Roboto-Light;\n                  color: #9B9B9B;\n                  font-style: italic; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl {\n                float: right;\n                display: -webkit-box;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-align: center;\n                    -ms-flex-align: center;\n                        align-items: center; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl .pop-up-icon {\n                  margin-right: 20px; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl .pop-up-icon .pop-up {\n                    position: absolute;\n                    z-index: 100;\n                    right: 0;\n                    top: 35px;\n                    width: 170px;\n                    height: 100px; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive img {\n            opacity: 0.5; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap {\n            color: #D6D5D5; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap span {\n              color: #D6D5D5 !important; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .selected-user {\n            background-color: rgba(255, 160, 0, 0.1); }\n    app-users main .user-card-wrap {\n      padding: 0;\n      height: 100%;\n      position: relative; }\n      app-users main .user-card-wrap .no-user {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        font-size: 24px;\n        color: #D6D5D5; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center, app-login .login-form .log-in .chkbx-wrap #remember-int i {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-login {\n  background-color: #1976D2;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n  app-login .login-logo {\n    width: 165px;\n    height: 30px;\n    position: absolute;\n    left: 50%;\n    top: 16.6%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n    app-login .login-logo img {\n      width: 100%;\n      height: 100%; }\n  app-login .login-form {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 380px;\n    height: 280px;\n    padding: 30px;\n    box-sizing: border-box;\n    background-color: #ffffff;\n    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n    app-login .login-form .login-text {\n      font-size: 24px;\n      color: #444444; }\n    app-login .login-form .item-form {\n      width: 320px; }\n    app-login .login-form .log-in {\n      margin-top: 45px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-login .login-form .log-in .chkbx-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-login .login-form .log-in .chkbx-wrap #remember-int {\n          position: relative;\n          float: left;\n          width: 18px;\n          height: 18px;\n          border: 1px solid #4D4D4E;\n          border-radius: 3px;\n          cursor: pointer; }\n        app-login .login-form .log-in .chkbx-wrap label[for=remember-int] {\n          margin-left: 10px;\n          font-size: 15px;\n          cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StorageService = (function () {
    function StorageService() {
    }
    StorageService.prototype.get = function (key) {
        return JSON.parse(localStorage.getItem("oxivisuals:" + key));
    };
    StorageService.prototype.set = function (key, value) {
        localStorage.setItem("oxivisuals:" + key, JSON.stringify(value));
    };
    StorageService.prototype.remove = function (key) {
        localStorage.removeItem("oxivisuals:" + key);
    };
    StorageService.prototype.getSession = function (key) {
        return JSON.parse(sessionStorage.getItem("oxivisuals:" + key));
    };
    StorageService.prototype.setSession = function (key, value) {
        sessionStorage.setItem("oxivisuals:" + key, JSON.stringify(value));
    };
    StorageService.prototype.removeSession = function (key) {
        sessionStorage.removeItem("oxivisuals:" + key);
    };
    StorageService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], StorageService);
    return StorageService;
}());
//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ 810:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\ntree .parent .iconButton {\n  background: #7E7E7E; }\n\ntree ul {\n  /* z-index: 100000000; */\n  /* top: 0; */\n  border-right: 1px solid #D6D5D5; }\n  tree ul.tree-webgl-view {\n    border: none;\n    border-left: 1px solid #D6D5D5;\n    margin-left: 15px; }\n    tree ul.tree-webgl-view.first {\n      border: none;\n      margin: 0; }\n    tree ul.tree-webgl-view .left-arrow {\n      position: absolute;\n      width: 15px;\n      border-top: 1px solid #D6D5D5;\n      -webkit-transform: translate(-100%, -33px);\n              transform: translate(-100%, -33px); }\n      tree ul.tree-webgl-view .left-arrow.end-list {\n        -webkit-transform: translate(-17px, -65px) rotate(0deg);\n                transform: translate(-17px, -65px) rotate(0deg);\n        width: 0;\n        border-right: 1px solid #D6D5D5;\n        height: 33px; }\n\ntree .tree-webgl-view {\n  list-style-type: none;\n  padding: 0;\n  margin: 10px 0; }\n  tree .tree-webgl-view li {\n    padding: 0px 16px;\n    margin-left: -1px; }\n    tree .tree-webgl-view li.last-item {\n      border-left: 1px solid #ffffff; }\n  tree .tree-webgl-view .iconButton {\n    color: #000000;\n    padding: 10px;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);\n    max-width: 140px;\n    text-overflow: ellipsis;\n    display: block;\n    overflow: hidden;\n    cursor: pointer;\n    margin: 10px 0;\n    border-radius: 2px; }\n    tree .tree-webgl-view .iconButton:hover {\n      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3); }\n    tree .tree-webgl-view .iconButton.active {\n      border: 2px solid #77BBFF; }\n    tree .tree-webgl-view .iconButton.main {\n      background: #4D4D4E; }\n    tree .tree-webgl-view .iconButton.link {\n      background: #EBEBEB; }\n    tree .tree-webgl-view .iconButton.js-code {\n      background: #D6D5D5; }\n    tree .tree-webgl-view .iconButton a {\n      padding-top: 7px;\n      color: #000000;\n      float: left;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      width: 70%; }\n    tree .tree-webgl-view .iconButton .pop-up-icon {\n      float: right; }\n    tree .tree-webgl-view .iconButton li {\n      margin: 30px 0; }\n\ntree .pop-up {\n  margin-right: -10px;\n  margin-top: -20px; }\n  tree .pop-up.bla-t {\n    position: absolute;\n    z-index: 1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 811:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\napp-file-upload {\n  padding: 0; }\n  app-file-upload .list-files {\n    display: block;\n    font-size: 12px;\n    color: #7E7E7E;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  app-file-upload .btn-def {\n    padding: 10px 30px;\n    text-align: center;\n    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);\n    font-size: 16px;\n    color: #4D4D4E;\n    font-weight: 500;\n    -webkit-transition: opacity .5s;\n    transition: opacity .5s;\n    cursor: pointer; }\n    app-file-upload .btn-def:hover {\n      opacity: 0.6; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".preloader-back {\n  position: absolute;\n  z-index: 999;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  -webkit-transition: background-color 2s linear;\n  transition: background-color 2s linear; }\n  .preloader-back.active {\n    background-color: rgba(0, 0, 0, 0.5); }\n  .preloader-back .preview {\n    -webkit-filter: blur(20px);\n            filter: blur(20px);\n    -webkit-transition: -webkit-filter 1s linear;\n    transition: -webkit-filter 1s linear;\n    transition: filter 1s linear;\n    transition: filter 1s linear, -webkit-filter 1s linear;\n    height: 100%;\n    wedth: 100%; }\n    .preloader-back .preview.active {\n      -webkit-filter: blur(0px);\n              filter: blur(0px); }\n  .preloader-back .preloader-data {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    text-align: center; }\n    .preloader-back .preloader-data .pre-progress-bar {\n      width: 240px;\n      border-radius: 4px;\n      height: 8px; }\n      .preloader-back .preloader-data .pre-progress-bar .pre-progress-status {\n        height: 100%;\n        border-radius: 4px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.svg-view .zoomer-c {\n  display: none;\n  position: absolute;\n  right: 0;\n  top: 0; }\n  .svg-view .zoomer-c div {\n    -webkit-animation: color-change infinite ease-in-out 5s  alternate;\n            animation: color-change infinite ease-in-out 5s  alternate; }\n  .svg-view .zoomer-c .left-border {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    width: 1px;\n    height: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    background: red; }\n  .svg-view .zoomer-c .top-border {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n    height: 1px;\n    background: red; }\n  .svg-view .zoomer-c.active {\n    display: block; }\n\n.svg-view canvas {\n  width: 100%;\n  height: 100%; }\n  .svg-view canvas.buffer-c {\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: -1;\n    visibility: hidden; }\n\n.svg-view .log-info {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  font-size: 12px; }\n\n.svg-view .help-info {\n  position: fixed;\n  right: 10px;\n  top: 20px;\n  cursor: pointer; }\n  .svg-view .help-info h1 {\n    position: relative;\n    right: 0;\n    cursor: pointer;\n    padding: 10px; }\n    .svg-view .help-info h1:hover {\n      color: yellowgreen; }\n  .svg-view .help-info p {\n    position: absolute;\n    right: 10px;\n    width: 0;\n    height: 0;\n    -webkit-transition: opacity, 0.2s linear;\n    transition: opacity, 0.2s linear;\n    opacity: 0;\n    background: #fff4c2; }\n    .svg-view .help-info p.active {\n      width: 250px;\n      height: inherit;\n      opacity: 1; }\n\n.svg-view * {\n  margin: 0;\n  padding: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 815:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n.preloader-back {\n  position: absolute;\n  z-index: 999;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  -webkit-transition: background-color 2s linear;\n  transition: background-color 2s linear; }\n  .preloader-back.active {\n    background-color: rgba(0, 0, 0, 0.5); }\n  .preloader-back .preview {\n    -webkit-filter: blur(20px);\n            filter: blur(20px);\n    -webkit-transition: -webkit-filter 1s linear;\n    transition: -webkit-filter 1s linear;\n    transition: filter 1s linear;\n    transition: filter 1s linear, -webkit-filter 1s linear;\n    height: 100%; }\n    .preloader-back .preview.active {\n      -webkit-filter: blur(0px);\n              filter: blur(0px); }\n  .preloader-back .preloader-data {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    text-align: center; }\n    .preloader-back .preloader-data .pre-progress-bar {\n      width: 240px;\n      border-radius: 4px;\n      height: 8px; }\n      .preloader-back .preloader-data .pre-progress-bar .pre-progress-status {\n        height: 100%;\n        border-radius: 4px; }\n\n.tooltip-container .cos-info {\n  position: absolute;\n  z-index: 3;\n  display: none; }\n  .tooltip-container .cos-info.active {\n    display: block; }\n  .tooltip-container .cos-info.act:after {\n    content: '';\n    position: absolute;\n    top: 100%;\n    margin-left: 9px;\n    margin-top: -25px;\n    background-size: 35px 25px;\n    background-color: transparent;\n    width: 0;\n    height: 0;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-top: 20px solid #ffffff; }\n  .tooltip-container .cos-info.tooltip-align-right:after {\n    -webkit-transform: rotate(90deg);\n            transform: rotate(90deg);\n    margin-left: 18px; }\n  .tooltip-container .cos-info.tooltip-align-right .cos-tooltip {\n    -webkit-transform-origin: left;\n            transform-origin: left;\n    left: 160px;\n    top: -95px; }\n  .tooltip-container .cos-info.tooltip-align-bottom:after {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n    margin-top: -15px; }\n  .tooltip-container .cos-info.tooltip-align-bottom .cos-tooltip {\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    left: 0px;\n    top: 0px; }\n  .tooltip-container .cos-info.tooltip-align-left:after {\n    -webkit-transform: rotate(-90deg);\n            transform: rotate(-90deg);\n    margin-left: 0px; }\n  .tooltip-container .cos-info.tooltip-align-left .cos-tooltip {\n    -webkit-transform-origin: right;\n            transform-origin: right;\n    left: -158px;\n    top: -95px; }\n  .tooltip-container .cos-info hr {\n    padding: 0;\n    margin: 0 10px;\n    border-width: 2px; }\n  .tooltip-container .cos-info .cos-tooltip, .tooltip-container .cos-info .cos-label {\n    position: absolute;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    color: #000; }\n  .tooltip-container .cos-info .cos-tooltip {\n    width: 280px;\n    height: 160px;\n    border-radius: 5px;\n    box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.15);\n    background-color: #FFFFFF;\n    bottom: 25px;\n    -webkit-transform: translateX(-40%) scale(0);\n            transform: translateX(-40%) scale(0);\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear;\n    -webkit-transform-origin: bottom;\n            transform-origin: bottom; }\n    .tooltip-container .cos-info .cos-tooltip.active {\n      -webkit-transform: translateX(-40%) scale(1);\n              transform: translateX(-40%) scale(1); }\n    .tooltip-container .cos-info .cos-tooltip .cos-tooltip-header {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 10px 15px;\n      border-left: 2px solid #1976D2;\n      margin: 10px 0; }\n    .tooltip-container .cos-info .cos-tooltip .cos-tooltip-body {\n      padding: 10px 15px;\n      margin: 10px 0;\n      height: 50%;\n      color: #9B9B9B;\n      font-size: 13px;\n      font-weight: 300;\n      line-height: 20px; }\n      .tooltip-container .cos-info .cos-tooltip .cos-tooltip-body .cos-tooltip-body-title {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: initial;\n        height: 100%; }\n  .tooltip-container .cos-info .cos-label {\n    border-radius: 50%;\n    border: 3px solid #fff;\n    background: #1976D2;\n    padding: 0;\n    font-size: 28px;\n    color: white;\n    box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.38);\n    width: 60px;\n    height: 60px;\n    text-align: center;\n    margin: auto;\n    display: list-item; }\n    .tooltip-container .cos-info .cos-label span {\n      margin: auto;\n      vertical-align: middle;\n      display: table-row;\n      width: 55px;\n      float: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@keyframes back-opac-down {\n  0% {\n    background: black; }\n  100% {\n    background: rgba(0, 0, 0, 0.5); } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@-webkit-keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@keyframes width-down {\n  0% {\n    width: initial; }\n  100% {\n    width: 0; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n@keyframes color-change {\n  0% {\n    background: red; }\n  100% {\n    background: yellow; } }\n\n.pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n.webgl-view {\n  border-radius: 10px; }\n  .webgl-view .proj_logo {\n    z-index: 1; }\n  .webgl-view.preview .center-container.THREEJS {\n    max-width: 100vw;\n    height: 100%;\n    position: absolute; }\n  .webgl-view .back-area {\n    position: absolute;\n    z-index: 1000000;\n    bottom: 10px;\n    right: 10px;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n    width: 50px;\n    height: 50px;\n    background-size: contain;\n    background-repeat: no-repeat;\n    cursor: pointer; }\n  .webgl-view .THREEJS .gl-view {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    z-index: 2;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  .webgl-view .THREEJS.svg-active .gl-view, .webgl-view .THREEJS.svg-active .oxi-controls-move, .webgl-view .THREEJS.svg-active .img-pagination {\n    display: none !important; }\n  .webgl-view ul {\n    text-align: center;\n    margin: auto;\n    padding: 10px 0;\n    z-index: 10;\n    width: 100%;\n    position: absolute; }\n    .webgl-view ul li {\n      display: inline-block;\n      padding: 5px;\n      background: #000000;\n      color: #ffffff;\n      border-radius: 5px;\n      margin: 5px;\n      cursor: pointer;\n      -webkit-transition: background, 0.5s;\n      transition: background, 0.5s;\n      z-index: 3; }\n      .webgl-view ul li.active {\n        border: 1px solid #77BBFF; }\n      .webgl-view ul li:hover {\n        background: #7E7E7E; }\n  .webgl-view .kompass {\n    position: absolute;\n    left: 10px;\n    bottom: 10px;\n    width: 78px;\n    height: 78px;\n    background-size: contain;\n    background-repeat: no-repeat; }\n  .webgl-view .oxi-controls-move {\n    position: absolute;\n    left: 50%;\n    -webkit-transform: translate(-50%, 0%);\n            transform: translate(-50%, 0%);\n    bottom: 0;\n    z-index: 99; }\n    .webgl-view .oxi-controls-move div {\n      display: inline-block;\n      padding: 10px;\n      margin: 10px 30px;\n      cursor: pointer;\n      width: 42px;\n      background-size: contain; }\n      .webgl-view .oxi-controls-move div.right {\n        -webkit-transform: rotate3d(0, 1, 0, 180deg);\n                transform: rotate3d(0, 1, 0, 180deg); }\n      .webgl-view .oxi-controls-move div:hover {\n        opacity: 0.7; }\n  .webgl-view .oxi-controls {\n    width: 150px;\n    display: none;\n    position: absolute;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    z-index: 4; }\n    .webgl-view .oxi-controls.active {\n      display: block; }\n    .webgl-view .oxi-controls div {\n      width: 50px;\n      height: 50px;\n      background: #000000;\n      opacity: 0.5;\n      -webkit-transition: opacity 0.5s, -webkit-transform;\n      transition: opacity 0.5s, -webkit-transform;\n      transition: transform, opacity 0.5s;\n      transition: transform, opacity 0.5s, -webkit-transform;\n      border-radius: 50%;\n      cursor: pointer;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      .webgl-view .oxi-controls div img {\n        fill: #ffffff;\n        margin: auto; }\n      .webgl-view .oxi-controls div:hover {\n        opacity: 1;\n        -webkit-transform: scale(1.2);\n                transform: scale(1.2); }\n      .webgl-view .oxi-controls div:nth-child(1), .webgl-view .oxi-controls div:nth-child(4) {\n        margin: auto; }\n      .webgl-view .oxi-controls div.attach-js {\n        right: 0;\n        position: absolute;\n        top: 33%; }\n  .webgl-view .center-container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    .webgl-view .center-container.THREEJS {\n      max-width: 70vw;\n      height: 100%;\n      margin: auto;\n      position: relative;\n      left: 0;\n      top: 0;\n      -webkit-transform: translate(0);\n              transform: translate(0);\n      text-align: center; }\n      .webgl-view .center-container.THREEJS .tooltip-container .cos-info .cos-label {\n        display: -webkit-inline-box !important;\n        display: -ms-inline-flexbox !important;\n        display: inline-flex !important; }\n      .webgl-view .center-container.THREEJS .gl-view {\n        margin: auto; }\n    .webgl-view .center-container.img-slider-container {\n      z-index: -1;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%); }\n  .webgl-view .oxi-tooltips {\n    position: absolute;\n    top: 0;\n    left: 0; }\n    .webgl-view .oxi-tooltips .tooltip {\n      display: none;\n      opacity: 1;\n      position: absolute;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      cursor: pointer;\n      background: #ffffff; }\n      .webgl-view .oxi-tooltips .tooltip .header {\n        text-transform: uppercase;\n        padding: 10px 5px; }\n      .webgl-view .oxi-tooltips .tooltip .body {\n        display: none; }\n      .webgl-view .oxi-tooltips .tooltip.active {\n        display: block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 393,
	"./af.js": 393,
	"./ar": 400,
	"./ar-dz": 394,
	"./ar-dz.js": 394,
	"./ar-kw": 395,
	"./ar-kw.js": 395,
	"./ar-ly": 396,
	"./ar-ly.js": 396,
	"./ar-ma": 397,
	"./ar-ma.js": 397,
	"./ar-sa": 398,
	"./ar-sa.js": 398,
	"./ar-tn": 399,
	"./ar-tn.js": 399,
	"./ar.js": 400,
	"./az": 401,
	"./az.js": 401,
	"./be": 402,
	"./be.js": 402,
	"./bg": 403,
	"./bg.js": 403,
	"./bn": 404,
	"./bn.js": 404,
	"./bo": 405,
	"./bo.js": 405,
	"./br": 406,
	"./br.js": 406,
	"./bs": 407,
	"./bs.js": 407,
	"./ca": 408,
	"./ca.js": 408,
	"./cs": 409,
	"./cs.js": 409,
	"./cv": 410,
	"./cv.js": 410,
	"./cy": 411,
	"./cy.js": 411,
	"./da": 412,
	"./da.js": 412,
	"./de": 415,
	"./de-at": 413,
	"./de-at.js": 413,
	"./de-ch": 414,
	"./de-ch.js": 414,
	"./de.js": 415,
	"./dv": 416,
	"./dv.js": 416,
	"./el": 417,
	"./el.js": 417,
	"./en-au": 418,
	"./en-au.js": 418,
	"./en-ca": 419,
	"./en-ca.js": 419,
	"./en-gb": 420,
	"./en-gb.js": 420,
	"./en-ie": 421,
	"./en-ie.js": 421,
	"./en-nz": 422,
	"./en-nz.js": 422,
	"./eo": 423,
	"./eo.js": 423,
	"./es": 425,
	"./es-do": 424,
	"./es-do.js": 424,
	"./es.js": 425,
	"./et": 426,
	"./et.js": 426,
	"./eu": 427,
	"./eu.js": 427,
	"./fa": 428,
	"./fa.js": 428,
	"./fi": 429,
	"./fi.js": 429,
	"./fo": 430,
	"./fo.js": 430,
	"./fr": 433,
	"./fr-ca": 431,
	"./fr-ca.js": 431,
	"./fr-ch": 432,
	"./fr-ch.js": 432,
	"./fr.js": 433,
	"./fy": 434,
	"./fy.js": 434,
	"./gd": 435,
	"./gd.js": 435,
	"./gl": 436,
	"./gl.js": 436,
	"./gom-latn": 437,
	"./gom-latn.js": 437,
	"./he": 438,
	"./he.js": 438,
	"./hi": 439,
	"./hi.js": 439,
	"./hr": 440,
	"./hr.js": 440,
	"./hu": 441,
	"./hu.js": 441,
	"./hy-am": 442,
	"./hy-am.js": 442,
	"./id": 443,
	"./id.js": 443,
	"./is": 444,
	"./is.js": 444,
	"./it": 445,
	"./it.js": 445,
	"./ja": 446,
	"./ja.js": 446,
	"./jv": 447,
	"./jv.js": 447,
	"./ka": 448,
	"./ka.js": 448,
	"./kk": 449,
	"./kk.js": 449,
	"./km": 450,
	"./km.js": 450,
	"./kn": 451,
	"./kn.js": 451,
	"./ko": 452,
	"./ko.js": 452,
	"./ky": 453,
	"./ky.js": 453,
	"./lb": 454,
	"./lb.js": 454,
	"./lo": 455,
	"./lo.js": 455,
	"./lt": 456,
	"./lt.js": 456,
	"./lv": 457,
	"./lv.js": 457,
	"./me": 458,
	"./me.js": 458,
	"./mi": 459,
	"./mi.js": 459,
	"./mk": 460,
	"./mk.js": 460,
	"./ml": 461,
	"./ml.js": 461,
	"./mr": 462,
	"./mr.js": 462,
	"./ms": 464,
	"./ms-my": 463,
	"./ms-my.js": 463,
	"./ms.js": 464,
	"./my": 465,
	"./my.js": 465,
	"./nb": 466,
	"./nb.js": 466,
	"./ne": 467,
	"./ne.js": 467,
	"./nl": 469,
	"./nl-be": 468,
	"./nl-be.js": 468,
	"./nl.js": 469,
	"./nn": 470,
	"./nn.js": 470,
	"./pa-in": 471,
	"./pa-in.js": 471,
	"./pl": 472,
	"./pl.js": 472,
	"./pt": 474,
	"./pt-br": 473,
	"./pt-br.js": 473,
	"./pt.js": 474,
	"./ro": 475,
	"./ro.js": 475,
	"./ru": 476,
	"./ru.js": 476,
	"./sd": 477,
	"./sd.js": 477,
	"./se": 478,
	"./se.js": 478,
	"./si": 479,
	"./si.js": 479,
	"./sk": 480,
	"./sk.js": 480,
	"./sl": 481,
	"./sl.js": 481,
	"./sq": 482,
	"./sq.js": 482,
	"./sr": 484,
	"./sr-cyrl": 483,
	"./sr-cyrl.js": 483,
	"./sr.js": 484,
	"./ss": 485,
	"./ss.js": 485,
	"./sv": 486,
	"./sv.js": 486,
	"./sw": 487,
	"./sw.js": 487,
	"./ta": 488,
	"./ta.js": 488,
	"./te": 489,
	"./te.js": 489,
	"./tet": 490,
	"./tet.js": 490,
	"./th": 491,
	"./th.js": 491,
	"./tl-ph": 492,
	"./tl-ph.js": 492,
	"./tlh": 493,
	"./tlh.js": 493,
	"./tr": 494,
	"./tr.js": 494,
	"./tzl": 495,
	"./tzl.js": 495,
	"./tzm": 497,
	"./tzm-latn": 496,
	"./tzm-latn.js": 496,
	"./tzm.js": 497,
	"./uk": 498,
	"./uk.js": 498,
	"./ur": 499,
	"./ur.js": 499,
	"./uz": 501,
	"./uz-latn": 500,
	"./uz-latn.js": 500,
	"./uz.js": 501,
	"./vi": 502,
	"./vi.js": 502,
	"./x-pseudo": 503,
	"./x-pseudo.js": 503,
	"./yo": 504,
	"./yo.js": 504,
	"./zh-cn": 505,
	"./zh-cn.js": 505,
	"./zh-hk": 506,
	"./zh-hk.js": 506,
	"./zh-tw": 507,
	"./zh-tw.js": 507
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 821;


/***/ }),

/***/ 850:
/***/ (function(module, exports) {

module.exports = "<div class=\"app-wrap\">\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ 851:
/***/ (function(module, exports) {

module.exports = "<header *ngIf=\"user\">\n  <div class=\"asd-hd-top\">\n    <div class=\"asd-name-in\"  [ngStyle]=\"{'background-image': 'url(' + user.avatar + ')'}\">\n      <span *ngIf=\"!user.avatar\">{{userService.lettersNoImg(user)}}</span>\n    </div>\n    <div class=\"asd-status-wrap\">\n      <i class=\"material-icons\" (click)=\"closeMenu()\">arrow_back</i>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'super'\">Super user</div>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'admin'\">Client-admin</div>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'user'\">Client-user</div>\n    </div>\n  </div>\n  <div class=\"asd-hd-bot\">\n    <div class=\"asd-name\">{{user.firstName}} {{user.secondName}}</div>\n    <div class=\"asd-email-wrap\">\n      <div class=\"asd-email\">{{user.email}}</div>\n      <i class=\"material-icons\">arrow_drop_down</i>\n    </div>\n  </div>\n</header>\n\n<div class=\"pop-up\" *ngIf=\"User.projects\">\n  <div class=\"pop-up-item\" routerLink=\"/projects\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">folder</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Projects</span>\n      <span class=\"pop-up-num\">{{User.projects.length || 0}}</span>\n    </div>\n  </div>\n  <div class=\"pop-up-item\" routerLink=\"/users\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">people</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Users</span>\n      <span class=\"pop-up-num\">{{User.users.length || 0}}</span>\n    </div>\n  </div>\n  <div class=\"pop-up-item\" routerLink=\"/settings\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">settings</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Settings</span>\n    </div>\n  </div>\n</div>\n\n<footer>\n  <div class=\"asd-logout\">\n    <i class=\"material-icons\" (click)=\"logOut()\">exit_to_app</i>\n    <div class=\"text-wrap pointer\" (click)=\"logOut()\">\n      Log out\n    </div>\n  </div>\n  <div class=\"asd-terms\">\n    <img src=\"../../../assets/img/logo.png\" alt=\"\">\n    <a href=\"#\">Terms</a>\n  </div>\n</footer>\n"

/***/ }),

/***/ 852:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-wrap\">\n  <div class=\"header-tag\">\n    <i class=\"material-icons\" [routerLink]=\"['/projects']\" *ngIf=\"headerData._id\" #backProject>arrow_back</i>\n    <div class=\"header-title-wrap\">\n      <div class=\"header-title\">{{headerData.title}}<span class=\"arr-info\" *ngIf=\"!headerData._id\">{{'( ' + headerData.arrLength + ' )'}}</span></div>\n      <span class=\"published\" *ngIf=\"!headerData.published && headerData._id\" >Unpublished</span>\n    </div>\n  </div>\n  <div class=\"header-main\"  *ngIf=\"!headerData._id\">\n    <div class=\"header-search\">\n      <input type=\"text\" placeholder=\"Search\" [(ngModel)]=\"headerData.searchName\">\n    </div>\n    <div class=\"header-sort\">\n      <span>Sorted by:</span>\n      <div class=\"sort-select\" (window:mouseup)=\"sortActive = false\">\n        <div class=\"sort-present\" [class.sort-active]=\"sortActive\" (click)=\"sortActive = !sortActive\">\n          <span>{{headerData.sortType}}</span>\n          <i class=\"material-icons\" >arrow_drop_down</i>\n        </div>\n        <div class=\"pop-up\" [hidden]=\"!sortActive\">\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'A-Z'; sortActive = false\">\n            <div class=\"pop-up-row-name\">\n              <span [class.sort-selected]=\"headerData.sortType === 'A-Z'\">A-Z</span>\n            </div>\n          </div>\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'Z-A'; sortActive = false\">\n            <div class=\"pop-up-row-name\">\n              <span [class.sort-selected]=\"headerData.sortType === 'Z-A'\">Z-A</span>\n            </div>\n          </div>\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'Newest to older'; sortActive = false\">\n            <div class=\"pop-up-row-name\">\n              <span [class.sort-selected]=\"headerData.sortType === 'Newest to older'\">Newest to older</span>\n            </div>\n          </div>\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'Older to newest'; sortActive = false\">\n            <div class=\"pop-up-row-name\">\n              <span [class.sort-selected]=\"headerData.sortType === 'Older to newest'\">Older to newest</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"header-main\"  *ngIf=\"headerData._id\">\n    <div class=\"header-main-mnu\">\n      <div class=\"mnu-item\" [routerLink]=\"['/project/' + headerData._id + '/basic']\" routerLinkActive=\"mnu-item-active\">Basic</div>\n      <div class=\"mnu-item\">Admins</div>\n      <div class=\"mnu-item\" [routerLink]=\"['/project/' + headerData._id + '/source']\" routerLinkActive=\"mnu-item-active\">Source</div>\n      <div class=\"mnu-item\" [routerLink]=\"['/project/' + headerData._id + '/preview']\" routerLinkActive=\"mnu-item-active\">Preview</div>\n      <div class=\"mnu-item\" [routerLink]=\"['/project/' + headerData._id + '/costumization']\" routerLinkActive=\"mnu-item-active\">Costumization</div>\n    </div>\n    <!--<div class=\"publish-btn\" [class.publish-btn-active]=\"headerData.published\" [class.publish-btn-disable]=\"headerData.published\" (click)=\"deactivate()\"><span>{{headerData.published?\"Deactivate\":\"Publish\"}}</span></div>-->\n    <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"headerSettings\">\n      <i class=\"material-icons set-icon\" (click)=\"headerSettings = !headerSettings\" (window:mouseup)=\"headerSettings = false\">more_vert</i>\n      <div class=\"pop-up\" [hidden]=\"!headerSettings\">\n        <div class=\"pop-up-item\" [hidden]=\"!headerData.published\" (click)=\"deactivate()\">\n          <i class=\"material-icons\">visibility_off</i>\n          <div class=\"pop-up-row-name\">\n            <span>Deactivate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"headerData.published\" (click)=\"deactivate()\">\n          <i class=\"material-icons\">visibility</i>\n          <div class=\"pop-up-row-name\">\n            <span>Activate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" (click)=\"delete()\">\n          <i class=\"material-icons\">delete</i>\n          <div class=\"pop-up-row-name\">\n            <span>Delete</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 853:
/***/ (function(module, exports) {

module.exports = "<app-header [class.openedMenu]=\"openMenu == 'in' \"></app-header>\n<app-aside [@slideInOut]=\"openMenu\" [(menu)]=\"openMenu\"></app-aside>\n\n<main class=\"main-content\" [class.openedMenu]=\"openMenu == 'in' \">\n    <router-outlet></router-outlet>\n</main>\n<div class=\"menu-btn\" [class.menu-btn-hide]=\"openMenu == 'in' \" (click)=\"openMenu='in'\">\n    <i class=\"material-icons\">menu</i>\n</div>\n\n"

/***/ }),

/***/ 854:
/***/ (function(module, exports) {

module.exports = "<div class=\"half-basic-l\">\n    <div class=\"basic-cont-wrap\">\n        <div class=\"basic-inf\">Basic information:</div>\n        <app-new-project [project]=\"project\" [Create]=\"false\"></app-new-project>\n    </div>\n</div>\n<div class=\"half-basic-r\">\n    <div class=\"basic-cont-wrap\">\n        <div class=\"basic-prev\">Live preview:</div>\n        <app-project-view [project]=\"project\" [Editable]=\"false\"></app-project-view>\n    </div>\n</div>\n"

/***/ }),

/***/ 855:
/***/ (function(module, exports) {

module.exports = "<div class=\"costumization\" *ngIf=\"!project.model || !project.model.link\"><h2>You have to add some area!!!</h2></div>\n<div class=\"costumization\" *ngIf=\"project.model && project.model.link\">\n    <div class=\"cos-row col-lg-2\">\n        <div class=\"row cos-header\">Element list:</div>\n        <ul class=\"cos-list\">\n            <li *ngFor=\"let item of menuList;  let ind = index\" [ngClass]=\"{'active':item.active}\"\n                (click)=\"selectCurItem(item,menuList,ind)\">\n                {{item.title}}\n                <div class=\"mailicon\">\n                    <svg width=\"6px\" height=\"9px\" viewBox=\"0 0 6 9\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n                         xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <defs></defs>\n                        <g id=\"Website\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                            <g id=\"Super-User---project-creator---Publishing-\"\n                               transform=\"translate(-1298.000000, -396.000000)\" fill=\"#181818\">\n                                <g id=\"tooltip\" transform=\"translate(1048.000000, 370.000000)\">\n                                    <g id=\"Page-1\" transform=\"translate(245.000000, 23.000000)\">\n                                        <polygon id=\"Fill-2-Copy\"\n                                                 points=\"5.72666642 10.8933327 8.77999947 7.83333286 5.72666642 4.77333294 6.66666627 3.8333331 10.666666 7.83333286 6.66666627 11.8333326\"></polygon>\n                                    </g>\n                                </g>\n                            </g>\n                        </g>\n                    </svg>\n                </div>\n            </li>\n        </ul>\n    </div>\n    <div class=\"cos-row col-lg-3\">\n        <div class=\"row cos-header cos-t\">Customization <span class=\"btn-def\"\n                                                              (click)=\"saveChanges()\">SAVE CHANGES</span>\n        </div>\n        <div class=\"cos-edit-body\">\n\n            <div class=\"cos-item\" [ngClass]=\"{'active':menuList[0].active}\">\n\n            </div>\n\n            <div class=\"cos-item\" *ngFor=\"let menuL of menuList;  let ind = index\" [ngClass]=\"{'active':menuL.active}\">\n                <div class=\"cos-tabs w3-bar w3-black\">\n                    <button *ngFor=\"let mtab of tabList[ind]\" (click)=\"selectCurItem(mtab , tabList[ind])\"\n                            [ngClass]=\"{'active':mtab.active}\" class=\"w3-bar-item w3-button\"\n                            [innerText]=\"mtab.title\"></button>\n                </div>\n                <app-project-text-code-mirror *ngFor=\"let mtab of tabList[ind]\" class=\"cos-code\"\n                                              [ngClass]=\"{'active':mtab.active}\" [config]=\"mtab\"></app-project-text-code-mirror>\n\n            </div>\n\n        </div>\n    </div>\n    <div class=\"cos-row col-lg-7\">\n        <div class=\"cos-preview webgl-view\" *ngIf=\"menuList[0].active && curItem\">\n            <app-project-webgl-controls [parent]=\"curNameSpace\" [htmlTemplate]=\"curItem[1].value\"\n                                        #wcontrols></app-project-webgl-controls>\n        </div>\n        <div class=\"cos-preview\" *ngIf=\"menuList[1].active\">\n            <app-project-webgl-tooltip [isEdit]=\"1\" [modelData]=\"modelData\" [parent]=\"curNameSpace\" [htmlTemplate]=\"curItem[1].value\"\n                                       #wtooltip></app-project-webgl-tooltip>\n        </div>\n        <div class=\"cos-preview\" *ngIf=\"menuList[2].active\">\n            <app-project-preloader [parent]=\"curNameSpace\" [htmlTemplate]=\"curItem[1].value\"\n                                   #preloader></app-project-preloader>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ 856:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"dataSrc\">\n    <div class=\"tabs-view\">\n        <div class=\"tabs-blocks col-lg-12\">\n            <table class=\"my-table col-lg-12\">\n                <tbody>\n                <tr>\n                    <td class=\"tabs-header\" [ngClass]=\"{'no-width':treeView.hide}\" #treeView>\n                        <div *ngIf=\"!treeView.hide\" class=\"tab-header\">\n                            <span class=\"title\">Project Share</span>\n                            <span class=\"text-btn\" (click)=\"treeView.hide=!treeView.hide\">hide</span>\n                        </div>\n                        <img *ngIf=\"treeView.hide\" (click)=\"treeView.hide=!treeView.hide\"\n                             src=\"../assets/img/Fill 2 (1).svg\">\n                    </td>\n                    <td class=\"s-tab webgl-item\" rowspan=\"2\" style=\"text-align: center;\"\n                        [attr.colspan]=\"treeView.hide ?2:1\">\n                        <iframe [src]=\"dataSrc\" frameborder=0 allowfullscreen #ifrm></iframe>\n                    </td>\n                </tr>\n                <tr>\n                    <td *ngIf=\"!treeView.hide\" [attr.colspan]=\"treeView.hide?2:1\" class=\"s-tab\">\n                        <div class=\"tabs-body\">\n                            <div class=\"body-data\">\n                                <div class=\"model-config\">\n                                    <form class=\"item-form\" novalidate>\n                                        <div class=\"bottom-block\">\n                                            <div class=\"row\">\n                                                <div class=\"inp-form col-lg-12\">\n                                                    <label>Link</label>\n                                                    <input name=\"link\" type=\"text\" [(attr.value)]=\"data.link\">\n                                                </div>\n                                            </div>\n                                            <div class=\"row\">\n                                                <div class=\"inp-form col-lg-12\">\n                                                    <label>HTML</label>\n                                                    <input name=\"linkH\" type=\"text\"\n                                                           [(attr.value)]=\"data.ifr\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <textarea style=\"opacity: 0\" [innerText]=\"urlC\" #textAr></textarea>\n\n                                <div class=\"add-btn\" (click)=\"copyUrl()\">\n                                    <i class=\"material-icons\">save</i>\n\n                                    <div class=\"span-hover\">\n                                        <span>Click to copy link</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </td>\n                    <td *ngIf=\"treeView.hide\"></td>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n<h1 style=\"text-align: center;\" *ngIf=\"!dataSrc\">Still had nothing created!!!</h1>"

/***/ }),

/***/ 857:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 858:
/***/ (function(module, exports) {

module.exports = "<div class=\"model-config\">\n    <form class=\"item-form\" #editViewForm=\"ngForm\" novalidate (change)=\"modelStructure.glApp.updateData('test')\">\n        <div *ngIf=\"modelStructure._category == _CONFIG.PROJ_DESTINATION.ModelStructure\">\n            <div class=\"top-block files-top-block \">\n                <div class=\"input-wrap\">\n                    <div class=\"col-lg-12\">\n                        <input type=\"text\" #curentName=\"ngModel\" name=\"curentName\"\n                               placeholder=\"Level`s Name\"\n                               [(ngModel)]=\"modelStructure.name\" required autofocus>\n                        <label [class.full-op]=\"curentName.invalid && curentName.touched\">The\n                            Level`s Name is required!</label>\n                    </div>\n                </div>\n\n                <div class=\"upload-list col-lg-12\">\n                    <app-file-upload [title]=\"'Upload model'\" [accept]=\"'.obj'\"\n                                     [category]=\"_CONFIG.FILE.TYPE.MODEL_OBJ\"\n                                     [required]=\"'1'\" class=\"col-lg-12\" [files]=\"[modelStructure.destination]\"\n                                     [inject]=\"modelStructure.glApp\"\n                                     *ngIf=\"!modelStructure.camera.isSVG\"></app-file-upload>\n                    <app-file-upload [title]=\"'Upload svg'\" [accept]=\"'.svg'\"\n                                     [category]=\"_CONFIG.FILE.TYPE.MODEL_SVG\"\n                                     [required]=\"'1'\" class=\"col-lg-12\" [files]=\"[modelStructure.svgDestination]\"\n                                     [inject]=\"modelStructure.glApp\"\n                                     *ngIf=\"modelStructure.camera.isSVG\"></app-file-upload>\n\n                    <app-file-upload [title]=\"'Upload frames'\" [multiple]=\"'multiple'\"\n                                     [category]=\"_CONFIG.FILE.TYPE.PREVIEW_IMG\"\n                                     [required]=\"'1'\" [accept]=\"'image/*'\" [files]=\"modelStructure.images\"\n                                     [inject]=\"modelStructure.glApp\"\n                                     class=\"col-lg-12\"></app-file-upload>\n\n                    <app-file-upload [title]=\"'Aligning frames'\" [multiple]=\"'multiple'\"\n                                     [inject]=\"modelStructure.glApp\"\n                                     [category]=\"_CONFIG.FILE.TYPE.ALIGN_IMG\" [accept]=\"'image/*'\"\n                                     [files]=\"modelStructure.alignImages\"\n                                     class=\"col-lg-12\"></app-file-upload>\n\n                    <div class=\"add-btn\"\n                         *ngIf=\"modelStructure.images.length && modelStructure.alignImages.length && modelStructure.glApp._slider\"\n                         (click)=\"modelStructure.glApp._slider.toggleDebug()\">\n                        <i class=\"material-icons\">image</i>\n\n                        <div class=\"span-hover\">\n                            <span>Togle to {{modelStructure.glApp._slider.isDebug?'Upload':'Align'}} frames </span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"bottom-block\">\n                <div class=\"row\">\n                    <div class=\"inp-form col-lg-3\">\n                        <label>SVG(*)</label>\n                        <input name=\"isSVG\" type=\"checkbox\" (change)=\"modelStructure.glApp.updateData('isSVG')\"\n                               [(ngModel)]=\"modelStructure.camera.isSVG\">\n                    </div>\n                    <div class=\"inp-form col-lg-6\" *ngIf=\"modelStructure.camera.isSVG\">\n                        <label>Zoom Helper(*)</label>\n                        <input name=\"showZoomHelper\" type=\"checkbox\"\n                               (change)=\"modelStructure.glApp.updateData('showZoomHelper')\"\n                               [(ngModel)]=\"modelStructure.camera.showZoomHelper\">\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"inp-form col-lg-3\">\n                        <label>Opacity</label>\n                        <input name=\"opacity\" type=\"number\"\n                               (change)=\"modelStructure.glApp.updateData('opacity')\" step=\"0.01\" min=\"0\" max=\"1\"\n                               [(ngModel)]=\"modelStructure.camera.opacity\">\n                    </div>\n                    <div class=\"inp-form col-lg-6\">\n                        <label>Kompas(&deg;),start from</label>\n                        <input name=\"angle\" type=\"number\"\n                               (change)=\"modelStructure.glApp.updateData('kompass')\" step=\"1\" min=\"0\" max=\"360\"\n                               [(ngModel)]=\"modelStructure.camera.kompass.angle\">\n                    </div>\n                    <div class=\"inp-form col-lg-3\">\n                        <label>Kompas(*)</label>\n                        <input name=\"enablr\" type=\"checkbox\"\n                               (change)=\"modelStructure.glApp.updateData('kompass')\"\n                               [(ngModel)]=\"modelStructure.camera.kompass.enabled\">\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"inp-form col-lg-6\">\n                        <label>Width</label>\n                        <input name=\"width\" type=\"number\" disabled *ngIf=\"modelStructure.glApp._slider\"\n                               [ngModel]=\"modelStructure.glApp._slider.currentFrame.clientWidth ||modelStructure.glApp._slider.currentAlignFrame.clientWidth\">\n                    </div>\n                    <div class=\"inp-form col-lg-6\">\n                        <label>Height</label>\n                        <input name=\"height\" type=\"number\" disabled *ngIf=\"modelStructure.glApp._slider\"\n                               [ngModel]=\"modelStructure.glApp._slider.currentFrame.clientHeight ||modelStructure.glApp._slider.currentAlignFrame.clientHeight\">\n                    </div>\n                </div>\n                <div *ngIf=\"modelStructure.camera.isSVG\">\n                    <div class=\"row\">\n                        <div class=\"inp-form col-lg-4\">\n                            <a href=\"#\" (click)=\"modelStructure.glApp.main.svgEl.exportJSON($event)\">export JSON</a>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"!modelStructure.camera.isSVG\">\n                    <div class=\"row\">\n                        <div class=\"inp-form col-lg-4\">\n                            <label>Scale</label>\n                            <input name=\"scaleX\" type=\"number\" (change)=\"modelStructure.glApp.updateData('scale')\"\n                                   step=\"0.1\"\n                                   [(ngModel)]=\"modelStructure.glApp.model.scale.x\">\n                        </div>\n                        <div class=\"inp-form col-lg-4\">\n                            <label>Current</label>\n                            <input name=\"current\" type=\"number\" *ngIf=\"modelStructure.glApp._slider\" disabled=\"true\"\n                                   min=\"0\"\n                                   max=\"36\" [(ngModel)]=\"modelStructure.currentItem\">\n                        </div>\n                        <div class=\"inp-form col-lg-4\">\n                            <label>Frames</label>\n                            <input name=\"frames\" type=\"number\" min=\"0\" max=\"36\" disabled=\"true\"\n                                   [ngModel]=\"modelStructure.images.length\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"inp-form col-lg-4\">\n                            <label>Camera X</label>\n                            <input name=\"posX\" type=\"number\" (change)=\"modelStructure.glApp.updateData('cameraPst')\"\n                                   [(ngModel)]=\"modelStructure.glApp.camera.position.x\">\n                        </div>\n                        <div class=\"inp-form col-lg-4\">\n                            <label>Camera Y</label>\n                            <input name=\"posY\" type=\"number\" (change)=\"modelStructure.glApp.updateData('cameraPst')\"\n                                   [(ngModel)]=\"modelStructure.glApp.camera.position.y\">\n                        </div>\n                        <div class=\"inp-form col-lg-4\">\n                            <label>Camera Z</label>\n                            <input name=\"posZ\" type=\"number\" (change)=\"modelStructure.glApp.updateData('cameraPst')\"\n                                   [(ngModel)]=\"modelStructure.glApp.camera.position.z\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"inp-form col-lg-6\">\n                            <label>Fov</label>\n                            <input name=\"fov\" type=\"number\" step=\"0.01\" (change)=\"modelStructure.glApp.updateData()\"\n                                   [(ngModel)]=\"modelStructure.glApp.camera.fov\">\n                        </div>\n                        <div class=\"inp-form col-lg-6\">\n                            <label>Size</label>\n                            <input name=\"size\" type=\"number\" [(ngModel)]=\"modelStructure.camera.size\"\n                                   (change)=\"modelStructure.glApp.updateData('size')\"\n                                   step=\"0.1\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"inp-form col-lg-6\">\n                            <label>Lens</label>\n                            <input name=\"lens\" type=\"number\" (change)=\"modelStructure.glApp.updateData('lens')\"\n                                   [(ngModel)]=\"modelStructure.camera.lens\" step=\"0.01\">\n                        </div>\n                        <div class=\"inp-form col-lg-6\">\n                            <label>Zoom</label>\n                            <input name=\"zoom\" type=\"number\" (change)=\"modelStructure.glApp.updateData()\"\n                                   [(ngModel)]=\"modelStructure.glApp.camera.zoom\" step=\"0.01\">\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n        <div *ngIf=\"modelStructure._category != _CONFIG.PROJ_DESTINATION.ModelStructure\">\n            <div class=\"bottom-block\">\n                <div class=\"input-wrap\">\n                    <div class=\"col-lg-12\">\n                        <input type=\"text\" #curentName=\"ngModel\" name=\"curentName\"\n                               placeholder=\"Level`s Name\"\n                               [(ngModel)]=\"modelStructure.name\" required autofocus>\n                        <label [class.full-op]=\"curentName.invalid && curentName.touched\">\n                            The Level`s Name is required!</label>\n                    </div>\n                </div>\n                <div class=\"input-wrap\">\n                    <div class=\"inp-form col-lg-12\">\n                        <span>Destionation</span>\n\n                        <div *ngIf=\"modelStructure._category == _CONFIG.PROJ_DESTINATION.LinkGeneralStructure\">\n                            <input name=\"destination1\" #destination1=\"ngModel\" type=\"text\" required\n                                   [pattern]=\"_CONFIG.PATTERNS.URL\"\n                                   [(ngModel)]=\"modelStructure.destination\">\n                            <label [class.full-op]=\"destination1.invalid && destination1.touched\">The\n                                Destionation is required and must be an url!</label>\n                        </div>\n                        <div *ngIf=\"modelStructure._category === _CONFIG.PROJ_DESTINATION.GeneralStructure\">\n                            <textarea rows=\"10\" class=\"col-lg-12\" name=\"destination0\" #destination0=\"ngModel\" required\n                                      [(ngModel)]=\"modelStructure.destination\"></textarea>\n                            <label [class.full-op]=\"destination0.invalid && destination0.touched || !modelStructure.destination.length\">The\n                                Destionation is required and must be an js code! </label>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"add-btn\" *ngIf=\"modelStructure.hasChanges\" (click)=\"modelStructure.sourcesApp.update(editViewForm)\">\n            <i class=\"material-icons\">save</i>\n\n            <div class=\"span-hover\">\n                <span>Save</span>\n            </div>\n        </div>\n        <div class=\"add-btn\" *ngIf=\"modelStructure.hasRecalcChanges && !modelStructure.camera.isSVG\"\n             (click)=\"modelStructure.glApp.recalc()\">\n            <i class=\"material-icons\">exposure</i>\n\n            <div class=\"span-hover\">\n                <span>Recalculate for all</span>\n            </div>\n        </div>\n\n        <div class=\"add-btn disabled\" *ngIf=\"!modelStructure.hasChanges\">\n            <i class=\"material-icons\">save</i>\n        </div>\n    </form>\n</div>"

/***/ }),

/***/ 859:
/***/ (function(module, exports) {

module.exports = "<div class=\"source-project\"  >\n    <div *ngIf=\"!project.model.link\" class=\"source-creating col-lg-3\">\n        <span>Parent creating:</span>\n\n        <form class=\"item-form\" #createForm=\"ngForm\" novalidate>\n            <div class=\"input-wrap\">\n                <input type=\"text\" #parentName=\"ngModel\" name=\"parentName\" placeholder=\"Parent`s Name\"\n                       [(ngModel)]=\"project.model.name\" required autofocus>\n                <label [class.full-op]=\"parentName.invalid && parentName.touched\">The Parent`s Name is required!</label>\n            </div>\n            <div class=\"upload-list col-lg-12\">\n                <app-file-upload [title]=\"'Upload obj/svg'\" [accept]=\"'.obj,.svg'\" [required]=\"1\" [category]=\"[]\" class=\"col-lg-6\"\n                                 #modelObj></app-file-upload>\n                <app-file-upload [title]=\"'Upload frames'\" [multiple]=\"'multiple'\" [required]=\"1\" [category]=\"_CONFIG.FILE.TYPE.PREVIEW_IMG\" [accept]=\"'image/*'\"\n                                 class=\"col-lg-6\" #framesObj></app-file-upload>\n            </div>\n\n            <div class=\"new-btns\">\n                <span class=\"text-btn\" (click)=\"cancel()\">cancel</span>\n                <span class=\"right-btn text-btn\" (click)=\"create(createForm)\">create</span>\n                <!--<input type=\"submit\"  class=\"right-btn text-btn\" class=\"btn btn-default\" value=\"create\" />-->\n            </div>\n        </form>\n\n    </div>\n    <div *ngIf=\"project.model.link\">\n        <div class=\"tabs-view\">\n            <div class=\"tabs-blocks col-lg-12\">\n                <table class=\"my-table col-lg-12\">\n                    <tbody>\n                    <tr>\n                        <td class=\"tabs-header\" [ngClass]=\"{'no-width':treeView.hide}\" #treeView>\n                            <div *ngIf=\"!treeView.hide\" class=\"tab-header\">\n                                <span class=\"title\">Project Map</span>\n                                <span class=\"text-btn\" (click)=\"treeView.hide=!treeView.hide\">hide</span>\n                            </div>\n                            <img *ngIf=\"treeView.hide\" (click)=\"treeView.hide=!treeView.hide\"\n                                 src=\"../assets/img/Fill 2 (1).svg\">\n                        </td>\n                        <td class=\"tabs-header s-tab\" [ngClass]=\"{'no-width':sceneConfig.hide}\" #sceneConfig>\n                            <div class=\"temp-header\" *ngIf=\"!sceneConfig.hide\">\n                                <span class=\"title\">Preferences</span>\n                                <span class=\"text-btn\" (click)=\"sceneConfig.hide=!sceneConfig.hide\">hide</span>\n                            </div>\n                            <img *ngIf=\"sceneConfig.hide\" (click)=\"sceneConfig.hide=!sceneConfig.hide\"\n                                 src=\"../assets/img/Fill 2 (1).svg\">\n                        </td>\n                        <td class=\"s-tab webgl-item\" rowspan=\"2\"\n                            [attr.colspan]=\"sceneConfig.hide && treeView.hide ?3:1\">\n                            <app-project-webgl-view *ngIf=\"selectedChild && selectedChild._category == 2\" [selected]=\"selectedChild\">-----WEBGL------</app-project-webgl-view>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td *ngIf=\"!treeView.hide\" [attr.colspan]=\"sceneConfig.hide?2:1\">\n                            <div class=\"tabs-body\">\n                                <div class=\"body-data\">\n                                    <tree   [mainParent] = \"instance\" [data]=\"project.model.data\"></tree>\n                                </div>\n                            </div>\n                        </td>\n                        <td *ngIf=\"!sceneConfig.hide\" class=\"s-tab\" [attr.colspan]=\"treeView.hide?2:1\">\n                            <div class=\"tabs-body\">\n                                <div class=\"body-data\">\n                                    <app-project-edit-view  *ngIf=\"selectedChild\" [modelStructure]=\"selectedChild\" ></app-project-edit-view>\n                                </div>\n                            </div>\n\n                        </td>\n                        <td *ngIf=\"sceneConfig.hide && treeView.hide\"></td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 860:
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-form\" style=\"width: 420px;height: 580px;\">\n    <span class=\"tag-text\">{{title}}:</span>\n    \n    <div class=\"main-info\">\n        <form class=\"item-form\">\n            <div class=\"input-wrap\">\n                <input type=\"text\" [class.input-fill]=\"project.title\" [class.input-error]=\"!resol.title\" placeholder=\"Projet Name\" [(ngModel)]=\"project.title\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.title = true\">\n                <label [class.full-op]=\"!resol.title\">This input requires a value!</label>\n            </div>\n            <div class=\"input-wrap\">\n                <input type=\"text\" [class.input-fill]=\"project.link\" [class.input-error]=\"!resol.link\"  placeholder=\"datasource URL\" [(ngModel)]=\"project.link\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.link = true\">\n                <label [class.full-op]=\"!resol.link\">This input requires a value!</label>\n            </div>\n        </form>\n        <div class=\"item-photo\">\n            <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + project.image + ')'}\">\n                <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n                <i class=\"material-icons\" [hidden]=\"project.image != false\">crop_original</i>\n            </label>\n            <div class=\"photo-ctrl\" [hidden]=\"project.image\">\n                <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n                <span (click)=\"removePhoto()\">Remove</span>\n            </div>\n            <div class=\"photo-ctrl\" [hidden]=\"!project.image\">\n                <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n            </div>\n            <span class=\"photo-info\">540*330 px</span>\n        </div>\n    </div>\n    <div class=\"new-btns\">\n        <span class=\"text-btn\" (click)=\"cancel()\">cancel</span>\n        <span class=\"right-btn text-btn\" (click)=\"accept()\">accept</span>\n    </div>\n</div>\n"

/***/ }),

/***/ 861:
/***/ (function(module, exports) {

module.exports = "<div class=\"block-bg\" (click)=\"cancel()\"></div>\n\n<div class=\"new-form\">\n    <span class=\"tag-text\">{{title}}</span>\n    <div class=\"main-info\">\n        <form class=\"item-form\" #createViewForm=\"ngForm\" novalidate>\n            <div class=\"input-wrap\">\n                <input type=\"text\" [class.input-fill]=\"project.title\" [class.input-error]=\"!resol.title\" placeholder=\"Projet Name\" [(ngModel)]=\"project.title\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.title = true\">\n                <label [class.full-op]=\"!resol.title\">This input requires a value!</label>\n            </div>\n            <div class=\"input-wrap\">\n\n                <input [class.input-fill]=\"project.link\" [class.input-error]=\"destination1.invalid && (destination1.touched || createViewForm.clicked)\"  placeholder=\"datasource URL\" [(ngModel)]=\"project.link\" [ngModelOptions]=\"{standalone: true}\"\n                       name=\"destination1\" #destination1=\"ngModel\" type=\"text\" required\n                       [pattern]=\"_CONFIG.PATTERNS.URL\" >\n                <label [class.full-op]=\"destination1.invalid && (destination1.touched|| createViewForm.clicked)\">The\n                    Destionation is required and must be an url!</label>\n            </div>\n        </form>\n        <div class=\"item-photo\">\n            <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + project.image + ')'}\">\n                <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n                <i class=\"material-icons\" [hidden]=\"project.image != false\">crop_original</i>\n            </label>\n            <div class=\"photo-ctrl\" [hidden]=\"project.image == false\">\n                <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n                <span (click)=\"removePhoto()\">Remove</span>\n            </div>\n            <div class=\"photo-ctrl\" [hidden]=\"project.image != false\">\n                <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n            </div>\n            <span class=\"photo-info\">540*330 px</span>\n        </div>\n    </div>\n    <div class=\"new-btns\">\n        <span class=\"false-btn\" (click)=\"Create ? cancel() : reset()\">cancel</span>\n        <span class=\"true-btn\" (click)=\"accept(createViewForm)\">{{Create ? 'accept' : 'save'}}</span>\n    </div>\n</div>"

/***/ }),

/***/ 862:
/***/ (function(module, exports) {

module.exports = "<main>\n    <div class=\"projects-wrap\">\n        <div class=\"projects-list  row\" slimScroll  width=\"100%\" alwaysVisible=false distance=\"9px\" height=\"100%\" size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>\n            <app-project-view class=\"project-wrap col-xs-12 col-sm-6 col-lg-4 col-exlg-3\" *ngFor=\"let project of User.projects | namefilter: header.searchName: header.sortType\" [project]=\"project\" ></app-project-view>\n        </div>\n    </div>\n\n    <div class=\"add-btn\" (click)=\"createNewProject = true\" [hidden]=\"createNewProject\">\n        <i class=\"material-icons\">add</i>\n        <div class=\"span-hover\">\n            <span>Add a new project</span>\n        </div>\n    </div>\n</main>\n\n<app-new-project class=\"add-new\" [(openedState)]=\"createNewProject\" [title]=\"'Create a new project:'\" *ngIf=\"createNewProject\"></app-new-project>"

/***/ }),

/***/ 863:
/***/ (function(module, exports) {

module.exports = "<div class=\"project\" [routerLink]=\"['/project', (project._id || 0)]\"  routerLinkActive=\"active\">\n    <div class=\"project-content img-true\" [ngStyle]=\"{'background-image': 'url(' + project.image + ')'}\" [class.img-true]=\"project.image\">\n        <i class=\"material-icons no-img\" [hidden]=\"project.image\">crop_original</i>\n        <div class=\"project-ctrl-wrap\">\n            <span class=\"unpublished\" [hidden]=\"project.published\">Unpublished</span>\n            <div class=\"project-ctrl\">\n                <i class=\"material-icons\" >edit</i>\n                <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"openedPopUp\">\n                    <i class=\"material-icons\" (click)=\"openPopUp($event)\"  >more_vert</i>\n                    <div class=\"pop-up\" [hidden]=\"!openedPopUp\">\n\n                        <div class=\"pop-up-item\"   (click)=\"deactivateProject($event)\">\n                            <i class=\"material-icons\" [innerText]=\"project.published?'visibility':'visibility_off'\"></i>\n                            <div class=\"pop-up-row-name\">\n                                <span [innerText]=\"project.published?'Deactivate':'Activate'\"></span>\n                            </div>\n                        </div>\n                        <div class=\"pop-up-item\" (click)=\"deleteProject($event)\">\n                            <i class=\"material-icons\">delete</i>\n                            <div class=\"pop-up-row-name\">\n                                <span>Delete</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"project-info\">\n            <div class=\"project-title\">{{project.title}}</div>\n            <div class=\"project-created\">Created: {{project.created | date: 'dd.MM.yyyy' }}</div>\n        </div>\n    </div>\n    <div class=\"project-bot\">\n        <span class=\"project-admin\">Admin:</span>\n        <div class=\"project-users\">\n            <div class=\"project-user\">\n                <div class=\"project-user-img\" [ngStyle]=\"{'background-image': 'url(asfd)'}\">\n                    <span>AF</span>\n                </div>\n                <span class=\"project-user-name\">Jennifer Carasdsdfd</span>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 864:
/***/ (function(module, exports) {

module.exports = "<div class=\"block-bg\" (click)=\"cancel()\"></div>\n\n<div class=\"new-form\">\n  <span class=\"tag-text\">Creating a new user:</span>\n  <div class=\"main-info\">\n    <div class=\"item-photo\">\n      <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + tempNewUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempNewUser.avatar != false\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewUser.avatar == false\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewUser.avatar != false\">\n        <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n      </div>\n      <span class=\"photo-info\">300*300 px</span>\n    </div>\n    <form class=\"item-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.input-error]=\"!resol.email || message.email\" placeholder=\"Email\" [(ngModel)]=\"tempNewUser.email\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.email = true; message.email = ''\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n        <label [class.full-op]=\"message.email\">{{message.email}}</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-error]=\"!resol.firstName\"  placeholder=\"First name\" [(ngModel)]=\"tempNewUser.firstName\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-error]=\"!resol.secondName\"  placeholder=\"Last name\" [(ngModel)]=\"tempNewUser.secondName\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-error]=\"!resol.password\" placeholder=\"Password\" [(ngModel)]=\"tempNewUser.password\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.password = true; message.password = ''\">\n        <label [class.full-op]=\"!resol.password\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-error]=\"!resol.passwordRepeat || message.password\" placeholder=\"Repeat password\" [(ngModel)]=\"tempNewUser.passwordRepeat\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.passwordRepeat = true; message.password = ''\">\n        <label [class.full-op]=\"!resol.passwordRepeat\">This input requires a value!</label>\n        <label [class.full-op]=\"message.password\">Password is incorrect</label>\n      </div>\n    </form>\n  </div>\n  <div class=\"user-status\">\n    <div class=\"user-status-item\" *ngIf=\"User.role == 'super'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'super'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'super'\" (click)=\"tempNewUser.role = 'super'; resol.role = true\">radio_button_unchecked</i>\n      <span>Superuser</span>\n    </div>\n    <div class=\"user-status-item\" *ngIf=\"User.role == 'super'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'admin'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'admin'\" (click)=\"tempNewUser.role = 'admin'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-admin</span>\n    </div>\n    <div class=\"user-status-item\" *ngIf=\"User.role !== 'user'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'user'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'user'\" (click)=\"tempNewUser.role = 'user'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-user</span>\n    </div>\n    <label [class.err-status]=\"!resol.role\">Select user status</label>\n  </div>\n  <div class=\"new-btns\">\n    <span class=\"false-btn\" (click)=\"cancel()\">cancel</span>\n    <span class=\"true-btn\" (click)=\"accept()\">accept</span>\n  </div>\n</div>\n"

/***/ }),

/***/ 865:
/***/ (function(module, exports) {

module.exports = "<div class=\"user-card\">\n  <div class=\"user-card-head\">\n    <div>\n      <span class=\"user-card-hd-name\">{{tempUser.firstName}} {{tempUser.secondName}}</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'super'\">superuser</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'admin'\">client-admin</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'user'\">client-user</span>\n    </div>\n    <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"openMenu\" [hidden]=\"!canEdit\">\n      <i class=\"material-icons\" (click)=\"openMenu = !openMenu\" (window:mouseup)=\"openMenu = false\">more_vert</i>\n      <div class=\"pop-up\" [class.hidden]=\"!openMenu\">\n        <div class=\"pop-up-item\">\n          <i class=\"material-icons\">folder</i>\n          <div class=\"pop-up-row-name\">\n            <span>Projects</span>\n            <span class=\"pop-up-num\">{{tempUser.projects.length}}</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\">\n          <i class=\"material-icons\">people</i>\n          <div class=\"pop-up-row-name\">\n            <span>Users</span>\n            <span class=\"pop-up-num\">{{tempUser.users.length}}</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = false\">visibility_off</i>\n          <div class=\"pop-up-row-name\">\n            <span>Deactivate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = true\">visibility</i>\n          <div class=\"pop-up-row-name\">\n            <span>Activate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!canEdit\">\n          <i class=\"material-icons\">lock</i>\n          <div class=\"pop-up-row-name\">\n            <span>Change password</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!canEdit\" (click)=\"delete()\">\n          <i class=\"material-icons\">delete</i>\n          <div class=\"pop-up-row-name\">\n            <span>Delete</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <span class=\"user-card-created-date\">Created: {{tempUser.created | date: 'dd.MM.yyyy' }}</span>\n  </div>\n  <div class=\"user-card-body\">\n    <div class=\"item-photo\">\n      <label class=\"photo\" [class.curs-dis]=\"!canEdit\" [ngStyle]=\"{'background-image': 'url(' + tempUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempUser.avatar\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"!canEdit\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n    </div>\n    <form class=\"item-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.email || message\" placeholder=\"Email\" [(ngModel)]=\"tempUser.email\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.email = true; message =''\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n        <label [class.full-op]=\"message\">{{message}}</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.firstName\" placeholder=\"First name\" [(ngModel)]=\"tempUser.firstName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.secondName\" placeholder=\"Last name\" [(ngModel)]=\"tempUser.secondName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n    </form>\n  </div>\n</div>\n<div class=\"user-card-foot\" [hidden]=\"!canEdit\">\n  <span class=\"user-ft-l false-btn\" (click)=\"reset()\">Reset</span>\n  <span class=\"user-ft-r true-btn\" (click)=\"changeUser()\">save changes</span>\n</div>"

/***/ }),

/***/ 866:
/***/ (function(module, exports) {

module.exports = "<main class=\"row\">\n  <div class=\"user-list-wrap col-md-4\">\n\n    <div class=\"user-list\">\n      <div class=\"slimscroll-wrap\" slimScroll  width=\"100%\" alwaysVisible=false distance=\"0px\" height=\"100%\" size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>\n        <div class=\"user-list-item\" [class.deactive]=\"!user.active\" [class.selected-user]=\"selectedUser === user\" *ngFor=\"let user of User.users | namefilter: header.searchName: header.sortType\">\n          <div class=\"user-item-img-wrap\" [ngStyle]=\"{'background-image': 'url(' + user.avatar + ')'}\" (click)=\"selectUser(user, false)\">\n            <span *ngIf=\"!user.avatar\">{{userService.lettersNoImg(user)}}</span>\n          </div>\n          <div class=\"user-list-item-wrap\">\n            <div class=\"user-name-wrap\">\n              <div class=\"user-name pointer\" (click)=\"selectUser(user, false)\">\n                <span>{{user.firstName}} {{user.secondName}}</span>\n                <i class=\"material-icons\" [hidden]=\"user.active\">visibility_off</i>\n                <span class=\"new-title\" [hidden]=\"!user.newUser\">New</span>\n              </div>\n              <br>\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'super'\">Super user</span>\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'admin'\">Client-admin</span>\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'user'\">Client-user</span>\n            </div>\n            <div class=\"user-ctrl\">\n              <i class=\"material-icons\" (click)=\"selectUser(user, true)\">edit</i>\n              <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"settingsUser === user\">\n                <i class=\"material-icons\" (click)=\"settingsUser = user\" (window:mouseup)=\"settingsUser = null\">more_vert</i>\n                <div class=\"pop-up\" [hidden]=\"settingsUser !== user\">\n                  <div class=\"pop-up-item\" [hidden]=\"!user.active\" (click)=\"deactivateUser(user)\">\n                    <i class=\"material-icons\">visibility_off</i>\n                    <div class=\"pop-up-row-name\">\n                      <span>Deactivate</span>\n                    </div>\n                  </div>\n                  <div class=\"pop-up-item\" [hidden]=\"user.active\" (click)=\"deactivateUser(user)\">\n                    <i class=\"material-icons\">visibility</i>\n                    <div class=\"pop-up-row-name\">\n                      <span>Activate</span>\n                    </div>\n                  </div>\n                  <div class=\"pop-up-item\" (click)=\"deleteUser(user)\">\n                    <i class=\"material-icons\">delete</i>\n                    <div class=\"pop-up-row-name\">\n                      <span>Delete</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"add-btn\" (click)=\"createNewUser = true\" [hidden]=\"createNewUser\">\n      <i class=\"material-icons\">add</i>\n      <div class=\"span-hover\">\n        <span>Add a new user</span>\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"user-card-wrap col-md-8\">\n    <app-user-card [(user)]=\"selectedUser\" [canEdit]=\"canEdit\" [hidden]=\"!selectedUser\"></app-user-card>\n    <span class=\"no-user\" [hidden]=\"selectedUser\">No user selected</span>\n  </div>\n\n</main>\n\n<app-new-user class=\"add-new\" [message]=\"message\" *ngIf=\"createNewUser\" ></app-new-user>\n"

/***/ }),

/***/ 867:
/***/ (function(module, exports) {

module.exports = "<div class=\"login-logo\">\n  <img src=\"../../../assets/img/logo.png\" alt=\"\">\n</div>\n<div class=\"login-form\">\n  <label class=\"login-text\">Log in:</label>\n  <form class=\"item-form\" (keydown)=\"keyDown($event)\">\n    <div class=\"input-wrap\">\n      <input id=\"login-name\" [class.input-error]=\"!resol.email || message\" type=\"text\" [(ngModel)]=\"user.email\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Username / email\" (focus)=\"resol.email = true; message = ''\">\n      <label for=\"login-name\" [class.full-op]=\"!resol.email\">This input requires a value!</label>\n      <label for=\"login-name\" [class.full-op]=\"message\">{{message}}</label>\n    </div>\n    <div class=\"input-wrap\">\n      <input id=\"login-pass\" [class.input-error]=\"!resol.password || message\" type=\"password\" [(ngModel)]=\"user.password\" [ngModelOptions]=\"{standalone: true}\" maxlength=\"15\" placeholder=\"Password\" (focus)=\"resol.password = true; message = ''\">\n      <label for=\"login-pass\" [class.full-op]=\"!resol.password\">This input requires a value!</label>\n      <label for=\"login-pass\" [class.full-op]=\"message\">{{message}}</label>\n    </div>\n  </form>\n  <div class=\"log-in\">\n    <div class=\"chkbx-wrap\">\n      <div id=\"remember-int\" (click)=\"remember = !remember\">\n        <i class=\"material-icons\" [hidden]=\"!remember\">done</i>\n      </div>\n      <label for=\"remember-int\" (click)=\"remember = !remember\">Remember password</label>\n    </div>\n    <span class=\"true-btn\" (click)=\"logIn()\">ACCEPT</span>\n  </div>\n</div>"

/***/ }),

/***/ 868:
/***/ (function(module, exports) {

module.exports = "<div>\n    <app-project-webgl-view *ngIf=\"selected\" [selected]=\"selected\"></app-project-webgl-view>\n</div>"

/***/ }),

/***/ 869:
/***/ (function(module, exports) {

module.exports = "<app-template-loader  [model]=\"modelData\" [templateType]=\"DIR.PROJECT_TEMPLATE._TYPE.CONTROLS\" #tempLoad></app-template-loader>\n<link rel=\"stylesheet\" *ngIf=\"cssUrl\" [href]=\"cssUrl\">\n<div class=\"oxi-controls-container\" [innerHTML]=\"htmlTemplate\"></div>"

/***/ }),

/***/ 870:
/***/ (function(module, exports) {

module.exports = "<app-template-loader  [model]=\"modelData\" [templateType]=\"DIR.PROJECT_TEMPLATE._TYPE.PRELOADER\" #tempLoad></app-template-loader>\n<!--<link rel=\"stylesheet\" *ngIf=\"cssUrl\" [href]=\"cssUrl\">-->\n<div class=\"preloader-back\" #preloader>\n    <img *ngIf = \"preview\" [src]=\"preview\" class=\"preview\" (load)=\"onPreloaderLoad()\" #prevImg>\n    <div class=\"preloader-data\" [innerHTML]=\"htmlTemplate\"></div>\n</div>\n"

/***/ }),

/***/ 871:
/***/ (function(module, exports) {

module.exports = "<div class=\"svg-view\" #parentEl>\n    <canvas #dataEl></canvas>\n    <div *ngIf=\"selected.canEdit\">\n\n        <div [ngClass] =\"{'active': showHelpZoomer}\" class=\"zoomer-c\" >\n            <div class=\"left-border\"></div>\n            <div class=\"top-border\"></div>\n            <canvas #zoomer></canvas>\n        </div>\n\n        <canvas  class=\"buffer-c\"   #bufferC></canvas>\n\n        <div class=\"help-info\">\n            <h1 (mouseover)=\"help=!help\" (mouseout)=\"help=!help\">?</h1>\n                <p class=\"help-text\" [ngClass]=\"{'active':help}\">Press ESC or right click to finish draw, mouse in - to hover draw area, mouse right down - to switch to draw mode, mouse left down - to attach loaded area, hold SHIFT and click on polygon to make group from polygons</p>\n        </div>\n        <div class=\"log-info\">\n            <p *ngIf=\"mode == MODES.ADD || mode == MODES.EDIT\">drawing/edit mode</p>\n            <p *ngIf=\"mode == MODES.NO\">selecting mode</p>\n            <p *ngIf=\"mode == MODES.GROUP\">grouping mode</p>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 872:
/***/ (function(module, exports) {

module.exports = "<app-template-loader [model]=\"modelData\" *ngIf=\"dataSourceLoaded\" [templateType]=\"DIR.PROJECT_TEMPLATE._TYPE.TOOLTIP\"\n                     #tempLoad></app-template-loader>\n<div [ngClass]=\"ProjClasses.PROJ_TOOLTIP_CONTAINER\" *ngIf=\"dataElem\">\n    <div class=\"cos-info\" *ngFor=\"let item of dataElem; let i = index\"\n         [ngClass]=\"{'active' : item.active,'act':item.tooltip.active,'tooltip-align-left':item.alignLeft,'tooltip-align-right':item.alignRight,'tooltip-align-bottom':item.alignBottom}\" (selectstart)=\"onEventPrevent($event)\"\n         [style.left]=\"item._left\"\n         [style.top]=\"item._top\" (click)=\"item.onclick()\">\n        <template dynamic-component\n                  [componentContext]=\"{tooltip: item.tooltip}\"\n                  [componentTemplate]='item.html'></template>\n    </div>\n</div>\n"

/***/ }),

/***/ 873:
/***/ (function(module, exports) {

module.exports = "<div class=\"webgl-view\" [ngClass]=\"{'preview':selected && !selected.canEdit}\" #renderParent>\n    <div class=\"center-container THREEJS\" [ngClass]=\"{'svg-active':selected.camera.isSVG}\" #projCnt>\n        <app-project-preloader [preview]=\"preview\" [modelData]=\"selected.parent\" #preloader ></app-project-preloader>\n        <app-project-webgl-controls [modelData]=\"selected.parent\" #preControls></app-project-webgl-controls>\n        <app-project-webgl-tooltip  [modelData]=\"selected.parent\" #preToolTip ></app-project-webgl-tooltip>\n        <app-project-svg-view  [selected]=\"selected\" [glapp]=\"_self\" *ngIf=\"selected.camera.isSVG && app.allLoad\" #svgEl></app-project-svg-view>\n    </div>\n</div>\n"

/***/ }),

/***/ 918:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 919:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 920:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 921:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 923:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(593);


/***/ })

},[923]);
//# sourceMappingURL=main.bundle.js.map