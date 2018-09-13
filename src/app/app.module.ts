import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { AppRoutingModule } from './/app-routing.module';
import { MaterialModule } from './material.module';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { LocalStorageService } from './service/storage.service';
import { LanguageService } from './service/language.service';
import { ArticleService } from './service/article.service';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    ArticleCreateComponent,
    ArticleEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    AppRoutingModule,
    MaterialModule,
    StorageServiceModule,
    FormsModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [LocalStorageService, LanguageService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
