import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
    private debouncer: Subject<string> = new Subject<string>();

    @Input()
    public placeholder: string = '';

    @Output()
    public onValue = new EventEmitter<string>();
    //Otro evento
    @Output()
    public onDebounce = new EventEmitter<string>();

    public emitValue(value: string): void {
        this.onValue.emit(value);
    }

    public onKeyPress(searchTerm: string): void {
        this.debouncer.next(searchTerm);
    }

    ngOnInit(): void {
        this.debouncer.pipe(debounceTime(300)).subscribe((value) => {
            this.onDebounce.emit(value);
        });
    }
}
