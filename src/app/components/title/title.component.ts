import { Component, Input } from '@angular/core';
import { ISubTitle } from 'src/app/core/models/subTitle.model';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() title = 'default title !';
  @Input() subTitles: ISubTitle[] = [];
}
