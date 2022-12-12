/* eslint-disable react-hooks/exhaustive-deps */

import {
  Card,
  FormElement,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";

import React, { FC, useState } from "react";
import { __get } from "../utils";

const headers = {
  accept: "application/json",
  authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
};

interface dataSchema {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [details, setDetails] = useState<dataSchema>({
    username: "",
    password: "",
  });

  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: string, inputKey: string): void => {
    setDetails({ ...details, [inputKey]: e });
    setErr("");
  };

  const fetchhandler = () => {
    if (details.username === "" || details.password === "")
      setErr("** All Fields are mandatory");
    else {
      setLoading(true);

      let url = new URL(`https://fbapi.sellernext.com/user/login`);

      let key: keyof typeof details;
      for (key in details) {
        url.searchParams.append(key, details[key]);
      }

      __get(url, headers)
        .then((data) => {
          if (data.success) {
            alert("Welcome admin");
          } else {
            setErr("** Invalid Details");
          }
        })
        .catch((e) => alert(e))
        .finally(() => setLoading(false));
    }
  };
 
  return (
    <div className="login-form">
      <Card
        primaryAction={{
          content: "Login",
          onClick: fetchhandler,
          type: "Primary",
          loading: loading,
        }}
      >
        <FormElement>
          <TextStyles
            alignment="left"
            fontweight="bold"
            headingTypes="LG-2.8"
            subheadingTypes="LG-2.5"
            textcolor="dark"
            type="Heading"
            utility="none"
          >
            Login Form
          </TextStyles>
          <TextField
            name="Username"
            onChange={(e) => handleChange(e, "username")}
            placeHolder="Username"
            value={details.username}
          />

          <TextField
            strength
            name="Password"
            onChange={(e) => handleChange(e, "password")}
            placeHolder="Password"
            type="password"
            value={details.password}
          />

          {err !== "" && (
            <TextStyles
              alignment="left"
              fontweight="bold"
              textcolor="negative"
              utility="none"
            >
              {err}
            </TextStyles>
          )}
        </FormElement>
      </Card>
    </div>
  );
};

export default Login;
