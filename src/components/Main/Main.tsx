import { IoAddCircleOutline } from 'react-icons/io5';
import { BiInfoCircle } from 'react-icons/bi';
import { Modal } from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';

export const Main = () => {

    const { modal, toggleModal } = useModal();

    return (
        <div className="h-21/24 md:h-full md:w-11/12 w-full bg-background flex justify-center items-center">
            <BiInfoCircle className = "w-6 h-6 md:w-9 md:h-9 absolute right-8 md:right-10 top-28 md:top-12 text-terciary opacity-50 cursor-pointer" />
            <div className="flex-col flex text-terciary cursor-pointer">
                <IoAddCircleOutline className = "w-10 h-10 md:w-14 md:h-14 self-center opacity-75" onClick = { toggleModal } />
                <p className = "text-xs md:text-2xl">Crear nuevo entorno de trabajo</p>
            </div>
            {
                modal 
                    ? <Modal title = "Nuevo Entorno:" placeholder = "Nombre del Entorno" name = "Entorno" />
                    : null
            }
        </div>
    )
}
