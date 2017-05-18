import {Input,Component} from '@angular/core';
import {IProject} from "../../../../entities/entities";
import {ProjectService} from "../../../../services/project.service";

declare var alertify: any;

@Component({
    selector: 'app-project-view',
    templateUrl: './view.project.html',
    styleUrls: ['./view.project.sass']
})
export class ViewProject{
    @Input()  project:  IProject;
    @Input()  Editable: boolean;
    private openedPopUp: boolean = false;
    constructor(
        private projectService: ProjectService
    ){
        this.Editable = true;
    }

    openPopUp(event){
        event.preventDefault();
        event.stopPropagation();
        if(!this.Editable)
            return;

        //if(!this.openedPopUp)
            this.projectService.setProject(this.project);

        this.openedPopUp = !this.openedPopUp;
        return false;
    }

    deactivateProject(event) {
        event.preventDefault();
        event.stopPropagation();
        let id = this.project._id;
        let temp = {
            _id: id,
            published: !this.project.published
        };
        this.projectService.changeProject(temp);
        this.openedPopUp = !this.openedPopUp;
        return false;
    }

    deleteProject(event) {
        event.preventDefault();
        event.stopPropagation();

        this.projectService.deleteProject({_id:this.project._id});
        this.openedPopUp = !this.openedPopUp;
        return false;
    }
    openUrl(){
        console.log('tet');
    }
}