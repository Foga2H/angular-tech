import { Inject, Injectable } from '@angular/core'
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

import { Article } from '../models/article';
import { Language } from '../models/language';

const ARTICLES_STORAGE_KEY = 'articles';
const LANGUAGES_STORAGE_KEY = 'languages';

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
        const articles = this.storage.get(ARTICLES_STORAGE_KEY) || [];

        return articles;
    }

    public getArticleContentByIdAndLanguage(id: number, language: Language) {
        const article = this.getArticleById(id);

        const content = article.content.filter((item) => { return item.language_id == language.id})[0];

        return content;
    }

    public storeArticleOnLocalStorage(article: Article): void {
        const currentData = this.getArticlesFromLocalStorage();

        if(!article.id) {
            article.id = currentData.length + 1;

            currentData.push(article);
        } else {
            
            for(let i = 0; i < currentData.length; i++) {
                if(article.id == currentData[i].id) {
                    currentData[i].content = article.content;
                }
            }
            
        }

        this.storage.set(ARTICLES_STORAGE_KEY, currentData);

        console.log(this.storage.get(ARTICLES_STORAGE_KEY) || 'Local storage is empty');
    }

    public getLanguageById(id: number): Language {
        const languages = this.getLanguagesFromLocalStorage();

        for(let i = 0; i < languages.length; i++) {
            if(id == languages[i].id) {
                return languages[i];
            }
        }

        return null;
    }

    public getLanguageIdByIndex(index: number) {
        const languages = this.getLanguagesFromLocalStorage();

        if(languages.length && languages[index]) {
            return languages[index].id;
        }

        return null;
    }

    public getArticleById(id: number): Article {
        const articles = this.getArticlesFromLocalStorage();

        for(let i = 0; i < articles.length; i++) {
            if(id == articles[i].id) {
                return articles[i];
            }
        }

        return null;
    }

    public removeArticleFromLocalStorage(article: Article): void {
        const articles = this.getArticlesFromLocalStorage();

        for(let i = 0; i < articles.length; i++) {
            if(article.id == articles[i].id) {
                articles.splice(i, 1);
            }
        }

        this.storage.set(ARTICLES_STORAGE_KEY, articles);
    }

    public storeLanguagesOnLocalStorage(languages: Language[]): void {
        const currentLanguages = this.storage.get(LANGUAGES_STORAGE_KEY) || [];

        for(let i = 0; i < languages.length; i++) {
            currentLanguages.push(languages[i]);
        }

        this.storage.set(LANGUAGES_STORAGE_KEY, currentLanguages);

        console.log(this.storage.get(LANGUAGES_STORAGE_KEY) || 'Local storage is empty');
    }

    public getLanguagesFromLocalStorage(): Language[] {
        const languages = this.storage.get(LANGUAGES_STORAGE_KEY) || [];

        return languages;
    }

    public getLanguageByCode(code: string): Language {
        const languages : Language[] = this.storage.get(LANGUAGES_STORAGE_KEY) || [];

        for(let i = 0; i < languages.length; i++) {
            if(languages[i].code == code) {
                return languages[i];
            }
        }

        return null;
    }
}