import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const IMG_PATH = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if (!img) {
      return './../../assets/images/no-image-banner.jpg';
    }

    const imgUrl = `${IMG_PATH}/${size}${img}`;
    return imgUrl;
  }

}
