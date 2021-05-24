export class Author {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  biography: string;
  numberOfBooks: number;

  constructor(id: number) {
    this.id = id;
  }

  public withFirstName(firstName: string): Author {
    firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): Author {
    this.lastName = lastName;
    return this;
  }

  public withAge(age: number): Author {
    this.age = age;
    return this;
  }

  public withBiography(bio: string): Author {
    this.biography = bio;
    return this;
  }

  public withNumberOfBooks(num: number): Author {
    this.numberOfBooks = num;
    return this;
  }
}
