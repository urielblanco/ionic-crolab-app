import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'even',
  pure: false
})
export class EvenPipe implements PipeTransform {

  transform(arr: any[]): any[] {

    const even = arr.reduce((accumulator, currentValue, index, source) => {
      if (index % 2 === 0) {
        accumulator.push(source.slice(index, index + 2));
      }

      return accumulator;
    }, []);

    return even;
  }
}
