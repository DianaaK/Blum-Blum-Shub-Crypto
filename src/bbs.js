const p = 30091,
  q = 400093; //numere prime
const nr = p * q; //intreg Blum
let x = 968670; //reziduu patratic modulo n

// cmmdc a 2 numere
const cmmdc = (a, b) => {
  while (a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }
  return a;
};

// reziduu patratic modulo n. trebuie sa fie diferit de 0, 1, si sa fie prim cu intregul Blum (aka nu ii are factori pe q si p)
const generate = (s) => {
  if (s !== 0 && s !== 1 && cmmdc(s, nr) === 1) {
    // verifica ca numarul sa indeplineasca conditiile
    x = s;
    return s;
  }
};

// genereaza urmatorul numar din secventa
export const next = () => {
  generate(x);
  x = (x * x) % nr; // numarul generat
  let b = x % 2; // bitul din secventa corespunzator
  return b;
};
