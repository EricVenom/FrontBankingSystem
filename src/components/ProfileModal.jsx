import "./ProfileModal.css";
import { loggedUserContext } from "../contexts/UserContext"
import { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

export default function ProfileModal({ setIsModalActive }) {
    const { loggedUser } = useContext(loggedUserContext);

    const clickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalActive(false);
        }
    }

    return (
        <div className="backdrop" onClick={clickHandler}>
            <section className="client-profile">
                <ul>
                    <li>{loggedUser?.name}</li>
                    <li>{loggedUser?.email}</li>
                    <li>{loggedUser?.cpf}</li>
                    <li>{loggedUser?.telephone}</li>
                    <li><Button><LogoutIcon /> Sair</Button></li>
                </ul>
            </section>
        </div>
    )
}