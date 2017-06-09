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
    private curFill:any;
    private mode:any;
    private MODES:any;
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

    }


    ngOnInit() {
    }

    ngAfterViewInit() {
        let svg = this.selected.svgDestination;
        if (svg instanceof Array)svg = svg[0].name;
        this.dataSrc = svg && svg.match('.svg') ? ENTITY.Config.PROJ_LOC + this.selected.projFilesDirname + ENTITY.Config.FILE.DIR.DELIMETER + svg : null;
        let _self = this,
            domElem = this.dataEl['nativeElement'],
            handler = (domElem.addEventListener || domElem.attachEvent).bind(domElem);
        this.canEdit = this.selected.canEdit;
        fabric.Object.prototype.set({
            transparentCorners: false,
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            padding: 7,
            dropSelf: function () {
                this.get('_points').forEach((e)=> {
                    _self.fabricJS.remove(e);
                });
                if (this._dataSource)this._dataSource.active = false;
                _self.fabricJS.remove(this);
                _self.fabricJS.renderAll();
                _self.toSVG();
            },
            clone: function (isHard) {
                let clone = ['fill', 'opacity', 'id', '_tooltip', '_data', '_dataSource', 'material', 'click'],
                    hardClone = ['scaleX', 'scaleY','left', 'top'],
                    self = this,
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
                    //if (isHard) {
                    //    [].forEach((field)=> {
                    //        newObj[field] = this[field];
                    //    });
                    //}
                }

                if (!newObj.id)newObj.set('id', ENTITY.Config.randomstr());

                if (this.type == 'polygon') {
                    newObj.selectable = false;
                    //var matrix = this.calcTransformMatrix();
                    //newObj.set('transformMatrix',this.calcTransformMatrix());
                }

                _self.fabricJS.add(newObj);
                if (_pn) {
                    newObj.set('_points', _pn);
                    for (var i = 0; i < _pn.length; i++) {
                        _self.fabricJS.remove(_pn[i].parent).remove(_pn[i]).add(_pn[i]);
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
                    originX: 'center', originY: 'center'
                },
                POLYGON: {
                    fill: this.curFill,
                    opacity: this.selected.camera.opacity,
                    selectable: false

                }
            };
            this.shapes = {
                POLYGON: 'polygon',
                CIRCLE: 'circle'
            };

            if (this.dataSrc) {
                fabric.loadSVGFromURL(this.dataSrc, (objects, options)=> {
                    if (objects && options) {
                        //setTimeout(()=> {
                        options.objects = objects;
                        this.resize(false, false, options);
                        let scaleMultiplierX = this.fabricJS.width / options.width,
                            scaleMultiplierY = this.fabricJS.height / options.height;
                        for (let i = 0; i < objects.length; i++) {
                            if (objects[i].type == this.shapes.POLYGON) {
                                let cur = objects[i],
                                    center = cur.getCenterPoint(),
                                    _p = cur.get('points').map((el)=> {
                                        return new fabric.Point(center.x + el.x, center.y + el.y);
                                    }),
                                    _points = [];

                                for (let i = 0, areas = this.selected.areas; areas && i < areas.length; i++) {
                                    if (areas[i]._id.match(cur.id)) {
                                        cur._data = areas[i];
                                        break;
                                    }
                                }
                                for (let i = 0, sources = this.glapp.preToolTip.dataElem; sources && i < sources.length; i++) {
                                    if (sources[i]._id == cur.id || (cur._data && sources[i]._id == cur._data.dataSourceId)) {
                                        cur._dataSource = sources[i];
                                        break;
                                    }
                                }

                                if (this.canEdit) {
                                    for (let d = 0; d < _p.length; d++) {
                                        let circle = new fabric.Circle(this.settings.CIRCLE);
                                        circle.left = (-center.x + _p[d].x  ) * scaleMultiplierX + center.x;
                                        circle.top = (-center.y + _p[d].y ) * scaleMultiplierY + center.y;
                                        circle._iter = d;
                                        circle.parent = objects[i];
                                        _points.push(circle);
                                    }
                                    cur.set('_points', _points);
                                }

                                cur.opacity = this.selected.camera.opacity;
                                cur.set('points', _p);
                                let cloneCur = cur.clone(true);
                                cloneCur._tooltip = new OxiToolTip(cloneCur, this.glapp.app);
                                cloneCur._tooltip.update();
                            }
                        }
                        this.fabricJS.calcOffset().renderAll();
                        //}, 100);
                    }
                    this.onLoadSVG();
                });
            } else {
                this.onLoadSVG();
            }
        }, 200);
    }

    private onLoadSVG() {
        let MODES = this.MODES = {EDIT: 1, ADD: 2, NORMAL: 3, NO: 4},
            MOUSE = this.MOUSE = {DOWN: 1, UP: 2, CUR: 0},
            mode = this.mode = MODES.ADD,
            fabricJS = this.fabricJS;

        if(this.glapp.app && this.glapp.app._events) this.glapp.app._events.onWindowResize();
        if (this.canEdit) {
            this.upperC = document.getElementsByClassName('upper-canvas')[0];
            this.eventsData = [
                {cntx: window, name: 'keyup', callback: (e)=>this.onKeyUp(e)},
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
                if (this.mode === this.MODES.NO && this.currentShape && this.currentShape.type == this.shapes.POLYGON) {
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
                if (this.mode == this.MODES.NO) {
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
                    fabricJS.add(this.currentShape).add(circle).renderAll();
                    this.mode = this.MODES.EDIT;
                } else if (this.mode === this.MODES.EDIT && this.currentShape && this.currentShape.type === "polygon") {
                    var points = this.currentShape.get("points"),
                        _points = this.currentShape.get("_points");
                    points.push({
                        x: pos.x,
                        y: pos.y
                    });
                    fabricJS.remove(this.currentShape);
                    _points.forEach((e)=> {
                        fabricJS.remove(e);
                    });
                    this.currentShape = new fabric.Polygon(points, polySet);
                    let circle = new fabric.Circle(pointSet);
                    circle.parent = this.currentShape;
                    circle._iter = _points.length;
                    _points.push(circle);
                    this.currentShape.set("_points", _points);
                    fabricJS.add(this.currentShape);
                    _points.forEach((e)=> {
                        fabricJS.add(e);
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
    }

    private  getRandomColor() {
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
        if (e.keyCode === 27 || e.keyCode === 13) {
            this.onFinishDraw();
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

    resize(_w=null, _h=null, options:any = null) {
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
}