import {Input,Component} from '@angular/core';
import * as PROJ from "../../../../entities/Project";
import {ProjectService} from "../../../../services/project.service";

declare var alertify: any;

@Component({
    selector: 'app-project-view',
    templateUrl: './view.project.html',
    styleUrls: ['./view.project.sass']
})
export class ViewProject{
    @Input()  project: PROJ.IProject;
    @Input()  Editable: boolean;
    private openedPopUp: boolean = false;
    constructor(
        private projectService: ProjectService
    ){
        this.Editable = true;
    }

    openPopUp(){
        if(!this.Editable)
            return;

        if(!this.openedPopUp)
            this.projectService.setProject(this.project);

        this.openedPopUp = !this.openedPopUp;
    }

    deactivateProject() {
        let id = this.project._id;
        let temp = {
            _id: id,
            published: !this.project.published
        };
        this.projectService.changeProject(temp);
    }

    deleteProject() {
        this.projectService.deleteProject(this.project);
    }
}