import "./ProfileModal.css";
import { loggedUserContext } from "../contexts/UserContext"
import { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { deleteCookie } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function ProfileModal({ setIsModalActive }) {
    const { loggedUser } = useContext(loggedUserContext);
    const navigate = useNavigate();

    const clickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalActive(false);
        }
    }

    const handleLogout = (e) => {
        if (e.target === e.currentTarget) {
            deleteCookie("auth");
            navigate("/");
        }
    }

    const formatCPF = (cpf) => {
        // XXX.XXX.XXX-XX
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    const formatPhone = (phone) => {
        // (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
        return phone.length === 11
            ? phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
            : phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    };

    return (
        <div className="backdrop" onClick={clickHandler}>
            <section className="client-profile">
                <div className="client-id">
                    <strong>{loggedUser?.name}</strong>
                    <span>{loggedUser?.email}</span>
                </div>

                <div className="client-cmc">
                    <div>
                        CPF: <br />
                        {loggedUser?.cpf && formatCPF(loggedUser?.cpf)}
                    </div>

                    <div>
                        Celular: <br />
                        {loggedUser?.telephone && formatPhone(loggedUser?.telephone)}
                    </div>
                </div>
                <li><Button
                    size="small"
                    variant="outlined"
                    sx={{ marginTop: "1rem", width: "100%", gap: ".5rem" }}
                    onClick={handleLogout}
                ><LogoutIcon /> Sair</Button></li>

            </section>
        </div>
    )
}