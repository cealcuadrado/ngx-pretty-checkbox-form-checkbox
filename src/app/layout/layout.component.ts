import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PrettyCheckBoxChange } from 'ngx-pretty-checkbox';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  numbers: any[] = [
    { id: 0, name: 'Cero', value: 'Cero' },
    { id: 1, name: 'Uno', value: 'Uno' },
    { id: 2, name: 'Dos', value: 'Dos' },
    { id: 3, name: 'Tres', value: 'Tres' },
  ];

  checkboxForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  foo(): void {
    console.log('foo()');
  }

  onCheckbox(foo: PrettyCheckBoxChange): void {
    console.log(foo.value);
    console.log(foo.checked);
    console.log(foo.event);
  }

  onCheckboxChange(event: PrettyCheckBoxChange): void {
    const name = event.value;
    const isChecked = event.checked;

    const numbers = (this.checkboxForm.controls.number as FormArray);

    if (isChecked) {
      numbers.push(new FormControl(name));
    } else {
      const index = numbers.controls.findIndex(x => x.value === name);
      numbers.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.checkboxForm = this.fb.group({
      number: this.fb.array(
        [], [this.notEmptyValidator()]
      )
    });
  }

  submitForm(): void {
    this.toastr.success(`Opciones seleccionadas: ${this.checkboxForm.value.number.toString()}`, 'Formulario enviado');
  }

  notEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const arrayEmpty = (value.length == 0);
      return arrayEmpty ? { arrayEmpty: true } : null;
    }
  }
}
