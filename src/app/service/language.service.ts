import { Inject, Injectable } from '@angular/core';

import { Language } from '../models/language';
import { LocalStorageService } from '../service/storage.service';

@Injectable()
export class LanguageService {
    currentLanguage : number;
    languages: Language[];
    
    constructor(private storageService: LocalStorageService) {
        this.currentLanguage = this.getSelectedLanguage();

        this.languages = this.getLanguages();
    }

    public getLanguages(): Language[] {
        const languages = this.storageService.getLanguagesFromLocalStorage();
        
        return languages;
    }

    public getSelectedLanguage(): number {
        const language = this.storageService.getLanguageIdFromLocalStorage();

        return language;
    }

    public changeLanguage(language : Language) {
        this.languages.forEach((languageItem) => {
            if(language.id == languageItem.id) {
                this.storageService.storeLanguageOnLocalStorage(language);
                
                this.currentLanguage = this.getSelectedLanguage();
            }
        });
    }

    public getLanguageById(id: number): Language {
        const language = this.languages.find((language) => {
            return language.id == id;
        });

        return language;
    }

    public getLanguageByCode(code: string): Language {
        const language = this.languages.find((language) => {
            return language.code == code;
        });

        return language;
    }
}