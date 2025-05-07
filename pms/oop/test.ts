class MySQLUserRepo {
   save(user: User) {}
}
class User {}
class UserService {
   private userRepo = new MySQLUserRepo(); //hardcoded dependency
    
   saveUser(user: User) {
      this.userRepo.save(user); //tightly coupled to MySQL
   }
}
