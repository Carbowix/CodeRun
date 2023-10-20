import { loader } from '@monaco-editor/react';
export function formatMessageDate(messageDate: Date): string {
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now.getTime() - messageDate.getTime();

  // Check if it's today
  if (
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear()
  ) {
    return `Today ${messageDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  }

  // Check if it's yesterday
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  if (timeDifference <= millisecondsInDay) {
    return `Yesterday ${messageDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  }

  return messageDate.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
}

export interface selectValueProp {
  id: number;
  value: string;
  label: string;
}

export function getLanguageById(id: number): selectValueProp | null {
  for (const item of allLanguages) {
    if (item.id === id) {
      return item;
    }
  }
  return null;
}

export const allLanguages: selectValueProp[] = [
  {
    id: 45,
    label: 'Assembly (NASM 2.14.02)',
    value: 'asm',
  },
  {
    id: 46,
    label: 'Bash (5.0.0)',
    value: 'bash',
  },
  {
    id: 47,
    label: 'Basic (FBC 1.07.1)',
    value: 'basic',
  },
  {
    id: 75,
    label: 'C (Clang 7.0.1)',
    value: 'c',
  },
  {
    id: 76,
    label: 'C++ (Clang 7.0.1)',
    value: 'cpp',
  },
  {
    id: 48,
    label: 'C (GCC 7.4.0)',
    value: 'c',
  },
  {
    id: 52,
    label: 'C++ (GCC 7.4.0)',
    value: 'cpp',
  },
  {
    id: 49,
    label: 'C (GCC 8.3.0)',
    value: 'c',
  },
  {
    id: 53,
    label: 'C++ (GCC 8.3.0)',
    value: 'cpp',
  },
  {
    id: 50,
    label: 'C (GCC 9.2.0)',
    value: 'c',
  },
  {
    id: 54,
    label: 'C++ (GCC 9.2.0)',
    value: 'cpp',
  },
  {
    id: 86,
    label: 'Clojure (1.10.1)',
    value: 'clojure',
  },
  {
    id: 51,
    label: 'C# (Mono 6.6.0.161)',
    value: 'csharp',
  },
  {
    id: 77,
    label: 'COBOL (GnuCOBOL 2.2)',
    value: 'cobol',
  },
  {
    id: 55,
    label: 'Common Lisp (SBCL 2.0.0)',
    value: 'commonlisp',
  },
  {
    id: 90,
    label: 'Dart (2.19.2)',
    value: 'dart',
  },
  {
    id: 57,
    label: 'Elixir (1.9.4)',
    value: 'elixir',
  },
  {
    id: 58,
    label: 'Erlang (OTP 22.2)',
    value: 'erlang',
  },
  {
    id: 87,
    label: 'F# (.NET Core SDK 3.1.202)',
    value: 'fsharp',
  },
  {
    id: 59,
    label: 'Fortran (GFortran 9.2.0)',
    value: 'fortran',
  },
  {
    id: 60,
    label: 'Go (1.13.5)',
    value: 'go',
  },
  {
    id: 95,
    label: 'Go (1.18.5)',
    value: 'go',
  },
  {
    id: 88,
    label: 'Groovy (3.0.3)',
    value: 'groovy',
  },
  {
    id: 61,
    label: 'Haskell (GHC 8.8.1)',
    value: 'haskell',
  },
  {
    id: 91,
    label: 'Java (JDK 17.0.6)',
    value: 'java',
  },
  {
    id: 62,
    label: 'Java (OpenJDK 13.0.1)',
    value: 'java',
  },
  {
    id: 63,
    label: 'JavaScript (Node.js 12.14.0)',
    value: 'javascript',
  },
  {
    id: 93,
    label: 'JavaScript (Node.js 18.15.0)',
    value: 'javascript',
  },
  {
    id: 78,
    label: 'Kotlin (1.3.70)',
    value: 'kotlin',
  },
  {
    id: 64,
    label: 'Lua (5.3.5)',
    value: 'lua',
  },
  {
    id: 79,
    label: 'Objective-C (Clang 7.0.1)',
    value: 'objc',
  },
  {
    id: 65,
    label: 'OCaml (4.09.0)',
    value: 'ocaml',
  },
  {
    id: 66,
    label: 'Octave (5.1.0)',
    value: 'octave',
  },
  {
    id: 67,
    label: 'Pascal (FPC 3.0.4)',
    value: 'pascal',
  },
  {
    id: 85,
    label: 'Perl (5.28.1)',
    value: 'perl',
  },
  {
    id: 68,
    label: 'PHP (7.4.1)',
    value: 'php',
  },
  {
    id: 69,
    label: 'Prolog (GNU Prolog 1.4.5)',
    value: 'prolog',
  },
  {
    id: 70,
    label: 'Python (2.7.17)',
    value: 'python',
  },
  {
    id: 92,
    label: 'Python (3.11.2)',
    value: 'python',
  },
  {
    id: 71,
    label: 'Python (3.8.1)',
    value: 'python',
  },
  {
    id: 80,
    label: 'R (4.0.0)',
    value: 'r',
  },
  {
    id: 72,
    label: 'Ruby (2.7.0)',
    value: 'ruby',
  },
  {
    id: 73,
    label: 'Rust (1.40.0)',
    value: 'rust',
  },
  {
    id: 81,
    label: 'Scala (2.13.2)',
    value: 'scala',
  },
  {
    id: 82,
    label: 'SQL (SQLite 3.27.2)',
    value: 'sql',
  },
  {
    id: 83,
    label: 'Swift (5.2.3)',
    value: 'swift',
  },
  {
    id: 74,
    label: 'TypeScript (3.7.4)',
    value: 'typescript',
  },
  {
    id: 94,
    label: 'TypeScript (5.0.3)',
    value: 'typescript',
  },
  {
    id: 84,
    label: 'Visual Basic.Net (vbnc 0.0.0.5943)',
    value: 'vbnet',
  },
];

const monacoThemes: { [key: string]: string } = {
  active4d: 'Active4D',
  'all-hallows-eve': 'All Hallows Eve',
  amy: 'Amy',
  'birds-of-paradise': 'Birds of Paradise',
  blackboard: 'Blackboard',
  'brilliance-black': 'Brilliance Black',
  'brilliance-dull': 'Brilliance Dull',
  'chrome-devtools': 'Chrome DevTools',
  'clouds-midnight': 'Clouds Midnight',
  clouds: 'Clouds',
  cobalt: 'Cobalt',
  dawn: 'Dawn',
  dreamweaver: 'Dreamweaver',
  eiffel: 'Eiffel',
  'espresso-libre': 'Espresso Libre',
  github: 'GitHub',
  idle: 'IDLE',
  katzenmilch: 'Katzenmilch',
  'kuroir-theme': 'Kuroir Theme',
  lazy: 'LAZY',
  'magicwb--amiga-': 'MagicWB (Amiga)',
  'merbivore-soft': 'Merbivore Soft',
  merbivore: 'Merbivore',
  'monokai-bright': 'Monokai Bright',
  monokai: 'Monokai',
  'night-owl': 'Night Owl',
  'oceanic-next': 'Oceanic Next',
  'pastels-on-dark': 'Pastels on Dark',
  'slush-and-poppies': 'Slush and Poppies',
  'solarized-dark': 'Solarized-dark',
  'solarized-light': 'Solarized-light',
  spacecadet: 'SpaceCadet',
  sunburst: 'Sunburst',
  'textmate--mac-classic-': 'Textmate (Mac Classic)',
  'tomorrow-night-blue': 'Tomorrow-Night-Blue',
  'tomorrow-night-bright': 'Tomorrow-Night-Bright',
  'tomorrow-night-eighties': 'Tomorrow-Night-Eighties',
  'tomorrow-night': 'Tomorrow-Night',
  tomorrow: 'Tomorrow',
  twilight: 'Twilight',
  'upstream-sunburst': 'Upstream Sunburst',
  'vibrant-ink': 'Vibrant Ink',
  'xcode-default': 'Xcode_default',
  zenburnesque: 'Zenburnesque',
  iplastic: 'iPlastic',
  idlefingers: 'idleFingers',
  krtheme: 'krTheme',
  monoindustrial: 'monoindustrial',
};

const defineTheme = (theme: string): Promise<void> => {
  return new Promise<void>((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

const helloWorldPrograms: { [key: string]: string } = {
  asm: "section .data\n   hello db 'Hello, World!',10\n   helloLen equ $-hello\n\nsection .text\n   global _start\n_start:\n   mov eax, 4\n   mov ebx, 1\n   mov ecx, hello\n   mov edx, helloLen\n   int 80h\n   mov eax, 1\n   int 80h",
  bash: 'echo "Hello, World!"',
  basic: 'PRINT "Hello, World!"',
  c: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  cpp: '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  clojure: '(println "Hello, World!")',
  csharp:
    'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  cobol:
    'IDENTIFICATION DIVISION.\nPROGRAM-ID. HelloWorld.\nPROCEDURE DIVISION.\n   DISPLAY "Hello, World!".\n   STOP RUN.',
  commonlisp: '(format t "Hello, World!")',
  dart: 'void main() {\n    print("Hello, World!");\n}',
  elixir: 'IO.puts "Hello, World!"',
  erlang:
    '-module(hello).\n-compile([export_all]).\nhello() ->\n    io:format("Hello, World!~n").',
  fsharp:
    'open System\n[<EntryPoint>] let main argv = Console.WriteLine("Hello, World!"); 0',
  fortran:
    'program HelloWorld\n   write(*,*) "Hello, World!"\nend program HelloWorld',
  go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  groovy: 'println "Hello, World!"',
  haskell: 'main :: IO ()\nmain = putStrLn "Hello, World!"',
  java: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  javascript: 'console.log("Hello, World!");',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}',
  lua: 'print("Hello, World!")',
  objc: '#import <Foundation/Foundation.h>\nint main() {\n    @autoreleasepool {\n        NSLog(@"Hello, World!");\n    }\n    return 0;\n}',
  ocaml: 'print_endline "Hello, World!";;',
  octave: 'printf("Hello, World!\\n");',
  pascal: 'program HelloWorld;\nbegin\n   writeln("Hello, World!");\nend.',
  perl: 'print "Hello, World!\\n";',
  php: '<?php\necho "Hello, World!";\n?>',
  prolog: "hello :- write('Hello, World!'), nl.",
  python: 'print("Hello, World!")',
  r: 'cat("Hello, World!\\n")',
  ruby: 'puts "Hello, World!"',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
  scala:
    'object HelloWorld {\n    def main(args: Array[String]) {\n        println("Hello, World!")\n    }\n}',
  sql: 'SELECT "Hello, World!" AS greeting;',
  swift: 'import Swift\nprint("Hello, World!")',
  typescript: 'console.log("Hello, World!");',
  vbnet:
    'Module HelloWorld\n    Sub Main()\n        Console.WriteLine("Hello, World!")\n    End Sub\nEnd Module\n',
};

export { defineTheme, monacoThemes, helloWorldPrograms };
