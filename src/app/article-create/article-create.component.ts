import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from '../service/storage.service';
import { Language } from '../models/language';
import { Article, ArticleContent } from '../models/article'
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})

export class ArticleCreateComponent implements OnInit {

  articles : any = []; 
  languages : Language[]

  constructor(public storageService : LocalStorageService, private router: Router) {
    this.languages = this.storageService.getLanguagesFromLocalStorage();
  }

  ngOnInit() {
    for(let language of this.languages) {
      this.articles[language.code] = new ArticleContent();
    }
  }

  onCreate(form: NgForm) {
    let article = new Article();
    article.content = [];

    for(let languageKey in this.articles) {
        let content = new ArticleContent();

        content.description = this.articles[languageKey].description;
        content.title = this.articles[languageKey].title;
        content.language_id = this.storageService.getLanguageByCode(languageKey) ? this.storageService.getLanguageByCode(languageKey).id : null;

        article.content.push(content);
    }

    this.storageService.storeArticleOnLocalStorage(article);

    this.router.navigate(['/']);
  }

}
