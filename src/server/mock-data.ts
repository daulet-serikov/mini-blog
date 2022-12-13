import {User} from './types/User'
import {Post} from './types/Post'

export const users: User[] = [
  {name: 'Daulet'},
  {name: 'Liam'},
  {name: 'Oliver'}
]

export const posts: Post[] = [
  {
    content: 'HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web pages appearance/presentation (CSS) or functionality/behavior (JavaScript).',
    authorId: 0
  },
  {
    content: 'Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.',
    authorId: 1
  },
  {
    content: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.',
    authorId: 2
  }
]
