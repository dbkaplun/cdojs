'use strict'

import 'babel-register'
import test from 'ava'
import _ from 'lodash'
import CDO from '..'

import config from './config'

const client = new CDO(config.token, config.opts)

test("CDO#unpaginate", t => (
  client.unpaginate('datatypes').then(ress => {
    let items = ress.reduce((items, {results}) => [...items, ...results], [])
    ress.forEach(res => {
      t.is(items.length, res.metadata.resultset.count)
    })
  })
))

test("/datasets", t => (
  client.datasets().then(({results}) => (
    client.dataset(results[0].id).then(d => {
      t.same(d, _.omit(results[0], 'uid'))
    })
  ))
))

test("/datacategories", t => (
  client.datacategories().then(({results}) => (
    client.datacategory(results[0].id).then(d => {
      t.same(d, results[0])
    })
  ))
))

test("/datatypes", t => (
  client.datatypes().then(({results}) => (
    client.datatype(results[0].id).then(d => {
      t.same(d, _.omit(results[0], 'name'))
    })
  ))
))
