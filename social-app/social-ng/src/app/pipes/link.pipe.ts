import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, users?: any, user_ids?: any): any {
    const regex = /@\w+/gi;
    const result = value.match(regex);
    result.forEach(element => {
        element = element.slice(1, element.length);
      if (users.includes(element)) {
        const index = users.indexOf(element);
        const id = user_ids[index];
        value = value.replace('@' + element, `<a href="/${id}/profile">@${element}</a>`);
        console.log(value);
    }
  });
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
