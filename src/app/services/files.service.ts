import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  downloadURL: any;

  constructor() {
  }

  async saveImage(image: File, id_usuario: string) {

    let storage = getStorage()
    var filePath = `${image.name}_${new Date().getTime()}`;

    const imgRef = ref(storage, `images/${id_usuario}/${filePath}`);
    const snapshot = await uploadBytes(imgRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  saveImages(images: File[], id_usuario: string) {
    return Promise.all(
      images.map(image => this.saveImage(image, id_usuario))
    );
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
