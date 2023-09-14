import { Component } from '@angular/core';
import { ContentModel } from '../../models/content';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent {
    contentdto = new ContentModel();

    constructor(private authservice: AuthService){
      
    }

    editContent(contentdto: ContentModel){
      return this.authservice.editContent(contentdto).subscribe()
      
      
    }
}


