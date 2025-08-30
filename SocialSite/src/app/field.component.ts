import { Component, ContentChild, ViewChild, OnInit } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material';


@Component({
    selector: 'app-mat-field',
    template: `
    <div class="form-control">
      <ng-content></ng-content>
      <div>
       
      </div>
    </div>
  `
})
export class FieldComponent implements OnInit {
    @ContentChild(MatFormFieldControl) _control: MatFormFieldControl<any>;
    @ViewChild(MatFormField) _matFormField: MatFormField;

    ngOnInit() {
        this._matFormField._control = this._control;
    }
}
