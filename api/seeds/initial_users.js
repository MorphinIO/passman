exports.seed = async function (knex) {
  let dbData = await knex('users').select('*');
  if (!dbData || !(dbData.length > 0)) {
    await knex('users').insert([
      {id: 1, email: 'michael@wlabel.co'},
      {id: 2, email: 'bernard@test.com'},
    ]);
  }
  
  return await knex.raw('select setval(\'users_id_seq\', max(id)) from users');
};