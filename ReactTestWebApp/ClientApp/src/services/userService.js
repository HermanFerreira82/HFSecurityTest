import { UserManager } from "oidc-client";
import { storeUserError, storeUser } from "../actions/authActions";

const config = {
  authority: "https://localhost:44350",
  client_id: "ReactTestWebApp",
  redirect_uri: "https://localhost:44335/signin-oidc",
  response_type: "code",
  scope: "openid profile api1",
  post_logout_redirect_uri: "https://localhost:44335/signout-oidc",
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = new UserManager(config);

export async function loadUserFromStorage(store) {
  try {
    let user = await userManager.getUser();
    if (!user) {
      return store.dispatch(storeUserError());
    }
    store.dispatch(storeUser(user));
  } catch (e) {
    console.error(`User not found: ${e}`);
    store.dispatch(storeUserError());
  }
}

export function signinRedirect() {
  return userManager.signinRedirect();
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
}

export default userManager;
