import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private courseService: CoursesService,
              private snackBar: MatSnackBar, private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.courseService.save(this.form.value).subscribe(
      result => {
        this.onSuccess();
        this.onCancel();
      },
      error => {
        this.onError();
      }
    );
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso', '', {duration: 3000,})
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso', '', {duration: 3000,})
  }

  onCancel(){
    this.location.back();
  }

}
