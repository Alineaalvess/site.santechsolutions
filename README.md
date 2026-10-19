# Santech Solutions — Site Portfólio

Site institucional e portfólio da **Santech Solutions** (sites, sistemas e IA sob medida), construído como uma experiência de navegação 3D em tela cheia: um corredor futurista com o logotipo flutuando, transições em "warp", cenários diferentes por seção e trilha sonora ambiente.

> Projeto 100% estático: **HTML + CSS + JavaScript puro**, sem frameworks, sem build e sem dependências externas. Funciona offline.

## Funcionalidades

- Cena 3D renderizada em `<canvas>` (corredor, colunas de código, túnel neon, cidade, aurora, cosmos)
- Cérebro do logotipo girando em 3D, com brilho na cor de cada seção
- Transição em warp (raios de luz e estilhaços) entre telas
- 4 seções navegáveis: **Quem somos**, **Como fazemos**, **Projetos**, **Contato**
- Navegação por scroll, setas do teclado, clique e gestos de arrastar (mobile)
- Formulário de contato que envia a mensagem pelo **WhatsApp**
- Contatos com ícones: WhatsApp, e-mail e Instagram
- Botão flutuante do WhatsApp e botão de ligar/desligar o som
- Trilha ambiente "espaço sideral" gerada por código (Web Audio API), sem arquivos de áudio
- Responsivo e com suporte a `prefers-reduced-motion`

## Como funciona

| Camada | Como foi feito |
|---|---|
| Cenário 3D | Projeção em perspectiva calculada à mão no Canvas 2D (`js/engine.js`): cada elemento tem profundidade `z` e é desenhado em tamanho e posição proporcionais a `1/z`. Cada seção usa um "modo" de cenário. |
| Navegação | Máquina de estados simples (`intro → menu → seção/passos → final`) em `js/main.js`. Os textos ficam no objeto `SEC`. |
| Interface | Elementos HTML sobrepostos ao canvas (menu, cartões de vidro, contador, formulário), estilizados em `css/style.css` com a cor da seção via variável CSS `--c`. |
| Som | `js/audio.js` sintetiza pads, vento e notas agudas com osciladores, filtros e reverb. |

## Estrutura

```
.
├── index.html
├── css/style.css      # interface e responsivo
├── js/
│   ├── engine.js      # cena 3D, cores, warp
│   ├── main.js        # navegação e conteúdo (objeto SEC)
│   └── audio.js       # trilha sonora e botão de som
└── assets/            # logos, favicon e ícones (WhatsApp, e-mail, Instagram)
```
