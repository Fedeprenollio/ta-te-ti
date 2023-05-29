
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square container-key ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div  onClick={handleClick} className={className}>
      {children}
      <span className="key">{index}</span>
    </div>
  )
}

export default Square
