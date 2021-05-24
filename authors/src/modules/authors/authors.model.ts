export class AuthorModel {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  biography: string;
  numberOfBooks: number;

  constructor(id: number) {
    this.id = id;
  }

  public withFirstName(firstName: string): AuthorModel {
    this.firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): AuthorModel {
    this.lastName = lastName;
    return this;
  }

  public withAge(age: number): AuthorModel {
    this.age = age;
    return this;
  }

  public withBiography(bio: string): AuthorModel {
    this.biography = bio;
    return this;
  }

  public withNumberOfBooks(num: number): AuthorModel {
    this.numberOfBooks = num;
    return this;
  }
}
