import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { LocalStorageService } from '../service/storage.service';
import { LanguageService } from '../service/language.service';
import { Language } from '../models/language';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {

  title = 'Articles list';
  articles : Article[];
  languages: Language[];
  selectedLanguageId: number;
  breakpoint: number;

  constructor(
    private articleService: ArticleService,
    private languageService: LanguageService) {
      
    this.articles = this.articleService.getArticles();
    this.languages = languageService.getLanguages();
    this.selectedLanguageId = languageService.getSelectedLanguage();
  }

  ngOnInit() {
    this.onResponsiveItems(window.innerWidth);
  }

  onResize(event) {
    this.onResponsiveItems(event.target.innerWidth);
  }

  onResponsiveItems(width: number) {
    let itemsCount = 3;

    if(width <= 400) {
      itemsCount = 1
    } else if(width >= 400 && width <= 800) {
      itemsCount = 2
    }

    this.breakpoint = itemsCount;
  }

  onLanguageSelect(language : Language) {
    this.languageService.changeLanguage(language);
  }

  deleteArticle(article: Article) {
    this.articleService.removeArticle(article);

    this.articles = this.articleService.getArticles();
  }

}
