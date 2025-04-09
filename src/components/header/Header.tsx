import {Container} from "react-bootstrap";
import LogoComercioSA from "../../data/images/Logo-Comercio-SA.png"
export default function Header () {
    return (
        <Container className="d-flex justify-content-center shadow-sm py-3 w-100"
                   style={{
                       minWidth:"100vw"
                   }}>
            <img
                alt=""
                src={LogoComercioSA}
                className="navbar-brand img-fluid"
                style={{height: '100%', width: 'auto', objectFit: 'contain', maxWidth: '225px'}}
            />
        </Container>
    )
}