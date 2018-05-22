import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'showNoName'
})
export class ShowNoNamePipe implements PipeTransform {

    transform(valueToShow: string, args?: any): string {
        if (valueToShow) {
            return (valueToShow.length > 0) ? valueToShow : "No name";
        }
        return "No name";
    }

}
