export class BookModel {
  id: number;
  authorId: number;
  title: string;
  description: string;

  public constructor(id: number) {
    this.id = id;
  }

  public withTitle(title: string): BookModel {
    this.title = title;
    return this;
  }

  public withAuthorId(authorId: number): BookModel {
    this.authorId = authorId;
    return this;
  }

  public withDescription(description: string): BookModel {
    this.description = description;
    return this;
  }
}
