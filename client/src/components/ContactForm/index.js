import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Contact from "services/Contact";
import { useState } from "react";

const ContactForm = ({ propertyId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameHasError, setNameHasError] = useState(false);
  const [phoneHasError, setPhoneHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [messageHasError, setMessageHasError] = useState(false);

  const handleChange = (e, setField) => {
    setField(e.target.value);
  };

  const sendMessage = async () => {
    await Contact.sendMessage({
      name: name,
      phone: phone,
      email: email,
      property_id: propertyId,
      message: message,
      source: "lastradev.com",
    });
  };

  const validateForm = () => {
    setNameHasError(name === "");
    setPhoneHasError(phone === "");
    setEmailHasError(email === "");
    setMessageHasError(message === "");
  };

  const handleSubmit = () => {
    validateForm();
    if (name === "" || phone === "" || email === "" || message === "") {
      return;
    }
    sendMessage();
  };

  return (
    <Box mt={8} sx={{ width: 600, maxWidth: "100%" }}>
      <Typography color="primary" variant="h4">
        Contact the propietary
      </Typography>
      <TextField
        margin="normal"
        error={nameHasError}
        fullWidth
        required
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => {
          handleChange(e, setName);
        }}
      />
      <TextField
        margin="normal"
        error={phoneHasError}
        fullWidth
        required
        id="outlined-basic"
        type="number"
        label="Phone"
        variant="outlined"
        onChange={(e) => {
          handleChange(e, setPhone);
        }}
      />
      <TextField
        margin="normal"
        error={emailHasError}
        fullWidth
        required
        id="outlined-basic"
        type="email"
        label="Email"
        variant="outlined"
        onChange={(e) => {
          handleChange(e, setEmail);
        }}
      />
      <TextField
        margin="normal"
        rows={6}
        error={messageHasError}
        fullWidth
        required
        multiline
        id="outlined-basic"
        label="Message"
        variant="outlined"
        onChange={(e) => {
          handleChange(e, setMessage);
        }}
      />
      <Box mt={1}>
        <Button onClick={handleSubmit} variant="contained" size="large">
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
