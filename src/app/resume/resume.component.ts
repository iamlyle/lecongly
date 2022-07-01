import { Component, OnInit, HostListener } from "@angular/core";
import { debounce } from "../core/utils";

@Component({
  selector: "app-resume",
  templateUrl: "./resume.component.html",
  styleUrls: ["./resume.component.css", "./resume.component.responsivity.css"]
})
export class ResumeComponent {

  isBackgrounded: boolean = true;
  activeSection: string;

  pageYOffset: number = 0;
  pageXOffset: number;

  constructor() {
    this.checkResize();
  }

  @HostListener("window:scroll")
  checkScroll() {
    this.pageYOffset = window.pageYOffset;
    this.isBackgrounded = this.pageYOffset >= 150;
  }

  @HostListener("window:resize")
  @debounce(25)
  checkResize() {
    this.pageXOffset = window.innerWidth;
  }

  @debounce(150)
  onViewport(isOnViewPort: any, element?: string) {
    this.activeSection = element;

  }
}
