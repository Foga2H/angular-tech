import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../models/article';
import { LocalStorageService } from '../service/storage.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

  article : Article;

  constructor(
    private route: ActivatedRoute,
    private storageService: LocalStorageService,
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.getArticle();

    if(!this.article) {
      this.router.navigate(['/']);
    }
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.article = this.storageService.getArticleById(id);
  }

}
