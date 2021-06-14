export class AuthorModel {
  id: number;
  firstName: string;
  lastName: string;

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
}
