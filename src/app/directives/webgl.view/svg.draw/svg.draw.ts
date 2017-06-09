import {Input,ViewChild,Component,OnInit,OnChanges,EventEmitter,AfterViewInit,ElementRef} from '@angular/core';
import * as ENTITY from '../../../entities/entities'
import {WebglView,OxiToolTip}  from '../webgl.view';
import 'fabric';

declare var fabric:any;
declare var alertify:any;

@Component({
    selector: 'app-project-svg-view',
    templateUrl: './svg.view.html',
    styleUrls: ['./svg.view.sass']
})
export class SVGView implements OnInit,AfterViewInit {

    private dataSrc:string;
    private canEdit:boolean = false;
    currentShape:any;
    private curKeyCode:number;
    private curFill:any;
    private curGroup:any;
    private mode:any;
    private MODES:any = {};
    private MOUSE:any;
    private upperC:any;
    private eventsData:any;
    private shapes:any;
    private settings:any;
    fabricJS:any;
    @ViewChild("parentEl")
        parentEl:HTMLElement;
    @ViewChild("dataEl")
        dataEl:ElementRef;
    @Input() selected:any;
    @Input() glapp:WebglView;

    constructor() {
        this.MODES = {EDIT: 1, ADD: 2, NORMAL: 3, NO: 4};
        this.MOUSE = {DOWN: 1, UP: 2, CUR: 0, GROUP: 3};
        this.mode = this.MODES.ADD;
    }


    ngOnInit() {
    }

    ngAfterViewInit() {
        let svg = this.selected.svgDestination;
        if (svg instanceof Array)svg = svg[0].name;
        this.dataSrc = svg && svg.match('.svg') ? ENTITY.Config.PROJ_LOC + this.selected.projFilesDirname + ENTITY.Config.FILE.DIR.DELIMETER + svg : null;
        let _self:any = this,
            domElem = this.dataEl['nativeElement'],
            handler = (domElem.addEventListener || domElem.attachEvent).bind(domElem);
        this.canEdit = this.selected.canEdit;
        fabric.Object.prototype.set({
            selectable: false,
            transparentCorners: false,
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            padding: 7,
            _add: function (e) {

                e._parent = this;
                //if(this.type == _self.shapes.GROUP){
                return this.addWithUpdate(e);
                //}else{
                //
                //    return this.add(e);
                //}
            },
            dropSelf: function () {
                this.get('_points').forEach((e)=> {
                    if (this._parent) {
                        this._parent.remove(e);
                    } else {
                        _self.fabricJS.remove(e);
                    }
                });
                if (this._dataSource)this._dataSource.active = false;
                if (this._parent) {
                    this._parent.remove(this);
                } else {
                    _self.fabricJS.remove(this);
                }
                _self.fabricJS.renderAll();
                _self.toSVG();
            },
            clone: function (isHard) {
                let clone = ['fill', 'opacity', 'id', '_tooltip', '_data', '_dataSource', 'material', 'click', 'selectable'],
                    hardClone = ['scaleX', 'scaleY'],
                    _pn = this.get('_points'),
                    _points = this.get('points'),
                    newObj = new this.constructor(_points)
                    ;
                for (var i = 0; i < clone.length; i++) {
                    newObj[clone[i]] = this[clone[i]];
                }
                if (isHard || this.hardClone) {
                    for (var i = 0; i < hardClone.length; i++) {
                        newObj[hardClone[i]] = this[hardClone[i]];
                    }
                    newObj.hardClone = true;
                    if (isHard) {
                        ['left', 'top'].forEach((field)=> {
                            newObj[field] = this[field];
                        });
                    }
                }

                if (!newObj.id)newObj.set('id', ENTITY.Config.randomstr());

                //if (this.type == _self.shapes.POLYGON) {
                //    newObj.selectable = false;
                //var matrix = this.calcTransformMatrix();
                //newObj.set('transformMatrix',this.calcTransformMatrix());
                //}

                if (this._parent) {
                    this._parent._add(newObj);
                    if (this._parent.type == _self.shapes.GROUP) {
                        //    let s = new SVGGroup(_self);
                        //    this._parent = s.clone(this._parent);
                        //    //console.log(this._parent.type);
                    }


                } else {
                    _self.fabricJS._add(newObj);
                }

                if (_pn) {
                    newObj.set('_points', _pn);
                    for (var i = 0; i < _pn.length; i++) {
                        if (_pn[i]._parent) {
                            _pn[i]._parent.remove(_pn[i].parent).remove(_pn[i])._add(_pn[i]);
                        }
                        _self.fabricJS.remove(_pn[i].parent).remove(_pn[i])._add(_pn[i]);
                        _pn[i].parent = newObj;
                    }
                }

                return newObj;
            },
            getScreenPst: function () {
                this.onscreenParams = this.getCenterPoint();
                this.onscreenOffset = _self.glapp.app._offset();

            }
        });
        fabric.Canvas.prototype.set({
            _add: function (e) {
                e._parent = this;
                return this.add(e);
            }
        });

        setTimeout(()=> {
            this.fabricJS = new fabric.Canvas(this.dataEl.nativeElement, {
                selection: true, borderColor: 'red',
                cornerColor: 'green',
                cornerSize: 6
            });
            this.curFill = this.getRandomColor();
            this.settings = {
                CIRCLE: {
                    radius: 3,
                    strokeWidth: 5,
                    stroke: 'red',
                    selectable: true,
                    excludeFromExport: true,
                    hasControls: false,
                    originX: 'center',
                    originY: 'center'
                },
                POLYGON: {
                    fill: this.curFill,
                    opacity: this.selected.camera.opacity,
                    selectable: false

                }
            };
            this.shapes = {
                GROUP: 'group',
                POLYGON: 'polygon',
                CIRCLE: 'circle'
            };

            if (this.dataSrc) {
                this.glapp.authServ.get(this.dataSrc, {hasAuthHeader: false}).subscribe((res:any)=> {
                    this.parseSVG(res._body, ((objects, options)=> {
                        if (objects && options) {
                            (function parseAndInsert(objects, options = null) {
                                options.objects = objects;
                                _self.resize(false, false, options);
                                let scaleMultiplierX = _self.fabricJS.width / options.width,
                                    scaleMultiplierY = _self.fabricJS.height / options.height;
                                for (let itm = 0; itm < objects.length; itm++) {
                                    let cur = objects[itm];
                                    if (cur.type == _self.shapes.POLYGON) {
                                        let center = cur.getCenterPoint(),
                                            _p = cur.get('points').map((el)=> {
                                                return new fabric.Point(center.x + el.x, center.y + el.y);
                                            }),
                                            _points = [];
                                        if (_self.canEdit) {
                                            for (let d = 0; d < _p.length; d++) {
                                                let circle = new fabric.Circle(_self.settings.CIRCLE);
                                                circle.left = (-center.x + _p[d].x  ) * scaleMultiplierX + center.x;
                                                circle.top = (-center.y + _p[d].y ) * scaleMultiplierY + center.y;
                                                circle._iter = d;
                                                circle.parent = cur;
                                                _points.push(circle);
                                            }
                                            cur.set('_points', _points);
                                        }
                                        cur.set('points', _p);
                                    } else if (cur.type == _self.shapes.GROUP) {
                                        parseAndInsert(cur._objects, options);
                                    }

                                    for (let i = 0, areas = _self.selected.areas; areas && i < areas.length; i++) {
                                        if (areas[i]._id.match(cur.id)) {
                                            cur._data = areas[i];
                                            break;
                                        }
                                    }
                                    for (let i = 0, sources = _self.glapp.preToolTip.dataElem; sources && i < sources.length; i++) {
                                        if (sources[i]._id == cur.id || (cur._data && sources[i]._id == cur._data.dataSourceId)) {
                                            cur._dataSource = sources[i];
                                            break;
                                        }
                                    }
                                    cur.opacity = _self.selected.camera.opacity;
                                    if (!cur._parent) {
                                        let cloneCur = cur.clone(true);
                                        cloneCur._tooltip = new OxiToolTip(cloneCur, _self.glapp.app);
                                        cloneCur._tooltip.update();
                                        _self.fabricJS._add(cloneCur);
                                    }else{
                                        _self.fabricJS._add(cur);
                                    }

                                }
                            })(objects, options);

                            this.fabricJS.calcOffset().renderAll();
                        }
                        this.onLoadSVG();
                    }));
                });
            } else {
                this.onLoadSVG();
            }
        }, 200);
    }

    private onLoadSVG() {
        let fabricJS = this.fabricJS;

        console.log(this.fabricJS);
        if (this.canEdit) {
            this.upperC = document.getElementsByClassName('upper-canvas')[0];
            this.eventsData = [
                {cntx: window, name: ENTITY.Config.EVENTS_NAME.KEY.UP, callback: (e)=>this.onKeyUp(e)},
                {cntx: window, name: ENTITY.Config.EVENTS_NAME.KEY.DOWN, callback: (e)=>this.onKeyDown(e)},
                {
                    cntx: this.upperC,
                    name: ENTITY.Config.EVENTS_NAME.CNTXMENU,
                    callback: (e)=>this.onMouseDown(e)
                },
            ];
            this.eventsData.forEach((el)=> {
                fabric.util.addListener(el.cntx, el.name, el.callback);
            });
            fabricJS.on('object:selected', (e)=> {
                if (this.mode != this.MODES.EDIT)this.mode = this.MODES.NO;
            });
            fabricJS.on('before:selection:cleared', (options)=> {
                if (this.mode != this.MODES.EDIT)this.mode = this.MODES.ADD;
            });
            fabricJS.on("mouse:move", (event)=> {
                let pos = fabricJS.getPointer(event.e);
                this.glapp.app._projControls.showControls(event.e, false);
                if (this.mode == this.MODES.NO) {
                } else if (this.mode === this.MODES.EDIT && this.currentShape) {
                    var points = this.currentShape.get("points");
                    points[points.length - 1].x = pos.x;
                    points[points.length - 1].y = pos.y;
                    this.currentShape.set({
                        points: points
                    });
                    this.currentShape.clone();
                    fabricJS.renderAll();
                }
            });
            fabricJS.on("mouse:up", (event:any)=> {
                this.MOUSE.CUR = this.MOUSE.UP;
                if (this.mode === this.MODES.NO && this.currentShape && [this.shapes.POLYGON, this.shapes.GROUP].indexOf(this.currentShape.type) > -1) {
                    if (!this.glapp.app._projControls.showAttachPopUp(event.target)) {
                        this.mode = this.MODES.ADD;
                        this.currentShape = false;
                    }
                }
            });
            fabricJS.on("mouse:down", (event:any)=> {
                this.MOUSE.CUR = this.MOUSE.DOWN;
                let pos = fabricJS.getPointer(event.e),
                    polySet = this.settings.POLYGON,
                    pointSet = this.settings.CIRCLE;

                pointSet.left = pos.x;
                pointSet.top = pos.y;
                if (this.mode == this.MODES.GROUP) {
                    this.curGroup.add(event.target);
                } else if (this.mode == this.MODES.NO) {
                    if (this.currentShape) {

                    } else {
                        this.mode = this.MODES.ADD;
                    }
                } else if (this.mode === this.MODES.ADD) {
                    let _points = [{
                        x: pos.x,
                        y: pos.y
                    }, {
                        x: pos.x + 1,
                        y: pos.y + 1
                    }];
                    let circle = new fabric.Circle(pointSet), _pointsSel = [circle];
                    circle.parent = this.currentShape = new fabric.Polygon(_points, polySet);
                    circle._iter = 0;
                    this.currentShape.set("_points", _pointsSel);
                    fabricJS._add(this.currentShape)._add(circle).renderAll();
                    this.mode = this.MODES.EDIT;
                } else if (this.mode === this.MODES.EDIT && this.currentShape && this.currentShape.type === "polygon") {
                    var points = this.currentShape.get("points"),
                        _points = this.currentShape.get("_points");
                    points.push({
                        x: pos.x,
                        y: pos.y
                    });
                    this.currentShape._parent.remove(this.currentShape);
                    _points.forEach((e)=> {
                        e._parent.remove(e);
                    });
                    this.currentShape = new fabric.Polygon(points, polySet);
                    let circle = new fabric.Circle(pointSet);
                    circle.parent = this.currentShape;
                    circle._iter = _points.length;
                    _points.push(circle);
                    this.currentShape.set("_points", _points);
                    fabricJS._add(this.currentShape);
                    _points.forEach((e)=> {
                        fabricJS._add(e);
                    });
                }
            });
            fabricJS.on('object:moving', (e:any)=> {
                let x = e.e.movementX,
                    y = e.e.movementY,
                    curActiv = e.target;

                if (curActiv) {
                    switch (curActiv.type) {
                        case 'polygon':
                        {
                            curActiv.get("_points").forEach((obj)=> {
                                obj.set('left', obj.left + x);
                                obj.set('top', obj.top + y);
                                obj.setCoords();
                            });
                            break;
                        }
                        case 'circle':
                        {
                            let
                                _p = curActiv.parent.get('points');
                            _p[curActiv._iter].x += x;
                            _p[curActiv._iter].y += y;

                            curActiv.parent.clone();
                            //var bound = curActiv.parent.getBoundingRect();
                            //curActiv.setTop(curActiv.originalState.top);
                            //curActiv.setLeft(curActiv.originalState.left);
                            //curActiv.setScaleX(curActiv.originalState.scaleX);
                            //curActiv.setScaleY(curActiv.originalState.scaleY);
                            //curActiv.parent.setCoords();

                            break;
                        }
                    }

                    fabricJS.renderAll();
                    this.toSVG();
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
            fabricJS.on('mouse:over', (e)=> {
                if (this.mode != this.MODES.NO || !e.target)return;
                e.target.opacity = 1;
                this.currentShape = e.target;
                this.fabricJS.renderAll();
            });
            fabricJS.on('mouse:out', (e)=> {
                if (this.mode != this.MODES.NO || !e.target)return;
                //this.currentShape = null;
                e.target.opacity = this.selected.camera.opacity;
                this.fabricJS.renderAll();
            });
        } else {
            fabricJS.on('mouse:over', (e)=> {
                if (!e.target)return;
                e.target.opacity = 1;
                this.currentShape = e.target;
                if (e.target._tooltip)e.target._tooltip.show();
                this.fabricJS.renderAll();
            });
            fabricJS.on('mouse:out', (e)=> {
                if (!e.target)return;
                this.currentShape = null;
                if (e.target._tooltip)e.target._tooltip.show(false);
                e.target.opacity = this.selected.camera.opacity;
                this.fabricJS.renderAll();
            });
            fabricJS.on('mouse:up', (e)=> {
                if (!e.target)return;
                if (e.target.click)e.target.click();
            });
        }

        setTimeout(()=> {
            if (this.glapp.app && this.glapp.app._events) this.glapp.app._events.onWindowResize();
        }, 100)
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        var color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private toSVG() {
        let svgName = 'models.svg';
        this.selected.svgDestination = [{
            name: svgName,
            file: new File([new Blob([this.fabricJS.toSVG(['name'])], {type: 'text/*'})], svgName)
        }];
        this.selected.hasChanges = true;
    }

    private onKeyUp(e) {
        if (this.curGroup) {
            this.curGroup.make();
            this.curGroup = null;
        }
        this.mode = this.MODES.NO;
        if (e.keyCode === 27 || e.keyCode === 13) {
            this.onFinishDraw();
        }
    }

    private onKeyDown(e) {
        if (e.keyCode == 16) {
            this.mode = this.MODES.GROUP;
            if (!this.curGroup) {
                this.curGroup = new SVGGroup(this);
            }
        }

    }

    private onMouseDown(e) {
        e.preventDefault();
        if (e.button == 2) {
            if (this.mode == this.MODES.NO && this.currentShape) {
                this.glapp.app._projControls.showControls(e);
            } else {
                this.onFinishDraw();
            }

        }
    }

    private onFinishDraw() {
        if (this.currentShape && this.currentShape.type == 'polygon') {
            let points = this.currentShape.get('points');
            points.pop();
            this.currentShape.set({
                points: points
            });
            this.currentShape.clone();
            this.toSVG();
        }


        this.curFill = this.getRandomColor();
        this.mode = this.MODES.NO;
        this.currentShape = null;
        this.fabricJS.deactivateAll().renderAll();
    }

    resize(_w = null, _h = null, options:any = null) {
        if (!this.fabricJS)return;
        if (!_w && this.glapp.app._container)_w = this.glapp.app._container.clientWidth;
        if (!_h && this.glapp.app._container)_h = this.glapp.app._container.clientHeight;
        let scaleMultiplierX = _w / this.fabricJS.width,
            scaleMultiplierY = _h / this.fabricJS.height,
            objects = this.fabricJS._objects;

        if (_w)this.fabricJS.setWidth(_w);
        if (_h)this.fabricJS.setHeight(_h);
        if (options) {
            scaleMultiplierX = this.fabricJS.width / options.width;
            scaleMultiplierY = this.fabricJS.height / options.height;
            objects = options.objects;
        }

        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == this.shapes.POLYGON) {
                objects[i].scaleX = objects[i].scaleX * scaleMultiplierX;
                objects[i].scaleY = objects[i].scaleY * scaleMultiplierY;
            }
            objects[i].left = objects[i].left * scaleMultiplierX;
            objects[i].top = objects[i].top * scaleMultiplierY;

            if (objects[i]._tooltip)objects[i]._tooltip.show(false);
        }

        this.fabricJS.calcOffset().renderAll();
    }

    ngOnDestroy() {
        //delete this.selected.svgDestination;
        this.eventsData.forEach((el)=> {
            fabric.util.removeListener(el.cntx, el.name, el.callback);
        });
    }

    private  componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    private rgbToHex(arr) {
        return "#" + this.componentToHex(arr[0]) + this.componentToHex(arr[1]) + this.componentToHex(arr[2]);
    }

    private parseSVG(svg, callback) {
        let
            _self = this, parser = new DOMParser(),
            doc = parser.parseFromString(svg, "image/svg+xml"),
            allElem = [],
            options = {},
            _svg:any = doc.childNodes[1],
            parseDom = (function parseDom(_el, parent = null) {
                for (let i = 0; i < _el.childNodes.length; i++) {
                    let e:any = _el.childNodes[i],
                        elem;
                    if (e.nodeName == _self.shapes.POLYGON) {
                        elem = new fabric.Polygon(e.attributes.points.textContent.split(" ").map((el)=> {
                            let _d = el.split(",");
                            return {x: _d[0], y: _d[1]}
                        }), _self.settings.POLYGON);
                        if (parent) {
                            parent.add(elem);
                            elem._parent = parent;
                        }
                    } else if (e.nodeName == 'g') {
                        elem = new fabric.Group();
                        if (e.childNodes.length) {
                            parseDom(e, elem);
                        }
                    }
                    if (elem) {
                        if (!elem._parent)allElem.push(elem);
                        for (let attr in e.attributes) {
                            let cntn = e.attributes[attr].textContent,
                                _field = e.attributes[attr].localName;
                            switch (_field) {
                                case 'id':
                                {
                                    elem[_field] = cntn;
                                    break;
                                }
                                case 'style':
                                {
                                    cntn.split(";").forEach((e)=> {
                                        if (!e || !e.trim().length)return;
                                        let _el = e.split(":"),
                                            _f = _el[0].trim();
                                        switch (_f) {
                                            case 'opacity':
                                            {
                                                elem[_f] = parseFloat(_el[1]);
                                                break;
                                            }
                                            case 'fill':
                                            {
                                                elem[_f] = _self.rgbToHex(_el[1].split(",").map((e)=> {
                                                    return +e.replace(/[^0-9.]/g, "")
                                                }));
                                                break;
                                            }
                                        }
                                    });
                                    break;
                                }
                                case 'transform':
                                {
                                    let _f = ['left', "top", "scaleX", "scaleY"];
                                    cntn.split(" ").forEach((e:any, key)=> {
                                        elem[_f[key]] = parseFloat(e.replace(/[^0-9.]/g, ""));
                                    });
                                    break;
                                }
                            }
                        }
                    }
                }
            })(_svg);

        for (let attr in _svg.attributes) {
            let _fN = _svg.attributes[attr].localName;
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

    }

}

class SVGGroup {
    group:Array<any>;
    editPoints:Array<any>;
    private canvas:any;
    private color:any;

    constructor(canvas:any) {
        this.group = [];//new fabric.Group({selectable: false});
        this.editPoints = [];
        this.canvas = canvas;
        this.color = this.canvas.getRandomColor()
    }

    add(element) {
        if (element && element.type == this.canvas.shapes.POLYGON) {
            element.fill = this.color;
            [element].concat(element.get('_points')).forEach((elem:any)=> {
                elem._parent.remove(elem);
                elem._data = elem._dataSource = elem._tooltip = null;
                if (elem.type == element.type) {
                    this.group.push(elem);

                } else {
                    this.editPoints.push(elem);
                }

            });
            this.canvas.fabricJS.renderAll();
        }
    }

    childs() {
        return this.group;
    }

    clone(from) {
        if (from._parent) {
            from._parent.remove(from);
        } else {
            this.canvas.fabricJS.remove(from);
        }
        from._objects.forEach((el)=> {
            this.add(el);
        });
        return this.make();
    }

    make() {
        let group = new fabric.Group(this.childs(), {selectable: false});
        group.set('id', ENTITY.Config.randomstr());
        this.group.forEach((e:any)=> {
            e._parent = group;
        });
        this.canvas.fabricJS._add(group);
        this.editPoints.forEach((el)=> {
            el._parent._add(el);
        });
        this.canvas.fabricJS.renderAll();

        return group;
    }
}
