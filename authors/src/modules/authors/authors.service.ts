import { Injectable } from '@nestjs/common';

import { Author } from './authors.type';
import { AuthorModel } from './authors.model';

@Injectable()
export class AuthorsService {
  private readonly authors: Map<number, Author>;
  private nextId = 1;

  constructor() {
    this.authors = new Map();
  }

  private getNextId() {
    return this.nextId++;
  }

  public getAuthors(): Author[] {
    return Array.from(this.authors.values());
  }

  public findById(id: number): Author {
    return this.authors.get(id);
  }

  public create(createAuthor: Partial<Author>): Author{
    const id = this.getNextId();

    const author = new AuthorModel(id)
        .withFirstName(createAuthor.firstName)
        .withLastName(createAuthor.lastName)
        .withAge(createAuthor.age)
        .withBiography(createAuthor.biography)
        .withNumberOfBooks(createAuthor.numberOfBooks);

    this.authors.set(
        id,
        author
    );

    return author;
  }
  public update(id: number, updateAuthor: Partial<Author>): Author{
    const author = {
      ...this.authors.get(id),
      ...updateAuthor
    };

    this.authors.set(
        id,
        author
    );

    return author;
  }

  public delete(id: number): void{
    this.authors.delete(id);
  }

  public increaseAuthorBooks(id): void{
    const author = this.authors.get(id);

    this.authors.set(
      id,
      {
        ...author,
        numberOfBooks: author.numberOfBooks + 1
      }
    );
  }

  public decreaseAuthorBooks(id): void{
    const author = this.authors.get(id);

    this.authors.set(
      id,
      {
        ...author,
        numberOfBooks: author.numberOfBooks - 1
      }
    );
  }
}
