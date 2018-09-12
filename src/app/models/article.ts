export class Article {
    id: number;
    content: ArticleContent[]
}

export class ArticleContent {
    language_id: number;
    title: string;
    description: string;
}