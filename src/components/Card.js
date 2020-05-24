import React from "react";
import { TextField, Button } from "@material-ui/core";
import { next } from "../bbs";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
    };
  }

  handleButton = (e) => {
    let result = "";
    if (!isNaN(this.state.size) && this.state.size > 0) {
      //verifica daca dimensiunea este un numar > 0
      for (let size = 0; size < this.state.size * 1024 * 1000; size++) {
        result += next(); //gereaza cate un bit
        console.log(size, this.state.size * 1024 * 1000);
      }
      console.log(result);
      this.generateOutput(result);
    } else {
      alert("Introduceti un numar > 0");
      return;
    }
  };

  //se genereaza fisierul output.bin ce contine secventa de numere
  generateOutput = (content) => {
    const byteArray = Uint8Array.from(content); //transforma stringul in sir de bytes
    const element = document.createElement("a");
    const file = new Blob(byteArray, { type: "application/octet-stream" }); //scrie fisierul binar
    element.href = URL.createObjectURL(file);
    element.download = "output.bin";
    document.body.appendChild(element);
    element.click();
  };

  //interfata
  render() {
    return (
      <div className="mainCard">
        <div className="row cardText">
          Introduceti dimensiunea (MB):
          <div className="col-sm-4">
            <TextField
              id="standard-basic"
              value={this.state.size}
              onChange={(e) => this.setState({ size: e.target.value })} //salveaza pe state dimensiunea introdusa
            />
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={this.handleButton}>
          Genereaza
        </Button>
      </div>
    );
  }
}

export default Card;
