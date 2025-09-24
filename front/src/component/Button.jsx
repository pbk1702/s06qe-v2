import cn from 'classnames'

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={ cn("bg-amber-400 rounded-xl cursor-pointer hover:opacity-70 px-2 py-1", className) } {...rest} >{children}</button>
  )
}

export default Button