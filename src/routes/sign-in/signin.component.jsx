
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn  = () => {
    
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
        
    }
    return (
        <div>
            <h1>This is Sign In page</h1>
            <button onClick={logGoogleUser}>Sign In Google Popup</button>
            <SignUpForm />
        </div>
    );
}
export default SignIn;