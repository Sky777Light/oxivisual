import {Input,ViewChild,Component,OnInit,OnChanges} from '@angular/core';
import * as ENTITY from '../../entities/entities';

declare var alertify:any;
declare var THREE:any;
declare var Pace:any;

@Component({
    selector: 'app-project-webgl-view',
    templateUrl: './webgl.view.html',
    styleUrls: ['./webgl.view.sass']
})
export class WebglView implements OnInit,OnChanges {

    @ViewChild("renderParent")
        renderParent:HTMLElement;
    @Input() selected:ENTITY.ModelStructure;

    app:OxiAPP;

    constructor() {

    }

    ngOnChanges(changes) {
        if (this.selected)this.selected.app = this.app;
    }

    ngOnInit() {
        this.initWebgl();
        if (this.selected)this.selected.app = this.app;
    }

    initWebgl() {
        this.app = new OxiAPP(this);
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

    constructor(main:WebglView) {
        this.main = main;
        this.scene = new THREE.Scene();
        let renderer = this.gl = new THREE.WebGLRenderer({antialias: true, alpha: true}),
            SCREEN_WIDTH = this.screen.width = 720,
            SCREEN_HEIGHT = this.screen.height = 405;

        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.camera = new THREE.PerspectiveCamera(30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 200000);
        this.controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        //this.controls.addEventListener('change', ()=>this.render());
        this.camera.positionDef = new THREE.Vector3().copy(main.selected.camera ? main.selected.camera.position : {
            x: 34800,
            y: 18600,
            z: -600
        });
        this.camera.position.copy(this.camera.positionDef);

        let curDist = this.camera.positionDef.distanceTo(this.controls.target),
            curAngle = Math.acos((this.camera.positionDef.x - this.controls.target.x) / curDist);

        this.camera.updateView = (angle)=> {
            let quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (angle * 10) * Math.PI / 180);
            this.camera.position.copy(this.camera.positionDef.clone().applyQuaternion(quaternion));
        }
        this.scene.add(new THREE.AxisHelper(500));

        let light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        this.scene.add(light);


        this.loadModel(()=> {
            this._projControls = new OxiControls(this);
            this._slider = new OxiSlider(this);
            this._events = new OxiEvents(this);
            this._animation = new OxiAnimation(this);
            let parentCanvas = document.createElement('div');
            parentCanvas.className = ENTITY.ProjClasses.CENTER_CONTAINER;
            this._parent().appendChild(parentCanvas);
            parentCanvas.appendChild(renderer.domElement);

        });
    }

    loadModel(callback:Function = ()=> {
        console.log("load was finished succesed");
    }) {

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
            this.scene.add(object);
            this.model = object;
            object.traverse((child)=> {
                if (child.type == 'Mesh') {
                    child.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.7});
                }
            });
            callback();
        }, onProgress, onError);


    }

    _parent():HTMLElement {
        return this.main.renderParent['nativeElement'];
    }

    onFilesSelected(files) {
        let filereader = new FileReader(),
            isObj = files[0].name.match('.obj');

        files.forEach((file)=> {
            if (isObj) {
                filereader.readAsText(file);
            } else {
                filereader.readAsDataURL(file);
            }

        });
        filereader.onloadend = function (e) {
            if (isObj) {

            } else {

            }
        }
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
        if (ev.button == 2) {
            let _self = this,
                intersectList = _self.inter(ev);
            if (intersectList && intersectList[0]) {
                let inter = intersectList[0];

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
            _x = (ev ? ev.clientX : canvasW / 2) - _slider.container.offsetLeft,
            _y = (ev ? ev.clientY : canvasH / 2) - _slider.container.offsetTop + 90
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
    private lastUpdate:number = Date.now();
    private maxTimeUpdate:number = 1500;
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
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i]();
        }

        //if (this.canAnimate) {
        //    this.canAnimate = this.lastUpdate > Date.now();
        //    if (!this.canAnimate || this.lastIter > 2)this.lastIter = 0;
        this.app.render();
        //}
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
        this.canAnimate = false;
        this.lastIter = 0;
    }
}
class OxiSlider {
    container:HTMLElement;
    imgPagination:HTMLElement;
    currentItem:number = 1;
    app:OxiAPP;

    constructor(app:OxiAPP) {

        this.app = app;
        this.addFrames();

    }

    addFrames() {
        let app = this.app;
        if (this.container)app._parent().removeChild(this.container);
        if (this.imgPagination)app._parent().removeChild(this.imgPagination);

        let div = this.container = document.createElement('div'),
            imgPagination = this.imgPagination = document.createElement('ul');

        for (let i = 0; i < app.main.selected.images.length; i++) {
            let img = document.createElement('img'),
                curImg = app.main.selected.images[i];
            img.src = ENTITY.Config.PROJ_LOC + app.main.selected.projFilesDirname + "/images/" + curImg;
            if (i == 0)img.className = ENTITY.ProjClasses.ACTIVE;
            div.appendChild(img);

            let item = document.createElement('li');
            item.innerHTML = (i + 1) + '';
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
        this.container.childNodes[this.currentItem - 1]['className'] = '';
        this.currentItem = selectedItem + 1;
        this.app.camera.updateView(selectedItem);
        this.container.childNodes[selectedItem]['className'] = ENTITY.ProjClasses.ACTIVE;

    }

    _W() {
        return this.container.clientWidth || this.app.screen.width;
    }

    _H() {
        return this.container.clientHeight || this.app.screen.height;
    }
}
class OxiControls {
    app:OxiAPP;
    controls:HTMLElement;

    constructor(app:OxiAPP) {
        let div = this.controls = document.createElement('div');
        div.className = ENTITY.ProjClasses.PROJ_CONTROLS;
        app._parent().appendChild(div);

        [
            {
                className: 'attach-link', click: ()=> {}, icon:'../assets/img/Fill%202.svg'
            }, {
            className: 'attach-new', click: ()=> {},  icon:'../assets/img/Fill%202.svg'
        }, {
            className: 'attach-js', click: ()=> {} , icon:'../assets/img/Fill%202.svg'
        }, {
            className: 'cntrls-close', click: ()=> {

            }, icon:'../assets/img/users.svg'
        }
        ].forEach((el, item)=> {
                let domEl = document.createElement('div');
                domEl.className = el.className;
                domEl.addEventListener(ENTITY.Config.EVENTS_NAME.CLICK, (e)=>{el.click()});
                div.appendChild(domEl);
                let icon = document.createElement('img');
                icon.src = "../assets/img/Fill%202.svg";
                icon.setAttribute('fillColor','#ffffff');
                icon.style.color = '#ffffff';
                domEl.appendChild(icon);
            });
    }
    show(pos,flag:boolean=true){
        if(flag){
            if(!this.controls.className.match(ENTITY.ProjClasses.ACTIVE)){
                this.controls.className +=" "+ENTITY.ProjClasses.ACTIVE;
            }
        }else{
            this.controls.className = this.controls.className.replace(ENTITY.ProjClasses.ACTIVE,'');
        }
        this.controls.style.left = pos.x || pos.clientX;
        this.controls.style.top = pos.y || pos.clientY;
    }
}