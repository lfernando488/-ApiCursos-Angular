import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['',[Validators.required]],
    status: ['',[Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder, private courseService: CoursesService,
              private snackBar: MatSnackBar, private location: Location,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({_id: course._id, name: course.name, category: course.category, status: course.status});
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

  public getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `O tamanho minimo deve ser de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `O tamanho maximo deve ser de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido';
  }
}
