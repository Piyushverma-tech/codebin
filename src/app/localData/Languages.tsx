import { v4 as uuidv4 } from 'uuid';
import {
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiSharp,
  SiGo,
  SiSwift,
  SiPhp,
  SiTypescript,
  SiRuby,
  SiRust,
  SiKotlin,
  SiDart,
  SiR,
  SiScala,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const programmingLanguages = [
  {
    id: uuidv4(),
    name: 'Javascript',
    icon: <SiJavascript size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Python',
    icon: <SiPython size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Java',
    icon: <FaJava size={16} />,
  },
  {
    id: uuidv4(),
    name: 'C++',
    icon: <SiCplusplus size={16} />,
  },
  {
    id: uuidv4(),
    name: 'C#',
    icon: <SiSharp size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Go',
    icon: <SiGo size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Swift',
    icon: <SiSwift size={16} />,
  },
  {
    id: uuidv4(),
    name: 'PHP',
    icon: <SiPhp size={16} />,
  },
  {
    id: uuidv4(),
    name: 'TypeScript',
    icon: <SiTypescript size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Ruby',
    icon: <SiRuby size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Rust',
    icon: <SiRust size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Kotlin',
    icon: <SiKotlin size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Dart',
    icon: <SiDart size={16} />,
  },
  {
    id: uuidv4(),
    name: 'R',
    icon: <SiR size={16} />,
  },
  {
    id: uuidv4(),
    name: 'Scala',
    icon: <SiScala size={16} />,
  },
];

export default programmingLanguages;
