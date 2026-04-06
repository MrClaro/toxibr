// ─── ToxiBR ──────────────────────────────────────────────────────────────────
// Biblioteca de moderação de conteúdo para português brasileiro.

export { filterContent, createFilter, normalize } from './filter';
export type { FilterResult, FilterReason, ToxiBROptions } from './types';
export {
  HARD_BLOCKED,
  CONTEXT_SENSITIVE,
  DIRECTED_PATTERNS,
  SELF_EXPRESSION_PATTERNS,
  ABBREVIATION_MAP,
} from './wordlists';
