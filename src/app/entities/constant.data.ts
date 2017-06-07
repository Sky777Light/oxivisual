export class Config {
    static SITE_STRUCTURE:string = '/site_structure.json';
    static PROJ_LOC:string = 'uploads/projects/';
    static PROJ_DMNS:any = ["&", '='];
    static PROJ_DESTINATION:any = {
        GeneralStructure: 0,
        LinkGeneralStructure: 1,
        ModelStructure: 2,
        OxiCamera: 3,
        Vector3: 4,
        ProjFile: 5,
    };
    static EVENTS_NAME = {
        CNTXMENU: 'contextmenu',
        DB_CLICK: 'dblclick',
        SELECT_START: 'selectstart',
        CLICK: 'click',
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
        MOUSE_OUT: 'mouseout',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup'
    };
    static FILE = {
        TYPE: {
            MODEL_OBJ: 1,
            PREVIEW_IMG: 2,
            ALIGN_IMG: 3
        },
        STORAGE: {
            SITE_STRUCTURE: 'structure',
            MODEL_OBJ: 'model[]',
            PREVIEW_IMG: 'frames[]',
            ALIGN_IMG: 'alignFrames[]',
            PRELOADER: 'preloader[]',
            CONTROLS: 'controls[]',
            TOOLTIP: 'tooltip[]',
            SVG_FILE: 'svgs[]'
        },
        DIR: {
            DELIMETER: "/",
            PROJECT_PREVIEW: 'images/',
            PROJECT_ALIGN_IMG: 'align_images/',
            PROJECT_TEMPLATE: {
                NAME: 'assets/templates/',
                CSS: 'style.css',
                HTML: 'index.html',
                JS: 'index.js',
                TYPES: ['controls/', 'tooltip/', 'preloader/'],
                _TYPE: {
                    PRELOADER: 2,
                    TOOLTIP: 1,
                    CONTROLS: 0,
                }

            },
            PREVIEW: {
                LOW: 'low/',
                WEBP: 'webp/',
            }
        }

    };
    static PATTERNS:any = {
        URL:/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    };
    static IGNORE:string = 'ignore';
    static ANGLE_STEP:number = 10;
    static DYNAMIC_IJNECT:any = {
        PRELOADER: {
            HTML: './assets/defaults/preloader/index.html',
            CSS: './assets/defaults/preloader/style.css'
        }
    }

    static randomInteger(min=0, max=Date.now()) {
        return Math.round(min + Math.random() * (max - min))
    }
    static randomstr(){
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }


}
export class ProjClasses {
    static IMG_SLIDER:string = 'img-slider-container';
    static CENTER_CONTAINER:string = 'center-container';
    static PROJ_TOOLTIP_CONTAINER:string = 'tooltip-container';
    static PROJ_BACK_AREA:string = 'back-area';
    static PROJ_CONTROLS:string = 'oxi-controls';
    static PROJ_CONTROLS_MOVE:string = 'oxi-controls-move';
    static PROJ_CONTROLS_CONTAINER:string = 'oxi-controls-container';
    static PROJ_COMPASS:string = 'kompass';
    static PROJ_TOOLTIPS:any = {
        CONTAINER: 'tooltip-container',
        TOOLTIP: 'tooltip',
        HEADER: 'header',
        BODY: 'body',
    };
    static ACTIVE:string = 'active';

}
