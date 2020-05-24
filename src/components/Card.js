import React from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import { caesarCipher, bifidEncode, bifidDecode } from "../cripto";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "criptare",
      hasFile: false,
      key1: "",
      key2: "",
    };
  }
  fileReader;

  //functia se apeleaza in momentul in care se apasa pe buton. se fac validarile pentru chei
  handleCipherButton = (e) => {
    const letters = /^[A-Za-z]+$/;
    const numbers = /^[0-9]+$/;
    const key1 = this.state.key1;
    const key2 = this.state.key2;
    if (!key1.match(numbers)) {
      alert("Cheia pentru cifrul 1 trebuie sa fie un numar natural");
      return;
    }
    if (!key2.match(letters)) {
      alert("Cheia pentru cifrul 2 trebuie sa contina doar litere");
      return;
    }
    const content = this.fileReader.result;
    let result;
    if (this.state.value === "criptare") {
      result = caesarCipher(content, parseInt(key1));
      result = bifidEncode(result, key2);
    } else {
      result = bifidDecode(content, key2);
      result = caesarCipher(result, 26 - parseInt(key1));
    }
    console.log(result);
    this.generateOutput(result);
  };

  //se verifica daca au fost introduse chei/fisier. butonul de criptare/decriptare este dezactivat daca nu sunt introduse toate datele
  isValid = () => {
    return this.state.hasFile && this.state.key1 && this.state.key2;
  };

  //se incarca fisierul .txt
  handleFileChosen = (file) => {
    this.fileReader = new FileReader();
    if (file) {
      this.fileReader.readAsText(file);
      this.setState({ hasFile: true });
    } else {
      this.setState({ hasFile: false });
    }
  };

  //se genereaza fisierul output.txt ce contine textul criptat/decriptat
  generateOutput = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "output.txt";
    document.body.appendChild(element);
    element.click();
  };

  //interfata
  render() {
    return (
      <div className="mainCard">
        <div>
          <div className="row cardText">Incarca fisier input(*.txt):</div>
          <div>
            <input
              type="file"
              id="file-input"
              className="fileInput"
              accept=".txt"
              onChange={(e) => this.handleFileChosen(e.target.files[0])}
            />
          </div>
        </div>

        <div className="row cardText">
          Cheie cifrul Cezar:
          <div className="col-sm-4">
            <TextField
              id="standard-basic"
              value={this.state.key1}
              onChange={(e) => this.setState({ key1: e.target.value })}
            />
          </div>
        </div>
        <div className="row cardText">
          Cheie cifrul bifid:
          <div className="col-sm-4">
            <TextField
              id="standard-basic-2"
              value={this.state.key2}
              onChange={(e) => this.setState({ key2: e.target.value })}
            />
          </div>
        </div>
        <div className="row cardText">
          <RadioGroup
            aria-label="cripto"
            name="cripto"
            value={this.state.value}
            onChange={(e) => {
              this.setState({ value: e.target.value });
            }}
          >
            <FormControlLabel
              value="criptare"
              control={<Radio color="primary" />}
              label="Criptare"
            />
            <FormControlLabel
              value="decriptare"
              control={<Radio color="primary" />}
              label="Decriptare"
            />
          </RadioGroup>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleCipherButton}
          disabled={!this.isValid()}
        >
          {this.state.value === "criptare" ? "Cripteaza" : "Decripteaza"}
        </Button>
      </div>
    );
  }
}

export default Card;
