//functie care cripteaza conform cifrului cezar.
export const caesarCipher = function (content, key) {
  let output = "";
  for (let i = 0; i < content.length; i++) {
    //se parcurge textul de criptat/decriptat
    let c = content[i];
    if (c.match(/[a-z]/i)) {
      //daca caracterul este o litera, se aplica cheia
      let code = content.charCodeAt(i);
      if (code >= 65 && code <= 90)
        c = String.fromCharCode(((code - 65 + key) % 26) + 65);
      else if (code >= 97 && code <= 122)
        c = String.fromCharCode(((code - 97 + key) % 26) + 97);
    }
    output += c;
  }
  return output;
};

//functie de generare a patratului polybius, rezultatul este un obiect avand atat cheia - litera si valoarea - numarul liniei+coloanei, cat si invers ( pentru a gasi mai usor valorile )
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
      // daca se gasesc deja in tabel, se trece mai departe
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
  const rawText = content.replace(/ /g, ""); //se elimina spatiile
  let rawIndices = "";
  for (let i = 0; i < rawText.length; i++) {
    let character = rawText.charAt(i).toUpperCase();
    rawIndices += table[character];
  } //se cauta in tabel si se inlocuiesc literele cu codul respectiv
  let cipherIndices = "";
  for (let i = 0; i < rawIndices.length; i += 2) {
    cipherIndices += rawIndices.charAt(i);
  } //se adauga primul "rand"
  console.log(cipherIndices);
  for (let i = 1; i < rawIndices.length; i += 2) {
    cipherIndices += rawIndices.charAt(i);
  } //se adauga al doilea "rand"
  console.log(cipherIndices);
  let cipherText = "";
  for (let i = 0; i < cipherIndices.length; i += 2) {
    cipherText += table[cipherIndices.substr(i, 2)];
  } // se cauta in tabel literele corespunzatoare randurilor combinate pe orizontala
  return cipherText;
};

export const bifidDecode = (content, key) => {
  const cipherText = content.replace(/ /g, ""); //se elimina spatiile
  let cipherIndices = "";
  const table = tableGenerator(key);
  for (let i = 0; i < cipherText.length; i++) {
    let character = cipherText.charAt(i).toUpperCase();
    cipherIndices += table[character];
  } //se cauta in tabel si se inlocuiesc literele cu codul respectiv
  let rawIndices = "";
  for (let i = 0; i < cipherText.length; i++) {
    rawIndices += cipherIndices[i];
    rawIndices += cipherIndices[i + cipherText.length];
  } //se iau din sirul de numere codurile respective literelor (pentru prima litera - prima cifra si cifra de pe pozitia jumatate+1) si se scriu ordonat
  let rawText = "";
  for (let i = 0; i < rawIndices.length; i += 2) {
    rawText += table[rawIndices.substr(i, 2)];
  } //se cauta in tabel literele corespunzatoare indicilor ordonati acum (pentru prima litera - primele 2 pozitii)
  return rawText;
};
