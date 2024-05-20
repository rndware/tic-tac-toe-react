import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Setup = () => (
  <div className="SetupPage">
    <Typography variant="h3" component="h1">
      Game Setup
    </Typography>
    <div>TO-DO: add user form to set: Name, age, player colour etc.</div>
    <div>
      <Link to="/game">Start Game</Link>
    </div>
  </div>
);

export default Setup;
