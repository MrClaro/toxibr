# ToxiBR - Moderacao de chat open source

Biblioteca open source de moderacao de conteudo para portugues brasileiro. Filtra mensagens toxicas em tempo real, direto no client-side, sem depender de API externa.

## Por que usar?

- **Zero dependencias** — nada de SDK pesado, roda em qualquer lugar
- **Rapido** — menos de 1ms por mensagem
- **Anti-bypass** — normaliza leetspeak, homoglyphs, acentos, zero-width chars, abreviacoes BR
- **Context-aware** — entende a diferenca entre "eu me sinto um lixo" e "voce e um lixo"
- **Open source** — qualquer um pode contribuir com novas palavras e melhorias

## Instalacao

```bash
npm install toxibr
```

## Uso rapido

```ts
import { filterContent } from 'toxibr';

const result = filterContent('mensagem aqui');

if (!result.allowed) {
  console.log(result.reason);  // 'hard_block' | 'directed_insult' | 'link' | 'phone' | 'digits_only'
  console.log(result.matched); // palavra que matchou
}
```

## Uso avancado

```ts
import { createFilter } from 'toxibr';

const filter = createFilter({
  extraBlockedWords: ['minha-palavra-custom'],
  extraContextWords: ['outra-palavra'],
  blockLinks: true,      // default: true
  blockPhones: true,     // default: true
  blockDigitsOnly: true, // default: true
});

const result = filter('mensagem aqui');
```

## O que ele filtra?

| Camada | O que bloqueia | Exemplo |
|--------|---------------|---------|
| **Links** | URLs e dominios | `https://...`, `site.com`, `.br` |
| **Telefone** | Numeros BR (9+ digitos) | `(21) 99470-9426` |
| **So digitos** | Mensagem apenas numerica | `"9"`, `"21"` |
| **Hard-block** | 300+ termos sempre proibidos | Slurs, sexual, violencia, sites porno |
| **Context-aware** | Termos que dependem da intencao | `"eu me sinto um lixo"` OK, `"voce e um lixo"` BLOQUEADO |

## Normalizacao anti-bypass

Antes de checar a wordlist, o texto passa por normalizacao para pegar tentativas de burlar o filtro:

| Tecnica | Antes | Depois |
|---------|-------|--------|
| Leetspeak | `3stupr0` | `estupro` |
| Acentos | `viado` | `viado` |
| Chars repetidos | `viiaaado` | `viado` |
| Zero-width chars | `vi ado` | `viado` |
| Homoglyphs cirilicos | `viado` | `viado` |
| Pontos/tracos | `p.u.t.a` | `puta` |
| Abreviacoes BR | `ppk`, `krl` | `pepeca`, `caralho` |

## Context-aware: auto-expressao vs insulto

Palavras como "lixo", "idiota", "burro" sao comuns em contextos de saude mental. O filtro entende a diferenca:

```ts
filterContent('eu me sinto um lixo');   // { allowed: true }  — auto-expressao
filterContent('voce e um lixo');         // { allowed: false } — insulto dirigido
```

## Exportacoes

```ts
import {
  filterContent,         // filtro default (zero config)
  createFilter,          // cria filtro customizado
  normalize,             // normaliza texto (util para debug)
  HARD_BLOCKED,          // lista de palavras hard-blocked
  CONTEXT_SENSITIVE,     // lista de palavras context-sensitive
  DIRECTED_PATTERNS,     // regex de fala dirigida (voce, seu, tu)
  SELF_EXPRESSION_PATTERNS, // regex de auto-expressao (eu, me sinto)
  ABBREVIATION_MAP,      // mapa de abreviacoes BR
} from 'toxibr';
```

## Contribuindo

Quer adicionar uma palavra ou melhorar o filtro? Leia o [CONTRIBUTING.md](CONTRIBUTING.md) para saber como.

```bash
npm test          # roda os testes
npm run validate  # verifica duplicatas nas wordlists
```

## Licenca

MIT
