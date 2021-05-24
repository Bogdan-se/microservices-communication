export class Book {
  id: number;
  authorId: number;
  title: string;
  description: string;

  public constructor(id: number) {
    this.id = id;
  }

  public withTitle(title: string): Book {
    this.title = title;
    return this;
  }

  public withAuthorId(authorId: number): Book {
    this.authorId = authorId;
    return this;
  }

  public withDescription(description: string): Book {
    this.description = description;
    return this;
  }
}
