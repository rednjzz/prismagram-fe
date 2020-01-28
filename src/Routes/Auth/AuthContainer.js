import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { 
  LOG_IN, 
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";


export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
  variables: {
      email: email.value,
      username: username.value,
      firsName: firstName.value,
      lastName: lastName.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  })
  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {data:{requestSecret}}  = await requestSecretMutation();
          // console.log(requestSecret);
          if (!requestSecret) {
            toast.error("You dont have an account yet, create one");
            setTimeout( () => setAction("signUp", 3000));
          } else {
            toast.success("Check your inbox for your login secret");
            setAction("confirm");
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
          const {data:{createAccount}} = await createAccountMutation();
          if (!createAccount) {
            toast.error("이미 존재하는 계정, 계정을 생성할수 없습니다");
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
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {data:{ confirmSecret: token}} = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLoginMutation({ variables: { token }});
          } else {
            throw Error();
          }
        } catch (e){
          toast.error("cant confirm secret, check again");
        }
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
      secret={secret}
    />
  );
};