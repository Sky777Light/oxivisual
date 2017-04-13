webpackJsonp([1,4],{

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function ProjectService() {
    }
    ProjectService.prototype.setProject = function (project) {
        this.Project = project;
    };
    ProjectService.prototype.getProject = function () {
        return this.Project;
    };
    ProjectService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ProjectService);
    return ProjectService;
}());
//# sourceMappingURL=project.service.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(69);
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
            console.log(res);
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
        console.log(resolFlag);
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

/***/ 341:
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
            template: __webpack_require__(775),
            styles: [__webpack_require__(736)],
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

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__(210);
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
        console.log(123123312);
        this.project = this.projectService.getProject();
    };
    BasicProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-basic-project',
            template: __webpack_require__(776),
            styles: [__webpack_require__(737)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */]) === 'function' && _a) || Object])
    ], BasicProject);
    return BasicProject;
    var _a;
}());
//# sourceMappingURL=basic.project.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_project_service__ = __webpack_require__(210);
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
    function ProjectComponent(shareService, route, userService, projectService) {
        this.shareService = shareService;
        this.route = route;
        this.userService = userService;
        this.projectService = projectService;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.userService.getUser().projects.forEach(function (project) {
                if (project._id == params['id']) {
                    _this.shareService.changeHeaderSubject(project);
                    _this.projectService.setProject(project);
                }
            });
        });
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-project',
            template: __webpack_require__(777),
            styles: [__webpack_require__(738)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */]) === 'function' && _d) || Object])
    ], ProjectComponent);
    return ProjectComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=project.component.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SourceProject; });
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
    function SourceProject() {
    }
    SourceProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-projects-source',
            template: __webpack_require__(778),
            styles: [__webpack_require__(739)]
        }), 
        __metadata('design:paramtypes', [])
    ], SourceProject);
    return SourceProject;
}());
//# sourceMappingURL=source.project.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_share_service__ = __webpack_require__(47);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-projects',
            template: __webpack_require__(780),
            styles: [__webpack_require__(741)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_share_service__["a" /* ShareService */]) === 'function' && _b) || Object])
    ], ProjectsComponent);
    return ProjectsComponent;
    var _a, _b;
}());
//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(71);
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
            console.log(res.message);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-users',
            template: __webpack_require__(784),
            styles: [__webpack_require__(745)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], UsersComponent);
    return UsersComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(31);
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
            template: __webpack_require__(785),
            styles: [__webpack_require__(746)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
var Project = (function () {
    function Project(title, id, link, owner, published, newProject, _created, image) {
        if (title === void 0) { title = ''; }
        if (id === void 0) { id = null; }
        if (link === void 0) { link = null; }
        if (owner === void 0) { owner = null; }
        if (published === void 0) { published = false; }
        if (newProject === void 0) { newProject = false; }
        if (_created === void 0) { _created = Date.now(); }
        if (image === void 0) { image = ''; }
        this.title = title;
        this.image = image;
        this._id = id;
        this.link = link;
        this.owner = owner;
        this.published = published;
        this.newProject = newProject;
    }
    return Project;
}());
//# sourceMappingURL=Project.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_service__ = __webpack_require__(31);
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

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(69);
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

/***/ 47:
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ShareService);
    return ShareService;
}());
//# sourceMappingURL=share.service.js.map

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 549;


/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(678);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 667:
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
            template: __webpack_require__(772),
            styles: [__webpack_require__(733)],
            host: { 'window:beforeunload': 'beforeClose' }
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_storage_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_user_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_guard_service__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_logged_guard_service__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_share_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_name_pipe__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_slimscroll_directive__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_login_login_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_home_home_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_home_aside_aside_component__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_home_users_users_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_home_projects_projects_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_home_header_header_component__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_home_users_user_card_user_card_component__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_home_users_new_user_new_user_component__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_home_projects_new_project_new_project_component__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_home_projects_view_view_project__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_home_project_project_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_home_project_source_source_project__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_home_project_basic_basic_project__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_project_service__ = __webpack_require__(210);
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
                __WEBPACK_IMPORTED_MODULE_19__components_home_projects_projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_home_projects_new_project_new_project_component__["a" /* NewProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_home_projects_view_view_project__["a" /* ViewProject */],
                __WEBPACK_IMPORTED_MODULE_26__components_home_project_source_source_project__["a" /* SourceProject */],
                __WEBPACK_IMPORTED_MODULE_27__components_home_project_basic_basic_project__["a" /* BasicProject */],
                __WEBPACK_IMPORTED_MODULE_25__components_home_project_project_component__["a" /* ProjectComponent */]
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
                __WEBPACK_IMPORTED_MODULE_11__services_share_service__["a" /* ShareService */],
                __WEBPACK_IMPORTED_MODULE_28__services_project_service__["a" /* ProjectService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(31);
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
            template: __webpack_require__(773),
            styles: [__webpack_require__(734)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], AsideComponent);
    return AsideComponent;
    var _a, _b;
}());
//# sourceMappingURL=aside.component.js.map

/***/ }),

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(47);
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
    HeaderComponent.prototype.deactivate = function (published) {
        this.headerData.published = published;
    };
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__(774),
            styles: [__webpack_require__(735)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a;
}());
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_Project__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_share_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(71);
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
    function NewProjectComponent(userService, shareService, authService) {
        this.userService = userService;
        this.shareService = shareService;
        this.authService = authService;
        this.openedStateChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* EventEmitter */]();
        this.resol = {
            title: true,
            link: true
        };
        this.User = this.userService.getUser();
        this.project = new __WEBPACK_IMPORTED_MODULE_2__entities_Project__["Project"]();
    }
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
        if (event.keyCode == 13) {
            this.accept();
        }
        else if (event.keyCode == 27) {
            this.cancel();
        }
    };
    NewProjectComponent.prototype.accept = function () {
        var _this = this;
        if (!this.userService.resolUser(this.resol, this.project))
            return false;
        this.authService.post('/api/projects/project', this.project).subscribe(function (res) {
            res = res.json();
            if (res.status) {
                _this.User.projects.push(res.res);
            }
            alertify.success(res.message);
        }, function (error) { });
        this.cancel();
    };
    NewProjectComponent.prototype.cancel = function () {
        this.openedState = false;
        this.openedStateChange.emit(this.openedState);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__entities_Project__ !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__entities_Project__["IProject"]) === 'function' && _a) || Object)
    ], NewProjectComponent.prototype, "project", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String)
    ], NewProjectComponent.prototype, "title", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', Boolean)
    ], NewProjectComponent.prototype, "openedState", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* EventEmitter */]) === 'function' && _b) || Object)
    ], NewProjectComponent.prototype, "openedStateChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NewProjectComponent.prototype, "keyDown", null);
    NewProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-new-project',
            template: __webpack_require__(779),
            styles: [__webpack_require__(740)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_share_service__["a" /* ShareService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */]) === 'function' && _e) || Object])
    ], NewProjectComponent);
    return NewProjectComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=new-project.component.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_Project__ = __webpack_require__(348);
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
    function ViewProject() {
        this.openedPopUp = false;
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__entities_Project__ !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__entities_Project__["IProject"]) === 'function' && _a) || Object)
    ], ViewProject.prototype, "project", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(), 
        __metadata('design:type', String)
    ], ViewProject.prototype, "noEdite", void 0);
    ViewProject = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-project-view',
            template: __webpack_require__(781),
            styles: [__webpack_require__(742)]
        }), 
        __metadata('design:paramtypes', [])
    ], ViewProject);
    return ViewProject;
    var _a;
}());
//# sourceMappingURL=view.project.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(31);
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
            template: __webpack_require__(782),
            styles: [__webpack_require__(743)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_share_service__["a" /* ShareService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], NewUserComponent);
    return NewUserComponent;
    var _a, _b;
}());
//# sourceMappingURL=new-user.component.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(71);
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
            template: __webpack_require__(783),
            styles: [__webpack_require__(744)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], UserCardComponent);
    return UserCardComponent;
    var _a, _b;
}());
//# sourceMappingURL=user-card.component.js.map

/***/ }),

/***/ 675:
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

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_share_service__ = __webpack_require__(47);
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

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_logged_guard_service__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_guard_service__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_home_home_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_home_projects_projects_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_home_users_users_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_home_project_project_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_home_project_basic_basic_project__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_project_source_source_project__ = __webpack_require__(344);
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
                        path: 'source',
                        component: __WEBPACK_IMPORTED_MODULE_9__components_home_project_source_source_project__["a" /* SourceProject */]
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
        path: "**",
        redirectTo: '/'
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=router.js.map

/***/ }),

/***/ 678:
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

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(318);
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

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".app-wrap {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-aside {\n  position: fixed;\n  z-index: 2000;\n  top: 0;\n  left: 0;\n  display: inline-block;\n  float: left;\n  width: 260px;\n  height: 100%;\n  background-color: #ffffff;\n  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n  app-aside header {\n    width: 100%;\n    height: 160px;\n    background-color: #1976D2;\n    padding: 20px;\n    color: #ffffff; }\n    app-aside header .asd-hd-top {\n      width: 100%;\n      height: 64px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside header .asd-hd-top .asd-name-in {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        width: 60px;\n        height: 60px;\n        border-radius: 50%;\n        background: no-repeat;\n        background-position: 50% 50%;\n        background-size: auto 100%;\n        background-color: #ffffff;\n        font-family: Roboto-Light;\n        font-size: 20px;\n        color: #181818; }\n      app-aside header .asd-hd-top .asd-status-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: end;\n            -ms-flex-align: end;\n                align-items: flex-end; }\n        app-aside header .asd-hd-top .asd-status-wrap i {\n          height: 16px;\n          width: 20px;\n          line-height: 0.7; }\n        app-aside header .asd-hd-top .asd-status-wrap .asd-status {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          width: 80px;\n          height: 24px;\n          background-color: rgba(255, 255, 255, 0.1);\n          border-radius: 100px;\n          font-size: 12px;\n          font-family: Roboto-Medium; }\n    app-aside header .asd-hd-bot {\n      width: 100%;\n      height: 60px;\n      padding-top: 21px;\n      font-size: 14px; }\n      app-aside header .asd-hd-bot .asd-email-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-aside header .asd-hd-bot .asd-email-wrap .asd-email {\n          font-family: Roboto-Light;\n          opacity: 0.4; }\n  app-aside .pop-up {\n    width: 100%;\n    height: 160px;\n    padding: 20px 0;\n    border-bottom: 2px solid #D6D5D5;\n    box-shadow: none;\n    border-radius: 0; }\n    app-aside .pop-up .pop-up-item i {\n      margin-right: 32px; }\n    app-aside .pop-up .pop-up-item .pop-up-num {\n      font-size: 13px; }\n    app-aside .pop-up .asd-active {\n      color: #1976D2;\n      background-color: rgba(25, 118, 210, 0.1); }\n  app-aside footer {\n    width: 100%;\n    height: calc( 100% - 320px);\n    padding: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    font-size: 15px;\n    color: #9B9B9B; }\n    app-aside footer .asd-logout {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-aside footer .asd-logout i {\n        margin-right: 30px; }\n    app-aside footer .asd-terms {\n      width: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-aside footer .asd-terms a {\n        text-decoration: underline;\n        font-size: 13px;\n        color: #9B9B9B; }\n      app-aside footer .asd-terms img {\n        width: 88px;\n        -webkit-filter: invert(40%) grayscale(100%);\n                filter: invert(40%) grayscale(100%); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: calc(100% - 70px);\n  height: 90px;\n  padding: 0 30px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-item-align: end;\n      align-self: flex-end;\n  -webkit-transition: margin .4s ease-in-out, width .4s ease-in-out;\n  transition: margin .4s ease-in-out, width .4s ease-in-out; }\n  app-header .header-wrap {\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-header .header-wrap span {\n      white-space: nowrap; }\n    app-header .header-wrap .header-tag {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 24px;\n      color: #444444;\n      line-height: 1; }\n      app-header .header-wrap .header-tag i {\n        margin-right: 24px; }\n      app-header .header-wrap .header-tag span {\n        font-size: 12px;\n        color: #FFA000; }\n      app-header .header-wrap .header-tag .arr-info {\n        color: #9B9B9B;\n        margin-left: 10px; }\n      app-header .header-wrap .header-tag .header-title-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start; }\n    app-header .header-wrap .header-main {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: end;\n          -ms-flex-pack: end;\n              justify-content: flex-end; }\n      app-header .header-wrap .header-main .header-search {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        height: 40px;\n        width: 100%;\n        min-width: 150px;\n        margin: 0 60px;\n        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.12); }\n        app-header .header-wrap .header-main .header-search input {\n          width: 100%;\n          font-size: 16px; }\n          app-header .header-wrap .header-main .header-search input::-webkit-input-placeholder {\n            color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-search input::-moz-placeholder {\n            color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-search input:-ms-input-placeholder {\n            color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-search input:-moz-placeholder {\n            color: #4D4D4E; }\n      app-header .header-wrap .header-main .header-sort {\n        height: 100%;\n        width: 270px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        font-size: 15px; }\n        app-header .header-wrap .header-main .header-sort .sort-select {\n          position: relative;\n          margin-left: 20px;\n          width: 184px;\n          height: 40px;\n          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);\n          border-radius: 2px;\n          color: #9B9B9B;\n          -webkit-transition: box-shadow .3s;\n          transition: box-shadow .3s; }\n          app-header .header-wrap .header-main .header-sort .sort-select .sort-present {\n            width: 100%;\n            height: 100%;\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: justify;\n                -ms-flex-pack: justify;\n                    justify-content: space-between;\n            padding: 0 20px;\n            cursor: pointer; }\n          app-header .header-wrap .header-main .header-sort .sort-select .pop-up {\n            width: 184px;\n            position: absolute;\n            z-index: 200;\n            top: 45px; }\n            app-header .header-wrap .header-main .header-sort .sort-select .pop-up .pop-up-item {\n              height: 30px;\n              padding: 5px 20px; }\n              app-header .header-wrap .header-main .header-sort .sort-select .pop-up .pop-up-item .sort-selected {\n                color: #EBEBEB; }\n          app-header .header-wrap .header-main .header-sort .sort-select:hover {\n            box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1); }\n        app-header .header-wrap .header-main .header-sort .sort-active {\n          color: #4D4D4E; }\n          app-header .header-wrap .header-main .header-sort .sort-active i {\n            color: #1976D2; }\n      app-header .header-wrap .header-main .pop-up-icon {\n        height: 40px;\n        width: 40px; }\n        app-header .header-wrap .header-main .pop-up-icon .set-icon {\n          font-size: 29px; }\n        app-header .header-wrap .header-main .pop-up-icon .pop-up {\n          position: absolute;\n          z-index: 100;\n          right: 0;\n          top: 50px;\n          width: 200px;\n          height: 100px; }\n      app-header .header-wrap .header-main .header-main-mnu {\n        margin: 0 10px;\n        height: 100%;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        app-header .header-wrap .header-main .header-main-mnu .mnu-item {\n          height: 100%;\n          cursor: pointer;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          padding: 0 20px;\n          border: 3px solid transparent; }\n        app-header .header-wrap .header-main .header-main-mnu .mnu-item-active {\n          color: #1976D2;\n          border-bottom-color: #1976D2; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-home {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative; }\n  app-home .main-content {\n    display: inline-block;\n    width: 100%;\n    height: calc(100% - 90px);\n    border-top: 2px solid #EBEBEB;\n    -webkit-transition: margin .4s ease-in-out, width .4s ease-in-out;\n    transition: margin .4s ease-in-out, width .4s ease-in-out; }\n  app-home .openedMenu {\n    margin-left: 260px;\n    width: calc(100% - 260px); }\n  app-home .menu-btn {\n    cursor: pointer;\n    position: absolute;\n    z-index: 1000;\n    top: 20px;\n    left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 50px;\n    height: 50px;\n    color: #ffffff;\n    border-radius: 50%;\n    background-color: #1976D2;\n    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2);\n    visibility: visible;\n    opacity: 1;\n    -webkit-transition: opacity .3s, visibility 0s .3s;\n    transition: opacity .3s, visibility 0s .3s; }\n  app-home .menu-btn-hide {\n    visibility: hidden;\n    opacity: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 737:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 738:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-new-project .new-form {\n  width: 420px;\n  height: 580px;\n  padding: 35px 30px 25px 30px; }\n  app-new-project .new-form .main-info {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    app-new-project .new-form .main-info .item-form {\n      width: 100%; }\n    app-new-project .new-form .main-info .item-photo {\n      position: relative;\n      margin-top: 30px;\n      width: 360px;\n      height: 260px; }\n      app-new-project .new-form .main-info .item-photo .photo {\n        width: 100%;\n        height: 220px;\n        border-radius: inherit; }\n      app-new-project .new-form .main-info .item-photo .photo-ctrl {\n        -webkit-box-pack: start;\n            -ms-flex-pack: start;\n                justify-content: flex-start; }\n      app-new-project .new-form .main-info .item-photo .photo-info {\n        display: inline-block;\n        position: absolute;\n        bottom: 1px;\n        right: 0; }\n  app-new-project .new-form .new-btns {\n    margin-top: 62px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 741:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-projects, .edit-form {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  app-projects main, .edit-form main {\n    width: 100%;\n    height: 100%;\n    padding: 30px 20px; }\n    app-projects main .projects-wrap, .edit-form main .projects-wrap {\n      width: 100%;\n      height: calc(100% - 56px); }\n      app-projects main .projects-wrap .projects-list, .edit-form main .projects-wrap .projects-list {\n        height: 100%;\n        width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-project-view {\n  padding: 0 10px 20px 10px;\n  height: 300px; }\n  app-project-view .project {\n    width: 100%;\n    height: 100%;\n    background-color: #ffffff;\n    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);\n    border-radius: 2px; }\n    app-project-view .project .project-content {\n      position: relative;\n      width: 100%;\n      height: 220px;\n      padding: 20px 0;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      color: #ffffff;\n      border-radius: 2px;\n      background-position: 50% 50%;\n      background-size: cover;\n      background-color: #4D4D4E;\n      font-size: 14px; }\n      app-project-view .project .project-content .project-ctrl-wrap {\n        width: 100%;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        padding: 0 0 0 20px; }\n        app-project-view .project .project-content .project-ctrl-wrap .unpublished {\n          font-weight: 500;\n          color: #FFA000; }\n        app-project-view .project .project-content .project-ctrl-wrap .project-ctrl {\n          width: 100%;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: end;\n              -ms-flex-pack: end;\n                  justify-content: flex-end;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center; }\n          app-project-view .project .project-content .project-ctrl-wrap .project-ctrl .pop-up-icon {\n            margin: 0 12px;\n            color: #ffffff; }\n            app-project-view .project .project-content .project-ctrl-wrap .project-ctrl .pop-up-icon .pop-up {\n              position: absolute;\n              z-index: 100;\n              right: 0;\n              top: 35px;\n              width: 170px;\n              height: 100px; }\n          app-project-view .project .project-content .project-ctrl-wrap .project-ctrl .pop-up-icon-active {\n            background-color: #9B9B9B; }\n      app-project-view .project .project-content .no-img {\n        cursor: default;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        opacity: 0.2;\n        font-size: 38px;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%); }\n      app-project-view .project .project-content .project-info {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        padding: 0 20px; }\n        app-project-view .project .project-content .project-info .project-title {\n          font-size: 24px; }\n        app-project-view .project .project-content .project-info .project-created {\n          opacity: 0.5; }\n    app-project-view .project .img-true {\n      background: -webkit-linear-gradient(top, rgba(13, 13, 13, 0) 0%, #101010 100%), 50% 50% no-repeat;\n      background: linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #101010 100%), 50% 50% no-repeat;\n      background-color: rgba(0, 0, 0, 0.3);\n      background-size: cover; }\n    app-project-view .project .project-bot {\n      width: 100%;\n      height: 60px;\n      padding: 15px 20px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 14px; }\n      app-project-view .project .project-bot .project-admin {\n        color: #9B9B9B;\n        width: 44px; }\n      app-project-view .project .project-bot .project-users {\n        width: calc(100% - 44px);\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-project-view .project .project-bot .project-users .project-user {\n          width: 50%;\n          padding-left: 20px;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center; }\n          app-project-view .project .project-bot .project-users .project-user .project-user-name {\n            width: calc(100% - 40px);\n            margin-left: 10px;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap; }\n          app-project-view .project .project-bot .project-users .project-user .project-user-img {\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: center;\n                -ms-flex-pack: center;\n                    justify-content: center;\n            color: #4A4A4A;\n            width: 30px;\n            height: 30px;\n            border-radius: 50%;\n            background: no-repeat;\n            background-position: 50% 50%;\n            background-size: auto 100%;\n            background-color: #EBEBEB; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-new-user .new-form {\n  width: 460px;\n  height: 540px; }\n  app-new-user .new-form .main-info {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    app-new-user .new-form .main-info .item-photo {\n      padding-top: 30px;\n      width: 130px;\n      height: 200px; }\n      app-new-user .new-form .main-info .item-photo .photo {\n        width: 130px;\n        height: 130px; }\n    app-new-user .new-form .main-info .item-form {\n      width: 240px;\n      margin-left: 30px; }\n  app-new-user .new-form .user-status {\n    width: 100%;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    margin: 50px 0 58px; }\n    app-new-user .new-form .user-status .user-status-item {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      font-size: 16px;\n      color: #4A4A4A; }\n      app-new-user .new-form .user-status .user-status-item span {\n        margin-left: 12px; }\n      app-new-user .new-form .user-status .user-status-item .selected-status {\n        color: #1976D2; }\n    app-new-user .new-form .user-status label {\n      position: absolute;\n      width: 100%;\n      left: 0;\n      top: 30px;\n      text-align: center;\n      color: #ff0000;\n      font-size: 12px;\n      opacity: 0;\n      -webkit-transition: opacity .5s;\n      transition: opacity .5s;\n      border-top: 2px solid #ff0000; }\n    app-new-user .new-form .user-status .err-status {\n      opacity: 1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-user-card {\n  height: 420px;\n  width: 100%; }\n  app-user-card .user-card, app-user-card .user-card-foot {\n    padding: 0 30px 0 27px;\n    border-bottom: 2px solid #EBEBEB; }\n  app-user-card .user-card {\n    height: 340px;\n    width: 100%; }\n    app-user-card .user-card .user-card-head {\n      width: 100%;\n      height: 80px;\n      position: relative;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      app-user-card .user-card .user-card-head .user-card-hd-name {\n        font-size: 24px;\n        color: #444444; }\n      app-user-card .user-card .user-card-head .user-card-hd-status {\n        font-size: 14px;\n        font-style: italic;\n        color: #9B9B9B;\n        margin-left: 10px; }\n      app-user-card .user-card .user-card-head .pop-up-icon {\n        height: 40px;\n        width: 40px; }\n        app-user-card .user-card .user-card-head .pop-up-icon .pop-up {\n          position: absolute;\n          z-index: 100;\n          right: 0;\n          top: 50px;\n          width: 200px;\n          height: 215px; }\n      app-user-card .user-card .user-card-head .user-card-created-date {\n        position: absolute;\n        line-height: 0.7;\n        bottom: 0px;\n        font-size: 14px;\n        color: #9B9B9B; }\n    app-user-card .user-card .user-card-body {\n      width: 100%;\n      height: 260px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      app-user-card .user-card .user-card-body .item-photo {\n        padding-top: 35px;\n        width: 120px;\n        height: 100%; }\n      app-user-card .user-card .user-card-body .item-form {\n        width: 320px;\n        margin-left: 60px; }\n  app-user-card .user-card-foot {\n    height: 80px;\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    app-user-card .user-card-foot .user-ft-l {\n      margin-right: 15px; }\n    app-user-card .user-card-foot .user-ft-r {\n      margin-left: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-users {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  app-users main {\n    width: 100%;\n    height: 100%; }\n    app-users main .user-list-wrap {\n      position: relative;\n      height: 100%;\n      padding: 0;\n      border-right: 2px solid #EBEBEB; }\n      app-users main .user-list-wrap .user-list {\n        height: calc(100% - 86px);\n        width: 100%; }\n        app-users main .user-list-wrap .user-list .slimscroll-wrap {\n          width: 100%;\n          height: 100%; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item {\n            padding-left: 30px;\n            width: 100%;\n            height: 80px;\n            border-bottom: 2px solid #EBEBEB;\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-box-pack: justify;\n                -ms-flex-pack: justify;\n                    justify-content: space-between; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-item-img-wrap {\n              cursor: pointer;\n              float: left;\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-align: center;\n                  -ms-flex-align: center;\n                      align-items: center;\n              -webkit-box-pack: center;\n                  -ms-flex-pack: center;\n                      justify-content: center;\n              font-size: 14px;\n              color: #4A4A4A;\n              width: 39px;\n              height: 39px;\n              border-radius: 50%;\n              background: no-repeat;\n              background-position: 50% 50%;\n              background-size: auto 100%;\n              background-color: #EBEBEB; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap {\n              height: 100%;\n              width: calc(100% - 39px);\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-align: center;\n                  -ms-flex-align: center;\n                      align-items: center;\n              -webkit-box-pack: justify;\n                  -ms-flex-pack: justify;\n                      justify-content: space-between; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap {\n                margin-left: 15px;\n                width: 100%; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name {\n                  display: -webkit-inline-box;\n                  display: -ms-inline-flexbox;\n                  display: inline-flex;\n                  -webkit-box-align: center;\n                      -ms-flex-align: center;\n                          align-items: center; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name i {\n                    margin-left: 10px;\n                    font-size: 21px;\n                    line-height: 0.7; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name span {\n                    display: block;\n                    float: left; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-name .new-title {\n                    margin-left: 10px;\n                    color: #FFA000; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-name-wrap .user-status {\n                  font-size: 14px;\n                  font-family: Roboto-Light;\n                  color: #9B9B9B;\n                  font-style: italic; }\n              app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl {\n                float: right;\n                display: -webkit-box;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-align: center;\n                    -ms-flex-align: center;\n                        align-items: center; }\n                app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl .pop-up-icon {\n                  margin-right: 20px; }\n                  app-users main .user-list-wrap .user-list .slimscroll-wrap .user-list-item .user-list-item-wrap .user-ctrl .pop-up-icon .pop-up {\n                    position: absolute;\n                    z-index: 100;\n                    right: 0;\n                    top: 35px;\n                    width: 170px;\n                    height: 100px; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive img {\n            opacity: 0.5; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap {\n            color: #D6D5D5; }\n            app-users main .user-list-wrap .user-list .slimscroll-wrap .deactive .user-name-wrap span {\n              color: #D6D5D5 !important; }\n          app-users main .user-list-wrap .user-list .slimscroll-wrap .selected-user {\n            background-color: rgba(255, 160, 0, 0.1); }\n    app-users main .user-card-wrap {\n      padding: 0;\n      height: 100%;\n      position: relative; }\n      app-users main .user-card-wrap .no-user {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        font-size: 24px;\n        color: #D6D5D5; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".pos-center, app-login .login-form .log-in .chkbx-wrap #remember-int i {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.hidden {\n  display: none !important; }\n\n.full-op {\n  opacity: 1 !important; }\n\n.curs-dis {\n  pointer-events: none; }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-1 {\n    width: 8.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-2 {\n    width: 16.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-3 {\n    width: 25%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-4 {\n    width: 33.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-5 {\n    width: 41.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-6 {\n    width: 50%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-7 {\n    width: 58.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-8 {\n    width: 66.6666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-9 {\n    width: 75%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-10 {\n    width: 83.3333%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-11 {\n    width: 91.66666%; } }\n\n@media screen and (min-width: 1600px) {\n  .col-exlg-12 {\n    width: 100%; } }\n\n@-webkit-keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@keyframes opac-down {\n  0% {\n    opacity: 1;\n    z-index: 100; }\n  100% {\n    opacity: 0;\n    z-index: -1; } }\n\n@-webkit-keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\n@keyframes opac-up {\n  0% {\n    opacity: 0;\n    z-index: -1; }\n  100% {\n    opacity: 1;\n    z-index: 100; } }\n\napp-login {\n  background-color: #1976D2;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n  app-login .login-logo {\n    width: 165px;\n    height: 30px;\n    position: absolute;\n    left: 50%;\n    top: 16.6%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n    app-login .login-logo img {\n      width: 100%;\n      height: 100%; }\n  app-login .login-form {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 380px;\n    height: 280px;\n    padding: 30px;\n    box-sizing: border-box;\n    background-color: #ffffff;\n    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16); }\n    app-login .login-form .login-text {\n      font-size: 24px;\n      color: #444444; }\n    app-login .login-form .item-form {\n      width: 320px; }\n    app-login .login-form .log-in {\n      margin-top: 45px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      app-login .login-form .log-in .chkbx-wrap {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        app-login .login-form .log-in .chkbx-wrap #remember-int {\n          position: relative;\n          float: left;\n          width: 18px;\n          height: 18px;\n          border: 1px solid #4D4D4E;\n          border-radius: 3px;\n          cursor: pointer; }\n        app-login .login-form .log-in .chkbx-wrap label[for=remember-int] {\n          margin-left: 10px;\n          font-size: 15px;\n          cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 363,
	"./af.js": 363,
	"./ar": 370,
	"./ar-dz": 364,
	"./ar-dz.js": 364,
	"./ar-kw": 365,
	"./ar-kw.js": 365,
	"./ar-ly": 366,
	"./ar-ly.js": 366,
	"./ar-ma": 367,
	"./ar-ma.js": 367,
	"./ar-sa": 368,
	"./ar-sa.js": 368,
	"./ar-tn": 369,
	"./ar-tn.js": 369,
	"./ar.js": 370,
	"./az": 371,
	"./az.js": 371,
	"./be": 372,
	"./be.js": 372,
	"./bg": 373,
	"./bg.js": 373,
	"./bn": 374,
	"./bn.js": 374,
	"./bo": 375,
	"./bo.js": 375,
	"./br": 376,
	"./br.js": 376,
	"./bs": 377,
	"./bs.js": 377,
	"./ca": 378,
	"./ca.js": 378,
	"./cs": 379,
	"./cs.js": 379,
	"./cv": 380,
	"./cv.js": 380,
	"./cy": 381,
	"./cy.js": 381,
	"./da": 382,
	"./da.js": 382,
	"./de": 385,
	"./de-at": 383,
	"./de-at.js": 383,
	"./de-ch": 384,
	"./de-ch.js": 384,
	"./de.js": 385,
	"./dv": 386,
	"./dv.js": 386,
	"./el": 387,
	"./el.js": 387,
	"./en-au": 388,
	"./en-au.js": 388,
	"./en-ca": 389,
	"./en-ca.js": 389,
	"./en-gb": 390,
	"./en-gb.js": 390,
	"./en-ie": 391,
	"./en-ie.js": 391,
	"./en-nz": 392,
	"./en-nz.js": 392,
	"./eo": 393,
	"./eo.js": 393,
	"./es": 395,
	"./es-do": 394,
	"./es-do.js": 394,
	"./es.js": 395,
	"./et": 396,
	"./et.js": 396,
	"./eu": 397,
	"./eu.js": 397,
	"./fa": 398,
	"./fa.js": 398,
	"./fi": 399,
	"./fi.js": 399,
	"./fo": 400,
	"./fo.js": 400,
	"./fr": 403,
	"./fr-ca": 401,
	"./fr-ca.js": 401,
	"./fr-ch": 402,
	"./fr-ch.js": 402,
	"./fr.js": 403,
	"./fy": 404,
	"./fy.js": 404,
	"./gd": 405,
	"./gd.js": 405,
	"./gl": 406,
	"./gl.js": 406,
	"./gom-latn": 407,
	"./gom-latn.js": 407,
	"./he": 408,
	"./he.js": 408,
	"./hi": 409,
	"./hi.js": 409,
	"./hr": 410,
	"./hr.js": 410,
	"./hu": 411,
	"./hu.js": 411,
	"./hy-am": 412,
	"./hy-am.js": 412,
	"./id": 413,
	"./id.js": 413,
	"./is": 414,
	"./is.js": 414,
	"./it": 415,
	"./it.js": 415,
	"./ja": 416,
	"./ja.js": 416,
	"./jv": 417,
	"./jv.js": 417,
	"./ka": 418,
	"./ka.js": 418,
	"./kk": 419,
	"./kk.js": 419,
	"./km": 420,
	"./km.js": 420,
	"./kn": 421,
	"./kn.js": 421,
	"./ko": 422,
	"./ko.js": 422,
	"./ky": 423,
	"./ky.js": 423,
	"./lb": 424,
	"./lb.js": 424,
	"./lo": 425,
	"./lo.js": 425,
	"./lt": 426,
	"./lt.js": 426,
	"./lv": 427,
	"./lv.js": 427,
	"./me": 428,
	"./me.js": 428,
	"./mi": 429,
	"./mi.js": 429,
	"./mk": 430,
	"./mk.js": 430,
	"./ml": 431,
	"./ml.js": 431,
	"./mr": 432,
	"./mr.js": 432,
	"./ms": 434,
	"./ms-my": 433,
	"./ms-my.js": 433,
	"./ms.js": 434,
	"./my": 435,
	"./my.js": 435,
	"./nb": 436,
	"./nb.js": 436,
	"./ne": 437,
	"./ne.js": 437,
	"./nl": 439,
	"./nl-be": 438,
	"./nl-be.js": 438,
	"./nl.js": 439,
	"./nn": 440,
	"./nn.js": 440,
	"./pa-in": 441,
	"./pa-in.js": 441,
	"./pl": 442,
	"./pl.js": 442,
	"./pt": 444,
	"./pt-br": 443,
	"./pt-br.js": 443,
	"./pt.js": 444,
	"./ro": 445,
	"./ro.js": 445,
	"./ru": 446,
	"./ru.js": 446,
	"./sd": 447,
	"./sd.js": 447,
	"./se": 448,
	"./se.js": 448,
	"./si": 449,
	"./si.js": 449,
	"./sk": 450,
	"./sk.js": 450,
	"./sl": 451,
	"./sl.js": 451,
	"./sq": 452,
	"./sq.js": 452,
	"./sr": 454,
	"./sr-cyrl": 453,
	"./sr-cyrl.js": 453,
	"./sr.js": 454,
	"./ss": 455,
	"./ss.js": 455,
	"./sv": 456,
	"./sv.js": 456,
	"./sw": 457,
	"./sw.js": 457,
	"./ta": 458,
	"./ta.js": 458,
	"./te": 459,
	"./te.js": 459,
	"./tet": 460,
	"./tet.js": 460,
	"./th": 461,
	"./th.js": 461,
	"./tl-ph": 462,
	"./tl-ph.js": 462,
	"./tlh": 463,
	"./tlh.js": 463,
	"./tr": 464,
	"./tr.js": 464,
	"./tzl": 465,
	"./tzl.js": 465,
	"./tzm": 467,
	"./tzm-latn": 466,
	"./tzm-latn.js": 466,
	"./tzm.js": 467,
	"./uk": 468,
	"./uk.js": 468,
	"./ur": 469,
	"./ur.js": 469,
	"./uz": 471,
	"./uz-latn": 470,
	"./uz-latn.js": 470,
	"./uz.js": 471,
	"./vi": 472,
	"./vi.js": 472,
	"./x-pseudo": 473,
	"./x-pseudo.js": 473,
	"./yo": 474,
	"./yo.js": 474,
	"./zh-cn": 475,
	"./zh-cn.js": 475,
	"./zh-hk": 476,
	"./zh-hk.js": 476,
	"./zh-tw": 477,
	"./zh-tw.js": 477
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
webpackContext.id = 748;


/***/ }),

/***/ 772:
/***/ (function(module, exports) {

module.exports = "<div class=\"app-wrap\">\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 773:
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"asd-hd-top\">\n    <div class=\"asd-name-in\" [ngStyle]=\"{'background-image': 'url(' + user.avatar + ')'}\">\n      <span *ngIf=\"!user.avatar\">{{userService.lettersNoImg(user)}}</span>\n    </div>\n    <div class=\"asd-status-wrap\">\n      <i class=\"material-icons\" (click)=\"closeMenu()\">arrow_back</i>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'super'\">Super user</div>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'admin'\">Client-admin</div>\n      <div class=\"asd-status\" *ngIf=\"user.role == 'user'\">Client-user</div>\n    </div>\n  </div>\n  <div class=\"asd-hd-bot\">\n    <div class=\"asd-name\">{{user.firstName}} {{user.secondName}}</div>\n    <div class=\"asd-email-wrap\">\n      <div class=\"asd-email\">{{user.email}}</div>\n      <i class=\"material-icons\">arrow_drop_down</i>\n    </div>\n  </div>\n</header>\n\n<div class=\"pop-up\">\n  <div class=\"pop-up-item\" routerLink=\"/projects\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">folder</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Projects</span>\n      <span class=\"pop-up-num\">{{User.projects.length || 0}}</span>\n    </div>\n  </div>\n  <div class=\"pop-up-item\" routerLink=\"/users\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">people</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Users</span>\n      <span class=\"pop-up-num\">{{User.users.length || 0}}</span>\n    </div>\n  </div>\n  <div class=\"pop-up-item\" routerLink=\"/settings\" routerLinkActive=\"asd-active\">\n    <i class=\"material-icons\">settings</i>\n    <div class=\"pop-up-row-name\">\n      <span class=\"pointer\">Settings</span>\n    </div>\n  </div>\n</div>\n\n<footer>\n  <div class=\"asd-logout\">\n    <i class=\"material-icons\" (click)=\"logOut()\">exit_to_app</i>\n    <div class=\"text-wrap pointer\" (click)=\"logOut()\">\n      Log out\n    </div>\n  </div>\n  <div class=\"asd-terms\">\n    <img src=\"../../../assets/img/logo.png\" alt=\"\">\n    <a href=\"#\">Terms</a>\n  </div>\n</footer>\n"

/***/ }),

/***/ 774:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-wrap\">\r\n  <div class=\"header-tag\">\r\n    <i class=\"material-icons\" [routerLink]=\"['/projects']\" *ngIf=\"headerData._id\">arrow_back</i>\r\n    <div class=\"header-title-wrap\">\r\n      <div class=\"header-title\">{{headerData.title}}<span class=\"arr-info\" *ngIf=\"!headerData._id\">{{'( ' + headerData.arrLength + ' )'}}</span></div>\r\n      <span class=\"published\" *ngIf=\"!headerData.published && headerData._id\" >Unpublished</span>\r\n    </div>\r\n  </div>\r\n  <div class=\"header-main\"  *ngIf=\"!headerData._id\">\r\n    <div class=\"header-search\">\r\n      <input type=\"text\" placeholder=\"Search\" [(ngModel)]=\"headerData.searchName\">\r\n    </div>\r\n    <div class=\"header-sort\">\r\n      <span>Sorted by:</span>\r\n      <div class=\"sort-select\" (window:mouseup)=\"sortActive = false\">\r\n        <div class=\"sort-present\" [class.sort-active]=\"sortActive\" (click)=\"sortActive = !sortActive\">\r\n          <span>{{headerData.sortType}}</span>\r\n          <i class=\"material-icons\" >arrow_drop_down</i>\r\n        </div>\r\n        <div class=\"pop-up\" [hidden]=\"!sortActive\">\r\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'A-Z'; sortActive = false\">\r\n            <div class=\"pop-up-row-name\">\r\n              <span [class.sort-selected]=\"headerData.sortType === 'A-Z'\">A-Z</span>\r\n            </div>\r\n          </div>\r\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'Z-A'; sortActive = false\">\r\n            <div class=\"pop-up-row-name\">\r\n              <span [class.sort-selected]=\"headerData.sortType === 'Z-A'\">Z-A</span>\r\n            </div>\r\n          </div>\r\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'Newest to older'; sortActive = false\">\r\n            <div class=\"pop-up-row-name\">\r\n              <span [class.sort-selected]=\"headerData.sortType === 'Newest to older'\">Newest to older</span>\r\n            </div>\r\n          </div>\r\n          <div class=\"pop-up-item\" (click)=\"headerData.sortType = 'Older to newest'; sortActive = false\">\r\n            <div class=\"pop-up-row-name\">\r\n              <span [class.sort-selected]=\"headerData.sortType === 'Older to newest'\">Older to newest</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"header-main\"  *ngIf=\"headerData._id\">\r\n    <div class=\"header-main-mnu\">\r\n      <div class=\"mnu-item\" [routerLink]=\"['/project/' + headerData._id + '/basic']\" routerLinkActive=\"mnu-item-active\">Basic</div>\r\n      <div class=\"mnu-item\">Admins</div>\r\n      <div class=\"mnu-item\" [routerLink]=\"['/project/' + headerData._id + '/source']\" routerLinkActive=\"mnu-item-active\">Source</div>\r\n      <div class=\"mnu-item\">Preview</div>\r\n    </div>\r\n    <div class=\"publish-btn\" [class.publish-btn-active]=\"headerData.published\" [class.publish-btn-disable]=\"headerData.published\"><span>Publish</span></div>\r\n    <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"headerSettings\">\r\n      <i class=\"material-icons set-icon\" (click)=\"headerSettings = !headerSettings\" (window:mouseup)=\"headerSettings = false\">more_vert</i>\r\n      <div class=\"pop-up\" [hidden]=\"!headerSettings\">\r\n        <div class=\"pop-up-item\" [hidden]=\"!headerData.published\" (click)=\"deactivate(true)\">\r\n          <i class=\"material-icons\">visibility_off</i>\r\n          <div class=\"pop-up-row-name\">\r\n            <span>Deactivate</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"pop-up-item\" [hidden]=\"headerData.published\" (click)=\"deactivate(false)\">\r\n          <i class=\"material-icons\">visibility</i>\r\n          <div class=\"pop-up-row-name\">\r\n            <span>Activate</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"pop-up-item\" (click)=\"delete()\">\r\n          <i class=\"material-icons\">delete</i>\r\n          <div class=\"pop-up-row-name\">\r\n            <span>Delete</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ 775:
/***/ (function(module, exports) {

module.exports = "<app-header [class.openedMenu]=\"openMenu == 'in' \"></app-header>\r\n<app-aside [@slideInOut]=\"openMenu\" [(menu)]=\"openMenu\"></app-aside>\r\n\r\n<main class=\"main-content\" [class.openedMenu]=\"openMenu == 'in' \">\r\n    <router-outlet></router-outlet>\r\n</main>\r\n<div class=\"menu-btn\" [class.menu-btn-hide]=\"openMenu == 'in' \" (click)=\"openMenu='in'\">\r\n    <i class=\"material-icons\">menu</i>\r\n</div>\r\n\r\n"

/***/ }),

/***/ 776:
/***/ (function(module, exports) {

module.exports = "<!--<div class=\"edit-form \">-->\r\n    <!--<div class=\"col-lg-4 col-md-6\">-->\r\n        <!--&lt;!&ndash;<app-project-edit [title]=\"'Basic information'\" [project]=\"project\"></app-project-edit>&ndash;&gt;-->\r\n    <!--</div>-->\r\n    <!--<div class=\"col-lg-8 col-md-6\">-->\r\n        <!--<div class=\"edit-form\">-->\r\n            <!--<span class=\"tag-text\" style=\"padding-left: 20px;\">Live Preview:</span>-->\r\n            <!--<main>-->\r\n                <!--<div class=\"projects-wrap\">-->\r\n                    <!--<div class=\"projects-list  row\"  width=\"100%\" alwaysVisible=false distance=\"9px\" height=\"100%\"-->\r\n                         <!--size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>-->\r\n                        <!--&lt;!&ndash;<app-project-view [project]=\"project\" [noEdite]=\"true\" class=\"col-lg-7\"></app-project-view>&ndash;&gt;-->\r\n                    <!--</div>-->\r\n                <!--</div>-->\r\n            <!--</main>-->\r\n        <!--</div>-->\r\n    <!--</div>-->\r\n<!--</div>-->\r\n"

/***/ }),

/***/ 777:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 778:
/***/ (function(module, exports) {

module.exports = "TESTE"

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

module.exports = "<div class=\"block-bg\" (click)=\"cancel()\"></div>\r\n\r\n<div class=\"new-form\">\r\n    <span class=\"tag-text\">{{title}}</span>\r\n    <div class=\"main-info\">\r\n        <form class=\"item-form\">\r\n            <div class=\"input-wrap\">\r\n                <input type=\"text\" [class.input-fill]=\"project.title\" [class.input-error]=\"!resol.title\" placeholder=\"Projet Name\" [(ngModel)]=\"project.title\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.title = true\">\r\n                <label [class.full-op]=\"!resol.title\">This input requires a value!</label>\r\n            </div>\r\n            <div class=\"input-wrap\">\r\n                <input type=\"text\" [class.input-fill]=\"project.link\" [class.input-error]=\"!resol.link\"  placeholder=\"datasource URL\" [(ngModel)]=\"project.link\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.link = true\">\r\n                <label [class.full-op]=\"!resol.link\">This input requires a value!</label>\r\n            </div>\r\n        </form>\r\n        <div class=\"item-photo\">\r\n            <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + project.image + ')'}\">\r\n                <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\r\n                <i class=\"material-icons\" [hidden]=\"project.image != false\">crop_original</i>\r\n            </label>\r\n            <div class=\"photo-ctrl\" [hidden]=\"project.image == false\">\r\n                <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\r\n                <span (click)=\"removePhoto()\">Remove</span>\r\n            </div>\r\n            <div class=\"photo-ctrl\" [hidden]=\"project.image != false\">\r\n                <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\r\n            </div>\r\n            <span class=\"photo-info\">540*330 px</span>\r\n        </div>\r\n    </div>\r\n    <div class=\"new-btns\">\r\n        <span class=\"false-btn\" (click)=\"cancel()\">cancel</span>\r\n        <span class=\"true-btn\" (click)=\"accept()\">accept</span>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 780:
/***/ (function(module, exports) {

module.exports = "<main>\r\n    <div class=\"projects-wrap\">\r\n        <div class=\"projects-list  row\" slimScroll  width=\"100%\" alwaysVisible=false distance=\"9px\" height=\"100%\" size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>\r\n            <app-project-view class=\"project-wrap col-xs-12 col-sm-6 col-lg-4 col-exlg-3\" *ngFor=\"let project of User.projects | namefilter: header.searchName: header.sortType\" [project]=\"project\" ></app-project-view>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"add-btn\" (click)=\"createNewProject = true\" [hidden]=\"createNewProject\">\r\n        <i class=\"material-icons\">add</i>\r\n        <div class=\"span-hover\">\r\n            <span>Add a new project</span>\r\n        </div>\r\n    </div>\r\n</main>\r\n\r\n<app-new-project class=\"add-new\" [(openedState)]=\"createNewProject\" [title]=\"'Create a new project:'\" *ngIf=\"createNewProject\"></app-new-project>"

/***/ }),

/***/ 781:
/***/ (function(module, exports) {

module.exports = "<div class=\"project\">\r\n    <div class=\"project-content img-true\" [ngStyle]=\"{'background-image': 'url(' + project.image + ')'}\" [class.img-true]=\"project.image\">\r\n        <i class=\"material-icons no-img\" [hidden]=\"project.image\">crop_original</i>\r\n        <div class=\"project-ctrl-wrap\">\r\n            <span class=\"unpublished\" [hidden]=\"project.published\">Unpublished</span>\r\n            <div class=\"project-ctrl\">\r\n                <i class=\"material-icons\" [routerLink]=\"['/project', project._id]\"  routerLinkActive=\"active\">edit</i>\r\n                <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"openedPopUp\">\r\n                    <i class=\"material-icons\" (click)=\"openedPopUp = !openedPopUp\" (window:mouseup)=\"openedPopUp = false\">more_vert</i>\r\n                    <div class=\"pop-up\" [hidden]=\"!openedPopUp\">\r\n                        <div class=\"pop-up-item\" [hidden]=\"!project.active\" (click)=\"deactivateProject(project)\">\r\n                            <i class=\"material-icons\">visibility_off</i>\r\n                            <div class=\"pop-up-row-name\">\r\n                                <span>Deactivate</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"pop-up-item\" [hidden]=\"project.active\" (click)=\"deactivateProject(project)\">\r\n                            <i class=\"material-icons\">visibility</i>\r\n                            <div class=\"pop-up-row-name\">\r\n                                <span>Activate</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"pop-up-item\" (click)=\"deleteProject(project)\">\r\n                            <i class=\"material-icons\">delete</i>\r\n                            <div class=\"pop-up-row-name\">\r\n                                <span>Delete</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"project-info\">\r\n            <div class=\"project-title\">{{project.title}}</div>\r\n            <div class=\"project-created\">Created: {{project.created}}</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"project-bot\">\r\n        <span class=\"project-admin\">Admin:</span>\r\n        <div class=\"project-users\">\r\n            <div class=\"project-user\">\r\n                <div class=\"project-user-img\" [ngStyle]=\"{'background-image': 'url(asfd)'}\">\r\n                    <span>AF</span>\r\n                </div>\r\n                <span class=\"project-user-name\">Jennifer Carasdsdfd</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 782:
/***/ (function(module, exports) {

module.exports = "<div class=\"block-bg\" (click)=\"cancel()\"></div>\n\n<div class=\"new-form\">\n  <span class=\"tag-text\">Creating a new user:</span>\n  <div class=\"main-info\">\n    <div class=\"item-photo\">\n      <label class=\"photo\" [ngStyle]=\"{'background-image': 'url(' + tempNewUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempNewUser.avatar != false\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewUser.avatar == false\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n      <div class=\"photo-ctrl\" [hidden]=\"tempNewUser.avatar != false\">\n        <label>Upload image<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n      </div>\n      <span class=\"photo-info\">300*300 px</span>\n    </div>\n    <form class=\"item-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.input-error]=\"!resol.email || message.email\" placeholder=\"Email\" [(ngModel)]=\"tempNewUser.email\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.email = true; message.email = ''\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n        <label [class.full-op]=\"message.email\">{{message.email}}</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-error]=\"!resol.firstName\"  placeholder=\"First name\" [(ngModel)]=\"tempNewUser.firstName\" [ngModelOptions]=\"{standalone: true}\"  (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.input-error]=\"!resol.secondName\"  placeholder=\"Last name\" [(ngModel)]=\"tempNewUser.secondName\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-error]=\"!resol.password\" placeholder=\"Password\" [(ngModel)]=\"tempNewUser.password\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.password = true; message.password = ''\">\n        <label [class.full-op]=\"!resol.password\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"password\" [class.input-error]=\"!resol.passwordRepeat || message.password\" placeholder=\"Repeat password\" [(ngModel)]=\"tempNewUser.passwordRepeat\" [ngModelOptions]=\"{standalone: true}\" (focus)=\"resol.passwordRepeat = true; message.password = ''\">\n        <label [class.full-op]=\"!resol.passwordRepeat\">This input requires a value!</label>\n        <label [class.full-op]=\"message.password\">Password is incorrect</label>\n      </div>\n    </form>\n  </div>\n  <div class=\"user-status\">\n    <div class=\"user-status-item\" *ngIf=\"User.role == 'super'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'super'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'super'\" (click)=\"tempNewUser.role = 'super'; resol.role = true\">radio_button_unchecked</i>\n      <span>Superuser</span>\n    </div>\n    <div class=\"user-status-item\" *ngIf=\"User.role == 'super'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'admin'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'admin'\" (click)=\"tempNewUser.role = 'admin'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-admin</span>\n    </div>\n    <div class=\"user-status-item\" *ngIf=\"User.role !== 'user'\">\n      <i class=\"material-icons selected-status\" [hidden]=\"tempNewUser.role !== 'user'\">radio_button_checked</i>\n      <i class=\"material-icons\" [hidden]=\"tempNewUser.role === 'user'\" (click)=\"tempNewUser.role = 'user'; resol.role = true\">radio_button_unchecked</i>\n      <span>Client-user</span>\n    </div>\n    <label [class.err-status]=\"!resol.role\">Select user status</label>\n  </div>\n  <div class=\"new-btns\">\n    <span class=\"false-btn\" (click)=\"cancel()\">cancel</span>\n    <span class=\"true-btn\" (click)=\"accept()\">accept</span>\n  </div>\n</div>\n"

/***/ }),

/***/ 783:
/***/ (function(module, exports) {

module.exports = "<div class=\"user-card\">\n  <div class=\"user-card-head\">\n    <div>\n      <span class=\"user-card-hd-name\">{{tempUser.firstName}} {{tempUser.secondName}}</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'super'\">superuser</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'admin'\">client-admin</span>\n      <span class=\"user-card-hd-status\" *ngIf=\"tempUser.role == 'user'\">client-user</span>\n    </div>\n    <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"openMenu\" [hidden]=\"!canEdit\">\n      <i class=\"material-icons\" (click)=\"openMenu = !openMenu\" (window:mouseup)=\"openMenu = false\">more_vert</i>\n      <div class=\"pop-up\" [class.hidden]=\"!openMenu\">\n        <div class=\"pop-up-item\">\n          <i class=\"material-icons\">folder</i>\n          <div class=\"pop-up-row-name\">\n            <span>Projects</span>\n            <span class=\"pop-up-num\">2</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\">\n          <i class=\"material-icons\">people</i>\n          <div class=\"pop-up-row-name\">\n            <span>Users</span>\n            <span class=\"pop-up-num\">4</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = false\">visibility_off</i>\n          <div class=\"pop-up-row-name\">\n            <span>Deactivate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"tempUser.active || !canEdit\" (click)=\"deactivate()\">\n          <i class=\"material-icons\" (click)=\"tempUser.active = true\">visibility</i>\n          <div class=\"pop-up-row-name\">\n            <span>Activate</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!canEdit\">\n          <i class=\"material-icons\">lock</i>\n          <div class=\"pop-up-row-name\">\n            <span>Change password</span>\n          </div>\n        </div>\n        <div class=\"pop-up-item\" [hidden]=\"!canEdit\" (click)=\"delete()\">\n          <i class=\"material-icons\">delete</i>\n          <div class=\"pop-up-row-name\">\n            <span>Delete</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <span class=\"user-card-created-date\">Created: {{tempUser.created}}</span>\n  </div>\n  <div class=\"user-card-body\">\n    <div class=\"item-photo\">\n      <label class=\"photo\" [class.curs-dis]=\"!canEdit\" [ngStyle]=\"{'background-image': 'url(' + tempUser.avatar + ')'}\">\n        <input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\">\n        <i class=\"material-icons\" [hidden]=\"tempUser.avatar\">crop_original</i>\n      </label>\n      <div class=\"photo-ctrl\" [hidden]=\"!canEdit\">\n        <label>Upload<input type=\"file\" capture=\"camera\" accept=\"image/*\" (change)=\"loadPhoto($event)\"></label>\n        <span (click)=\"removePhoto()\">Remove</span>\n      </div>\n    </div>\n    <form class=\"item-form\">\n      <div class=\"input-wrap\">\n        <input type=\"email\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.email || message\" placeholder=\"Email\" [(ngModel)]=\"tempUser.email\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.email = true; message =''\">\n        <label [class.full-op]=\"!resol.email\">This input requires a value!</label>\n        <label [class.full-op]=\"message\">{{message}}</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.firstName\" placeholder=\"First name\" [(ngModel)]=\"tempUser.firstName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.firstName = true\">\n        <label [class.full-op]=\"!resol.firstName\">This input requires a value!</label>\n      </div>\n      <div class=\"input-wrap\">\n        <input type=\"text\" [class.no-changable]=\"!canEdit\" [class.input-error]=\"!resol.secondName\" placeholder=\"Last name\" [(ngModel)]=\"tempUser.secondName\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"!canEdit\" (focus)=\"resol.secondName = true\">\n        <label [class.full-op]=\"!resol.secondName\">This input requires a value!</label>\n      </div>\n    </form>\n  </div>\n</div>\n<div class=\"user-card-foot\" [hidden]=\"!canEdit\">\n  <span class=\"user-ft-l false-btn\" (click)=\"reset()\">Reset</span>\n  <span class=\"user-ft-r true-btn\" (click)=\"changeUser()\">save changes</span>\n</div>"

/***/ }),

/***/ 784:
/***/ (function(module, exports) {

module.exports = "<main class=\"row\">\r\n  <div class=\"user-list-wrap col-md-4\">\r\n\r\n    <div class=\"user-list\">\r\n      <div class=\"slimscroll-wrap\" slimScroll  width=\"100%\" alwaysVisible=false distance=\"0px\" height=\"100%\" size=\"2px\" color=\"#8b8d91\" opacity=1 railColor=\"#b2b3b7\" railOpacity=0>\r\n        <div class=\"user-list-item\" [class.deactive]=\"!user.active\" [class.selected-user]=\"selectedUser === user\" *ngFor=\"let user of User.users | namefilter: header.searchName: header.sortType\">\r\n          <div class=\"user-item-img-wrap\" [ngStyle]=\"{'background-image': 'url(' + user.avatar + ')'}\" (click)=\"selectUser(user, false)\">\r\n            <span *ngIf=\"!user.avatar\">{{userService.lettersNoImg(user)}}</span>\r\n          </div>\r\n          <div class=\"user-list-item-wrap\">\r\n            <div class=\"user-name-wrap\">\r\n              <div class=\"user-name pointer\" (click)=\"selectUser(user, false)\">\r\n                <span>{{user.firstName}} {{user.secondName}}</span>\r\n                <i class=\"material-icons\" [hidden]=\"user.active\">visibility_off</i>\r\n                <span class=\"new-title\" [hidden]=\"!user.newUser\">New</span>\r\n              </div>\r\n              <br>\r\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'super'\">Super user</span>\r\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'admin'\">Client-admin</span>\r\n              <span class=\"user-status pointer\" (click)=\"selectUser(user, false)\" *ngIf=\"user.role == 'user'\">Client-user</span>\r\n            </div>\r\n            <div class=\"user-ctrl\">\r\n              <i class=\"material-icons\" (click)=\"selectUser(user, true)\">edit</i>\r\n              <div class=\"pop-up-icon\" [class.pop-up-icon-active]=\"settingsUser === user\">\r\n                <i class=\"material-icons\" (click)=\"settingsUser = user\" (window:mouseup)=\"settingsUser = null\">more_vert</i>\r\n                <div class=\"pop-up\" [hidden]=\"settingsUser !== user\">\r\n                  <div class=\"pop-up-item\" [hidden]=\"!user.active\" (click)=\"deactivateUser(user)\">\r\n                    <i class=\"material-icons\">visibility_off</i>\r\n                    <div class=\"pop-up-row-name\">\r\n                      <span>Deactivate</span>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"pop-up-item\" [hidden]=\"user.active\" (click)=\"deactivateUser(user)\">\r\n                    <i class=\"material-icons\">visibility</i>\r\n                    <div class=\"pop-up-row-name\">\r\n                      <span>Activate</span>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"pop-up-item\" (click)=\"deleteUser(user)\">\r\n                    <i class=\"material-icons\">delete</i>\r\n                    <div class=\"pop-up-row-name\">\r\n                      <span>Delete</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"add-btn\" (click)=\"createNewUser = true\" [hidden]=\"createNewUser\">\r\n      <i class=\"material-icons\">add</i>\r\n      <div class=\"span-hover\">\r\n        <span>Add a new user</span>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"user-card-wrap col-md-8\">\r\n    <app-user-card [(user)]=\"selectedUser\" [canEdit]=\"canEdit\" [hidden]=\"!selectedUser\"></app-user-card>\r\n    <span class=\"no-user\" [hidden]=\"selectedUser\">No user selected</span>\r\n  </div>\r\n\r\n</main>\r\n\r\n<app-new-user class=\"add-new\" [message]=\"message\" *ngIf=\"createNewUser\" ></app-new-user>\r\n"

/***/ }),

/***/ 785:
/***/ (function(module, exports) {

module.exports = "<div class=\"login-logo\">\n  <img src=\"../../../assets/img/logo.png\" alt=\"\">\n</div>\n<div class=\"login-form\">\n  <label class=\"login-text\">Log in:</label>\n  <form class=\"item-form\" (keydown)=\"keyDown($event)\">\n    <div class=\"input-wrap\">\n      <input id=\"login-name\" [class.input-error]=\"!resol.email || message\" type=\"text\" [(ngModel)]=\"user.email\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Username / email\" (focus)=\"resol.email = true; message = ''\">\n      <label for=\"login-name\" [class.full-op]=\"!resol.email\">This input requires a value!</label>\n      <label for=\"login-name\" [class.full-op]=\"message\">{{message}}</label>\n    </div>\n    <div class=\"input-wrap\">\n      <input id=\"login-pass\" [class.input-error]=\"!resol.password || message\" type=\"password\" [(ngModel)]=\"user.password\" [ngModelOptions]=\"{standalone: true}\" maxlength=\"15\" placeholder=\"Password\" (focus)=\"resol.password = true; message = ''\">\n      <label for=\"login-pass\" [class.full-op]=\"!resol.password\">This input requires a value!</label>\n      <label for=\"login-pass\" [class.full-op]=\"message\">{{message}}</label>\n    </div>\n  </form>\n  <div class=\"log-in\">\n    <div class=\"chkbx-wrap\">\n      <div id=\"remember-int\" (click)=\"remember = !remember\">\n        <i class=\"material-icons\" [hidden]=\"!remember\">done</i>\n      </div>\n      <label for=\"remember-int\" (click)=\"remember = !remember\">Remember password</label>\n    </div>\n    <span class=\"true-btn\" (click)=\"logIn()\">ACCEPT</span>\n  </div>\n</div>"

/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(550);


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

},[822]);
//# sourceMappingURL=main.bundle.js.map