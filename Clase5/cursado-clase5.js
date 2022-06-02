import moment from "moment";
moment.locale("es");

const nacimiento = "30/03/1998";

const calcularDif = nac => moment(nac, "DD/MM/YYYY").fromNow();

console.log(calcularDif(nacimiento));