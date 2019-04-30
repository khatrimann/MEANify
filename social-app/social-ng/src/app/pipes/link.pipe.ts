import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const regex = /@\w+/gi;
    const result = value.match(regex);
    let res;
    result.forEach(element => {
        element = element.slice(1, element.length);
      if (args.includes(element)) {
        // value = value.replace(element, linkifyStr(element, { target: '_system' } ));
        value = linkifyStr(element, { target: '_system'});
        console.log(value);
        return value;
      }
    return value;
    });
    return value;
  }

}
