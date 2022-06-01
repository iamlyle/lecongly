import { Component, HostListener, OnInit } from '@angular/core';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faIcon = faHatCowboy;
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    let nav_e = document.querySelector('.nav') as HTMLElement;
    if (window.pageYOffset > nav_e.clientHeight){
      nav_e.classList.add('navbar-dark', 'bg-dark', 'fa-inverse');
    } else {
      nav_e.classList.remove('navbar-dark', 'bg-dark', 'fa-inverse');
    }
  }
}
