import { useAppSelector } from "../store/store/store";
import { useBoardActions } from "../store/store/useBoardAction";

const Square = ({ children, isSelected, updateBoard, index, boardSize }) => {
  const state = useAppSelector((state) => state.tateti)

  const  {setBoard} = useBoardActions()

  const className = `square container-key ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };
  // para el tateti
  function KeyBoardKeyTateti() {
    switch (index) {
      case 0:
        return (
          <div>
            <span className="key-l">q</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">u</span>
          </div>
        );

        break;

      case 1:
        return (
          <div>
            <span className="key-l">w</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">i</span>
          </div>
        );

      case 2:
        return (
          <div>
            <span className="key-l">e</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">o</span>
          </div>
        );
      case 3:
        return (
          <div>
            <span className="key-l">a</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">j</span>
          </div>
        );
      case 4:
        return (
          <div>
            <span className="key-l">s</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">k</span>
          </div>
        );
      case 5:
        return (
          <div>
            <span className="key-l">d</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">l</span>
          </div>
        );
      case 6:
        return (
          <div>
            <span className="key-l">z</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">n</span>
          </div>
        );
      case 7:
        return (
          <div>
            <span className="key-l">x</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">m</span>
          </div>
        );
      case 8:
        return (
          <div>
            <span className="key-l">c</span>
            <span className="key">{index + 1}</span>
            <span className="key-r">,</span>
          </div>
        );
       
      default:
        break;
    }
  }

  // para el 4 en linea
  function KeyBoard4InLine() {
    if (index <= 6)  {
      return <span className="key">{index + 1}</span>;
    }else if( index >=35){
      return <span className="key">{index -34}</span>;
    } 
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
      {/* <span className="key">{index + 1}</span> */}
      {state.setting?.size === 9 ? <KeyBoardKeyTateti /> : <KeyBoard4InLine />}
    </div>
  );
};

export default Square;
