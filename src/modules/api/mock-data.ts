import {User} from './types/User'
import {Post} from './types/Post'

export const users: User[] = [
  {
    username: 'daulet',
    firstName: 'Daulet',
    lastName: 'Serikov',
    password: '111111'
  },
  {
    username: 'alyce2000',
    firstName: 'Alyce',
    lastName: 'Carter',
    password: '222222'
  },
  {
    username: 'randyrandy',
    firstName: 'Randy',
    lastName: 'Paulson',
    password: '333333'
  }
]

export const posts: Omit<Post, 'id'>[] = [
  {
    title: 'HTML - HyperText Markup Language',
    content: 'HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web pages appearance/presentation (CSS) or functionality/behavior (JavaScript).',
    author: 'daulet',
    publicationDate: new Date(2022, 11, 13).toJSON()
  },
  {
    title: 'CSS - Cascading Style Sheets',
    content: 'Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.',
    author: 'alyce2000',
    publicationDate: new Date(2022, 11, 12).toJSON()
  },
  {
    title: 'JS - JavaScript',
    content: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.',
    author: 'randyrandy',
    publicationDate: new Date(2022, 11, 11).toJSON()
  }
]
