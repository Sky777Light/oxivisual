import {Input,ViewChild,Component,OnInit,OnChanges,EventEmitter,Injectable} from '@angular/core';
import * as ENTITY from '../../entities/entities';
import {AuthService} from '../../services/services';
import {Location} from '@angular/common';
import {Confirm,Prompt,Dialog} from '../dialogs/dialog';
import {WTooltip} from './tooltip/tooltip';
import {WControls} from './controls/controls';
import {Preloader} from './preloader/preloader';
import {SVGView} from './svg.draw/svg.draw';

declare var alertify:any;
declare var THREE:any;
declare var Pace:any;

@Injectable()
export class WebGLService {
    navchange:EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    emit(data) {
        this.navchange.emit(data);
    }

    subscribe(component, callback) {
        // set 'this' to component when callback is called
        return this.navchange.subscribe(data => {
            callback.call(component, data);
        });
    }
}

@Component({
    selector: 'app-project-webgl-view',
    templateUrl: './webgl.view.html',
    styleUrls: ['./webgl.view.sass']
})
export class WebglView implements OnInit,OnChanges {

    preview:string;
    _self:WebglView;
    @ViewChild("renderParent")
        renderParent:HTMLElement;
    @ViewChild("preloader")
        preloader:Preloader;
    @ViewChild("preToolTip")
        preToolTip:WTooltip;
    @ViewChild("preControls")
        preControls:WControls;
    @ViewChild("projCnt")
        projCnt:any;
    @ViewChild("svgEl")
        svgEl:SVGView;
    @Input() selected:any;

    app:OxiAPP;
    location:Location;
    authServ:AuthService;
    private _id:number = Date.now();
    private inited:boolean = false;

    constructor(location:Location, authServ:AuthService) {
        this.location = location;
        this.authServ = authServ;
        this._self = this;
    }

    ngOnChanges(changes) {
        if (changes.selected.currentValue.created != changes.selected.previousValue.created)this.initWebgl();
        if (this.selected)this.selected.glApp = this.app;

    }

    ngOnInit() {
        this.initWebgl();
        if (this.selected)this.selected.glApp = this.app;
    }

    initWebgl() {
        if (!this.inited) return this.inited = true;
        if (this.selected.images.length) {
            this.preview = ENTITY.Config.PROJ_LOC + this.selected.projFilesDirname + ENTITY.Config.FILE.DIR.DELIMETER + ENTITY.Config.FILE.DIR.PROJECT_PREVIEW + this.selected.images[this.selected.currentItem || 0];
        } else if (this.selected.preview) {
            this.preview = this.selected.preview;
        }

        this.app = new OxiAPP(this);
    }

    ngOnDestroy() {
        //console.log('webgl context ' + this._id + " was clear");
        this.app._animation.stop();
    }

}
class OxiAPP {
    isMobile:boolean = false;
    imgType:string = '';
    scene:any;
    model:any;
    camera:any;
    gl:any;
    screen:any = {};
    main:WebglView;
    loader:any;
    _projControls:OxiControls;
    _slider:OxiSlider;
    _events:OxiEvents;
    _animation:OxiAnimation;
    controls:any;
    _files:any = {};
    _fileReader:FileReader;
    _container:any;
    _preloaderStatus:any;
    allLoad:boolean = false;
    private curLoadedTemplates:number = 0;
    private templates:Array<any>;
    infoHTML:Array<OxiToolTip> = [];
    TEMPLATES:any = {
        TOOLTIP: 'app-project-webgl-tooltip',
        CONTROLS: 'app-project-webgl-controls',
        PRELOADER: 'app-project-preloader'
    };

    constructor(main:WebglView) {
        this.main = main;
        this.isMobile = this.deviceCheck();

        this.scene = new THREE.Scene();
        this.model = new THREE.Object3D();
        this.scene.add(this.model);
        let renderer = this.gl = new THREE.WebGLRenderer({
                antialias: true, alpha: true,
                clearAlpha: true,
                sortObjects: false
            }),
            SCREEN_WIDTH = this.screen.width = 720,
            SCREEN_HEIGHT = this.screen.height = 405,
            _self = this;
        renderer.domElement.className = 'gl-view';

        if (main.selected.canEdit)main.projCnt.nativeElement.style.height = main.projCnt.nativeElement.clientWidth * (SCREEN_HEIGHT / SCREEN_WIDTH) + 'px';
        this._preloaderStatus = document.querySelector('.preloader-data.preloader-status') || {style: {}};
        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.camera = new THREE.PerspectiveCamera(30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 200000);
        this.controls = main.selected.canEdit ? new THREE.OrbitControls(this.camera, renderer.domElement) : {
            update: ()=> {
            }, target: this.scene.position.clone()
        };
        this.controls.enabled = !!this.main.selected.canEdit;
        if (this.controls.enabled)this.controls.addEventListener('change', ()=> {
            main.selected.hasRecalcChanges = main.selected.hasChanges = true;
            if (main.selected.camera.frameState[main.selected.currentItem])main.selected.camera.frameState[main.selected.currentItem].hasChanges = true;
            this.camera.updateProjectionMatrix();
            this.dataSave();
            this._animation.play();
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

        let curDist = this.camera.positionDef.distanceTo(this.controls.target),
            curAngle = Math.acos((this.camera.positionDef.x - this.controls.target.x) / curDist);
        this.camera.updateView = (angle)=> {
            let _cm = main.selected.camera,
                _p = _cm.frameState[main.selected.currentItem];
            if (_p) {
                this.camera.position.set(_p.x, _p.y, _p.z);
                if (_p.target)this.controls.target.set(_p.target.x, _p.target.y, _p.target.z);
            } else {
                let quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (angle * 10) * Math.PI / 180);
                this.camera.position.copy(this.camera.positionDef.clone().applyQuaternion(quaternion));
                if (_cm.target)this.controls.target.set(_cm.target.x, _cm.target.y, _cm.target.z);
            }

            this.camera.lookAt(this.controls.target);
            this.camera.updateProjectionMatrix();
            this._animation.play();

        };
        if (this.main.selected.canEdit)this.scene.add(new THREE.AxisHelper(500));

        //let light = new THREE.DirectionalLight(0xffffff);
        //light.position.set(1, 1, 1);
        //this.scene.add(light);


        THREE.Mesh.prototype.getScreenPst = function () {
            let mesh:any = this,
                m = _self.gl.domElement,
                offset = _self._offset(),
                width = m.clientWidth, height = m.clientHeight,
                widthHalf = width / 2, heightHalf = height / 2,
                position:any = new THREE.Vector3();

            mesh.updateMatrixWorld();
            mesh.updateMatrix();
            mesh.geometry.computeBoundingBox();
            mesh.geometry.computeBoundingSphere();

            let boundingBox = mesh.geometry.boundingBox;
            position.subVectors(boundingBox.max, boundingBox.min);
            position.multiplyScalar(0.5);
            position.add(boundingBox.min);

            position.project(_self.camera);
            position.x = ( position.x * widthHalf ) + widthHalf + offset.left;
            position.y = -( position.y * heightHalf ) + heightHalf + offset.top;
            mesh.onscreenParams = position;
            mesh.onscreenOffset = offset;
        };
        this.templates = [main.preToolTip, main.preControls, main.preloader];
        this.templates.forEach((el)=> {
            el.callbacks.push(()=> {
                this.onFinishLoadTemplates()
            });
        });

    }

    private onFinishLoadTemplates() {
        let main = this.main;
        if (++this.curLoadedTemplates == this.templates.length) {
            setTimeout(()=> {
                this.loadModel(()=> {
                    this.checkLoadedImg(()=> {
                        let parentCanvas = this._container = main.projCnt['nativeElement'],

                            onFinish = ()=> {
                                let onEnd = ()=> {
                                    this._animation.play();
                                    this.allLoad = true;
                                    let _preloader = document.querySelector(this.TEMPLATES.PRELOADER);
                                    if (_preloader)_preloader.parentNode.removeChild(_preloader);
                                };
                                if (this._slider.isLoaded) {
                                    onEnd();
                                } else {
                                    this._slider.onFinish = ()=> {
                                        onEnd();
                                    }
                                }

                            };
                        if (main.preloader.prevImg) {
                            main.preloader.prevImg['nativeElement'].className += ' active';
                        } else {
                            main.preloader.preloader['nativeElement'].className += ' active';
                        }
                        parentCanvas.appendChild(this.gl.domElement);
                        this._projControls = new OxiControls(this);
                        this._slider = new OxiSlider(this);
                        this._events = new OxiEvents(this);
                        this._animation = new OxiAnimation(this);

                        let _inter = setTimeout(()=> {
                            Pace.stop();
                            onFinish();
                        }, 2000);
                        Pace.once('done', (e)=> {
                            clearTimeout(_inter);
                            onFinish();
                        });
                    });
                });
            }, 100);
        }
    }

    private loadTemplates() {

    }

    private checkLoadedImg(callback) {
        let _self = this,
            allows = ['1', '2'],
            checkLow = ()=> {
                if (this.isMobile) {
                    this.imgType = ENTITY.Config.FILE.DIR.PREVIEW.LOW;
                }
                callback()
            };

        if (this.main.selected.images.length) {
            let isAllowed:any = window.localStorage.getItem(ENTITY.Config.FILE.DIR.PREVIEW.WEBP);
            if (isAllowed) {
                if (isAllowed == allows[0]) {
                    _self.imgType = ENTITY.Config.FILE.DIR.PREVIEW.WEBP;
                    callback();
                } else {
                    checkLow();
                }
            } else {
                let img = new Image();
                img.onload = function () {
                    let isAllow = !!(img.height > 0 && img.width > 0);
                    window.localStorage.setItem(ENTITY.Config.FILE.DIR.PREVIEW.WEBP, isAllow ? allows[0] : allows[1]);
                    if (isAllow) {
                        _self.imgType = ENTITY.Config.FILE.DIR.PREVIEW.WEBP;
                        callback();
                    } else {
                        checkLow();
                    }

                };
                img.onerror = function () {
                    window.localStorage.setItem(ENTITY.Config.FILE.DIR.PREVIEW.WEBP, allows[1]);
                    checkLow();
                };
                img.src = './assets/img/img_large_0_4.webp';
            }
        } else {
            checkLow();
        }
    }

    private toggleSVG() {
        if (this.main.svgEl) {
            this.main.svgEl.fabricJS._objects.forEach((el:any)=> {
                if (el._dataSource) {
                    el._dataSource.active = false;
                }
            });
        } else {
            this.model.traverse((el:any)=> {
                if (el._dataSource) {
                    el._dataSource.active = false;
                }
            });
        }

    }

    updateData(data) {
        let _selected = this.main.selected,
            settings = _selected.camera;
        _selected.hasChanges = _selected.hasRecalcChanges = true;
        if (_selected.camera.frameState[_selected.currentItem])_selected.camera.frameState[_selected.currentItem].hasChanges = true;
        switch (data) {
            case'scale':
            {
                this.model.scale.z = this.model.scale.y = this.model.scale.x;
                break;
            }
            case'isSVG':
            {
                this.toggleSVG();
                break;
            }

            case'opacity':
            {
                if (this.model) {
                    this.model.traverse((child)=> {
                        if (child.type == 'Mesh') {
                            child.material.opacity = settings.opacity;
                        }
                    });
                }
                if (this.main.svgEl) {
                    this.main.svgEl.fabricJS._objects.forEach((el:any)=> {
                        el.opacity = settings.opacity;
                    });
                    this.main.svgEl.fabricJS.renderAll();

                }

                break;
            }
            case'update':
            {
                break;
            }
            case'kompass':
                this._projControls.kompas.onUpdate();
            {
                break;
            }
            case 'cameraPst':
            {
                break;
            }
            case'y':
            case'x':
            {
                let
                    val = settings.resolution[data],
                    prop = this._slider._W() / this._slider._H(),
                    isHeight = data == 'y',
                    _px = 'px',
                    elem:any = [this._slider.container.childNodes];
                if (!elem[0] || !elem[0].length) break;
                if (this._slider.alignImgContainer instanceof Node) {
                    let el = this._slider.alignImgContainer.childNodes;
                    if (el && el.length) elem.push(el);
                }
                elem.forEach(function (lstChilds) {
                    [].forEach.call(lstChilds, function (el) {
                        el.style.height = (isHeight ? val : val / prop) + _px;
                        el.style.width = (isHeight ? val * prop : val) + _px;
                    });
                });

                this._events.onWindowResize();
                break;
            }
            case'size':
            case'lens':
            {

                //settings.size =this._slider._W() * 1.1 > window.innerWidth ? (window.innerWidth / this._slider._W()) * 0.9 : 1;
                let
                    sizeX = this.gl.domElement.clientWidth,
                    sizeY = this.gl.domElement.clientHeight
                    ;
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
    }

    private  deviceCheck() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window['opera']);
        return check;
    }

    recalc() {
        let
            _selected = this.main.selected,
            _c = this.camera.position.clone(),
            _t = this.controls.target.clone();
        _selected.camera.frameState = [];
        _selected.camera.frameState[_selected.currentItem] = {
            x: _c.x,
            y: _c.y,
            z: _c.z,
            target: {x: _t.x, y: _t.y, z: _t.z}
        };

        for (let i = 0; i < _selected.images.length; i++) {
            if (_selected.currentItem == i)continue;

            let quaternion = new THREE.Quaternion(),
                _cmC = _c.clone();
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), ((i - _selected.currentItem) * 10) * Math.PI / 180);
            _cmC.applyQuaternion(quaternion);
            _selected.camera.frameState[i] = {
                x: _cmC.x,
                y: _cmC.y,
                z: _cmC.z,
                target: {x: _t.x, y: _t.y, z: _t.z}
            };
        }
        _selected.hasRecalcChanges = false;
    }

    dataSave() {
        let old = this.main.selected.camera;
        if (!(old instanceof ENTITY.OxiCamera)) {
            this.main.selected.camera = new ENTITY.OxiCamera({
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
        } else {
            old.position = this.camera.position.clone();
            old.rotation = this.camera.rotation.clone();
            old.target = this.controls.target.clone();
            old.fov = this.camera.fov;
            old.zoom = this.camera.zoom;
            old.scale = this.model.scale.x;
        }

    }

    loadModel(callback:Function = ()=> {
        console.log("load was finished succesed");
    }) {

        let _self = this;
        if (this.main.selected.cash.model) {
            this._onLoadModel(this.main.selected.cash.model);
            callback();
        } else if (this.main.selected.projFilesDirname && this.main.selected.destination && this.main.selected.destination.match('.obj')) {
            let loader = this.loader = this.loader || new THREE.OBJLoader();
            loader.load(ENTITY.Config.PROJ_LOC + this.main.selected.projFilesDirname + "/" + this.main.selected.destination, (object)=> {
                this._onLoadModel(object);
                callback();
            }, (e)=>this.onProgress(e), (e)=>this.onError(e));
        } else {
            callback();
        }
    }

    private onError(xhr) {
        alertify.error(xhr);
    }

    private onProgress(xhr) {
        if (xhr.lengthComputable) {
            this.main.preloader.onUpdatePreloaderStatus(xhr.loaded / xhr.total);
            //console.log((xhr.loaded / xhr.total).toFixed(2) + '% downloaded');
        }
    }

    _onLoadModel(object) {
        if (this.model.children)for (let i = 0; i < this.model.children.length; i++)this.model.remove(this.model.children[i]);
        if (this.main.selected.camera.isSVG) {

        } else {
            this.model.add(object);
            object.traverse((child)=> {
                if (child.type == 'Mesh') {
                    child.material = new THREE.MeshBasicMaterial({
                        transparent: true,
                        opacity: this.main.selected.camera.opacity
                    });
                    child.material.opacity0 = child.material.opacity;
                    child.material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
                    child.renderOrder = 0;
                    //child.name = child.name.toLowerCase();
                    if (child.name.match(ENTITY.Config.IGNORE)) {
                        child.material.color = new THREE.Color(0, 0, 0);
                    }

                    for (let i = 0, areas = this.main.selected.areas; areas && i < areas.length; i++) {
                        if (areas[i]._id.match(child.name)) {
                            child._data = areas[i];
                            break;
                        }
                    }
                    for (let i = 0, sources = this.main.preToolTip.dataElem; sources && i < sources.length; i++) {
                        if (sources[i]._id == child.name || (child._data && sources[i]._id == child._data.dataSourceId)) {
                            child._dataSource = sources[i];
                            break;
                        }
                    }
                }
            });
        }

        this.main.selected.cash.model = object;
    }

    updateInfoHTML() {
        for (let i = 0; i < this.infoHTML.length; i++) {
            this.infoHTML[i].update();
        }
    }

    //TODO
    _deleteArea(item) {

        delete item._data;
        for (let i = 0, areas = this.main.selected.areas; areas && i < areas.length; i++) {
            if (areas[i].created == item.created) {
                delete item._data;
                break;
            }
        }
    }

    _parent():HTMLElement {
        return this.main.renderParent['nativeElement'];
    }

    onFilesSelected(files) {
        let _self = this,
            filereader = this._fileReader = this._fileReader || new FileReader(),
            _flStrg,
            onFinish;

        if (!files || !files.length)return console.error("files had not been selected");

        switch (files[0].category) {
            case ENTITY.Config.FILE.TYPE.MODEL_OBJ:
            {
                _flStrg = ENTITY.Config.FILE.STORAGE.MODEL_OBJ;
                onFinish = ()=>_self._animation.play();
                break;
            }
            case ENTITY.Config.FILE.TYPE.PREVIEW_IMG:
            {
                _flStrg = ENTITY.Config.FILE.STORAGE.PREVIEW_IMG;
                this.main.selected.images = [];
                onFinish = ()=>_self._slider.addFrames();
                break;
            }
            case ENTITY.Config.FILE.TYPE.ALIGN_IMG:
            {
                _flStrg = ENTITY.Config.FILE.STORAGE.ALIGN_IMG;
                this.main.selected.alignImages = [];
                onFinish = ()=>_self._slider.addAlignImg();
                break;
            }
            case ENTITY.Config.FILE.TYPE.MODEL_SVG:
            {
                _flStrg = ENTITY.Config.FILE.STORAGE.SVG_FILE;
                onFinish = ()=> {
                };
                break;
            }
        }
        if (!_flStrg || !onFinish)return alertify.error("file category is not recognized");

        this._files[_flStrg] = files;
        let startFrom = 0;

        function parseFiles(cur) {
            if (!cur) return onFinish();

            switch (cur.category) {
                case ENTITY.Config.FILE.TYPE.MODEL_SVG:
                case ENTITY.Config.FILE.TYPE.MODEL_OBJ:
                {
                    filereader.readAsText(cur);
                    break;
                }
                case ENTITY.Config.FILE.TYPE.PREVIEW_IMG:
                case ENTITY.Config.FILE.TYPE.ALIGN_IMG:
                {
                    filereader.readAsDataURL(cur);
                    break;
                }
                default :
                {
                    parseFiles(files[startFrom++]);
                }
            }
            filereader.onloadend = (e:any)=> {

                switch (cur.category) {
                    case ENTITY.Config.FILE.TYPE.MODEL_OBJ:
                    {
                        let loader = _self.loader = _self.loader || new THREE.OBJLoader();
                        loader.parse(e.currentTarget.result, (m)=> {
                            _self.main.selected.destination = [new ENTITY.ProjFile({file: cur, name: cur.name})];
                            _self._onLoadModel(m);
                        });
                        break;
                    }
                    case ENTITY.Config.FILE.TYPE.MODEL_SVG:
                    {
                        _self.main.svgEl.reload(e.currentTarget.result);
                        break;
                    }
                    case ENTITY.Config.FILE.TYPE.PREVIEW_IMG:
                    {
                        _self.main.selected.images.push(new ENTITY.ProjFile({
                            file: cur,
                            name: cur.name,
                            data: e.currentTarget.result
                        }));
                        break;
                    }
                    case ENTITY.Config.FILE.TYPE.ALIGN_IMG:
                    {
                        _self.main.selected.alignImages.push(new ENTITY.ProjFile({
                            file: cur,
                            name: cur.name,
                            data: e.currentTarget.result
                        }));
                        break;
                    }
                }
                parseFiles(files[startFrom++]);
            };
        };
        parseFiles(files[startFrom++]);
    }

    _offset() {
        return this.gl.domElement.getBoundingClientRect()
    }

    onEventPrevent(event) {
        event.preventDefault();
        return false;
    }

    render() {
        if (Pace.running) return;
        this.updateInfoHTML();
        this.gl.render(this.scene, this.camera);
    }

}
class OxiEvents {
    private  EVENTS_NAME:any;
    private mouse:OxiMouse;
    private raycaster:any;
    private main:OxiAPP;
    private canEdit:boolean = false;
    private pathOnMove:number = 50;
    private lastEv:any;
    lastInter:any;


    constructor(app:OxiAPP) {

        let
            _self = this,
            elem = app.gl.domElement,
            handler = (elem.addEventListener || elem.attachEvent).bind(elem);
        this.canEdit = app.main.selected.canEdit;
        this.main = app;
        this.EVENTS_NAME = ENTITY.Config.EVENTS_NAME;
        this.mouse = new OxiMouse(app);
        this.raycaster = new THREE.Raycaster();

        handler(this.EVENTS_NAME.MOUSE_DOWN, (e)=>this.onMouseDown(e));
        handler(this.EVENTS_NAME.MOUSE_UP, (e)=>this.onMouseUp(e));
        handler(this.EVENTS_NAME.MOUSE_MOVE, (e)=>this.onMouseMove(e));
        handler(this.EVENTS_NAME.DB_CLICK, (e)=>this.onDbClick(e));
        handler(this.EVENTS_NAME.SELECT_START, app.onEventPrevent);

        if (!this.canEdit)handler(this.EVENTS_NAME.MOUSE_OUT, (e)=>this.onMouseOut(e));

        window.addEventListener('resize', ()=>this.onWindowResize());
        this.onWindowResize();
    }

    onWindowResize() {
        let app = this.main,
            _w = app._slider._W(),
            _nat = app._slider.currentFrame.naturalWidth / app._slider.currentFrame.naturalHeight,
            _h = _nat ? _w / _nat : app._slider._H(),
            _px = 'px',
            svgEl = this.main.main.svgEl
            ;

        app.camera.aspect = _w / _h;
        app.camera.updateProjectionMatrix();
        app.gl.setSize(_w, _h);
        app._container.style.height = _h + _px;
        //app.updateInfoHTML();
        if (svgEl)  svgEl.resize(_w, _h);
        if (app._animation)app._animation.play();
    }

    private onMouseUp(ev:any) {

        let _self = this,
            btn:number = ev.button;
        this.mouse.down = this.lastEv = false;
        this.main._projControls.show(ev, false);

        switch (btn) {
            case 0:
            case 1:
            {

                if (this.canEdit) {
                    if (this.lastInter)this.main._projControls.showAttachPopUp(this.lastInter.object);
                }
                if (this.lastInter && this.lastInter.object.click)this.lastInter.object.click();
                break;
            }
            case 2:
            {
                if (this.canEdit) {
                    this.onSelected(ev, (inter)=> {
                        this.main._projControls.show(ev);
                    });
                }
                break;
            }

        }
        ev.preventDefault();

    }

    private onMouseMove(ev:any) {

        if (this.lastInter) {
            this.main._projControls.show(ev, false);
            this.lastInter = null;
        }

        if (this.canEdit) {
            this.onSelected(ev, (inter)=> {
                this.main._projControls.show({x: -1500}, true, false);
            });
        } else {

            if (this.mouse.down) {
                if (!this.lastEv)return this.lastEv = ev;
                if (
                    Math.abs(ev.clientX - this.lastEv.clientX) > this.pathOnMove

                ) {
                    this.main._slider.move((ev.clientX > this.lastEv.clientX ? -1 : 1));
                    this.lastEv = ev;
                } else if (Math.abs(ev.clientY - this.lastEv.clientY) > this.pathOnMove) {
                    this.main._slider.move((ev.clientY > this.lastEv.clientY ? -1 : 1));
                    this.lastEv = ev;
                }
            } else {
                this.onSelected(ev, (inter)=> {
                    this.main._projControls.show(ev);
                });
            }
        }

    }

    private onSelected(ev, callback) {
        let intersectList = this.inter(ev);
        if (intersectList && intersectList[0]) {
            if (intersectList[0].object.name.match(ENTITY.Config.IGNORE))return;
            this.lastInter = intersectList[0];
            callback(intersectList[0]);
        }
    }

    private onMouseDown(ev:Event) {
        this.mouse.down = ev;
        this.lastEv = false;
    }

    private onMouseOut(ev:any) {
        if (this.mouse.down)this.onMouseUp(ev);
    }

    private onDbClick(e:any) {
        if (this.canEdit) {
            this.main.controls.target.copy(this.main.scene.position);
            this.main.controls.update();
        }
        this.main.onEventPrevent(e);
    }

    onCntxMenu(event) {
        event.preventDefault();
        return false;
    }

    inter(ev:any, arg:any = null) {
        var _self = this,
            elements = arg && arg.childs ? arg.childs : [_self.main.model];

        if (this.mouse.down || !elements)return false;
        if (arg && arg.position) {
            var direction = new THREE.Vector3().subVectors(arg.target, arg.position);
            _self.raycaster.set(arg.position, direction.clone().normalize());
        } else {
            let
                mouseVector = _self.mouse.interPoint(ev);
            _self.raycaster.setFromCamera(mouseVector, _self.main.camera);
        }

        return _self.raycaster.intersectObjects(elements, true);
    }
}
class OxiMouse {
    main:OxiAPP;
    isDown:boolean;
    down:any;


    constructor(main) {
        this.isDown = false;
        this.main = main;
    }

    interPoint(ev) {
        let _slider = this.main.gl.domElement,
            rect = _slider.getBoundingClientRect(),
            canvasW = _slider.clientWidth,
            canvasH = _slider.clientHeight,

            _x = (ev ? ev.clientX : canvasW / 2) - rect.left,
            _y = (ev ? ev.clientY : canvasH / 2) - rect.top
            ;

        if (ev && ev.touches) {
            let firstFing = ev.touches.length ? ev.touches[0] : ev.changedTouches[0];
            _x = firstFing.clientX;
            _y = firstFing.clientY;
        }
        return new THREE.Vector2(( (_x ) / canvasW) * 2 - 1, -( (_y ) / canvasH) * 2 + 1);
    }

    cumulativeOffset(element) {
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
    }
}
class OxiAnimation {
    private canAnimate:boolean = false;
    private isStop:boolean = false;
    private lastUpdate:number = Date.now();
    private maxTimeUpdate:number = 1500;
    private id:number = Date.now();
    private animations:Array<Function> = [];
    private lastIter:number = 0;
    private app:OxiAPP;

    constructor(main) {
        this.app = main;
        this.play();
        setTimeout(()=> {
            this.animate();
        }, 100);


    }

    add(callback:Function) {
        this.animations.push(callback);
    }

    animate() {
        if (!this.app.gl.domElement.width || this.isStop)return;
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i]();
        }

        if (this.canAnimate) {
            this.canAnimate = this.lastUpdate > Date.now();
            if (!this.canAnimate || this.lastIter > 2)this.lastIter = 0;
            this.app.render();
        }
        if (this.app._container.clientWidth != this.app._container.lastClientWidth) {
            this.app._container.lastClientWidth = this.app._container.clientWidth;
            this.app._events.onWindowResize();
            this.app._projControls.show({}, false);
        }
        requestAnimationFrame(() => {
            this.animate();
        });


    }

    play(flag:boolean = true) {
        this.lastUpdate = Date.now() + ( this.maxTimeUpdate);
        if (this.canAnimate) return;
        this.canAnimate = flag || !Pace.running;
        //this.animate();
    }

    stop() {
        this.isStop = true;
        this.canAnimate = false;
        this.lastIter = 0;
    }
}
class OxiSlider {
    currentFrame:any = {};
    currentAlignFrame:any = {};
    private currentPagination:any = {};
    container:HTMLElement;
    alignImgContainer:HTMLElement;
    imgPagination:HTMLElement;
    app:OxiAPP;
    private canEdit:boolean = false;
    isDebug:boolean = false;
    isLoaded:boolean = true;
    onFinish:any;

    constructor(app:OxiAPP) {

        this.canEdit = app.main.selected.canEdit;
        this.app = app;
        this.addFrames();
        if (this.canEdit)this.addAlignImg();

    }

    addFrames() {
        let _self = this,
            app:OxiAPP = this.app;

        [this.container, this.imgPagination].forEach((domEl)=> {
            this.removeNode(domEl);
        });


        let div = this.container = document.createElement('div'),
            imgPagination = this.imgPagination = document.createElement('ul'),
            _selected = app.main.selected,
            _resol = _selected.camera.resolution,
            _px = 'px',
            canEdit = this.canEdit;

        if (!app.main.selected.images || !app.main.selected.images.length) return;
        imgPagination.className = 'img-pagination';
        for (let i in app.main.selected.images) {
            let img = document.createElement('img'),
                curImg = app.main.selected.images[i];
            if (typeof curImg == 'string') {
                img.src = ENTITY.Config.PROJ_LOC + _selected.projFilesDirname + ENTITY.Config.FILE.DIR.DELIMETER + ENTITY.Config.FILE.DIR.PROJECT_PREVIEW + app.imgType;
                if (app.imgType == ENTITY.Config.FILE.DIR.PREVIEW.WEBP) {
                    let imgD = curImg.split(".");
                    imgD.pop();
                    img.src += imgD.join(".") + '.webp';
                } else {
                    img.src += curImg;
                }
            } else {
                img.src = curImg.data;
            }

            if (parseInt(i) == _selected.currentItem) {
                img.className = ENTITY.ProjClasses.ACTIVE;
                this.currentFrame = img;
                _self.isLoaded = false;
                img.onload = function () {

                    if (!_resol.x) {
                        _resol.x = _self._W();
                        _resol.y = _self._H();
                    }
                    _self.app._events.onWindowResize();
                    //_self.onResize();
                    _self.isLoaded = true;
                    if (_self.onFinish)_self.onFinish();
                }
            }
            //if (_resol && _resol.x) {
            //    img.style.width = _resol.x + _px;
            //    img.style.height = _resol.y + _px;
            //}
            div.appendChild(img);

            if (canEdit) {
                let item = document.createElement('li');
                item.innerHTML = (+i + 1) + '';
                if (+i == _selected.currentItem) {
                    item.className = ENTITY.ProjClasses.ACTIVE;
                    this.currentPagination = item;
                }
                item.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, ()=> {
                    let saveD = ()=> {
                            let _c = app.camera.position,
                                _t = app.controls.target;
                            _selected.camera.frameState[_selected.currentItem] = {
                                x: _c.x,
                                y: _c.y,
                                z: _c.z,
                                target: {x: _t.x, y: _t.y, z: _t.z}
                            };
                        },
                        anyway = ()=> {
                            this.updateView(i);
                            this.app.dataSave();
                        };

                    if (!_selected.camera.frameState[_selected.currentItem]) {
                        saveD();
                        anyway();
                    } else if (_selected.camera.frameState[_selected.currentItem].hasChanges) {
                        delete _selected.camera.frameState[_selected.currentItem].hasChanges;
                        new Confirm({
                            title: "The data view for current (" + (+_selected.currentItem + 1) + ") has been changed, accept to save, if cancel will lose",
                            onOk: ()=> {
                                saveD();
                            },
                            onCancel: ()=> {
                                delete _selected.camera.frameState[_selected.currentItem];
                            },
                            onAnyWay: ()=> {
                                anyway();
                            }
                        });
                    } else {
                        anyway();
                    }


                });
                imgPagination.appendChild(item);
            }
        }

        div.style.display = this.isDebug ? 'none' : '';
        div.className = [ENTITY.ProjClasses.CENTER_CONTAINER, ENTITY.ProjClasses.IMG_SLIDER].join(" ");
        app._container.appendChild(div);
        if (canEdit) {
            app._container.appendChild(imgPagination);
            imgPagination.style.bottom = -imgPagination.clientHeight + 'px';
        }
    }

    onResize() {
        let
            val = this.app.main.selected.camera.resolution,
            _px = 'px',
            elem:any = [this.container.childNodes];

        if (!elem[0] || !elem[0].length) return;
        if (this.alignImgContainer instanceof Node) {
            let el = this.alignImgContainer.childNodes;
            if (el && el.length) elem.push(el);
        }
        elem.forEach(function (lstChilds) {
            [].forEach.call(lstChilds, function (el) {
                el.style.height = val.y + _px;
                el.style.width = val.x + _px;
            });
        });
    }

    addAlignImg() {

        this.removeNode(this.alignImgContainer);
        if (!this.canEdit)return;

        let div = this.alignImgContainer = document.createElement('div'),
            _selected = this.app.main.selected,
            _resol = _selected.camera.resolution,
            _px = 'px';

        for (let i = 0, arr = _selected.alignImages, _length = arr.length; i < _length; i++) {
            let img = document.createElement('img'),
                curImg = arr[i];
            img.src = typeof curImg == 'string' ? ENTITY.Config.PROJ_LOC + _selected.projFilesDirname + ENTITY.Config.FILE.DIR.DELIMETER + ENTITY.Config.FILE.DIR.PROJECT_ALIGN_IMG + curImg : curImg.data;
            if (i == _selected.currentItem) {
                img.className = ENTITY.ProjClasses.ACTIVE;
                this.currentAlignFrame = img;
            }
            //if (_resol && _resol.x) {
            //    img.style.width = _resol.x + _px;
            //    img.style.height = _resol.y + _px;
            //}
            div.appendChild(img);
        }
        div.style.display = this.isDebug ? '' : 'none';
        div.className = [ENTITY.ProjClasses.CENTER_CONTAINER, ENTITY.ProjClasses.IMG_SLIDER].join(" ");
        this.app._container.appendChild(div);

    }

    toggleDebug() {
        this.isDebug = !this.isDebug;
        this.alignImgContainer.style.display = this.isDebug ? '' : 'none';
        this.container.style.display = !this.isDebug ? '' : 'none';
    }

    private removeNode(domEl:any) {
        if (!domEl) return;
        while (domEl.firstChild) domEl.removeChild(domEl.firstChild);
        if (domEl.parentNode)domEl.parentNode.removeChild(domEl);
    }

    updateView(selectedItem) {
        this.currentFrame['className'] = this.currentAlignFrame['className'] = this.currentPagination['className'] = '';
        this.app.main.selected.currentItem = selectedItem;
        this.app.camera.updateView(selectedItem - this.app.main.selected.currentItem0);

        this.currentFrame = this.container.childNodes[selectedItem];
        this.currentPagination = this.imgPagination && this.imgPagination.childNodes[selectedItem] ? this.imgPagination.childNodes[selectedItem] : {};
        this.currentAlignFrame = this.alignImgContainer && this.alignImgContainer.childNodes[selectedItem] ? this.alignImgContainer.childNodes[selectedItem] : {};
        this.currentFrame['className'] = this.currentAlignFrame['className'] = this.currentPagination['className'] = ENTITY.ProjClasses.ACTIVE;
        //this.app._events.onMouseOut({});
        this.app._projControls.show({}, false);
    }

    move(next:number) {
        if (next < 0) {
            if (this.app.main.selected.currentItem < 1) {
                return this.updateView(this.app.main.selected.images.length - 1);
            }
        } else {
            if (this.app.main.selected.currentItem >= this.app.main.selected.images.length - 1) {
                return this.updateView(0);
            }
        }
        this.updateView(this.app.main.selected.currentItem + next);
    }

    _W() {
        return this.currentFrame.clientWidth || this.currentFrame.width || this.container.clientWidth || this.app.main.selected.camera.resolution.x || this.app.screen.width;
    }

    _H() {
        return this.currentFrame.clientHeight || this.currentFrame.height || this.container.clientHeight || this.app.main.selected.camera.resolution.y || this.app.screen.height;
    }

    _offsetLeft() {
        return this.container.offsetLeft || this.app._container.offsetLeft;
    }

    _offsetTop() {
        return this.container.offsetTop || this.app._container.offsetTop;
    }
}
class OxiControls {
    private app:OxiAPP;
    private controls:HTMLElement;
    private _tooltips:HTMLElement;
    kompas:any;

    constructor(app:OxiAPP) {
        let
            _self = this,
            div:any = this.controls = document.createElement('div'),
            _div:any = document.querySelector(app.TEMPLATES.CONTROLS + ' .' + ENTITY.ProjClasses.PROJ_CONTROLS_MOVE),
            _backArea:any = document.querySelector(app.TEMPLATES.CONTROLS + ' .' + ENTITY.ProjClasses.PROJ_BACK_AREA),
            kompass:any = document.querySelector(app.TEMPLATES.CONTROLS + ' .' + ENTITY.ProjClasses.PROJ_COMPASS)
            ;
        this.app = app;
        if (_div)_div.style.display = 'none';
        if (_backArea)_backArea.style.display = 'none';

        if (app.main.selected.canEdit) {
            div.className = ENTITY.ProjClasses.PROJ_CONTROLS;

            app._parent().appendChild(div);
            let
                getSelected = ()=> {
                    return app.main.selected.camera.isSVG ? app.main.svgEl.lastSelectedShape : this.app._events.lastInter.object;
                }, childSelected = (child:any)=> {
                    let _elem = getSelected();
                    _elem._data = child;
                    child._id = _elem.name || _elem.id || "";
                    child.name = child._id.toUpperCase();
                    child._id += Date.now();

                    if (!this.app.main.selected.areas) {
                        this.app.main.selected.areas = [child];
                    } else {
                        this.app.main.selected.areas.push(child);
                    }
                },
                removeChild = ()=> {
                    let _elem = getSelected();
                    for (let i = 0, areas = app.main.selected.areas; i < areas.length; i++) {
                        if (areas[i]._id == _elem._data._id) {
                            areas.splice(i, 1);
                            break;
                        }
                    }
                    _elem._data = null;
                };
            [

                {
                    className: 'attach-new', click: (onFinish)=> {
                    let _elem = getSelected();
                    if (_elem._data) {
                        new Confirm({
                            title: "This area had already a structure (" + _elem._data.name + "), if ok will resave!!!",
                            onOk: ()=> {
                                removeChild();
                                childSelected(new ENTITY.ModelStructure());
                            },
                            onAnyWay: ()=> {
                                onFinish();
                            }
                        });
                    } else {
                        childSelected(new ENTITY.ModelStructure());
                        onFinish();
                    }

                }, icon: '../assets/img/ic_library_add_white_24px.svg'
                },
                {
                    className: 'attach-link', click: (onFinish)=> {
                    let onChange = ()=> {
                        let prompt = new Prompt({
                            title: "Input the link",
                            txt: 'https://google.com',
                            onOk: ()=> {
                                childSelected(new ENTITY.LinkGeneralStructure({
                                    destination: prompt.input.value || ''
                                }));
                                onFinish();
                            }
                        });
                    };
                    let _elem = getSelected();

                    if (_elem._data) {
                        new Confirm({
                            title: "This area had already a structure (" + _elem._data.name + "), if ok will resave!!!",
                            onOk: ()=> {
                                onChange();
                                removeChild();
                            },
                            onAnyWay: ()=> {
                                onFinish();
                            }
                        });
                    } else {
                        onChange();
                    }


                }, icon: '../assets/img/ic_link_white_24px.svg'
                },
                {
                    className: 'attach-js', click: (onFinish)=> {

                    let onChange = ()=> {
                        let prompt = new Prompt({
                            title: "Please input js code",
                            txt: 'alert("TEST")',
                            onOk: (input)=> {
                                childSelected(new ENTITY.GeneralStructure({
                                    destination: prompt.input.value || ''
                                }));
                                onFinish();
                            }
                        });
                    };
                    let _elem = getSelected();

                    if (_elem._data) {
                        new Confirm({
                            title: "This area had already a structure (" + _elem._data.name + "), if ok will resave!!!",
                            onOk: ()=> {
                                onChange();
                                removeChild();
                            },
                            onAnyWay: ()=> {
                                onFinish();
                            }
                        });
                    } else {
                        onChange();
                    }

                }, icon: '../assets/img/JS.svg'
                },
                {
                    className: 'cntrls-close', click: (onFinish)=> {
                    let _elem = getSelected();

                    if (_elem._data) {
                        new Confirm({
                            title: "This area has a structure (" + _elem._data.name + "), if ok will remove!!!",
                            onOk: ()=> {
                                removeChild();
                                if (app.main.selected.camera.isSVG)_elem.dropSelf();
                            },
                            onAnyWay: ()=> {
                                onFinish();
                            }
                        });
                    } else {
                        if (app.main.selected.camera.isSVG)_elem.dropSelf();
                        onFinish();
                    }
                }, icon: '../assets/img/ic_close_white_24px.svg'
                }
            ].forEach((el, item)=> {
                    let domEl = document.createElement('div');
                    domEl.className = el.className;
                    domEl.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=> {
                        el.click(()=>this.show(e, false));
                        app.main.selected.hasChanges = true;
                    });
                    div.appendChild(domEl);
                    let icon = document.createElement('img');
                    icon.src = el.icon;
                    icon.setAttribute('fillColor', '#ffffff');
                    icon.setAttribute('fill', '#ffffff');
                    icon.style.color = '#ffffff';
                    domEl.appendChild(icon);
                });

            app.model.traverse((child)=> {
                if (child.type == "Mesh" && child._dataSource) {
                    child._toolTip = new OxiToolTip(child, app);
                }
            });
        } else {
            if (this.app.main.selected.images.length > 1) {


                let arrows = [{_c: 'left', _i: -1}, {_c: 'right', _i: 1}];
                if (_div) {
                    div = _div;
                    _div.style.display = '';
                    for (let i = 0; i < _div.childNodes.length; i++) {
                        let childDiv = _div.childNodes[i];
                        for (let u = 0; u < arrows.length; u++) {
                            if (childDiv.localName == 'div') {
                                let dir = arrows.splice(u, 1)[0]._i;
                                childDiv.addEventListener((this.app.isMobile ? ENTITY.Config.EVENTS_NAME.TOUCH_END : ENTITY.Config.EVENTS_NAME.CLICK), (e:Event)=> {
                                    this.app._slider.move(dir);
                                });
                                childDiv.addEventListener(ENTITY.Config.EVENTS_NAME.SELECT_START, this.app.onEventPrevent);
                                break;
                            }
                        }

                    }
                } else {
                    div.className = ENTITY.ProjClasses.PROJ_CONTROLS_MOVE;
                    app._container.appendChild(div);
                    arrows.forEach((child)=> {
                        let childDiv = document.createElement('div');
                        childDiv.className = child._c;
                        childDiv.style.backgroundImage = 'url("assets/img/left_arrow.png")';
                        div.appendChild(childDiv);
                        childDiv.addEventListener((this.app.isMobile ? ENTITY.Config.EVENTS_NAME.TOUCH_END : ENTITY.Config.EVENTS_NAME.CLICK), (e:Event)=> {
                            this.app._slider.move(child._i);
                        });
                        childDiv.addEventListener(ENTITY.Config.EVENTS_NAME.SELECT_START, this.app.onEventPrevent);
                    });
                }
            }
            div.addEventListener(ENTITY.Config.EVENTS_NAME.SELECT_START, this.app.onEventPrevent);

            app.model.traverse((child)=> {
                if (child.type == "Mesh") {
                    //child.material.visible = false;
                    child.material.opacity = 0;
                    child._toolTip = new OxiToolTip(child, app);

                }
            });

            let path = this.app.main.location.path(),
                areas = path.split(ENTITY.Config.PROJ_DMNS[0]);
            if (areas.length > 1) {
                let back:any = _backArea;
                if (!back) {
                    back = document.createElement('div');
                    back.className = ENTITY.ProjClasses.PROJ_BACK_AREA;
                    back.style.backgroundImage = "url('assets/img/android-system-back.png')";
                    app._container.appendChild(back);
                } else {
                    back.style.display = '';
                }
                areas.pop();
                back.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=> {
                    e.preventDefault();
                    window.location.href = window.location.origin + (areas.length > 1 ? areas.join(ENTITY.Config.PROJ_DMNS[0]) : areas.join(''));
                });
                back.addEventListener(ENTITY.Config.EVENTS_NAME.CNTXMENU, (e)=>app._events.onCntxMenu(e), false);

            }
        }
        div.addEventListener(ENTITY.Config.EVENTS_NAME.CNTXMENU, (e)=>app._events.onCntxMenu(e), false);

        if (!kompass) {
            kompass = document.createElement('div');
            kompass.className = 'kompass';
            kompass.style.backgroundImage = 'url("assets/img/kompas.png")';
            app._container.appendChild(kompass);
        }
        this.kompas = kompass;
        kompass.onUpdate = ()=> {
            kompass.style.display = !_self.app.main.selected.camera.kompass.enabled ? 'none' : '';
            kompass.style.transform = 'rotate(' + (_self.app.main.selected.currentItem * ENTITY.Config.ANGLE_STEP + app.main.selected.camera.kompass.angle) + 'deg)';
        };
        kompass.onUpdate();


    }

    show(pos, flag:boolean = true, fl:boolean = true) {
        let canEdit = this.app.main.selected.canEdit;
        if (this.kompas)this.kompas.onUpdate();
        let _inter = this.app._events.lastInter;
        if (_inter) {
            _inter = _inter.object;
            if (_inter._toolTip)_inter._toolTip.show(flag);
            if (!_inter.material.defColor)_inter.material.defColor = _inter.material.color.clone();
            if (!_inter.material.onSelectColor)_inter.material.onSelectColor = new THREE.Color(61 / 250, 131 / 250, 203 / 250);
            _inter.material.color = flag ? _inter.material.onSelectColor : _inter.material.defColor;
            _inter.material.transparent = fl;
            _inter.renderOrder = flag ? 100 : 0;
            //if (this.app._events.lastInter.object._data && flag)return;
        }


        this.showControls(pos, flag);
        this.app._animation.play();
        //this.app.updateInfoHTML();
    }

    showControls(pos, flag:boolean = true) {
        let canEdit = this.app.main.selected.canEdit;

        if (flag) {
            if (this.controls.className.indexOf(ENTITY.ProjClasses.ACTIVE) < 0) {
                this.controls.className += " " + ENTITY.ProjClasses.ACTIVE;
            }
        } else {
            this.controls.className = this.controls.className.replace(" " + ENTITY.ProjClasses.ACTIVE, '');
        }

        if (canEdit) {
            let _d:any = document.querySelector('app-aside');
            if (_d) {
                _d = _d.getBoundingClientRect();
            }
            this.controls.style.left = ((   pos.clientX || pos.x) - 15 - (_d.right ? _d.right : 0) ) + 'px';
            this.controls.style.top = ((  pos.clientY || pos.y) - this.controls.clientHeight / 2 - 15) + 'px';

        } else {

        }

    }

    showAttachPopUp(elem) {
        if (!elem || !elem._data) {
            alertify.error('please create area for this element, on right click');
            return false;
        }
        let _mesh = elem,
            _dialog:any = new Dialog({title: 'Attach data source'});
        for (let i = 0, _a = this.app.main.preToolTip.dataElem; i < _a.length; i++) {
            if (_a[i].active)continue;
            let d = document.createElement('div'),
                spa = document.createElement('span'),
                btn = document.createElement('button');
            btn.addEventListener('click', ()=> {
                if (_mesh._dataSource) {
                    _mesh._dataSource.active = false;
                }
                _mesh._data.dataSourceId = _a[i]._id;
                _mesh._dataSource = _a[i];
                _mesh._tooltip = new OxiToolTip(_mesh, this.app);
                _dialog.anyWay();
                this.app._animation.play();
            });
            btn.innerText = 'Attach';
            spa.innerText = _a[i]._id;
            d.className = "my-dialog";
            d.appendChild(spa);
            d.appendChild(btn);

            _dialog.body.appendChild(d);

        }
        return true;
    }
}
export class OxiToolTip {
    tooltip:any;
    tooltipCnt:any;
    private mesh:any;
    private canEdit:boolean = false;
    private _id:number;


    constructor(mesh, main:OxiAPP) {
        let tooltip;
        let tooltipParent:any = main._preloaderStatus._tooltips;
        if (!tooltipParent) {
            tooltipParent = document.querySelector('.' + ENTITY.ProjClasses.PROJ_TOOLTIPS.CONTAINER);
            if (!tooltipParent) {
                tooltipParent = document.createElement('div');
                tooltipParent.className = ENTITY.ProjClasses.PROJ_TOOLTIPS.CONTAINER;
                main._parent().appendChild(tooltipParent);
            }
            main._preloaderStatus._tooltips = tooltipParent;
            tooltipParent.addEventListener(ENTITY.Config.EVENTS_NAME.CNTXMENU, (e)=>main._events.onCntxMenu(e), false);
        }


        this.canEdit = main.main.selected.canEdit;
        if (mesh._tooltip) {
            for (let i = 0; i < main.infoHTML.length; i++) {
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
        } else {

            tooltip = document.createElement('div');
            let
                tooltCnt:any = document.createElement('div'),
                head:any = document.createElement('div'),
                spanHead:any = document.createElement('span'),
                spanBody:any = document.createElement('div'),
                body:any = document.createElement('div');
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
            let sp, ps;
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

            [tooltip, tooltCnt, sp, ps].forEach((e)=> {
                if (e)e.addEventListener(ENTITY.Config.EVENTS_NAME.SELECT_START, main.onEventPrevent);
            });
        }
        this.mesh = mesh;
        if (!mesh.material)mesh.material = {};
        mesh.material.onSelectColor = new THREE.Color(1.0, 0.1, 0.1);
        if (!main.main.selected.canEdit) {
            if (mesh._data || mesh._dataSource) {
                if (mesh._data._category == ENTITY.Config.PROJ_DESTINATION.ModelStructure) {
                    mesh.material.onSelectColor = new THREE.Color(0.1, 1.0, 0.1);
                }
                mesh.click = ()=> {
                    switch (mesh._data._category) {
                        case ENTITY.Config.PROJ_DESTINATION.ModelStructure:
                        {
                            let _url = mesh._data.projFilesDirname.split("/");
                            window.location.href += "&area=" + _url[_url.length - 1];
                            break;
                        }
                        case ENTITY.Config.PROJ_DESTINATION.LinkGeneralStructure:
                        {
                            window.open(mesh._data.destination);
                            break;
                        }
                        case ENTITY.Config.PROJ_DESTINATION.GeneralStructure:
                        {
                            try {
                                main.main.authServ.safeJS(mesh._data.destination)();
                            } catch (e) {
                            }

                            break;
                        }
                    }
                };
                if (mesh._dataSource) {
                    mesh._dataSource.onclick = mesh.click;
                } else {
                    tooltip.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=>mesh.click());
                }
            } else if (mesh._dataSource) {

                if (mesh._dataSource.URL && mesh._dataSource.URL.match(ENTITY.Config.PATTERNS.URL)) {
                    mesh.click = ()=> {
                        window.open(mesh._dataSource.URL);
                    }
                    mesh._dataSource.onclick = mesh.click;
                    if (tooltip)tooltip.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=>mesh.click());
                    mesh.material.onSelectColor = new THREE.Color(0.1, 1.0, 0.1);
                }
            }
        }

        if (!mesh._dataSource)tooltipParent.appendChild(tooltip);
        this.update();

    }

    show(show:boolean = true) {
        //this.mesh.material.visible = show || this.canEdit;
        this.mesh.material.opacity = (show || this.canEdit) ? this.mesh.material.opacity0 : 0;

        if (this.tooltip) {

            this.tooltip.className = show ? 'cos-info active act' : 'cos-info active';
            this.tooltipCnt.className = show ? 'cos-tooltip active' : 'cos-tooltip';
        } else {
            this.mesh._dataSource.tooltip.active = !!show;
        }
        this.update();
    }

    update() {
        this.mesh.getScreenPst();
        if (this.tooltip) {
            this.tooltip.style.left = this.mesh.onscreenParams.x + 'px';
            this.tooltip.style.top = this.mesh.onscreenParams.y + 'px';
        } else {
            this.mesh._dataSource._left = (this.mesh.onscreenParams.x - this.mesh.onscreenOffset.left) + 'px';
            this.mesh._dataSource._top = (this.mesh.onscreenParams.y - this.mesh.onscreenOffset.top) + 'px';
        }
    }

    private   htmlToElement(html) {
        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    }

}