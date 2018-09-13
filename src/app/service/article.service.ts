import { Injectable } from '@angular/core';

import { Article, ArticleContent } from '../models/article';
import { Language } from '../models/language';
import { LocalStorageService } from './storage.service';

@Injectable()
export class ArticleService {

    articles : Article[];

    constructor(private storageService: LocalStorageService) {
        this.articles = this.getArticles();
    }

    public getArticles() : Article[] {
        const articles = this.storageService.getArticlesFromLocalStorage();

        return articles;
    }

    public getArticleContentByLanguage(id: number, languageId: number) {
        const article = this.getArticleById(id);
        const articleContent = new ArticleContent();

        article.content.forEach((content) => {
            if(content.language_id == languageId) {
                articleContent.language_id = languageId;
                articleContent.title = content.title;
                articleContent.description = content.description;
            }
        });

        return articleContent;
    }

    public getArticleContentByIdAndLanguage(id: number, language: Language) {
        const article = this.getArticleById(id);
        
        const content = article.content.find((articleItem) => {
            return articleItem.language_id == language.id;
        });

        return content;
    }

    public saveArticle(article: Article): void {
        const newArticles = this.articles;

        if(!article.id) {
            article.id = newArticles.length + 1;

            newArticles.push(article);
        } else {

            newArticles.forEach((newArticle, index) => {
                if(article.id == newArticle.id) {
                    newArticle.content = article.content;
                }
            });
            
        }

        this.storageService.storeArticlesOnLocalStorage(newArticles);

        this.getArticles();
    }

    public getArticleById(id: number): Article {
        const article : Article = this.articles.find((article) => {
            return id == article.id;
        });

        return article;
    }

    public removeArticle(article: Article): void {
        const newArticles = this.articles;

        newArticles.forEach((newArticle, index) => {
            if(article.id == newArticle.id) {
                newArticles.splice(index, 1);
            }
        })

        this.storageService.storeArticlesOnLocalStorage(newArticles);

        this.getArticles();
    }
}