# React

## Getting Started

### Préparation

Afin de boostraper un projet React, il est nécessaire d'utiliser la package `create-react-app` :

- Soit en l'installant<br>
  `yarn global add create-react-app`<br>
  `npm install -g create-react-app`
- Soit en l'utilisant directement<br>
  `npx create-react-app`

### Génération du project

Afin de générer l'application, utiliser la commande suivante : `create-react-app nomproject`

## Notions de base

### Création d'un composant (functional)

Afin de créer un composant React, il est nécessaire de passer par 3 étapes :

- Importer React
- Générer un fonction retournant du JSX
- Export cette fonction

```javascript
import React from "react";

const Button = () => {
  return <button>Test</button>;
};

export default Button;
```

### Passage de données d'un composant parent à un composant enfant

#### Généralités

Afin de passer des données d'un composant parent à un composant enfant, on utilise des **props** ou attributs. Ces attributs sont directement envoyés par le JSX vers les arguments du composant enfant. On peut envoyer des chaines de caractères (entre quotes) ou bien des expressions javascript (entre accolades). Ces **props** sont en read-only, il n'est en aucun cas possible de modifier la valeur d'une variable d'un composant parent qui a été passé par les **props**.

```javascript
// Composant parent: passage d'un titre à un composant Button
<div>
    <Button title="Test" count={1 + 1}/>
</div>

// Composant enfant: Button
const Button = ({title, count}) => {
  return <button>{ title + " " + count }</button>;
};
```

Dans l'exemple précédent, le composant parent définit le titre et un count qui seront ensuite affichés dans le composant enfant.

#### Event Listener

Il existe des **props** spéciaux qui permettent d'écouter un événement sur certains éléments du DOM comme un `button` ou un `input`. Ces attributs sont préfixés par **on** suivi du nom de l'événement en CamelCase, ex: `onClick`. On peut donc leur attribuer une fonction contenue dans une variable ou non.

```javascript
const Button = ({title, count}) => {
  const onHover = () => console.log("hover");
  return <button onHover={onHover} onClick={() => console.log('clicked')}>
      { title + " " + count }
  </button>;
};
```

#### La propriété `key`

La propriété `key` permet à React d'optimiser les rechargements d'une liste de données. Elle lui permet de reconnaître quel composant a besoin d'être recharger en conséquence de n'importe quelle opération (ajout, suppression, modification). Cette clé doit donc être unique par élément au sein d'une même liste, il convient d'utiliser un identifiant unique basé sur la data à afficher que d'utiliser son index. En effet, à chaque suppresion/ajout les tableaux sont ré-indexés, de ce fait, React va alors recharger un grand nombre de composant.

```javascript
const List = ({items}) => {
  return <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>;
}
```

### Les hooks

Les **hooks** sont des fonctions qui se définissent par :

- Préfixer par le mot `use`
- Utiliser uniquement dans les functional componants dans le scope de leur définition

```javascript
const Button = () => {
  //Bonne utilisation
  const [state, setState] = useState({});

  const test = () => {
    // Mauvaise utilisation
    const [state, setState] = useState({});
  }
}
```

Les hooks permettent de reproduire plusieurs fonctionnalités des composants React (gestion des états, cycle de vie, ...)

### Rendre les composants dynamiques

Afin de rendre les composants plus dynamiques, on va introduire la notion de **state** ou état d'un composant.<br>
Afin de mettre en place cet état, on va utiliser un **hook** qui se nomme `useState`. Celui-ci prend en argument une valeur par défaut (`undefined` si non spécifié) et retourne un tableau comprenant la valeur de l'état ainsi qu'une méthode pour la modifier.

```javascript
import React, {useState} from "react";

const Button = ({title}) => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>
      { title + " " + count }
  </button>;
};
```

Dans l'exemple précédent, à chaque clique sur le bouton, le composant va modifier son état en ajoutant 1 à la valeur de count. Celui-ci va donc se recharger en affichant la nouvelle valeur de count.<br><br/>

Si un composant enfant veut modifier l'état d'un composant parent, ce dernier doit passer une fonction par les **props** au composant enfant.

```javascript
const Body = () => {
  const [count, setCount] = useState(0);

  return <Button handleClick={() => setCount(count + 1)} title="Press"/>;
}

const Button = ({title, handleClick}) => {
  return <button onClick={handleClick}>{ title }</button>;
};
```

Dans l'exemple précédent au clique sur le `button`, l'event listener `onClick` est déclenché dans le composant `Button` appelant ainsi la méthode `handleClick` provenant du composant `Body` ajoutant +1 au compteur.

### Cycle de vie d'un composant

#### Mount

Le mount correspond au moment où un composant React est ajouté au DOM. Dans la version "classe" de React, il s'apparentait à la méthode **componentDidMount**<br> Avec les functionals components nous allons utiliser un hack du hook `useEffect`. En effet, celui-ci permet de lancer une fonction lorsque son tableau de dépendances change. La technique étant donc d'utiliser un tableau vide car un tableau vide ne change jamais.

```javascript
import React, {useEffect} from "react";

const Button = ({title}) => {
  // componentDidMount
  useEffect(() => console.log('mounted'), []);

  return <button>
      { title }
  </button>;
};
```

#### Update

L'update correspond au moment où un composant a été mis à jour. Dans la version "classe" de React, il s'apparentait à la méthode **componentDidUpdate**.<br> Avec les functionals components nous allons utiliser le hook `useEffect`. Attention, la fonction du useEffect est lancé au moins une fois lors de la création du composant.

```javascript
import React, {useEffect} from "react";

const Button = ({title}) => {

  // componentDidUpdate
  useEffect(() => console.log('updated', title), [title]);

  return <button>
      { title }
  </button>;
};
```

Dans l'exemple précédent, si un composant parent modifie la valeur de title alors le `useEffect` va détecter un changement sur title et va donc relancer la fonction à l'intérieur du useEffect.

#### Unmount

L' unmount correspond au moment où un composant React va être retirer du DOM. Dans la version "classe" de React, il s'apparentait à la méthode **componentWillUnmount**.<br>
Avec les functionals components nous allons utiliser le hook `useEffect`. En effet, celui-ci permet de lancer une fonction lorsque que le composant va être retirer du DOM. Celle-ci doit être définit au niveau du return.

```javascript
import React, {useEffect} from "react";

const Button = ({title}) => {

  useEffect(() => {
    // componentWillUnmount
    return () => console.log('unmount);
  }, [title]);

  return <button>
      { title }
  </button>;
};
```

## Notions avancées

### Les Contexts

Les contexts permettent de stocker un état "global" de l'application dans le sens où l'on va pouvoir diffuser des méthodes et des propriétés à n'importe quel composant React.<br>
Les contexts sont basés sur le design patter Provider/Consumer. Lorsque l'on génère un context par l'intermédiaire de la fonction `createContext`, React va générer deux composants un `Provider` et un `Consumer`.<br>
Il y a 1 manière de diffuser des données (méthodes ou propriétés) et 3 manières de les récupérer.

#### Context

```javascript
const MyContext = React.createContext({user: null});

export default MyContext;
```

Dans l'exemple précédent, nous créons un context permettant de diffuser le user connecté, **null** a défaut

#### Provider

```javascript
import MyContext from "./context/MyContext";

const Container = () => {
  const [user, setUser] = useState(null);
  return <div>
    <Head>...</Head>
    <Body>
      <MyContext.Provider value={{user}}>
        ...
      </MyContext.Provider>
    </Body>
  </div>;
}
```

Dans l'exemple précédent, la valeur de **user** est diffusée par l'intermédiaire de la balise `MyContext.Provider`. De ce fait, tous les composants sous celle-ci pourront accéder à la valeur de **user** grâce à l'une des méthodes de consumer. Il est bon de remarquer que les composants sous `Head` ne pourront pas accès au **user** étant à l'extérieur du scope de la balise `MyContext.Provider`.

#### Consumer

1) Utilisation du composant Consumer

```javascript
import MyContext from "./context/MyContext";

const Body = ({title}) => {
  return <MyContext.Consumer>
    {({user}) => <Button title={user.name + " Press"}/>}
  </MyContext.Consumer>;
}
```

2) Utilisation de la propriété statique contextType (class)

```javascript
import MyContext from "./context/MyContext";

class Body extends React.Component {
  static contextType = MyContext;

  render() {
    return <Button handleClick={() => setCount(count + 1)} title={this.props.user.name + " Press"}/>;
  }
}
```

3) Utilisation du hook `useContext`

```javascript
import MyContext from "./context/MyContext";

const Body = ({title}) => {
  const {user} = useContext(MyContext);

  return <Button handleClick={() => setCount(count + 1)} title={user.name + " Press"}/>;
}
```

### L'architecture FLUX

L'architecture FLUX est un design pattern de données, son but étant de re-centralisé la gestion des données au sein d'un état général de l'application appelé **store**. Les données sont ensuite récupérable à partir de n'importe quel composant.<br>
Cette architecture est basée sur 3 composants principaux:

- Le **store**
- Le **dispatcher**
- La **vue**

Le **store** représente un état général de l'application. Il peut y avoir plusieurs stores au sein d'une même application si nécessaire.<br>
Le **dispatcher** va jouer le rôle de régulateur des changements des données. Son principale rôle est de propager aux différents stores la volonté d'un composant de modifier une donnée. Cette volonté est schematisé par une **action**.<br>
Une **action** est caractérisée par un `type` et un `payload`.<br>
Les **vues**(composants) se connectent alors aux différents **stores** afin de récupérer de la donnée et envoie au **dispatcher** des **actions**.<br><br>
Processus:

1) Génération du store avec un état initial => les vues récupèrent ces valeurs
2) Une vue demande une mise à jour des données par une action
3) Le dispatcher récupère l'action et la renvoie aux différents stores
4) Les stores se mettent à jour
5) Les vues, étant connectées aux stores, se mettent à jour

Il est simple de pouvoir mettre en place ce design pattern grâce aux différents outils proposés par React, à savoir: les **Context**s et le hook `useReducer`. Le premier va servir de **Store** et le second de **Dispatcher**/**Reducer**.

Mise en place:

```javascript
const AuthContext = React.createContext({user});

// Store avec deux actions gérées Login et Logout
const initialState = {user: null}
const reducerFunction = (state, action) => {
  switch(action.type) {
    case 'Login':
      return {
        ...state,
        user: action.payload.user
      };
    case 'Logout':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

const AuthProvider = ({children}) => {
  // dispatch => Dispatcher
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return <AuthContext.Provider value={{state, dispatch}}>
   {children}
  </AuthContext.Provider>;
}

const ButtonAuth = () => {
  // dispatch => Dispatcher
  const {state, dispatch} = useContext(AuthContext);

  if (state.user !== null) {
    return <button onClick={() => dispatch({
      type: 'Logout'
    })}>{state.user.name}</button>
  } else {
    return <button onClick={() => dispatch({
      type: 'Login',
      payload: {
        user: {name: 'Foo'}
      }
    })}>Log in</button>
  }
}
```
