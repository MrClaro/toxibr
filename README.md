# ToxiBR

Biblioteca de moderação de conteúdo para português brasileiro. Filtro client-side com wordlist 200+ termos, detecção context-aware (auto-expressão vs insulto dirigido), normalização anti-bypass (leetspeak, homoglyphs, acentos, zero-width chars) e bloqueio de links/telefones. Leve, sem dependências, < 1ms por mensagem.

## Instalação

```bash
npm install toxibr
```

## Uso rápido

```ts
import { filterContent } from 'toxibr';

const result = filterContent('mensagem aqui');

if (!result.allowed) {
  console.log(result.reason);  // 'hard_block' | 'directed_insult' | 'link' | 'phone' | 'digits_only'
  console.log(result.matched); // palavra que matchou
}
```

## Uso avançado

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

## Camadas de filtro

| Camada | O que bloqueia | Exemplo |
|--------|---------------|---------|
| **Links** | URLs e domínios | `https://...`, `site.com`, `.br` |
| **Telefone** | Números BR (9+ dígitos) | `(21) 99470-9426` |
| **Só dígitos** | Mensagem apenas numérica | `"9"`, `"21"` |
| **Hard-block** | 200+ termos sempre proibidos | Slurs, sexual, violência, sites pornô |
| **Context-aware** | Termos que dependem da intenção | `"eu me sinto um lixo"` OK, `"você é um lixo"` BLOQUEADO |

## Normalização anti-bypass

Antes de checar a wordlist, o texto é normalizado para evitar truques:

- Leetspeak: `3stupr0` → `estupro`
- Acentos: `viàdo` → `viado`
- Chars repetidos: `viiaaado` → `viado`
- Zero-width chars: `vi​ado` → `viado`
- Homoglyphs cirílicos: `viаdо` → `viado`
- Pontos/traços: `p.u.t.a` → `puta`
- Abreviações BR: `ppk` → `pepeca`, `krl` → `caralho`

## Context-aware

Palavras como "lixo", "idiota", "burro" são comuns em contextos de saúde mental:

```ts
filterContent('eu me sinto um lixo');   // { allowed: true }
filterContent('você é um lixo');         // { allowed: false, reason: 'directed_insult' }
```

## Exportações

```ts
import {
  filterContent,    // filtro default (zero config)
  createFilter,     // cria filtro customizado
  normalize,        // normaliza texto (útil para debug)
  HARD_BLOCKED,     // lista de palavras hard-blocked
  CONTEXT_SENSITIVE, // lista de palavras context-sensitive
} from 'toxibr';
```

## Licença

MIT
