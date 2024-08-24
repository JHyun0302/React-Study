import './App.css';

function Header(props) {
    console.log('props', props.title)
    return (
        <header>
            <h1><a href="/" onClick={event =>{
                event.preventDefault();
                props.onChangeMode();
            }}>{props.title}</a></h1>
        </header>
    )
}

function Nav(props){
    // const lis = [
    //     <li><a href="/read/1">html</a></li>,
    //     <li><a href="/read/2">css</a></li>,
    //     <li><a href="/read/3">js</a></li>
    // ]
    const lis = []
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}>
            <a id={t.id} title={t.title} href={'read/' + t.id} onClick={event => {
                event.preventDefault();
                // props.onChangeMode(event.target.id);
                props.onChangeMode(event.target.title);
            }}>{t.title}</a></li>);
    }

    return (
        <nav>
            <ol>
                {lis}
            </ol>
        </nav>
    )
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    )
}

function App() {
    const topics = [
        {id:1, title:'html', body:'html is ...'},
        {id:2, title:'css', body:'css is ...'},
        {id:3, title:'javascript', body:'javascript is ...'}
    ]
    return (
    <div>
        <Header title="WEB" onChangeMode={() => {
            alert('Header');
        }}></Header>
        <Nav topics={topics} onChangeMode={(id)=> {
            alert(id);
        }}></Nav>
        <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
