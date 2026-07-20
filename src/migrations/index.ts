import * as migration_20260609_123404_initial_setup from './20260609_123404_initial_setup';
import * as migration_20260720_071240_add_nomor_wa_lapor from './20260720_071240_add_nomor_wa_lapor';

export const migrations = [
  {
    up: migration_20260609_123404_initial_setup.up,
    down: migration_20260609_123404_initial_setup.down,
    name: '20260609_123404_initial_setup',
  },
  {
    up: migration_20260720_071240_add_nomor_wa_lapor.up,
    down: migration_20260720_071240_add_nomor_wa_lapor.down,
    name: '20260720_071240_add_nomor_wa_lapor'
  },
];
