import React, { useState } from "react";
import { signoutRedirect } from "../services/userService";
import { useSelector } from "react-redux";
import * as apiService from "../services/apiService";
import { prettifyJson } from "../utils/jsonUtils";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [data, setdata] = useState(null);
  function signOut() {
    signoutRedirect();
  }

  async function getDataFromApi() {
    const doughnuts = await apiService.getDataFromApi();
    setdata(doughnuts);
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Hello, {user.profile.given_name}.</p>
      <button className='button button-outline' onClick={() => getDataFromApi()}>
        Get Data
      </button>
      <button className='button button-clear' onClick={() => signOut()}>
        Sign Out
      </button>

      <pre>
        <code>{prettifyJson(data ? data : "No data from API yet")}</code>
      </pre>
    </div>
  );
}

export default Home;
