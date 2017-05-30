import {Input,ViewChild,Component,OnInit,OnChanges,EventEmitter,Injectable} from '@angular/core';
import * as ENTITY from '../../../entities/entities';
import {AbstractChangesView} from '../abstract.changes.view';

declare var alertify:any;


@Component({
    selector: 'app-project-webgl-controls',
    templateUrl: './controls.html',
    styleUrls: ['./controls.sass']
})
export class WControls extends AbstractChangesView implements OnInit {
    constructor() {
        super();
    }
}

