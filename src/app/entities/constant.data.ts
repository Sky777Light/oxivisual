export class Config {
    static SITE_STRUCTURE:string = '/site_structure.json';
    static PROJ_LOC:string = 'uploads/projects/';
    static PROJ_DMNS:any = ["&",'='];
    static PROJ_DESTINATION:any ={
        GeneralStructure:0,
        LinkGeneralStructure:1,
        ModelStructure:2,
        OxiCamera:3,
        Vector3:4,
    };
    static EVENTS_NAME = {
        CLICK: 'click',
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
        MOUSE_OUT: 'mouseout',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup'
    };

}
export class ProjClasses {
    static IMG_SLIDER:string = 'img-slider-container';
    static CENTER_CONTAINER:string = 'center-container';
    static PROJ_CONTROLS:string = 'oxi-controls';
    static PROJ_CONTROLS_MOVE:string = 'oxi-controls-move';
    static PROJ_TOOLTIPS:any = {
        CONTAINER:'oxi-tooltips',
        TOOLTIP:'tooltip',
        HEADER:'header',
        BODY:'body',
    };
    static ACTIVE:string = 'active';

}
