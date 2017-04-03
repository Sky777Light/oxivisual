webpackJsonp([1,4],{

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(151);
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
    }
    ShareService.prototype.changeShareSubject = function (val) {
        this.shareSubject.next(val);
    };
    ShareService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ShareService);
    return ShareService;
}());
//# sourceMappingURL=share.service.js.map

/***/ }),

/***/ 340:
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
    }
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__(764),
            styles: [__webpack_require__(730)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(57);
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
        this.remember = false;
        this.resol = {
            email: true,
            password: true
        };
        this.user = {
            email: '',
            password: ''
        };
    }
    LoginComponent.prototype.logIn = function () {
        if (!this.userService.resolUser(this.resol, this.user))
            return false;
        this.userService.logIn(this.remember, this.user);
    };
    LoginComponent.prototype.keyDown = function ($event) {
        if ($event.keyCode == 13) {
            this.logIn();
        }
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__(765),
            styles: [__webpack_require__(731)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function ProjectsComponent() {
        this.title = 'Projects';
        this.projects = [
            {
                title: 'first',
                number: 1
            },
            {
                title: 'second',
                number: 2
            },
            {
                title: 'third',
                number: 3
            }
        ];
    }
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-projects',
            template: __webpack_require__(767),
            styles: [__webpack_require__(733)]
        }), 
        __metadata('design:paramtypes', [])
    ], ProjectsComponent);
    return ProjectsComponent;
}());
//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(93);
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
            arrLength: 0
        };
        this.sortType = 'A-Z';
        this.canEdit = false;
        //create new user
        this.createNewUser = false;
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.User = this.userService.getUser();
        this.subNewUser = this.shareService.shareListener.subscribe(function (user) {
            if (user != undefined) {
                _this.createNewUser = false;
                if (user.newUser) {
                    _this.authService.post('/api/users/user', user).subscribe(function (res) {
                        res = res.json();
                        if (res.status) {
                            _this.User.users.push(res.res);
                        }
                        alertify.success(res.message);
                    }, function (error) { });
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
    ;
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-users',
            template: __webpack_require__(769),
            styles: [__webpack_require__(735)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], UsersComponent);
    return UsersComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_service__ = __webpack_require__(57);
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
        if (this.storageService.get("token") || this.storageService.tempToken) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuardService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.authService.get('/api/users/user').map(function (res) {
            res = res.json();
            if (res.status) {
                _this.userService.setUser(res.res);
                return res.res;
            }
            _this.userService.logOut();
            return false;
        });
    };
    AuthGuardService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */]) === 'function' && _d) || Object])
    ], AuthGuardService);
    return AuthGuardService;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(94);
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
        if (!this.storageService.get("token") && !this.storageService.tempToken) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    };
    LoggedGuardService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */]) === 'function' && _b) || Object])
    ], LoggedGuardService);
    return LoggedGuardService;
    var _a, _b;
}());
//# sourceMappingURL=logged-guard.service.js.map

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 544;


/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(672);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(90);
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
        this.User = {
            _id: '',
            email: '',
            firstName: '',
            secondName: '',
            avatar: '',
            role: '',
            created: '',
            projects: [],
            users: [],
            active: true
        };
    }
    UserService.prototype.logIn = function (remember, user) {
        var _this = this;
        this.authService.post('/auth/login', user).subscribe(function (response) {
            var res = JSON.parse(response._body);
            if (res.status) {
                remember ? _this.storageService.set('token', res.token) : _this.storageService.tempToken = res.token;
                _this.router.navigate(['/']);
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    UserService.prototype.logOut = function () {
        var _this = this;
        this.storageService.remove('token');
        this.storageService.tempToken = null;
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
        for (var i in this.User) {
            if (user[i]) {
                this.User[i] = user[i];
            }
        }
    };
    UserService.prototype.getUser = function () {
        return this.User;
    };
    UserService.prototype.resolUser = function (resol, user) {
        var resolFlag = true;
        for (var i in resol) {
            resol[i] = user[i] ? true : false;
            if (!resol[i])
                resolFlag = false;
        }
        return resolFlag;
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], UserService);
    return UserService;
    var _a, _b, _c;
}());
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 662:
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

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(761),
            styles: [__webpack_require__(727)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_storage_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_user_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_guard_service__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_logged_guard_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_login_login_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_projects_projects_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_home_home_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_aside_aside_component__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_header_header_component__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_users_users_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_user_card_user_card_component__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_new_user_new_user_component__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_sort_pipe__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pipes_name_pipe__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__directives_slimscroll_directive__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_share_service__ = __webpack_require__(209);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_projects_projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_aside_aside_component__["a" /* AsideComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_users_users_component__["a" /* UsersComponent */],
                __WEBPACK_IMPORTED_MODULE_20__pipes_sort_pipe__["a" /* SortPipe */],
                __WEBPACK_IMPORTED_MODULE_21__pipes_name_pipe__["a" /* NamePipe */],
                __WEBPACK_IMPORTED_MODULE_18__components_user_card_user_card_component__["a" /* UserCardComponent */],
                __WEBPACK_IMPORTED_MODULE_22__directives_slimscroll_directive__["a" /* SlimScroll */],
                __WEBPACK_IMPORTED_MODULE_19__components_new_user_new_user_component__["a" /* NewUserComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__["a" /* AlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5__router__["a" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_7__services_storage_service__["a" /* StorageService */],
                __WEBPACK_IMPORTED_MODULE_9__services_auth_guard_service__["a" /* AuthGuardService */],
                __WEBPACK_IMPORTED_MODULE_10__services_logged_guard_service__["a" /* LoggedGuardService */],
                __WEBPACK_IMPORTED_MODULE_8__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_23__services_share_service__["a" /* ShareService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(57);
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
    function AsideComponent(userService, router, route) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.route = route;
        route.data.subscribe(function (data) {
            _this.user = data.user;
        });
    }
    AsideComponent.prototype.logOut = function () {
        this.userService.logOut();
    };
    AsideComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-aside',
            template: __webpack_require__(762),
            styles: [__webpack_require__(728)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], AsideComponent);
    return AsideComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=aside.component.js.map

/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function HeaderComponent() {
        this.searchResChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* EventEmitter */]();
        this.sortTypeChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* EventEmitter */]();
    }
    HeaderComponent.prototype.changeSearchRes = function (val) {
        this.searchRes = val;
        this.searchResChange.emit(this.searchRes);
    };
    HeaderComponent.prototype.changeSortType = function (val) {
        this.sortType = val;
        this.sortTypeChange.emit(this.sortType);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Object)
    ], HeaderComponent.prototype, "header", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Object)
    ], HeaderComponent.prototype, "searchRes", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), 
        __metadata('design:type', Object)
    ], HeaderComponent.prototype, "searchResChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Object)
    ], HeaderComponent.prototype, "sortType", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), 
        __metadata('design:type', Object)
    ], HeaderComponent.prototype, "sortTypeChange", void 0);
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__(763),
            styles: [__webpack_require__(729)]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(57);
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
        this.tempNewUser = {
            email: '',
            firstName: '',
            secondName: '',
            avatar: '',
            role: '',
            created: '',
            password: '',
            passwordRepeat: '',
            projects: [],
            users: [],
            active: true,
            newUser: true
        };
        this.resol = {
            firstName: true,
            secondName: true,
            email: true,
            password: true,
            passwordRepeat: true,
            role: true
        };
    }
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
        //user's create date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        this.tempNewUser.created = dd + '.' + mm + '.' + yyyy;
        this.tempNewUser.newUser = true;
        this.shareService.changeShareSubject(this.tempNewUser);
    };
    NewUserComponent.prototype.cancel = function () {
        this.tempNewUser.newUser = false;
        this.shareService.changeShareSubject(this.tempNewUser);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NewUserComponent.prototype, "keyDown", null);
    NewUserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-new-user',
            template: __webpack_require__(766),
            styles: [__webpack_require__(732)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], NewUserComponent);
    return NewUserComponent;
    var _a, _b;
}());
//# sourceMappingURL=new-user.component.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(93);
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
        this.userChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* EventEmitter */]();
        this.resol = {
            firstName: true,
            secondName: true,
            email: true
        };
        //popup menu
        this.openMenu = false;
    }
    UserCardComponent.prototype.ngOnInit = function () {
        this.User = this.userService.getUser();
    };
    UserCardComponent.prototype.ngOnChanges = function (changes) {
        if (changes['user']) {
            this.tempUser = Object.assign({}, changes['user'].currentValue);
        }
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
                _this.user.avatar = _this.tempUser.avatar;
            }
            alertify.success(res.message);
        }, function (error) { });
    };
    UserCardComponent.prototype.reset = function () {
        this.tempUser = Object.assign({}, this.user);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Object)
    ], UserCardComponent.prototype, "canEdit", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Object)
    ], UserCardComponent.prototype, "user", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), 
        __metadata('design:type', Object)
    ], UserCardComponent.prototype, "userChange", void 0);
    UserCardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-user-card',
            template: __webpack_require__(768),
            styles: [__webpack_require__(734)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], UserCardComponent);
    return UserCardComponent;
    var _a, _b;
}());
//# sourceMappingURL=user-card.component.js.map

/***/ }),

/***/ 668:
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])("window:resize", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SlimScroll.prototype, "onResize", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "width", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "height", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "size", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "color", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "position", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "distance", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "start", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "opacity", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "transition", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "alwaysVisible", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "disableFadeOut", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "railVisible", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "railColor", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "railOpacity", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "railClass", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "barClass", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "wrapperClass", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SlimScroll.prototype, "allowPageScroll", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "wheelStep", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "touchScrollStep", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "borderRadius", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimScroll.prototype, "railBorderRadius", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SlimScroll.prototype, "scrollTo", null);
    SlimScroll = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Directive */])({
            selector: "[slimScroll]"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Renderer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Renderer */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* ElementRef */]) === 'function' && _b) || Object])
    ], SlimScroll);
    return SlimScroll;
    var _a, _b;
}());
//# sourceMappingURL=slimscroll.directive.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function NamePipe() {
    }
    NamePipe.prototype.transform = function (items, name, moreParams) {
        if (!name) {
            moreParams.arrLength = items.length;
            return items;
        }
        if (items) {
            this.filteredList = items.filter(function (item) {
                if (item.firstName)
                    return ((item.firstName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1) || (item.secondName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1));
                return (item.title.toUpperCase().indexOf(name.toUpperCase(), 0) > -1);
            });
            moreParams.arrLength = this.filteredList.length;
            return this.filteredList;
        }
    };
    NamePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Pipe */])({
            name: 'namefilter',
            pure: false
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], NamePipe);
    return NamePipe;
}());
//# sourceMappingURL=name.pipe.js.map

/***/ }),

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SortPipe = (function () {
    function SortPipe() {
    }
    SortPipe.prototype.transform = function (items, args) {
        if (!args)
            return items;
        if (items) {
            if (args == 'A-Z') {
                items.sort(function (a, b) {
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
                return items;
            }
            else if (args == 'Z-A') {
                items.sort(function (a, b) {
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
                return items;
            }
        }
    };
    SortPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Pipe */])({
            name: 'sortfilter',
            pure: false
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], SortPipe);
    return SortPipe;
}());
//# sourceMappingURL=sort.pipe.js.map

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_logged_guard_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_projects_projects_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_login_login_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_home_home_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_users_users_component__ = __webpack_require__(343);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });







var routes = [
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_5__components_home_home_component__["a" /* HomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__["a" /* AuthGuardService */]],
        resolve: {
            user: __WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__["a" /* AuthGuardService */]
        },
        children: [
            {
                path: 'projects',
                component: __WEBPACK_IMPORTED_MODULE_3__components_projects_projects_component__["a" /* ProjectsComponent */]
            },
            {
                path: 'users',
                component: __WEBPACK_IMPORTED_MODULE_6__components_users_users_component__["a" /* UsersComponent */]
            }
        ]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_4__components_login_login_component__["a" /* LoginComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_1__services_logged_guard_service__["a" /* LoggedGuardService */]]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=router.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".app-wrap {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-aside {\n  display: inline-block;\n  float: left;\n  width: 260px;\n  height: 100%;\n  background-color: #ffffff;\n  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n  app-aside header {\n    width: 100%;\n    height: 160px;\n    background-color: #1976D2;\n    padding: 20px;\n    color: #ffffff; }\n    app-aside header .asd-hd-top {\n      width: 100%;\n      height: 64px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside header .asd-hd-top .asd-name-in {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        width: 60px;\n        height: 60px;\n        border-radius: 50%;\n        background-color: #ffffff;\n        font-family: Roboto-Light;\n        font-size: 20px;\n        color: #181818; }\n      app-aside header .asd-hd-top .asd-status-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: end;\n            -ms-flex-align: end;\n                align-items: flex-end; }\n        app-aside header .asd-hd-top .asd-status-wrap i {\n          height: 16px;\n          width: 20px;\n          line-height: 0.7; }\n        app-aside header .asd-hd-top .asd-status-wrap .asd-status {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          width: 80px;\n          height: 24px;\n          background-color: rgba(255, 255, 255, 0.1);\n          border-radius: 100px;\n          font-size: 12px;\n          font-family: Roboto-Medium; }\n    app-aside header .asd-hd-bot {\n      width: 100%;\n      height: 60px;\n      padding-top: 21px;\n      font-size: 14px; }\n      app-aside header .asd-hd-bot .asd-email-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-aside header .asd-hd-bot .asd-email-wrap .asd-email {\n          font-family: Roboto-Light;\n          opacity: 0.4; }\n  app-aside .user-pop-up {\n    position: inherit;\n    width: 100%;\n    height: 160px;\n    padding: 20px 0;\n    border-bottom: 2px solid #D6D5D5;\n    box-shadow: none;\n    border-radius: 0; }\n    app-aside .user-pop-up .user-pop-up-item i {\n      margin-right: 32px; }\n    app-aside .user-pop-up .user-pop-up-item .user-pop-up-num {\n      font-size: 13px; }\n    app-aside .user-pop-up .asd-active {\n      color: #1976D2;\n      background-color: rgba(25, 118, 210, 0.1); }\n  app-aside footer {\n    width: 100%;\n    height: calc( 100% - 320px);\n    padding: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    font-size: 15px;\n    color: #9B9B9B; }\n    app-aside footer .asd-logout {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-aside footer .asd-logout i {\n        margin-right: 30px; }\n    app-aside footer .asd-terms {\n      width: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside footer .asd-terms a {\n        text-decoration: underline;\n        font-size: 13px;\n        color: #9B9B9B; }\n      app-aside footer .asd-terms img {\n        width: 88px;\n        -webkit-filter: invert(40%) grayscale(100%);\n                filter: invert(40%) grayscale(100%); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 729:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 90px;\n  padding: 25px 30px;\n  border-bottom: 2px solid #EBEBEB;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  app-header .header-wrap {\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-header .header-wrap span {\n      white-space: nowrap; }\n    app-header .header-wrap .header-tag {\n      font-size: 24px;\n      color: #444444; }\n      app-header .header-wrap .header-tag span {\n        font-size: 12px;\n        color: #9B9B9B;\n        margin-left: 10px; }\n    app-header .header-wrap .header-search {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      height: 100%;\n      width: 100%;\n      min-width: 150px;\n      margin: 0 60px;\n      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.12); }\n      app-header .header-wrap .header-search input {\n        width: 100%;\n        font-size: 16px; }\n        app-header .header-wrap .header-search input::-webkit-input-placeholder {\n          color: #4D4D4E; }\n        app-header .header-wrap .header-search input::-moz-placeholder {\n          color: #4D4D4E; }\n        app-header .header-wrap .header-search input:-ms-input-placeholder {\n          color: #4D4D4E; }\n        app-header .header-wrap .header-search input:-moz-placeholder {\n          color: #4D4D4E; }\n    app-header .header-wrap .header-sort {\n      height: 100%;\n      width: 270px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 15px; }\n      app-header .header-wrap .header-sort .sort-select {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        margin-left: 20px;\n        width: 184px;\n        height: 40px;\n        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);\n        border-radius: 2px;\n        color: #9B9B9B; }\n        app-header .header-wrap .header-sort .sort-select .sort-select-item {\n          width: 100%;\n          height: 100%;\n          padding: 20px;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: justify;\n              -ms-flex-pack: justify;\n                  justify-content: space-between;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "app-home {\n  width: 100%;\n  height: 100%; }\n  app-home #main-content {\n    display: inline-block;\n    width: calc(100% - 260px);\n    height: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 731:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".pos-center, app-login .login-form .log-in .chkbx-wrap #remember-int i {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-login {\n  background-color: #1976D2;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n  app-login .login-logo {\n    width: 165px;\n    height: 30px;\n    position: absolute;\n    left: 50%;\n    top: 16.6%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n    app-login .login-logo img {\n      width: 100%;\n      height: 100%; }\n  app-login .login-form {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 380px;\n    height: 280px;\n    padding: 30px;\n    box-sizing: border-box;\n    background-color: #ffffff;\n    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n    app-login .login-form .login-text {\n      font-size: 24px;\n      color: #444444; }\n    app-login .login-form .log-in {\n      margin-top: 45px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-login .login-form .log-in .chkbx-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-login .login-form .log-in .chkbx-wrap #remember-int {\n          position: relative;\n          float: left;\n          width: 18px;\n          height: 18px;\n          border: 1px solid #4D4D4E;\n          border-radius: 3px;\n          cursor: pointer; }\n        app-login .login-form .log-in .chkbx-wrap label[for=remember-int] {\n          margin-left: 10px;\n          font-size: 15px;\n          cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 732:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-new-user {\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  z-index: 1000;\n  top: 0;\n  left: 0; }\n  app-new-user .block-bg {\n    height: 100%;\n    width: 100%;\n    opacity: 0.2;\n    background-color: #000000; }\n  app-new-user .new-user-form {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    padding: 30px;\n    width: 460px;\n    height: 540px;\n    background-color: #ffffff;\n    box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19); }\n    app-new-user .new-user-form .tag-text {\n      font-size: 18px;\n      color: #444444; }\n    app-new-user .new-user-form .main-info {\n      width: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      app-new-user .new-user-form .main-info .user-photo {\n        padding-top: 30px;\n        width: 130px;\n        height: 200px; }\n        app-new-user .new-user-form .main-info .user-photo .photo {\n          width: 130px;\n          height: 130px; }\n      app-new-user .new-user-form .main-info .user-form {\n        width: 240px;\n        margin-left: 30px; }\n    app-new-user .new-user-form .user-status {\n      width: 100%;\n      position: relative;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      margin: 50px 0 58px; }\n      app-new-user .new-user-form .user-status .user-status-item {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        font-size: 16px;\n        color: #4A4A4A; }\n        app-new-user .new-user-form .user-status .user-status-item span {\n          margin-left: 12px; }\n        app-new-user .new-user-form .user-status .user-status-item .selected-status {\n          color: #1976D2; }\n      app-new-user .new-user-form .user-status label {\n        position: absolute;\n        width: 100%;\n        left: 0;\n        top: 30px;\n        text-align: center;\n        color: #ff0000;\n        font-size: 12px;\n        opacity: 0;\n        -webkit-transition: opacity .5s;\n        transition: opacity .5s;\n        border-top: 2px solid #ff0000; }\n      app-new-user .new-user-form .user-status .err-status {\n        opacity: 1; }\n    app-new-user .new-user-form .new-user-btns {\n      width: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: end;\n          -ms-flex-pack: end;\n              justify-content: flex-end; }\n      app-new-user .new-user-form .new-user-btns .right-btn {\n        margin-left: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-projects {\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-user-card {\n  height: 420px;\n  width: 100%; }\n  app-user-card .user-card, app-user-card .user-card-foot {\n    padding: 0 30px 0 27px;\n    border-bottom: 2px solid #EBEBEB; }\n  app-user-card .user-card {\n    height: 340px;\n    width: 100%; }\n    app-user-card .user-card .user-card-head {\n      width: 100%;\n      height: 80px;\n      position: relative;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-user-card .user-card .user-card-head .user-card-hd-name {\n        font-size: 24px;\n        color: #444444; }\n      app-user-card .user-card .user-card-head .user-card-hd-status {\n        font-size: 14px;\n        font-style: italic;\n        color: #9B9B9B;\n        margin-left: 10px; }\n      app-user-card .user-card .user-card-head .user-card-hd-menu {\n        height: 40px;\n        width: 40px;\n        position: relative;\n        border-radius: 50%;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-user-card .user-card .user-card-head .user-card-hd-menu .user-pop-up {\n          top: 50px;\n          width: 200px;\n          height: 215px; }\n      app-user-card .user-card .user-card-head .user-card-hd-menu-active {\n        background-color: #EBEBEB; }\n      app-user-card .user-card .user-card-head .user-card-created-date {\n        position: absolute;\n        line-height: 0.7;\n        bottom: 0px;\n        font-size: 14px;\n        color: #9B9B9B; }\n    app-user-card .user-card .user-card-body {\n      width: 100%;\n      height: 260px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      app-user-card .user-card .user-card-body .user-photo {\n        padding-top: 35px;\n        width: 120px;\n        height: 100%; }\n      app-user-card .user-card .user-card-body .user-form {\n        margin-left: 60px; }\n  app-user-card .user-card-foot {\n    height: 80px;\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-user-card .user-card-foot .user-ft-l {\n      margin-right: 15px; }\n    app-user-card .user-card-foot .user-ft-r {\n      margin-left: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-users {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  app-users main {\n    width: 100%;\n    height: calc(100% - 90px); }\n    app-users main .user-list-wrap {\n      position: relative;\n      height: 100%;\n      padding: 0;\n      border-right: 2px solid #EBEBEB; }\n      app-users main .user-list-wrap .user-list {\n        height: 90%;\n        width: 100%; }\n        app-users main .user-list-wrap .user-list .slimscroll-wrap {\n          width: 100%;\n          height: 100%; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item {\n            padding-left: 30px;\n            width: 100%;\n            height: 80px;\n            border-bottom: 2px solid #EBEBEB;\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: justify;\n                -ms-flex-pack: justify;\n                    justify-content: space-between; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-item-img-wrap {\n              width: 39px;\n              height: 39px;\n              border-radius: 50%; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item img {\n              width: 39px;\n              height: 39px;\n              border-radius: 50%; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-name-wrap {\n              margin-left: 15px;\n              width: 100%; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-name-wrap .user-name {\n                display: -webkit-inline-box;\n                display: -ms-inline-flexbox;\n                display: inline-flex;\n                -webkit-box-align: center;\n                    -ms-flex-align: center;\n                        align-items: center; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-name-wrap .user-name i {\n                  margin-left: 10px;\n                  font-size: 21px;\n                  line-height: 0.7; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-name-wrap .user-name span {\n                  display: block;\n                  float: left; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-name-wrap .user-name .new-title {\n                  margin-left: 10px;\n                  color: #FFA000; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-name-wrap .user-status {\n                font-size: 14px;\n                font-family: Roboto-Light;\n                color: #9B9B9B;\n                font-style: italic; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-ctrl {\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-ctrl .user-edit-wrap {\n                position: relative;\n                width: 30px;\n                height: 30px;\n                border-radius: 50%;\n                display: -webkit-box;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-pack: center;\n                    -ms-flex-pack: center;\n                        justify-content: center;\n                -webkit-box-align: center;\n                    -ms-flex-align: center;\n                        align-items: center;\n                margin-right: 20px; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-ctrl .user-edit-wrap .user-pop-up {\n                  top: 35px;\n                  width: 170px;\n                  height: 100px; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-ctrl .user-edit-active {\n                background-color: #EBEBEB; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive img {\n            opacity: 0.5; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap {\n            color: #D6D5D5; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap span {\n              color: #D6D5D5 !important; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .selected-user {\n            background-color: rgba(255, 160, 0, 0.1); }\n    app-users main .user-card-wrap {\n      padding: 0;\n      height: 100%;\n      position: relative; }\n      app-users main .user-card-wrap .no-user {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        font-size: 24px;\n        color: #D6D5D5; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 737:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 358,
	"./af.js": 358,
	"./ar": 365,
	"./ar-dz": 359,
	"./ar-dz.js": 359,
	"./ar-kw": 360,
	"./ar-kw.js": 360,
	"./ar-ly": 361,
	"./ar-ly.js": 361,
	"./ar-ma": 362,
	"./ar-ma.js": 362,
	"./ar-sa": 363,
	"./ar-sa.js": 363,
	"./ar-tn": 364,
	"./ar-tn.js": 364,
	"./ar.js": 365,
	"./az": 366,
	"./az.js": 366,
	"./be": 367,
	"./be.js": 367,
	"./bg": 368,
	"./bg.js": 368,
	"./bn": 369,
	"./bn.js": 369,
	"./bo": 370,
	"./bo.js": 370,
	"./br": 371,
	"./br.js": 371,
	"./bs": 372,
	"./bs.js": 372,
	"./ca": 373,
	"./ca.js": 373,
	"./cs": 374,
	"./cs.js": 374,
	"./cv": 375,
	"./cv.js": 375,
	"./cy": 376,
	"./cy.js": 376,
	"./da": 377,
	"./da.js": 377,
	"./de": 380,
	"./de-at": 378,
	"./de-at.js": 378,
	"./de-ch": 379,
	"./de-ch.js": 379,
	"./de.js": 380,
	"./dv": 381,
	"./dv.js": 381,
	"./el": 382,
	"./el.js": 382,
	"./en-au": 383,
	"./en-au.js": 383,
	"./en-ca": 384,
	"./en-ca.js": 384,
	"./en-gb": 385,
	"./en-gb.js": 385,
	"./en-ie": 386,
	"./en-ie.js": 386,
	"./en-nz": 387,
	"./en-nz.js": 387,
	"./eo": 388,
	"./eo.js": 388,
	"./es": 390,
	"./es-do": 389,
	"./es-do.js": 389,
	"./es.js": 390,
	"./et": 391,
	"./et.js": 391,
	"./eu": 392,
	"./eu.js": 392,
	"./fa": 393,
	"./fa.js": 393,
	"./fi": 394,
	"./fi.js": 394,
	"./fo": 395,
	"./fo.js": 395,
	"./fr": 398,
	"./fr-ca": 396,
	"./fr-ca.js": 396,
	"./fr-ch": 397,
	"./fr-ch.js": 397,
	"./fr.js": 398,
	"./fy": 399,
	"./fy.js": 399,
	"./gd": 400,
	"./gd.js": 400,
	"./gl": 401,
	"./gl.js": 401,
	"./gom-latn": 402,
	"./gom-latn.js": 402,
	"./he": 403,
	"./he.js": 403,
	"./hi": 404,
	"./hi.js": 404,
	"./hr": 405,
	"./hr.js": 405,
	"./hu": 406,
	"./hu.js": 406,
	"./hy-am": 407,
	"./hy-am.js": 407,
	"./id": 408,
	"./id.js": 408,
	"./is": 409,
	"./is.js": 409,
	"./it": 410,
	"./it.js": 410,
	"./ja": 411,
	"./ja.js": 411,
	"./jv": 412,
	"./jv.js": 412,
	"./ka": 413,
	"./ka.js": 413,
	"./kk": 414,
	"./kk.js": 414,
	"./km": 415,
	"./km.js": 415,
	"./kn": 416,
	"./kn.js": 416,
	"./ko": 417,
	"./ko.js": 417,
	"./ky": 418,
	"./ky.js": 418,
	"./lb": 419,
	"./lb.js": 419,
	"./lo": 420,
	"./lo.js": 420,
	"./lt": 421,
	"./lt.js": 421,
	"./lv": 422,
	"./lv.js": 422,
	"./me": 423,
	"./me.js": 423,
	"./mi": 424,
	"./mi.js": 424,
	"./mk": 425,
	"./mk.js": 425,
	"./ml": 426,
	"./ml.js": 426,
	"./mr": 427,
	"./mr.js": 427,
	"./ms": 429,
	"./ms-my": 428,
	"./ms-my.js": 428,
	"./ms.js": 429,
	"./my": 430,
	"./my.js": 430,
	"./nb": 431,
	"./nb.js": 431,
	"./ne": 432,
	"./ne.js": 432,
	"./nl": 434,
	"./nl-be": 433,
	"./nl-be.js": 433,
	"./nl.js": 434,
	"./nn": 435,
	"./nn.js": 435,
	"./pa-in": 436,
	"./pa-in.js": 436,
	"./pl": 437,
	"./pl.js": 437,
	"./pt": 439,
	"./pt-br": 438,
	"./pt-br.js": 438,
	"./pt.js": 439,
	"./ro": 440,
	"./ro.js": 440,
	"./ru": 441,
	"./ru.js": 441,
	"./sd": 442,
	"./sd.js": 442,
	"./se": 443,
	"./se.js": 443,
	"./si": 444,
	"./si.js": 444,
	"./sk": 445,
	"./sk.js": 445,
	"./sl": 446,
	"./sl.js": 446,
	"./sq": 447,
	"./sq.js": 447,
	"./sr": 449,
	"./sr-cyrl": 448,
	"./sr-cyrl.js": 448,
	"./sr.js": 449,
	"./ss": 450,
	"./ss.js": 450,
	"./sv": 451,
	"./sv.js": 451,
	"./sw": 452,
	"./sw.js": 452,
	"./ta": 453,
	"./ta.js": 453,
	"./te": 454,
	"./te.js": 454,
	"./tet": 455,
	"./tet.js": 455,
	"./th": 456,
	"./th.js": 456,
	"./tl-ph": 457,
	"./tl-ph.js": 457,
	"./tlh": 458,
	"./tlh.js": 458,
	"./tr": 459,
	"./tr.js": 459,
	"./tzl": 460,
	"./tzl.js": 460,
	"./tzm": 462,
	"./tzm-latn": 461,
	"./tzm-latn.js": 461,
	"./tzm.js": 462,
	"./uk": 463,
	"./uk.js": 463,
	"./ur": 464,
	"./ur.js": 464,
	"./uz": 466,
	"./uz-latn": 465,
	"./uz-latn.js": 465,
	"./uz.js": 466,
	"./vi": 467,
	"./vi.js": 467,
	"./x-pseudo": 468,
	"./x-pseudo.js": 468,
	"./yo": 469,
	"./yo.js": 469,
	"./zh-cn": 470,
	"./zh-cn.js": 470,
	"./zh-hk": 471,
	"./zh-hk.js": 471,
	"./zh-tw": 472,
	"./zh-tw.js": 472
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
webpackContext.id = 737;


/***/ }),

/***/ 761:
/***/ (function(module, exports) {

module.exports = "<div class=\"app-wrap\">\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 762:
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"asd-hd-top\">\n    <div class=\"asd-name-in\">KL</div>\n    <div class=\"asd-status-wrap\">\n      <i class=\"material-icons\">arrow_back</i>\n      <div class=\"asd-status\">Super user</div>\n    </div>\n  </div>\n  <div class=\"asd-hd-bot\">\n    <div class=\"asd-name\">Kyle Ledbetter</div>\n    <div class=\"asd-email-wrap\">\n      <div class=\"asd-email\">kyle@kyleledbetter.com</div>\n      <i class=\"material-icons\">arrow_drop_down</i>\n    </div>\n  </div>\n</header>\n\n<div class=\"user-pop-up\">\n  <div class=\"user-pop-up-item\" routerLink=\"/projects\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">folder</i><span class=\"pointer\">Projects</span>\n    <span class=\"user-pop-up-num\">4</span>\n  </div>\n  <div class=\"user-pop-up-item\" routerLink=\"/users\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">people</i><span class=\"pointer\">Users</span>\n    <span class=\"user-pop-up-num\">12</span>\n  </div>\n  <div class=\"user-pop-up-item\" routerLink=\"/settings\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">settings</i><span class=\"pointer\">Settings</span>\n  </div>\n</div>\n\n<footer>\n  <div class=\"asd-logout\">\n    <i class=\"material-icons\" (click)=\"logOut()\">exit_to_app</i>\n    <div class=\"text-wrap pointer\" (click)=\"logOut()\">\n      Log out\n    </div>\n  </div>\n  <div class=\"asd-terms\">\n    <img src=\"../../../assets/img/logo.png\" alt=\"\">\n    <a href=\"#\">Terms</a>\n  </div>\n</footer>\n"

/***/ }),

/***/ 763:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-wrap col-md-12\">\n  <div class=\"header-tag\">{{header.title}}<span>{{'( ' + header.arrLength + ' )'}}</span></div>\n  <div class=\"header-search\">\n    <input type=\"text\" placeholder=\"Search\" (input)=\"changeSearchRes($event.target.value)\">\n  </div>\n  <div class=\"header-sort\">\n    <span>Sorted by:</span>\n    <div class=\"sort-select\">\n      <div class=\"sort-select-item\" (click)=\"changeSortType('A-Z')\">A-Z<i class=\"material-icons\">arrow_drop_down</i></div>\n      <div class=\"sort-select-item\" (click)=\"changeSortType('Z-A')\">Z-A</div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 764:
/***/ (function(module, exports) {

module.exports = "<app-aside></app-aside>\n<main id=\"main-content\">\n    <router-outlet></router-outlet>\n</main>\n\n"

/***/ }),

/***/ 765:
/***/ (function(module, exports) {

module.exports = "<div class=\"login-logo\">\n  <img src=\"../../../assets/img/logo.png\" alt=\"\">\n</div>\n<div class=\"login-form\">\n  <label class=\"login-text\">Log in:</label>\n  <form class=\"user-form\" (keydown)=\"keyDown($event)\">\n    <div class=\"input-wrap\">\n      <input id=\"login-name\" [class.input-fill]=\"user.email\" [class.input-error]=\"!resol.email\" type=\"text\" [(ngModel)]=\"user.email\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Username / email\" (focus)=\"resol.email = true\">\n      <label for=\"login-name\" [class.full-op]=\"!resol.email\">This input requires a value!</label>\n    </div>\n    <div class=\"input-wrap\">\n      <input id=\"login-pass\" [class.input-fill]=\"user.password\" [class.input-error]=\"!resol.password\" type=\"password\" [(ngModel)]=\"user.password\" [ngModelOptions]=\"{standalone: true}\" maxlength=\"15\" placeholder=\"Password\" (focus)=\"resol.password = true\">\n      <label for=\"login-pass\" [class.full-op]=\"!resol.password\">This input requires a value!</label>\n    </div>\n  </form>\n  <div class=\"log-in\">\n    <div class=\"chkbx-wrap\">\n      <div id=\"remember-int\" (click)=\"remember = !remember\">\n        <i class=\"material-icons\" [hidden]=\"!remember\">done</i>\n      </div>\n      <label for=\"remember-int\" (click)=\"remember = !remember\">Remember password</label>\n    </div>\n    <span class=\"text-btn\" (click)=\"logIn()\">ACCEPT</span>\n  </div>\n</div>"

/***/ }),

/***/ 766:
/***/ (function(module, exports) {

module.exports = "<div class=\"block-bg\" (click)=\"cancel()\"></div>\n\n<div class=\"new-user-form\">\n  <span class=\"tag-text\">Creating a new user:</span>\n  <div class=\"main-info\">\n    <div class=\"user-photo\">\n      <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + tempNewUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempNewUser.avatar\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"!tempNewUser.avatar\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewUser.avatar\">\n        <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n      </div>\n      <span class=\"photo-info\">300*300 px</span>\n    </div>\n    <form class=\"user-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.input-fill]=\"tempNewUser.email\" [class.input-error]=\"!resol.email\" placeholder=\"Email\" [(ngModel)]=\"tempNewUser.email\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.email = true\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-fill]=\"tempNewUser.firstName\" [class.input-error]=\"!resol.firstName\"  placeholder=\"First name\" [(ngModel)]=\"tempNewUser.firstName\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-fill]=\"tempNewUser.secondName\" [class.input-error]=\"!resol.secondName\"  placeholder=\"Last name\" [(ngModel)]=\"tempNewUser.secondName\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-fill]=\"tempNewUser.password\" [class.input-error]=\"!resol.password\" placeholder=\"Password\" [(ngModel)]=\"tempNewUser.password\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.password = true\">\n        <label [class.full-op]=\"!resol.password\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-fill]=\"tempNewUser.passwordRepeat\" [class.input-error]=\"!resol.passwordRepeat\" placeholder=\"Repeat password\" [(ngModel)]=\"tempNewUser.passwordRepeat\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.passwordRepeat = true\">\n        <label [class.full-op]=\"!resol.passwordRepeat\">This input requires a value!</label>\n      </div>\n    </form>\n  </div>\n  <div class=\"user-status\">\n    <div class=\"user-status-item\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'super'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'super'\" (click)=\"tempNewUser.role = 'super'; resol.role = true\">radio_button_unchecked</i>\n      <span>Superuser</span>\n    </div>\n    <div class=\"user-status-item\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'admin'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'admin'\" (click)=\"tempNewUser.role = 'admin'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-admin</span>\n    </div>\n    <div class=\"user-status-item\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'user'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'user'\" (click)=\"tempNewUser.role = 'user'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-user</span>\n    </div>\n    <label [class.err-status]=\"!resol.role\">Select user status</label>\n  </div>\n  <div class=\"new-user-btns\">\n    <span class=\"text-btn\" (click)=\"cancel()\">cancel</span>\n    <span class=\"right-btn text-btn\" (click)=\"accept()\">accept</span>\n  </div>\n</div>\n"

/***/ }),

/***/ 767:
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\" ></app-header>\n<main>\n    {{title}}\n</main>"

/***/ }),

/***/ 768:
/***/ (function(module, exports) {

module.exports = "<div class=\"user-card\">\n  <div class=\"user-card-head\">\n    <div>\n      <span class=\"user-card-hd-name\">{{tempUser.firstName}} {{tempUser.secondName}}</span>\n      <span class=\"user-card-hd-status\">{{tempUser.status}}</span>\n    </div>\n    <div class=\"user-card-hd-menu\" [class.user-card-hd-menu-active]=\"openMenu\" [hidden]=\"!canEdit\">\n      <i class=\"material-icons\" (click)=\"openMenu = !openMenu\" (window:mouseup)=\"openMenu = false\">more_vert</i>\n      <div class=\"user-pop-up\" [class.hidden]=\"!openMenu\">\n        <div class=\"user-pop-up-item\">\n          <i class=\"material-icons\">folder</i><span>Projects</span>\n          <span class=\"user-pop-up-num\">2</span>\n        </div>\n        <div class=\"user-pop-up-item\">\n          <i class=\"material-icons\">people</i><span>Users</span>\n          <span class=\"user-pop-up-num\">4</span>\n        </div>\n        <div class=\"user-pop-up-item\" [hidden]=\"!tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = false\">visibility_off</i><span>Deactivate</span>\n        </div>\n        <div class=\"user-pop-up-item\" [hidden]=\"tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = true\">visibility</i><span>Activate</span>\n        </div>\n        <div class=\"user-pop-up-item\" [hidden]=\"!canEdit\">\n          <i class=\"material-icons\">lock</i><span>Change password</span>\n        </div>\n        <div class=\"user-pop-up-item\" [hidden]=\"!canEdit\" (click)=\"delete()\">\n          <i class=\"material-icons\">delete</i><span>Delete</span>\n        </div>\n      </div>\n    </div>\n    <span class=\"user-card-created-date\">Created: {{tempUser.created}}</span>\n  </div>\n  <div class=\"user-card-body\">\n    <div class=\"user-photo\">\n      <label class=\"photo\" [class.curs-dis]=\"!canEdit\" [ngStyle]=\"{'background-image': 'url(' + tempUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempUser.avatar\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"!canEdit\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n    </div>\n    <form class=\"user-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.input-fill]=\"tempUser.email\" [class.no-changable]=\"!canEdit\" placeholder=\"Email\" [(ngModel)]=\"tempUser.email\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.email = true\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-fill]=\"tempUser.firstName\" [class.no-changable]=\"!canEdit\" placeholder=\"First name\" [(ngModel)]=\"tempUser.firstName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-fill]=\"tempUser.secondName\" [class.no-changable]=\"!canEdit\" placeholder=\"Last name\" [(ngModel)]=\"tempUser.secondName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n    </form>\n  </div>\n</div>\n<div class=\"user-card-foot\" [hidden]=\"!canEdit\">\n  <span class=\"user-ft-l text-btn\" (click)=\"reset()\">Reset</span>\n  <span class=\"user-ft-r text-btn\" (click)=\"changeUser()\">save changes</span>\n</div>"

/***/ }),

/***/ 769:
/***/ (function(module, exports) {

module.exports = "<app-header [header]=\"header\" [(searchRes)]=\"searchName\" [(sortType)]=\"sortType\" class=\"row\"></app-header>\n<main class=\"row\">\n\n  <div class=\"user-list-wrap col-md-4\">\n\n    <div class=\"user-list\">\n      <div class=\"slimscroll-wrap\" slimScroll  width=\"100%\" alwaysVisible=false distance=\"0px\" height=\"100%\" size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>\n        <div class=\"user-list-item\" [class.deactive]=\"!user.active\" [class.selected-user]=\"selectedUser === user\" *ngFor=\"let user of User.users | sortfilter: sortType | namefilter: searchName : header\">\n          <div class=\"user-item-img-wrap\">\n            <img class=\"pointer\" src=\"../../../assets/img/1.jpg\" alt=\"\" (click)=\"selectUser(user, false)\">\n          </div>\n          <div class=\"user-name-wrap\">\n            <div class=\"user-name pointer\" (click)=\"selectUser(user, false)\">\n              <span>{{user.firstName}} {{user.secondName}}</span>\n              <i class=\"material-icons\" [hidden]=\"user.active\">visibility_off</i>\n              <span class=\"new-title\" [hidden]=\"!user.newUser\">New</span>\n            </div>\n            <br>\n            <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\">{{user.role}}</span>\n          </div>\n          <div class=\"user-ctrl\">\n            <i class=\"material-icons\" (click)=\"selectUser(user, true)\">edit</i>\n            <div class=\"user-edit-wrap\" [class.user-edit-active]=\"settingsUser === user\">\n              <i class=\"material-icons\" (click)=\"settingsUser = user\" (window:mouseup)=\"settingsUser = null\">more_vert</i>\n              <div class=\"user-pop-up\" [hidden]=\"settingsUser !== user\">\n                <div class=\"user-pop-up-item\" [hidden]=\"!user.active\" (click)=\"deactivateUser(user)\">\n                  <i class=\"material-icons\">visibility_off</i>\n                  <span>Deactivate</span>\n                </div>\n                <div class=\"user-pop-up-item\" [hidden]=\"user.active\" (click)=\"deactivateUser(user)\">\n                  <i class=\"material-icons\">visibility</i>\n                  <span>Activate</span>\n                </div>\n                <div class=\"user-pop-up-item\" (click)=\"deleteUser(user)\">\n                  <i class=\"material-icons\">delete</i>\n                  <span>Delete</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"add-btn\" (click)=\"createNewUser = true\" [hidden]=\"createNewUser\">\n      <i class=\"material-icons\">add</i>\n      <div class=\"span-hover\">\n        <span>Add a new user</span>\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"user-card-wrap col-md-8\">\n    <app-user-card [(user)]=\"selectedUser\" [canEdit]=\"canEdit\" [hidden]=\"!selectedUser\"></app-user-card>\n    <span class=\"no-user\" [hidden]=\"selectedUser\">No user selected</span>\n  </div>\n\n</main>\n\n<app-new-user *ngIf=\"createNewUser\" ></app-new-user>\n"

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(545);


/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(94);
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
        var token = this.storageService.get("token") || this.storageService.tempToken;
        headers.append('authorization', token);
    };
    AuthService.prototype.get = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    };
    AuthService.prototype.post = function (url, data) {
        if (data === void 0) { data = {}; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    };
    AuthService.prototype.put = function (url, data) {
        if (data === void 0) { data = {}; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    };
    AuthService.prototype.delete = function (url, data) {
        if (data === void 0) { data = {}; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            headers: headers,
            body: data
        }));
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */]) === 'function' && _b) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b;
}());
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 94:
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
    StorageService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], StorageService);
    return StorageService;
}());
//# sourceMappingURL=storage.service.js.map

/***/ })

},[806]);
//# sourceMappingURL=main.bundle.js.map