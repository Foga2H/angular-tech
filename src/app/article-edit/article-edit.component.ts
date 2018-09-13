import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';
import { NgForm } from '@angular/forms';
import { Article, ArticleContent } from '../models/article'
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../service/storage.service';
import { ArticleService } from '../service/article.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  articles : any = []; 
  languages : Language[]

  constructor(
    private storageService: LocalStorageService,
    public articleService: ArticleService,
    private languageService: LanguageService,
    private router: Router, 
    private route: ActivatedRoute) {
    this.languages = this.storageService.getLanguagesFromLocalStorage();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    for(let language of this.languages) {
      this.articles[language.code] = this.articleService.getArticleContentByIdAndLanguage(id, language);
    }
  }

  onSave(form: NgForm) {
    const id = +this.route.snapshot.paramMap.get('id');

    let article = this.articleService.getArticleById(id);
    article.content = [];

    for(let languageKey in this.articles) {
        let content = new ArticleContent();

        content.description = this.articles[languageKey].description;
        content.title = this.articles[languageKey].title;
        content.language_id = this.languageService.getLanguageByCode(languageKey) ? this.languageService.getLanguageByCode(languageKey).id : null;

        article.content.push(content);
    }

    this.articleService.saveArticle(article);

    this.router.navigate(['/']);
  }

}
