import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';


@Directive({
    selector: '[appLongPress]'
})
export class LongPressDirective {

    @Input() duration: number = 400;

    @Output() onLongPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();
    @Output() onSmallPress: EventEmitter<any> = new EventEmitter();

    private pressing: boolean;
    private longPressing: boolean;
    private timeout: any;
    private mouseX: number = 0;
    private mouseY: number = 0;

    @HostBinding('class.press')
    get press() {
        return this.pressing;
    }

    @HostBinding('class.longpress')
    get longPress() {
        return this.longPressing;
    }

    startPress(event) {
        event.preventDefault();

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

        this.pressing = true;
        this.longPressing = false;

        this.timeout = setTimeout(() => {
            this.longPressing = true;
            this.onLongPress.emit(event);
            this.loop(event);
        }, this.duration);

        this.loop(event);
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event) {
        this.startPress(event)
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
        // don't do right/middle clicks
        if (event.which !== 1) return;

        this.startPress(event)
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event) {
        if (this.pressing && !this.longPressing) {
            const xThres = Math.abs(event.clientX - this.mouseX) > 10;
            const yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event) {
        this.onTouchMove(event);
    };

    loop(event) {
        if (this.longPressing) {
            this.timeout = setTimeout(() => {
                this.onLongPressing.emit(event);
                this.loop(event);
            }, 50);
        }
    }

    endPress() {
        if (!this.longPressing) {
            this.onSmallPress.emit(true);
        }
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
        this.onLongPressEnd.emit(true);
    }

    @HostListener('touchend')
    onTouchUp() {
        this.endPress();
    }

    @HostListener('mouseup')
    onMouseUp() {
        this.endPress();
    }

}
