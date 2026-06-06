export default function moneyFormat(valMoney){
  if(typeof valMoney !== "number"){
    throw new Error(`\n\n   *Oppps parameter moneyFormat must be a number`);
  }
  if(valMoney < 1){
    throw new Error(`\n\n   *Oppps parameter moneyFormat must greater then 0`);
  }

  const money = `${valMoney}`;
  const strMoney = money.split("");

  if(strMoney.length < 3){
    throw new Error(`\n\n   *Money total should more then 2 digit Before formating money`);
  }

  const digit = strMoney.length;
   
  switch(digit){
  case 4 :
    strMoney.splice(1,0, '.');
    return [`Rp ${strMoney.join("")}`, valMoney];
  case 5 :
    strMoney.splice(2, 0, '.');
    return [`Rp ${strMoney.join("")}`, valMoney];
  case 6 :
    strMoney.splice(3, 0, '.');
    return [`Rp ${strMoney.join("")}`, valMoney];
  case 7 :
    strMoney.splice(1, 0, '.');
    strMoney.splice(5, 0, '.');
    return [`Rp ${strMoney.join("")}`, valMoney];
  default:
    return [`${valMoney}`, valMoney];
  }
}