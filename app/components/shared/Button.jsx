
const Button = ({value, onClick}) => {
    return (
        <button
            className={`bg-violet-500 hover:bg-violet-400 text-white 
                        rounded text-center px-4 py-2`}
            onClick = {onClick}>
            {value}
        </button>
    )
}

export default Button;
