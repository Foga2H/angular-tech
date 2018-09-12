import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { LocalStorageService } from '../service/storage.service';
import { LanguageService } from '../service/language.service';
import { Language } from '../models/language';

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

  constructor(private storageService: LocalStorageService, private languageService: LanguageService) { 
    this.getArticles();
    
    this.languages = storageService.getLanguagesFromLocalStorage();
    this.selectedLanguageId = storageService.getLanguageIdByIndex(languageService.getSelectedLanguage());
  }

  ngOnInit() {
  }

  onLanguageSelect(language : Language) {
    this.languageService.changeLanguage(language);

    this.getArticles();
  }

  deleteArticle(article: Article) {
    this.storageService.removeArticleFromLocalStorage(article);

    this.getArticles();
  }

  getArticles() : void {
    this.articles = this.storageService.getArticlesFromLocalStorage();
  }

}
