import './App.css';
import {useState} from 'react';
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
                props.onChangeMode(Number(event.target.id));
                // props.onChangeMode(event.target.title);
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

function Create(props) {
    return (
        <article>
            <h2>Create</h2>
            <form onSubmit={event => {
                event.preventDefault();
                const title = event.target.title.value;
                const body = event.target.body.value;
                props.onCreate(title, body);
            }}>
                <p><input type="text" name="title" placeholder="title" /></p>
                <p><textarea name="body" placeholder="body"></textarea></p>
                <p><input type="submit" value="Create"></input></p>
            </form>
        </article>
    )
}

function App() {
    const [mode, setMode] = useState('WELCOME'); //state[0] : 읽기, state[1] : 값 변경
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        {id: 1, title: 'html', body: 'html is ...'},
        {id: 2, title: 'css', body: 'css is ...'},
        {id: 3, title: 'javascript', body: 'javascript is ...'}
    ]);
    let content = null;
    if (mode === 'WELCOME') {
        content = <Article title="Welcome" body="Hello, Web"></Article>
    } else if (mode === 'READ') {
        let title, body = null;
        for (let i = 0; i < topics.length; i++) {
            console.log(topics[i].id, id); //topics[i].id(숫자), state `id`(a 태그로 인해 `문자`로 나옴.. -> Nav의 event.target.id)
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>
    } else if (mode === 'CREATE') {
        content = <Create onCreate={(_title, _body) => {
            const newTopic = {id:nextId, title:_title, body:_body}
            const newTopics = [...topics] //topics 배열 복제해서 newTopics 생성
            newTopics.push(newTopic); //newTopics에 새로운 값 삽입
            setTopics(newTopics); //useState 쓰기
            setMode('READ'); //create -> read
            setId(nextId); //create 글 읽기
            setNextId(nextId + 1);
        }}></Create>
    }
    return (
    <div>
        <Header title="WEB" onChangeMode={() => {
            setMode('WELCOME');
        }}></Header>
        <Nav topics={topics} onChangeMode={(id)=> {
            setMode('READ');
            setId(id);
        }}></Nav>
        {content}
        <a href="/create" onClick={event => {
            event.preventDefault();
            setMode('CREATE');
        }}>Create</a>
    </div>
  );
}

export default App;
