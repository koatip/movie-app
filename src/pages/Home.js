import {Link} from "react-router-dom";

export default function Home() {
    return(
        <div className="container">
            <h1 className="text-center">Karácsonyi film katalógus</h1>
            <div className="text-center">
                <Link className="btn btn-lg btn-danger m-2" to='/form'>Új film felvétele</Link>
                <Link className="btn btn-lg btn-success m-2" to='/table'>Karácsonyi film lista</Link>
                <Link className="btn btn-lg btn-outline-danger m-2" to='/stat'>Statisztika</Link>
            </div>
        </div>
    )
}