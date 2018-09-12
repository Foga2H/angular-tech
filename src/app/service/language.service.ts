import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

import { Language } from '../models/language';
import { LocalStorageService } from '../service/storage.service';

const LANGUAGE_STORAGE_KEY = 'language_id';

@Injectable()
export class LanguageService {
    currentLanguage : number;
    
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private storageService: LocalStorageService) {
        this.currentLanguage = this.getSelectedLanguage();
    }

    public getSelectedLanguage(): number {
        const language = this.storage.get(LANGUAGE_STORAGE_KEY) || null;

        if(!language) {
            this.storage.set(LANGUAGE_STORAGE_KEY, 0);

            return 0;
        }

        return language;
    }


    public changeLanguage(language : Language) {
        const languages =  this.storageService.getLanguagesFromLocalStorage();

        for(let i = 0; i < languages.length; i++) {
            if(language.id == languages[i].id) {
                this.storage.set(LANGUAGE_STORAGE_KEY, i);
                
                this.currentLanguage = i;
            }
        }
    }
}