import React, { useState, useContext } from "react";
import Context from "../Context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(Context);

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) alert("Login failed");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Email</label>
        <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="button is-primary" type="submit">Login</button>
    </form>
  );
}

export default Login;