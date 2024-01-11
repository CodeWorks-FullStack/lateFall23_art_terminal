export class Account {
  constructor (data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed

    this.bio = data.bio
    this.graduated = data.graduated
    this.github = data.github
    this.coverImg = data.coverImg
  }
}
