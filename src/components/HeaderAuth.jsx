import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function SignUpButton() {
  const clerk = useClerk();

  return (
    <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>
      Sign up
    </button>
  );
}

function SignInButton() {
  const clerk = useClerk();

  return (
    <button className="sign-in-btn" onClick={() => clerk.openSignIn({})}>
      Sign in
    </button>
  );
}

function HeaderAuth() {
  return (
    <header>
      <nav>
        <SignedOut>
          <ul>
            <li>
              <SignUpButton />
            </li>
            <li>
              <SignInButton />
            </li>
          </ul>
        </SignedOut>

        <SignedIn>
          <ul>
            <li>
              <UserButton afterSignOutUrl="/" />
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
        </SignedIn>
      </nav>
    </header>
  );
}

export default HeaderAuth;
