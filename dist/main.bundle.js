webpackJsonp([1,4],{

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(92);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], UserService);
    return UserService;
    var _a, _b, _c;
}());
//# sourceMappingURL=user.service.js.map

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
        this.openMenu = 'out';
    }
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__(766),
            styles: [__webpack_require__(731)],
            animations: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* trigger */])('slideInOut', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* state */])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* style */])({
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* state */])('out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* style */])({
                        transform: 'translate3d(-100%, 0, 0)'
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* transition */])('in => out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])('400ms ease-in-out')),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* transition */])('out => in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])('400ms ease-in-out'))
                ]),
            ]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(70);
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
    function ProjectsComponent(userService, shareService, authService) {
        this.userService = userService;
        this.shareService = shareService;
        this.authService = authService;
        //data work with header
        this.header = {
            title: 'Projects',
            arrLength: 0,
            searchName: '',
            sortType: 'A-Z',
            type: 'projects'
        };
        //new project
        this.createNewProject = false;
        this.User = this.userService.getUser();
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.header = this.shareService.setHeader(this.header);
        this.subNewProject = this.shareService.shareListener.subscribe(function (project) {
            if (project != undefined) {
                _this.createNewProject = false;
                if (project.newProject) {
                    _this.authService.post('/api/projects/project', project).subscribe(function (res) {
                        res = res.json();
                        if (res.status) {
                            _this.User.projects.push(res.res);
                        }
                        alertify.success(res.message);
                    }, function (error) { });
                }
            }
        });
    };
    ProjectsComponent.prototype.ngOnDestroy = function () {
        this.subNewProject.unsubscribe();
    };
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-projects',
            template: __webpack_require__(768),
            styles: [__webpack_require__(733)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], ProjectsComponent);
    return ProjectsComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(70);
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
            sortType: 'A-Z',
            type: 'users'
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
        this.header = this.shareService.setHeader(this.header);
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
            console.log(res.message);
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
            template: __webpack_require__(771),
            styles: [__webpack_require__(736)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], UsersComponent);
    return UsersComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(34);
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
        this.user = {
            email: '',
            password: ''
        };
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__(772),
            styles: [__webpack_require__(737)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_service__ = __webpack_require__(34);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(95);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(673);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(152);
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
        this.headerData = {};
        this.shareSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](undefined);
        this.shareListener = this.shareSubject.asObservable();
    }
    ShareService.prototype.changeShareSubject = function (val) {
        this.shareSubject.next(val);
    };
    ShareService.prototype.setHeader = function (val) {
        for (var i in val) {
            this.headerData[i] = val[i];
        }
        return this.headerData;
    };
    ShareService.prototype.getHeader = function () {
        return this.headerData;
    };
    ShareService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ShareService);
    return ShareService;
}());
//# sourceMappingURL=share.service.js.map

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
            template: __webpack_require__(763),
            styles: [__webpack_require__(728)],
            host: { 'window:beforeunload': 'beforeClose' }
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_storage_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_guard_service__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_logged_guard_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_share_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_name_pipe__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_slimscroll_directive__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_login_login_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_home_home_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_home_aside_aside_component__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_home_users_users_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_home_projects_projects_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_home_header_header_component__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_home_users_user_card_user_card_component__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_home_users_new_user_new_user_component__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_home_projects_new_project_new_project_component__ = __webpack_require__(666);
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
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_home_projects_projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_home_aside_aside_component__["a" /* AsideComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_home_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_home_users_users_component__["a" /* UsersComponent */],
                __WEBPACK_IMPORTED_MODULE_12__pipes_name_pipe__["a" /* NamePipe */],
                __WEBPACK_IMPORTED_MODULE_21__components_home_users_user_card_user_card_component__["a" /* UserCardComponent */],
                __WEBPACK_IMPORTED_MODULE_13__directives_slimscroll_directive__["a" /* SlimScroll */],
                __WEBPACK_IMPORTED_MODULE_22__components_home_users_new_user_new_user_component__["a" /* NewUserComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_home_projects_new_project_new_project_component__["a" /* NewProjectComponent */]
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
                __WEBPACK_IMPORTED_MODULE_11__services_share_service__["a" /* ShareService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */]]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(34);
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
        this.menuChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* EventEmitter */]();
        route.data.subscribe(function (data) {
            _this.User = data.user;
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Object)
    ], AsideComponent.prototype, "menu", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), 
        __metadata('design:type', Object)
    ], AsideComponent.prototype, "menuChange", void 0);
    AsideComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-aside',
            template: __webpack_require__(764),
            styles: [__webpack_require__(729)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], AsideComponent);
    return AsideComponent;
    var _a, _b;
}());
//# sourceMappingURL=aside.component.js.map

/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(58);
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
    function HeaderComponent(shareService) {
        this.shareService = shareService;
        this.sortActive = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.headerData = this.shareService.getHeader();
    };
    HeaderComponent.prototype.changeHeaderData = function (val, key) {
        this.sortActive = false;
        this.headerData[key] = val;
    };
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__(765),
            styles: [__webpack_require__(730)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a;
}());
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(58);
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
    function NewProjectComponent(userService, shareService) {
        this.userService = userService;
        this.shareService = shareService;
        this.tempNewProject = {
            title: '',
            link: '',
            image: '',
            created: '',
            newProject: true
        };
        this.resol = {
            title: true,
            link: true
        };
        this.User = this.userService.getUser();
    }
    //photo change
    NewProjectComponent.prototype.loadPhoto = function ($event) {
        var _this = this;
        var fr = new FileReader();
        try {
            fr['readAsDataURL']($event.target.files[0]);
            fr.onload = function () {
                _this.tempNewProject.image = fr.result;
            };
        }
        catch (err) {
            console.log('load photo err: ', err);
        }
    };
    NewProjectComponent.prototype.removePhoto = function () {
        this.tempNewProject.image = '';
    };
    //user save accept/cancel
    NewProjectComponent.prototype.keyDown = function (event) {
        if (event.keyCode == 13) {
            this.accept();
        }
        else if (event.keyCode == 27) {
            this.cancel();
        }
    };
    NewProjectComponent.prototype.accept = function () {
        if (!this.userService.resolUser(this.resol, this.tempNewProject))
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
        this.tempNewProject.created = dd + '.' + mm + '.' + yyyy;
        this.tempNewProject.newProject = true;
        this.shareService.changeShareSubject(this.tempNewProject);
    };
    NewProjectComponent.prototype.cancel = function () {
        this.tempNewProject.newProject = false;
        this.shareService.changeShareSubject(this.tempNewProject);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NewProjectComponent.prototype, "keyDown", null);
    NewProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-new-project',
            template: __webpack_require__(767),
            styles: [__webpack_require__(732)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _b) || Object])
    ], NewProjectComponent);
    return NewProjectComponent;
    var _a, _b;
}());
//# sourceMappingURL=new-project.component.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(34);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Object)
    ], NewUserComponent.prototype, "message", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NewUserComponent.prototype, "keyDown", null);
    NewUserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-new-user',
            template: __webpack_require__(769),
            styles: [__webpack_require__(734)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], NewUserComponent);
    return NewUserComponent;
    var _a, _b;
}());
//# sourceMappingURL=new-user.component.js.map

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(70);
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
        this.message = '';
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
            template: __webpack_require__(770),
            styles: [__webpack_require__(735)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], UserCardComponent);
    return UserCardComponent;
    var _a, _b;
}());
//# sourceMappingURL=user-card.component.js.map

/***/ }),

/***/ 669:
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

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(58);
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
        this.array = {
            arrLength: 0
        };
    }
    NamePipe.prototype.transform = function (items, name, sortType) {
        if (!name) {
            this.array.arrLength = items.length;
            this.shareService.setHeader(this.array);
            return this.sort(items, sortType);
        }
        if (items) {
            this.filteredList = items.filter(function (item) {
                if (item.firstName)
                    return ((item.firstName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1) || (item.secondName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1));
                return (item.title.toUpperCase().indexOf(name.toUpperCase(), 0) > -1);
            });
            this.array.arrLength = items.length;
            this.shareService.setHeader(this.array);
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
            return array;
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
            return array;
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
            return array;
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
            return array;
        }
    };
    NamePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Pipe */])({
            name: 'namefilter'
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object])
    ], NamePipe);
    return NamePipe;
    var _a;
}());
//# sourceMappingURL=name.pipe.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_logged_guard_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_home_home_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_home_projects_projects_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_home_users_users_component__ = __webpack_require__(342);
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
            }
        ]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_1__services_logged_guard_service__["a" /* LoggedGuardService */]]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=router.js.map

/***/ }),

/***/ 673:
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

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(95);
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

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".app-wrap {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 729:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-aside {\n  position: fixed;\n  z-index: 2000;\n  top: 0;\n  left: 0;\n  display: inline-block;\n  float: left;\n  width: 260px;\n  height: 100%;\n  background-color: #ffffff;\n  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n  app-aside header {\n    width: 100%;\n    height: 160px;\n    background-color: #1976D2;\n    padding: 20px;\n    color: #ffffff; }\n    app-aside header .asd-hd-top {\n      width: 100%;\n      height: 64px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside header .asd-hd-top .asd-name-in {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        width: 60px;\n        height: 60px;\n        border-radius: 50%;\n        background: no-repeat;\n        background-position: 50% 50%;\n        background-size: auto 100%;\n        background-color: #ffffff;\n        font-family: Roboto-Light;\n        font-size: 20px;\n        color: #181818; }\n      app-aside header .asd-hd-top .asd-status-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: end;\n            -ms-flex-align: end;\n                align-items: flex-end; }\n        app-aside header .asd-hd-top .asd-status-wrap i {\n          height: 16px;\n          width: 20px;\n          line-height: 0.7; }\n        app-aside header .asd-hd-top .asd-status-wrap .asd-status {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          width: 80px;\n          height: 24px;\n          background-color: rgba(255, 255, 255, 0.1);\n          border-radius: 100px;\n          font-size: 12px;\n          font-family: Roboto-Medium; }\n    app-aside header .asd-hd-bot {\n      width: 100%;\n      height: 60px;\n      padding-top: 21px;\n      font-size: 14px; }\n      app-aside header .asd-hd-bot .asd-email-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-aside header .asd-hd-bot .asd-email-wrap .asd-email {\n          font-family: Roboto-Light;\n          opacity: 0.4; }\n  app-aside .pop-up {\n    width: 100%;\n    height: 160px;\n    padding: 20px 0;\n    border-bottom: 2px solid #D6D5D5;\n    box-shadow: none;\n    border-radius: 0; }\n    app-aside .pop-up .pop-up-item i {\n      margin-right: 32px; }\n    app-aside .pop-up .pop-up-item .pop-up-num {\n      font-size: 13px; }\n    app-aside .pop-up .asd-active {\n      color: #1976D2;\n      background-color: rgba(25, 118, 210, 0.1); }\n  app-aside footer {\n    width: 100%;\n    height: calc( 100% - 320px);\n    padding: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    font-size: 15px;\n    color: #9B9B9B; }\n    app-aside footer .asd-logout {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-aside footer .asd-logout i {\n        margin-right: 30px; }\n    app-aside footer .asd-terms {\n      width: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside footer .asd-terms a {\n        text-decoration: underline;\n        font-size: 13px;\n        color: #9B9B9B; }\n      app-aside footer .asd-terms img {\n        width: 88px;\n        -webkit-filter: invert(40%) grayscale(100%);\n                filter: invert(40%) grayscale(100%); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: calc(100% - 70px);\n  height: 90px;\n  padding: 25px 30px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-item-align: end;\n      align-self: flex-end;\n  -webkit-transition: margin .4s ease-in-out, width .4s ease-in-out;\n  transition: margin .4s ease-in-out, width .4s ease-in-out; }\n  app-header .header-wrap {\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-header .header-wrap span {\n      white-space: nowrap; }\n    app-header .header-wrap .header-tag {\n      font-size: 24px;\n      color: #444444; }\n      app-header .header-wrap .header-tag span {\n        font-size: 12px;\n        color: #9B9B9B;\n        margin-left: 10px; }\n    app-header .header-wrap .header-search {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      height: 100%;\n      width: 100%;\n      min-width: 150px;\n      margin: 0 60px;\n      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.12); }\n      app-header .header-wrap .header-search input {\n        width: 100%;\n        font-size: 16px; }\n        app-header .header-wrap .header-search input::-webkit-input-placeholder {\n          color: #4D4D4E; }\n        app-header .header-wrap .header-search input::-moz-placeholder {\n          color: #4D4D4E; }\n        app-header .header-wrap .header-search input:-ms-input-placeholder {\n          color: #4D4D4E; }\n        app-header .header-wrap .header-search input:-moz-placeholder {\n          color: #4D4D4E; }\n    app-header .header-wrap .header-sort {\n      height: 100%;\n      width: 270px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 15px; }\n      app-header .header-wrap .header-sort .sort-select {\n        position: relative;\n        margin-left: 20px;\n        width: 184px;\n        height: 40px;\n        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);\n        border-radius: 2px;\n        color: #9B9B9B;\n        -webkit-transition: box-shadow .3s;\n        transition: box-shadow .3s; }\n        app-header .header-wrap .header-sort .sort-select .sort-present {\n          width: 100%;\n          height: 100%;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          -webkit-box-pack: justify;\n              -ms-flex-pack: justify;\n                  justify-content: space-between;\n          padding: 0 20px;\n          cursor: pointer; }\n        app-header .header-wrap .header-sort .sort-select .pop-up {\n          width: 184px;\n          position: absolute;\n          z-index: 200;\n          top: 45px; }\n          app-header .header-wrap .header-sort .sort-select .pop-up .pop-up-item {\n            height: 30px;\n            padding: 5px 20px; }\n            app-header .header-wrap .header-sort .sort-select .pop-up .pop-up-item .sort-selected {\n              color: #EBEBEB; }\n        app-header .header-wrap .header-sort .sort-select:hover {\n          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1); }\n      app-header .header-wrap .header-sort .sort-active {\n        color: #4D4D4E; }\n        app-header .header-wrap .header-sort .sort-active i {\n          color: #1976D2; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 731:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-home {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative; }\n  app-home .main-content {\n    display: inline-block;\n    width: 100%;\n    height: calc(100% - 90px);\n    border-top: 2px solid #EBEBEB;\n    -webkit-transition: margin .4s ease-in-out, width .4s ease-in-out;\n    transition: margin .4s ease-in-out, width .4s ease-in-out; }\n  app-home .openedMenu {\n    margin-left: 260px;\n    width: calc(100% - 260px); }\n  app-home .menu-btn {\n    cursor: pointer;\n    position: absolute;\n    z-index: 1000;\n    top: 20px;\n    left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 50px;\n    height: 50px;\n    color: #ffffff;\n    border-radius: 50%;\n    background-color: #1976D2;\n    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2);\n    visibility: visible;\n    opacity: 1;\n    -webkit-transition: opacity .3s, visibility 0s .3s;\n    transition: opacity .3s, visibility 0s .3s; }\n  app-home .menu-btn-hide {\n    visibility: hidden;\n    opacity: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 732:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-new-project .new-form {\n  width: 420px;\n  height: 580px;\n  padding: 35px 30px 25px 30px; }\n  app-new-project .new-form .main-info {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    app-new-project .new-form .main-info .item-form {\n      width: 100%; }\n    app-new-project .new-form .main-info .item-photo {\n      position: relative;\n      margin-top: 30px;\n      width: 360px;\n      height: 260px; }\n      app-new-project .new-form .main-info .item-photo .photo {\n        width: 100%;\n        height: 220px;\n        border-radius: inherit; }\n      app-new-project .new-form .main-info .item-photo .photo-ctrl {\n        -webkit-box-pack: start;\n            -ms-flex-pack: start;\n                justify-content: flex-start; }\n      app-new-project .new-form .main-info .item-photo .photo-info {\n        display: inline-block;\n        position: absolute;\n        bottom: 1px;\n        right: 0; }\n  app-new-project .new-form .new-btns {\n    margin-top: 62px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-projects {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  app-projects main {\n    width: 100%;\n    height: 100%;\n    padding: 30px 20px; }\n    app-projects main .projects-wrap {\n      width: 100%;\n      height: calc(100% - 56px); }\n      app-projects main .projects-wrap .projects-list {\n        height: 100%;\n        width: 100%; }\n        app-projects main .projects-wrap .projects-list .project-wrap {\n          padding: 0 10px 20px 10px;\n          height: 300px; }\n          app-projects main .projects-wrap .projects-list .project-wrap .project {\n            width: 100%;\n            height: 100%;\n            background-color: #ffffff;\n            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);\n            border-radius: 2px; }\n            app-projects main .projects-wrap .projects-list .project-wrap .project .project-content {\n              position: relative;\n              width: 100%;\n              height: 220px;\n              padding: 20px;\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-orient: vertical;\n              -webkit-box-direction: normal;\n                  -ms-flex-direction: column;\n                      flex-direction: column;\n              -webkit-box-pack: justify;\n                  -ms-flex-pack: justify;\n                      justify-content: space-between;\n              color: #ffffff;\n              border-radius: 2px;\n              background-position: 50% 50%;\n              background-size: cover;\n              background-color: #4D4D4E;\n              font-size: 14px; }\n              app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .project-ctrl-wrap {\n                width: 100%;\n                display: -webkit-box;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-pack: justify;\n                    -ms-flex-pack: justify;\n                        justify-content: space-between;\n                -webkit-box-align: center;\n                    -ms-flex-align: center;\n                        align-items: center; }\n                app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .project-ctrl-wrap span {\n                  font-weight: 500;\n                  color: #FFA000; }\n                app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .project-ctrl-wrap .project-ctrl {\n                  width: 100%;\n                  display: -webkit-box;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-pack: end;\n                      -ms-flex-pack: end;\n                          justify-content: flex-end; }\n                  app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .project-ctrl-wrap .project-ctrl i {\n                    margin-left: 20px;\n                    width: 14px; }\n              app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .no-img {\n                cursor: default;\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                opacity: 0.2;\n                font-size: 38px;\n                -webkit-transform: translate(-50%, -50%);\n                        transform: translate(-50%, -50%); }\n              app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .project-info {\n                display: -webkit-box;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-orient: vertical;\n                -webkit-box-direction: normal;\n                    -ms-flex-direction: column;\n                        flex-direction: column; }\n                app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .project-info .project-title {\n                  font-size: 24px; }\n                app-projects main .projects-wrap .projects-list .project-wrap .project .project-content .project-info .project-created {\n                  opacity: 0.5; }\n            app-projects main .projects-wrap .projects-list .project-wrap .project .img-true {\n              background: -webkit-linear-gradient(top, rgba(13, 13, 13, 0) 0%, #101010 100%), 50% 50% no-repeat;\n              background: linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #101010 100%), 50% 50% no-repeat;\n              background-color: rgba(0, 0, 0, 0.3);\n              background-size: cover; }\n            app-projects main .projects-wrap .projects-list .project-wrap .project .project-bot {\n              width: 100%;\n              height: 60px;\n              padding: 15px 20px;\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-align: center;\n                  -ms-flex-align: center;\n                      align-items: center;\n              font-size: 14px; }\n              app-projects main .projects-wrap .projects-list .project-wrap .project .project-bot .project-admin {\n                color: #9B9B9B;\n                width: 44px; }\n              app-projects main .projects-wrap .projects-list .project-wrap .project .project-bot .project-users {\n                width: calc(100% - 44px);\n                display: -webkit-box;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-align: center;\n                    -ms-flex-align: center;\n                        align-items: center; }\n                app-projects main .projects-wrap .projects-list .project-wrap .project .project-bot .project-users .project-user {\n                  width: 50%;\n                  padding-left: 20px;\n                  display: -webkit-box;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-align: center;\n                      -ms-flex-align: center;\n                          align-items: center; }\n                  app-projects main .projects-wrap .projects-list .project-wrap .project .project-bot .project-users .project-user .project-user-name {\n                    width: calc(100% - 40px);\n                    margin-left: 10px;\n                    overflow: hidden;\n                    text-overflow: ellipsis;\n                    white-space: nowrap; }\n                  app-projects main .projects-wrap .projects-list .project-wrap .project .project-bot .project-users .project-user .project-user-img {\n                    display: -webkit-box;\n                    display: -ms-flexbox;\n                    display: flex;\n                    -webkit-box-align: center;\n                        -ms-flex-align: center;\n                            align-items: center;\n                    -webkit-box-pack: center;\n                        -ms-flex-pack: center;\n                            justify-content: center;\n                    color: #4A4A4A;\n                    width: 30px;\n                    height: 30px;\n                    border-radius: 50%;\n                    background: no-repeat;\n                    background-position: 50% 50%;\n                    background-size: auto 100%;\n                    background-color: #EBEBEB; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-new-user .new-form {\n  width: 460px;\n  height: 540px; }\n  app-new-user .new-form .main-info {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    app-new-user .new-form .main-info .item-photo {\n      padding-top: 30px;\n      width: 130px;\n      height: 200px; }\n      app-new-user .new-form .main-info .item-photo .photo {\n        width: 130px;\n        height: 130px; }\n    app-new-user .new-form .main-info .item-form {\n      width: 240px;\n      margin-left: 30px; }\n  app-new-user .new-form .user-status {\n    width: 100%;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    margin: 50px 0 58px; }\n    app-new-user .new-form .user-status .user-status-item {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 16px;\n      color: #4A4A4A; }\n      app-new-user .new-form .user-status .user-status-item span {\n        margin-left: 12px; }\n      app-new-user .new-form .user-status .user-status-item .selected-status {\n        color: #1976D2; }\n    app-new-user .new-form .user-status label {\n      position: absolute;\n      width: 100%;\n      left: 0;\n      top: 30px;\n      text-align: center;\n      color: #ff0000;\n      font-size: 12px;\n      opacity: 0;\n      -webkit-transition: opacity .5s;\n      transition: opacity .5s;\n      border-top: 2px solid #ff0000; }\n    app-new-user .new-form .user-status .err-status {\n      opacity: 1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-user-card {\n  height: 420px;\n  width: 100%; }\n  app-user-card .user-card, app-user-card .user-card-foot {\n    padding: 0 30px 0 27px;\n    border-bottom: 2px solid #EBEBEB; }\n  app-user-card .user-card {\n    height: 340px;\n    width: 100%; }\n    app-user-card .user-card .user-card-head {\n      width: 100%;\n      height: 80px;\n      position: relative;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-user-card .user-card .user-card-head .user-card-hd-name {\n        font-size: 24px;\n        color: #444444; }\n      app-user-card .user-card .user-card-head .user-card-hd-status {\n        font-size: 14px;\n        font-style: italic;\n        color: #9B9B9B;\n        margin-left: 10px; }\n      app-user-card .user-card .user-card-head .user-card-hd-menu {\n        height: 40px;\n        width: 40px;\n        position: relative;\n        border-radius: 50%;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-user-card .user-card .user-card-head .user-card-hd-menu .pop-up {\n          position: absolute;\n          z-index: 100;\n          right: 0;\n          top: 50px;\n          width: 200px;\n          height: 215px; }\n      app-user-card .user-card .user-card-head .user-card-hd-menu-active {\n        background-color: #EBEBEB; }\n      app-user-card .user-card .user-card-head .user-card-created-date {\n        position: absolute;\n        line-height: 0.7;\n        bottom: 0px;\n        font-size: 14px;\n        color: #9B9B9B; }\n    app-user-card .user-card .user-card-body {\n      width: 100%;\n      height: 260px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      app-user-card .user-card .user-card-body .item-photo {\n        padding-top: 35px;\n        width: 120px;\n        height: 100%; }\n      app-user-card .user-card .user-card-body .item-form {\n        width: 320px;\n        margin-left: 60px; }\n  app-user-card .user-card-foot {\n    height: 80px;\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-user-card .user-card-foot .user-ft-l {\n      margin-right: 15px; }\n    app-user-card .user-card-foot .user-ft-r {\n      margin-left: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-users {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  app-users main {\n    width: 100%;\n    height: 100%; }\n    app-users main .user-list-wrap {\n      position: relative;\n      height: 100%;\n      padding: 0;\n      border-right: 2px solid #EBEBEB; }\n      app-users main .user-list-wrap .user-list {\n        height: calc(100% - 86px);\n        width: 100%; }\n        app-users main .user-list-wrap .user-list .slimscroll-wrap {\n          width: 100%;\n          height: 100%; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item {\n            padding-left: 30px;\n            width: 100%;\n            height: 80px;\n            border-bottom: 2px solid #EBEBEB;\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: justify;\n                -ms-flex-pack: justify;\n                    justify-content: space-between; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-item-img-wrap {\n              cursor: pointer;\n              float: left;\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-align: center;\n                  -ms-flex-align: center;\n                      align-items: center;\n              -webkit-box-pack: center;\n                  -ms-flex-pack: center;\n                      justify-content: center;\n              font-size: 14px;\n              color: #4A4A4A;\n              width: 39px;\n              height: 39px;\n              border-radius: 50%;\n              background: no-repeat;\n              background-position: 50% 50%;\n              background-size: auto 100%;\n              background-color: #EBEBEB; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap {\n              height: 100%;\n              width: calc(100% - 39px);\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-align: center;\n                  -ms-flex-align: center;\n                      align-items: center;\n              -webkit-box-pack: justify;\n                  -ms-flex-pack: justify;\n                      justify-content: space-between; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap {\n                margin-left: 15px;\n                width: 100%; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name {\n                  display: -webkit-inline-box;\n                  display: -ms-inline-flexbox;\n                  display: inline-flex;\n                  -webkit-box-align: center;\n                      -ms-flex-align: center;\n                          align-items: center; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name i {\n                    margin-left: 10px;\n                    font-size: 21px;\n                    line-height: 0.7; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name span {\n                    display: block;\n                    float: left; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name .new-title {\n                    margin-left: 10px;\n                    color: #FFA000; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-status {\n                  font-size: 14px;\n                  font-family: Roboto-Light;\n                  color: #9B9B9B;\n                  font-style: italic; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl {\n                float: right;\n                display: -webkit-box;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-align: center;\n                    -ms-flex-align: center;\n                        align-items: center; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl .user-edit-wrap {\n                  position: relative;\n                  width: 30px;\n                  height: 30px;\n                  border-radius: 50%;\n                  display: -webkit-box;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-pack: center;\n                      -ms-flex-pack: center;\n                          justify-content: center;\n                  -webkit-box-align: center;\n                      -ms-flex-align: center;\n                          align-items: center;\n                  margin-right: 20px; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl .user-edit-wrap .pop-up {\n                    position: absolute;\n                    z-index: 100;\n                    right: 0;\n                    top: 35px;\n                    width: 170px;\n                    height: 100px; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl .user-edit-active {\n                  background-color: #EBEBEB; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive img {\n            opacity: 0.5; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap {\n            color: #D6D5D5; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap span {\n              color: #D6D5D5 !important; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .selected-user {\n            background-color: rgba(255, 160, 0, 0.1); }\n    app-users main .user-card-wrap {\n      padding: 0;\n      height: 100%;\n      position: relative; }\n      app-users main .user-card-wrap .no-user {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        font-size: 24px;\n        color: #D6D5D5; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 737:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".pos-center, app-login .login-form .log-in .chkbx-wrap #remember-int i {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-login {\n  background-color: #1976D2;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n  app-login .login-logo {\n    width: 165px;\n    height: 30px;\n    position: absolute;\n    left: 50%;\n    top: 16.6%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n    app-login .login-logo img {\n      width: 100%;\n      height: 100%; }\n  app-login .login-form {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 380px;\n    height: 280px;\n    padding: 30px;\n    box-sizing: border-box;\n    background-color: #ffffff;\n    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n    app-login .login-form .login-text {\n      font-size: 24px;\n      color: #444444; }\n    app-login .login-form .item-form {\n      width: 320px; }\n    app-login .login-form .log-in {\n      margin-top: 45px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-login .login-form .log-in .chkbx-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-login .login-form .log-in .chkbx-wrap #remember-int {\n          position: relative;\n          float: left;\n          width: 18px;\n          height: 18px;\n          border: 1px solid #4D4D4E;\n          border-radius: 3px;\n          cursor: pointer; }\n        app-login .login-form .log-in .chkbx-wrap label[for=remember-int] {\n          margin-left: 10px;\n          font-size: 15px;\n          cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 739:
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
webpackContext.id = 739;


/***/ }),

/***/ 763:
/***/ (function(module, exports) {

module.exports = "<div class=\"app-wrap\">\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 764:
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"asd-hd-top\">\n    <div class=\"asd-name-in\" [ngStyle]=\"{'background-image': 'url(' + user.avatar + ')'}\">\n      <span *ngIf=\"!user.avatar\">{{userService.lettersNoImg(user)}}</span>\n    </div>\n    <div class=\"asd-status-wrap\">\n      <i class=\"material-icons\" (click)=\"closeMenu()\">arrow_back</i>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'super'\">Super user</div>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'admin'\">Client-admin</div>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'user'\">Client-user</div>\n    </div>\n  </div>\n  <div class=\"asd-hd-bot\">\n    <div class=\"asd-name\">{{user.firstName}} {{user.secondName}}</div>\n    <div class=\"asd-email-wrap\">\n      <div class=\"asd-email\">{{user.email}}</div>\n      <i class=\"material-icons\">arrow_drop_down</i>\n    </div>\n  </div>\n</header>\n\n<div class=\"pop-up\">\n  <div class=\"pop-up-item\" routerLink=\"/projects\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">folder</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Projects</span>\n      <span class=\"pop-up-num\">{{User.projects.length || 0}}</span>\n    </div>\n  </div>\n  <div class=\"pop-up-item\" routerLink=\"/users\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">people</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Users</span>\n      <span class=\"pop-up-num\">{{User.users.length || 0}}</span>\n    </div>\n  </div>\n  <div class=\"pop-up-item\" routerLink=\"/settings\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">settings</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Settings</span>\n    </div>\n  </div>\n</div>\n\n<footer>\n  <div class=\"asd-logout\">\n    <i class=\"material-icons\" (click)=\"logOut()\">exit_to_app</i>\n    <div class=\"text-wrap pointer\" (click)=\"logOut()\">\n      Log out\n    </div>\n  </div>\n  <div class=\"asd-terms\">\n    <img src=\"../../../assets/img/logo.png\" alt=\"\">\n    <a href=\"#\">Terms</a>\n  </div>\n</footer>\n"

/***/ }),

/***/ 765:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-wrap\" *ngIf=\"headerData.type === 'users' || headerData.type === 'projects'\">\n  <div class=\"header-tag\">{{headerData.title}}<span>{{'( ' + headerData.arrLength + ' )'}}</span></div>\n  <div class=\"header-search\">\n    <input type=\"text\" placeholder=\"Search\" (input)=\"changeHeaderData($event.target.value, 'searchName')\">\n  </div>\n  <div class=\"header-sort\">\n    <span>Sorted by:</span>\n    <div class=\"sort-select\" (window:mouseup)=\"sortActive = false\">\n      <div class=\"sort-present\" [class.sort-active]=\"sortActive\" (click)=\"sortActive = !sortActive\">\n        <span>{{headerData.sortType}}</span>\n        <i class=\"material-icons\" >arrow_drop_down</i>\n      </div>\n      <div class=\"pop-up\" [hidden]=\"!sortActive\">\n        <div class=\"pop-up-item\" (click)=\"changeHeaderData('A-Z', 'sortType')\">\n          <div class=\"pop-up-row-name\">\n            <span [class.sort-selected]=\"headerData.sortType === 'A-Z'\">A-Z</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" (click)=\"changeHeaderData('Z-A', 'sortType')\">\n          <div class=\"pop-up-row-name\">\n            <span [class.sort-selected]=\"headerData.sortType === 'Z-A'\">Z-A</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" (click)=\"changeHeaderData('Newest to older', 'sortType')\">\n          <div class=\"pop-up-row-name\">\n            <span [class.sort-selected]=\"headerData.sortType === 'Newest to older'\">Newest to older</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" (click)=\"changeHeaderData('Older to newest', 'sortType')\">\n          <div class=\"pop-up-row-name\">\n            <span [class.sort-selected]=\"headerData.sortType === 'Older to newest'\">Older to newest</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 766:
/***/ (function(module, exports) {

module.exports = "<app-header [class.openedMenu]=\"openMenu == 'in' \"></app-header>\n<app-aside [@slideInOut]=\"openMenu\" [(menu)]=\"openMenu\"></app-aside>\n<main class=\"main-content\" [class.openedMenu]=\"openMenu == 'in' \">\n    <router-outlet></router-outlet>\n</main>\n<div class=\"menu-btn\" [class.menu-btn-hide]=\"openMenu == 'in' \" (click)=\"openMenu='in'\">\n    <i class=\"material-icons\">menu</i>\n</div>\n\n"

/***/ }),

/***/ 767:
/***/ (function(module, exports) {

module.exports = "<div class=\"block-bg\" (click)=\"cancel()\"></div>\n\n<div class=\"new-form\">\n  <span class=\"tag-text\">Creating a new project:</span>\n  <div class=\"main-info\">\n    <form class=\"item-form\">\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-fill]=\"tempNewProject.title\" [class.input-error]=\"!resol.title\" placeholder=\"Projet Name\" [(ngModel)]=\"tempNewProject.title\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.title = true\">\n        <label [class.full-op]=\"!resol.title\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-fill]=\"tempNewProject.link\" [class.input-error]=\"!resol.link\"  placeholder=\"datasource URL\" [(ngModel)]=\"tempNewProject.link\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.link = true\">\n        <label [class.full-op]=\"!resol.link\">This input requires a value!</label>\n      </div>\n    </form>\n    <div class=\"item-photo\">\n      <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + tempNewProject.image + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempNewProject.image != false\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewProject.image == false\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewProject.image != false\">\n        <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n      </div>\n      <span class=\"photo-info\">540*330 px</span>\n    </div>\n  </div>\n  <div class=\"new-btns\">\n    <span class=\"text-btn\" (click)=\"cancel()\">cancel</span>\n    <span class=\"right-btn text-btn\" (click)=\"accept()\">accept</span>\n  </div>\n</div>\n"

/***/ }),

/***/ 768:
/***/ (function(module, exports) {

module.exports = "<main>\n    <div class=\"projects-wrap\">\n        <div class=\"projects-list  row\" slimScroll  width=\"100%\" alwaysVisible=false distance=\"9px\" height=\"100%\" size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>\n            <div class=\"project-wrap col-xs-12 col-md-6 col-lg-4 col-exlg-3\" *ngFor=\"let project of User.projects | namefilter: header.searchName: header.sortType\">\n                <div class=\"project\">\n                    <div class=\"project-content img-true\" [ngStyle]=\"{'background-image': 'url(' + project.image + ')'}\" [class.img-true]=\"project.image\">\n                        <i class=\"material-icons no-img\" [hidden]=\"project.image\">crop_original</i>\n                        <div class=\"project-ctrl-wrap\">\n                            <span [hidden]=\"project.published\">Unpublished</span>\n                            <div class=\"project-ctrl\">\n                                <i class=\"material-icons\">edit</i>\n                                <i class=\"material-icons\">more_vert</i>\n                            </div>\n                        </div>\n                        <div class=\"project-info\">\n                            <div class=\"project-title\">{{project.title}}</div>\n                            <div class=\"project-created\">Created: {{project.created}}</div>\n                        </div>\n                    </div>\n                    <div class=\"project-bot\">\n                        <span class=\"project-admin\">Admin:</span>\n                        <div class=\"project-users\">\n                            <div class=\"project-user\">\n                                <div class=\"project-user-img\" [ngStyle]=\"{'background-image': 'url(asfd)'}\">\n                                    <span>AF</span>\n                                </div>\n                                <span class=\"project-user-name\">Jennifer Carasdsdfd</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"add-btn\" (click)=\"createNewProject = true\" [hidden]=\"createNewProject\">\n        <i class=\"material-icons\">add</i>\n        <div class=\"span-hover\">\n            <span>Add a new project</span>\n        </div>\n    </div>\n</main>\n\n<app-new-project class=\"add-new\" *ngIf=\"createNewProject\"></app-new-project>"

/***/ }),

/***/ 769:
/***/ (function(module, exports) {

module.exports = "<div class=\"block-bg\" (click)=\"cancel()\"></div>\n\n<div class=\"new-form\">\n  <span class=\"tag-text\">Creating a new user:</span>\n  <div class=\"main-info\">\n    <div class=\"item-photo\">\n      <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + tempNewUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempNewUser.avatar != false\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewUser.avatar == false\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewUser.avatar != false\">\n        <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n      </div>\n      <span class=\"photo-info\">300*300 px</span>\n    </div>\n    <form class=\"item-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.input-error]=\"!resol.email || message.email\" placeholder=\"Email\" [(ngModel)]=\"tempNewUser.email\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.email = true; message.email = ''\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n        <label [class.full-op]=\"message.email\">{{message.email}}</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-error]=\"!resol.firstName\"  placeholder=\"First name\" [(ngModel)]=\"tempNewUser.firstName\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-error]=\"!resol.secondName\"  placeholder=\"Last name\" [(ngModel)]=\"tempNewUser.secondName\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-error]=\"!resol.password\" placeholder=\"Password\" [(ngModel)]=\"tempNewUser.password\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.password = true; message.password = ''\">\n        <label [class.full-op]=\"!resol.password\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-error]=\"!resol.passwordRepeat || message.password\" placeholder=\"Repeat password\" [(ngModel)]=\"tempNewUser.passwordRepeat\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.passwordRepeat = true; message.password = ''\">\n        <label [class.full-op]=\"!resol.passwordRepeat\">This input requires a value!</label>\n        <label [class.full-op]=\"message.password\">Password is incorrect</label>\n      </div>\n    </form>\n  </div>\n  <div class=\"user-status\">\n    <div class=\"user-status-item\" *ngIf=\"User.role == 'super'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'super'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'super'\" (click)=\"tempNewUser.role = 'super'; resol.role = true\">radio_button_unchecked</i>\n      <span>Superuser</span>\n    </div>\n    <div class=\"user-status-item\" *ngIf=\"User.role == 'super'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'admin'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'admin'\" (click)=\"tempNewUser.role = 'admin'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-admin</span>\n    </div>\n    <div class=\"user-status-item\" *ngIf=\"User.role !== 'user'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'user'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'user'\" (click)=\"tempNewUser.role = 'user'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-user</span>\n    </div>\n    <label [class.err-status]=\"!resol.role\">Select user status</label>\n  </div>\n  <div class=\"new-btns\">\n    <span class=\"false-btn\" (click)=\"cancel()\">cancel</span>\n    <span class=\"true-btn\" (click)=\"accept()\">accept</span>\n  </div>\n</div>\n"

/***/ }),

/***/ 770:
/***/ (function(module, exports) {

module.exports = "<div class=\"user-card\">\n  <div class=\"user-card-head\">\n    <div>\n      <span class=\"user-card-hd-name\">{{tempUser.firstName}} {{tempUser.secondName}}</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'super'\">superuser</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'admin'\">client-admin</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'user'\">client-user</span>\n    </div>\n    <div class=\"user-card-hd-menu\" [class.user-card-hd-menu-active]=\"openMenu\" [hidden]=\"!canEdit\">\n      <i class=\"material-icons\" (click)=\"openMenu = !openMenu\" (window:mouseup)=\"openMenu = false\">more_vert</i>\n      <div class=\"pop-up\" [class.hidden]=\"!openMenu\">\n        <div class=\"pop-up-item\">\n          <i class=\"material-icons\">folder</i>\n          <div class=\"pop-up-row-name\">\n            <span>Projects</span>\n            <span class=\"pop-up-num\">2</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\">\n          <i class=\"material-icons\">people</i>\n          <div class=\"pop-up-row-name\">\n            <span>Users</span>\n            <span class=\"pop-up-num\">4</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = false\">visibility_off</i>\n          <div class=\"pop-up-row-name\">\n            <span>Deactivate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = true\">visibility</i>\n          <div class=\"pop-up-row-name\">\n            <span>Activate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!canEdit\">\n          <i class=\"material-icons\">lock</i>\n          <div class=\"pop-up-row-name\">\n            <span>Change password</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!canEdit\" (click)=\"delete()\">\n          <i class=\"material-icons\">delete</i>\n          <div class=\"pop-up-row-name\">\n            <span>Delete</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <span class=\"user-card-created-date\">Created: {{tempUser.created}}</span>\n  </div>\n  <div class=\"user-card-body\">\n    <div class=\"item-photo\">\n      <label class=\"photo\" [class.curs-dis]=\"!canEdit\" [ngStyle]=\"{'background-image': 'url(' + tempUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempUser.avatar\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"!canEdit\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n    </div>\n    <form class=\"item-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.email || message\" placeholder=\"Email\" [(ngModel)]=\"tempUser.email\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.email = true; message =''\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n        <label [class.full-op]=\"message\">{{message}}</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.firstName\" placeholder=\"First name\" [(ngModel)]=\"tempUser.firstName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.secondName\" placeholder=\"Last name\" [(ngModel)]=\"tempUser.secondName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n    </form>\n  </div>\n</div>\n<div class=\"user-card-foot\" [hidden]=\"!canEdit\">\n  <span class=\"user-ft-l false-btn\" (click)=\"reset()\">Reset</span>\n  <span class=\"user-ft-r true-btn\" (click)=\"changeUser()\">save changes</span>\n</div>"

/***/ }),

/***/ 771:
/***/ (function(module, exports) {

module.exports = "<main class=\"row\">\r\n  <div class=\"user-list-wrap col-md-4\">\r\n\r\n    <div class=\"user-list\">\r\n      <div class=\"slimscroll-wrap\" slimScroll  width=\"100%\" alwaysVisible=false distance=\"0px\" height=\"100%\" size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>\r\n        <div class=\"user-list-item\" [class.deactive]=\"!user.active\" [class.selected-user]=\"selectedUser === user\" *ngFor=\"let user of User.users | namefilter: header.searchName: header.sortType\">\r\n          <div class=\"user-item-img-wrap\" [ngStyle]=\"{'background-image': 'url(' + user.avatar + ')'}\" (click)=\"selectUser(user, false)\">\r\n            <span *ngIf=\"!user.avatar\">{{userService.lettersNoImg(user)}}</span>\r\n          </div>\r\n          <div class=\"user-list-item-wrap\">\r\n            <div class=\"user-name-wrap\">\r\n              <div class=\"user-name pointer\" (click)=\"selectUser(user, false)\">\r\n                <span>{{user.firstName}} {{user.secondName}}</span>\r\n                <i class=\"material-icons\" [hidden]=\"user.active\">visibility_off</i>\r\n                <span class=\"new-title\" [hidden]=\"!user.newUser\">New</span>\r\n              </div>\r\n              <br>\r\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'super'\">Super user</span>\r\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'admin'\">Client-admin</span>\r\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'user'\">Client-user</span>\r\n            </div>\r\n            <div class=\"user-ctrl\">\r\n              <i class=\"material-icons\" (click)=\"selectUser(user, true)\">edit</i>\r\n              <div class=\"user-edit-wrap\" [class.user-edit-active]=\"settingsUser === user\">\r\n                <i class=\"material-icons\" (click)=\"settingsUser = user\" (window:mouseup)=\"settingsUser = null\">more_vert</i>\r\n                <div class=\"pop-up\" [hidden]=\"settingsUser !== user\">\r\n                  <div class=\"pop-up-item\" [hidden]=\"!user.active\" (click)=\"deactivateUser(user)\">\r\n                    <i class=\"material-icons\">visibility_off</i>\r\n                    <div class=\"pop-up-row-name\">\r\n                      <span>Deactivate</span>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"pop-up-item\" [hidden]=\"user.active\" (click)=\"deactivateUser(user)\">\r\n                    <i class=\"material-icons\">visibility</i>\r\n                    <div class=\"pop-up-row-name\">\r\n                      <span>Activate</span>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"pop-up-item\" (click)=\"deleteUser(user)\">\r\n                    <i class=\"material-icons\">delete</i>\r\n                    <div class=\"pop-up-row-name\">\r\n                      <span>Delete</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"add-btn\" (click)=\"createNewUser = true\" [hidden]=\"createNewUser\">\r\n      <i class=\"material-icons\">add</i>\r\n      <div class=\"span-hover\">\r\n        <span>Add a new user</span>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"user-card-wrap col-md-8\">\r\n    <app-user-card [(user)]=\"selectedUser\" [canEdit]=\"canEdit\" [hidden]=\"!selectedUser\"></app-user-card>\r\n    <span class=\"no-user\" [hidden]=\"selectedUser\">No user selected</span>\r\n  </div>\r\n\r\n</main>\r\n\r\n<app-new-user class=\"add-new\" [message]=\"message\" *ngIf=\"createNewUser\" ></app-new-user>\r\n"

/***/ }),

/***/ 772:
/***/ (function(module, exports) {

module.exports = "<div class=\"login-logo\">\n  <img src=\"../../../assets/img/logo.png\" alt=\"\">\n</div>\n<div class=\"login-form\">\n  <label class=\"login-text\">Log in:</label>\n  <form class=\"item-form\" (keydown)=\"keyDown($event)\">\n    <div class=\"input-wrap\">\n      <input id=\"login-name\" [class.input-error]=\"!resol.email || message\" type=\"text\" [(ngModel)]=\"user.email\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Username / email\" (focus)=\"resol.email = true; message = ''\">\n      <label for=\"login-name\" [class.full-op]=\"!resol.email\">This input requires a value!</label>\n      <label for=\"login-name\" [class.full-op]=\"message\">{{message}}</label>\n    </div>\n    <div class=\"input-wrap\">\n      <input id=\"login-pass\" [class.input-error]=\"!resol.password || message\" type=\"password\" [(ngModel)]=\"user.password\" [ngModelOptions]=\"{standalone: true}\" maxlength=\"15\" placeholder=\"Password\" (focus)=\"resol.password = true; message = ''\">\n      <label for=\"login-pass\" [class.full-op]=\"!resol.password\">This input requires a value!</label>\n      <label for=\"login-pass\" [class.full-op]=\"message\">{{message}}</label>\n    </div>\n  </form>\n  <div class=\"log-in\">\n    <div class=\"chkbx-wrap\">\n      <div id=\"remember-int\" (click)=\"remember = !remember\">\n        <i class=\"material-icons\" [hidden]=\"!remember\">done</i>\n      </div>\n      <label for=\"remember-int\" (click)=\"remember = !remember\">Remember password</label>\n    </div>\n    <span class=\"true-btn\" (click)=\"logIn()\">ACCEPT</span>\n  </div>\n</div>"

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(545);


/***/ }),

/***/ 95:
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], StorageService);
    return StorageService;
}());
//# sourceMappingURL=storage.service.js.map

/***/ })

},[809]);
//# sourceMappingURL=main.bundle.js.map