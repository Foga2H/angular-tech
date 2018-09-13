import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../models/article';
import { LanguageService } from '../service/language.service';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

  article : Article;
  selectedLanguageId : Number;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private languageService: LanguageService
  ) {

    this.selectedLanguageId = languageService.getLanguageById(languageService.getSelectedLanguage()).id;
   }

  ngOnInit() {
    this.getArticle();

    if(!this.article) {
      this.router.navigate(['/']);
    }
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.article = this.articleService.getArticleById(id);
  }

}
