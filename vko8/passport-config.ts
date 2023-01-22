import passport from "passport";
import passportLocal, { IVerifyOptions } from "passport-local";
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;

function initialize(
  passport: passport.PassportStatic,
  getUserByUsername: Function,
  getUserById: Function
) {
  const authenticateUser = async (
    username: string,
    password: string,
    done: (
      error: any,
      user?: Express.User | false,
      options?: IVerifyOptions
    ) => void
  ) => {
    const user = getUserByUsername(username);
    if (user == null) {
      console.log("User not found");
      return done(null, false);
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("user: " + user.username + " logged in!");
        return done(null, user);
      } else {
        console.log("Password incorrect");
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));

  //https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
  type User = {
    id?: number;
  };
  passport.serializeUser((user: User, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
