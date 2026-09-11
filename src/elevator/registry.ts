import type { Floor, FloorModule } from './types.ts';

const modules = import.meta.glob<FloorModule>('../floors/*.tsx', { eager: true });

export const floors: Floor[] = Object.entries(modules)
  .filter(([path]) => !(path.split('/').pop() ?? '').startsWith('_'))
  .map(([path, mod]) => {
    if ( !mod.meta ) {
      throw new Error(
        `Floor "${path}" must export a \`meta\` object. ` +
          `See src/floors/_TEMPLATE.tsx.`,
      );
    }
    if ( !mod.defaultComponent ) {
      throw new Error(
        `Floor "${path}" must export a \`default component\` object. ` +
          `See src/floors/_TEMPLATE.tsx.`,
      );
    }
    return { ...mod.meta, Component: mod.defaultComponent };
  })
  .sort((a, b) => b.level - a.level);

const ids = floors.map((f) => f.id);
const levels = floors.map((f) => f.level);
const dupId = ids.find((id, i) => ids.indexOf(id) !== i);
const dupLevel = levels.find((lvl, i) => levels.indexOf(lvl) !== i);
if (dupId) throw new Error(`Two floors share id "${dupId}". Floor ids must be unique.`);
if (dupLevel !== undefined) {
  throw new Error(`Two floors share level ${dupLevel}. Floor levels must be unique.`);
}