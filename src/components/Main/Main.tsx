import { IoAddCircleOutline } from 'react-icons/io5';
import { BiInfoCircle } from 'react-icons/bi';
import { Modal } from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';

export const Main = () => {

    const { modal, toggleModal } = useModal();

    return (
        <div className="h-21/24 w-full bg-background flex justify-center items-center">
            <BiInfoCircle className = "w-6 h-6 absolute right-8 top-28 text-terciary opacity-50 cursor-pointer" />
            <div className="flex-col flex text-terciary cursor-pointer">
                <IoAddCircleOutline className = "w-10 h-10 self-center opacity-75" onClick = { toggleModal } />
                <p>Crear nuevo entorno de trabajo</p>
            </div>
            {
                modal 
                    ? <Modal title = "Bienvenido">
                        <p>Hola</p>
                        <button onClick = { toggleModal }>Cerrar</button>
                      </Modal>
                    : null
            }
        </div>
    )
}
