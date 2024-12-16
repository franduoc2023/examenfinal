import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root',
})
export class RegistroService {
    private collectionName = 'usuarios';  

    constructor(private firestore: AngularFirestore) {}

     addUser(userData: any) {
        return this.firestore.collection(this.collectionName).add(userData);
    }

  

}


// metodo viejo , este no resulto dividir uno a uno segun fuera post delete etc