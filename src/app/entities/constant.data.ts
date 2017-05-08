export class Config {
    static SITE_STRUCTURE:string = '/site_structure.json';
    static PROJ_LOC:string = 'uploads/projects/';
    static PROJ_DESTINATION:any ={
        JS_CODE:0,
        LINK_REMOTE:1,
        MODEL_OBJ:2,
    };
    static EVENTS_NAME = {
        CLICK: 'click',
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup'
    };

}
export class ProjClasses {
    static IMG_SLIDER:string = 'img-slider-container';
    static CENTER_CONTAINER:string = 'center-container';
    static PROJ_CONTROLS:string = 'oxi-controls';
    static ACTIVE:string = 'active';

}
export enum Configs{
}
