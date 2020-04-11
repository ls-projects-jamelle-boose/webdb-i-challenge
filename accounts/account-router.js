const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

// TODO[1] Add limit clause to root GET endpoint
/* 

Add a `query string` option to your `GET /api/accounts` endpoint. The `query string` may contain `limit`, `sortby` and `sortdir` keys. If these keys are provided, use these values to limit and sort the `accounts` which are selected from the database. Reference the docs for sorting and limiting in `knex`.

sample req.query object
{
  limit: 5,
  sortby: 'id',
  sortdir: 'desc'
}

limit — .limit(value)
Adds a limit clause to the query.

knex.select('*').from('users').limit(10).offset(30)
Outputs:
select * from `users` limit 10 offset 30

*/
router.get('/', async (req, res) => {
  const { limit, orderby, sortdir } = req.query;
  const queryLimit = limit || -1;
  const queryOrderBy = orderby || 'id';
  const querySortDir = sortdir || 'asc';

  try {
    const accounts = await db('accounts')
      .orderBy(queryOrderBy, querySortDir)
      .limit(queryLimit);
    res.status(200).json({
      success: true,
      accounts,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error getting budget.`,
      error,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const account = await db('accounts').where('id', id);
    if (account[0] === undefined) {
      res.status(404).json({
        success: false,
        message: `Account not found.`,
      });
    } else res.status(200).json(account);
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const newAccount = await db('accounts').insert(data);
    res.status(201).json({
      success: true,
      newAccount,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const count = await db('accounts').where('id', '=', id).update(data);
    if (count) {
      res.status(200).json({
        success: true,
        updated: count,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Could not find account ${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Server error, could not update account.`,
      error: error,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db('accounts').where('id', '=', id).del();

    if (data) {
      res.status(200).json({
        success: true,
        deleted: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Could not find post ${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Could not delete the account.`,
      error,
    });
  }
});

module.exports = router;
