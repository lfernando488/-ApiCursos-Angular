import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['_id', 'name', 'category','actions'];

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAdd(){
    //this.router.navigate(['new'], {relativeTo:this.route})
    this.add.emit(true);
  }

  onEdit(course: Course){
    this.edit.emit(course);
  }

  onDelete(course: Course){
    this.delete.emit(course);
  }

}
