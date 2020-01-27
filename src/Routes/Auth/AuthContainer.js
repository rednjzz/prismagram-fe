import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const [createAccount] = useMutation(CREATE_ACCOUNT, {
  variables: {
      email: email.value,
      username: username.value,
      firsName: firstName.value,
      lastName: lastName.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const requestSecret_data  = await requestSecret();
          console.log(requestSecret_data.data.requestSecret);
          if (!requestSecret_data.data.requestSecret) {
            toast.error("You dont have an account yet, create one");
            setTimeout( () => setAction("signUp", 3000));
          }
        }
        catch {
          toast.error("Cant request secret, try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const createAccount_data = await createAccount();
          console.log(createAccount_data.data.createAccount)
          if (!createAccount_data.data.createAccount) {
            toast.error("Cant create Account");
          } else {
            toast.success("Account created Log In now");
            setTimeout( () => setAction("login"), 3000);
          }
        } catch(e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
    />
  );
};