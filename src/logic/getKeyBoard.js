export  function getkeyBoard({lastLetter,boardSize}) {
    if(lastLetter === "") return
    const keysEnabled = boardSize?.size === 9 ? "123456789qweasdzxcuiojklnm," : "12345678"
    let value;
    if (keysEnabled.includes(lastLetter)) {
    //   const key = e.target.value.toLowerCase();

      switch (lastLetter) {
        case "1":
        case "q":
        case "u":
          value = 1;
          break;
        case "2":
        case "w":
        case "i":
          value = 2;
          break;
        case "3":
        case "e":
        case "o":
          value = 3;
          break;
        case "4":
        case "a":
        case "j":
          value = 4;
          break;
        case "5":
        case "s":
        case "k":
          value = 5;
          break;
        case "6":
        case "d":
        case "l":
          value = 6;
          break;
        case "7":
        case "z":
        case "n":
          value = 7;
          break;
        case "8":
        case "x":
        case "m":
          value = 8;
          break;
        case "9":
        case "c":
        case ",":
          value = 9;
          break;
        default:
          value = null;
          break;
      }
    }
    return value -1 
  }
