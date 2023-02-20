import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        //first(),
        //delay(3000),
        //tap(courses => console.log(courses))
      );
  }

  save(course: Partial<Course>){
    if(course._id){
      return this.update(course);
    }
    return this.create(course);
  }

  findById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  private create(course: Partial<Course>){
    return this.httpClient.post<Course>(this.API, course).pipe(first());
  }

  private update(course: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course).pipe(first())
  }

}
