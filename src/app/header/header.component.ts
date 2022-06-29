import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, LOCALE_ID, AfterViewInit, HostListener } from "@angular/core";
import { faBars, faShareAlt, faCloudDownloadAlt, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { NgNavigatorShareService } from "ng-navigator-share";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss", "./header.component.responsivity.scss"]
})

export class HeaderComponent implements OnInit, AfterViewInit {
  
  numberOfClicks = 0;

  // @HostListener('click', ['$event.target'])
  // onClick(btn_content) {
  //   console.log(btn_content,'button', 'number of clicks:', this.numberOfClicks++);
  // }

  private _activeSection: any;
  private _pageXOffset: any;
  private ngNavigatorShareService: NgNavigatorShareService;
  
  hasMenuToggled: boolean;
  faBars: IconDefinition;
  faShareAlt: IconDefinition;
  faCloudDownloadAlt: IconDefinition;

  @ViewChild("nav") nav: ElementRef;
  @ViewChild("shareBtn") shareBtn: ElementRef;



  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private renderer: Renderer2,
    ngNavigatorShareService: NgNavigatorShareService
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  // use getter setter to define the properties
  get activeSection(): any { 
    return this._activeSection;
  }
  
  get pageXOffset(): any { 
    return this._pageXOffset;
  }

  @Input()
  set pageXOffset(value: any) {
    this._pageXOffset = value;
    this.onDetectScreenSize();
  }

  @Input()
  set activeSection(value: any) {
    this._activeSection = value;
    //this.updateNavigation();
  }

  ngAfterViewInit() {    
      // Share button available only for browsers that do support it.
      if (this.ngNavigatorShareService.canShare()) {
        this.shareBtn.nativeElement.style.display = "block";
      }
  }

  ngOnInit(): void {
    this.faBars = faBars;
    this.faShareAlt = faShareAlt;
    this.faCloudDownloadAlt = faCloudDownloadAlt;
  }

  private updateNavigation() {

    if(this._activeSection && this.renderer) {
      
      // Remove any selected anchor
      const activePreviousElem = this.nav.nativeElement.querySelector("a.active");
      
      if(activePreviousElem) {
        this.renderer.removeClass(activePreviousElem, "active");
      }

      const targetElem = this.nav.nativeElement.querySelector(`a[href^="#${this._activeSection}"]`);
      if(targetElem) {
        this.renderer.addClass(targetElem, "active");
      }
    }
  }

  /*
   * For media types such as tablets and mobile devices, the nav-bar navigation should be
   * collapsed by default.
  */
  private onDetectScreenSize() {
    this.hasMenuToggled = this.pageXOffset > 1024;
  }

  onToggleBar() {
    this.hasMenuToggled = !this.hasMenuToggled;
  }

  resetMenu(classOfButton) {
    this.hasMenuToggled = this.pageXOffset > 1024;
    if(classOfButton){
      this.removeAllClass(['welcome', 'aboutme', 'experiences', 'posts', 'contact']);
      console.log('button', classOfButton, 'number of clicks:', this.numberOfClicks++);
      let element = document.querySelector('.' + classOfButton) as HTMLElement;
      element.classList.add('active');
    }

  }

  removeAllClass(classes: string[]){
    let element
    for (var value of classes){
      console.log(value);
      element = document.querySelector('.' + value) as HTMLElement;
      element.classList.remove('active');
      console.log(element);
    }

  }

  async share() {
    try{
      await this.ngNavigatorShareService.share({
        title: "My Profile - Le Cong Ly",
        text: "Hello, I'm a Embedded Developer with 2+ years of experience designing embedded and testing automotive projects. Find out more in my profile!",
        url: "https://iamlyle.github.io/lecongly/"
      });
    } catch(error) {
      console.log("You app is not shared, reason: ", error);
    }    
  }
}