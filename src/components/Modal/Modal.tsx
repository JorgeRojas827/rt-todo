interface IProps {
    title: string;
    children?: JSX.Element[] | JSX.Element;
    name?: string;
    placeholder?: string;
}

export const Modal = ({ title, children, name, placeholder }: IProps) => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 absolute left-0 top-0">
            <div className="bg-background rounded-lg w-72 md:w-96 h-36 md:h-52 flex flex-col justify-start items-center p-4">
                <h2 className = "text-primary font-semibold text-lg">{ title }</h2>
                <div className="w-28 border-b hidden md:block mt-1 border-black opacity-10"></div>
                <div className="">
                    { children ? children : 
                        (
                            <div className = "">
                                <form className = "flex flex-col ">
                                    <input className = "mt-5 p-3 shadow-md bg-white w-60 h-14" placeholder = { placeholder } type="text" name={ name } id= { name } />
                                    <input className = "mt-3 text-white bg-primary p-1 px-4 rounded-lg w-20 h-10" type="submit" value="Crear" />
                                </form>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}