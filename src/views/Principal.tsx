import { useEffect } from 'react'
import { LeftBar } from '../components/Leftbar/LeftBar'
import { Main } from '../components/Main/Main'
import { Modal } from '../components/Modal/Modal';
import { useModal } from '../hooks/useModal';
import { FcGoogle } from 'react-icons/fc'

export const Principal = () => {

    const { modal, toggleModal } = useModal()

    useEffect(() => {
        toggleModal();
    }, [])

    return (
        <>
            <LeftBar />
            <Main />
            {
                modal && <Modal title = "Bienvenido" >
                    <div className="flex flex-row space-x-5 p-5 shadow-md rounded-md mt-8">
                        <FcGoogle className = "w-6 h-6" />
                        <button onClick = { toggleModal } className = "text-base font-semibold" >Ingrese con cuenta de Google</button>
                    </div>
                </Modal> 
            }
        </>
    )
}
