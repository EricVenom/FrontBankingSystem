import "./ProfileModal.css";
import { loggedUserContext } from "../contexts/UserContext"
import { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

export default function ProfileModal() {
    const { loggedUser } = useContext(loggedUserContext);

    return (
        <div className="backdrop">
            <section classname="client-profile">
                <ul>
                    <li>{loggedUser?.name}</li>
                    <li>{loggedUser?.cpf}</li>
                    <li>{loggedUser?.telephone}</li>
                    <li>{loggedUser?.email}</li>
                    <li><Button><LogoutIcon /></Button></li>
                </ul>
            </section>
        </div>
    )
}