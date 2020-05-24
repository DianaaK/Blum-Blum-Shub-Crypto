//functie care cripteaza conform cifrului caesar.
export const caesarCipher = function (text, key) {
  let output = "";
  const content = text.replace(/ /g, "").toUpperCase(); //se elimina spatiile, se transforma literele in majuscule
  for (let i = 0; i < content.length; i++) {
    //se parcurge textul de criptat/decriptat
    let c = content[i];
    if (c.match(/[a-z]/i)) {
      //daca caracterul este o litera, se aplica cheia
      let code = content.charCodeAt(i); //se ia codul ASCII al literei (e majuscula, deci A=65, Z=90)
      c = String.fromCharCode(((code - 65 + key) % 26) + 65);
    }
    output += c;
  }
  return output;
};

//functie de generare a patratului polybius, rezultatul este un obiect avand atat cheia = litera si valoarea = numarul liniei+coloanei, cat si invers ( pentru a gasi mai usor valorile )
const tableGenerator = (key) => {
  let result = {};
  let unique = 0;
  for (let i = 0; i < key.length; i++) {
    //se iau intai literele din cheie
    let c = key.charAt(i).toUpperCase();
    if (!(c in result)) {
      let index = Math.floor(unique / 5).toString() + (unique % 5).toString();
      result[c] = index;
      result[index] = c;
      unique++;
    }
  }
  let chars = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; //restul literelor
  for (let i = 0; i < chars.length; i++) {
    let c = chars.charAt(i);
    if (!(c in result)) {
      // daca litera e deja in tabel, se trece mai departe
      let index = Math.floor(unique / 5).toString() + (unique % 5).toString();
      result[c] = index;
      result[index] = c;
      unique++;
    }
  }
  return result;
};

export const bifidEncode = (content, key) => {
  const table = tableGenerator(key);
  // let rawText = content.replace(/ /g, ""); //se elimina spatiile
  let rawText = content.replace(/J/g, "I"); //se inlocuieste j cu i (in patrat vor avea acelasi cod)
  let rawIndices = "";
  for (let i = 0; i < rawText.length; i++) {
    let character = rawText.charAt(i);
    rawIndices += table[character];
  } //se cauta in tabel si se inlocuiesc literele cu codul respectiv
  let cipherIndices = "";
  for (let i = 0; i < rawIndices.length; i += 2) {
    cipherIndices += rawIndices.charAt(i);
  } //se adauga primul "rand" - prima cifra din codul fiecarei litere
  for (let i = 1; i < rawIndices.length; i += 2) {
    cipherIndices += rawIndices.charAt(i);
  } //se adauga al doilea "rand" - a2a cifra din codul fiecarei litere
  let cipherText = "";
  for (let i = 0; i < cipherIndices.length; i += 2) {
    cipherText += table[cipherIndices.substr(i, 2)];
  } // se cauta in tabel literele corespunzatoare randurilor combinate pe orizontala
  return cipherText;
};

export const bifidDecode = (content, key) => {
  let cipherText = content.replace(/ /g, "").toUpperCase(); //se elimina spatiile, se transforma literele in majuscule
  cipherText = content.replace(/J/g, "I"); //se inlocuieste j cu i (in patrat vor avea acelasi cod)
  let cipherIndices = "";
  const table = tableGenerator(key);
  for (let i = 0; i < cipherText.length; i++) {
    let character = cipherText.charAt(i);
    cipherIndices += table[character];
  } //se cauta in tabel si se inlocuiesc literele cu codul respectiv
  let rawIndices = "";
  for (let i = 0; i < cipherText.length; i++) {
    rawIndices += cipherIndices[i];
    rawIndices += cipherIndices[i + cipherText.length];
  } //se imparte sirul in 2. se iau codurile de pe pozitiile i si i+jumatate si se scriu ordonat (pentru prima litera - pozitia 1 si pozitia jumatate+1)
  let rawText = "";
  for (let i = 0; i < rawIndices.length; i += 2) {
    rawText += table[rawIndices.substr(i, 2)];
  } //se cauta in tabel literele corespunzatoare indicilor ordonati acum (pentru prima litera - primele 2 pozitii)
  return rawText;
};
