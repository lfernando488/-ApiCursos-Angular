import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$ : Observable<Course[]> | null = null;

  constructor(private coursesService: CoursesService, public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.refresh();
  }

  refresh(){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos')
        return of([])
      })
    );
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data:  errorMsg
    })
  }

  ngOnInit(): void {}

  onAdd(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo:this.route})

  }

  onDelete(course: Course){

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: 'Tem certeza que deseja remover este curso?',
      });

      dialogRef.afterClosed().subscribe( (result: boolean) => {
        if(result){
          this.coursesService.remove(course._id).subscribe(
            () => {
              this.snackBar.open('Curso removido com sucesso', 'X',
                                  { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'}
              ),
              this.refresh();
            },
            () => this.onError('Não foi possivel remover o curso')
          );
        }
      })

  }

}
