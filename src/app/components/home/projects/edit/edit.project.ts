import {Input,Component, HostListener} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import {Resol} from "../../../../interfaces/resol.interface";
import {IMain} from "../../../../interfaces/IMain";
import {IProject,Project} from "../../../../entities/entities";
import {ShareService} from "../../../../services/share.service";

@Component({
    selector: 'app-project-edit',
    templateUrl: './edit.project.html',
    styleUrls: ['./edit.project.sass']
})
export class EditProject {

    @Input() project:IProject;
    @Input()  title:string;

    private user:User;


    private resol:Resol = {
        title: true,
        link: true
    };

    constructor(protected userService:UserService,
                protected shareService:ShareService) {
        this.user = this.userService.getUser();
        this.project = new Project();
    }


//photo change
    loadPhoto($event) {
        let fr = new FileReader();
        try {
            fr['readAsDataURL']($event.target.files[0]);
            fr.onload = ()=> {
                this.project.image = fr.result;
            };
        } catch (err) {
            console.log('load photo err: ', err);
        }
    }

    removePhoto() {
        this.project.image = '';
    }

    //user save accept/cancel
    @HostListener('window:keydown', ['$event'])
    keyDown(event:KeyboardEvent) {
        if (event.keyCode == 13) {
            this.accept();
        } else if (event.keyCode == 27) {
            this.cancel();
        }
    }

    accept() {
        if (!this.userService.resolUser(this.resol, this.project)) return false;
        this.project.newProject = true;
        this.shareService.changeShareSubject(this.project);
    }

    cancel() {
        this.project.newProject = false;
        this.shareService.changeShareSubject(this.project);
    }

}
