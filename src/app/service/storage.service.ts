import { Inject, Injectable } from '@angular/core'
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

import { Article } from '../models/article';
import { Language } from '../models/language';

const ARTICLES_STORAGE_KEY = 'articles';
const LANGUAGES_STORAGE_KEY = 'languages';
const LANGUAGE_STORAGE_KEY = 'language_id';

@Injectable()
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
        let languages = this.getLanguagesFromLocalStorage();

        if(!languages.length) {
            let languagesArray = [
                {
                    id: 1,
                    name: 'Русский',
                    code: 'ru',
                },
                {
                    id: 2,
                    name: 'English',
                    code: 'en',
                },
                {
                    id: 3,
                    name: 'French',
                    code: 'fr'
                }
            ];

            this.storeLanguagesOnLocalStorage(languagesArray as Language[]);
        }
    }

    public getArticlesFromLocalStorage(): Article[] {
        const articles = this.storage.get(ARTICLES_STORAGE_KEY) || null;

        if(!articles) {
            this.storeArticlesOnLocalStorage([]);
        }

        return articles;
    }

    public storeArticlesOnLocalStorage(articles: Article[]): void {
        this.storage.set(ARTICLES_STORAGE_KEY, articles);

        console.log(this.storage.get(ARTICLES_STORAGE_KEY) || 'Local storage is empty');
    }

    public storeLanguagesOnLocalStorage(languages: Language[]): void {
        const currentLanguages = this.storage.get(LANGUAGES_STORAGE_KEY) || [];

        languages.forEach((language) => {
            currentLanguages.push(language);
        });

        this.storage.set(LANGUAGES_STORAGE_KEY, currentLanguages);

        console.log(this.storage.get(LANGUAGES_STORAGE_KEY) || 'Local storage is empty');
    }

    public getLanguagesFromLocalStorage(): Language[] {
        const languages = this.storage.get(LANGUAGES_STORAGE_KEY) || [];

        return languages;
    }

    public getLanguageIdFromLocalStorage(): number {
        const language = this.storage.get(LANGUAGE_STORAGE_KEY) || null;

        if(!language) {
            this.storage.set(LANGUAGE_STORAGE_KEY, 1);
        }

        return language;
    }

    public storeLanguageOnLocalStorage(language: Language): void {
        this.storage.set(LANGUAGE_STORAGE_KEY, language.id);

        console.log(this.storage.get(LANGUAGE_STORAGE_KEY) || 'Local storage is empty');
    }
}