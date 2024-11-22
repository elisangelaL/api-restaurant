import { knex as knexConfig } from "knex";

import knextfile from "../../knexfile";

export const knex = knexConfig(knextfile.development);