import { Component, OnInit } from '@angular/core';
import { faBlender } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faIcon = faBlender;
  constructor() { }

  ngOnInit(): void {
  }

}
