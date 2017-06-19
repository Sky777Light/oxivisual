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
    private isFinish:boolean = false;
    private zoomDelta:number = 10;
    currentShape:any;
    lastSelectedShape:any;
    private curKeyCode:number;
    private showHelpZoomer:boolean = false;
    private curFill:any;
    private curGroup:any;
    private curImgZoom:any;
    private curImgBufferZoom:any;
    private mode:any;
    private COLORS = ['#00ff00' , "#ff0000"];
    private MODES:any = {};
    private MOUSE:any;
    private upperC:any;
    private defOpacity:number = 0.1;
    private eventsData:any;
    shapes:any;
    settings:any;
    fabricJS:any;
    @ViewChild("parentEl")
        parentEl:HTMLElement;
    @ViewChild("zoomer")
        zoomer:HTMLElement;
    @ViewChild("bufferC")
        bufferC:HTMLElement;
    @ViewChild("dataEl")
        dataEl:ElementRef;
    @Input() selected:any;
    @Input() glapp:WebglView;

    constructor() {
        this.MODES = {EDIT: 1, ADD: 2, NORMAL: 3, NO: 4};
        this.MOUSE = {DOWN: 1, UP: 2, CUR: 0, GROUP: 3};
        this.mode = this.MODES.ADD;
        this.curImgZoom = new Image();
        this.curImgBufferZoom = new Image();
    }


    ngOnInit() {
    }

    reload(data) {
        fabric.loadSVGFromString(data, (o, _options)=> {
            this.parseSVG(data, ((_objects)=> {
                this.onFinishParse(o, _options, _objects);
            }));
        });
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
                this.remove(e);

                e._parent = this;
                return this.addWithUpdate(e);
            },
            dropSelf: function () {
                if (this._objects) {
                    while (this._objects.length) this._objects[0].dropSelf();

                } else if (this.type == _self.shapes.CIRCLE) {
                    if (this._parent) {
                        this._parent.remove(this);
                    } else {
                        _self.fabricJS.remove(this);
                    }
                } else {
                    let _p = this.get('_points');
                    if (_p)_p.forEach((e)=> {
                        if (e._parent) {
                            e._parent.remove(e);
                        } else {
                            _self.fabricJS.remove(e);
                        }
                    });
                }
                if (this._dataSource)this._dataSource.active = false;
                if (this._parent) {
                    this._parent.remove(this);
                } else {
                    _self.fabricJS.remove(this);
                }
                _self.fabricJS.renderAll();
                _self.toSVG();

            },
            _clone: function (isHard) {

                this.setCoords();
                let clone = ['fill', 'hoverFill', 'defFill', 'opacity', '_hasUpdate', 'scaleX0', 'scaleY0', 'points0', 'id', '_tooltip', '_data', '_dataSource', 'material', 'click', 'selectable', '_objects'],
                    _pn = this.get('_points');
                let _points = isHard || this._hasUpdate ? this.get('points') : this.get('points').map((el, d)=> {
                        let _pC = new fabric.Point((el.x) * this.scaleX0, (el.y) * this.scaleY0);
                        //this.left = this.top = 0;
                        this._hasUpdate /*= this.scaleX0 = this.scaleY0 = this.scaleY = this.scaleX */ = 1;
                        //console.log(this.scaleX0, this.scaleY0);
                        return _pC;
                    }),
                    newObj = new this.constructor(_points);

                for (var i = 0; i < clone.length; i++) {
                    newObj[clone[i]] = this[clone[i]];
                }
                newObj.perPixelTargetFind = !_self.selected.canEdit;
                if (!newObj.id)newObj.set('id', ENTITY.Config.randomstr());


                if (this._parent) {
                    this._parent._add(newObj);
                } else {
                    _self.fabricJS._add(newObj);
                }

                if (_pn) {
                    newObj.set('_points', _pn);
                    for (var i = 0; i < _pn.length; i++) {
                        if (_pn[i]._parent) {
                            _pn[i]._parent.remove(_pn[i].parent).remove(_pn[i])._add(_pn[i]);
                        } else {
                            _self.fabricJS.remove(_pn[i].parent).remove(_pn[i])._add(_pn[i]);
                        }
                        _pn[i].parent = newObj;
                    }
                }
                if (this._parent) {
                    this._parent.remove(this);
                } else {
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
                    let points = this.get('points'),
                        xMin, xMax, yMin, yMax;

                    xMin = xMax = yMin = yMax = 0;
                    for (let i = 0; i < points.length; i++) {
                        let x = points[i].x,
                            y = points[i].y;

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
                    } else {
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

        setTimeout(()=> {
            this.fabricJS = new fabric.Canvas(this.dataEl.nativeElement, {
                selection: true, borderColor: 'red',
                cornerColor: 'green',
                cornerSize: 6
            });
            this.curFill = this.getRandomColor();
            this.settings = {
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
                    fill: this.curFill,
                    opacity: this.selected.camera.opacity,
                    selectable: false,
                    perPixelTargetFind: !this.selected.canEdit

                }, GROUP: {
                    selectable: false,
                    perPixelTargetFind: !this.selected.canEdit
                }
            };
            this.shapes = {
                GROUP: 'group',
                POLYGON: 'polygon',
                CIRCLE: 'circle'
            };

            if (this.dataSrc) {
                fabric.loadSVGFromURL(this.dataSrc, (o, options)=> {

                    this.glapp.authServ.get(this.dataSrc, {hasAuthHeader: false}).subscribe((res:any)=> {
                        this.parseSVG(res._body, ((_objects)=> {
                            _self.onFinishParse(o, options, _objects);
                            this.onLoadSVG();
                        }));
                    });
                });
            } else {
                this.onLoadSVG();
            }
        }, 200);
    }

    private onFinishParse(o, options, _objects) {
        let _self = this;
        if (o && options) {
            options.objects = o;
            _self.resize(false, false, options);
            let scaleMultiplierX = _self.fabricJS.width / options.width,
                scaleMultiplierY = _self.fabricJS.height / options.height,
                outs = [], groups = [];
            for (let itm = 0, maxL = o.length; itm < maxL; itm++) {
                let cur = o[itm];
                if (cur.type == _self.shapes.POLYGON) {
                    let center = cur.getCenterPoint(),
                        _points = [],
                        points0 = cur.get('points'),
                        _p = points0.concat([]).map((el, d)=> {

                            cur.left = cur.top = 0;
                            cur.scaleX = cur.scaleY = 1;
                            let _pC = new fabric.Point(center.x + el.x * scaleMultiplierX, center.y + el.y * scaleMultiplierY);
                            if (_self.canEdit) {
                                let circle = new fabric.Circle(_self.settings.CIRCLE);
                                circle.left = _pC.x;
                                circle.top = _pC.y;
                                circle._iter = d;
                                circle.parent = cur;
                                _points.push(circle);
                            }
                            return _pC;
                        });
                    if (_points.length) cur.set('_points', _points);
                    cur.set('points', _p);
                    cur.set('points0', points0);
                    cur.set('_center', center);
                    outs.push(cur);
                } else if (cur.type == _self.shapes.GROUP) {
                    //_self.fabricJS._add(cur);
                    //parseAndInsert(cur._objects, options);
                }
                let orCloner,cloneCur   = cur._clone(true);
                orCloner = cloneCur;
                for (let u = 0; u < _objects.length; u++) {
                    if (cloneCur.id == _objects[u].id) {
                        let _c = _objects.splice(u, 1)[0];
                        if (_c.group) {
                            let _group;
                            for (let g = 0; g < groups.length; g++) {
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
                for (let i = 0, areas = _self.selected.areas; areas && i < areas.length; i++) {
                    if (areas[i]._id.match(cloneCur.id)) {
                        cloneCur._data = areas[i];
                        break;
                    }
                }
                for (let i = 0, sources = _self.glapp.preToolTip.dataElem; sources && i < sources.length; i++) {
                    if (sources[i]._id == cloneCur.id || (cloneCur._data && sources[i]._id == cloneCur._data.dataSourceId)) {
                        cloneCur._dataSource = sources[i];
                        break;
                    }
                }
                orCloner.opacity =   _self.canEdit ? _self.selected.camera.opacity : _self.defOpacity;
                if (!orCloner.defFill) orCloner.defFill = orCloner.fill;
                if (!orCloner.hoverFill)orCloner.hoverFill = cloneCur._data && cloneCur._data.areas && cloneCur._data.areas.length ?_self.COLORS[0]:_self.COLORS[1];
                if (!cloneCur._tooltip && cloneCur.type == _self.shapes.POLYGON)cloneCur._tooltip = new OxiToolTip(cloneCur, _self.glapp.app);
            }
            for (let g = 0; g < groups.length; g++) {
                let _n = groups[g].make();
                for (let f = 0, args = ['_data', '_dataSource', 'id']; f < args.length; f++) {
                    _n[args[f]] = groups[g][args[f]];
                }
                _n._tooltip = new OxiToolTip(_n, _self.glapp.app);
            }
            this.fabricJS.calcOffset().renderAll();
        }
    }

    private updateImgZoomer(callback) {
        let _self = this;
        this.curImgBufferZoom.src = this.fabricJS.toDataURL();
        let _bCnvc = _self.bufferC['nativeElement'],
            _cnvs = _bCnvc.getContext('2d');
        _cnvs.drawImage(_self.glapp.app._slider.isDebug ? _self.glapp.app._slider.currentAlignFrame : _self.glapp.app._slider.currentFrame, 0, 0, _bCnvc.width, _bCnvc.height);
        _cnvs.drawImage(_self.curImgBufferZoom, 0, 0);
        _self.curImgZoom.src = _bCnvc.toDataURL();
        if (callback)callback();
    }

    private drawZoom(event) {
        this.showHelpZoomer = [this.MODES.EDIT, this.MODES.ADD].indexOf(this.mode) > -1 && this.selected.camera.showZoomHelper;
        if (!this.showHelpZoomer)return;
        let
            _deltaX = this.zoomDelta,
            _deltaY = _deltaX * this.curImgZoom.height / this.curImgZoom.width,
            zCnvs = this.zoomer['nativeElement'],
            _offset = event.e.target.getBoundingClientRect();
        this.updateImgZoomer(()=> {
            zCnvs.getContext('2d').drawImage(this.curImgZoom, event.e.clientX - _offset.left - _deltaX, event.e.clientY - _offset.top - _deltaY, 2 * _deltaX, 2 * _deltaY, 0, 0, zCnvs.width, zCnvs.height)
        });


    }

    private onLoadSVG() {
        let _self = this,
            fabricJS = this.fabricJS;

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
            fabricJS.on('mouse:wheel', (event)=> {
                this.zoomDelta += (event.e.deltaY || event.e.detail || event.e.wheelDelta) / 10;
                this.drawZoom(event);
                event.e.preventDefault();
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
                    this.currentShape._clone(true);
                    fabricJS.renderAll();
                }

                this.drawZoom(event);


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
                            //curActiv.get("_points").forEach((obj)=> {
                            //    obj.set('left', obj.left + x);
                            //    obj.set('top', obj.top + y);
                            //    obj.setCoords();
                            //});
                            break;
                        }
                        case 'circle':
                        {
                            let
                                _p = curActiv.parent.get('points');
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
                if (e.target._objects)e.target._objects.forEach((el:any)=> {
                    el.opacity = 1
                });
                this.currentShape = e.target;
                this.fabricJS.renderAll();
            });
            fabricJS.on('mouse:out', (e)=> {
                if (this.mode != this.MODES.NO || !e.target)return;
                this.currentShape = null;
                e.target.opacity = this.selected.camera.opacity;
                if (e.target._objects)e.target._objects.forEach((el:any)=> {
                    el.opacity = e.target.opacity
                });
                this.fabricJS.renderAll();
            });
        } else {
            fabricJS.on('mouse:over', (e)=> {
                if (!e.target)return;
                this.intersectingCheck(e.target, ()=> {
                    this.currentShape = e.target;
                    if (e.target.type == this.shapes.GROUP) {
                        let isGreen = e.target._data && e.target._data.areas && e.target._data.areas.length;
                        e.target._objects.forEach((el)=> {
                            if (!el.defFill)el.defFill = el.fill;
                            if (!el.hoverFill)el.hoverFill = isGreen ? _self.COLORS[0]:_self.COLORS[1];
                            el.set('fill', el.hoverFill);
                            el.set('opacity', this.selected.camera.opacity);
                        });

                    } else {
                        e.target.set('fill', e.target.hoverFill).set('opacity', this.selected.camera.opacity).setCoords();
                    }
                    if (e.target._tooltip)e.target._tooltip.show();
                    this.fabricJS.renderAll();
                });
            });
            fabricJS.on('mouse:out', (e)=> {
                if (!e.target)return;
                this.intersectingCheck(e.target, ()=> {
                    this.currentShape = null;
                    if (e.target._tooltip)e.target._tooltip.show(false);

                    if (e.target.type == this.shapes.GROUP) {
                        e.target._objects.forEach((el)=> {
                            el.set('fill', el.defFill);
                            el.set('opacity', _self.defOpacity);
                        })
                    } else {
                        e.target.set('fill', e.target.defFill);
                        e.target.set('opacity', _self.defOpacity);
                    }
                    this.fabricJS.renderAll();
                });

            });
            fabricJS.on('mouse:up', (e)=> {
                if (!e.target)return;
                if (e.target.click)e.target.click();
            });
        }
        fabricJS.on("after:render", function () {
            fabricJS.calcOffset();
        });
        setTimeout(()=> {
            if (this.glapp.app && this.glapp.app._events) this.glapp.app._events.onWindowResize();
            this.isFinish = true;
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
            this.toSVG();
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
        this.lastSelectedShape = null;
        if (e.button == 2) {
            if (this.mode == this.MODES.NO && this.currentShape) {
                this.glapp.app._projControls.showControls(e);
                this.lastSelectedShape = this.currentShape;
            } else {
                this.onFinishDraw();
            }

        }
    }

    private onFinishDraw() {
        if (this.currentShape && this.currentShape.type == this.shapes.POLYGON) {
            let points = this.currentShape.get('points');
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
    }

    resize(_w = null, _h = null, options:any = null) {
        if (!this.fabricJS)return;
        let _self = this;
        if (!_w && this.glapp.app._container)_w = this.glapp.app._container.clientWidth;
        if (!_h && this.glapp.app._container)_h = this.glapp.app._container.clientHeight;
        let scaleMultiplierX = _w / this.fabricJS.width,
            scaleMultiplierY = _h / this.fabricJS.height,
            scaleX0 = scaleMultiplierX,
            scaleY0 = scaleMultiplierY,
            objects = this.fabricJS._objects,
            prevW = this.fabricJS.width,
            prevH = this.fabricJS.height
            ;


        if (_w)this.fabricJS.setWidth(_w);
        if (_h)this.fabricJS.setHeight(_h);

        if (options) {
            scaleMultiplierX = this.fabricJS.width / options.width;
            scaleMultiplierY = this.fabricJS.height / options.height;
            objects = options.objects;
        } else {
            scaleX0 = _w / prevW;
            scaleY0 = _h / prevH;

        }
        this.resizeElements(objects, scaleX0, scaleY0, scaleMultiplierX, scaleMultiplierY);

        if (this.zoomer) {
            let _cnvs = this.zoomer['nativeElement'],
                _bCnvs = this.bufferC['nativeElement'];
            _bCnvs.width = _w;
            _bCnvs.height = _h;
            _cnvs.width = _w * 0.2;
            _cnvs.height = _h * 0.2;
            _cnvs.style.width = _w * 0.2 + 'px';
            _cnvs.style.height = _h * 0.2 + 'px';
        }
        this.fabricJS.calcOffset().renderAll();
    }

    private resizeElements(objects, scaleX0, scaleY0, scaleMultiplierX, scaleMultiplierY) {
        for (let i = 0, list = objects.concat([]); i < list.length; i++) {
            let cur = list[i];
            cur.scaleX0 = scaleX0;
            cur.scaleY0 = scaleY0;
            cur._hasUpdate = 0;
            cur.left *= scaleMultiplierX;
            cur.top *= scaleMultiplierY;
            if (cur.type != this.shapes.CIRCLE) {
                cur.scaleX *= scaleMultiplierX;
                cur.scaleY *= scaleMultiplierY;
            }

            if (cur._tooltip)cur._tooltip.show(false);
            if (this.isFinish) {
                if (cur.type == this.shapes.POLYGON) {
                    cur._clone();
                }
                else if (cur.type == this.shapes.GROUP) {
                    this.resizeElements(cur._objects, scaleX0, scaleY0, scaleMultiplierX, scaleMultiplierY);
                }

            }


        }
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

    private getBoundingBox(points) {

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
                        elem,
                        setAttr = function setAttr(elem) {
                            if (elem) {

                                if (elem === 2) {
                                    elem = {};
                                } else {
                                    if (parent) {
                                        parent._add(elem);
                                    } //else {
                                    //_self.fabricJS._add(elem);
                                    allElem.push(elem);
                                    //}
                                }

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
                                            let _f = ['left', "top", "scaleX", "scaleY"];
                                            cntn.split(" ").forEach((e:any, key)=> {
                                                if (!_f[key] || !e)return;
                                                elem[_f[key]] = /*(parent && key < 2 ? parent[_f[key]] : 0) +*/ parseFloat(e.replace(/[^-0-9.]/g, ""));
                                            });
                                            break;
                                        }
                                    }
                                }


                                if (!elem.id)elem.id = ENTITY.Config.randomstr();
                                elem.getBoundingBox();
                                return elem;


                            }
                        }

                    if (e.nodeName == _self.shapes.POLYGON) {
                        //let _elem = setAttr(2),
                        //    _pX = parent ? parent._left : 0,
                        //    _pY = parent ? parent._top : 0,
                        //    _cX = parent ? _elem._left : 0,
                        //    _cY = parent ? _elem._top : 0;

                        elem = new fabric.Polygon(e.attributes.points.textContent.split(" ").map((el)=> {
                            let _d = el.split(",");
                            if (_d.length < 2)return null;
                            return new fabric.Point(parseFloat(_d[0]), parseFloat(_d[1]));
                        }).filter((e)=> {
                            if (e)return e;
                        }), _self.settings.POLYGON);

                        setAttr(elem);

                    } else if (e.nodeName == 'g') {
                        elem = new fabric.Group();
                        if (e.childNodes.length) {

                            setAttr(elem);
                            parseDom(e, elem);
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

    private   intersectingCheck(activeObject, onSuccess) {
        activeObject.setCoords();
        if (typeof activeObject.refreshLast != 'boolean') {
            activeObject.refreshLast = true
        }
        ;

        //loop canvas objects
        activeObject.canvas.forEachObject(function (targ) {
            if (targ === activeObject) return; //bypass self

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
        if (onSuccess)onSuccess();

    }

}

class SVGGroup {
    group:Array<any>;
    editPoints:Array<any>;
    private id:any;
    private canvas:SVGView;
    private color:any;

    constructor(canvas:SVGView, id = ENTITY.Config.randomstr()) {
        this.group = [];//new fabric.Group({selectable: false});
        this.editPoints = [];
        this.canvas = canvas;
        this.id = id;
        //this.color = this.canvas.getRandomColor()
    }

    getScreenPst() {
        return {x: 0, y: 0};
    }

    add(element) {
        if (element && element.type == this.canvas.shapes.POLYGON) {
            if (!this.color)this.color = element.fill;
            element.fill = this.color;
            [element].concat(element.get('_points')).forEach((elem:any)=> {
                if (!elem)return;
                elem._parent.remove(elem);
                if (elem._dataSource)elem._dataSource.active = false;
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
        let group = new fabric.Group(this.childs(), this.canvas.settings.GROUP);
        group.set('id', this.id);
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
