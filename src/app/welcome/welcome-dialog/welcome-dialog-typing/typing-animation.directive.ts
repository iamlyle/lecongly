import {
    Directive, OnInit,
    ElementRef, Input, Inject, LOCALE_ID
} from "@angular/core";
import { Typed } from "./typed";

interface IPhrase {
    phrases: string[];
}

@Directive({
    selector: "[appTypingAnimation]"
})

export class TypingAnimationDirective implements OnInit {

    @Input() phrasePeriod: number;
    @Input() typeSpeed: number;
    @Input() startDelay: number;
    @Input() data: string[];

    typed: Typed;
    phrases: string[] = [];

    constructor (
        private elRef: ElementRef,
        @Inject(LOCALE_ID) public locale: string
    ) {}

    _flatMap = (f, xs) => xs.reduce((acc,x) => acc.concat(f(x)), []);

    ngOnInit () {

        const nestedArr: string[] = this.data;
        this.phrases = this.data;

        if(this.checkContent()) {
            this.createTyped();
        }
    }

    private checkContent() {
        return this.phrases.length > 0;
    }

    private createTyped () {
       this.typed = new Typed(
            this.elRef.nativeElement,
            {
                typeSpeed: this.typeSpeed,
                startDelay: this.startDelay,
                phrasePeriod: this.phrasePeriod
            },
            this.phrases
        );

        this.typed.begin();
    }
}
