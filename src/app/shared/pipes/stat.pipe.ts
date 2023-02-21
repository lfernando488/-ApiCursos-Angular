import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stat'
})
export class StatPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'Active' : return 'done';
      case 'Inactive' : return 'block';
    }
    return 'done';
  }

}
