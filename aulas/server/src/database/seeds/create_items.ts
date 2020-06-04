import Knex from 'knex';

//Seeds são para popular o banco de dados com alguns dados padrões
export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas e Baterias', image: 'baterias.svg' },
        { title: 'Papéis e Papelão', image: 'papaeis-papelao.svg' },
        { title: 'Resíduos eletrônicos', image: 'eletronicos.svg' },
        { title: 'Resíduos Orgânicos', image: 'oranicos.svg' },
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Óleo de cozinha', image: 'oleo.svg' }
    ]);
}