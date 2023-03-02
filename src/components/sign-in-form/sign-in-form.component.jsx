import { useContext, useState } from "react";
import Button from "../button/button.component";
import {
  auth,
  createUserAuthWithEmailandPassword,
  signUserAuthWithEmailandPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/context.user";

const defautFormState = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defautFormState);
  const { email, password } = formField;
  const {setCurrentUser} = useContext(UserContext);
  const resetFormFields = () => {
    setFormField(defautFormState);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user}  = await signUserAuthWithEmailandPassword(email,password)
      setCurrentUser(user)
      resetFormFields();
    } catch (error) {
      switch(error.code){
        case "auth/wrong-password":
          alert("OOPS! Incorrect Password");
          break;
        case "auth/user-not-found":
          alert("OOPS! User not found")
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const SigninWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form action="POST" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          required
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          required
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button buttonType={"invert"} type="submit">
            Sign In
          </Button>
          <Button type="button" onClick={SigninWithGoogle} buttonType={"google"}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
