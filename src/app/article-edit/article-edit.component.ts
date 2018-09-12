import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';
import { NgForm } from '@angular/forms';
import { Article, ArticleContent } from '../models/article'
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../service/storage.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  articles : any = []; 
  languages : Language[]

  constructor(public storageService : LocalStorageService, private router: Router, private route: ActivatedRoute) {
    this.languages = this.storageService.getLanguagesFromLocalStorage();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    for(let language of this.languages) {
      this.articles[language.code] = this.storageService.getArticleContentByIdAndLanguage(id, language);
    }
  }

  onSave(form: NgForm) {
    const id = +this.route.snapshot.paramMap.get('id');

    let article = this.storageService.getArticleById(id);
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
