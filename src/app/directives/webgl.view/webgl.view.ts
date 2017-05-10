import {Input,ViewChild,Component,OnInit,OnChanges,EventEmitter,Injectable} from '@angular/core';
import * as ENTITY from '../../entities/entities';

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
    private _id:number = Date.now();

    constructor(private navService:WebGLService) {

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
        console.log('webgl context '+this._id+" was clear");
        this.app._animation.stop();
    }

}

class OxiAPP {
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
        this.scene.add( this.model);
        let renderer = this.gl = new THREE.WebGLRenderer({antialias: true, alpha: true}),
            SCREEN_WIDTH = this.screen.width = 720,
            SCREEN_HEIGHT = this.screen.height = 405;

        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        this.camera = new THREE.PerspectiveCamera(30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 200000);
        this.controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        this.controls.enablePan = false;

        this.controls.addEventListener('change', ()=> {
            this.dataSave();
            this._animation.play();
        });

        /*-----------set config data----------*/
        this.camera.positionDef = new THREE.Vector3( 34800,18600, -600);
        if(main.selected.camera){
            if(  main.selected.camera.rotation){
                this.camera.rotation.x = main.selected.camera.rotation.x;
                this.camera.rotation.y = main.selected.camera.rotation.y;
                this.camera.rotation.z = main.selected.camera.rotation.z;
            }
            if( main.selected.camera.position){
                this.camera.positionDef.copy(main.selected.camera.position);
            }
            if(  main.selected.camera.fov){
                this.camera.fov = main.selected.camera.fov;
            }
            if(  main.selected.camera.scale){
                this.model.scale.multiplyScalar(main.selected.camera.scale);
            }
        }


        this.camera.position.copy(this.camera.positionDef);
        this.camera.updateProjectionMatrix();

        let curDist = this.camera.positionDef.distanceTo(this.controls.target),
            curAngle = Math.acos((this.camera.positionDef.x - this.controls.target.x) / curDist);

        this.camera.updateView = (angle)=> {
            let quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (angle * 10) * Math.PI / 180);
            this.camera.position.copy(this.camera.positionDef.clone().applyQuaternion(quaternion));
            this._animation.play();
        }
        this.scene.add(new THREE.AxisHelper(500));

        //let light = new THREE.DirectionalLight(0xffffff);
        //light.position.set(1, 1, 1);
        //this.scene.add(light);


        this.loadModel(()=> {

            let foo = this._parent();
            while (foo.firstChild) foo.removeChild(foo.firstChild);

            this._projControls = new OxiControls(this);
            this._slider = new OxiSlider(this);
            let parentCanvas = this._container = document.createElement('div');
            parentCanvas.className = ENTITY.ProjClasses.CENTER_CONTAINER;
            this._parent().appendChild(parentCanvas);
            parentCanvas.appendChild(renderer.domElement);


            this._events = new OxiEvents(this);
            this._animation = new OxiAnimation(this);
        });
    }

    updateData(data) {

        switch (data) {
            case'scale':
            {
                this.model.scale.z = this.model.scale.y = this.model.scale.x;
                break;
            }
            case'width':
            {
                let prop = this._slider.currentFrame.clientWidth/this._slider.currentFrame.clientHeight,
                    val = this.main.selected.camera.resolution.x;
                [].forEach.call(this._slider.imgPagination.childNodes,function(el,i){
                    el[data] = val;
                    el.height = data*prop;
                });
                break;
            }
            case'height':
            {
                let prop = this._slider.currentFrame.clientWidth/this._slider.currentFrame.clientHeight,
                    val = this.main.selected.camera.resolution.y;
                [].forEach.call(this._slider.imgPagination.childNodes,function(el,i){
                    el[data] = val;
                    el.width = data/prop;
                });
            }
            default:
            {
                this.camera.updateProjectionMatrix();
            }
        }


        this.dataSave();
        this._animation.play();
    }
    dataSave(){
        let old = this.main.selected.camera;
        this.main.selected.camera = new ENTITY.OxiCamera({
            position:new ENTITY.Vector3(this.camera.position),
            rotation:new ENTITY.Vector3({x:this.camera.rotation.x,y:this.camera.rotation._y,z:this.camera.rotation._z}),
            resolution:new ENTITY.Vector3({x:this._slider._W(),y:this._slider._H()}),
            fov:this.camera.fov,
            scale:this.model.scale.x,
        });
        this.main.selected.camera.resolution=old;
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
                console.log(item, loaded, total);
            };


            let onProgress = function (xhr) {
                if (xhr.lengthComputable) {
                    let percentComplete = xhr.loaded / xhr.total * 100;
                    console.log((percentComplete).toFixed(2) + '% downloaded');
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
        if (this.model.children)for(let i=0;i<this.model.children.length;i++)this.model.remove(this.model.children[i]);
        this.model.add(object);
        object.traverse((child)=> {
            if (child.type == 'Mesh') {
                child.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.7});

                for(let i=0, areas=this.main.selected.areas; areas && i<areas.length;i++){
                    if(areas[i]._id.match(child.name)){
                        child._data = areas[i];
                        break;
                    }
                }
            }
        });
        this.main.selected.cash.model = object;
    }


    _parent():HTMLElement {
        return this.main.renderParent['nativeElement'];
    }

    onFilesSelected(files) {
        let _self = this,
            filereader = this._fileReader = this._fileReader || new FileReader(),
            isObj = files[0].name.match('.obj');
        this._files[(isObj ? 'model[]' : 'frames[]')] = files;

        if (!isObj)this.main.selected.images = [];

        let startFrom = 0;

        function parseFiles(cur) {
            if (!cur) return (isObj ? _self._animation.play() : _self._slider.addFrames());
            if (isObj) {
                filereader.readAsText(cur);
            } else {
                filereader.readAsDataURL(cur);
            }
            filereader.onloadend = (e:any)=> {
                if (isObj) {
                    let loader = _self.loader = _self.loader || new THREE.OBJLoader();
                    loader.parse(e.currentTarget.result, (m)=>{
                        _self.main.selected.destination = [{file:cur, name: cur.name}];
                        _self._onLoadModel(m);
                    });
                } else {
                    _self.main.selected.images.push({file: cur, name: cur.name, data: e.currentTarget.result});
                }

                parseFiles(files[startFrom++]);
            };
        };
        parseFiles(files[startFrom++]);
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
    private main:any;
    lastInter:any;


    constructor(app:OxiAPP) {

        let
            _self = this,
            elem = app.gl.domElement,
            handler = (elem.addEventListener || elem.attachEvent).bind(elem);

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

        if (app._animation)app._animation.play();
    }

    onMouseUp(ev:any) {

        let _self = this;
        this.mouse.isDown = false;
        this.main._projControls.show(ev, false);

        if (ev.button == 2) {
            let _self = this,
                intersectList = _self.inter(ev);
            if (intersectList && intersectList[0]) {
                let inter = _self.lastInter = intersectList[0];
                this.main._projControls.show(ev);

            }
            ev.preventDefault();
        }
    }

    onMouseMove(ev:Event) {
        /* let _self = this,
         intersectList = _self.inter(ev);
         if (intersectList && intersectList[0]) {
         let inter = intersectList[0];
         console.log(inter);
         }*/
    }

    onMouseDown(ev:Event) {
        this.mouse.isDown = true;
    }

    inter(ev:any, arg:any = null) {
        var _self = this,
            elements = arg && arg.childs ? arg.childs : (_self.main.interMeshes ? _self.main.interMeshes : _self.main.model.children);

        if (this.mouse.isDown || !elements || !_self.main.controls.enabled)return false;
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


    constructor(main) {
        this.isDown = false;
        this.main = main;
    }

    interPoint(ev) {
        let _slider = this.main._slider,
            canvasW = _slider._W(),
            canvasH = _slider._H(),
            _x = (ev ? ev.clientX : canvasW / 2) - (_slider._offsetLeft() + 10),
            _y = (ev ? ev.clientY : canvasH / 2) - _slider._offsetTop() + 110
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
        this.animate();

    }

    add(callback:Function) {
        this.animations.push(callback);
    }

    animate() {
        if (!this.app.gl.domElement.clientWidth || this.isStop)return;
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i]();
        }

        if (this.canAnimate) {
            this.canAnimate = this.lastUpdate > Date.now();
            if (!this.canAnimate || this.lastIter > 2)this.lastIter = 0;
            this.app.render();
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
    currentFrame:any;
    container:HTMLElement;
    imgPagination:HTMLElement;
    app:OxiAPP;

    constructor(app:OxiAPP) {

        this.app = app;
        this.addFrames();

    }

    addFrames() {
        let app = this.app;

        [this.container, this.imgPagination].forEach((domEl)=> {
            if (domEl) {
                while (domEl.firstChild) domEl.removeChild(domEl.firstChild);
                if (domEl.parentNode)domEl.parentNode.removeChild(domEl);
            }
        });


        let div = this.container = document.createElement('div'),
            imgPagination = this.imgPagination = document.createElement('ul');

        if (!app.main.selected.images || !app.main.selected.images.length) return;

        for (let i in app.main.selected.images) {
            let img = document.createElement('img'),
                curImg = app.main.selected.images[i];
            img.src = typeof curImg == 'string' ? ENTITY.Config.PROJ_LOC + app.main.selected.projFilesDirname + "/images/" + curImg : curImg.data;
            if (parseInt(i) == this.app.main.selected.currentItem){
                img.className = ENTITY.ProjClasses.ACTIVE;
                this.currentFrame = img;
            }
            div.appendChild(img);

            let item = document.createElement('li');
            item.innerHTML = (+i + 1) + '';
            item.addEventListener('click', ()=> {
                this.updateView(i);
            });
            imgPagination.appendChild(item);
        }

        div.className = [ENTITY.ProjClasses.CENTER_CONTAINER, ENTITY.ProjClasses.IMG_SLIDER].join(" ");
        app._parent().appendChild(div);
        app._parent().appendChild(imgPagination);
    }

    updateView(selectedItem) {
        this.currentFrame['className'] = '';
        this.app.main.selected.currentItem = selectedItem ;
        this.app.camera.updateView(selectedItem);

        this.currentFrame = this.container.childNodes[selectedItem];
        this.currentFrame['className'] = ENTITY.ProjClasses.ACTIVE;

    }

    _W() {
        return this.container.clientWidth || this.app.screen.width;
    }

    _H() {
        return this.container.clientHeight || this.app.screen.height;
    }

    _offsetLeft() {
        return this.container.offsetLeft || this.app._container.offsetLeft;
    }

    _offsetTop() {
        return this.container.offsetTop || this.app._container.offsetTop;
    }
}
class OxiControls {
    app:OxiAPP;
    controls:HTMLElement;

    constructor(app:OxiAPP) {
        let div = this.controls = document.createElement('div');
        div.className = ENTITY.ProjClasses.PROJ_CONTROLS;
        app._parent().appendChild(div);
        this.app = app;

        let childSelected = (child:any)=> {
            this.app._events.lastInter.object._data = child;
            child._id = this.app._events.lastInter.object.name;
            child.name = child._id.toUpperCase();

            child._id +=Date.now();

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
                if (input)childSelected(new ENTITY.GeneralStructure({
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
    }

    show(pos, flag:boolean = true) {

        if (this.app._events.lastInter) {
            if (!this.app._events.lastInter.object.material.defColor)this.app._events.lastInter.object.material.defColor = this.app._events.lastInter.object.material.color.clone();
            this.app._events.lastInter.object.material.color = flag ? new THREE.Color(61 / 250, 131 / 250, 203 / 250) : this.app._events.lastInter.object.material.defColor;
            if (this.app._events.lastInter.object._data && flag)return;
        }

        if (flag) {

            if (!this.controls.className.match(ENTITY.ProjClasses.ACTIVE)) {
                this.controls.className += " " + ENTITY.ProjClasses.ACTIVE;
            }
        } else {
            this.controls.className = this.controls.className.replace(ENTITY.ProjClasses.ACTIVE, '');
        }

        this.controls.style.left = ((pos.x || pos.clientX) - 15 ) + 'px';
        this.controls.style.top = ((pos.y || pos.clientY) - this.controls.clientHeight / 2 - 15) + 'px';
        this.app._animation.play();
    }
}