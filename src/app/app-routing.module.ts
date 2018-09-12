import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

const routes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'articles/create', component: ArticleCreateComponent},
  { path: 'articles/edit/:id', component: ArticleEditComponent},
  { path: 'articles/:id', component: ArticleDetailComponent},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
