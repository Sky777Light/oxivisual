import {Input,ViewChild,Component,OnInit,OnChanges,EventEmitter,Injectable} from '@angular/core';
import * as ENTITY from '../../entities/entities';
import {Location} from '@angular/common';
import {Confirm} from '../dialogs/dialog';

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
            console.log(data);
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

    @ViewChild("renderParent")
        renderParent:HTMLElement;
    @Input() selected:any;

    app:OxiAPP;
    location:Location;
    private _id:number = Date.now();

    constructor(location:Location) {

        this.location = location;
    }

    ngOnChanges(changes) {
        if (changes.selected.currentValue.created != changes.selected.previousValue.created)this.initWebgl();
        if (this.selected)this.selected.app = this.app;

    }

    ngOnInit() {
        this.initWebgl();
        if (this.selected)this.selected.app = this.app;
    }

    initWebgl() {
        this.app = new OxiAPP(this);
    }

    ngOnDestroy() {
        console.log('webgl context ' + this._id + " was clear");
        this.app._animation.stop();
    }

}

class OxiAPP {
    isMobile:boolean = false;
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

    constructor(main:WebglView) {
        this.main = main;
        this.scene = new THREE.Scene();
        this.model = new THREE.Object3D();
        this.scene.add(this.model);
        let renderer = this.gl = new THREE.WebGLRenderer({antialias: true, alpha: true}),
            SCREEN_WIDTH = this.screen.width = 720,
            SCREEN_HEIGHT = this.screen.height = 405,
            _self = this;

        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        this.camera = new THREE.PerspectiveCamera(30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 200000);
        this.controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        this.controls.enabled = !!this.main.selected.canEdit;
        if (this.controls.enabled)this.controls.addEventListener('change', ()=> {
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
            if( _p){
                this.camera.position.set(_p.x,_p.y,_p.z);
                if(_p.target)this.controls.target.set(_p.target.x,_p.target.y,_p.target.z);
            }else{
                let quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (angle * 10) * Math.PI / 180);
                this.camera.position.copy(this.camera.positionDef.clone().applyQuaternion(quaternion));
                if(_cm.target)this.controls.target.set(_cm.target.x,_cm.target.y,_cm.target.z);
            }
            this._animation.play();

        };
        this.scene.add(new THREE.AxisHelper(500));

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
        }
        this.loadModel(()=> {

            let foo = this._parent();
            while (foo.firstChild) foo.removeChild(foo.firstChild);


            let parentCanvas = this._container = document.createElement('div');
            parentCanvas.className = [ENTITY.ProjClasses.CENTER_CONTAINER, 'THREEJS'].join(" ");
            this._parent().appendChild(parentCanvas);
            parentCanvas.appendChild(renderer.domElement);


            this._projControls = new OxiControls(this);
            this._slider = new OxiSlider(this);
            this._events = new OxiEvents(this);
            this._animation = new OxiAnimation(this);
        });
    }

    updateData(data) {
        let settings = this.main.selected.camera;
        switch (data) {
            case'scale':
            {
                this.model.scale.z = this.model.scale.y = this.model.scale.x;
                break;
            }

            case'y':
            case'x':
            {
                let
                    val = this.main.selected.camera.resolution[data],
                    prop = this._slider._W() / this._slider._H(),
                    isHeight = data == 'y',
                    _px = 'px',
                    elem:any = [this._slider.container.childNodes];
                if(!elem[0] || !elem[0].length) break;
                if(this._slider.alignImgContainer instanceof Node){
                    let el = this._slider.alignImgContainer.childNodes;
                    if(el && el.length) elem.push(el);
                }
                elem.forEach(function(lstChilds){
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
                settings.aspect = settings.resolution.x / settings.resolution.y;
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

    dataSave() {
        let old = this.main.selected.camera;
        this.main.selected.camera = new ENTITY.OxiCamera({
            position: this.camera.position,
            rotation: this.camera.rotation,
            target: this.controls.target,
            frameState: old.frameState,
            resolution: new ENTITY.Vector3({x: this._slider._W(), y: this._slider._H()}),
            fov: this.camera.fov,
            zoom: this.camera.zoom,
            scale: this.model.scale.x,
            lens: old.lens,
            size: old.size,
        });
    }

    loadModel(callback:Function = ()=> {
        console.log("load was finished succesed");
    }) {

        if (this.main.selected.cash.model) {
            this._onLoadModel(this.main.selected.cash.model);
            callback();
        } else if (this.main.selected.projFilesDirname && this.main.selected.destination) {
            let manager = new THREE.LoadingManager();
            manager.onProgress = function (item, loaded, total) {
                //console.log(item, loaded, total);
            };


            let onProgress = function (xhr) {
                if (xhr.lengthComputable) {
                    //let percentComplete = xhr.loaded / xhr.total * 100;
                    //console.log((percentComplete).toFixed(2) + '% downloaded');
                }
            };

            let onError = function (xhr) {
                alertify.error(xhr)
            };


            let loader = this.loader = this.loader || new THREE.OBJLoader(manager);
            loader.load(ENTITY.Config.PROJ_LOC + this.main.selected.projFilesDirname + "/" + this.main.selected.destination, (object)=> {
                this._onLoadModel(object);
                callback();
            }, onProgress, onError);
        } else {
            callback();
        }
    }

    _onLoadModel(object) {
        if (this.model.children)for (let i = 0; i < this.model.children.length; i++)this.model.remove(this.model.children[i]);
        this.model.add(object);
        object.traverse((child)=> {
            if (child.type == 'Mesh') {
                child.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.7});
                child.material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
                for (let i = 0, areas = this.main.selected.areas; areas && i < areas.length; i++) {
                    if (areas[i]._id.match(child.name)) {
                        child._data = areas[i];
                        break;
                    }
                }
            }
        });
        this.main.selected.cash.model = object;
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
        }
        if (!_flStrg || !onFinish)return console.error("file category is not recognized");

        this._files[_flStrg] = files;
        let startFrom = 0;

        function parseFiles(cur) {
            if (!cur) return onFinish();

            switch (cur.category) {
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

    render() {
        if (Pace.running) return;
        this.gl.render(this.scene, this.camera);
        this.camera.lookAt(this.controls.target);
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

        window.addEventListener('resize', ()=>this.onWindowResize());
        this.onWindowResize();
    }

    onWindowResize() {
        let app = this.main,
            _w = app._slider._W(),
            _h = app._slider._H();

        app.camera.aspect = _w / _h;
        app.camera.updateProjectionMatrix();
        app.gl.setSize(_w, _h);
        app._container.style.height = _h+'px';

        if (app._animation)app._animation.play();
    }

    private onMouseUp(ev:any) {

        let _self = this,
            btn:number = ev.button;
        this.mouse.down = this.lastEv = null;
        this.main._projControls.show(ev, false);

        switch (btn) {
            case 0:
            case 1:
            {

                if (this.lastInter && this.lastInter.object.click)this.lastInter.object.click();
                break;
            }
            case 2:
            {
                if (this.canEdit) {
                    let intersectList = _self.inter(ev);
                    if (intersectList && intersectList[0]) {
                        _self.lastInter = intersectList[0];
                        this.main._projControls.show(ev);
                    }
                }
                break;
            }

        }
        ev.preventDefault();
    }

    onMouseOut(ev:any) {
        this.main._projControls.show(ev, false);
    }

    private onMouseMove(ev:any) {
        let _self = this;

        if (this.canEdit) {

        } else {
            if (this.lastInter) {
                this.main._projControls.show(ev, false);
                this.lastInter = null;
            }

            if (this.mouse.down) {
                if (!this.lastEv)return this.lastEv = ev;
                if (
                    Math.abs(ev.clientX - this.lastEv.clientX) > this.pathOnMove ||
                    Math.abs(ev.clientY - this.lastEv.clientY) > this.pathOnMove
                ) {
                    this.main._slider.move((ev.clientX > this.lastEv.clientX || ev.clientY > this.lastEv.clientY ? -1 : 1));
                    this.lastEv = ev;
                }


            } else {
                let intersectList = _self.inter(ev);
                if (intersectList && intersectList[0]) {
                    _self.lastInter = intersectList[0];
                    this.main._projControls.show(ev);
                }
            }

        }
    }

    private onMouseDown(ev:Event) {
        this.mouse.down = ev;
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
    private currentFrame:any = {};
    private currentAlignFrame:any = {};
    private currentPagination:any = {};
    container:HTMLElement;
    alignImgContainer:HTMLElement;
    imgPagination:HTMLElement;
    app:OxiAPP;
    private canEdit:boolean = false;
    isDebug:boolean = false;

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
            _resol = this.app.main.selected.camera.resolution,
            _px = 'px',
            canEdit = this.canEdit;

        if (!app.main.selected.images || !app.main.selected.images.length) return;

        for (let i in app.main.selected.images) {
            let img = document.createElement('img'),
                curImg = app.main.selected.images[i];
            img.src = typeof curImg == 'string' ? ENTITY.Config.PROJ_LOC + app.main.selected.projFilesDirname + ENTITY.Config.FILE.DIR.DELIMETER + ENTITY.Config.FILE.DIR.PROJECT_PREVIEW + curImg : curImg.data;
            if (parseInt(i) == this.app.main.selected.currentItem) {
                img.className = ENTITY.ProjClasses.ACTIVE;
                this.currentFrame = img;
                img.onload = function () {
                    _self.app._events.onWindowResize();
                    if (!_resol.x) {
                        _resol.x = _self._W();
                        _resol.y = _self._H();
                    }
                }
            }
            if (_resol) {
                img.style.width = _resol.x + _px;
                img.style.height = _resol.y + _px;
            }
            div.appendChild(img);

            if (canEdit) {
                let item = document.createElement('li');
                item.innerHTML = (+i + 1) + '';
                if(+i == this.app.main.selected.currentItem){
                    item.className = ENTITY.ProjClasses.ACTIVE;
                    this.currentPagination = item;
                }
                item.addEventListener('click', ()=> {
                    new Confirm({
                        title:"The camera for current ("+(+app.main.selected.currentItem+1)+") frame will be saved, if cancel will lose",
                        onOk:()=>{
                            let _c = app.camera.position,
                                _t = app.controls.target;
                            app.main.selected.camera.frameState[app.main.selected.currentItem] = {x:_c.x,y:_c.y,z:_c.z,target:{x:_t.x,y:_t.y,z:_t.z}};
                        },
                        onCancel:()=>{
                            delete app.main.selected.camera.frameState[app.main.selected.currentItem];
                        },
                        onAnyWay:()=>{
                            this.updateView(i);
                            this.app.dataSave();
                        }
                    });

                });
                imgPagination.appendChild(item);
            }
        }

        div.style.display = this.isDebug ? 'none' : '';
        div.className = [ENTITY.ProjClasses.CENTER_CONTAINER, ENTITY.ProjClasses.IMG_SLIDER].join(" ");
        app._container.appendChild(div);
        if (canEdit){
            app._container.appendChild(imgPagination);
            imgPagination.style.bottom = -imgPagination.clientHeight+'px';
        }
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
            if (_resol) {
                img.style.width = _resol.x + _px;
                img.style.height = _resol.y + _px;
            }
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
        this.currentFrame['className'] = this.currentAlignFrame['className'] = this.currentPagination['className']='';
        this.app.main.selected.currentItem = selectedItem;
        this.app.camera.updateView(selectedItem - this.app.main.selected.currentItem0);

        this.currentFrame = this.container.childNodes[selectedItem];
        this.currentPagination = this.imgPagination && this.imgPagination.childNodes[selectedItem]?this.imgPagination.childNodes[selectedItem]:{};
        this.currentAlignFrame = this.alignImgContainer && this.alignImgContainer.childNodes[selectedItem] ? this.alignImgContainer.childNodes[selectedItem] : {};
        this.currentFrame['className'] = this.currentAlignFrame['className'] = this.currentPagination['className']=ENTITY.ProjClasses.ACTIVE;
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
        return this.currentFrame.clientWidth || this.container.clientWidth || this.app.main.selected.camera.resolution.x ||this.app.screen.width;
    }

    _H() {
        return this.currentFrame.clientHeight || this.container.clientHeight || this.app.main.selected.camera.resolution.y ||this.app.screen.height;
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

    constructor(app:OxiAPP) {
        let div = this.controls = document.createElement('div');
        this.app = app;

        div.addEventListener(ENTITY.Config.EVENTS_NAME.CNTXMENU, (e)=>app._events.onCntxMenu(e), false);
        if (app.main.selected.canEdit) {
            div.className = ENTITY.ProjClasses.PROJ_CONTROLS;
            app._parent().appendChild(div);
            let childSelected = (child:any)=> {
                this.app._events.lastInter.object._data = child;
                child._id = this.app._events.lastInter.object.name;
                child.name = child._id.toUpperCase();

                child._id += Date.now();

                if (!this.app.main.selected.areas) {
                    this.app.main.selected.areas = [child];
                } else {
                    this.app.main.selected.areas.push(child);
                }
            };
            [

                {
                    className: 'attach-new', click: ()=> {
                    childSelected(new ENTITY.ModelStructure());

                }, icon: '../assets/img/ic_library_add_white_24px.svg'
                },
                {
                    className: 'attach-link', click: ()=> {
                    let input = prompt("Input the link", 'https://google.com');
                    if (input)childSelected(new ENTITY.LinkGeneralStructure({
                        destination: input
                    }));

                }, icon: '../assets/img/ic_link_white_24px.svg'
                },
                {
                    className: 'attach-js', click: ()=> {
                    let input = prompt("Input the JS code", "myfujnction('param1','param2','param3');");
                    if (input)childSelected(new ENTITY.GeneralStructure({
                        destination: input
                    }));
                }, icon: '../assets/img/JS.svg'
                }, {
                className: 'cntrls-close', click: ()=> {
                }, icon: '../assets/img/ic_close_white_24px.svg'
            }
            ].forEach((el, item)=> {
                    let domEl = document.createElement('div');
                    domEl.className = el.className;
                    domEl.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=> {
                        this.show(e, false);
                        el.click();
                    });
                    div.appendChild(domEl);
                    let icon = document.createElement('img');
                    icon.src = el.icon;
                    icon.setAttribute('fillColor', '#ffffff');
                    icon.setAttribute('fill', '#ffffff');
                    icon.style.color = '#ffffff';
                    domEl.appendChild(icon);
                });
        } else {
            div.className = ENTITY.ProjClasses.PROJ_CONTROLS_MOVE;
            app._container.appendChild(div);
            [{_c: 'left', _i: -1}, {_c: 'right', _i: 1}].forEach((child)=> {
                let childDiv = document.createElement('div');
                childDiv.className = child._c;
                childDiv.innerHTML = child._c.toUpperCase();
                div.appendChild(childDiv);
                childDiv.addEventListener((this.app.isMobile ? ENTITY.Config.EVENTS_NAME.TOUCH_END : ENTITY.Config.EVENTS_NAME.CLICK), (e:Event)=> {
                    this.app._slider.move(child._i);
                });
            });
            let tooltipParent = this._tooltips = document.createElement('div');
            tooltipParent.className = ENTITY.ProjClasses.PROJ_TOOLTIPS.CONTAINER;
            app._parent().appendChild(tooltipParent);
            app.model.traverse((child)=> {
                if (child.type == "Mesh") {
                    child.material.visible = false;
                    child._toolTip = new OxiToolTip(child, app.main.location);
                    tooltipParent.appendChild(child._toolTip.tooltip);
                    tooltipParent.addEventListener(ENTITY.Config.EVENTS_NAME.CNTXMENU, (e)=>app._events.onCntxMenu(e), false);
                }
            });
            let path = this.app.main.location.path(),
                areas = path.split(ENTITY.Config.PROJ_DMNS[0]);
            if (areas.length > 1) {
                let back:any = document.createElement('div');
                back.className = 'back-area';
                back.style.backgroundImage = "url('assets/img/android-system-back.png')";
                app._container.appendChild(back);
                areas.pop();
                back.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=> {
                    e.preventDefault();
                    this.app.main.location.go(areas.length > 1 ? areas.join(ENTITY.Config.PROJ_DMNS[0] + "area=") : areas.join(''));
                    window.location.reload();
                });
                back.addEventListener(ENTITY.Config.EVENTS_NAME.CNTXMENU, (e)=>app._events.onCntxMenu(e), false);

            }
        }

    }

    show(pos, flag:boolean = true) {

        let canEdit = this.app.main.selected.canEdit;
        if (this.app._events.lastInter) {
            if (this.app._events.lastInter.object._toolTip)this.app._events.lastInter.object._toolTip.show(flag);
            if (!this.app._events.lastInter.object.material.defColor)this.app._events.lastInter.object.material.defColor = this.app._events.lastInter.object.material.color.clone();
            if (!this.app._events.lastInter.object.material.onSelectColor)this.app._events.lastInter.object.material.onSelectColor = new THREE.Color(61 / 250, 131 / 250, 203 / 250);
            this.app._events.lastInter.object.material.color = flag ? this.app._events.lastInter.object.material.onSelectColor : this.app._events.lastInter.object.material.defColor;
            if (this.app._events.lastInter.object._data && flag)return;
        }

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
        this.app._animation.play();
    }
}
class OxiToolTip {
    tooltip:any;
    private mesh:any;

    constructor(mesh, location) {
        let tooltip = this.tooltip = document.createElement('div'),
            head:any = document.createElement('div'),
            body:any = document.createElement('div')
            ;
        this.mesh = mesh;
        tooltip.appendChild(head);
        tooltip.appendChild(body);
        body.className = ENTITY.ProjClasses.PROJ_TOOLTIPS.BODY;
        head.className = ENTITY.ProjClasses.PROJ_TOOLTIPS.HEADER;
        tooltip.className = ENTITY.ProjClasses.PROJ_TOOLTIPS.TOOLTIP;
        head.innerHTML = mesh.name;
        body.innerHTML = mesh.name;
        mesh.material.onSelectColor = new THREE.Color(1.0, 0.1, 0.1);
        if (mesh._data) {
            if (mesh._data._category == ENTITY.Config.PROJ_DESTINATION.ModelStructure) {
                mesh.material.onSelectColor = new THREE.Color(0.1, 1.0, 0.1);
            }
            mesh.click = ()=> {
                switch (mesh._data._category) {
                    case ENTITY.Config.PROJ_DESTINATION.ModelStructure:
                    {
                        let _url = mesh._data.projFilesDirname.split("/");
                        location.go(location.path() + "&area=" + _url[_url.length - 1]);
                        window.location.reload();
                        break;
                    }
                    case ENTITY.Config.PROJ_DESTINATION.LinkGeneralStructure:
                    {
                        window.open(mesh._data.destination);
                        break;
                    }
                    case ENTITY.Config.PROJ_DESTINATION.GeneralStructure:
                    {
                        window['eval'](mesh._data.destination);
                        break;
                    }
                }
            };

            tooltip.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=>mesh.click());
        }

    }

    show(show:boolean = true) {
        this.tooltip.className = show ? [ENTITY.ProjClasses.PROJ_TOOLTIPS.TOOLTIP, ENTITY.ProjClasses.ACTIVE].join(" ") : ENTITY.ProjClasses.PROJ_TOOLTIPS.TOOLTIP;
        this.mesh.material.visible = show;
        if (show) {
            this.mesh.getScreenPst();
            this.tooltip.style.left = this.mesh.onscreenParams.x + 'px';
            this.tooltip.style.top = this.mesh.onscreenParams.y + 'px';
        }
    }


}