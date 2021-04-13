ReactDOM.render(
    <App />, document.getElementById('root')
);

function App() {
    return (
        <div className="wrapper">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

function Main() {
    let checkData = sessionStorage.getItem('data');

    if (checkData != null) {
        return <Card info={ JSON.parse(checkData) } />;
    } else {
        const [data, setData] = React.useState(null);

        React.useEffect(() => {
            fetch(`https://api.jsonbin.io/b/604006e581087a6a8b95b784`)
                .then(response => response.json())
                .then(setData)
                .catch(console.error);
        }, []);
    
        //console.log(data);
    
        if (data) {
            if (data.message) {
                return <Error message={ data.message } />;
            } else {
                sessionStorage.setItem('data', JSON.stringify(data));
            }
    
            return <Card info={ data } />;
        }

        return null;
    }
}

function Card({ info }) {
    //console.log(info);
    return (
        <div className="container">
            { info.map((item, i) => (
                <div className="card" key={ i }>
                    <img src={ item.url } />
                    <h3>{ item.bankName }</h3>
                    <p>{ item.description }</p>
                </div>
            ))}
        </div>
    );
}

function Error({ message }) {
    return (
        <div>
            <p>Error: Lectura de datos</p>
            <p>Mensaje: { message }</p>
        </div>
    );
}

function Header() {
    return (
        <header>
            <h1>Lista de Bancos</h1>
        </header>
    );
}

function Footer() {
    const date = new Date();

    return (
        <footer>
            <p>&copy; { date.getFullYear() }</p>
        </footer>
    );
}