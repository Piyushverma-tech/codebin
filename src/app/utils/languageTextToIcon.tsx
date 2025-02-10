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

function getLanguageIcon(language: string) {
  switch (language) {
    case 'Javascript':
      return <SiJavascript size={15} className="mb-[2px]" />;
    case 'Python':
      return <SiPython size={15} className="mb-[2px]" />;
    case 'C++':
      return <SiCplusplus size={15} className="mb-[2px]" />;
    case 'C#':
      return <SiSharp size={15} className="mb-[2px]" />;
    case 'Java':
      return <FaJava size={15} className="mb-[2px]" />;
    case 'Go':
      return <SiGo size={15} className="mb-[2px]" />;
    case 'Swift':
      return <SiSwift size={15} className="mb-[2px]" />;
    case 'PHP':
      return <SiPhp size={15} className="mb-[2px]" />;
    case 'Typescript':
      return <SiTypescript size={15} className="mb-[2px]" />;
    case 'Ruby':
      return <SiRuby size={15} className="mb-[2px]" />;
    case 'Rust':
      return <SiRust size={15} className="mb-[2px]" />;
    case 'Kotlin':
      return <SiKotlin size={15} className="mb-[2px]" />;
    case 'Dart':
      return <SiDart size={15} className="mb-[2px]" />;
    case 'R':
      return <SiR size={15} className="mb-[2px]" />;
    case 'Scala':
      return <SiScala size={15} className="mb-[2px]" />;
    default:
      return null; // Return null if the language is not found
  }
}

export default getLanguageIcon;
