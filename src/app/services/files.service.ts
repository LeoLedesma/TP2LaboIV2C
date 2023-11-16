import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  downloadURL: any;

  constructor(){    
  }

  saveImage(image: File, uidUsuario:string) {

    let storage =getStorage()
    var filePath = `${image.name}_${new Date().getTime()}`;

    const imgRef = ref(storage, `images/${uidUsuario}/${filePath}`);

    return uploadBytes(imgRef, image)
  }

  saveImages(images:File[], uidUsuario:string){
    images.forEach(img => this.saveImage(img, uidUsuario))
  }

  async getImagesById(uid: string): Promise<string[]> {
    const urls: string[] = [];
    const imagesRef = ref(getStorage(), `images/${uid}`);

    const result = await listAll(imagesRef);

    for (const item of result.items) {
      const downloadURL = await getDownloadURL(item);
      urls.push(downloadURL);
    }

    return urls;
  }
}
